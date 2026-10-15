import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from 'pdf-lib';

/**
 * "Certificate of Completion": the audit trail appended to an executed packet.
 * Records who signed, how, when and from where, and the SHA-256 fingerprint of
 * every document so the copy can be checked against our records later.
 */

export interface CompletionDetails {
  reference: string;
  clientName: string;
  clientEmail: string;
  typedName: string;
  initials: string;
  signaturePng: string;
  ipAddress: string;
  location: string;
  userAgent: string;
  sentBy?: string;
  sentAt?: string;
  viewedAt?: string;
  signedAt: string;
  documents: { label: string; pages: number; sha256: string }[];
  initialsPlaced: number;
  verifyUrl: string;
}

const INK = rgb(0.1, 0.1, 0.1);
const MUTED = rgb(0.42, 0.42, 0.42);
const GOLD = rgb(0.72, 0.59, 0.31);
const RULE = rgb(0.88, 0.88, 0.88);

function formatTime(iso?: string): string {
  if (!iso) return '—';
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? iso
    : date.toLocaleString('en-US', {
        timeZone: 'America/New_York',
        dateStyle: 'long',
        timeStyle: 'long',
      });
}

/** Greedy word wrap; long unbroken tokens (hashes) are split by width. */
function wrap(
  text: string,
  font: PDFFont,
  size: number,
  width: number
): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= width) {
      line = candidate;
      continue;
    }
    if (line) lines.push(line);
    line = word;
    while (font.widthOfTextAtSize(line, size) > width) {
      let cut = line.length;
      while (
        cut > 1 &&
        font.widthOfTextAtSize(line.slice(0, cut), size) > width
      )
        cut--;
      lines.push(line.slice(0, cut));
      line = line.slice(cut);
    }
  }
  if (line) lines.push(line);
  return lines;
}

// pdf-lib standard fonts are WinAnsi only; drop anything they cannot encode.
const safe = (text: string) => text.replace(/[^\x20-\x7E\xA0-\xFF]/g, '?');

export async function appendCompletionCertificate(
  pdf: PDFDocument,
  details: CompletionDetails
): Promise<void> {
  const serif = await pdf.embedFont(StandardFonts.TimesRoman);
  const sans = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const mono = await pdf.embedFont(StandardFonts.Courier);

  const width = 595.28;
  const height = 841.89;
  const margin = 48;
  const inner = width - margin * 2;

  let page: PDFPage = pdf.addPage([width, height]);
  let y = height - margin;

  const ensure = (needed: number) => {
    if (y - needed < margin + 30) {
      page = pdf.addPage([width, height]);
      y = height - margin;
    }
  };

  const text = (
    value: string,
    opts: {
      font?: PDFFont;
      size?: number;
      color?: ReturnType<typeof rgb>;
      x?: number;
      maxWidth?: number;
      gap?: number;
    } = {}
  ) => {
    const font = opts.font ?? sans;
    const size = opts.size ?? 9.5;
    const x = opts.x ?? margin;
    for (const line of wrap(
      safe(value),
      font,
      size,
      opts.maxWidth ?? inner - (x - margin)
    )) {
      ensure(size + 4);
      page.drawText(line, {
        x,
        y: y - size,
        size,
        font,
        color: opts.color ?? INK,
      });
      y -= size + (opts.gap ?? 3.5);
    }
  };

  const heading = (label: string) => {
    ensure(40);
    y -= 14;
    page.drawText(label.toUpperCase(), {
      x: margin,
      y: y - 9,
      size: 9,
      font: bold,
      color: GOLD,
    });
    y -= 15;
    page.drawLine({
      start: { x: margin, y },
      end: { x: width - margin, y },
      thickness: 0.6,
      color: RULE,
    });
    y -= 8;
  };

  const row = (label: string, value: string) => {
    const startY = y;
    text(label, { font: sans, size: 8.5, color: MUTED, maxWidth: 130 });
    const afterLabel = y;
    y = startY;
    text(value || '—', { x: margin + 140, maxWidth: inner - 140 });
    y = Math.min(y, afterLabel) - 2;
  };

  // Header
  page.drawRectangle({
    x: 0,
    y: height - 92,
    width,
    height: 92,
    color: rgb(0.04, 0.04, 0.04),
  });
  page.drawText('48 WALL STREET EVENTS', {
    x: margin,
    y: height - 44,
    size: 10,
    font: bold,
    color: GOLD,
  });
  page.drawText('Certificate of Completion', {
    x: margin,
    y: height - 72,
    size: 22,
    font: serif,
    color: rgb(1, 1, 1),
  });
  page.drawRectangle({ x: 0, y: height - 95, width, height: 3, color: GOLD });
  y = height - 118;

  text(
    `This certificate records the electronic signing of the documents listed below. Each document is fingerprinted with SHA-256 and the complete file is digitally sealed by 48 Wall Street Events with a trusted timestamp; any change to the file invalidates the seal. To confirm this copy matches our records, upload it at ${details.verifyUrl}, or inspect the signature in Adobe Acrobat's Signature Panel.`,
    { size: 9.5, color: MUTED }
  );

  heading('Envelope');
  row('Reference', details.reference);
  row('Documents', String(details.documents.length));
  row(
    'Initials placed',
    `${details.initialsPlaced} (adopted once, applied to every required section)`
  );
  row('Status', 'Completed');

  heading('Signer');
  row('Name', details.clientName);
  row('Email', details.clientEmail);
  row('Typed legal name', details.typedName);
  row('Adopted initials', details.initials);
  row('IP address', details.ipAddress);
  row('Location (approx.)', details.location);
  row('Device', details.userAgent);

  ensure(80);
  page.drawText('Adopted signature', {
    x: margin,
    y: y - 9,
    size: 8.5,
    font: sans,
    color: MUTED,
  });
  try {
    const image = await pdf.embedPng(details.signaturePng);
    const scaled = image.scaleToFit(200, 70);
    page.drawRectangle({
      x: margin + 138,
      y: y - 76,
      width: 214,
      height: 78,
      borderColor: RULE,
      borderWidth: 0.6,
    });
    page.drawImage(image, {
      x: margin + 145,
      y: y - 73,
      width: scaled.width,
      height: scaled.height,
    });
  } catch {
    page.drawText('[signature image unavailable]', {
      x: margin + 140,
      y: y - 9,
      size: 9,
      font: sans,
      color: MUTED,
    });
  }
  y -= 86;

  heading('Timeline (New York time)');
  row(
    'Sent',
    `${formatTime(details.sentAt)}${details.sentBy ? ` by ${details.sentBy}` : ''}`
  );
  row('Opened', formatTime(details.viewedAt));
  row('Signed', formatTime(details.signedAt));
  row(
    'Consent',
    'Agreed to sign electronically and to the terms of each document listed.'
  );

  heading('Documents (SHA-256 fingerprints)');
  details.documents.forEach((doc, i) => {
    text(
      `${i + 1}. ${doc.label}  (${doc.pages} page${doc.pages === 1 ? '' : 's'})`,
      { font: bold, size: 9 }
    );
    text(doc.sha256, {
      font: mono,
      size: 7.5,
      color: MUTED,
      x: margin + 12,
      gap: 6,
    });
  });
}
