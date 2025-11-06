import { FloorPlanData } from '../types/floorplan.types';
import jsPDF from 'jspdf';
import 'svg2pdf.js';

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
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};

export const validateFloorPlanData = (data: any): data is FloorPlanData => {
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

export const exportToSVG = (
  data: FloorPlanData,
  canvasElement: SVGSVGElement,
  filename?: string
): void => {
  const svgData = new XMLSerializer().serializeToString(canvasElement);
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

export const exportToPNG = (
  canvasElement: SVGSVGElement,
  filename?: string,
  scale: number = 2
): void => {
  const svgData = new XMLSerializer().serializeToString(canvasElement);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    console.error('Failed to get canvas context');
    return;
  }

  const img = new Image();
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  img.onload = () => {
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    ctx.scale(scale, scale);
    ctx.drawImage(img, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        const pngUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = pngUrl;
        link.download = filename || `floorplan-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(pngUrl);
      }
    });

    URL.revokeObjectURL(url);
  };

  img.src = url;
};

export const exportToPDF = async (
  data: FloorPlanData,
  canvasElement: SVGSVGElement,
  filename?: string
): Promise<void> => {
  try {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const { width, height } = canvasElement.getBoundingClientRect();

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const scale = Math.min(pdfWidth / width, pdfHeight / height);

    await (pdf as any).svg(canvasElement, {
      x: (pdfWidth - width * scale) / 2,
      y: (pdfHeight - height * scale) / 2,
      width: width * scale,
      height: height * scale,
    });

    pdf.save(filename || `floorplan-${data.name}-${Date.now()}.pdf`);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    exportToSVG(data, canvasElement, filename?.replace('.pdf', '.svg'));
  }
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

export const calculateFileSize = (data: FloorPlanData): number => {
  const json = JSON.stringify(data);
  return new Blob([json]).size / 1024;
};

export const cloneFloorPlanData = (data: FloorPlanData): FloorPlanData => {
  return JSON.parse(JSON.stringify(data));
};
