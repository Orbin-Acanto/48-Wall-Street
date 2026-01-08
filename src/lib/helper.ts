import { SubmitRequestBody } from '@/types';
import jsPDF from 'jspdf';
import {
  clientGuidelinesContent,
  documentTitle,
} from './client-guidelines-content';

function createPDFHelpers(doc: jsPDF, data: SubmitRequestBody) {
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

  const helpers = createPDFHelpers(doc, data);
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
