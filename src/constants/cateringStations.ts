import { DraggableLibraryItem } from '../types/floorplan.types';

export const CATERING_LIBRARY: DraggableLibraryItem[] = [
  {
    id: 'food-station-1',
    type: 'catering',
    category: 'Food',
    name: 'Food Station 1',
    defaultDimensions: { width: 72, height: 19, unit: 'in' },
    svgPath: `<rect x="-36" y="-9.5" width="72" height="19" fill="#39B54A" stroke="#000" stroke-width="0.5"/>`,
    groupBy: 'Food 1',
  },
  {
    id: 'food-station-2',
    type: 'catering',
    category: 'Food',
    name: 'Food Station 2',
    defaultDimensions: { width: 72, height: 19, unit: 'in' },
    svgPath: `<rect x="-36" y="-9.5" width="72" height="19" fill="#603913" stroke="#000" stroke-width="0.5"/>`,
    groupBy: 'Food 2',
  },
  {
    id: 'food-station-3',
    type: 'catering',
    category: 'Food',
    name: 'Food Station 3',
    defaultDimensions: { width: 72, height: 19, unit: 'in' },
    svgPath: `<rect x="-36" y="-9.5" width="72" height="19" fill="#92278F" stroke="#000" stroke-width="0.5"/>`,
    groupBy: 'Food 3',
  },
  // Food Station End

  // Beverage Start
  {
    id: 'coffee-station',
    type: 'catering',
    category: 'Beverage',
    name: 'Coffee Station',
    defaultDimensions: { width: 42, height: 24, unit: 'in' },
    svgPath: `<rect x="-21" y="-12" width="42" height="24" fill="#355855" />`,
    groupBy: 'Coffee',
  },
  {
    id: 'bar-straight-1',
    type: 'catering',
    category: 'Beverage',
    name: 'Straight Bar (12ft)',
    defaultDimensions: { width: 144, height: 24, unit: 'in' },
    svgPath: `<rect x="-72" y="-12" width="144" height="24" fill="#00A79D" />
              <text x="0" y="5" text-anchor="middle" fill="#FFF" font-size="10">BAR</text>`,
    groupBy: "12' Bar",
  },
  {
    id: 'bar-straight-2',
    type: 'catering',
    category: 'Beverage',
    name: 'Straight Bar (18ft)',
    defaultDimensions: { width: 216, height: 24, unit: 'in' },
    svgPath: `<rect x="-108" y="-12" width="216" height="24" fill="#9E1F63" />
              <text x="0" y="5" text-anchor="middle" fill="#FFF" font-size="10">BAR</text>`,
    groupBy: "18' Bar",
  },
  // Beverage End
  // Misc Start
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
  // Misc End
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
