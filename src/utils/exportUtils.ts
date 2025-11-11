import jsPDF from 'jspdf';
import 'svg2pdf.js';
import {
  BBox,
  EventDetails,
  ExportLayoutOptions,
  FloorPlanData,
} from '../types/floorplan.types';

const DEFAULT_LOGO_URL = '/logo/48-wall-logo.svg';

// Primary Helper
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

const getFloorPlanBoundsFromData = (data: FloorPlanData): BBox => {
  let minX = Infinity,
    minY = Infinity;
  let maxX = -Infinity,
    maxY = -Infinity;

  data.walls.forEach((wall) => {
    minX = Math.min(minX, wall.start.x);
    minY = Math.min(minY, wall.start.y);
    maxX = Math.max(maxX, wall.start.x);
    maxY = Math.max(maxY, wall.start.y);

    minX = Math.min(minX, wall.end.x);
    minY = Math.min(minY, wall.end.y);
    maxX = Math.max(maxX, wall.end.x);
    maxY = Math.max(maxY, wall.end.y);
  });

  data.furniture.forEach((item) => {
    const furnitureX = item.position.x;
    const furnitureY = item.position.y;
    const halfWidth = (item.dimensions.width || 50) / 2;
    const halfHeight = (item.dimensions.height || 50) / 2;

    minX = Math.min(minX, furnitureX - halfWidth);
    minY = Math.min(minY, furnitureY - halfHeight);
    maxX = Math.max(maxX, furnitureX + halfWidth);
    maxY = Math.max(maxY, furnitureY + halfHeight);
  });

  const padding = 20;

  const bounds = {
    x: minX - padding,
    y: minY - padding,
    width: maxX - minX + padding * 2,
    height: maxY - minY + padding * 2,
  };

  console.log('Calculated bounds from data:', bounds);
  return bounds;
};

const createCroppedPlanImage = async (
  svgElement: SVGSVGElement,
  bounds: BBox,
  hideGrid: boolean
): Promise<{ img: HTMLImageElement; width: number; height: number }> => {
  const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;

  if (hideGrid) {
    const gridSelectors = [
      '.grid-overlay',
      '.grid',
      '[data-grid="true"]',
      '[data-testid="grid"]',
      '#grid',
      'pattern[id*="grid"]',
      'defs pattern[id*="grid"]',
      'rect[fill*="url(#grid"]',
    ];

    gridSelectors.forEach((selector) => {
      clonedSvg.querySelectorAll(selector).forEach((el) => el.remove());
    });
  }

  clonedSvg.removeAttribute('style');
  clonedSvg.removeAttribute('transform');

  clonedSvg.setAttribute(
    'viewBox',
    `${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`
  );

  const scale = window.devicePixelRatio * 4;
  clonedSvg.setAttribute('width', String(bounds.width * scale));
  clonedSvg.setAttribute('height', String(bounds.height * scale));

  const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  bgRect.setAttribute('x', String(bounds.x));
  bgRect.setAttribute('y', String(bounds.y));
  bgRect.setAttribute('width', String(bounds.width));
  bgRect.setAttribute('height', String(bounds.height));
  bgRect.setAttribute('fill', 'white');
  clonedSvg.insertBefore(bgRect, clonedSvg.firstChild);

  const svgData = new XMLSerializer().serializeToString(clonedSvg);
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  try {
    const img = await loadImage(url);
    console.log('Created image with dimensions:', {
      imgWidth: img.width,
      imgHeight: img.height,
      logicalWidth: bounds.width,
      logicalHeight: bounds.height,
    });
    return {
      img,
      width: bounds.width,
      height: bounds.height,
    };
  } finally {
    URL.revokeObjectURL(url);
  }
};

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });

const imageToPngDataUrl = (img: HTMLImageElement): string => {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL('image/png', 1.0);
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
    return canvas.toDataURL('image/png', 1.0);
  } catch {
    return null;
  }
};
// Primary Helper End

// Json Import
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

// SVG export
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

