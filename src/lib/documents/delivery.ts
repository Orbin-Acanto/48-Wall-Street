import { SubmitRequestBody } from '@/types';
import {
  generateSignedPDF,
  generateAVProductionPDF,
  generateCreditCardAuthPDF,
  generateRulesRegulationsPDF,
  generateEventPacketAckPDF,
  generateAchAuthPDF,
} from '@/lib/helper';
import { maskAccount } from '@/lib/ach-auth';

/** Render the executed PDF for one document. Returns a data: URI. */
export async function generateDocumentPDF(
  body: SubmitRequestBody
): Promise<string> {
  switch (body.documentType) {
    case 'rules_regulations':
      return generateRulesRegulationsPDF(body);
    case 'av_production':
      return generateAVProductionPDF(body);
    case 'credit_card_auth':
      return generateCreditCardAuthPDF(body);
    case 'event_packet_ack':
      return generateEventPacketAckPDF(body);
    case 'ach_auth':
      return generateAchAuthPDF(body);
    default:
      return generateSignedPDF(body);
  }
}

export function n8nAuthHeader(): string {
  return `Basic ${Buffer.from(
    `${process.env.N8N_USERNAME}:${process.env.N8N_PASSWORD}`
  ).toString('base64')}`;
}

/**
 * Log each document of a newly sent packet to the n8n "Document Sent" webhook
 * (the Document Sign In Table). Rows are keyed by the same docId the signed
 * submission uses, so n8n updates them with the stored PDF on signing.
 * Best effort: tracking must never block sending.
 */
export async function logSentDocuments(rows: {
  clientName: string;
  clientEmail: string;
  deadline: string;
  docsURL: string;
  documents: { documentType: string; docId: string }[];
}): Promise<void> {
  const url = process.env.N8N_DOCUSIGN_API;
  // shortcut: off until the n8n "Document Sent" path stops emailing clients
  // itself (it would send a second, old-style invite per document).
  if (!url || process.env.N8N_LOG_SENT_DOCUMENTS !== 'true') return;
  await Promise.all(
    rows.documents.map(({ documentType, docId }) =>
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: n8nAuthHeader(),
        },
        body: JSON.stringify({
          clientName: rows.clientName,
          clientEmail: rows.clientEmail,
          deadline: rows.deadline,
          documentType,
          docsURL: rows.docsURL,
          docId,
        }),
      })
        .then((r) => {
          if (!r.ok) console.error('n8n sent-log responded', r.status);
        })
        .catch((error) => console.error('n8n sent-log failed:', error))
    )
  );
}

/** Hand a signed document to the n8n submit webhook (storage/records). */
export async function postSignedDocument(
  body: SubmitRequestBody,
  pdfBase64: string
): Promise<void> {
  const payload: Record<string, unknown> = {
    clientName: body.clientName,
    clientEmail: body.clientEmail,
    documentType: body.documentType,
    viewTime: body.viewTime,
    signTime: body.signTime,
    location: body.location,
    ipAddress: body.ipAddress,
    signedDate: body.signedDate,
    data: pdfBase64,
  };

  if (body.docId) payload.docId = body.docId;

  // Card details only ever travel inside the PDF; the n8n table gets only the
  // last four digits of a bank account.
  if (body.documentType === 'ach_auth') {
    payload.formData = {
      ...body.formData,
      accountNumber: maskAccount(body.formData?.accountNumber),
      accountNumberConfirm: undefined,
    };
  } else if (body.documentType !== 'credit_card_auth') {
    payload.formData = body.formData || null;
  }

  const response = await fetch(process.env.N8N_DOCUSIGN_SUBMIT_API!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: n8nAuthHeader(),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    console.error('n8n webhook error:', await response.text());
    throw new Error('Failed to submit signed document');
  }
}
