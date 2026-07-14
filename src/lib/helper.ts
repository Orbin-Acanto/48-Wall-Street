import { SubmitRequestBody } from '@/types';
import jsPDF from 'jspdf';
import {
  clientGuidelinesContent,
  documentTitle,
  type Section,
} from './client-guidelines-content';
import {
  rulesRegulationsContent,
  rulesRegulationsDocumentTitle,
} from './rules-regulations-content';

// ---------------------------------------------------------------------------
// Shared branding — logo header used across ALL signed PDFs.
// The logo is rendered from public/logo/48-wall-logo.png (generated from the
// brand SVG). If it can't be loaded, we fall back to the "48 WALL STREET"
// wordmark so a PDF is always produced.
// ---------------------------------------------------------------------------
const LOGO_ASPECT = 600 / 281; // width / height of the rendered logo PNG
let logoDataUrlCache: string | null = null;

async function getLogoDataUrl(): Promise<string | null> {
  if (logoDataUrlCache) return logoDataUrlCache;
  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const buf = await fs.readFile(
      path.join(process.cwd(), 'public', 'logo', '48-wall-logo.png')
    );
    logoDataUrlCache = `data:image/png;base64,${buf.toString('base64')}`;
    return logoDataUrlCache;
  } catch {
    return null;
  }
}

function drawHeaderLogo(
  doc: jsPDF,
  logoDataUrl: string | null,
  margin: number,
  headerHeight: number
) {
  if (!logoDataUrl) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 30, 30);
    doc.text('48 WALL STREET', margin, 12);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Event Venue', margin, 17);
    return;
  }
  const logoH = 11;
  const logoW = logoH * LOGO_ASPECT;
  doc.addImage(
    logoDataUrl,
    'PNG',
    margin,
    (headerHeight - logoH) / 2,
    logoW,
    logoH
  );
}

function createPDFHelpers(
  doc: jsPDF,
  data: SubmitRequestBody,
  logoDataUrl: string | null = null
) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  const footerHeight = 10;
  const headerHeight = 25;
  const goldColor: [number, number, number] = [210, 179, 113];

  const addHeader = () => {
    doc.setFillColor(250, 250, 250);
    doc.rect(0, 0, pageWidth, headerHeight, 'F');

    drawHeaderLogo(doc, logoDataUrl, margin, headerHeight);

    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    const rightX = pageWidth - margin;
    doc.text(data.clientName, rightX, 10, { align: 'right' });
    doc.text(data.clientEmail, rightX, 15, { align: 'right' });
    doc.text(`Signed: ${data.signedDate}`, rightX, 20, { align: 'right' });

    doc.setDrawColor(...goldColor);
    doc.setLineWidth(0.5);
    doc.line(margin, headerHeight, pageWidth - margin, headerHeight);
  };

  const addFooter = () => {
    const footerY = pageHeight - footerHeight;
    doc.setFillColor(...goldColor);
    doc.rect(0, footerY, pageWidth, footerHeight, 'F');

    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(
      '48 Wall Street • New York, NY 10005 • info@48wallnyc.com • 877.885.0705',
      pageWidth / 2,
      footerY + 6,
      { align: 'center' }
    );
  };

  let yPos = headerHeight + 10;

  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - footerHeight - 10) {
      addFooter();
      doc.addPage();
      addHeader();
      yPos = headerHeight + 10;
    }
  };

  const getYPos = () => yPos;
  const setYPos = (val: number) => {
    yPos = val;
  };
  const addYPos = (val: number) => {
    yPos += val;
  };

  const addCertificatePage = () => {
    doc.addPage();

    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    doc.setDrawColor(230, 235, 240);
    doc.setLineWidth(0.1);
    for (let i = 0; i < pageHeight; i += 5) {
      doc.line(0, i, pageWidth, i);
    }

    doc.setDrawColor(...goldColor);
    doc.setLineWidth(2);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

    doc.setLineWidth(0.5);
    doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

    let certYPos = 40;
    doc.setFontSize(28);
    doc.setFont('times', 'bold');
    doc.setTextColor(30, 30, 30);
    doc.text('CERTIFICATE', pageWidth / 2, certYPos, { align: 'center' });

    doc.setFontSize(20);
    doc.setFont('times', 'italic');
    doc.text('of', pageWidth / 2, certYPos + 10, { align: 'center' });

    doc.setFontSize(28);
    doc.setFont('times', 'bold');
    doc.text('SIGNATURE', pageWidth / 2, certYPos + 22, { align: 'center' });

    certYPos = 80;

    const refNumber = data.docId || `DOC-${Date.now()}`;
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('REF. NUMBER', margin + 10, certYPos);
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);
    doc.setFont('helvetica', 'bold');
    doc.text(refNumber, margin + 10, certYPos + 5);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(
      'DOCUMENT COMPLETED BY ALL PARTIES ON',
      pageWidth - margin - 10,
      certYPos,
      { align: 'right' }
    );
    doc.setFontSize(10);
    doc.setTextColor(30, 30, 30);
    doc.text(
      formatDateTime(data.signTime),
      pageWidth - margin - 10,
      certYPos + 5,
      { align: 'right' }
    );
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('UTC', pageWidth - margin - 10, certYPos + 10, { align: 'right' });

    certYPos = 105;

    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(margin + 10, certYPos, pageWidth - margin - 10, certYPos);

    certYPos = 115;

    const col1X = margin + 10;
    const col2X = pageWidth / 3 + 10;
    const col3X = (pageWidth / 3) * 2;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(60, 60, 60);
    doc.text('SIGNER', col1X, certYPos);

    doc.setFontSize(14);
    doc.setTextColor(30, 30, 30);
    doc.text(data.clientName.toUpperCase(), col1X, certYPos + 10);

    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('EMAIL', col1X, certYPos + 20);
    doc.setTextColor(30, 30, 30);
    doc.text(data.clientEmail.toUpperCase(), col1X, certYPos + 25);

    doc.setTextColor(100, 100, 100);
    doc.text('SHARED VIA', col1X, certYPos + 35);
    doc.setTextColor(30, 30, 30);
    doc.text('LINK', col1X, certYPos + 40);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(60, 60, 60);
    doc.text('TIMESTAMP', col2X, certYPos);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('SENT', col2X, certYPos + 10);
    doc.setTextColor(30, 30, 30);
    doc.text(formatDateTime(data.viewTime), col2X, certYPos + 15);

    doc.setTextColor(100, 100, 100);
    doc.text('VIEWED', col2X, certYPos + 25);
    doc.setTextColor(30, 30, 30);
    doc.text(formatDateTime(data.viewTime), col2X, certYPos + 30);

    doc.setTextColor(100, 100, 100);
    doc.text('SIGNED', col2X, certYPos + 40);
    doc.setTextColor(30, 30, 30);
    doc.text(formatDateTime(data.signTime), col2X, certYPos + 45);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(60, 60, 60);
    doc.text('SIGNATURE', col3X, certYPos);

    doc.setDrawColor(30, 30, 30);
    doc.setLineWidth(0.5);
    doc.rect(col3X, certYPos + 5, 50, 25);

    if (data.signature) {
      try {
        doc.addImage(data.signature, 'PNG', col3X + 2, certYPos + 7, 46, 21);
      } catch (e) {
        console.error('Failed to add signature:', e);
      }
    }

    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('IP ADDRESS', col3X, certYPos + 40);
    doc.setTextColor(30, 30, 30);
    doc.text(data.ipAddress, col3X, certYPos + 45);

    doc.setTextColor(100, 100, 100);
    doc.text('LOCATION', col3X, certYPos + 55);
    doc.setTextColor(30, 30, 30);
    const locationParts = data.location.split(', ');
    doc.text(locationParts.join(', ').toUpperCase(), col3X, certYPos + 60);

    addFooter();
  };

  return {
    pageWidth,
    pageHeight,
    margin,
    contentWidth,
    footerHeight,
    headerHeight,
    goldColor,
    addHeader,
    addFooter,
    checkPageBreak,
    getYPos,
    setYPos,
    addYPos,
    addCertificatePage,
  };
}

