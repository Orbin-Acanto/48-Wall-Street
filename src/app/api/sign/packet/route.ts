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
import { achFormMissing } from '@/lib/ach-auth';
import { sendEmails, staffCc, staffRecipients } from '@/lib/email';
import {
  DEFAULT_EVENT_PACKET_URL,
  formatLongDate,
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
  /** When the client agreed to sign electronically (their device clock). */
  consentAt?: string;
  /** When each document was signed on the client's device, by type. */
  documentSignedAt?: Record<string, string>;
  location?: string;
  ipAddress?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData?: Record<string, Record<string, any>>;
}

const MAX_SIGNATURE_BYTES = 600_000;

/** Server-side check of the card form; the browser checks are a courtesy. */
/** The acknowledgment must be ticked and its fields completed. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ackFormProblem(form: Record<string, any> | undefined): string | null {
  if (form?.agreed !== true)
    return 'Please tick the Event Packet acknowledgment';
  const required = ['legalEntity', 'eventDate', 'signerTitle'];
  return required.some((key) => !String(form[key] ?? '').trim())
    ? 'Please complete the Event Packet acknowledgment'
    : null;
}

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
  const amount = String(form.authorizedAmount ?? '').trim();
  if (amount && !(Number(amount) > 0)) return 'Authorized amount is invalid';
  return null;
}

/** A client-reported time, accepted only if it falls inside this signing session. */
function sessionTime(value: unknown, notBefore: number): string | null {
  const time = Date.parse(String(value ?? ''));
  const slack = 5 * 60 * 1000;
  return Number.isFinite(time) &&
    time >= notBefore - slack &&
    time <= Date.now() + slack
    ? new Date(time).toISOString()
    : null;
}

const slug = (value: string) =>
  value.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '');

/**
 * Submit a packet the client has signed document by document. The adopted
 * initials and signature are placed on every section and document that asks
 * for them; each document is sealed and delivered as its own PDF.
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
  const sessionStart = Date.parse(data.iat ?? '') || 0;
  const docSignedAt = Object.fromEntries(
    documents.map((type) => [
      type,
      sessionTime(body.documentSignedAt?.[type], sessionStart),
    ])
  );

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
            : Object.values(docSignedAt).some((t) => !t)
              ? 'Please sign each document before submitting'
              : (documents.includes('credit_card_auth') &&
                  cardFormProblem(body.formData?.credit_card_auth)) ||
                (documents.includes('ach_auth') &&
                  achFormMissing(body.formData?.ach_auth)[0]) ||
                (documents.includes('event_packet_ack') &&
                  ackFormProblem(body.formData?.event_packet_ack)) ||
                null;
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

    const clientSlug = slug(String(data.name));
    const signedFiles: {
      label: string;
      filename: string;
      bytes: Buffer;
      pages: number;
      sha256: string;
      signedAt: string;
    }[] = [];
    for (const [index, documentType] of documents.entries()) {
      const placed: InitialsData = {};
      const signedAt = docSignedAt[documentType]!;
      for (const id of initialPlacements(documentType)) {
        placed[id] = { initials, timestamp: signedAt };
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
        formData:
          documentType === 'event_packet_ack'
            ? {
                ...body.formData?.event_packet_ack,
                // What the client acknowledged comes from the signed link.
                packetUrl: data.packetUrl || DEFAULT_EVENT_PACKET_URL,
                packetVersion: `Issued ${formatLongDate(data.iat) || signedDate}`,
                documents: documents
                  .filter((type) => !packetDocument(type)!.always)
                  .map((type) => packetDocument(type)!.label),
              }
            : (body.formData?.[documentType] ?? {}),
      };

      // Each document is sealed on its own: for the records (n8n / S3) and
      // as its own attachment for the client.
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
      const sha256 = sha256Hex(sealedDoc);
      await recordSealedDocument(sha256, {
        title: label,
        reference: submission.docId ?? reference,
        signerName: data.name,
        signedAt,
        sealed,
      });

      signedFiles.push({
        label,
        filename: `48WallSt-${index + 1}-${slug(label)}-${clientSlug}.pdf`,
        bytes: sealedDoc,
        pages: (await PDFDocument.load(original)).getPageCount(),
        sha256,
        signedAt,
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
    };

    // One email with every signed document as its own PDF, plus the audit
    // certificate. Best effort: the documents are already delivered.
    try {
      const certificate = await PDFDocument.create();
      certificate.setTitle(`Certificate of Completion — ${data.name}`);
      certificate.setAuthor('48 Wall Street Events');
      certificate.setSubject(reference);
      await appendCompletionCertificate(certificate, {
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
        consentAt: sessionTime(body.consentAt, sessionStart) ?? undefined,
        signedAt: signTime,
        documents: signedFiles.map(
          ({ label, pages, sha256, signedAt, filename }) => ({
            label,
            pages,
            sha256,
            signedAt,
            filename,
          })
        ),
        initialsPlaced: documents.reduce(
          (sum, type) => sum + initialPlacements(type).length,
          0
        ),
        verifyUrl: `${siteUrl}/verify`,
      });
      const sealedCertificate = await sealPdf(
        await certificate.save(),
        `Certificate of Completion ${reference}`
      );
      await recordSealedDocument(sha256Hex(sealedCertificate), {
        title: 'Certificate of Completion',
        reference,
        signerName: data.name,
        signedAt: signTime,
        sealed,
      });

      const attachments = [
        ...signedFiles.map((file) => ({
          data: file.bytes.toString('base64'),
          filename: file.filename,
          contentType: 'application/pdf',
        })),
        {
          data: sealedCertificate.toString('base64'),
          filename: `48WallSt-Certificate-of-Completion-${clientSlug}.pdf`,
          contentType: 'application/pdf',
        },
      ];
      // To the events lead; copy the team and whoever sent the packet.
      const emails = (list: unknown[]) =>
        list
          .filter((a): a is string => typeof a === 'string' && a.includes('@'))
          .map((a) => a.toLowerCase());
      const staffTo = [...new Set(emails(staffRecipients()))];
      const staffCopy = [...new Set(emails([...staffCc(), data.by]))].filter(
        (a) => !staffTo.includes(a)
      );
      const clientMessage = signedPacketClientEmail(emailContext);
      const staffMessage = signedPacketStaffEmail(emailContext);
      const results = await sendEmails([
        { to: data.email, ...clientMessage, attachments },
        ...(staffTo.length
          ? [{ to: staffTo, cc: staffCopy, ...staffMessage, attachments }]
          : []),
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
