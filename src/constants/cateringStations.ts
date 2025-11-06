import { DraggableLibraryItem } from '../types/floorplan.types';

export const CATERING_LIBRARY: DraggableLibraryItem[] = [
  {
    id: 'buffet-station-6ft',
    type: 'catering',
    category: 'Buffet',
    name: 'Buffet Station (6ft)',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath: `<rect x="-36" y="-15" width="72" height="30" fill="#D2B48C" stroke="#000" stroke-width="2"/>
              <rect x="-34" y="-10" width="15" height="8" fill="#FF6347" stroke="#000" stroke-width="0.5"/>
              <rect x="-15" y="-10" width="15" height="8" fill="#FFD700" stroke="#000" stroke-width="0.5"/>
              <rect x="4" y="-10" width="15" height="8" fill="#32CD32" stroke="#000" stroke-width="0.5"/>
              <rect x="23" y="-10" width="11" height="8" fill="#8B4513" stroke="#000" stroke-width="0.5"/>
              <text x="0" y="8" text-anchor="middle" fill="#000" font-size="9">BUFFET</text>`,
  },
  {
    id: 'buffet-station-8ft',
    type: 'catering',
    category: 'Buffet',
    name: 'Buffet Station (8ft)',
    defaultDimensions: { width: 96, height: 30, unit: 'in' },
    svgPath: `<rect x="-48" y="-15" width="96" height="30" fill="#D2B48C" stroke="#000" stroke-width="2"/>
              <rect x="-44" y="-10" width="18" height="8" fill="#FF6347" stroke="#000" stroke-width="0.5"/>
              <rect x="-22" y="-10" width="18" height="8" fill="#FFD700" stroke="#000" stroke-width="0.5"/>
              <rect x="0" y="-10" width="18" height="8" fill="#32CD32" stroke="#000" stroke-width="0.5"/>
              <rect x="22" y="-10" width="22" height="8" fill="#8B4513" stroke="#000" stroke-width="0.5"/>
              <text x="0" y="8" text-anchor="middle" fill="#000" font-size="9">BUFFET</text>`,
  },
  {
    id: 'carving-station',
    type: 'catering',
    category: 'Buffet',
    name: 'Carving Station',
    defaultDimensions: { width: 48, height: 30, unit: 'in' },
    svgPath: `<rect x="-24" y="-15" width="48" height="30" fill="#8B4513" stroke="#000" stroke-width="2"/>
              <ellipse cx="0" cy="-5" rx="10" ry="6" fill="#D2691E" stroke="#000" stroke-width="1"/>
              <rect x="-6" y="2" width="12" height="6" fill="#CD853F" stroke="#000" stroke-width="0.5"/>
              <text x="0" y="13" text-anchor="middle" fill="#FFF" font-size="8">CARVING</text>`,
  },
  {
    id: 'salad-bar',
    type: 'catering',
    category: 'Buffet',
    name: 'Salad Bar',
    defaultDimensions: { width: 60, height: 30, unit: 'in' },
    svgPath: `<rect x="-30" y="-15" width="60" height="30" fill="#90EE90" stroke="#000" stroke-width="2" opacity="0.8"/>
              <circle cx="-15" cy="-5" r="4" fill="#228B22" stroke="#000" stroke-width="0.5"/>
              <circle cx="0" cy="-5" r="4" fill="#FF6347" stroke="#000" stroke-width="0.5"/>
              <circle cx="15" cy="-5" r="4" fill="#FFD700" stroke="#000" stroke-width="0.5"/>
              <text x="0" y="8" text-anchor="middle" fill="#000" font-size="9">SALAD BAR</text>`,
  },
  {
    id: 'pasta-station',
    type: 'catering',
    category: 'Buffet',
    name: 'Pasta Station',
    defaultDimensions: { width: 54, height: 30, unit: 'in' },
    svgPath: `<rect x="-27" y="-15" width="54" height="30" fill="#FFE4B5" stroke="#000" stroke-width="2"/>
              <circle cx="-10" cy="-5" r="5" fill="#FF6347" stroke="#000" stroke-width="1"/>
              <circle cx="10" cy="-5" r="5" fill="#FAFAD2" stroke="#000" stroke-width="1"/>
              <text x="0" y="8" text-anchor="middle" fill="#000" font-size="9">PASTA</text>`,
  },
  {
    id: 'dessert-station',
    type: 'catering',
    category: 'Dessert',
    name: 'Dessert Station',
    defaultDimensions: { width: 60, height: 30, unit: 'in' },
    svgPath: `<rect x="-30" y="-15" width="60" height="30" fill="#FFB6C1" stroke="#000" stroke-width="2"/>
              <circle cx="-12" cy="-5" r="4" fill="#FF69B4" stroke="#000" stroke-width="0.5"/>
              <circle cx="0" cy="-5" r="4" fill="#DDA0DD" stroke="#000" stroke-width="0.5"/>
              <circle cx="12" cy="-5" r="4" fill="#FFC0CB" stroke="#000" stroke-width="0.5"/>
              <text x="0" y="8" text-anchor="middle" fill="#000" font-size="9">DESSERT</text>`,
  },
  {
    id: 'cake-table',
    type: 'catering',
    category: 'Dessert',
    name: 'Cake Table',
    defaultDimensions: { width: 48, height: 30, unit: 'in' },
    svgPath: `<rect x="-24" y="-15" width="48" height="30" fill="#FFF" stroke="#000" stroke-width="2"/>
              <rect x="-8" y="-8" width="16" height="12" fill="#FFB6C1" stroke="#000" stroke-width="1"/>
              <rect x="-6" y="-10" width="12" height="2" fill="#FF69B4" stroke="#000" stroke-width="0.5"/>
              <text x="0" y="12" text-anchor="middle" fill="#000" font-size="8">CAKE</text>`,
  },

  {
    id: 'beverage-station',
    type: 'catering',
    category: 'Beverage',
    name: 'Beverage Station',
    defaultDimensions: { width: 48, height: 30, unit: 'in' },
    svgPath: `<rect x="-24" y="-15" width="48" height="30" fill="#4682B4" stroke="#000" stroke-width="2" opacity="0.7"/>
              <rect x="-18" y="-8" width="12" height="10" fill="#87CEEB" stroke="#000" stroke-width="1"/>
              <rect x="6" y="-8" width="12" height="10" fill="#87CEEB" stroke="#000" stroke-width="1"/>
              <text x="0" y="12" text-anchor="middle" fill="#FFF" font-size="8">BEVERAGE</text>`,
  },
  {
    id: 'coffee-station',
    type: 'catering',
    category: 'Beverage',
    name: 'Coffee/Tea Station',
    defaultDimensions: { width: 42, height: 24, unit: 'in' },
    svgPath: `<rect x="-21" y="-12" width="42" height="24" fill="#8B4513" stroke="#000" stroke-width="2"/>
              <circle cx="-8" cy="-3" r="4" fill="#6F4E37" stroke="#000" stroke-width="1"/>
              <circle cx="8" cy="-3" r="4" fill="#D2691E" stroke="#000" stroke-width="1"/>
              <text x="0" y="10" text-anchor="middle" fill="#FFF" font-size="8">COFFEE</text>`,
  },
  {
    id: 'bar-setup',
    type: 'catering',
    category: 'Beverage',
    name: 'Bar Setup (6ft)',
    defaultDimensions: { width: 72, height: 24, unit: 'in' },
    svgPath: `<rect x="-36" y="-12" width="72" height="24" fill="#2F4F4F" stroke="#000" stroke-width="2"/>
              <rect x="-30" y="-8" width="10" height="12" fill="#8B4513" stroke="#000" stroke-width="0.5"/>
              <rect x="-16" y="-8" width="10" height="12" fill="#FFD700" stroke="#000" stroke-width="0.5"/>
              <rect x="-2" y="-8" width="10" height="12" fill="#90EE90" stroke="#000" stroke-width="0.5"/>
              <rect x="12" y="-8" width="10" height="12" fill="#FF6347" stroke="#000" stroke-width="0.5"/>
              <rect x="26" y="-8" width="4" height="8" fill="#C0C0C0" stroke="#000" stroke-width="0.5"/>
              <text x="0" y="10" text-anchor="middle" fill="#FFF" font-size="9">BAR</text>`,
  },
  {
    id: 'wine-tasting',
    type: 'catering',
    category: 'Beverage',
    name: 'Wine Tasting Table',
    defaultDimensions: { width: 54, height: 30, unit: 'in' },
    svgPath: `<rect x="-27" y="-15" width="54" height="30" fill="#722F37" stroke="#000" stroke-width="2"/>
              <circle cx="-15" cy="-3" r="3" fill="#8B0000" stroke="#000" stroke-width="0.5"/>
              <circle cx="-5" cy="-3" r="3" fill="#DC143C" stroke="#000" stroke-width="0.5"/>
              <circle cx="5" cy="-3" r="3" fill="#FFD700" stroke="#000" stroke-width="0.5"/>
              <circle cx="15" cy="-3" r="3" fill="#F5F5DC" stroke="#000" stroke-width="0.5"/>
              <text x="0" y="10" text-anchor="middle" fill="#FFF" font-size="8">WINE</text>`,
  },

  {
    id: 'taco-station',
    type: 'catering',
    category: 'Specialty',
    name: 'Taco/Fajita Bar',
    defaultDimensions: { width: 60, height: 30, unit: 'in' },
    svgPath: `<rect x="-30" y="-15" width="60" height="30" fill="#FFD700" stroke="#000" stroke-width="2" opacity="0.8"/>
              <path d="M -12,-6 L -6,-2 L -12,2 Z" fill="#FF6347" stroke="#000" stroke-width="0.5"/>
              <path d="M 0,-6 L 6,-2 L 0,2 Z" fill="#32CD32" stroke="#000" stroke-width="0.5"/>
              <path d="M 12,-6 L 18,-2 L 12,2 Z" fill="#8B4513" stroke="#000" stroke-width="0.5"/>
              <text x="0" y="10" text-anchor="middle" fill="#000" font-size="9">TACO BAR</text>`,
  },
  {
    id: 'sushi-station',
    type: 'catering',
    category: 'Specialty',
    name: 'Sushi Station',
    defaultDimensions: { width: 60, height: 30, unit: 'in' },
    svgPath: `<rect x="-30" y="-15" width="60" height="30" fill="#2F4F4F" stroke="#000" stroke-width="2"/>
              <ellipse cx="-12" cy="-4" rx="8" ry="3" fill="#FF6347" stroke="#000" stroke-width="0.5"/>
              <ellipse cx="0" cy="-4" rx="8" ry="3" fill="#FFA07A" stroke="#000" stroke-width="0.5"/>
              <ellipse cx="12" cy="-4" rx="8" ry="3" fill="#32CD32" stroke="#000" stroke-width="0.5"/>
              <text x="0" y="10" text-anchor="middle" fill="#FFF" font-size="9">SUSHI</text>`,
  },
  {
    id: 'ice-cream-station',
    type: 'catering',
    category: 'Specialty',
    name: 'Ice Cream Station',
    defaultDimensions: { width: 48, height: 30, unit: 'in' },
    svgPath: `<rect x="-24" y="-15" width="48" height="30" fill="#FFE4E1" stroke="#000" stroke-width="2"/>
              <ellipse cx="-8" cy="-5" rx="5" ry="6" fill="#FFB6C1" stroke="#000" stroke-width="1"/>
              <ellipse cx="0" cy="-5" rx="5" ry="6" fill="#DEB887" stroke="#000" stroke-width="1"/>
              <ellipse cx="8" cy="-5" rx="5" ry="6" fill="#98FB98" stroke="#000" stroke-width="1"/>
              <text x="0" y="10" text-anchor="middle" fill="#000" font-size="8">ICE CREAM</text>`,
  },
  {
    id: 'popcorn-cart',
    type: 'catering',
    category: 'Specialty',
    name: 'Popcorn Cart',
    defaultDimensions: { width: 36, height: 30, unit: 'in' },
    svgPath: `<rect x="-18" y="-15" width="36" height="30" fill="#FFD700" stroke="#000" stroke-width="2" rx="3"/>
              <rect x="-14" y="-10" width="28" height="15" fill="#FF6347" stroke="#000" stroke-width="1" rx="2"/>
              <circle cx="-10" cy="12" r="3" fill="#1C1C1C" stroke="#000" stroke-width="1"/>
              <circle cx="10" cy="12" r="3" fill="#1C1C1C" stroke="#000" stroke-width="1"/>
              <text x="0" y="2" text-anchor="middle" fill="#FFF" font-size="7">POPCORN</text>`,
  },
  {
    id: 'cotton-candy',
    type: 'catering',
    category: 'Specialty',
    name: 'Cotton Candy Machine',
    defaultDimensions: { width: 30, height: 30, unit: 'in' },
    svgPath: `<circle cx="0" cy="0" r="15" fill="#FFB6C1" stroke="#000" stroke-width="2" opacity="0.8"/>
              <circle cx="0" cy="0" r="10" fill="#FF69B4" stroke="#000" stroke-width="1" opacity="0.6"/>
              <circle cx="0" cy="0" r="5" fill="#FFC0CB" stroke="#000" stroke-width="0.5"/>`,
  },

  {
    id: 'serving-cart',
    type: 'catering',
    category: 'Service',
    name: 'Serving Cart',
    defaultDimensions: { width: 36, height: 24, unit: 'in' },
    svgPath: `<rect x="-18" y="-12" width="36" height="24" fill="#C0C0C0" stroke="#000" stroke-width="2"/>
              <rect x="-16" y="-8" width="32" height="3" fill="#808080" stroke="#000" stroke-width="0.5"/>
              <rect x="-16" y="1" width="32" height="3" fill="#808080" stroke="#000" stroke-width="0.5"/>
              <circle cx="-12" cy="12" r="2" fill="#1C1C1C" stroke="#000" stroke-width="0.5"/>
              <circle cx="12" cy="12" r="2" fill="#1C1C1C" stroke="#000" stroke-width="0.5"/>`,
  },
  {
    id: 'trash-receptacle',
    type: 'catering',
    category: 'Service',
    name: 'Trash/Recycling',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },
    svgPath: `<rect x="-12" y="-12" width="24" height="24" fill="#696969" stroke="#000" stroke-width="2" rx="2"/>
              <rect x="-10" y="-10" width="20" height="20" fill="#808080" stroke="#000" stroke-width="1"/>
              <line x1="-6" y1="-6" x2="6" y2="6" stroke="#000" stroke-width="1.5"/>
              <line x1="6" y1="-6" x2="-6" y2="6" stroke="#000" stroke-width="1.5"/>`,
  },
  {
    id: 'chafing-dish',
    type: 'catering',
    category: 'Service',
    name: 'Chafing Dish Setup',
    defaultDimensions: { width: 30, height: 24, unit: 'in' },
    svgPath: `<rect x="-15" y="-12" width="30" height="24" fill="#C0C0C0" stroke="#000" stroke-width="1.5"/>
              <ellipse cx="0" cy="-3" rx="12" ry="6" fill="#B0C4DE" stroke="#000" stroke-width="1"/>
              <rect x="-2" y="6" width="4" height="3" fill="#FF6347" stroke="#000" stroke-width="0.5"/>`,
  },
];

export const getCateringByCategory = (
  category: string
): DraggableLibraryItem[] => {
  return CATERING_LIBRARY.filter((item) => item.category === category);
};

export const getCateringById = (
  id: string
): DraggableLibraryItem | undefined => {
  return CATERING_LIBRARY.find((item) => item.id === id);
};

export const getAllCateringCategories = (): string[] => {
  const categories = new Set(CATERING_LIBRARY.map((item) => item.category));
  return Array.from(categories).sort();
};