export function generateRefNumber(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments = [5, 5, 5, 5];
  return segments
    .map((len) =>
      Array.from(
        { length: len },
        () => chars[Math.floor(Math.random() * chars.length)]
      ).join('')
    )
    .join('-');
}

export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const months = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
  ];
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}

export async function generateSignedPDF(
  data: SubmitRequestBody,
  content: Section[] = clientGuidelinesContent,
  title: string = documentTitle
): Promise<string> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const logoDataUrl = await getLogoDataUrl();

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  const footerHeight = 10;
  const headerHeight = 25;
  let yPos = headerHeight + 10;

  const goldColor: [number, number, number] = [210, 179, 113];

  const addHeader = () => {
    doc.setFillColor(250, 250, 250);
    doc.rect(0, 0, pageWidth, headerHeight, 'F');

    drawHeaderLogo(doc, logoDataUrl, margin, headerHeight);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    const rightX = pageWidth - margin;
    doc.text(data.clientName, rightX, 10, { align: 'right' });
    doc.text(data.clientEmail, rightX, 15, { align: 'right' });
    doc.text(`Signed: ${data.signedDate}`, rightX, 20, { align: 'right' });

    doc.setDrawColor(...goldColor);
    doc.setLineWidth(0.5);
    doc.line(margin, headerHeight, pageWidth - margin, headerHeight);
  };

  const addFooter = () => {
    const footerY = pageHeight - footerHeight;
    doc.setFillColor(...goldColor);
    doc.rect(0, footerY, pageWidth, footerHeight, 'F');

    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(
      '48 Wall Street • New York, NY 10005 • info@48wallnyc.com • 877.885.0705',
      pageWidth / 2,
      footerY + 6,
      { align: 'center' }
    );
  };

  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - footerHeight - 10) {
      addFooter();
      doc.addPage();
      addHeader();
      yPos = headerHeight + 10;
    }
  };

  addHeader();

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 30, 30);

  const titleLines = doc.splitTextToSize(title, contentWidth);
  doc.text(titleLines, pageWidth / 2, yPos, { align: 'center' });
  yPos += titleLines.length * 7 + 10;

  for (const section of content) {
    checkPageBreak(30);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 30, 30);
    const sectionTitleLines = doc.splitTextToSize(section.title, contentWidth);
    doc.text(sectionTitleLines, margin, yPos);
    yPos += sectionTitleLines.length * 5 + 3;

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);

    for (const paragraph of section.content) {
      const lines = doc.splitTextToSize(paragraph, contentWidth);
      checkPageBreak(lines.length * 4 + 5);
      doc.text(lines, margin, yPos);
      yPos += lines.length * 4 + 3;
    }

    if (section.requiresInitials && data.initials[section.id]) {
      checkPageBreak(15);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Initialed: ${data.initials[section.id].initials} on ${new Date(
          data.initials[section.id].timestamp
        ).toLocaleString()}`,
        margin,
        yPos
      );
      yPos += 8;
    }

    yPos += 5;
  }

  checkPageBreak(60);
  yPos += 10;

  doc.setDrawColor(...goldColor);
  doc.setLineWidth(0.3);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 30, 30);
  doc.text('Client Acknowledgment & Authorization', margin, yPos);
  yPos += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Client Name:', margin, yPos);
  doc.setTextColor(30, 30, 30);
  doc.setFont('helvetica', 'bold');
  doc.text(data.typedName, margin + 30, yPos);
  yPos += 8;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Signature:', margin, yPos);
  yPos += 5;

  if (data.signature) {
    try {
      doc.addImage(data.signature, 'PNG', margin, yPos, 60, 25);
      yPos += 30;
    } catch (e) {
      console.error('Failed to add signature image:', e);
      yPos += 10;
    }
  }

  doc.setTextColor(100, 100, 100);
  doc.text('Date:', margin, yPos);
  doc.setTextColor(30, 30, 30);
  doc.text(data.signedDate, margin + 15, yPos);
  yPos += 8;

  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(`Location: ${data.location}`, margin, yPos);
  yPos += 5;
  doc.text(`IP Address: ${data.ipAddress}`, margin, yPos);

  addFooter();

  doc.addPage();

  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setDrawColor(230, 235, 240);
  doc.setLineWidth(0.1);
  for (let i = 0; i < pageHeight; i += 5) {
    doc.line(0, i, pageWidth, i);
  }

  doc.setDrawColor(...goldColor);
  doc.setLineWidth(2);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  doc.setLineWidth(0.5);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  yPos = 40;
  doc.setFontSize(28);
  doc.setFont('times', 'bold');
  doc.setTextColor(30, 30, 30);
  doc.text('CERTIFICATE', pageWidth / 2, yPos, { align: 'center' });

  doc.setFontSize(20);
  doc.setFont('times', 'italic');
  doc.text('of', pageWidth / 2, yPos + 10, { align: 'center' });

  doc.setFontSize(28);
  doc.setFont('times', 'bold');
  doc.text('SIGNATURE', pageWidth / 2, yPos + 22, { align: 'center' });

  yPos = 80;

  const refNumber =
    data.docId ||
    `DOC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('REF. NUMBER', margin + 10, yPos);
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);
  doc.setFont('helvetica', 'bold');
  doc.text(refNumber, margin + 10, yPos + 5);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text(
    'DOCUMENT COMPLETED BY ALL PARTIES ON',
    pageWidth - margin - 10,
    yPos,
    {
      align: 'right',
    }
  );
  doc.setFontSize(10);
  doc.setTextColor(30, 30, 30);
  doc.text(formatDateTime(data.signTime), pageWidth - margin - 10, yPos + 5, {
    align: 'right',
  });
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);

  yPos = 105;

  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.3);
  doc.line(margin + 10, yPos, pageWidth - margin - 10, yPos);

  yPos = 115;

  const col1X = margin + 10;
  const col2X = pageWidth / 3 + 10;
  const col3X = (pageWidth / 3) * 2;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 60, 60);
  doc.text('SIGNER', col1X, yPos);

  doc.setFontSize(14);
  doc.setTextColor(30, 30, 30);
  doc.text(data.clientName.toUpperCase(), col1X, yPos + 10);

  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('EMAIL', col1X, yPos + 20);
  doc.setTextColor(30, 30, 30);
  doc.text(data.clientEmail.toUpperCase(), col1X, yPos + 25);

  doc.setTextColor(100, 100, 100);
  doc.text('SHARED VIA', col1X, yPos + 35);
  doc.setTextColor(30, 30, 30);
  doc.text('LINK', col1X, yPos + 40);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 60, 60);
  doc.text('TIMESTAMP', col2X, yPos);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('SENT', col2X, yPos + 10);
  doc.setTextColor(30, 30, 30);
  doc.text(formatDateTime(data.viewTime), col2X, yPos + 15);

  doc.setTextColor(100, 100, 100);
  doc.text('VIEWED', col2X, yPos + 25);
  doc.setTextColor(30, 30, 30);
  doc.text(formatDateTime(data.viewTime), col2X, yPos + 30);

  doc.setTextColor(100, 100, 100);
  doc.text('SIGNED', col2X, yPos + 40);
  doc.setTextColor(30, 30, 30);
  doc.text(formatDateTime(data.signTime), col2X, yPos + 45);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 60, 60);
  doc.text('SIGNATURE', col3X, yPos);

  doc.setDrawColor(30, 30, 30);
  doc.setLineWidth(0.5);
  doc.rect(col3X, yPos + 5, 50, 25);

  if (data.signature) {
    try {
      doc.addImage(data.signature, 'PNG', col3X + 2, yPos + 7, 46, 21);
    } catch (e) {
      console.error('Failed to add signature:', e);
    }
  }

  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('IP ADDRESS', col3X, yPos + 40);
  doc.setTextColor(30, 30, 30);
  doc.text(data.ipAddress, col3X, yPos + 45);

  doc.setTextColor(100, 100, 100);
  doc.text('LOCATION', col3X, yPos + 55);
  doc.setTextColor(30, 30, 30);
  const locationParts = data.location.split(', ');
  doc.text(locationParts.join(', ').toUpperCase(), col3X, yPos + 60);

  addFooter();

  return doc.output('datauristring');
}

