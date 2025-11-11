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
const getSvgContentBounds = (
  svgElement: SVGSVGElement,
  hideGrid: boolean
): BBox | null => {
  const clone = svgElement.cloneNode(true) as SVGSVGElement;

  if (hideGrid) stripGridFromSvg(clone);

  if (!clone.getAttribute('width')) clone.setAttribute('width', '4000');
  if (!clone.getAttribute('height')) clone.setAttribute('height', '3000');

  clone.style.position = 'absolute';
  clone.style.left = '-99999px';
  clone.style.top = '-99999px';
  clone.style.pointerEvents = 'none';

  document.body.appendChild(clone);

  try {
    const bbox = clone.getBBox();

    if (
      !isFinite(bbox.x) ||
      !isFinite(bbox.y) ||
      !isFinite(bbox.width) ||
      !isFinite(bbox.height) ||
      bbox.width <= 0 ||
      bbox.height <= 0
    ) {
      return null;
    }

    return {
      x: bbox.x,
      y: bbox.y,
      width: bbox.width,
      height: bbox.height,
    };
  } catch (e) {
    console.warn('getBBox failed, falling back to data bounds', e);
    return null;
  } finally {
    document.body.removeChild(clone);
  }
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

const getFloorPlanBoundsFromData = (data: FloorPlanData): BBox => {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  for (const wall of data.walls) {
    const pts = [wall.start, wall.end, ...(wall.curvePoints ?? [])];
    for (const p of pts) {
      if (!p) continue;
      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x);
      maxY = Math.max(maxY, p.y);
    }
  }

  for (const item of data.furniture) {
    const cx = item.position.x;
    const cy = item.position.y;
    const halfW = (item.dimensions?.width ?? 50) / 2;
    const halfH = (item.dimensions?.height ?? 50) / 2;
    minX = Math.min(minX, cx - halfW);
    minY = Math.min(minY, cy - halfH);
    maxX = Math.max(maxX, cx + halfW);
    maxY = Math.max(maxY, cy + halfH);
  }

  for (const room of data.rooms ?? []) {
    const { x, y, width, height } = room as any;
    if (
      typeof x === 'number' &&
      typeof y === 'number' &&
      typeof width === 'number' &&
      typeof height === 'number'
    ) {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + width);
      maxY = Math.max(maxY, y + height);
    }
  }

  const canvasW = data.canvasSettings?.width ?? 2000;
  const canvasH = data.canvasSettings?.height ?? 1500;

  if (
    !isFinite(minX) ||
    !isFinite(minY) ||
    !isFinite(maxX) ||
    !isFinite(maxY)
  ) {
    return { x: 0, y: 0, width: canvasW, height: canvasH };
  }

  const padding = 20;
  let x = minX - padding;
  let y = minY - padding;
  let width = Math.max(1, maxX - minX + padding * 2);
  let height = Math.max(1, maxY - minY + padding * 2);

  const maxWidth = canvasW * 1.5;
  const maxHeight = canvasH * 1.5;

  if (width > maxWidth) {
    const diff = width - maxWidth;
    x += diff / 2;
    width = maxWidth;
  }
  if (height > maxHeight) {
    const diff = height - maxHeight;
    y += diff / 2;
    height = maxHeight;
  }

  return { x, y, width, height };
};

const blobToDataURL = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(blob);
  });

const inlineExternalImages = async (svg: SVGSVGElement) => {
  const images = Array.from(svg.querySelectorAll('image'));
  for (const img of images) {
    const href = (
      img.getAttribute('href') ||
      img.getAttributeNS('http://www.w3.org/1999/xlink', 'href') ||
      ''
    ).trim();
    if (!href || href.startsWith('data:') || href.startsWith('blob:')) continue;
    try {
      const res = await fetch(href, { mode: 'cors' });
      const blob = await res.blob();
      const dataUrl = await blobToDataURL(blob);
      img.setAttribute('href', dataUrl);
      img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', dataUrl);
    } catch (e) {
      console.warn('Could not inline image href:', href, e);
    }
  }
};

// const createCroppedPlanImage = async (
//   svgElement: SVGSVGElement,
//   bounds: BBox,
//   hideGrid: boolean
// ): Promise<{ img: HTMLImageElement; width: number; height: number }> => {
//   const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;

//   if (hideGrid) {
//     const gridSelectors = [
//       '.grid-overlay',
//       '.grid',
//       '[data-grid="true"]',
//       '[data-testid="grid"]',
//       '#grid',
//       'pattern[id*="grid"]',
//       'defs pattern[id*="grid"]',
//       'rect[fill*="url(#grid"]',
//     ];
//     gridSelectors.forEach((selector) => {
//       clonedSvg.querySelectorAll(selector).forEach((el) => el.remove());
//     });
//   }

