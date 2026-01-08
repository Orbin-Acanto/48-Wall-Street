import { NextRequest, NextResponse } from 'next/server';
import { SubmitRequestBody } from '@/types';
import {
  generateSignedPDF,
  generateAVProductionPDF,
  generateCreditCardAuthPDF,
} from '@/lib/helper';

export async function POST(request: NextRequest) {
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

    let pdfBase64: string;

    switch (body.documentType) {
      case 'client_guidelines':
        pdfBase64 = await generateSignedPDF(body);
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

    const payload: any = {
      clientName: body.clientName,
      clientEmail: body.clientEmail,
      documentType: body.documentType,
      viewTime: body.viewTime,
      signTime: body.signTime,
      location: body.location,
      ipAddress: body.ipAddress,
      signedDate: body.signedDate,
      docId: body.docId,
      data: pdfBase64,
    };

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

    // const n8nResponse = await fetch(WEBHOOK_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Basic ${credentials}`,
    //   },
    //   body: JSON.stringify({
    //     clientName: body.clientName,
    //     clientEmail: body.clientEmail,
    //     documentType: body.documentType,
    //     viewTime: body.viewTime,
    //     signTime: body.signTime,
    //     location: body.location,
    //     ipAddress: body.ipAddress,
    //     signedDate: body.signedDate,
    //     docId: body.docId,
    //     formData: body.formData || null,
    //     data: pdfBase64,
    //   }),
    // });

    if (!n8nResponse.ok) {
      console.error('n8n webhook error:', await n8nResponse.text());
      throw new Error('Failed to submit signed document');
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error submitting signed document:', error);

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