export async function generateAVProductionPDF(
  data: SubmitRequestBody
): Promise<string> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const logoDataUrl = await getLogoDataUrl();
  const helpers = createPDFHelpers(doc, data, logoDataUrl);
  const {
    margin,
    contentWidth,
    goldColor,
    addHeader,
    addFooter,
    checkPageBreak,
    getYPos,
    setYPos,
    addYPos,
    addCertificatePage,
    pageWidth,
  } = helpers;

  const formData = data.formData || {};

  const addSectionTitle = (title: string) => {
    checkPageBreak(15);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 30, 30);
    doc.text(title, margin, getYPos());
    addYPos(8);

    doc.setDrawColor(...goldColor);
    doc.setLineWidth(0.5);
    doc.line(margin, getYPos(), pageWidth - margin, getYPos());
    addYPos(6);
  };

  const addField = (label: string, value: string | string[] | undefined) => {
    checkPageBreak(10);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(80, 80, 80);
    doc.text(label, margin, getYPos());

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 30, 30);

    let displayValue = '';
    if (Array.isArray(value)) {
      displayValue = value.length > 0 ? value.join(', ') : 'N/A';
    } else {
      displayValue = value || 'N/A';
    }

    const valueLines = doc.splitTextToSize(displayValue, contentWidth - 50);
    doc.text(valueLines, margin + 50, getYPos());
    addYPos(Math.max(valueLines.length * 4, 6));
  };

  // Helper to add Yes/No field with details
  const addYesNoField = (
    label: string,
    value: string | undefined,
    details?: string
  ) => {
    checkPageBreak(10);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(80, 80, 80);
    doc.text(label, margin, getYPos());

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 30, 30);

    let yesNo = '';
    if (value === 'yes') {
      yesNo = '[X] Yes  [ ] No';
    } else if (value === 'no') {
      yesNo = '[ ] Yes  [X] No';
    } else {
      yesNo = '[ ] Yes  [ ] No';
    }

    doc.text(yesNo, margin + 60, getYPos());
    addYPos(5);

    if (value === 'yes' && details) {
      doc.setTextColor(60, 60, 60);
      const detailLines = doc.splitTextToSize(
        `Details: ${details}`,
        contentWidth - 10
      );
      doc.text(detailLines, margin + 5, getYPos());
      addYPos(detailLines.length * 4 + 2);
    }
  };

  const addPageInitials = (pageId: string, pageNum: number) => {
    checkPageBreak(15);
    addYPos(5);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.line(margin, getYPos(), pageWidth - margin, getYPos());
    addYPos(5);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 100, 100);

    if (data.initials[pageId]) {
      doc.text(
        `Page ${pageNum} - Initialed: ${data.initials[pageId].initials} on ${new Date(data.initials[pageId].timestamp).toLocaleString()}`,
        margin,
        getYPos()
      );
    } else {
      doc.text(`Page ${pageNum}`, margin, getYPos());
    }
    addYPos(8);
  };

  addHeader();

  // Document Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 30, 30);
  doc.text(
    'Event Production and AV Requirements Form',
    pageWidth / 2,
    getYPos(),
    { align: 'center' }
  );
  addYPos(12);

  // Page 1: Client Details & Audio Requirements
  addSectionTitle('Client Details');
  addField('Name/Company:', formData.nameCompany);
  addField('Event Date:', formData.eventDate);
  addField('Email:', formData.email);
  addField('Phone:', formData.phone);

  addYPos(5);
  addSectionTitle('Audio Requirements');
  addField('Number of Microphones:', formData.numberOfMics);
  addField('Microphone Types:', formData.micTypes);
  addYesNoField(
    'Audience Q&A Mics:',
    formData.audienceQAMics,
    formData.audienceQAMicsCount
      ? `Count: ${formData.audienceQAMicsCount}`
      : undefined
  );
  addYesNoField(
    'Live Music/Performances:',
    formData.liveMusic,
    formData.liveMusicDetails
  );
  addYesNoField('Stage Monitor:', formData.stageMonitor);
  addYesNoField(
    'Background/Pre-Recorded Audio:',
    formData.backgroundAudio,
    formData.backgroundAudioSource
  );

  addPageInitials('page1', 1);

  // Page 2: Visual Requirements
  addSectionTitle('Visual Requirements');
  addYesNoField('Presentations/Slideshows:', formData.presentations);
  if (formData.presentations === 'yes') {
    addField('Presentation Format:', formData.presentationFormat);
    if (formData.presentationFormat?.includes('other')) {
      addField('Other Format:', formData.presentationFormatOther);
    }
    addField('Aspect Ratio:', formData.aspectRatio);
  }
  addField('Display Equipment:', formData.displayEquipment);
  if (formData.displayEquipment?.includes('other')) {
    addField('Other Equipment:', formData.displayEquipmentOther);
  }
  addField('Screen Positioning:', formData.screenPositioning);
  addYesNoField('Confidence Monitor:', formData.confidenceMonitor);
  addYesNoField(
    'Video Playback:',
    formData.videoPlayback,
    formData.videoPlaybackSource
  );
  addYesNoField('Live Video/IMAG:', formData.liveVideoIMAG);
  addYesNoField('Streaming/Video Conferencing:', formData.streaming);
  if (formData.streaming === 'yes') {
    addField('Platform:', formData.streamingPlatform);
    if (formData.streamingPlatform?.includes('other')) {
      addField('Other Platform:', formData.streamingPlatformOther);
    }
  }
  addYesNoField('Multi-Camera Setup:', formData.multiCamera);
  if (formData.multiCamera === 'yes') {
    addField('Camera Count:', formData.multiCameraCount);
    addField('Desired Angles:', formData.multiCameraAngles);
  }
  addField('Visual Branding Needs:', formData.visualBranding);

  addPageInitials('page2', 2);

  // Page 3: Lighting & Staging
  addSectionTitle('Lighting Requirements');
  addField('Type of Lighting:', formData.lightingType);
  addField('Lighting Tone Preferences:', formData.lightingTone);
  addYesNoField(
    'Special Lighting Effects:',
    formData.specialLighting,
    formData.specialLightingDetails
  );
  addField('Areas Requiring Lighting:', formData.lightingAreas);
  addYesNoField(
    'Outdoor Lighting:',
    formData.outdoorLighting,
    formData.outdoorLightingDetails
  );

  addYPos(5);
  addSectionTitle('Staging and Rigging');
  addYesNoField('Stage/Platform Required:', formData.stagePlatform);
  if (formData.stagePlatform === 'yes') {
    addField('Size/Height:', formData.stageSizeHeight);
    addField('Stage Features:', formData.stageFeatures);
    if (formData.stageFeatures?.includes('other')) {
      addField('Other Features:', formData.stageFeaturesOther);
    }
  }
  addField('Max People on Stage:', formData.maxPeopleOnStage);
  addYesNoField(
    'Set Design/Décor:',
    formData.setDesign,
    formData.setDesignDetails
  );
  addField('Stage Furniture:', formData.stageFurniture);
  if (formData.stageFurniture?.includes('other')) {
    addField('Other Furniture:', formData.stageFurnitureOther);
  }

  addPageInitials('page3', 3);

  // Page 4: Technical & Event Flow
  addSectionTitle('Technical and Power Requirements');
  addYesNoField(
    'Internet/Wi-Fi Required:',
    formData.internetWifi,
    formData.bandwidthSpecs
  );
  addYesNoField(
    'Temporary Power Outlets:',
    formData.tempPowerOutlets,
    formData.tempPowerPurpose
  );

  addYPos(5);
  addSectionTitle('Event Flow and Logistics');
  addField(
    'Event Schedule:',
    formData.eventSchedule === 'attached'
      ? 'Attached separately'
      : 'Described below'
  );
  if (formData.eventSchedule === 'described' && formData.eventScheduleDetails) {
    const scheduleLines = doc.splitTextToSize(
      formData.eventScheduleDetails,
      contentWidth - 5
    );
    checkPageBreak(scheduleLines.length * 4 + 5);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text(scheduleLines, margin + 5, getYPos());
    addYPos(scheduleLines.length * 4 + 3);
  }
  addYesNoField('Multiple Sessions/Breakout Rooms:', formData.breakoutRooms);
  if (formData.breakoutRooms === 'yes') {
    addField('Number of Rooms:', formData.breakoutRoomsCount);
    addField('AV Needs:', formData.breakoutRoomsAV);
  }
  addYesNoField(
    'Rehearsals/Tech Checks:',
    formData.rehearsals,
    formData.rehearsalsTiming
  );
  addYesNoField(
    'Special Performances:',
    formData.specialPerformances,
    formData.specialPerformancesDetails
  );

  addPageInitials('page4', 4);

  // Page 5: Additional Services
  addYesNoField(
    'Time-Sensitive Cues:',
    formData.timeSensitiveCues,
    formData.timeSensitiveCuesDetails
  );

  addYPos(5);
  addSectionTitle('Additional Services and Preferences');
  addYesNoField(
    'Recording/Post-Production:',
    formData.recordingServices,
    formData.recordingServicesDetails
  );
  addYesNoField(
    'Technical Rider/Documentation:',
    formData.technicalRider,
    formData.technicalRiderDetails
  );
  addField('On-Site Contact Name:', formData.onSiteContactName);
  addField('On-Site Contact Phone/Email:', formData.onSiteContactPhone);
  addField('AV Budget Range:', formData.avBudget);

  if (formData.otherNotes) {
    checkPageBreak(20);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(80, 80, 80);
    doc.text('Other Notes/Special Requests:', margin, getYPos());
    addYPos(5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const notesLines = doc.splitTextToSize(
      formData.otherNotes,
      contentWidth - 5
    );
    doc.text(notesLines, margin + 5, getYPos());
    addYPos(notesLines.length * 4 + 3);
  }

  addPageInitials('page5', 5);

  // Signature Section
  checkPageBreak(60);
  addYPos(10);

  doc.setDrawColor(...goldColor);
  doc.setLineWidth(0.5);
  doc.line(margin, getYPos(), pageWidth - margin, getYPos());
  addYPos(10);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 30, 30);
  doc.text('Client Signature', margin, getYPos());
  addYPos(8);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text(
    'By signing below, I confirm that the information provided in this form is accurate and complete.',
    margin,
    getYPos()
  );
  addYPos(10);

  // Client Name
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Full Name:', margin, getYPos());
  doc.setTextColor(30, 30, 30);
  doc.setFont('helvetica', 'bold');
  doc.text(data.typedName, margin + 25, getYPos());
  addYPos(8);

  // Signature
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Signature:', margin, getYPos());
  addYPos(5);

  if (data.signature) {
    try {
      doc.addImage(data.signature, 'PNG', margin, getYPos(), 60, 25);
      addYPos(30);
    } catch (e) {
      console.error('Failed to add signature image:', e);
      addYPos(10);
    }
  }

  // Date
  doc.setTextColor(100, 100, 100);
  doc.text('Date:', margin, getYPos());
  doc.setTextColor(30, 30, 30);
  doc.text(data.signedDate, margin + 15, getYPos());
  addYPos(8);

  // Location & IP
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(`Location: ${data.location}`, margin, getYPos());
  addYPos(5);
  doc.text(`IP Address: ${data.ipAddress}`, margin, getYPos());

  addFooter();
  addCertificatePage();

  return doc.output('datauristring');
}

