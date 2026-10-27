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
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background:#ffffff;">

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
  packet: 'Event Document Packet',
  event_packet_ack: 'Event Packet Acknowledgment',
  ach_auth: 'ACH Authorization',
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

export const DEFAULT_EVENT_PACKET_URL =
  process.env.NEXT_PUBLIC_EVENT_PACKET_URL ||
  `${SITE_URL}/about/digital-brochure`;

export interface PacketInvitationContext {
  clientName: string;
  documents: { label: string; description: string }[];
  deadline?: string;
  signingUrl: string;
  packetUrl?: string;
  note?: string;
  senderName?: string;
}

/** "2026-11-02" → "Monday, November 2, 2026". */
export function formatLongDate(value?: string): string {
  if (!value) return '';
  // Date-only strings are calendar days; don't let UTC shift them a day back.
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T12:00:00`)
    : new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
}

const SERIF = "Georgia,'Times New Roman',serif";
const SANS = 'Arial,Helvetica,sans-serif';

function paragraph(html: string): string {
  return `<tr><td class="px" style="padding:0 48px 18px;font-family:${SERIF};font-size:16px;line-height:1.75;color:${INK};">${html}</td></tr>`;
}

function button(label: string, url: string, filled: boolean): string {
  const style = filled
    ? `background:${GOLD};color:#ffffff;border:1px solid ${GOLD};`
    : `background:#ffffff;color:${INK};border:1px solid ${INK};`;
  return `<a href="${esc(url)}" style="${style}display:inline-block;text-decoration:none;padding:16px 34px;font-family:${SANS};font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">${esc(label)}</a>`;
}

/**
 * The client's welcome email: the 48 Wall Street letter, the event packet and
 * one button that opens every document they need to sign.
 */
