/**
 * Outbound transactional email.
 *
 * The app renders the recipient list, subject, HTML body and any attachment,
 * then posts a uniform envelope to a single n8n webhook which performs the
 * actual send. Keeping the templates here (rather than inside n8n) means the
 * copy lives with the code that has the booking data.
 */

const EMAIL_WEBHOOK_URL =
  process.env.N8N_EMAIL_WEBHOOK_URL ??
  'https://primary-production-f807.up.railway.app/webhook/22778d3b-bf12-4b53-ba0c-621505c407bf';

/** Internal recipients. Comma-separated env override, sensible default. */
export function staffRecipients(): string[] {
  return (process.env.STAFF_NOTIFICATION_EMAILS ?? 'mtardi@mmeink.com')
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean);
}

export interface EmailAttachment {
  /**
   * File content as base64. A full `data:` URI is also accepted — jsPDF's
   * `output('datauristring')` returns one — and is normalised to bare base64
   * before sending, since mail clients cannot decode a prefixed payload.
   */
  data: string;
  filename: string;
  contentType?: string;
}

/** Strip any `data:<type>;...;base64,` prefix, leaving bare base64. */
function toBareBase64(data: string): string {
  const marker = ';base64,';
  const index = data.indexOf(marker);
  if (data.startsWith('data:') && index !== -1) {
    return data.slice(index + marker.length);
  }
  return data;
}

export interface EmailMessage {
  to: string | string[];
  subject: string;
  html: string;
  attachment?: EmailAttachment | null;
}

/**
 * Deliver one message via the n8n email webhook.
 *
 * Never throws: email is a side effect of signing/booking, and a mail outage
 * must not fail the client's submission. Returns success so callers can log.
 */
export async function sendEmail(
  message: EmailMessage
): Promise<{ success: boolean; error?: string }> {
  const to = Array.isArray(message.to) ? message.to.join(', ') : message.to;

  if (!to) {
    return { success: false, error: 'No recipient' };
  }

  const payload: Record<string, unknown> = {
    to,
    subject: message.subject,
    html: message.html,
  };

  if (message.attachment) {
    // n8n reads the file from `data`, matching the existing submit webhook.
    payload.data = toBareBase64(message.attachment.data);
    payload.filename = message.attachment.filename;
    payload.contentType = message.attachment.contentType ?? 'application/pdf';
  }

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Reuse the shared n8n basic-auth credentials when configured.
    const username = process.env.N8N_USERNAME;
    const password = process.env.N8N_PASSWORD;
    if (username && password) {
      headers.Authorization = `Basic ${Buffer.from(
        `${username}:${password}`
      ).toString('base64')}`;
    }

    const response = await fetch(EMAIL_WEBHOOK_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      console.error('Email webhook error:', response.status, detail);
      return { success: false, error: `Webhook responded ${response.status}` };
    }

    return { success: true };
  } catch (error) {
    console.error('Email webhook request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/** Send several messages without letting one failure block the others. */
export async function sendEmails(messages: EmailMessage[]) {
  return Promise.all(messages.map((message) => sendEmail(message)));
}
