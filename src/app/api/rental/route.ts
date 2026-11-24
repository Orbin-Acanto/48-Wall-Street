import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';
import { deliverToN8n } from '@/lib/n8n-queue';
import { n8nLeadsEnabled, sendToCrm } from '@/lib/fidi-crm';

export async function POST(request: NextRequest) {
  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json(
      { success: false, message: 'Access denied' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();

    const submissionData = {
      ...body,
      submittedAt: new Date().toISOString(),
    };

    const crm = sendToCrm('FIDI_CRM_RENTAL_KEY', submissionData, request);
    // n8n also runs as the fallback when it is switched off and the CRM failed.
    const n8nData =
      n8nLeadsEnabled() || !(await crm)
        ? await deliverToN8n({
            target: 'N8N_RENTAL_WEBHOOK_URL',
            kind: 'json',
            body: submissionData,
          })
        : {};
    await crm;

    return NextResponse.json(
      {
        success: true,
        message: 'Form submitted successfully!',
        data: n8nData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Rental form API error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit form. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
