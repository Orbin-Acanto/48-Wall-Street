import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.phone || !body.email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Phone and Email are required fields',
        },
        { status: 400 }
      );
    }

    const submissionData = {
      ...body,
      eventStartTime: `${body.eventStartHour}:${body.eventStartMinute} ${body.eventStartPeriod}`,
      submittedAt: new Date().toISOString(),
    };

    const username = process.env.N8N_USERNAME!;
    const password = process.env.N8N_PASSWORD!;
    const credentials = Buffer.from(`${username}:${password}`).toString(
      'base64'
    );

    const n8nResponse = await fetch(process.env.N8N_LEAD_WEBHOOK_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(submissionData),
    });

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text();
      console.error('n8n webhook error:', errorText);
      throw new Error('Failed to send data to n8n');
    }

    const n8nData = await n8nResponse.json();

    return NextResponse.json(
      {
        success: true,
        message: 'Form submitted successfully!',
        data: n8nData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form API error:', error);

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
