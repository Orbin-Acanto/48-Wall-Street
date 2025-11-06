import { DraggableLibraryItem } from '../types/floorplan.types';

export const FURNITURE_LIBRARY: DraggableLibraryItem[] = [
  {
    id: 'chair-standard',
    type: 'furniture',
    category: 'Seating',
    name: 'Standard Chair',
    defaultDimensions: { width: 18, height: 18, unit: 'in' },
    svgPath: `<rect x="-9" y="-9" width="18" height="18" fill="#8B4513" stroke="#000" stroke-width="1"/>
              <rect x="-7" y="-11" width="14" height="2" fill="#8B4513" stroke="#000" stroke-width="1"/>`,
  },
  {
    id: 'chair-arm',
    type: 'furniture',
    category: 'Seating',
    name: 'Arm Chair',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },
    svgPath: `<rect x="-12" y="-12" width="24" height="24" fill="#A0522D" stroke="#000" stroke-width="1"/>
              <rect x="-10" y="-14" width="20" height="2" fill="#A0522D" stroke="#000" stroke-width="1"/>
              <rect x="-14" y="-10" width="2" height="20" fill="#A0522D" stroke="#000" stroke-width="1"/>
              <rect x="12" y="-10" width="2" height="20" fill="#A0522D" stroke="#000" stroke-width="1"/>`,
  },
  {
    id: 'sofa-2seat',
    type: 'furniture',
    category: 'Seating',
    name: '2-Seat Sofa',
    defaultDimensions: { width: 60, height: 36, unit: 'in' },
    svgPath: `<rect x="-30" y="-18" width="60" height="36" fill="#654321" stroke="#000" stroke-width="1" rx="2"/>
              <rect x="-28" y="-20" width="56" height="3" fill="#654321" stroke="#000" stroke-width="1"/>`,
  },
  {
    id: 'sofa-3seat',
    type: 'furniture',
    category: 'Seating',
    name: '3-Seat Sofa',
    defaultDimensions: { width: 84, height: 36, unit: 'in' },
    svgPath: `<rect x="-42" y="-18" width="84" height="36" fill="#654321" stroke="#000" stroke-width="1" rx="2"/>
              <rect x="-40" y="-20" width="80" height="3" fill="#654321" stroke="#000" stroke-width="1"/>`,
  },
  {
    id: 'bench',
    type: 'furniture',
    category: 'Seating',
    name: 'Bench',
    defaultDimensions: { width: 48, height: 18, unit: 'in' },
    svgPath: `<rect x="-24" y="-9" width="48" height="18" fill="#D2691E" stroke="#000" stroke-width="1"/>`,
  },
  {
    id: 'ottoman',
    type: 'furniture',
    category: 'Seating',
    name: 'Ottoman',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },
    svgPath: `<circle cx="0" cy="0" r="12" fill="#8B7355" stroke="#000" stroke-width="1"/>`,
  },

  {
    id: 'table-round-4',
    type: 'furniture',
    category: 'Tables',
    name: 'Round Table (4-seat)',
    defaultDimensions: { width: 48, height: 48, unit: 'in' },
    svgPath: `<circle cx="0" cy="0" r="24" fill="#DEB887" stroke="#000" stroke-width="2"/>
              <circle cx="0" cy="0" r="20" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2"/>`,
  },
  {
    id: 'table-round-6',
    type: 'furniture',
    category: 'Tables',
    name: 'Round Table (6-seat)',
    defaultDimensions: { width: 60, height: 60, unit: 'in' },
    svgPath: `<circle cx="0" cy="0" r="30" fill="#DEB887" stroke="#000" stroke-width="2"/>
              <circle cx="0" cy="0" r="26" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2"/>`,
  },
  {
    id: 'table-round-8',
    type: 'furniture',
    category: 'Tables',
    name: 'Round Table (8-seat)',
    defaultDimensions: { width: 72, height: 72, unit: 'in' },
    svgPath: `<circle cx="0" cy="0" r="36" fill="#DEB887" stroke="#000" stroke-width="2"/>
              <circle cx="0" cy="0" r="32" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2"/>`,
  },
  {
    id: 'table-rect-6',
    type: 'furniture',
    category: 'Tables',
    name: 'Rectangular Table (6-seat)',
    defaultDimensions: { width: 72, height: 36, unit: 'in' },
    svgPath: `<rect x="-36" y="-18" width="72" height="36" fill="#DEB887" stroke="#000" stroke-width="2" rx="2"/>`,
  },
  {
    id: 'table-rect-8',
    type: 'furniture',
    category: 'Tables',
    name: 'Rectangular Table (8-seat)',
    defaultDimensions: { width: 96, height: 40, unit: 'in' },
    svgPath: `<rect x="-48" y="-20" width="96" height="40" fill="#DEB887" stroke="#000" stroke-width="2" rx="2"/>`,
  },
  {
    id: 'table-square',
    type: 'furniture',
    category: 'Tables',
    name: 'Square Table (4-seat)',
    defaultDimensions: { width: 36, height: 36, unit: 'in' },
    svgPath: `<rect x="-18" y="-18" width="36" height="36" fill="#DEB887" stroke="#000" stroke-width="2" rx="1"/>`,
  },
  {
    id: 'cocktail-table',
    type: 'furniture',
    category: 'Tables',
    name: 'Cocktail Table',
    defaultDimensions: { width: 30, height: 30, unit: 'in' },
    svgPath: `<circle cx="0" cy="0" r="15" fill="#CD853F" stroke="#000" stroke-width="2"/>`,
  },
  {
    id: 'coffee-table',
    type: 'furniture',
    category: 'Tables',
    name: 'Coffee Table',
    defaultDimensions: { width: 48, height: 24, unit: 'in' },
    svgPath: `<rect x="-24" y="-12" width="48" height="24" fill="#8B4513" stroke="#000" stroke-width="1.5" rx="2"/>`,
  },

  {
    id: 'stage-small',
    type: 'furniture',
    category: 'Staging',
    name: 'Stage (8x8)',
    defaultDimensions: { width: 96, height: 96, unit: 'in' },
    svgPath: `<rect x="-48" y="-48" width="96" height="96" fill="#2F4F4F" stroke="#000" stroke-width="3"/>
              <text x="0" y="5" text-anchor="middle" fill="#FFF" font-size="12">STAGE</text>`,
  },
  {
    id: 'stage-medium',
    type: 'furniture',
    category: 'Staging',
    name: 'Stage (12x12)',
    defaultDimensions: { width: 144, height: 144, unit: 'in' },
    svgPath: `<rect x="-72" y="-72" width="144" height="144" fill="#2F4F4F" stroke="#000" stroke-width="3"/>
              <text x="0" y="5" text-anchor="middle" fill="#FFF" font-size="14">STAGE</text>`,
  },
  {
    id: 'podium',
    type: 'furniture',
    category: 'Staging',
    name: 'Podium',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },
    svgPath: `<rect x="-12" y="-12" width="24" height="24" fill="#8B4513" stroke="#000" stroke-width="2"/>
              <rect x="-10" y="-10" width="20" height="20" fill="#A0522D" stroke="#000" stroke-width="1"/>`,
  },
  {
    id: 'dance-floor',
    type: 'furniture',
    category: 'Staging',
    name: 'Dance Floor (12x12)',
    defaultDimensions: { width: 144, height: 144, unit: 'in' },
    svgPath: `<rect x="-72" y="-72" width="144" height="144" fill="#FFD700" stroke="#000" stroke-width="2" opacity="0.6"/>
              <text x="0" y="5" text-anchor="middle" fill="#000" font-size="14">DANCE FLOOR</text>`,
  },

  {
    id: 'bar-straight',
    type: 'furniture',
    category: 'Bars',
    name: 'Straight Bar (6ft)',
    defaultDimensions: { width: 72, height: 24, unit: 'in' },
    svgPath: `<rect x="-36" y="-12" width="72" height="24" fill="#8B4513" stroke="#000" stroke-width="2"/>
              <text x="0" y="5" text-anchor="middle" fill="#FFF" font-size="10">BAR</text>`,
  },
  {
    id: 'bar-corner',
    type: 'furniture',
    category: 'Bars',
    name: 'Corner Bar',
    defaultDimensions: { width: 72, height: 72, unit: 'in' },
    svgPath: `<path d="M -36,-36 L 36,-36 L 36,-12 L 12,-12 L 12,36 L -36,36 Z" fill="#8B4513" stroke="#000" stroke-width="2"/>
              <text x="-10" y="0" text-anchor="middle" fill="#FFF" font-size="10">BAR</text>`,
  },
  {
    id: 'buffet-table',
    type: 'furniture',
    category: 'Buffet',
    name: 'Buffet Table (8ft)',
    defaultDimensions: { width: 96, height: 30, unit: 'in' },
    svgPath: `<rect x="-48" y="-15" width="96" height="30" fill="#D2691E" stroke="#000" stroke-width="2"/>
              <text x="0" y="5" text-anchor="middle" fill="#000" font-size="10">BUFFET</text>`,
  },

  {
    id: 'reception-desk',
    type: 'furniture',
    category: 'Reception',
    name: 'Reception Desk',
    defaultDimensions: { width: 72, height: 36, unit: 'in' },
    svgPath: `<rect x="-36" y="-18" width="72" height="36" fill="#8B7355" stroke="#000" stroke-width="2"/>
              <rect x="-34" y="-16" width="68" height="32" fill="#A0826D" stroke="#000" stroke-width="1"/>
              <text x="0" y="5" text-anchor="middle" fill="#000" font-size="10">RECEPTION</text>`,
  },

  {
    id: 'plant-large',
    type: 'furniture',
    category: 'Decor',
    name: 'Large Plant',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },
    svgPath: `<circle cx="0" cy="0" r="12" fill="#228B22" stroke="#006400" stroke-width="1.5"/>`,
  },
  {
    id: 'divider-screen',
    type: 'furniture',
    category: 'Decor',
    name: 'Room Divider',
    defaultDimensions: { width: 72, height: 6, unit: 'in' },
    svgPath: `<rect x="-36" y="-3" width="72" height="6" fill="#8B8B8B" stroke="#000" stroke-width="1.5"/>`,
  },
];

export const getFurnitureByCategory = (
  category: string
): DraggableLibraryItem[] => {
  return FURNITURE_LIBRARY.filter((item) => item.category === category);
};

export const getFurnitureById = (
  id: string
): DraggableLibraryItem | undefined => {
  return FURNITURE_LIBRARY.find((item) => item.id === id);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(FURNITURE_LIBRARY.map((item) => item.category));
  return Array.from(categories).sort();
};
