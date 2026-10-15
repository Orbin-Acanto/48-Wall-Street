import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import { InitialsData, SubmitRequestBody } from '@/types';
import {
  consumeToken,
  releaseToken,
  verifySigningToken,
} from '@/lib/documents/signing-tokens';
import {
  initialPlacements,
  normalizePacketTypes,
  packetDocument,
} from '@/lib/documents/catalog';
import {
  generateDocumentPDF,
  postSignedDocument,
} from '@/lib/documents/delivery';
import { recordSealedDocument, updatePacket } from '@/lib/documents/packets';
import {
  pdfBytes,
  sealPdf,
  sealingConfigured,
  sha256Hex,
} from '@/lib/documents/seal';
import { appendCompletionCertificate } from '@/lib/documents/certificate';
import { sendEmails, staffRecipients } from '@/lib/email';
import {
  signedPacketClientEmail,
  signedPacketStaffEmail,
} from '@/lib/email-templates';

export const maxDuration = 60;

interface PacketSubmitBody {
  token?: string;
  typedName?: string;
  initials?: string;
  signature?: string;
  viewTime?: string;
  location?: string;
  ipAddress?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData?: Record<string, Record<string, any>>;
}

const MAX_SIGNATURE_BYTES = 600_000;

/** Server-side check of the card form; the browser checks are a courtesy. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cardFormProblem(form: Record<string, any> | undefined): string | null {
  if (!form) return 'Credit card details are missing';
  const digits = String(form.creditCardNumber ?? '').replace(/\D/g, '');
  const required = [
    'cardType',
    'expirationDate',
    'cvvCode',
    'cardholderName',
    'billingAddress',
    'cellPhone',
    'eventDate',
    'typeOfEvent',
    'eventLocation',
  ];
  if (digits.length < 15 || digits.length > 16) return 'Card number is invalid';
  if (required.some((key) => !String(form[key] ?? '').trim())) {
    return 'Credit card form is incomplete';
  }
  if (!(Number(form.authorizedAmount) > 0))
    return 'Authorized amount is invalid';
  return null;
}

/**
 * Sign every document in a packet at once. The client adopts their initials
 * and signature a single time; we place them on every section and document
 * that asks for them.
 */
