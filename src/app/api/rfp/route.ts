import { NextRequest, NextResponse } from 'next/server';

/**
 * Event RFP wizard submissions.
 *
 * Proxies to n8n server-side so the webhook URL and credentials stay out of the
 * browser bundle, matching how the contact and rental forms already work.
 */

const FALLBACK_WEBHOOK_URL =
  'https://primary-production-f807.up.railway.app/webhook/35339c3d-5ccf-4015-b6c6-458109f44a89';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const contact = body?.eventInfo ?? {};
    if (!contact.contactName || !contact.email || !contact.phone) {
      return NextResponse.json(
        {
          success: false,
          message: 'Contact name, email and phone are required.',
        },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.N8N_RFP_WEBHOOK_URL || FALLBACK_WEBHOOK_URL;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const username = process.env.N8N_USERNAME;
    const password = process.env.N8N_PASSWORD;
    if (username && password) {
      headers.Authorization = `Basic ${Buffer.from(
        `${username}:${password}`
      ).toString('base64')}`;
    }

    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...body,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error('n8n RFP webhook error:', errorText);
      throw new Error('Failed to send data to n8n');
    }

    return NextResponse.json(
      { success: true, message: 'RFP submitted successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('RFP API error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit RFP. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
