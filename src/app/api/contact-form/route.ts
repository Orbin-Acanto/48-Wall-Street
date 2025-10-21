import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;

    if (!fullName || !email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name and Email are required fields',
        },
        { status: 400 }
      );
    }

    const submissionData = {
      fullName,
      company: formData.get('company') as string,
      phone: formData.get('phone') as string,
      email,
      eventStartDate: formData.get('eventStartDate') as string,
      eventStartHour: formData.get('eventStartHour') as string,
      eventStartMinute: formData.get('eventStartMinute') as string,
      eventStartPeriod: formData.get('eventStartPeriod') as string,
      eventType: formData.get('eventType') as string,
      numberOfGuests: formData.get('numberOfGuests') as string,
      howDidYouHear: formData.get('howDidYouHear') as string,
      message: formData.get('message') as string,
      eventStartTime: `${formData.get('eventStartHour')}:${formData.get('eventStartMinute')} ${formData.get('eventStartPeriod')}`,
      submittedAt: new Date().toISOString(),
    };

    const n8nFormData = new FormData();

    Object.entries(submissionData).forEach(([key, value]) => {
      n8nFormData.append(key, value || '');
    });

    const files = formData.getAll('attachments') as File[];
    if (files && files.length > 0) {
      files.forEach((file) => {
        n8nFormData.append('data', file);
      });
    }

    const username = process.env.N8N_USERNAME!;
    const password = process.env.N8N_PASSWORD!;
    const credentials = Buffer.from(`${username}:${password}`).toString(
      'base64'
    );

    const n8nResponse = await fetch(process.env.N8N_LEAD_WEBHOOK_URL!, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
      },
      body: n8nFormData,
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
