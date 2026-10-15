import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import {
  DEFAULT_EVENT_PACKET_URL,
  packetInvitationEmail,
} from '@/lib/email-templates';
import { signToken } from '@/lib/documents/signing-tokens';
import { normalizePacketTypes, packetDocument } from '@/lib/documents/catalog';
import { savePacket } from '@/lib/documents/packets';
import { logSentDocuments } from '@/lib/documents/delivery';

interface SendPacketBody {
  clientName?: string;
  clientEmail?: string;
  documentTypes?: string[];
  /** Legacy single-document callers. */
  documentType?: string;
  deadline?: string;
  eventDate?: string;
  packetUrl?: string;
  note?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Send a client one email covering every selected document. The link opens a
 * single signing session where they review everything and sign once.
 */
export async function POST(request: NextRequest) {
  if (!process.env.SIGNING_SECRET) {
    return NextResponse.json(
      { success: false, error: 'Missing env vars: SIGNING_SECRET' },
      { status: 500 }
    );
  }

  const body: SendPacketBody = await request.json().catch(() => ({}));
  const clientName = body.clientName?.trim() ?? '';
  const clientEmail = body.clientEmail?.trim().toLowerCase() ?? '';
  const documents = normalizePacketTypes(
    body.documentTypes ?? (body.documentType ? [body.documentType] : [])
  );
  const deadline = body.deadline ?? '';
  const packetUrl = body.packetUrl?.trim() ?? '';

  const problem =
    clientName.length < 2
      ? 'Enter the client’s full name'
      : !EMAIL_PATTERN.test(clientEmail)
        ? 'Enter a valid client email'
        : documents.length === 0
          ? 'Select at least one document'
          : !/^\d{4}-\d{2}-\d{2}$/.test(deadline)
            ? 'Choose a signature deadline'
            : packetUrl && !/^https?:\/\//i.test(packetUrl)
              ? 'The event packet link must start with https://'
              : null;
  if (problem) {
    return NextResponse.json(
      { success: false, error: problem },
      { status: 400 }
    );
  }

  const sentBy = {
    email: request.headers.get('x-staff-email') ?? 'unknown',
    name:
      decodeURIComponent(request.headers.get('x-staff-name') ?? '') ||
      'Events Team',
  };

  const packetId =
    'PKT-' +
    new Date().toISOString().slice(0, 10).replace(/-/g, '') +
    '-' +
    crypto.randomUUID().slice(0, 6).toUpperCase();

  const token = signToken({
    name: clientName,
    email: clientEmail,
    docs: documents,
    deadline,
    exp: deadline,
    eventDate: body.eventDate || undefined,
    docId: packetId,
    iat: new Date().toISOString(),
    packetUrl: packetUrl || DEFAULT_EVENT_PACKET_URL,
    by: sentBy.email,
    byName: sentBy.name,
  });

  const protocol = request.headers.get('x-forwarded-proto') || 'https';
  const host = request.headers.get('host') || 'localhost:3000';
  const signingUrl = `${protocol}://${host}/sign/packet?token=${encodeURIComponent(token)}`;

  const message = packetInvitationEmail({
    clientName,
    documents: documents.map((type) => packetDocument(type)!),
    deadline,
    signingUrl,
    packetUrl: packetUrl || undefined,
    note: body.note?.slice(0, 1500),
    senderName: sentBy.name,
  });

  const result = await sendEmail({
    to: clientEmail,
    subject: message.subject,
    html: message.html,
  });

  await savePacket({
    id: packetId,
    clientName,
    clientEmail,
    documents,
    deadline,
    eventDate: body.eventDate || undefined,
    sentBy,
    sentAt: new Date().toISOString(),
    status: 'sent',
    signingUrl,
    token,
  });

  await logSentDocuments({
    clientName,
    clientEmail,
    deadline,
    docsURL: signingUrl,
    documents: documents.map((documentType, i) => ({
      documentType,
      docId: `${packetId}-${i + 1}`,
    })),
  });

  if (!result.success) {
    // The link is still valid; staff can copy it and send it themselves.
    return NextResponse.json(
      {
        success: false,
        emailFailed: true,
        error: `The email could not be sent (${result.error}). You can copy the link below and send it manually.`,
        signingUrl,
        packetId,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true, signingUrl, packetId });
}
