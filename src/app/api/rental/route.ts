import { NextRequest, NextResponse } from 'next/server';
import { deliverToN8n } from '@/lib/n8n-queue';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const submissionData = {
      ...body,
      submittedAt: new Date().toISOString(),
    };

    const n8nData = await deliverToN8n({
      target: 'N8N_RENTAL_WEBHOOK_URL',
      kind: 'json',
      body: submissionData,
    });

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