// Png Export
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
    clientLogo,
  } = options;

  const bounds = getFloorPlanBoundsFromData(data);

  const {
    img: planImg,
    width: planW,
    height: planH,
  } = await createCroppedPlanImage(svgElement, bounds, hideGrid);

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

  const exportScale = 3;
  const canvas = document.createElement('canvas');
  canvas.width = pageWidth * exportScale;
  canvas.height = pageHeight * exportScale;
  const ctx = canvas.getContext('2d');

  ctx?.scale(exportScale, exportScale);

  if (!ctx) {
    console.error('Failed to get canvas context for PNG export');
    return;
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

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
        logoMaxH / logoImg.naturalHeight || logoImg.height,
        logoMaxW / logoImg.naturalWidth || logoImg.width
      );

      const lw = logoImg.width * logoScale;
      const lh = logoImg.height * logoScale;

      let lx = headerX + (colWidth - lw) / 2;
      const ly = headerY + (headerInnerH - lh) / 2;

      if (clientLogo) {
        try {
          const clientImg = await loadImage(clientLogo);
          const clientMaxH = 50;
          const clientMaxW = colWidth * 0.7;
          const clientScale = Math.min(
            clientMaxH / clientImg.naturalHeight || clientImg.height,
            clientMaxW / clientImg.naturalWidth || clientImg.width
          );

          const cw = clientImg.width * clientScale;
          const ch = clientImg.height * clientScale;

          const spacing = 12;
          const totalW = lw + cw + spacing + 2;

          const startX = headerX + (colWidth - totalW) / 2;

          ctx.drawImage(logoImg, startX, ly, lw, lh);

          const dividerX = startX + lw + spacing / 2;
          ctx.beginPath();
          ctx.moveTo(dividerX, ly);
          ctx.lineTo(dividerX, ly + Math.max(lh, ch));
          ctx.strokeStyle = '#9CA3AF';
          ctx.lineWidth = 1;
          ctx.stroke();

          const cx = dividerX + spacing / 2 + 2;
          ctx.drawImage(clientImg, cx, ly, cw, ch);
        } catch {
          ctx.drawImage(logoImg, lx, ly, lw, lh);
        }
      } else {
        ctx.drawImage(logoImg, lx, ly, lw, lh);
      }
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

  canvas.toBlob(
    (blob) => {
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
    },
    'image/png',
    1.0
  );
};

