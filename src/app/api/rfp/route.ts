import { NextRequest, NextResponse } from 'next/server';
import { deliverToN8n } from '@/lib/n8n-queue';

/**
 * Event RFP wizard submissions.
 *
 * Proxies to n8n server-side so the webhook URL and credentials stay out of the
 * browser bundle, matching how the contact and rental forms already work.
 */

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

    await deliverToN8n({
      target: 'N8N_RFP_WEBHOOK_URL',
      kind: 'json',
      body: { ...body, submittedAt: new Date().toISOString() },
    });

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
