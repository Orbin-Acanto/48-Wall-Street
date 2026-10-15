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
import { updatePacket } from '@/lib/documents/packets';
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

/** Concatenate data-URI PDFs into one base64 PDF. */
async function mergePdfs(dataUris: string[]): Promise<string> {
  const merged = await PDFDocument.create();
  for (const uri of dataUris) {
    const bytes = Buffer.from(uri.slice(uri.indexOf(',') + 1), 'base64');
    const source = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(source, source.getPageIndices());
    pages.forEach((page) => merged.addPage(page));
  }
  return Buffer.from(await merged.save()).toString('base64');
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

    const pdfs: string[] = [];
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

      const pdf = await generateDocumentPDF(submission);
      await postSignedDocument(submission, pdf);
      pdfs.push(pdf);
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
    };

    // Email is best effort: the documents are already delivered to n8n.
    try {
      const attachment = {
        data: await mergePdfs(pdfs),
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
