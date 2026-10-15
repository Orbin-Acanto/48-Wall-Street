import { SubmitRequestBody } from '@/types';
import {
  generateSignedPDF,
  generateAVProductionPDF,
  generateCreditCardAuthPDF,
  generateRulesRegulationsPDF,
} from '@/lib/helper';

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
    default:
      return generateSignedPDF(body);
  }
}

/** Hand a signed document to the n8n submit webhook (storage/records). */
export async function postSignedDocument(
  body: SubmitRequestBody,
  pdfBase64: string
): Promise<void> {
  const credentials = Buffer.from(
    `${process.env.N8N_USERNAME}:${process.env.N8N_PASSWORD}`
  ).toString('base64');

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

  // Card details only ever travel inside the PDF.
  if (body.documentType !== 'credit_card_auth') {
    payload.formData = body.formData || null;
  }

  const response = await fetch(process.env.N8N_DOCUSIGN_SUBMIT_API!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    console.error('n8n webhook error:', await response.text());
    throw new Error('Failed to submit signed document');
  }
}
