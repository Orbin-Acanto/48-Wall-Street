import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { reminderEmail } from '@/lib/email-templates';
import { getTokenState } from '@/lib/documents/signing-tokens';

/**
 * Send a "still awaiting signature" reminder for a pending document.
 *
 * Intended to be driven on a schedule (n8n cron) or triggered manually by
 * staff. Refuses to nag a client who has already signed.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientName, clientEmail, documentType, deadline, token } = body;

    if (!clientEmail || !clientName || !documentType || !token) {
      return NextResponse.json(
        {
          success: false,
          error: 'clientName, clientEmail, documentType and token are required',
        },
        { status: 400 }
      );
    }

    // Never remind someone who already completed the document.
    if ((await getTokenState(token)) === 'consumed') {
      return NextResponse.json(
        { success: false, skipped: 'already_signed' },
        { status: 409 }
      );
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || 'https://www.48wallnyc.com';

    const signingPath =
      documentType === 'credit_card_auth'
        ? '/sign/credit-card-auth'
        : documentType === 'av_production'
          ? '/sign/av-form'
          : '/sign';

    const message = reminderEmail({
      clientName,
      documentType,
      deadline,
      signingUrl: `${siteUrl}${signingPath}?token=${encodeURIComponent(token)}`,
    });

    const result = await sendEmail({
      to: clientEmail,
      subject: message.subject,
      html: message.html,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Reminder email error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send reminder' },
      { status: 500 }
    );
  }
}