export async function POST(request: NextRequest) {
  const body: PacketSubmitBody = await request.json().catch(() => ({}));
  const token = body.token ?? '';

  const verified = await verifySigningToken(token);
  if (!verified.ok) {
    return NextResponse.json(
      { success: false, error: verified.error, message: verified.message },
      { status: verified.status }
    );
  }

  const data = verified.data;
  const documents = normalizePacketTypes(data.docs);
  const typedName = body.typedName?.trim() ?? '';
  const initials = body.initials?.trim().toUpperCase() ?? '';
  const signature = body.signature ?? '';

  const problem =
    documents.length === 0
      ? 'This link has no documents to sign'
      : typedName.length < 2
        ? 'Type your full legal name'
        : !/^[A-Z]{1,4}$/.test(initials)
          ? 'Initials must be 1–4 letters'
          : !signature.startsWith('data:image/png;base64,') ||
              signature.length > MAX_SIGNATURE_BYTES
            ? 'Add your signature'
            : documents.includes('credit_card_auth')
              ? cardFormProblem(body.formData?.credit_card_auth)
              : null;
  if (problem) {
    return NextResponse.json(
      { success: false, error: problem },
      { status: 400 }
    );
  }

  const claimed = await consumeToken(token, {
    clientEmail: data.email,
    documentType: 'packet',
    docId: data.docId ?? null,
  });
  if (!claimed) {
    return NextResponse.json(
      {
        success: false,
        error: 'already_signed',
        message: 'These documents have already been signed and submitted.',
      },
      { status: 409 }
    );
  }

  try {
    const now = new Date();
    const signTime = now.toISOString();
    const signedDate = now.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    });
    const ipAddress =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      body.ipAddress ||
      'Unknown';
    const reference = String(data.docId ?? '');
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'https://www.48wallnyc.com';
    const sealed = sealingConfigured();

    const originals: Buffer[] = [];
    const fingerprints: { label: string; pages: number; sha256: string }[] = [];
    for (const [index, documentType] of documents.entries()) {
      const placed: InitialsData = {};
      for (const id of initialPlacements(documentType)) {
        placed[id] = { initials, timestamp: signTime };
      }

      const submission: SubmitRequestBody = {
        clientName: data.name,
        clientEmail: data.email,
        documentType,
        viewTime: body.viewTime || signTime,
        signTime,
        location: body.location || 'Unknown',
        ipAddress,
        initials: placed,
        signature,
        signedDate,
        typedName,
        deadline: data.deadline ?? '',
        docId: reference ? `${reference}-${index + 1}` : undefined,
        formData: body.formData?.[documentType] ?? {},
      };

      // Each document is sealed on its own for the records (n8n / S3)...
      const label = packetDocument(documentType)!.label;
      const original = pdfBytes(await generateDocumentPDF(submission));
      const sealedDoc = await sealPdf(
        original,
        `${label} signed by ${typedName}`
      );
      await postSignedDocument(
        submission,
        `data:application/pdf;base64,${sealedDoc.toString('base64')}`
      );
      await recordSealedDocument(sha256Hex(sealedDoc), {
        title: label,
        reference: submission.docId ?? reference,
        signerName: data.name,
        signedAt: signTime,
        sealed,
      });

      originals.push(original);
      fingerprints.push({
        label,
        pages: (await PDFDocument.load(original)).getPageCount(),
        sha256: sha256Hex(original),
      });
    }

    const labels = documents.map((type) => packetDocument(type)!.label);
    const emailContext = {
      clientName: data.name,
      clientEmail: data.email,
      documents: labels,
      signedDate,
      location: body.location,
      ipAddress,
      reference,
      sentByName: data.byName,
      fingerprint: undefined as string | undefined,
    };

    // ...and the client's copy is every document plus the audit certificate,
    // sealed as one file. Best effort: the documents are already delivered.
    try {
      const combined = await PDFDocument.create();
      combined.setTitle(`Executed documents — ${data.name}`);
      combined.setAuthor('48 Wall Street Events');
      combined.setSubject(reference);
      for (const original of originals) {
        const source = await PDFDocument.load(original);
        const pages = await combined.copyPages(source, source.getPageIndices());
        pages.forEach((page) => combined.addPage(page));
      }
      await appendCompletionCertificate(combined, {
        reference,
        clientName: data.name,
        clientEmail: data.email,
        typedName,
        initials,
        signaturePng: signature,
        ipAddress,
        location: body.location || 'Unknown',
        userAgent: request.headers.get('user-agent') ?? 'Unknown',
        sentBy: data.byName,
        sentAt: data.iat,
        viewedAt: body.viewTime,
        signedAt: signTime,
        documents: fingerprints,
        initialsPlaced: documents.reduce(
          (sum, type) => sum + initialPlacements(type).length,
          0
        ),
        verifyUrl: `${siteUrl}/verify`,
      });
      const executed = await sealPdf(
        await combined.save(),
        `Executed packet ${reference} signed by ${typedName}`
      );
      const fingerprint = sha256Hex(executed);
      await recordSealedDocument(fingerprint, {
        title: 'Executed document packet',
        reference,
        signerName: data.name,
        signedAt: signTime,
        sealed,
      });
      emailContext.fingerprint = fingerprint;

      const attachment = {
        data: executed.toString('base64'),
        filename: `48-Wall-Street-Signed-Documents-${String(data.name).replace(/[^a-z0-9]+/gi, '-')}.pdf`,
        contentType: 'application/pdf',
      };
      const staff = [
        ...new Set(
          [...staffRecipients(), data.by]
            .filter(
              (a): a is string => typeof a === 'string' && a.includes('@')
            )
            .map((a) => a.toLowerCase())
        ),
      ];
      const clientMessage = signedPacketClientEmail(emailContext);
      const staffMessage = signedPacketStaffEmail(emailContext);
      const results = await sendEmails([
        { to: data.email, ...clientMessage, attachment },
        ...(staff.length ? [{ to: staff, ...staffMessage, attachment }] : []),
      ]);
      const failed = results.filter((r) => !r.success);
      if (failed.length) console.error('Packet email failures:', failed);
    } catch (error) {
      console.error('Packet confirmation email failed:', error);
    }

    await updatePacket(data.docId, {
      status: 'signed',
      signedAt: signTime,
    });

    return NextResponse.json({ success: true, signedDate, reference });
  } catch (error) {
    console.error('Packet signing failed:', error);
    // Hand the link back so the client can retry instead of being locked out.
    await releaseToken(token);
    return NextResponse.json(
      {
        success: false,
        error:
          'We could not submit your documents. Please try again in a moment.',
      },
      { status: 500 }
    );
  }
}