export function packetInvitationEmail(ctx: PacketInvitationContext) {
  const packetUrl = ctx.packetUrl || DEFAULT_EVENT_PACKET_URL;
  const deadline = formatLongDate(ctx.deadline);
  const count = ctx.documents.length;
  const noun = count === 1 ? 'document' : 'documents';

  const documentRows = ctx.documents
    .map((doc, i) => {
      const rule = i ? `border-top:1px solid ${BORDER};` : '';
      return `
      <tr>
        <td width="44" valign="top" style="padding:16px 0 16px 20px;${rule}">
          <div style="width:28px;height:28px;line-height:28px;border-radius:14px;background:${INK};color:${GOLD};text-align:center;font-family:${SERIF};font-size:14px;">${i + 1}</div>
        </td>
        <td valign="top" style="padding:16px 20px 16px 8px;${rule}">
          <div style="font-family:${SERIF};font-size:16px;color:${INK};">${esc(doc.label)}</div>
          <div style="font-family:${SANS};font-size:13px;line-height:1.5;color:${MUTED};padding-top:3px;">${esc(doc.description)}</div>
        </td>
      </tr>`;
    })
    .join('');

  const note = ctx.note?.trim();
  const noteBlock = note
    ? `<tr><td class="px" style="padding:6px 48px 26px;">
         <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
           <td style="border-left:3px solid ${GOLD};background:#faf7f0;padding:16px 20px;font-family:${SERIF};font-size:15px;line-height:1.7;color:${INK};font-style:italic;">
             ${esc(note).replace(/\n/g, '<br>')}
             ${ctx.senderName ? `<div style="font-style:normal;font-family:${SANS};font-size:12px;letter-spacing:1px;color:${MUTED};padding-top:10px;">&mdash; ${esc(ctx.senderName)}, Event Services</div>` : ''}
           </td>
         </tr></table>
       </td></tr>`
    : '';

  const deadlineRow = deadline
    ? `<tr><td colspan="2" style="padding:14px 20px;border-top:1px solid ${BORDER};font-family:${SANS};font-size:13px;color:${MUTED};">Please complete by <strong style="color:${INK};">${esc(deadline)}</strong></td></tr>`
    : '';

  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<title>Welcome to 48 Wall Street</title>
<style>
  @media only screen and (max-width:620px){
    .px{padding-left:22px!important;padding-right:22px!important;}
    .btn a{display:block!important;}
    .h1{font-size:26px!important;}
  }
</style>
</head>
<body style="margin:0;padding:0;background:#efece6;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your 48 Wall Street event packet and ${count} ${noun} to review and sign.</div>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#efece6;">
<tr><td align="center" style="padding:24px 10px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background:#ffffff;">

  <tr><td style="background:#0a0a0a;">
    <img src="${SITE_URL}/shared/email/packet-hero.jpg" width="600" alt="48 Wall Street Events — your event documents" style="display:block;width:100%;max-width:600px;height:auto;border:0;">
  </td></tr>
  <tr><td style="font-size:0;line-height:0;height:4px;background:${GOLD};">&nbsp;</td></tr>

  <tr><td class="px" style="padding:44px 48px 6px;font-family:${SANS};font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${GOLD};">Welcome to 48 Wall Street</td></tr>
  <tr><td class="px h1" style="padding:0 48px 26px;font-family:${SERIF};font-size:30px;line-height:1.25;color:${INK};">Dear ${esc(ctx.clientName)},</td></tr>

  ${paragraph('Thank you for choosing 48 Wall Street for your upcoming event. It is our pleasure to welcome you and your guests to a distinguished piece of Old New York glamour, nestled along one of the world&rsquo;s most iconic streets in the heart of Lower Manhattan.')}
  ${paragraph('With its grand architecture, timeless elegance, and rich history, 48 Wall Street offers an extraordinary setting for a memorable occasion. Our family and dedicated Event Services team look forward to bringing your vision to life with thoughtful planning and attentive service.')}
  ${paragraph('To begin your planning experience, please review our <strong>48 Wall Street Event Packet</strong>, which includes essential venue information, planning requirements, and event guidelines:')}

  <tr><td class="px btn" align="left" style="padding:4px 48px 30px;">${button('View the Event Packet', packetUrl, false)}</td></tr>

  ${paragraph('Please ensure that all required documents and guideline acknowledgments are completed, signed, and submitted before your event begins. Sharing these materials with your planning team and 48 Wall Street&rsquo;s exclusive in-house vendors will help ensure a seamless experience.')}

  <tr><td class="px" style="padding:8px 48px 30px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border:1px solid ${BORDER};background:#fcfbf8;">
      <tr><td colspan="2" style="padding:18px 20px 6px;font-family:${SANS};font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:${GOLD};">${count} ${noun} ready for you</td></tr>
      ${documentRows}
      ${deadlineRow}
      <tr><td colspan="2" align="center" style="padding:18px 20px 0;font-family:${SANS};font-size:14px;line-height:1.5;color:${INK};"><strong>Please make sure you are authorized to sign ${count === 1 ? 'this document' : 'these documents'}.</strong></td></tr>
      <tr><td colspan="2" class="btn" align="center" style="padding:16px 20px 10px;">${button(count === 1 ? 'Review & Sign Document' : 'Review & Sign Documents', ctx.signingUrl, true)}</td></tr>
      <tr><td colspan="2" align="center" style="padding:6px 24px 22px;font-family:${SANS};font-size:12px;line-height:1.6;color:${MUTED};">
        Read each document and sign as you go &mdash; draw your signature once, then reuse it with a single tap. Nothing is sent until you press Submit. Works on phone, tablet or computer.
      </td></tr>
    </table>
  </td></tr>

  ${noteBlock}

  ${paragraph('Should you have any questions or need assistance, please do not hesitate to contact our Event Services team. We will be delighted to assist you.')}
  ${paragraph('On behalf of the 48 Wall Street family, thank you for your cooperation in helping us preserve the architectural beauty and historic character of this exceptional New York City landmark. We are honored to be part of your celebration or event.')}

  <tr><td class="px" style="padding:10px 48px 44px;font-family:${SERIF};font-size:16px;line-height:1.7;color:${INK};">
    Warmest regards,<br>
    <span style="font-size:20px;font-style:italic;">The 48 Wall Street Family</span><br>
    <span style="font-family:${SANS};font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${MUTED};">Event Services Team &middot; 48 Wall Street | New York, NY</span>
  </td></tr>

  <tr><td align="center" style="background:#0a0a0a;padding:34px 24px 30px;">
    <img src="${SITE_URL}/shared/logo/48-wall-logo-white.png" width="150" alt="48 Wall Street Events" style="display:block;width:150px;height:auto;border:0;margin:0 auto 16px;">
    <div style="width:40px;height:1px;background:${GOLD};margin:0 auto 16px;font-size:0;line-height:0;">&nbsp;</div>
    <div style="font-family:${SANS};font-size:12px;line-height:1.9;color:#bdbdbd;">
      48 Wall Street, New York, NY 10005<br>
      NYC <a href="tel:2129715353" style="color:#bdbdbd;text-decoration:none;">212.971.5353</a> &nbsp;&middot;&nbsp; LI <a href="tel:6317772244" style="color:#bdbdbd;text-decoration:none;">631.777.2244</a><br>
      <a href="${SITE_URL}" style="color:${GOLD};text-decoration:none;">48wallnyc.com</a>
    </div>
  </td></tr>

</table>
<div style="font-family:${SANS};font-size:11px;color:#9a948a;padding:16px 10px;">This link is personal to you &mdash; please don&rsquo;t forward it.</div>
</td></tr>
</table>
</body>
</html>`;

  return {
    subject: `Welcome to 48 Wall Street — your event ${noun}`,
    html,
  };
}

export interface SignedPacketContext {
  clientName: string;
  clientEmail: string;
  documents: string[];
  signedDate: string;
  location?: string;
  ipAddress?: string;
  reference: string;
  sentByName?: string;
}

const VERIFY_NOTE = `Each signed document is attached as its own PDF, together with a Certificate of Completion. Every file is digitally sealed with a SHA-256 signature and trusted timestamp, so any change to it is detectable &mdash; you can confirm a file is authentic at <a href="${SITE_URL}/verify" style="color:${GOLD};">48wallnyc.com/verify</a>.`;

/** Confirmation sent to the client after signing a packet. */
export function signedPacketClientEmail(ctx: SignedPacketContext) {
  const firstName = ctx.clientName.split(' ')[0] || ctx.clientName;
  return {
    subject: 'Your signed documents — 48 Wall Street Events',
    html: baseLayout({
      eyebrow: 'Documents signed successfully',
      intro: `Dear ${esc(firstName)}, thank you &mdash; we have received your signed documents. A copy of each is attached to this email for your records.`,
      rows: [
        ...ctx.documents.map((label, i) => ({
          label: `Document ${i + 1}`,
          value: label,
        })),
        { label: 'Signed by', value: ctx.clientName },
        { label: 'Date signed', value: ctx.signedDate },
        { label: 'Reference', value: ctx.reference },
      ],
      note: `${VERIFY_NOTE}<br><br>Our Event Services team will follow up shortly with next steps. If anything looks incorrect, reply to this email and we will take care of it.`,
    }),
  };
}

/** Internal copy for the events team (and whoever sent the packet). */
export function signedPacketStaffEmail(ctx: SignedPacketContext) {
  const count = ctx.documents.length;
  return {
    subject: `Signed: ${count} document${count === 1 ? '' : 's'} — ${ctx.clientName}`,
    html: baseLayout({
      eyebrow: 'Document packet signed',
      intro: `<strong>${esc(ctx.clientName)}</strong> has signed every document in their packet. Each executed PDF is attached separately, with the Certificate of Completion.`,
      rows: [
        { label: 'Client', value: ctx.clientName },
        { label: 'Email', value: ctx.clientEmail },
        { label: 'Documents', value: ctx.documents.join(', ') },
        { label: 'Date signed', value: ctx.signedDate },
        { label: 'Location', value: ctx.location ?? '' },
        { label: 'IP address', value: ctx.ipAddress ?? '' },
        { label: 'Sent by', value: ctx.sentByName ?? '' },
        { label: 'Reference', value: ctx.reference },
      ],
      note: `${VERIFY_NOTE} Card details are never included in the email body &mdash; only inside the attached PDF.`,
    }),
  };
}
