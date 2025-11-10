import jsPDF from 'jspdf';
import 'svg2pdf.js';
import { EventDetails, FloorPlanData } from '../types/floorplan.types';

export const exportToJSON = (data: FloorPlanData, filename?: string): void => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `floorplan-${data.name}-${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importFromJSON = (file: File): Promise<FloorPlanData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content) as FloorPlanData;

        if (validateFloorPlanData(data)) {
          resolve(data);
        } else {
          reject(new Error('Invalid floor plan data format'));
        }
      } catch (error) {
        reject(new Error('Failed to parse JSON file'));
        console.log(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};

export const validateFloorPlanData = (
  data: FloorPlanData
): data is FloorPlanData => {
  if (!data || typeof data !== 'object') return false;

  const requiredFields = [
    'id',
    'name',
    'version',
    'walls',
    'rooms',
    'furniture',
    'eventDetails',
    'canvasSettings',
  ];

  return requiredFields.every((field) => field in data);
};

type ExportLayoutOptions = {
  filename?: string;
  hideGrid?: boolean;
  headerTitle?: string;
  clientName?: string;
  eventDate?: string;
  logoUrl?: string;
};

type BBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const DEFAULT_LOGO_URL = '/logo/48-wall-logo.svg';

const getFloorplanBBox = (svg: SVGSVGElement): BBox => {
  const content =
    (svg.querySelector('#floorplan-content') as SVGGElement | null) || svg;

  try {
    const bbox = content.getBBox();
    if (bbox.width > 0 && bbox.height > 0) {
      return {
        x: bbox.x,
        y: bbox.y,
        width: bbox.width,
        height: bbox.height,
      };
    }
  } catch {}

  const vb = svg.viewBox.baseVal;
  if (vb && vb.width > 0 && vb.height > 0) {
    return { x: vb.x, y: vb.y, width: vb.width, height: vb.height };
  }

  const rect = svg.getBoundingClientRect();
  return {
    x: 0,
    y: 0,
    width: rect.width || 1000,
    height: rect.height || 600,
  };
};

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });

const createPlanImage = async (
  svg: SVGSVGElement,
  hideGrid: boolean
): Promise<{ img: HTMLImageElement; width: number; height: number }> => {
  const bbox = getFloorplanBBox(svg);

  const padding = 8;
  const viewBoxX = bbox.x - padding;
  const viewBoxY = bbox.y - padding;
  const viewBoxWidth = Math.max(bbox.width + padding * 2, 1);
  const viewBoxHeight = Math.max(bbox.height + padding * 2, 1);

  const clonedSvg = svg.cloneNode(true) as SVGSVGElement;

  if (hideGrid) {
    clonedSvg
      .querySelectorAll(
        '.grid-overlay, .grid, [data-grid="true"], [data-testid="grid"]'
      )
      .forEach((el) => el.parentNode?.removeChild(el));
  }

  clonedSvg.removeAttribute('style');

  clonedSvg.setAttribute(
    'viewBox',
    `${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`
  );
  clonedSvg.setAttribute('width', String(viewBoxWidth));
  clonedSvg.setAttribute('height', String(viewBoxHeight));

  const svgData = new XMLSerializer().serializeToString(clonedSvg);
  const blob = new Blob([svgData], {
    type: 'image/svg+xml;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);

  try {
    const img = await loadImage(url);
    return {
      img,
      width: img.width || viewBoxWidth,
      height: img.height || viewBoxHeight,
    };
  } finally {
    URL.revokeObjectURL(url);
  }
};

const imageToPngDataUrl = (img: HTMLImageElement): string => {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL('image/png');
};

const getLogoDataUrl = async (logoUrl: string): Promise<string | null> => {
  try {
    const logoImg = await loadImage(logoUrl);
    const canvas = document.createElement('canvas');
    canvas.width = logoImg.width;
    canvas.height = logoImg.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(logoImg, 0, 0);
    return canvas.toDataURL('image/png');
  } catch {
    return null;
  }
};

export const exportToSVG = (
  data: FloorPlanData,
  svgElement: SVGSVGElement,
  filename?: string
): void => {
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const blob = new Blob([svgData], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `floorplan-${data.name}-${Date.now()}.svg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToPNG = async (
  data: FloorPlanData,
  svgElement: SVGSVGElement,
  options: ExportLayoutOptions = {}
): Promise<void> => {
  const {
    filename,
    hideGrid = true,
    headerTitle,
    clientName,
    eventDate,
    logoUrl = DEFAULT_LOGO_URL,
  } = options;

  const {
    img: planImg,
    width: planW,
    height: planH,
  } = await createPlanImage(svgElement, hideGrid);

  const logoDataUrl = await getLogoDataUrl(logoUrl);

  const margin = 50;
  const headerHeight = 130;
  const footerHeight = 60;
  const pageWidth = 1400;

  const availableWidth = pageWidth - margin * 2;
  const availableHeight = 1000;

  const planScale = Math.min(availableWidth / planW, availableHeight / planH);
  const drawPlanW = planW * planScale;
  const drawPlanH = planH * planScale;

  const pageHeight = headerHeight + footerHeight + drawPlanH + margin * 3;

  const canvas = document.createElement('canvas');
  canvas.width = pageWidth;
  canvas.height = pageHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.error('Failed to get canvas context for PNG export');
    return;
  }

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, pageWidth, pageHeight);

  const headerX = margin;
  const headerY = margin;
  const headerW = pageWidth - margin * 2;
  const headerInnerH = headerHeight - 20;

  ctx.strokeStyle = '#111827';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(headerX, headerY, headerW, headerInnerH);

  const colWidth = headerW / 3;

  ctx.beginPath();
  ctx.moveTo(headerX + colWidth, headerY);
  ctx.lineTo(headerX + colWidth, headerY + headerInnerH);
  ctx.moveTo(headerX + 2 * colWidth, headerY);
  ctx.lineTo(headerX + 2 * colWidth, headerY + headerInnerH);
  ctx.stroke();

  if (logoDataUrl) {
    try {
      const logoImg = await loadImage(logoDataUrl);
      const logoMaxH = 50;
      const logoMaxW = colWidth * 0.7;

      const logoScale = Math.min(
        logoMaxH / logoImg.height,
        logoMaxW / logoImg.width
      );

      const lw = logoImg.width * logoScale;
      const lh = logoImg.height * logoScale;
      const lx = headerX + (colWidth - lw) / 2;
      const ly = headerY + (headerInnerH - lh) / 2;
      ctx.drawImage(logoImg, lx, ly, lw, lh);
    } catch {}
  }

  const middleX = headerX + colWidth + colWidth / 2;
  let middleY = headerY + 28;

  ctx.fillStyle = '#6B7280';
  ctx.font = '700 9px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  const venueLabel = 'VENUE LOCATION';
  const venueLabelWidth = ctx.measureText(venueLabel).width;
  ctx.fillText(venueLabel, middleX - venueLabelWidth / 2, middleY);

  middleY += 14;
  ctx.fillStyle = '#111827';
  ctx.font =
    '400 12px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  const venueAddress = '48 Wall St, New York, NY 10005';
  const venueWidth = ctx.measureText(venueAddress).width;
  ctx.fillText(venueAddress, middleX - venueWidth / 2, middleY);

  middleY += 22;

  const title =
    headerTitle ||
    (data.eventDetails as EventDetails)?.eventName ||
    data.name ||
    'Floor Plan';
  ctx.fillStyle = '#111827';
  ctx.font =
    '600 18px system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
  const titleWidth = ctx.measureText(title).width;
  ctx.fillText(title, middleX - titleWidth / 2, middleY);

  const underlineWidth = Math.min(titleWidth + 30, colWidth - 40);
  ctx.strokeStyle = '#CBA35C';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(middleX - underlineWidth / 2, middleY + 5);
  ctx.lineTo(middleX + underlineWidth / 2, middleY + 5);
  ctx.stroke();

  const displayDate =
    eventDate || (data.eventDetails as EventDetails)?.eventDate || '';
  const displayClient =
    clientName || (data.eventDetails as EventDetails)?.clientName || '';

  const rightX = headerX + 2 * colWidth + 20;
  let textY = headerY + 28;

  ctx.font = '700 9px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#6B7280';
  ctx.fillText('CLIENT NAME', rightX, textY);

  ctx.font =
    '400 12px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#111827';
  textY += 14;
  ctx.fillText(displayClient || '-', rightX, textY);

  textY += 20;
  ctx.font = '700 9px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#6B7280';
  ctx.fillText('EVENT DATE', rightX, textY);

  ctx.font =
    '400 12px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#111827';
  textY += 14;
  ctx.fillText(displayDate || '-', rightX, textY);

  const planX = (pageWidth - drawPlanW) / 2;
  const planY = headerY + headerInnerH + margin;
  ctx.drawImage(planImg, planX, planY, drawPlanW, drawPlanH);

  const footerTop = pageHeight - footerHeight + 10;
  ctx.strokeStyle = '#111827';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(margin, footerTop);
  ctx.lineTo(pageWidth - margin, footerTop);
  ctx.stroke();

  const footerText =
    'I APPROVE OF THE ABOVE FLOOR PLAN, Signature: ____________________   Date: _________________________';
  ctx.font =
    '400 10px system-ui, -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#111827';
  ctx.fillText(footerText, margin, footerTop + 20);

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download =
      filename || `floorplan-${data.name || 'export'}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
};

export const exportToPDF = async (
  data: FloorPlanData,
  svgElement: SVGSVGElement,
  options: ExportLayoutOptions = {}
): Promise<void> => {
  const {
    filename,
    hideGrid = true,
    headerTitle,
    clientName,
    eventDate,
    logoUrl = DEFAULT_LOGO_URL,
  } = options;

  const {
    img: planImg,
    width: planW,
    height: planH,
  } = await createPlanImage(svgElement, hideGrid);
  const planPng = imageToPngDataUrl(planImg);
  const logoPng = await getLogoDataUrl(logoUrl);

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const margin = 40;
  const headerHeight = 110;
  const footerHeight = 40;

  const headerX = margin;
  const headerY = margin;
  const headerW = pageWidth - margin * 2;
  const headerInnerH = headerHeight - 20;

  pdf.setDrawColor(17, 24, 39);
  pdf.setLineWidth(0.8);
  pdf.rect(headerX, headerY, headerW, headerInnerH);

  const colWidth = headerW / 3;
  pdf.line(
    headerX + colWidth,
    headerY,
    headerX + colWidth,
    headerY + headerInnerH
  );
  pdf.line(
    headerX + 2 * colWidth,
    headerY,
    headerX + 2 * colWidth,
    headerY + headerInnerH
  );

  if (logoPng) {
    try {
      const logoImg = await loadImage(logoPng);
      const logoMaxH = 40;
      const logoMaxW = colWidth * 0.7;

      const logoScale = Math.min(
        logoMaxH / logoImg.height,
        logoMaxW / logoImg.width
      );

      const logoW = logoImg.width * logoScale;
      const logoH = logoImg.height * logoScale;
      const lx = headerX + (colWidth - logoW) / 2;
      const ly = headerY + (headerInnerH - logoH) / 2;
      pdf.addImage(logoPng, 'PNG', lx, ly, logoW, logoH);
    } catch {}
  }

  const middleX = headerX + colWidth + colWidth / 2;
  let middleY = headerY + 22;

  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(107, 114, 128);
  const venueLabel = 'VENUE LOCATION';
  const venueLabelWidth = pdf.getTextWidth(venueLabel);
  pdf.text(venueLabel, middleX - venueLabelWidth / 2, middleY);

  middleY += 12;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(17, 24, 39);
  const venueAddress = '48 Wall St, New York, NY 10005';
  const venueWidth = pdf.getTextWidth(venueAddress);
  pdf.text(venueAddress, middleX - venueWidth / 2, middleY);

  middleY += 18;

  const title =
    headerTitle ||
    (data.eventDetails as EventDetails)?.eventName ||
    data.name ||
    'Floor Plan';
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(16);
  pdf.setTextColor(17, 24, 39);
  const titleWidth = pdf.getTextWidth(title);
  pdf.text(title, middleX - titleWidth / 2, middleY);

  const underlineWidth = Math.min(titleWidth + 30, colWidth - 40);
  pdf.setDrawColor(203, 163, 92);
  pdf.setLineWidth(1.5);
  pdf.line(
    middleX - underlineWidth / 2,
    middleY + 4,
    middleX + underlineWidth / 2,
    middleY + 4
  );

  const displayDate =
    eventDate || (data.eventDetails as EventDetails)?.eventDate || '';
  const displayClient =
    clientName || (data.eventDetails as EventDetails)?.clientName || '';

  const rightX = headerX + 2 * colWidth + 16;
  let textY = headerY + 22;

  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(107, 114, 128);
  pdf.text('CLIENT NAME', rightX, textY);

  textY += 12;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(17, 24, 39);
  pdf.text(displayClient || '-', rightX, textY);

  textY += 16;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(107, 114, 128);
  pdf.text('EVENT DATE', rightX, textY);

  textY += 12;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(17, 24, 39);
  pdf.text(displayDate || '-', rightX, textY);

  const availWidth = pageWidth - margin * 2;
  const availHeight = pageHeight - headerHeight - footerHeight - margin * 2;

  const planScale = Math.min(availWidth / planW, availHeight / planH);
  const drawPlanW = planW * planScale;
  const drawPlanH = planH * planScale;

  const planX = (pageWidth - drawPlanW) / 2;
  const planY = headerY + headerInnerH + 20;

  pdf.addImage(planPng, 'PNG', planX, planY, drawPlanW, drawPlanH);

  const footerTop = pageHeight - footerHeight;
  pdf.setDrawColor(17, 24, 39);
  pdf.setLineWidth(0.8);
  pdf.line(margin, footerTop, pageWidth - margin, footerTop);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(17, 24, 39);
  const footerText =
    'I APPROVE OF THE ABOVE FLOOR PLAN, Signature: ____________________   Date: _________________________';
  pdf.text(footerText, margin, footerTop + 18);

  pdf.save(filename || `floorplan-${data.name || 'export'}-${Date.now()}.pdf`);
};

export const createBackup = (data: FloorPlanData): string => {
  return JSON.stringify(data);
};

export const restoreFromBackup = (backup: string): FloorPlanData | null => {
  try {
    const data = JSON.parse(backup) as FloorPlanData;
    return validateFloorPlanData(data) ? data : null;
  } catch {
    return null;
  }
};

const LZString = {
  compressToEncodedURIComponent: (input: string): string => {
    return btoa(encodeURIComponent(input));
  },

  decompressFromEncodedURIComponent: (input: string): string | null => {
    try {
      return decodeURIComponent(atob(input));
    } catch {
      return null;
    }
  },
};

export const generateShareableLink = (data: FloorPlanData): string => {
  const compressed = LZString.compressToEncodedURIComponent(
    JSON.stringify(data)
  );
  return `${window.location.origin}/floorplan?data=${compressed}`;
};

export const parseShareableLink = (url: string): FloorPlanData | null => {
  try {
    const urlObj = new URL(url);
    const compressed = urlObj.searchParams.get('data');

    if (!compressed) return null;

    const json = LZString.decompressFromEncodedURIComponent(compressed);
    if (!json) return null;

    const data = JSON.parse(json) as FloorPlanData;
    return validateFloorPlanData(data) ? data : null;
  } catch {
    return null;
  }
};

export const calculateFileSize = (data: FloorPlanData): number => {
  const json = JSON.stringify(data);
  return new Blob([json]).size / 1024;
};

export const cloneFloorPlanData = (data: FloorPlanData): FloorPlanData => {
  return JSON.parse(JSON.stringify(data));
};
