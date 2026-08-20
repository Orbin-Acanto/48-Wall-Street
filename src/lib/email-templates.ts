/**
 * HTML email templates.
 *
 * Written for email clients, not browsers: tables for layout, inline styles
 * only, no external CSS. The logo artwork is near-black on a transparent
 * background, so the header and footer paint an explicit light background —
 * on a dark bar the logo would disappear entirely.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.48wallnyc.com';

const LOGO_URL = `${SITE_URL}/shared/logo/48-wall-logo.png`;

const GOLD = '#b8964f';
const INK = '#1a1a1a';
const MUTED = '#6b6b6b';
const BORDER = '#e4e4e4';

/** Escape untrusted values before interpolating them into HTML. */
export function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export interface DetailRow {
  label: string;
  value: string;
}

function detailRows(rows: DetailRow[]): string {
  return rows
    .filter((row) => row.value)
    .map(
      (row) => `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid ${BORDER};font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${MUTED};width:40%;vertical-align:top;">${esc(row.label)}</td>
          <td style="padding:14px 0;border-bottom:1px solid ${BORDER};font-family:Georgia,'Times New Roman',serif;font-size:16px;color:${INK};">${esc(row.value)}</td>
        </tr>`
    )
    .join('');
}

interface LayoutOptions {
  eyebrow: string;
  intro: string;
  rows?: DetailRow[];
  note?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

/**
 * Shared shell. The header keeps a white background so the dark logo stays
 * visible, with a gold rule beneath it for the brand accent.
 */
export function baseLayout(options: LayoutOptions): string {
  const { eyebrow, intro, rows = [], note, ctaLabel, ctaUrl } = options;

  const cta =
    ctaLabel && ctaUrl
      ? `<tr><td style="padding:28px 0 0;">
           <a href="${esc(ctaUrl)}" style="display:inline-block;background:${INK};color:#ffffff;text-decoration:none;padding:14px 28px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;">${esc(ctaLabel)}</a>
         </td></tr>`
      : '';

  const noteBlock = note
    ? `<tr><td style="padding:24px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:15px;line-height:1.7;color:${MUTED};">${note}</td></tr>`
    : '';

  const rowsBlock = rows.length
    ? `<tr><td style="padding:28px 0 0;">
         <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">${detailRows(rows)}</table>
       </td></tr>`
    : '';

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(eyebrow)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f4f4f4;">
  <tr>
    <td align="center" style="padding:24px 12px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:100%;background:#ffffff;">

        <!-- Header: white background keeps the dark logo legible -->
        <tr>
          <td align="center" style="background:#ffffff;padding:32px 24px 24px;">
            <img src="${LOGO_URL}" width="220" alt="48 Wall Street Events" style="display:block;width:220px;max-width:70%;height:auto;border:0;">
          </td>
        </tr>
        <tr><td style="font-size:0;line-height:0;height:3px;background:${GOLD};">&nbsp;</td></tr>

        <tr>
          <td style="padding:40px 40px 44px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${GOLD};padding-bottom:18px;">${esc(eyebrow)}</td>
              </tr>
              <tr>
                <td style="font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.7;color:${INK};">${intro}</td>
              </tr>
              ${rowsBlock}
              ${noteBlock}
              ${cta}
            </table>
          </td>
        </tr>

        <!-- Footer: light background, dark text; logo artwork stays readable -->
        <tr>
          <td style="background:#f7f7f7;border-top:1px solid ${BORDER};padding:28px 40px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.8;color:${MUTED};">
            <div style="color:${INK};font-size:13px;letter-spacing:1px;text-transform:uppercase;padding-bottom:6px;">48 Wall Street Events</div>
            48 Wall Street, New York, NY 10005<br>
            NYC: 212.971.5353 &nbsp;&middot;&nbsp; LI: 631.777.2244<br>
            <a href="${SITE_URL}" style="color:${GOLD};text-decoration:none;">48wallnyc.com</a>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

const DOCUMENT_LABELS: Record<string, string> = {
  credit_card_auth: 'Credit Card Authorization',
  av_production: 'AV & Production Form',
  client_guidelines: 'Client Guidelines',
  rules_regulations: 'Rules & Regulations',
  floor_plan: 'Floor Plan Approval',
};

export function documentLabel(documentType: string): string {
  return DOCUMENT_LABELS[documentType] ?? 'Document';
}

export interface SignedDocumentContext {
  clientName: string;
  clientEmail: string;
  documentType: string;
  signedDate: string;
  signTime?: string;
  location?: string;
  ipAddress?: string;
  docId?: string | null;
}

/** Confirmation sent to the client who signed. */
export function signedClientEmail(ctx: SignedDocumentContext) {
  const label = documentLabel(ctx.documentType);
  const firstName = ctx.clientName.split(' ')[0] || ctx.clientName;

  return {
    subject: `Your signed ${label} — 48 Wall Street Events`,
    html: baseLayout({
      eyebrow: 'Authorization submitted successfully',
      intro: `Dear ${esc(firstName)}, thank you — we have received your signed <strong>${esc(label)}</strong>. A copy is attached to this email for your records.`,
      rows: [
        { label: 'Document', value: label },
        { label: 'Signed by', value: ctx.clientName },
        { label: 'Date signed', value: ctx.signedDate },
        { label: 'Reference', value: ctx.docId ?? '' },
      ],
      note: 'Our events team will follow up shortly with next steps. If anything looks incorrect, reply to this email and we will take care of it.',
    }),
  };
}

/** Internal copy for the events team. */
export function signedStaffEmail(ctx: SignedDocumentContext) {
  const label = documentLabel(ctx.documentType);

  return {
    subject: `Signed ${label} — ${ctx.clientName}`,
    html: baseLayout({
      eyebrow: 'New signed document',
      intro: `<strong>${esc(ctx.clientName)}</strong> has submitted a signed <strong>${esc(label)}</strong>. The executed PDF is attached.`,
      rows: [
        { label: 'Client', value: ctx.clientName },
        { label: 'Email', value: ctx.clientEmail },
        { label: 'Document', value: label },
        { label: 'Date signed', value: ctx.signedDate },
        { label: 'Signed at', value: ctx.signTime ?? '' },
        { label: 'Location', value: ctx.location ?? '' },
        { label: 'IP address', value: ctx.ipAddress ?? '' },
        { label: 'Reference', value: ctx.docId ?? '' },
      ],
      note: 'Generated automatically on submission. Card details are never included in email — they appear only inside the attached PDF.',
    }),
  };
}

export interface ReminderContext {
  clientName: string;
  documentType: string;
  deadline?: string;
  signingUrl: string;
}

/** Reminder for a document that has not been signed yet. */
export function reminderEmail(ctx: ReminderContext) {
  const label = documentLabel(ctx.documentType);
  const firstName = ctx.clientName.split(' ')[0] || ctx.clientName;

  return {
    subject: `Reminder: your ${label} is awaiting signature`,
    html: baseLayout({
      eyebrow: 'Signature still needed',
      intro: `Dear ${esc(firstName)}, this is a friendly reminder that your <strong>${esc(label)}</strong> has not been signed yet. It only takes a minute to complete.`,
      rows: [
        { label: 'Document', value: label },
        { label: 'Due by', value: ctx.deadline ?? '' },
      ],
      ctaLabel: 'Review & sign',
      ctaUrl: ctx.signingUrl,
      note: 'If you have already signed, please disregard this message.',
    }),
  };
}

export interface CancellationContext {
  clientName: string;
  documentType: string;
  reason?: string;
}

/** Notice that a signing request has been cancelled. */
export function cancellationEmail(ctx: CancellationContext) {
  const label = documentLabel(ctx.documentType);
  const firstName = ctx.clientName.split(' ')[0] || ctx.clientName;

  return {
    subject: `Your ${label} request has been cancelled`,
    html: baseLayout({
      eyebrow: 'Request cancelled',
      intro: `Dear ${esc(firstName)}, your pending <strong>${esc(label)}</strong> request has been cancelled and its signing link is no longer active.`,
      rows: [
        { label: 'Document', value: label },
        {
          label: 'Reason',
          value: ctx.reason ?? 'Cancelled by our events team',
        },
      ],
      note: 'If this was unexpected, please contact our events team and we will send a new link.',
    }),
  };
}
