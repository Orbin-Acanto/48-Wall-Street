import { SubmitRequestBody } from '@/types';
import jsPDF from 'jspdf';
import {
  clientGuidelinesContent,
  documentTitle,
} from './client-guidelines-content';

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
  data: SubmitRequestBody
): Promise<string> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

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

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 30, 30);
    doc.text('48 WALL STREET', margin, 12);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Event Venue', margin, 17);

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

  const titleLines = doc.splitTextToSize(documentTitle, contentWidth);
  doc.text(titleLines, pageWidth / 2, yPos, { align: 'center' });
  yPos += titleLines.length * 7 + 10;

  for (const section of clientGuidelinesContent) {
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

  const refNumber = generateRefNumber();
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
  doc.text('UTC', pageWidth - margin - 10, yPos + 10, { align: 'right' });

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