// Pdf Export
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
    clientLogo,
  } = options;

  const bounds = getFloorPlanBoundsFromData(data);

  const {
    img: planImg,
    width: planW,
    height: planH,
  } = await createCroppedPlanImage(svgElement, bounds, hideGrid);

  const planPng = imageToPngDataUrl(planImg);
  const logoPng = await getLogoDataUrl(logoUrl);

  const isLandscape = planW > planH * 1.2;

  const pdf = new jsPDF({
    orientation: isLandscape ? 'landscape' : 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  console.log('PDF Page:', { width: pageWidth, height: pageHeight });
  console.log('Floor Plan:', { width: planW, height: planH });

  const margin = 30;
  const headerHeight = 90;
  const footerHeight = 35;

  const headerX = margin;
  const headerY = margin;
  const headerW = pageWidth - margin * 2;
  const headerInnerH = headerHeight - 15;

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
      const logoMaxH = 35;
      const logoMaxW = colWidth * 0.7;
      const logoScale = Math.min(
        logoMaxH / logoImg.height,
        logoMaxW / logoImg.width
      );
      const logoW = logoImg.width * logoScale;
      const logoH = logoImg.height * logoScale;

      let startX = headerX + (colWidth - logoW) / 2;
      const ly = headerY + (headerInnerH - logoH) / 2;

      if (clientLogo) {
        try {
          const clientImg = await loadImage(clientLogo);
          const clientMaxH = 35;
          const clientMaxW = colWidth * 0.7;
          const clientScale = Math.min(
            clientMaxH / clientImg.height,
            clientMaxW / clientImg.width
          );
          const clientW = clientImg.width * clientScale;
          const clientH = clientImg.height * clientScale;

          const spacing = 10;
          const totalW = logoW + spacing + clientW;

          startX = headerX + (colWidth - totalW) / 2;

          pdf.addImage(logoPng, 'PNG', startX, ly, logoW, logoH);

          const dividerX = startX + logoW + spacing / 2;
          pdf.setDrawColor(156, 163, 175);
          pdf.setLineWidth(0.5);
          pdf.line(dividerX, ly, dividerX, ly + Math.max(logoH, clientH));

          const clientX = dividerX + spacing / 2;
          pdf.addImage(clientLogo, 'PNG', clientX, ly, clientW, clientH);
        } catch (e) {
          console.error('Failed to add client logo:', e);
          pdf.addImage(logoPng, 'PNG', startX, ly, logoW, logoH);
        }
      } else {
        pdf.addImage(logoPng, 'PNG', startX, ly, logoW, logoH);
      }
    } catch (e) {
      console.error('Failed to add logo:', e);
    }
  }

  const middleX = headerX + colWidth + colWidth / 2;
  let middleY = headerY + 20;

  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(107, 114, 128);
  const venueLabel = 'VENUE LOCATION';
  const venueLabelWidth = pdf.getTextWidth(venueLabel);
  pdf.text(venueLabel, middleX - venueLabelWidth / 2, middleY);

  middleY += 10;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(17, 24, 39);
  const venueAddress = '48 Wall St, New York, NY 10005';
  const venueWidth = pdf.getTextWidth(venueAddress);
  pdf.text(venueAddress, middleX - venueWidth / 2, middleY);

  middleY += 16;
  const title =
    headerTitle || data.eventDetails?.eventName || data.name || 'Floor Plan';
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(15);
  pdf.setTextColor(17, 24, 39);
  const titleWidth = pdf.getTextWidth(title);
  pdf.text(title, middleX - titleWidth / 2, middleY);

  const underlineWidth = Math.min(titleWidth + 25, colWidth - 30);
  pdf.setDrawColor(203, 163, 92);
  pdf.setLineWidth(1.5);
  pdf.line(
    middleX - underlineWidth / 2,
    middleY + 3,
    middleX + underlineWidth / 2,
    middleY + 3
  );

  const rightX = headerX + 2 * colWidth + 15;
  let textY = headerY + 20;

  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(107, 114, 128);
  pdf.text('CLIENT NAME', rightX, textY);

  textY += 10;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(17, 24, 39);
  pdf.text(clientName || data.eventDetails?.clientName || '-', rightX, textY);

  textY += 14;
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(107, 114, 128);
  pdf.text('EVENT DATE', rightX, textY);

  textY += 10;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(17, 24, 39);
  pdf.text(eventDate || data.eventDetails?.eventDate || '-', rightX, textY);

  const planAreaMargin = 10;
  const availWidth = pageWidth - planAreaMargin * 2;
  const availHeight =
    pageHeight - headerY - headerHeight - footerHeight - planAreaMargin;

  const planScale = Math.min(availWidth / planW, availHeight / planH) * 0.98;
  const drawPlanW = planW * planScale;
  const drawPlanH = planH * planScale;

  console.log('Plan scaling:', {
    availWidth,
    availHeight,
    planScale,
    drawPlanW,
    drawPlanH,
  });

  const planX = (pageWidth - drawPlanW) / 2;
  const planY = headerY + headerHeight + (availHeight - drawPlanH) / 2;

  pdf.setFillColor(255, 255, 255);
  pdf.rect(planX - 1, planY - 1, drawPlanW + 2, drawPlanH + 2, 'F');

  pdf.addImage(
    planPng,
    'PNG',
    planX,
    planY,
    drawPlanW,
    drawPlanH,
    undefined,
    'FAST'
  );

  const footerTop = pageHeight - footerHeight - 10;
  pdf.setDrawColor(17, 24, 39);
  pdf.setLineWidth(0.8);
  pdf.line(margin, footerTop, pageWidth - margin, footerTop);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(17, 24, 39);
  const footerText =
    'I APPROVE OF THE ABOVE FLOOR PLAN, Signature: ____________________   Date: _________________________';
  pdf.text(footerText, margin, footerTop + 16);

  pdf.save(filename || `floorplan-${data.name || 'export'}-${Date.now()}.pdf`);
};

// JSON Export
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

// Addtional helper Start
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
// Addtional helper End