export async function generateCreditCardAuthPDF(
  data: SubmitRequestBody
): Promise<string> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const logoDataUrl = await getLogoDataUrl();
  const helpers = createPDFHelpers(doc, data, logoDataUrl);
  const {
    margin,
    contentWidth,
    goldColor,
    addFooter,
    addCertificatePage,
    pageWidth,
    pageHeight,
  } = helpers;

  const formData = data.formData || {};

  // Header for Credit Card Aut=
  const addCreditCardHeader = () => {
    // Logo area (left side)
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 30, 30);
    doc.text('48', margin, 18);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('WALL', margin + 12, 12);
    doc.text('STREET', margin + 12, 16);
    doc.setTextColor(...goldColor);
    doc.text('EVENTS', margin + 12, 20);

    doc.setFontSize(6);
    doc.setTextColor(...goldColor);
    doc.text('HISTORIC VENUE LOCATION', margin, 24);

    // Title (right side)
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 30, 30);
    doc.text('CREDIT CARD AUTHORIZATION FORM', pageWidth - margin, 15, {
      align: 'right',
    });

    // Contact info line
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.text(
      '48 Wall St • New York, NY 10005 • LI: 631.777.2244 • NYC: 212.971.5353 • Fax: 631.980.0271',
      pageWidth / 2,
      32,
      { align: 'center' }
    );

    // Divider line
    doc.setDrawColor(...goldColor);
    doc.setLineWidth(0.5);
    doc.line(margin, 35, pageWidth - margin, 35);
  };

  let yPos = 40;

  addCreditCardHeader();

  // Form Information Box
  doc.setDrawColor(...goldColor);
  doc.setLineWidth(1);
  doc.rect(margin, yPos, contentWidth, 45);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 30, 30);
  doc.text('FORM INFORMATION', margin + 3, yPos + 6);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);

  const formInfoY = yPos + 12;
  doc.text(
    '1. Fill in all blank spaces. Specify charges to be paid with this card.',
    margin + 3,
    formInfoY
  );
  doc.setFont('helvetica', 'bold');
  doc.text('ONLY THE CARDHOLDER CAN SIGN THIS FORM.', margin + 85, formInfoY);

  doc.setFont('helvetica', 'normal');
  doc.text('2. Please send back to:', margin + 3, formInfoY + 5);

  doc.setFont('helvetica', 'bold');
  doc.text('48 WALL STREET EVENTS INC.', margin + 8, formInfoY + 10);
  doc.text('140 Florida St', margin + 8, formInfoY + 14);
  doc.text('Farmingdale, NY 11735', margin + 8, formInfoY + 18);
  doc.setFont('helvetica', 'normal');
  doc.text('LI:    631.777.2244', margin + 8, formInfoY + 22);
  doc.text('NYC: 212.971.5353', margin + 8, formInfoY + 26);
  doc.text('FAX:  631.980.0271', margin + 8, formInfoY + 30);

  yPos += 50;

  // Authorization Text
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 30, 30);

  const authText1 = `I, ${formData.cardholderName || '_________________'}, hereby authorize 48 Wall Street Events Inc. to charge the credit card listed below in the amount of $${formData.authorizedAmount || '_______'} ("the charge").`;
  const authLines1 = doc.splitTextToSize(authText1, contentWidth);
  doc.text(authLines1, margin, yPos);
  yPos += authLines1.length * 4 + 4;

  const authText2 =
    'I further authorize 48 Wall Street Events Inc. to apply my signature to any and all documents required to complete this charge and future charges between myself and 48 Wall Street Events Inc. and indemnify and hold harmless 48 Wall Street Events Inc. for any liability arising herefrom or therefrom. I understand and agree that for a period of two years from the date of signing, I am authorizing 48 Wall Street Events Inc. to charge this credit card for any amounts owed to 48 Wall Street Events Inc., including, among other things, retainer payments, final payments or remaining payments to satisfy a contract balance, debts arising from having additional guests at an event beyond a contracted amount, charges arising from damage to the venue, equipment, or persons at an event, an event lasting beyond its scheduled end time, additional labor required to put on an event, and any additional goods or services requested at an event.';
  const authLines2 = doc.splitTextToSize(authText2, contentWidth);
  doc.text(authLines2, margin, yPos);
  yPos += authLines2.length * 4 + 4;

  const authText3 =
    'Nothing in this Credit Card Authorization shall cause 48 Wall Street Events Inc. to waive its rights to charge the credit card for any of the amounts owed to 48 Wall Street Events Inc. under any other agreement.';
  const authLines3 = doc.splitTextToSize(authText3, contentWidth);
  doc.text(authLines3, margin, yPos);
  yPos += authLines3.length * 4 + 4;

  // Warning Box
  doc.setFillColor(255, 240, 240);
  doc.setDrawColor(200, 50, 50);
  doc.setLineWidth(0.5);
  doc.rect(margin, yPos, contentWidth, 12, 'FD');

  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(180, 0, 0);
  const warningText =
    '**Please note, all sales are FINAL and that your credit card billing statement will reflect the above amount, plus the additional 5.85% processing fee for Visa, Discover, Mastercard or a 6.75% processing fee for American Express.**';
  const warningLines = doc.splitTextToSize(warningText, contentWidth - 6);
  doc.text(warningLines, pageWidth / 2, yPos + 4, { align: 'center' });
  yPos += 16;

  // Cardholder's Information Section
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 30, 30);
  doc.text("CARDHOLDER'S INFORMATION", margin, yPos);
  yPos += 2;

  // Table for card info
  const tableStartY = yPos;
  const cellHeight = 12;
  const col1Width = 40;
  const col2Width = 65;
  const col3Width = 40;
  const col4Width = 25;

  doc.setDrawColor(150, 150, 150);
  doc.setLineWidth(0.3);

  // Row 1: Type of Card | Credit Card Number | Expiration Date | CVV
  doc.rect(margin, yPos, col1Width, cellHeight);
  doc.rect(margin + col1Width, yPos, col2Width, cellHeight);
  doc.rect(margin + col1Width + col2Width, yPos, col3Width, cellHeight);
  doc.rect(
    margin + col1Width + col2Width + col3Width,
    yPos,
    col4Width,
    cellHeight
  );

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('TYPE OF CARD', margin + 2, yPos + 4);
  doc.text('CREDIT CARD NUMBER', margin + col1Width + 2, yPos + 4);
  doc.text('EXPIRATION DATE', margin + col1Width + col2Width + 2, yPos + 4);
  doc.text(
    'CVV CODE',
    margin + col1Width + col2Width + col3Width + 2,
    yPos + 4
  );

  doc.setFontSize(9);
  doc.setTextColor(30, 30, 30);
  const cardTypeDisplay = formData.cardType
    ? formData.cardType.charAt(0).toUpperCase() + formData.cardType.slice(1)
    : '';
  doc.text(cardTypeDisplay, margin + 2, yPos + 9);

  // card number and cvv
  const cardNum = formData.creditCardNumber || '';
  const cvv = formData.cvv || '';

  doc.text(cardNum, margin + col1Width + 2, yPos + 9);
  doc.text(
    formData.expirationDate || '',
    margin + col1Width + col2Width + 2,
    yPos + 9
  );
  doc.text(cvv, margin + col1Width + col2Width + col3Width + 2, yPos + 9);

  yPos += cellHeight;

  // Row 2: Cardholder's Name | Billing Address
  const col1_2Width = 70;
  const col2_2Width = 100;
  doc.rect(margin, yPos, col1_2Width, cellHeight);
  doc.rect(margin + col1_2Width, yPos, col2_2Width, cellHeight);

  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text("CARDHOLDER'S NAME", margin + 2, yPos + 4);
  doc.text('BILLING ADDRESS', margin + col1_2Width + 2, yPos + 4);

  doc.setFontSize(9);
  doc.setTextColor(30, 30, 30);
  doc.text(formData.cardholderName || '', margin + 2, yPos + 9);
  const billingLines = doc.splitTextToSize(
    formData.billingAddress || '',
    col2_2Width - 4
  );
  doc.text(billingLines[0] || '', margin + col1_2Width + 2, yPos + 9);

  yPos += cellHeight;

  // Row 3: Home Phone | Work Phone | Cell Phone
  const phoneColWidth = 56.67;
  doc.rect(margin, yPos, phoneColWidth, cellHeight);
  doc.rect(margin + phoneColWidth, yPos, phoneColWidth, cellHeight);
  doc.rect(margin + phoneColWidth * 2, yPos, phoneColWidth, cellHeight);

  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text('HOME PHONE', margin + 2, yPos + 4);
  doc.text('WORK PHONE', margin + phoneColWidth + 2, yPos + 4);
  doc.text('CELL PHONE', margin + phoneColWidth * 2 + 2, yPos + 4);

  doc.setFontSize(9);
  doc.setTextColor(30, 30, 30);
  doc.text(formData.homePhone || '', margin + 2, yPos + 9);
  doc.text(formData.workPhone || '', margin + phoneColWidth + 2, yPos + 9);
  doc.text(formData.cellPhone || '', margin + phoneColWidth * 2 + 2, yPos + 9);

  yPos += cellHeight + 5;

  // Signature Row
  const sigColWidth = 85;
  doc.rect(margin, yPos, sigColWidth, 20);
  doc.rect(margin + sigColWidth, yPos, sigColWidth, 20);

  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text('CARDHOLDER SIGNATURE', margin + 2, yPos + 4);
  doc.text(
    '48 WALL ST REPRESENTATIVE SIGNATURE',
    margin + sigColWidth + 2,
    yPos + 4
  );

  // Add signature image
  if (data.signature) {
    try {
      doc.addImage(data.signature, 'PNG', margin + 2, yPos + 6, 40, 12);
    } catch (e) {
      console.error('Failed to add signature:', e);
    }
  }

  yPos += 25;

  // Event Information Section
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 30, 30);
  doc.text('EVENT INFORMATION', margin, yPos);
  yPos += 2;

  const eventColWidth = 56.67;
  doc.setDrawColor(150, 150, 150);
  doc.rect(margin, yPos, eventColWidth, cellHeight);
  doc.rect(margin + eventColWidth, yPos, eventColWidth, cellHeight);
  doc.rect(margin + eventColWidth * 2, yPos, eventColWidth, cellHeight);

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('EVENT DATE', margin + 2, yPos + 4);
  doc.text('TYPE OF EVENT', margin + eventColWidth + 2, yPos + 4);
  doc.text('EVENT LOCATION', margin + eventColWidth * 2 + 2, yPos + 4);

  doc.setFontSize(9);
  doc.setTextColor(30, 30, 30);

  // Format event date
  let eventDateDisplay = formData.eventDate || '';
  if (eventDateDisplay) {
    const eventDate = new Date(eventDateDisplay);
    eventDateDisplay = eventDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  doc.text(eventDateDisplay, margin + 2, yPos + 9);
  doc.text(formData.typeOfEvent || '', margin + eventColWidth + 2, yPos + 9);
  doc.text(
    formData.eventLocation || '',
    margin + eventColWidth * 2 + 2,
    yPos + 9
  );

  yPos += cellHeight + 10;

  // Signing Details
  doc.setDrawColor(...goldColor);
  doc.setLineWidth(0.3);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 6;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);

  doc.text('Signed by:', margin, yPos);
  doc.setTextColor(30, 30, 30);
  doc.setFont('helvetica', 'bold');
  doc.text(data.typedName, margin + 22, yPos);
  yPos += 5;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Date:', margin, yPos);
  doc.setTextColor(30, 30, 30);
  doc.text(data.signedDate, margin + 22, yPos);
  yPos += 5;

  doc.setTextColor(100, 100, 100);
  doc.text('Location:', margin, yPos);
  doc.setTextColor(30, 30, 30);
  doc.text(data.location, margin + 22, yPos);
  yPos += 5;

  doc.setTextColor(100, 100, 100);
  doc.text('IP Address:', margin, yPos);
  doc.setTextColor(30, 30, 30);
  doc.text(data.ipAddress, margin + 22, yPos);

  addFooter();
  addCertificatePage();

  return doc.output('datauristring');
}

// ---------------------------------------------------------------------------
// Rules & Regulations — rendered with the shared signed-PDF renderer so it
// gets the same branded header/footer, per-section initials, signature block,
// and certificate page as every other signed document.
// ---------------------------------------------------------------------------
export async function generateRulesRegulationsPDF(
  data: SubmitRequestBody
): Promise<string> {
  return generateSignedPDF(
    data,
    rulesRegulationsContent,
    rulesRegulationsDocumentTitle
  );
}
