import { DraggableLibraryItem } from '../types/floorplan.types';

export const FURNITURE_LIBRARY: DraggableLibraryItem[] = [
  // Seating Start
  {
    id: 'chair-standard-1',
    type: 'furniture',
    category: 'Seating',
    name: 'Standard Chair 1',
    defaultDimensions: { width: 18, height: 18, unit: 'in' },
    svgPath: `<rect x="-9" y="-9" width="18" height="18" fill="#2BACE2"/>
              <rect x="-7" y="-11" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>`,
    groupBy: 'Seating',
  },
  {
    id: 'chair-arm',
    type: 'furniture',
    category: 'Seating',
    name: 'Arm Chair',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },
    svgPath: `<rect x="-12" y="-12" width="24" height="24" fill="#2BACE2"/>
              <rect x="-10" y="-14" width="20" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
              <rect x="-14" y="-10" width="2" height="20" fill="#2BACE2"/>
              <rect x="12" y="-10" width="2" height="20" fill="#2BACE2"/>`,
    groupBy: 'Seating',
  },
  {
    id: 'sofa-2seat',
    type: 'furniture',
    category: 'Seating',
    name: '2-Seat Sofa',
    defaultDimensions: { width: 60, height: 36, unit: 'in' },
    svgPath: `<rect x="-30" y="-18" width="60" height="36" fill="#2BACE2"/>
              <rect x="-28" y="-20" width="56" height="3" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>`,
    groupBy: 'Seating',
  },
  {
    id: 'sofa-3seat',
    type: 'furniture',
    category: 'Seating',
    name: '3-Seat Sofa',
    defaultDimensions: { width: 84, height: 36, unit: 'in' },
    svgPath: `<rect x="-42" y="-18" width="84" height="36" fill="#2BACE2"/>
              <rect x="-40" y="-20" width="80" height="3" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>`,
    groupBy: 'Seating',
  },
  {
    id: 'bench',
    type: 'furniture',
    category: 'Seating',
    name: 'Bench',
    defaultDimensions: { width: 48, height: 18, unit: 'in' },
    svgPath: `<rect x="-24" y="-9" width="48" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>`,
    groupBy: 'Seating',
  },
  {
    id: 'ottoman',
    type: 'furniture',
    category: 'Seating',
    name: 'Ottoman',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },
    svgPath: `<circle cx="0" cy="0" r="12" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>`,
    groupBy: 'Seating',
  },
  {
    id: 'hight-boys',
    type: 'furniture',
    category: 'Seating',
    name: 'High Boys',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },
    svgPath: `<circle cx="0" cy="0" r="10" fill="#1a1a1a" stroke="#000" stroke-width="0.5"/>
              <circle cx="0" cy="-16" r="3.5" fill="#333333" stroke="#000" stroke-width="0.3"/>
              <circle cx="16" cy="0" r="3.5" fill="#333333" stroke="#000" stroke-width="0.3"/>
              <circle cx="0" cy="16" r="3.5" fill="#333333" stroke="#000" stroke-width="0.3"/>
              <circle cx="-16" cy="0" r="3.5" fill="#333333" stroke="#000" stroke-width="0.3"/>`,
    groupBy: 'Black Highboys',
  },
  // Seating End
  // Tables Start
  {
    id: 'table-round',
    type: 'furniture',
    category: 'Tables',
    name: 'Round Table',
    defaultDimensions: { width: 60, height: 60, unit: 'in' },
    svgPath: `<circle cx="0" cy="0" r="30" fill="#2BACE2" stroke="#000" stroke-width="1"/>
              <circle cx="0" cy="0" r="26" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2"/>`,
    groupBy: '60" Round Tables',
  },
  {
    id: 'table-round-8',
    type: 'furniture',
    category: 'Tables',
    name: 'Round Table 8 Seat',
    defaultDimensions: { width: 60, height: 60, unit: 'in' },
    svgPath: `
    <circle cx="0" cy="0" r="30" fill="#2BACE2" stroke="#000" stroke-width="1"/>
    <circle cx="0" cy="0" r="26" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2"/>

    <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2"/>
    <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>

    <g transform="rotate(45)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(90)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(135)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(180)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(225)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(270)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(315)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>
  `,
    groupBy: '60" Round Tables',
  },
  {
    id: 'award-table',
    type: 'furniture',
    category: 'Tables',
    name: 'Award Table',
    defaultDimensions: { width: 72, height: 36, unit: 'in' },
    svgPath: `<rect x="-36" y="-18" width="72" height="36" fill="#F9ED32" />`,
    groupBy: 'Award Table',
  },
  {
    id: 'registration-table',
    type: 'furniture',
    category: 'Tables',
    name: 'Registration Table',
    defaultDimensions: { width: 36, height: 36, unit: 'in' },
    svgPath: `<rect x="-18" y="-18" width="36" height="36" fill="#662D91"/>`,
    groupBy: 'Registration',
  },
  {
    id: 'auction-table',
    type: 'furniture',
    category: 'Tables',
    name: 'Auction Table',
    defaultDimensions: { width: 48, height: 24, unit: 'in' },
    svgPath: `<rect x="-24" y="-12" width="48" height="24" fill="#6BC5A8"/>`,
    groupBy: 'Auction Tables',
  },
  {
    id: 'swag-table',
    type: 'furniture',
    category: 'Tables',
    name: 'Swag Table',
    defaultDimensions: { width: 72, height: 36, unit: 'in' },
    svgPath: `<rect x="-36" y="-18" width="72" height="36" fill="#2E3192"/>`,
    groupBy: 'Swag Table',
  },
  // Tables End
  // Stage Start
  {
    id: 'stage',
    type: 'furniture',
    category: 'Staging',
    name: 'Stage (8x16)',
    defaultDimensions: { width: 96, height: 192, unit: 'in' },
    svgPath: `<rect x="-48" y="-96" width="96" height="192" fill="#00A651"/>`,
    groupBy: 'Staging',
  },
  {
    id: 'podium',
    type: 'furniture',
    category: 'Staging',
    name: 'Podium',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },
    svgPath: `<rect x="-12" y="-12" width="24" height="24" fill="#F7941D"/>`,
    groupBy: 'Podium / Mic',
  },
  // Stage End
  // Bar Start
  {
    id: 'bar-straight-1',
    type: 'furniture',
    category: 'Bars',
    name: 'Straight Bar (12ft)',
    defaultDimensions: { width: 144, height: 24, unit: 'in' },
    svgPath: `<rect x="-72" y="-12" width="144" height="24" fill="#00A79D" />
              <text x="0" y="5" text-anchor="middle" fill="#FFF" font-size="10">BAR</text>`,
    groupBy: "12' Bar",
  },
  {
    id: 'bar-straight-2',
    type: 'furniture',
    category: 'Bars',
    name: 'Straight Bar (18ft)',
    defaultDimensions: { width: 216, height: 24, unit: 'in' },
    svgPath: `<rect x="-108" y="-12" width="216" height="24" fill="#9E1F63" />
              <text x="0" y="5" text-anchor="middle" fill="#FFF" font-size="10">BAR</text>`,
    groupBy: "18' Bar",
  },
  // Bar End
  // Decor Start
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
  {
    id: 'carpet-red-rectangle',
    type: 'furniture',
    category: 'Decor',
    name: 'Red Carpet',
    defaultDimensions: { width: 252, height: 60, unit: 'in' },
    svgPath: `<rect x="-126" y="-30" width="252" height="60" fill="#AF2025" stroke="#8B0000" stroke-width="2"/>
              <rect x="-122" y="-26" width="244" height="52" fill="none" stroke="#C92530" stroke-width="1" stroke-dasharray="4,4"/>
              <rect x="-118" y="-22" width="236" height="44" fill="none" stroke="#8B0000" stroke-width="0.5"/>`,
    groupBy: 'Red Carpet',
  },
  // Decor End
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
