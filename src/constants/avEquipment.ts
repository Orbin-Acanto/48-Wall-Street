import { DraggableLibraryItem } from '../types/floorplan.types';

export const AV_EQUIPMENT_LIBRARY: DraggableLibraryItem[] = [
  {
    id: 'speaker-large',
    type: 'av',
    category: 'Audio',
    name: 'Large Speaker',
    defaultDimensions: { width: 24, height: 18, unit: 'in' },
    svgPath: `<rect x="-12" y="-9" width="24" height="18" fill="#1C1C1C" stroke="#000" stroke-width="1.5"/>
              <circle cx="0" cy="0" r="6" fill="#333" stroke="#666" stroke-width="1"/>
              <circle cx="0" cy="0" r="3" fill="#555" stroke="#777" stroke-width="0.5"/>`,
  },
  {
    id: 'speaker-monitor',
    type: 'av',
    category: 'Audio',
    name: 'Monitor Speaker',
    defaultDimensions: { width: 18, height: 12, unit: 'in' },
    svgPath: `<rect x="-9" y="-6" width="18" height="12" fill="#1C1C1C" stroke="#000" stroke-width="1.5"/>
              <circle cx="0" cy="0" r="4" fill="#333" stroke="#666" stroke-width="1"/>`,
  },
  {
    id: 'subwoofer',
    type: 'av',
    category: 'Audio',
    name: 'Subwoofer',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },
    svgPath: `<rect x="-12" y="-12" width="24" height="24" fill="#0A0A0A" stroke="#000" stroke-width="2"/>
              <circle cx="0" cy="0" r="8" fill="#1C1C1C" stroke="#333" stroke-width="1"/>
              <circle cx="0" cy="0" r="5" fill="#2C2C2C" stroke="#444" stroke-width="0.5"/>`,
  },
  {
    id: 'dj-booth',
    type: 'av',
    category: 'Audio',
    name: 'DJ Booth',
    defaultDimensions: { width: 60, height: 36, unit: 'in' },
    svgPath: `<rect x="-30" y="-18" width="60" height="36" fill="#2F4F4F" stroke="#000" stroke-width="2"/>
              <rect x="-25" y="-13" width="20" height="15" fill="#1C1C1C" stroke="#666" stroke-width="1"/>
              <rect x="5" y="-13" width="20" height="15" fill="#1C1C1C" stroke="#666" stroke-width="1"/>
              <text x="0" y="5" text-anchor="middle" fill="#FFF" font-size="10">DJ</text>`,
  },
  {
    id: 'microphone-stand',
    type: 'av',
    category: 'Audio',
    name: 'Microphone Stand',
    defaultDimensions: { width: 12, height: 12, unit: 'in' },
    svgPath: `<circle cx="0" cy="0" r="6" fill="#C0C0C0" stroke="#000" stroke-width="1"/>
              <rect x="-1" y="-8" width="2" height="6" fill="#808080" stroke="#000" stroke-width="0.5"/>
              <circle cx="0" cy="-8" r="2" fill="#1C1C1C" stroke="#000" stroke-width="0.5"/>`,
  },

  {
    id: 'projector-screen',
    type: 'av',
    category: 'Video',
    name: 'Projector Screen (10ft)',
    defaultDimensions: { width: 120, height: 12, unit: 'in' },
    svgPath: `<rect x="-60" y="-6" width="120" height="12" fill="#F5F5F5" stroke="#000" stroke-width="2"/>
              <rect x="-58" y="-4" width="116" height="8" fill="#FFF" stroke="#999" stroke-width="1"/>
              <text x="0" y="3" text-anchor="middle" fill="#999" font-size="8">SCREEN</text>`,
  },
  {
    id: 'tv-55',
    type: 'av',
    category: 'Video',
    name: 'TV 55"',
    defaultDimensions: { width: 48, height: 6, unit: 'in' },
    svgPath: `<rect x="-24" y="-3" width="48" height="6" fill="#1C1C1C" stroke="#000" stroke-width="1.5"/>
              <rect x="-23" y="-2" width="46" height="4" fill="#0A0A0A" stroke="#333" stroke-width="0.5"/>`,
  },
  {
    id: 'tv-75',
    type: 'av',
    category: 'Video',
    name: 'TV 75"',
    defaultDimensions: { width: 66, height: 6, unit: 'in' },
    svgPath: `<rect x="-33" y="-3" width="66" height="6" fill="#1C1C1C" stroke="#000" stroke-width="1.5"/>
              <rect x="-32" y="-2" width="64" height="4" fill="#0A0A0A" stroke="#333" stroke-width="0.5"/>`,
  },
  {
    id: 'projector',
    type: 'av',
    category: 'Video',
    name: 'Projector',
    defaultDimensions: { width: 18, height: 12, unit: 'in' },
    svgPath: `<rect x="-9" y="-6" width="18" height="12" fill="#3C3C3C" stroke="#000" stroke-width="1.5" rx="2"/>
              <circle cx="6" cy="0" r="4" fill="#1C1C1C" stroke="#000" stroke-width="1"/>
              <circle cx="6" cy="0" r="2.5" fill="#4169E1" stroke="#000" stroke-width="0.5" opacity="0.7"/>`,
  },
  {
    id: 'camera',
    type: 'av',
    category: 'Video',
    name: 'Camera on Tripod',
    defaultDimensions: { width: 18, height: 18, unit: 'in' },
    svgPath: `<circle cx="0" cy="0" r="9" fill="#E0E0E0" stroke="#000" stroke-width="1"/>
              <rect x="-4" y="-3" width="8" height="6" fill="#1C1C1C" stroke="#000" stroke-width="1"/>
              <rect x="4" y="-1" width="4" height="2" fill="#2C2C2C" stroke="#000" stroke-width="0.5"/>`,
  },

  {
    id: 'spotlight',
    type: 'av',
    category: 'Lighting',
    name: 'Spotlight',
    defaultDimensions: { width: 18, height: 18, unit: 'in' },
    svgPath: `<circle cx="0" cy="0" r="9" fill="#FFD700" stroke="#000" stroke-width="1.5" opacity="0.6"/>
              <circle cx="0" cy="0" r="5" fill="#FFF" stroke="#FFD700" stroke-width="1" opacity="0.8"/>`,
  },
  {
    id: 'uplighting',
    type: 'av',
    category: 'Lighting',
    name: 'Uplighting',
    defaultDimensions: { width: 12, height: 12, unit: 'in' },
    svgPath: `<rect x="-6" y="-6" width="12" height="12" fill="#1C1C1C" stroke="#000" stroke-width="1"/>
              <rect x="-4" y="-4" width="8" height="8" fill="#9370DB" stroke="#000" stroke-width="0.5" opacity="0.7"/>`,
  },
  {
    id: 'par-can',
    type: 'av',
    category: 'Lighting',
    name: 'PAR Can Light',
    defaultDimensions: { width: 15, height: 15, unit: 'in' },
    svgPath: `<circle cx="0" cy="0" r="7.5" fill="#1C1C1C" stroke="#000" stroke-width="1.5"/>
              <circle cx="0" cy="0" r="5" fill="#4169E1" stroke="#000" stroke-width="0.5" opacity="0.6"/>`,
  },
  {
    id: 'moving-head',
    type: 'av',
    category: 'Lighting',
    name: 'Moving Head Light',
    defaultDimensions: { width: 18, height: 18, unit: 'in' },
    svgPath: `<rect x="-9" y="-6" width="18" height="12" fill="#2C2C2C" stroke="#000" stroke-width="1.5" rx="3"/>
              <circle cx="0" cy="0" r="6" fill="#FF69B4" stroke="#000" stroke-width="1" opacity="0.7"/>`,
  },
  {
    id: 'light-truss',
    type: 'av',
    category: 'Lighting',
    name: 'Light Truss (10ft)',
    defaultDimensions: { width: 120, height: 12, unit: 'in' },
    svgPath: `<rect x="-60" y="-6" width="120" height="12" fill="#808080" stroke="#000" stroke-width="2"/>
              <rect x="-58" y="-4" width="30" height="8" fill="#A9A9A9" stroke="#000" stroke-width="0.5"/>
              <rect x="-23" y="-4" width="30" height="8" fill="#A9A9A9" stroke="#000" stroke-width="0.5"/>
              <rect x="13" y="-4" width="30" height="8" fill="#A9A9A9" stroke="#000" stroke-width="0.5"/>`,
  },

  {
    id: 'power-distro',
    type: 'av',
    category: 'Power',
    name: 'Power Distribution',
    defaultDimensions: { width: 24, height: 18, unit: 'in' },
    svgPath: `<rect x="-12" y="-9" width="24" height="18" fill="#FF6347" stroke="#000" stroke-width="1.5"/>
              <text x="0" y="3" text-anchor="middle" fill="#000" font-size="8">PWR</text>`,
  },
  {
    id: 'cable-ramp',
    type: 'av',
    category: 'Safety',
    name: 'Cable Ramp (4ft)',
    defaultDimensions: { width: 48, height: 6, unit: 'in' },
    svgPath: `<rect x="-24" y="-3" width="48" height="6" fill="#FFD700" stroke="#000" stroke-width="1.5"/>
              <line x1="-20" y1="-2" x2="-20" y2="2" stroke="#000" stroke-width="1"/>
              <line x1="0" y1="-2" x2="0" y2="2" stroke="#000" stroke-width="1"/>
              <line x1="20" y1="-2" x2="20" y2="2" stroke="#000" stroke-width="1"/>`,
  },
];

export const getAVEquipmentByCategory = (
  category: string
): DraggableLibraryItem[] => {
  return AV_EQUIPMENT_LIBRARY.filter((item) => item.category === category);
};

export const getAVEquipmentById = (
  id: string
): DraggableLibraryItem | undefined => {
  return AV_EQUIPMENT_LIBRARY.find((item) => item.id === id);
};

export const getAllAVCategories = (): string[] => {
  const categories = new Set(AV_EQUIPMENT_LIBRARY.map((item) => item.category));
  return Array.from(categories).sort();
};
