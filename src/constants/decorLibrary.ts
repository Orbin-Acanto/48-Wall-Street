import { DraggableLibraryItem } from '../types/floorplan.types';

export const DECOR_LIBRARY: DraggableLibraryItem[] = [
  // Crowd Control & Structure
  {
    id: 'stanchion-gold-rope',
    type: 'decor',
    category: 'Crowd Control',
    name: 'Rope & Stanchion (Gold)',
    defaultDimensions: { width: 36, height: 6, unit: 'in' },
    svgPath:
      "<circle cx='-16' cy='0' r='2' fill='#C6A24A' stroke='#7A5A2F' stroke-width='0.6'/>" +
      "<circle cx='16' cy='0' r='2' fill='#C6A24A' stroke='#7A5A2F' stroke-width='0.6'/>" +
      "<path d='M-14,0 Q0,-6 14,0' stroke='#8B0000' stroke-width='1.4' fill='none' stroke-linecap='round'/>",
  },
  {
    id: 'stanchion-black-redrope',
    type: 'decor',
    category: 'Crowd Control',
    name: 'Rope & Stanchion (Black posts, Red rope)',
    defaultDimensions: { width: 36, height: 6, unit: 'in' },
    svgPath:
      "<circle cx='-16' cy='0' r='2' fill='#222' stroke='#000' stroke-width='0.6'/>" +
      "<circle cx='16' cy='0' r='2' fill='#222' stroke='#000' stroke-width='0.6'/>" +
      "<path d='M-14,0 L14,0' stroke='#B22222' stroke-width='1.6' stroke-linecap='round'/>",
  },
  {
    id: 'retractable-stanchion',
    type: 'decor',
    category: 'Crowd Control',
    name: 'Retractable Stanchion',
    defaultDimensions: { width: 18, height: 6, unit: 'in' },
    svgPath:
      "<circle cx='-7' cy='0' r='1.5' fill='#444' stroke='#111' stroke-width='0.5'/>" +
      "<circle cx='7' cy='0' r='1.5' fill='#444' stroke='#111' stroke-width='0.5'/>" +
      "<line x1='-5' y1='0' x2='5' y2='0' stroke='#777' stroke-width='1' stroke-linecap='round'/>",
  },
  {
    id: 'easel',
    type: 'decor',
    category: 'Crowd Control',
    name: 'Easel',
    defaultDimensions: { width: 18, height: 18, unit: 'in' },
    svgPath:
      "<polygon points='0,-8 -7,7 7,7' fill='#EFEFEF' stroke='#7A7A7A' stroke-width='0.8'/>" +
      "<line x1='0' y1='-8' x2='0' y2='7' stroke='#7A7A7A' stroke-width='0.8'/>",
  },
  {
    id: 'box-hedge',
    type: 'decor',
    category: 'Crowd Control',
    name: 'Box Hedge',
    defaultDimensions: { width: 48, height: 24, unit: 'in' },
    svgPath:
      "<rect x='-24' y='-12' width='48' height='24' rx='4' fill='#2F7F3E' stroke='#1F5B2C' stroke-width='1.2'/>" +
      '<g>' +
      "<circle cx='-18' cy='-6' r='1.8' fill='#3AA64D'/>" +
      "<circle cx='-6' cy='-8' r='1.6' fill='#3AA64D'/>" +
      "<circle cx='6' cy='-4' r='1.7' fill='#3AA64D'/>" +
      "<circle cx='18' cy='2' r='1.6' fill='#3AA64D'/>" +
      '</g>',
  },
  {
    id: 'mansion-gates',
    type: 'decor',
    category: 'Crowd Control',
    name: 'Mansion Gates',
    defaultDimensions: { width: 72, height: 12, unit: 'in' },
    svgPath:
      "<rect x='-36' y='-6' width='36' height='12' fill='#8B8B8B' stroke='#333' stroke-width='1' transform='skewX(-6)'/>" +
      "<rect x='0' y='-6' width='36' height='12' fill='#8B8B8B' stroke='#333' stroke-width='1' transform='skewX(6)'/>" +
      "<line x1='-2' y1='-6' x2='2' y2='6' stroke='#333' stroke-width='1'/>",
  },
  // Crowd Control & Structure

  // Branding & Displays
  {
    id: 'step-and-repeat',
    type: 'decor',
    category: 'Branding',
    name: 'Custom Step & Repeat',
    defaultDimensions: { width: 144, height: 24, unit: 'in' },
    svgPath:
      "<rect x='-72' y='-12' width='144' height='24' fill='#FFFFFF' stroke='#DDDDDD' stroke-width='1'/>" +
      "<g fill='#E6E6E6'>" +
      "<circle cx='-50' cy='0' r='1.4'/>" +
      "<circle cx='-30' cy='0' r='1.4'/>" +
      "<circle cx='-10' cy='0' r='1.4'/>" +
      "<circle cx='10' cy='0' r='1.4'/>" +
      "<circle cx='30' cy='0' r='1.4'/>" +
      "<circle cx='50' cy='0' r='1.4'/>" +
      '</g>' +
      "<text x='0' y='6' text-anchor='middle' font-size='8' fill='#999'>STEP & REPEAT</text>",
  },
  {
    id: 'pop-up-banner',
    type: 'decor',
    category: 'Branding',
    name: 'Pop-Up Display Banner',
    defaultDimensions: { width: 24, height: 72, unit: 'in' },
    svgPath:
      "<rect x='-12' y='-36' width='24' height='72' fill='#F5F5F5' stroke='#CFCFCF' stroke-width='1' rx='2'/>" +
      "<text x='0' y='2' text-anchor='middle' font-size='8' fill='#777' transform='rotate(90 0 0)'>BANNER</text>",
  },
  {
    id: 'branding-wall',
    type: 'decor',
    category: 'Branding',
    name: 'Branding Wall (Stage)',
    defaultDimensions: { width: 240, height: 12, unit: 'in' },
    svgPath:
      "<rect x='-120' y='-6' width='240' height='12' fill='#222' stroke='#111' stroke-width='1.5'/>" +
      "<text x='0' y='2' text-anchor='middle' font-size='9' fill='#DDD'>BRANDING WALL</text>",
  },
  // Branding & Displays

  // Floral & Tabletop
  {
    id: 'floral-centerpiece',
    type: 'decor',
    category: 'Floral',
    name: 'Floral Centerpiece',
    defaultDimensions: { width: 12, height: 12, unit: 'in' },
    svgPath:
      "<circle cx='0' cy='0' r='6' fill='#E86FAF' stroke='#8C335F' stroke-width='0.6'/>" +
      "<g fill='#FFB7DB'>" +
      "<circle cx='-2' cy='-2' r='1.4'/>" +
      "<circle cx='2' cy='-2' r='1.4'/>" +
      "<circle cx='0' cy='2' r='1.4'/>" +
      '</g>',
  },
  {
    id: 'colored-votive',
    type: 'decor',
    category: 'Floral',
    name: 'Colored Votive',
    defaultDimensions: { width: 2.5, height: 2.5, unit: 'in' },
    svgPath:
      "<circle cx='0' cy='0' r='1.2' fill='#FF7F50' stroke='#CC5F3A' stroke-width='0.3'/>",
  },
  {
    id: 'bling-candle',
    type: 'decor',
    category: 'Floral',
    name: 'Bling Candle',
    defaultDimensions: { width: 2.5, height: 2.5, unit: 'in' },
    svgPath:
      "<circle cx='0' cy='0' r='1.2' fill='#FFF3C4' stroke='#E0C66A' stroke-width='0.3'/>" +
      "<g transform='translate(0,-1.5)'>" +
      "<line x1='0' y1='0' x2='0' y2='0.8' stroke='#FFD700' stroke-width='0.6'/>" +
      '</g>',
  },
  {
    id: 'table-linen-square-black',
    type: 'decor',
    category: 'Tabletop',
    name: 'Table Linen (Black) - Square',
    defaultDimensions: { width: 36, height: 36, unit: 'in' },
    svgPath:
      "<rect x='-18' y='-18' width='36' height='36' rx='4' fill='#000000' opacity='0.95' stroke='#111' stroke-width='0.6'/>",
  },
  {
    id: 'table-linen-round-cream',
    type: 'decor',
    category: 'Tabletop',
    name: 'Table Linen (Cream) - Round',
    defaultDimensions: { width: 60, height: 60, unit: 'in' },
    svgPath:
      "<circle cx='0' cy='0' r='30' fill='#FAF0E6' stroke='#E6D6C8' stroke-width='0.8'/>",
  },
  {
    id: 'plant-large',
    type: 'decor',
    category: 'Decor',
    name: 'Large Plant',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },
    svgPath: `<circle cx="0" cy="0" r="12" fill="#228B22" stroke="#006400" stroke-width="1.5"/>`,
  },
  // Floral & Tabletop

  // Ceremony & Room Structure
  {
    id: 'chuppah',
    type: 'decor',
    category: 'Ceremony',
    name: 'Jewish Ceremony Chuppah',
    defaultDimensions: { width: 72, height: 72, unit: 'in' },
    svgPath:
      "<rect x='-36' y='-36' width='72' height='72' rx='6' fill='none' stroke='#B8860B' stroke-width='1.5'/>" +
      "<circle cx='-32' cy='-32' r='2.4' fill='#B8860B'/>" +
      "<circle cx='32' cy='-32' r='2.4' fill='#B8860B'/>" +
      "<circle cx='32' cy='32' r='2.4' fill='#B8860B'/>" +
      "<circle cx='-32' cy='32' r='2.4' fill='#B8860B'/>",
  },
  {
    id: 'pipe-and-drape-black',
    type: 'decor',
    category: 'Ceremony',
    name: 'Pipe & Drape (Black)',
    defaultDimensions: { width: 240, height: 12, unit: 'in' },
    svgPath:
      "<rect x='-120' y='-6' width='240' height='12' fill='#111' stroke='#000' stroke-width='1'/>",
  },
  {
    id: 'pipe-and-drape-blue',
    type: 'decor',
    category: 'Ceremony',
    name: 'Pipe & Drape (Blue)',
    defaultDimensions: { width: 240, height: 12, unit: 'in' },
    svgPath:
      "<rect x='-120' y='-6' width='240' height='12' fill='#2F6FA6' stroke='#1E3E5A' stroke-width='1'/>",
  },
  {
    id: 'room-dividers',
    type: 'decor',
    category: 'Ceremony',
    name: 'Room Dividers (Accordion)',
    defaultDimensions: { width: 96, height: 6, unit: 'in' },
    svgPath:
      '<g>' +
      "<rect x='-48' y='-3' width='10' height='6' fill='#222' stroke='#000'/>" +
      "<rect x='-36' y='-3' width='10' height='6' fill='#2B2B2B' stroke='#000'/>" +
      "<rect x='-24' y='-3' width='10' height='6' fill='#222' stroke='#000'/>" +
      "<rect x='-12' y='-3' width='10' height='6' fill='#2B2B2B' stroke='#000'/>" +
      "<rect x='0' y='-3' width='10' height='6' fill='#222' stroke='#000'/>" +
      "<rect x='12' y='-3' width='10' height='6' fill='#2B2B2B' stroke='#000'/>" +
      "<rect x='24' y='-3' width='10' height='6' fill='#222' stroke='#000'/>" +
      '</g>',
  },
  {
    id: 'divider-screen',
    type: 'decor',
    category: 'Decor',
    name: 'Room Divider',
    defaultDimensions: { width: 72, height: 6, unit: 'in' },
    svgPath: `<rect x="-36" y="-3" width="72" height="6" fill="#8B8B8B"/>`,
  },
  {
    id: 'folding-screens-black',
    type: 'decor',
    category: 'Ceremony',
    name: 'Free-Standing Folding Screens (Black, 3-panel)',
    defaultDimensions: { width: 72, height: 6, unit: 'in' },
    svgPath:
      "<rect x='-36' y='-3' width='24' height='6' fill='#111' stroke='#000'/>" +
      "<rect x='-12' y='-3' width='24' height='6' fill='#222' stroke='#000'/>" +
      "<rect x='12' y='-3' width='24' height='6' fill='#111' stroke='#000'/>",
  },

  // Ceremony & Room Structure
  // Carpet

  {
    id: 'carpet-red-rectangle',
    type: 'decor',
    category: 'Carpet',
    name: 'Red Carpet',
    defaultDimensions: { width: 252, height: 60, unit: 'in' },
    svgPath: `<rect x="-126" y="-30" width="252" height="60" fill="#AF2025" stroke="#8B0000" stroke-width="2"/>
              <rect x="-122" y="-26" width="244" height="52" fill="none" stroke="#C92530" stroke-width="1" stroke-dasharray="4,4"/>
              <rect x="-118" y="-22" width="236" height="44" fill="none" stroke="#8B0000" stroke-width="0.5"/>`,
    groupBy: 'Red Carpet',
  },
  {
    id: 'carpet-runner-red',
    type: 'decor',
    category: 'Carpet',
    name: 'Carpet Runner – Red',
    defaultDimensions: { width: 48, height: 240, unit: 'in' },
    svgPath:
      "<rect x='-24' y='-120' width='48' height='240' fill='#B22222' stroke='#700000' stroke-width='2'/>" +
      "<rect x='-21' y='-117' width='42' height='234' fill='none' stroke='#F2C06B' stroke-width='1.5'/>",
  },
  {
    id: 'carpet-runner-white',
    type: 'decor',
    category: 'Carpet',
    name: 'Carpet Runner – White',
    defaultDimensions: { width: 48, height: 240, unit: 'in' },
    svgPath:
      "<rect x='-24' y='-120' width='48' height='240' fill='#F8F8F8' stroke='#CCCCCC' stroke-width='2'/>" +
      "<rect x='-21' y='-117' width='42' height='234' fill='none' stroke='#DDDDDD' stroke-width='1.5'/>",
  },
  {
    id: 'carpet-runner-blue',
    type: 'decor',
    category: 'Carpet',
    name: 'Carpet Runner – Blue',
    defaultDimensions: { width: 48, height: 240, unit: 'in' },
    svgPath:
      "<rect x='-24' y='-120' width='48' height='240' fill='#0000FF' stroke='#000000' stroke-width='2'/>" +
      "<rect x='-21' y='-117' width='42' height='234' fill='none' stroke='#777777' stroke-width='1.5'/>",
    groupBy: 'Blue Carpet',
  },
  {
    id: 'carpet-runner-black',
    type: 'decor',
    category: 'Carpet',
    name: 'Carpet Runner – Black',
    defaultDimensions: { width: 48, height: 240, unit: 'in' },
    svgPath:
      "<rect x='-24' y='-120' width='48' height='240' fill='#111111' stroke='#555555' stroke-width='2'/>" +
      "<rect x='-21' y='-117' width='42' height='234' fill='none' stroke='#777777' stroke-width='1.5'/>",
  },
  // Carpet

  // BACKDROPS
  {
    id: 'backdrop-arch',
    type: 'decor',
    category: 'Backdrops',
    name: 'Backdrop – Arch',
    defaultDimensions: { width: 96, height: 24, unit: 'in' },
    svgPath:
      "<path d='M-48,12 A48,48 0 0 1 48,12 L40,12 A40,40 0 0 0 -40,12 Z' fill='#F5E1E1' stroke='#AA7777' stroke-width='1.5'/>",
  },
  {
    id: 'backdrop-circle',
    type: 'decor',
    category: 'Backdrops',
    name: 'Backdrop – Circle',
    defaultDimensions: { width: 72, height: 12, unit: 'in' },
    svgPath:
      "<circle cx='0' cy='0' r='30' fill='none' stroke='#AA88CC' stroke-width='3'/>",
  },
  {
    id: 'backdrop-square',
    type: 'decor',
    category: 'Backdrops',
    name: 'Backdrop – Square Frame',
    defaultDimensions: { width: 96, height: 12, unit: 'in' },
    svgPath:
      "<rect x='-36' y='-36' width='72' height='72' fill='none' stroke='#8899AA' stroke-width='3' stroke-dasharray='6,4'/>",
  },
  // BACKDROPS
];

export const getDecorByCategory = (
  category: string
): DraggableLibraryItem[] => {
  return DECOR_LIBRARY.filter((item) => item.category === category);
};

export const getDecorById = (id: string): DraggableLibraryItem | undefined => {
  return DECOR_LIBRARY.find((item) => item.id === id);
};

export const getDecorCategories = (): string[] => {
  const categories = new Set(DECOR_LIBRARY.map((item) => item.category));
  return Array.from(categories).sort();
};
