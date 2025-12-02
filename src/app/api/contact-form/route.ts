import { NextRequest, NextResponse } from 'next/server';
import { ratelimit } from '@/lib/rate-limit';

const HONEYPOT_FIELD = 'website';

const MIN_FORM_TIME = 5000;

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not configured');
    return false;
  }

  try {
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const realIp = request.headers.get('x-real-ip');
    const cfIp = request.headers.get('cf-connecting-ip');
    const forwardedFor = request.headers.get('x-forwarded-for');

    const forwardedIp = forwardedFor
      ? forwardedFor.split(',')[0]?.trim()
      : undefined;

    const ip = realIp ?? cfIp ?? forwardedIp ?? 'unknown';

    const { success: allowed } = await ratelimit.limit(`contact:${ip}`);

    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Too many submissions from your network. Please try again tomorrow.',
        },
        { status: 429 }
      );
    }

    const formData = await request.formData();

    const startedAtRaw = formData.get('formStartedAt') as string | null;
    const startedAt = startedAtRaw ? Number(startedAtRaw) : 0;

    if (!startedAt || Date.now() - startedAt < MIN_FORM_TIME) {
      return NextResponse.json(
        {
          success: false,
          message: 'Form submitted too quickly. Please try again.',
        },
        { status: 400 }
      );
    }

    const honeypot = formData.get(HONEYPOT_FIELD) as string | null;
    if (honeypot && honeypot.trim() !== '') {
      return NextResponse.json(
        {
          success: true,
          message: 'Form submitted successfully!',
        },
        { status: 200 }
      );
    }

    const recaptchaToken = formData.get('recaptchaToken') as string;

    if (!recaptchaToken) {
      return NextResponse.json(
        {
          success: false,
          message: 'reCAPTCHA verification is required',
        },
        { status: 400 }
      );
    }

    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);

    if (!isValidRecaptcha) {
      return NextResponse.json(
        {
          success: false,
          message: 'reCAPTCHA verification failed. Please try again.',
        },
        { status: 400 }
      );
    }

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
      page: (formData.get('page') as string) || '/',
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
