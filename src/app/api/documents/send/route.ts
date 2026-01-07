import { NextRequest, NextResponse } from 'next/server';

interface DocumentRequestBody {
  clientName: string;
  clientEmail: string;
  documentType: string;
  deadline: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: DocumentRequestBody = await request.json();

    if (
      !body.clientName ||
      !body.clientEmail ||
      !body.documentType ||
      !body.deadline
    ) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    const params = new URLSearchParams({
      name: body.clientName,
      email: body.clientEmail,
      type: body.documentType,
      deadline: body.deadline,
    });

    const docsURL = `${baseUrl}/sign?${params.toString()}`;

    const WEBHOOK_URL = process.env.N8N_DOCUSIGN_API!;
    const username = process.env.N8N_USERNAME!;
    const password = process.env.N8N_PASSWORD!;
    const credentials = Buffer.from(`${username}:${password}`).toString(
      'base64'
    );

    const n8nResponse = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify({
        clientName: body.clientName,
        clientEmail: body.clientEmail,
        deadline: body.deadline,
        documentType: body.documentType,
        docsURL: docsURL,
      }),
    });

    if (!n8nResponse.ok) {
      console.error('n8n webhook error:', await n8nResponse.text());
      throw new Error('Failed to send document request');
    }

    return NextResponse.json(
      {
        success: true,
        docsURL: docsURL,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending document request:', error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to send document request',
      },
      { status: 500 }
    );
  }
}
