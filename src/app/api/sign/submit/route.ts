import { NextRequest, NextResponse } from 'next/server';
import { SubmitRequestBody } from '@/types';
import {
  generateSignedPDF,
  generateAVProductionPDF,
  generateCreditCardAuthPDF,
  generateRulesRegulationsPDF,
} from '@/lib/helper';
import { consumeToken, releaseToken } from '@/lib/documents/signing-tokens';
import { sendEmails, staffRecipients } from '@/lib/email';
import {
  signedClientEmail,
  signedStaffEmail,
  documentLabel,
} from '@/lib/email-templates';

interface N8NWebhookPayload {
  clientName: string;
  clientEmail: string;
  documentType: string;
  viewTime: string;
  signTime: string;
  location: string;
  ipAddress: string;
  signedDate: string;
  docId?: string | null;
  data: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData?: Record<string, any> | null;
}

export async function POST(request: NextRequest) {
  let claimedToken: string | null = null;

  try {
    const body: SubmitRequestBody = await request.json();

    if (
      !body.clientName ||
      !body.clientEmail ||
      !body.signature ||
      !body.signedDate
    ) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Claim the signing link before doing any work. This is atomic, so two
    // concurrent submits cannot both proceed, and a signed link can never be
    // reused.
    const token = body.token;
    if (token) {
      const claimed = await consumeToken(token, {
        clientEmail: body.clientEmail,
        documentType: body.documentType,
        docId: body.docId ?? null,
      });
      if (!claimed) {
        return NextResponse.json(
          {
            success: false,
            error: 'already_signed',
            message: 'This document has already been signed and submitted.',
          },
          { status: 409 }
        );
      }
      claimedToken = token;
    }

    let pdfBase64: string;

    switch (body.documentType) {
      case 'client_guidelines':
        pdfBase64 = await generateSignedPDF(body);
        break;
      case 'rules_regulations':
        pdfBase64 = await generateRulesRegulationsPDF(body);
        break;
      case 'av_production':
        if (!body.formData) {
          return NextResponse.json(
            { success: false, error: 'Missing form data for AV Production' },
            { status: 400 }
          );
        }
        pdfBase64 = await generateAVProductionPDF(body);
        break;
      case 'floor_plan':
        pdfBase64 = await generateSignedPDF(body);
        break;
      case 'credit_card_auth':
        pdfBase64 = await generateCreditCardAuthPDF(body);
        break;
      default:
        pdfBase64 = await generateSignedPDF(body);
    }

    const WEBHOOK_URL = process.env.N8N_DOCUSIGN_SUBMIT_API!;
    const username = process.env.N8N_USERNAME!;
    const password = process.env.N8N_PASSWORD!;
    const credentials = Buffer.from(`${username}:${password}`).toString(
      'base64'
    );

    const payload: N8NWebhookPayload = {
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

    if (body.docId) {
      payload.docId = body.docId || null;
    }

    if (body.documentType !== 'credit_card_auth') {
      payload.formData = body.formData || null;
    }

    const n8nResponse = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(payload),
    });

    if (!n8nResponse.ok) {
      console.error('n8n webhook error:', await n8nResponse.text());
      throw new Error('Failed to submit signed document');
    }

    // Confirmation to the client and a copy to the events team, both with the
    // executed PDF attached. Email failures are logged but never fail the
    // submission — the document is already safely delivered at this point.
    const emailContext = {
      clientName: body.clientName,
      clientEmail: body.clientEmail,
      documentType: body.documentType,
      signedDate: body.signedDate,
      signTime: body.signTime,
      location: body.location,
      ipAddress: body.ipAddress,
      docId: body.docId ?? null,
    };

    const attachment = {
      data: pdfBase64,
      filename: `${documentLabel(body.documentType).replace(/[^a-z0-9]+/gi, '-')}-${body.clientName.replace(/[^a-z0-9]+/gi, '-')}.pdf`,
      contentType: 'application/pdf',
    };

    const clientMessage = signedClientEmail(emailContext);
    const staffMessage = signedStaffEmail(emailContext);
    const staff = staffRecipients();

    const results = await sendEmails([
      {
        to: body.clientEmail,
        subject: clientMessage.subject,
        html: clientMessage.html,
        attachment,
      },
      ...(staff.length
        ? [
            {
              to: staff,
              subject: staffMessage.subject,
              html: staffMessage.html,
              attachment,
            },
          ]
        : []),
    ]);

    const failed = results.filter((result) => !result.success);
    if (failed.length) {
      console.error('Confirmation email failures:', failed);
    }

    return NextResponse.json(
      { success: true, emailsSent: results.length - failed.length },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting signed document:', error);

    // If we claimed the link but never delivered, hand it back so the client
    // can retry instead of being locked out of a document they never signed.
    if (claimedToken) await releaseToken(claimedToken);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to submit signed document',
      },
      { status: 500 }
    );
  }
}
