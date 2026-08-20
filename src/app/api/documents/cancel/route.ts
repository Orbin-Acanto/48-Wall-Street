import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, staffRecipients } from '@/lib/email';
import { cancellationEmail, documentLabel } from '@/lib/email-templates';
import { consumeToken } from '@/lib/documents/signing-tokens';

/**
 * Cancel a pending signing request.
 *
 * Burns the token so the link stops working immediately, then notifies the
 * client (and the events team) that the request was withdrawn.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientName, clientEmail, documentType, reason, token } = body;

    if (!clientEmail || !clientName || !documentType) {
      return NextResponse.json(
        {
          success: false,
          error: 'clientName, clientEmail and documentType are required',
        },
        { status: 400 }
      );
    }

    // Invalidate the signing link. Claiming the token is what makes the URL
    // dead — verify-token rejects consumed tokens.
    if (token) {
      await consumeToken(token, {
        cancelled: true,
        reason: reason ?? null,
        clientEmail,
      });
    }

    const message = cancellationEmail({ clientName, documentType, reason });

    const result = await sendEmail({
      to: clientEmail,
      subject: message.subject,
      html: message.html,
    });

    // Keep the team informed, but the client notice is what matters.
    const staff = staffRecipients();
    if (staff.length) {
      await sendEmail({
        to: staff,
        subject: `Cancelled: ${documentLabel(documentType)} — ${clientName}`,
        html: message.html,
      });
    }

    if (!result.success) {
      return NextResponse.json(
        { success: false, cancelled: true, error: result.error },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, cancelled: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Cancellation email error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to cancel document' },
      { status: 500 }
    );
  }
}