//   await inlineExternalImages(clonedSvg);

//   clonedSvg.removeAttribute('style');
//   clonedSvg.setAttribute(
//     'viewBox',
//     `${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`
//   );

//   const scale = window.devicePixelRatio * 4;
//   clonedSvg.setAttribute('width', String(bounds.width * scale));
//   clonedSvg.setAttribute('height', String(bounds.height * scale));

//   const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
//   bgRect.setAttribute('x', String(bounds.x));
//   bgRect.setAttribute('y', String(bounds.y));
//   bgRect.setAttribute('width', String(bounds.width));
//   bgRect.setAttribute('height', String(bounds.height));
//   bgRect.setAttribute('fill', 'white');
//   clonedSvg.insertBefore(bgRect, clonedSvg.firstChild);

//   const svgData = new XMLSerializer().serializeToString(clonedSvg);
//   const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
//   const url = URL.createObjectURL(blob);

//   try {
//     const img = await loadImage(url);
//     return { img, width: bounds.width, height: bounds.height };
//   } finally {
//     URL.revokeObjectURL(url);
//   }
// };

const createCroppedPlanImage = async (
  svgElement: SVGSVGElement,
  bounds: BBox,
  hideGrid: boolean
): Promise<{ img: HTMLImageElement; width: number; height: number }> => {
  const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;

  if (hideGrid) stripGridFromSvg(clonedSvg);
  await inlineExternalImages(clonedSvg);

  clonedSvg.removeAttribute('style');

  clonedSvg.setAttribute(
    'viewBox',
    `${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`
  );

  const scale = window.devicePixelRatio * 4;
  clonedSvg.setAttribute('width', String(bounds.width * scale));
  clonedSvg.setAttribute('height', String(bounds.height * scale));

  const ns = 'http://www.w3.org/2000/svg';
  const bgRect = document.createElementNS(ns, 'rect');
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
    return { img, width: bounds.width, height: bounds.height };
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

const stripGridFromSvg = (svg: SVGSVGElement) => {
  const wrapper = svg.querySelector('#fp-grid-overlay');
  if (wrapper && wrapper.parentNode) wrapper.parentNode.removeChild(wrapper);

  svg
    .querySelectorAll('[data-grid="true"], .grid-overlay')
    .forEach((el) => el.parentNode?.removeChild(el));

  svg.querySelectorAll('defs').forEach((d) => {
    if (!d.children.length) d.remove();
  });
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
export const exportToSVG = async (
  data: FloorPlanData,
  svgElement: SVGSVGElement,
  filename?: string,
  { hideGrid = true }: { hideGrid?: boolean } = {}
): Promise<void> => {
  const clonedSvg = svgElement.cloneNode(true) as SVGSVGElement;

  if (hideGrid) {
    stripGridFromSvg(clonedSvg);
  }

  await inlineExternalImages(clonedSvg);

  const vb = clonedSvg.getAttribute('viewBox');
  if (!vb) {
    const w = Number(clonedSvg.getAttribute('width') || 5000);
    const h = Number(clonedSvg.getAttribute('height') || 2500);
    const bgRect = clonedSvg.ownerDocument!.createElementNS(
      'http://www.w3.org/2000/svg',
      'rect'
    );
    bgRect.setAttribute('x', '0');
    bgRect.setAttribute('y', '0');
    bgRect.setAttribute('width', String(w));
    bgRect.setAttribute('height', String(h));
    bgRect.setAttribute('fill', 'white');
    clonedSvg.insertBefore(bgRect, clonedSvg.firstChild);
  }

  const svgData = new XMLSerializer().serializeToString(clonedSvg);
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

  const svgBounds = getSvgContentBounds(svgElement, hideGrid);
  const bounds = svgBounds || getFloorPlanBoundsFromData(data);

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

  const planScale =
    Math.min(availableWidth / planW, availableHeight / planH) * 0.95;
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

      const lx = headerX + (colWidth - lw) / 2;
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

  const svgBounds = getSvgContentBounds(svgElement, hideGrid);
  const bounds = svgBounds || getFloorPlanBoundsFromData(data);

  const {
    img: planImg,
    width: planW,
    height: planH,
  } = await createCroppedPlanImage(svgElement, bounds, hideGrid);

  const planPng = imageToPngDataUrl(planImg);
  const logoPng = await getLogoDataUrl(logoUrl);

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

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

  const planScale = Math.min(availWidth / planW, availHeight / planH) * 0.95;
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
  const planY = margin + headerHeight + (availHeight - drawPlanH) / 2;

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
