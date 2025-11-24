import { CUSTOM_TABLE_COLORS } from '@/data';
import { FurnitureItem as FurnitureItemType } from '@/types/floorplan.types';

export const feetToInches = (feet: number): number => {
  return feet * 12;
};

export const inchesToFeet = (inches: number): number => {
  return inches / 12;
};

export const pixelsToFeet = (pixels: number, scale: number): number => {
  return pixels / scale;
};

export const feetToPixels = (feet: number, scale: number): number => {
  return feet * scale;
};

export const inchesToPixels = (inches: number, scale: number): number => {
  const feet = inchesToFeet(inches);
  return feetToPixels(feet, scale);
};

export const pixelsToInches = (pixels: number, scale: number): number => {
  const feet = pixelsToFeet(pixels, scale);
  return feetToInches(feet);
};

export const getNextAvailableColor = (
  existingItems: FurnitureItemType[]
): string => {
  const usedCustomColors = new Set(
    existingItems
      .filter((item) => item.category === 'Customize' && item.color)
      .map((item) => item.color)
  );

  const availableColor = CUSTOM_TABLE_COLORS.find(
    (color) => !usedCustomColors.has(color)
  );

  if (!availableColor) {
    return generateRandomColor();
  }

  return availableColor;
};

const generateRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const formatDimension = (
  value: number,
  unit: 'ft' | 'in',
  showUnit: boolean = true
): string => {
  const rounded = Math.round(value * 100) / 100;
  return showUnit ? `${rounded}${unit}` : `${rounded}`;
};

export const formatFeetAndInches = (totalInches: number): string => {
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);

  if (feet === 0) return `${inches}"`;
  if (inches === 0) return `${feet}'`;
  return `${feet}' ${inches}"`;
};

export const parseDimension = (
  input: string
): { value: number; unit: 'ft' | 'in' } | null => {
  const feetInchesRegex =
    /(\d+(?:\.\d+)?)\s*(?:ft|')\s*(\d+(?:\.\d+)?)\s*(?:in|")?/i;
  const feetOnlyRegex = /(\d+(?:\.\d+)?)\s*(?:ft|')/i;
  const inchesOnlyRegex = /(\d+(?:\.\d+)?)\s*(?:in|")/i;

  let match = input.match(feetInchesRegex);
  if (match) {
    const feet = parseFloat(match[1]);
    const inches = parseFloat(match[2]);
    return { value: feet * 12 + inches, unit: 'in' };
  }

  match = input.match(feetOnlyRegex);
  if (match) {
    return { value: parseFloat(match[1]), unit: 'ft' };
  }

  match = input.match(inchesOnlyRegex);
  if (match) {
    return { value: parseFloat(match[1]), unit: 'in' };
  }

  const num = parseFloat(input);
  if (!isNaN(num)) {
    return { value: num, unit: 'ft' };
  }

  return null;
};

export const squarePixelsToSquareFeet = (
  squarePixels: number,
  scale: number
): number => {
  const sideLengthPixels = Math.sqrt(squarePixels);
  const sideLengthFeet = pixelsToFeet(sideLengthPixels, scale);
  return sideLengthFeet * sideLengthFeet;
};

export const squareFeetToSquareMeters = (squareFeet: number): number => {
  return squareFeet * 0.092903;
};

export const metersToFeet = (meters: number): number => {
  return meters * 3.28084;
};

export const feetToMeters = (feet: number): number => {
  return feet / 3.28084;
};

export const roundToIncrement = (value: number, increment: number): number => {
  return Math.round(value / increment) * increment;
};

export const isValidDimension = (value: number, unit: 'ft' | 'in'): boolean => {
  if (isNaN(value) || !isFinite(value) || value < 0) return false;

  const maxFeet = 1000;
  const maxInches = 12000;

  if (unit === 'ft' && value > maxFeet) return false;
  if (unit === 'in' && value > maxInches) return false;

  return true;
};
