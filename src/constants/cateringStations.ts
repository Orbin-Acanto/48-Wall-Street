import { DraggableLibraryItem } from '../types/floorplan.types';

export const CATERING_LIBRARY: DraggableLibraryItem[] = [
  {
    id: 'asian-station',
    type: 'catering',
    category: 'Food',
    name: 'Asian Station',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath: `<rect x="-36" y="-15" width="72" height="30" fill="#39B54A" stroke="#000" stroke-width="0.5"/>`,
    groupBy: 'asian station',
  },
  {
    id: 'latin-station',
    type: 'catering',
    category: 'Food',
    name: 'Latin Station',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath: `<rect x="-36" y="-15" width="72" height="30" fill="#603913" stroke="#000" stroke-width="0.5"/>`,
    groupBy: 'latin station',
  },
  {
    id: 'food-station-3',
    type: 'catering',
    category: 'Food',
    name: 'Pasta Station',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath: `<rect x="-36" y="-15" width="72" height="30" fill="#92278F" stroke="#000" stroke-width="0.5"/>`,
    groupBy: 'pasta station',
  },
  {
    id: 'food-station-4',
    type: 'catering',
    category: 'Food',
    name: 'Kosher Station',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath: `<rect x="-36" y="-15" width="72" height="30" fill="#FFEA00" stroke="#000" stroke-width="0.5"/>`,
    groupBy: 'kosher station',
  },
  {
    id: 'food-station-hot-buffet',
    type: 'catering',
    category: 'Food',
    name: 'Hot Buffet Station',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-36" y="-15" width="72" height="30" rx="3" ry="3" fill="#F8F3E7" stroke="#444" stroke-width="0.75"/>` +
      `<rect x="-30" y="-10" width="16" height="8" fill="#C0392B" stroke="#73302A" stroke-width="0.6"/>` +
      `<rect x="-8" y="-10" width="16" height="8" fill="#E67E22" stroke="#8C4B18" stroke-width="0.6"/>` +
      `<rect x="14" y="-10" width="16" height="8" fill="#D35400" stroke="#8B3A14" stroke-width="0.6"/>` +
      `<rect x="-30" y="3" width="60" height="7" fill="#EEE2CF" stroke="#BFA27A" stroke-width="0.5"/>`,
    groupBy: 'Buffet / Food Line',
  },
  {
    id: 'food-station-salad-cold',
    type: 'catering',
    category: 'Food',
    name: 'Salad & Cold Station',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-36" y="-15" width="72" height="30" rx="3" ry="3" fill="#F4FBF4" stroke="#3E5A3A" stroke-width="0.75"/>` +
      `<ellipse cx="-18" cy="3" rx="7" ry="7" fill="#7CB342" stroke="#445D2B" stroke-width="0.6"/>` +
      `<ellipse cx="0" cy="3" rx="7" ry="7" fill="#9CCC65" stroke="#557C2F" stroke-width="0.6"/>` +
      `<ellipse cx="18" cy="3" rx="7" ry="7" fill="#AED581" stroke="#689F38" stroke-width="0.6"/>` +
      `<rect x="-30" y="-11" width="60" height="5" fill="#DCECCF" stroke="#A5BE8A" stroke-width="0.4"/>`,
    groupBy: 'Buffet / Food Line',
  },
  {
    id: 'food-station-carving',
    type: 'catering',
    category: 'Food',
    name: 'Carving Station',
    defaultDimensions: { width: 60, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-30" y="-15" width="60" height="30" rx="3" ry="3" fill="#FDF5E7" stroke="#8C6239" stroke-width="0.75"/>` +
      `<rect x="-14" y="-6" width="28" height="18" rx="3" ry="3" fill="#E1B07A" stroke="#8C6239" stroke-width="0.7"/>` +
      `<ellipse cx="0" cy="1" rx="10" ry="5.5" fill="#C16A3A" stroke="#7A3C1E" stroke-width="0.6"/>` +
      `<circle cx="-20" cy="-10" r="3.2" fill="#F9D48A" stroke="#C3922D" stroke-width="0.5"/>` +
      `<circle cx="20" cy="-10" r="3.2" fill="#F9D48A" stroke="#C3922D" stroke-width="0.5"/>`,
    groupBy: 'Action / Carving',
  },
  {
    id: 'food-station-chef-action',
    type: 'catering',
    category: 'Food',
    name: 'Chef Action Station',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-36" y="-15" width="72" height="30" rx="3" ry="3" fill="#F3F6FA" stroke="#4B5A6A" stroke-width="0.75"/>` +
      `<rect x="-26" y="-9" width="22" height="18" rx="2" ry="2" fill="#D7E0EB" stroke="#4B5A6A" stroke-width="0.6"/>` +
      `<circle cx="-20" cy="-2" r="4" fill="#9EAFC2" stroke="#4B5A6A" stroke-width="0.5"/>` +
      `<circle cx="-10" cy="-2" r="4" fill="#9EAFC2" stroke="#4B5A6A" stroke-width="0.5"/>` +
      `<rect x="-2" y="-8" width="28" height="10" fill="#FFFFFF" stroke="#C7CED8" stroke-width="0.5"/>` +
      `<rect x="12" y="4" width="14" height="8" rx="2" ry="2" fill="#FDE9C8" stroke="#CF9A42" stroke-width="0.5"/>`,
    groupBy: 'Action / Chef',
  },
  {
    id: 'food-station-seafood-rawbar',
    type: 'catering',
    category: 'Food',
    name: 'Seafood / Raw Bar',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-36" y="-15" width="72" height="30" rx="3" ry="3" fill="#E9F8FF" stroke="#1565C0" stroke-width="0.8"/>` +
      `<rect x="-32" y="-9" width="64" height="18" rx="3" ry="3" fill="#BBDEFB" stroke="#1565C0" stroke-width="0.6"/>` +
      `<ellipse cx="-18" cy="-1" rx="7" ry="4" fill="#FFE0B2" stroke="#FB8C00" stroke-width="0.5"/>` +
      `<ellipse cx="0" cy="-1" rx="7" ry="4" fill="#FFCC80" stroke="#F57C00" stroke-width="0.5"/>` +
      `<ellipse cx="18" cy="-1" rx="7" ry="4" fill="#FFB74D" stroke="#EF6C00" stroke-width="0.5"/>`,
    groupBy: 'Buffet / Food Line',
  },
  {
    id: 'food-station-antipasti-charcuterie',
    type: 'catering',
    category: 'Food',
    name: 'Antipasti / Charcuterie Station',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-36" y="-15" width="72" height="30" rx="3" ry="3" fill="#F7F1E6" stroke="#795548" stroke-width="0.8"/>` +
      `<ellipse cx="-20" cy="2" rx="8" ry="6" fill="#D7CCC8" stroke="#5D4037" stroke-width="0.6"/>` +
      `<ellipse cx="0" cy="4" rx="8" ry="6" fill="#FFE0B2" stroke="#FB8C00" stroke-width="0.6"/>` +
      `<ellipse cx="20" cy="2" rx="8" ry="6" fill="#FFCCBC" stroke="#E64A19" stroke-width="0.6"/>` +
      `<rect x="-30" y="-11" width="60" height="5" fill="#C5E1A5" stroke="#7CB342" stroke-width="0.4"/>`,
    groupBy: 'Antipasti / Charcuterie',
  },
  {
    id: 'food-station-taco',
    type: 'catering',
    category: 'Food',
    name: 'Taco Station',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-36" y="-15" width="72" height="30" rx="3" ry="3" fill="#FFF3E0" stroke="#FF9800" stroke-width="0.8"/>` +
      `<ellipse cx="-18" cy="2" rx="8" ry="5" fill="#FFCC80" stroke="#F57C00" stroke-width="0.5"/>` +
      `<ellipse cx="0" cy="4" rx="8" ry="5" fill="#FFE082" stroke="#FBC02D" stroke-width="0.5"/>` +
      `<ellipse cx="18" cy="2" rx="8" ry="5" fill="#FFB74D" stroke="#FB8C00" stroke-width="0.5"/>` +
      `<rect x="-30" y="-11" width="60" height="5" fill="#FFECB3" stroke="#F9A825" stroke-width="0.4"/>`,
    groupBy: 'Action / Chef',
  },
  {
    id: 'food-station-sliders-late-night',
    type: 'catering',
    category: 'Food',
    name: 'Sliders',
    defaultDimensions: { width: 60, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-30" y="-15" width="60" height="30" rx="3" ry="3" fill="#FFFDE7" stroke="#FBC02D" stroke-width="0.8"/>` +
      `<circle cx="-15" cy="-3" r="5" fill="#FFCC80" stroke="#F57C00" stroke-width="0.5"/>` +
      `<circle cx="0" cy="-3" r="5" fill="#FFCC80" stroke="#F57C00" stroke-width="0.5"/>` +
      `<circle cx="15" cy="-3" r="5" fill="#FFCC80" stroke="#F57C00" stroke-width="0.5"/>` +
      `<rect x="-22" y="3" width="44" height="7" fill="#FFE082" stroke="#FBC02D" stroke-width="0.5"/>`,
    groupBy: 'Late Night Snacks',
  },
  {
    id: 'food-station-breakfast-brunch',
    type: 'catering',
    category: 'Food',
    name: 'Breakfast / Brunch Station',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-36" y="-15" width="72" height="30" rx="3" ry="3" fill="#FFF8E1" stroke="#F9A825" stroke-width="0.8"/>` +
      `<ellipse cx="-20" cy="-2" rx="8" ry="5" fill="#FFE082" stroke="#FBC02D" stroke-width="0.5"/>` +
      `<ellipse cx="0" cy="-2" rx="7" ry="4.5" fill="#FFECB3" stroke="#F9A825" stroke-width="0.5"/>` +
      `<ellipse cx="20" cy="-2" rx="8" ry="5" fill="#FFCDD2" stroke="#E57373" stroke-width="0.5"/>` +
      `<rect x="-30" y="4" width="60" height="6" fill="#FFF3E0" stroke="#FFB74D" stroke-width="0.4"/>`,
    groupBy: 'Breakfast / Brunch',
  },
  {
    id: 'food-station-sushi',
    type: 'catering',
    category: 'Food',
    name: 'Sushi Station',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-36" y="-15" width="72" height="30" rx="3" ry="3" fill="#E3F2FD" stroke="#1E88E5" stroke-width="0.8"/>` +
      `<rect x="-28" y="-7" width="16" height="10" rx="2" ry="2" fill="#FFFFFF" stroke="#90A4AE" stroke-width="0.5"/>` +
      `<rect x="-8" y="-7" width="16" height="10" rx="2" ry="2" fill="#FFFFFF" stroke="#90A4AE" stroke-width="0.5"/>` +
      `<rect x="12" y="-7" width="16" height="10" rx="2" ry="2" fill="#FFFFFF" stroke="#90A4AE" stroke-width="0.5"/>` +
      `<rect x="-28" y="5" width="56" height="5" fill="#BBDEFB" stroke="#1E88E5" stroke-width="0.4"/>`,
    groupBy: 'International / Sushi',
  },
  {
    id: 'food-station-pasta',
    type: 'catering',
    category: 'Food',
    name: 'Pasta Station',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-36" y="-15" width="72" height="30" rx="3" ry="3" fill="#FFF3E0" stroke="#EF6C00" stroke-width="0.8"/>` +
      `<ellipse cx="-18" cy="-2" rx="8" ry="6" fill="#FFCA80" stroke="#F57C00" stroke-width="0.6"/>` +
      `<ellipse cx="0" cy="-2" rx="8" ry="6" fill="#FFE082" stroke="#F9A825" stroke-width="0.6"/>` +
      `<ellipse cx="18" cy="-2" rx="8" ry="6" fill="#FFCC80" stroke="#FB8C00" stroke-width="0.6"/>` +
      `<rect x="-30" y="5" width="60" height="6" fill="#FFE0B2" stroke="#FBC02D" stroke-width="0.5"/>`,
    groupBy: 'Pasta / Italian',
  },
  {
    id: 'food-station-pasta-build-your-own',
    type: 'catering',
    category: 'Food',
    name: 'Build-Your-Own Pasta Bar',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-36" y="-15" width="72" height="30" rx="3" ry="3" fill="#FFF8E1" stroke="#F9A825" stroke-width="0.8"/>` +
      `<rect x="-34" y="-9" width="14" height="10" rx="2" ry="2" fill="#FFCC80" stroke="#FB8C00" stroke-width="0.5"/>` +
      `<rect x="-16" y="-9" width="14" height="10" rx="2" ry="2" fill="#FFAB91" stroke="#E64A19" stroke-width="0.5"/>` +
      `<rect x="2" y="-9" width="14" height="10" rx="2" ry="2" fill="#FFE082" stroke="#FBC02D" stroke-width="0.5"/>` +
      `<rect x="20" y="-9" width="14" height="10" rx="2" ry="2" fill="#C5E1A5" stroke="#7CB342" stroke-width="0.5"/>` +
      `<ellipse cx="-18" cy="7" rx="6" ry="4" fill="#FFF3E0" stroke="#FBC02D" stroke-width="0.5"/>` +
      `<ellipse cx="0" cy="7" rx="6" ry="4" fill="#FFF3E0" stroke="#FBC02D" stroke-width="0.5"/>` +
      `<ellipse cx="18" cy="7" rx="6" ry="4" fill="#FFF3E0" stroke="#FBC02D" stroke-width="0.5"/>`,
    groupBy: 'Pasta / Italian',
  },
  {
    id: 'food-station-flatbread-pizza',
    type: 'catering',
    category: 'Food',
    name: 'Flatbread / Pizza Station',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-36" y="-15" width="72" height="30" rx="3" ry="3" fill="#FFE0B2" stroke="#E64A19" stroke-width="0.8"/>` +
      `<circle cx="-16" cy="-2" r="9" fill="#FFB74D" stroke="#D84315" stroke-width="0.7"/>` +
      `<line x1="-16" y1="-11" x2="-16" y2="7" stroke="#FBE9E7" stroke-width="1"/>` +
      `<line x1="-25" y1="-2" x2="-7" y2="-2" stroke="#FBE9E7" stroke-width="1"/>` +
      `<rect x="6" y="-6" width="18" height="12" rx="3" ry="3" fill="#FFCC80" stroke="#BF360C" stroke-width="0.6"/>` +
      `<circle cx="10" cy="-2" r="1.5" fill="#D32F2F"/>` +
      `<circle cx="16" cy="-1" r="1.5" fill="#D32F2F"/>` +
      `<circle cx="20" cy="-3" r="1.5" fill="#D32F2F"/>`,
    groupBy: 'Pizza / Flatbread',
  },
  {
    id: 'food-station-mac-cheese-bar',
    type: 'catering',
    category: 'Food',
    name: 'Mac & Cheese Bar',
    defaultDimensions: { width: 60, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-30" y="-15" width="60" height="30" rx="3" ry="3" fill="#FFF9C4" stroke="#FBC02D" stroke-width="0.8"/>` +
      `<rect x="-24" y="-8" width="14" height="10" rx="2" ry="2" fill="#FFEB3B" stroke="#F9A825" stroke-width="0.5"/>` +
      `<rect x="-6" y="-8" width="14" height="10" rx="2" ry="2" fill="#FDD835" stroke="#F57F17" stroke-width="0.5"/>` +
      `<rect x="14" y="-8" width="10" height="10" rx="2" ry="2" fill="#FFE082" stroke="#FFA000" stroke-width="0.5"/>` +
      `<rect x="-24" y="4" width="48" height="6" fill="#FFF59D" stroke="#FBC02D" stroke-width="0.4"/>`,
    groupBy: 'Comfort Food',
  },
  {
    id: 'food-station-burger-fries',
    type: 'catering',
    category: 'Food',
    name: 'Burger & Fries Station',
    defaultDimensions: { width: 60, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-30" y="-15" width="60" height="30" rx="3" ry="3" fill="#FFF3E0" stroke="#F57C00" stroke-width="0.8"/>` +
      `<circle cx="-15" cy="-4" r="5" fill="#FFCC80" stroke="#6D4C41" stroke-width="0.6"/>` +
      `<circle cx="0" cy="-4" r="5" fill="#FFCC80" stroke="#6D4C41" stroke-width="0.6"/>` +
      `<rect x="10" y="-7" width="14" height="10" rx="2" ry="2" fill="#FFE082" stroke="#F9A825" stroke-width="0.6"/>` +
      `<line x1="12" y1="-6" x2="12" y2="2" stroke="#FBC02D" stroke-width="1"/>` +
      `<line x1="16" y1="-6" x2="16" y2="2" stroke="#FBC02D" stroke-width="1"/>` +
      `<line x1="20" y1="-6" x2="20" y2="2" stroke="#FBC02D" stroke-width="1"/>`,
    groupBy: 'Burgers & Sandwiches',
  },
  {
    id: 'food-station-sandwich-panini',
    type: 'catering',
    category: 'Food',
    name: 'Sandwich / Panini Station',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-36" y="-15" width="72" height="30" rx="3" ry="3" fill="#FFF8E1" stroke="#A1887F" stroke-width="0.8"/>` +
      `<rect x="-28" y="-8" width="16" height="9" rx="3" ry="3" fill="#FFECB3" stroke="#8D6E63" stroke-width="0.5"/>` +
      `<rect x="-6" y="-8" width="16" height="9" rx="3" ry="3" fill="#FFE0B2" stroke="#8D6E63" stroke-width="0.5"/>` +
      `<rect x="16" y="-8" width="16" height="9" rx="3" ry="3" fill="#FFCC80" stroke="#8D6E63" stroke-width="0.5"/>` +
      `<rect x="-26" y="4" width="52" height="6" fill="#FFF3E0" stroke="#A1887F" stroke-width="0.4"/>`,
    groupBy: 'Burgers & Sandwiches',
  },
  {
    id: 'food-station-asian-noodle-bar',
    type: 'catering',
    category: 'Food',
    name: 'Asian Noodle Bar',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-36" y="-15" width="72" height="30" rx="3" ry="3" fill="#E3F2FD" stroke="#1E88E5" stroke-width="0.8"/>` +
      `<ellipse cx="-18" cy="-1" rx="7" ry="5" fill="#FFF8E1" stroke="#FBC02D" stroke-width="0.5"/>` +
      `<ellipse cx="0" cy="-1" rx="7" ry="5" fill="#FFF8E1" stroke="#FBC02D" stroke-width="0.5"/>` +
      `<ellipse cx="18" cy="-1" rx="7" ry="5" fill="#FFF8E1" stroke="#FBC02D" stroke-width="0.5"/>` +
      `<line x1="-22" y1="-6" x2="-14" y2="-2" stroke="#8D6E63" stroke-width="1"/>` +
      `<line x1="-22" y1="-4" x2="-14" y2="0" stroke="#8D6E63" stroke-width="1"/>` +
      `<rect x="-30" y="-11" width="60" height="4" fill="#BBDEFB" stroke="#1E88E5" stroke-width="0.4"/>`,
    groupBy: 'Asian',
  },
  {
    id: 'food-station-middle-eastern-grill',
    type: 'catering',
    category: 'Food',
    name: 'Middle Eastern Grill Station',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-36" y="-15" width="72" height="30" rx="3" ry="3" fill="#FBE9E7" stroke="#6D4C41" stroke-width="0.8"/>` +
      `<rect x="-30" y="-8" width="34" height="14" fill="#D7CCC8" stroke="#5D4037" stroke-width="0.6"/>` +
      `<line x1="-28" y1="-6" x2="2" y2="-6" stroke="#5D4037" stroke-width="0.6"/>` +
      `<line x1="-28" y1="-2" x2="2" y2="-2" stroke="#5D4037" stroke-width="0.6"/>` +
      `<line x1="-28" y1="2" x2="2" y2="2" stroke="#5D4037" stroke-width="0.6"/>` +
      `<rect x="6" y="-6" width="24" height="4" fill="#FFCC80" stroke="#EF6C00" stroke-width="0.6"/>` +
      `<rect x="6" y="2" width="24" height="4" fill="#FFB74D" stroke="#E64A19" stroke-width="0.6"/>`,
    groupBy: 'Middle Eastern',
  },
  {
    id: 'food-station-glutenfree',
    type: 'catering',
    category: 'Food',
    name: 'Gluten-Free',
    defaultDimensions: { width: 60, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-30" y="-15" width="60" height="30" rx="3" ry="3" fill="#E8F5E9" stroke="#43A047" stroke-width="0.8"/>` +
      `<rect x="-26" y="-10" width="14" height="10" rx="3" ry="3" fill="#C8E6C9" stroke="#388E3C" stroke-width="0.5"/>` +
      `<rect x="-7" y="-10" width="14" height="10" rx="3" ry="3" fill="#DCEDC8" stroke="#7CB342" stroke-width="0.5"/>` +
      `<rect x="12" y="-10" width="14" height="10" rx="3" ry="3" fill="#F1F8E9" stroke="#689F38" stroke-width="0.5"/>` +
      `<circle cx="0" cy="7" r="4" fill="#FFFFFF" stroke="#43A047" stroke-width="0.7"/>`,
    groupBy: 'Dietary / Allergen-Friendly',
  },
  {
    id: 'food-station-halal-buffet',
    type: 'catering',
    category: 'Food',
    name: 'Halal Buffet Station',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-36" y="-15" width="72" height="30" rx="3" ry="3" fill="#E8F5E9" stroke="#2E7D32" stroke-width="0.9"/>` +
      `<rect x="-30" y="-9" width="16" height="10" rx="2" ry="2" fill="#A5D6A7" stroke="#2E7D32" stroke-width="0.5"/>` +
      `<rect x="-8" y="-9" width="16" height="10" rx="2" ry="2" fill="#C8E6C9" stroke="#43A047" stroke-width="0.5"/>` +
      `<rect x="14" y="-9" width="16" height="10" rx="2" ry="2" fill="#DCEDC8" stroke="#558B2F" stroke-width="0.5"/>` +
      `<circle cx="0" cy="7" r="4" fill="#FFFFFF" stroke="#2E7D32" stroke-width="0.7"/>`,
    groupBy: 'Dietary / Halal',
  },
  {
    id: 'food-station-kosher-buffet',
    type: 'catering',
    category: 'Food',
    name: 'Kosher Buffet Station',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-36" y="-15" width="72" height="30" rx="3" ry="3" fill="#E3F2FD" stroke="#1565C0" stroke-width="0.9"/>` +
      `<rect x="-30" y="-9" width="16" height="10" rx="2" ry="2" fill="#BBDEFB" stroke="#1565C0" stroke-width="0.5"/>` +
      `<rect x="-8" y="-9" width="16" height="10" rx="2" ry="2" fill="#C5CAE9" stroke="#3949AB" stroke-width="0.5"/>` +
      `<rect x="14" y="-9" width="16" height="10" rx="2" ry="2" fill="#E8EAF6" stroke="#283593" stroke-width="0.5"/>` +
      `<circle cx="0" cy="7" r="4" fill="#FFFFFF" stroke="#1565C0" stroke-width="0.7"/>`,
    groupBy: 'Dietary / Kosher',
  },
  // Food Station End

  // Dessert
  {
    id: 'food-station-dessert',
    type: 'catering',
    category: 'Dessert',
    name: 'Dessert Station',
    defaultDimensions: { width: 60, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-30" y="-15" width="60" height="30" rx="3" ry="3" fill="#FFF7FB" stroke="#A06D8F" stroke-width="0.75"/>` +
      `<rect x="-28" y="-10" width="16" height="8" rx="2" ry="2" fill="#F8C6D8" stroke="#C27A96" stroke-width="0.5"/>` +
      `<rect x="-8" y="-10" width="16" height="8" rx="2" ry="2" fill="#FBE0A3" stroke="#D29B45" stroke-width="0.5"/>` +
      `<rect x="12" y="-10" width="16" height="8" rx="2" ry="2" fill="#F9D6B7" stroke="#D18A5A" stroke-width="0.5"/>` +
      `<circle cx="0" cy="6" r="6" fill="#FFFFFF" stroke="#CFA1B9" stroke-width="0.6"/>`,
    groupBy: 'Desserts',
  },
  {
    id: 'dessert-station-candy-bar',
    type: 'catering',
    category: 'Dessert',
    name: 'Candy Bar / Sweet Table',
    defaultDimensions: { width: 60, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-30" y="-15" width="60" height="30" rx="3" ry="3" fill="#FFF0F7" stroke="#D81B60" stroke-width="0.8"/>` +
      `<circle cx="-15" cy="-3" r="5" fill="#F48FB1" stroke="#AD1457" stroke-width="0.5"/>` +
      `<circle cx="0" cy="-3" r="5" fill="#FFCDD2" stroke="#E57373" stroke-width="0.5"/>` +
      `<circle cx="15" cy="-3" r="5" fill="#CE93D8" stroke="#8E24AA" stroke-width="0.5"/>` +
      `<rect x="-22" y="4" width="44" height="6" rx="2" ry="2" fill="#FCE4EC" stroke="#EC407A" stroke-width="0.5"/>`,
    groupBy: 'Desserts',
  },
  {
    id: 'dessert-station-smores',
    type: 'catering',
    category: 'Dessert',
    name: 'S’Mores Station',
    defaultDimensions: { width: 60, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-30" y="-15" width="60" height="30" rx="3" ry="3" fill="#FBE9E7" stroke="#6D4C41" stroke-width="0.8"/>` +
      `<rect x="-22" y="-6" width="12" height="8" fill="#FFCCBC" stroke="#8D6E63" stroke-width="0.5"/>` +
      `<rect x="-6" y="-6" width="12" height="8" fill="#D7CCC8" stroke="#5D4037" stroke-width="0.5"/>` +
      `<rect x="10" y="-6" width="12" height="8" fill="#FFAB91" stroke="#8D6E63" stroke-width="0.5"/>` +
      `<rect x="-22" y="5" width="44" height="6" fill="#FFCCBC" stroke="#6D4C41" stroke-width="0.5"/>`,
    groupBy: 'Desserts',
  },
  {
    id: 'dessert-station-holy-cannoli-cart',
    type: 'catering',
    category: 'Dessert',
    name: '“Holy Cannoli” Cart',
    defaultDimensions: { width: 48, height: 24, unit: 'in' },
    svgPath:
      `<rect x="-24" y="-12" width="48" height="24" rx="4" ry="4" fill="#FFF8E1" stroke="#8D6E63" stroke-width="0.9"/>` +
      `<ellipse cx="-9" cy="-1" rx="7" ry="4" fill="#FFE0B2" stroke="#A1887F" stroke-width="0.5"/>` +
      `<ellipse cx="9" cy="-1" rx="7" ry="4" fill="#FFCC80" stroke="#A1887F" stroke-width="0.5"/>` +
      `<circle cx="-16" cy="12" r="3" fill="#5D4037"/>` +
      `<circle cx="16" cy="12" r="3" fill="#5D4037"/>`,
    groupBy: 'Specialty Dessert Cart',
  },
  {
    id: 'cart-gelato-icecream',
    type: 'catering',
    category: 'Dessert',
    name: 'Gelato / Ice Cream Cart',
    defaultDimensions: { width: 48, height: 24, unit: 'in' },
    svgPath:
      `<rect x="-24" y="-12" width="48" height="24" rx="4" ry="4" fill="#E3F2FD" stroke="#1E88E5" stroke-width="0.9"/>` +
      `<rect x="-16" y="-6" width="12" height="10" rx="2" ry="2" fill="#FFFFFF" stroke="#90CAF9" stroke-width="0.5"/>` +
      `<rect x="4" y="-6" width="12" height="10" rx="2" ry="2" fill="#FFFFFF" stroke="#90CAF9" stroke-width="0.5"/>` +
      `<circle cx="-16" cy="12" r="3" fill="#1565C0"/>` +
      `<circle cx="16" cy="12" r="3" fill="#1565C0"/>`,
    groupBy: 'Specialty Dessert Cart',
  },
  {
    id: 'cart-mini-donut',
    type: 'catering',
    category: 'Dessert',
    name: 'Mini Donut Cart',
    defaultDimensions: { width: 48, height: 24, unit: 'in' },
    svgPath:
      `<rect x="-24" y="-12" width="48" height="24" rx="4" ry="4" fill="#FFF3E0" stroke="#F57C00" stroke-width="0.9"/>` +
      `<circle cx="-12" cy="-2" r="4" fill="#FFCC80" stroke="#EF6C00" stroke-width="0.6"/>` +
      `<circle cx="0" cy="-2" r="4" fill="#FFE0B2" stroke="#EF6C00" stroke-width="0.6"/>` +
      `<circle cx="12" cy="-2" r="4" fill="#FFB74D" stroke="#EF6C00" stroke-width="0.6"/>` +
      `<circle cx="-16" cy="12" r="3" fill="#5D4037"/>` +
      `<circle cx="16" cy="12" r="3" fill="#5D4037"/>`,
    groupBy: 'Dessert Cart',
  },
  {
    id: 'dessert-station-waffle',
    type: 'catering',
    category: 'Dessert',
    name: 'Waffle Station',
    defaultDimensions: { width: 60, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-30" y="-15" width="60" height="30" rx="3" ry="3" fill="#FFF8E1" stroke="#F9A825" stroke-width="0.8"/>` +
      // waffle grid
      `<rect x="-14" y="-8" width="28" height="16" rx="3" ry="3" fill="#FFCC80" stroke="#F57C00" stroke-width="0.6"/>` +
      `<line x1="-10" y1="-8" x2="-10" y2="8" stroke="#F9A825" stroke-width="0.6"/>` +
      `<line x1="-2" y1="-8" x2="-2" y2="8" stroke="#F9A825" stroke-width="0.6"/>` +
      `<line x1="6" y1="-8" x2="6" y2="8" stroke="#F9A825" stroke-width="0.6"/>` +
      `<line x1="-14" y1="-4" x2="14" y2="-4" stroke="#F9A825" stroke-width="0.6"/>` +
      `<line x1="-14" y1="0" x2="14" y2="0" stroke="#F9A825" stroke-width="0.6"/>` +
      `<line x1="-14" y1="4" x2="14" y2="4" stroke="#F9A825" stroke-width="0.6"/>`,
    groupBy: 'Desserts',
  },
  {
    id: 'dessert-station-chocolate-fountain',
    type: 'catering',
    category: 'Dessert',
    name: 'Chocolate Fountain Station',
    defaultDimensions: { width: 60, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-30" y="-15" width="60" height="30" rx="3" ry="3" fill="#FBE9E7" stroke="#5D4037" stroke-width="0.8"/>` +
      `<circle cx="0" cy="-3" r="8" fill="#6D4C41" stroke="#3E2723" stroke-width="0.7"/>` +
      `<circle cx="0" cy="-3" r="5" fill="#8D6E63" stroke="#3E2723" stroke-width="0.6"/>` +
      `<circle cx="0" cy="-3" r="2.5" fill="#5D4037" stroke="#3E2723" stroke-width="0.5"/>` +
      `<rect x="-22" y="5" width="44" height="6" rx="2" ry="2" fill="#FFE0B2" stroke="#6D4C41" stroke-width="0.5"/>`,
    groupBy: 'Desserts',
  },
  {
    id: 'dessert-station-seasonal-fruit',
    type: 'catering',
    category: 'Dessert',
    name: 'Seasonal Fruit & Berries Station',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-36" y="-15" width="72" height="30" rx="3" ry="3" fill="#E8F5E9" stroke="#388E3C" stroke-width="0.8"/>` +
      `<ellipse cx="-14" cy="-1" rx="11" ry="7" fill="#C5E1A5" stroke="#558B2F" stroke-width="0.6"/>` +
      `<circle cx="-18" cy="-2" r="2.2" fill="#C62828"/>` +
      `<circle cx="-10" cy="0" r="2.2" fill="#8E24AA"/>` +
      `<circle cx="-14" cy="3" r="2.2" fill="#FDD835"/>` +
      `<rect x="6" y="-6" width="22" height="12" rx="3" ry="3" fill="#FFF59D" stroke="#FBC02D" stroke-width="0.6"/>`,
    groupBy: 'Fruit / Healthy Desserts',
  },
  // Dessert

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
    id: 'tea-station',
    type: 'catering',
    category: 'Beverage',
    name: 'Tea Station',
    defaultDimensions: { width: 60, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-30" y="-15" width="60" height="30" rx="3" ry="3" fill="#F7F2EC" stroke="#6D4C41" stroke-width="0.75"/>` +
      `<circle cx="-10" cy="-4" r="5" fill="#BCAAA4" stroke="#5D4037" stroke-width="0.6"/>` +
      `<circle cx="10" cy="-4" r="5" fill="#BCAAA4" stroke="#5D4037" stroke-width="0.6"/>` +
      `<rect x="-20" y="3" width="40" height="6" rx="2" ry="2" fill="#FFFFFF" stroke="#D7CCC8" stroke-width="0.5"/>`,
    groupBy: 'Beverage',
  },
  {
    id: 'beverage-soft-station',
    type: 'catering',
    category: 'Beverage',
    name: 'Soft Drinks & Water',
    defaultDimensions: { width: 60, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-30" y="-15" width="60" height="30" rx="3" ry="3" fill="#E9F6FF" stroke="#3B647F" stroke-width="0.75"/>` +
      `<rect x="-22" y="-10" width="10" height="10" rx="2" ry="2" fill="#C5E4FF" stroke="#3B647F" stroke-width="0.55"/>` +
      `<rect x="-5" y="-10" width="10" height="10" rx="2" ry="2" fill="#D1F0FF" stroke="#3B647F" stroke-width="0.55"/>` +
      `<rect x="12" y="-10" width="10" height="10" rx="2" ry="2" fill="#B3E5FC" stroke="#3B647F" stroke-width="0.55"/>` +
      `<rect x="-22" y="4" width="44" height="6" rx="2" ry="2" fill="#FFFFFF" stroke="#B0BEC5" stroke-width="0.5"/>`,
    groupBy: 'Beverage',
  },
  {
    id: 'cart-hot-cocoa',
    type: 'catering',
    category: 'Beverage',
    name: 'Hot Cocoa Cart',
    defaultDimensions: { width: 48, height: 24, unit: 'in' },
    svgPath:
      `<rect x="-24" y="-12" width="48" height="24" rx="4" ry="4" fill="#EFE6DC" stroke="#5D4037" stroke-width="0.9"/>` +
      `<rect x="-14" y="-6" width="10" height="10" rx="2" ry="2" fill="#8D6E63" stroke="#4E342E" stroke-width="0.5"/>` +
      `<rect x="4" y="-6" width="10" height="10" rx="2" ry="2" fill="#8D6E63" stroke="#4E342E" stroke-width="0.5"/>` +
      `<circle cx="-14" cy="12" r="3" fill="#4E342E"/>` +
      `<circle cx="14" cy="12" r="3" fill="#4E342E"/>`,
    groupBy: 'Specialty Beverage Cart',
  },
  {
    id: 'beverage-station-fresh-juice-smoothie',
    type: 'catering',
    category: 'Beverage',
    name: 'Fresh Juice & Smoothie Bar',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-36" y="-15" width="72" height="30" rx="3" ry="3" fill="#E1F5FE" stroke="#0288D1" stroke-width="0.8"/>` +
      `<rect x="-24" y="-10" width="10" height="14" rx="2" ry="2" fill="#FF8A65" stroke="#D84315" stroke-width="0.5"/>` +
      `<rect x="-6" y="-10" width="10" height="14" rx="2" ry="2" fill="#FFCA28" stroke="#F9A825" stroke-width="0.5"/>` +
      `<rect x="12" y="-10" width="10" height="14" rx="2" ry="2" fill="#AED581" stroke="#689F38" stroke-width="0.5"/>` +
      `<rect x="-26" y="5" width="52" height="6" rx="2" ry="2" fill="#FFFFFF" stroke="#B0BEC5" stroke-width="0.5"/>`,
    groupBy: 'Juice / Smoothie Bar',
  },
  {
    id: 'beverage-station-mocktail-bar',
    type: 'catering',
    category: 'Beverage',
    name: 'Mocktail Bar (Non-Alcoholic)',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      `<rect x="-36" y="-15" width="72" height="30" rx="3" ry="3" fill="#F3E5F5" stroke="#8E24AA" stroke-width="0.8"/>` +
      `<circle cx="-18" cy="-2" r="6" fill="#FFCDD2" stroke="#C62828" stroke-width="0.6"/>` +
      `<circle cx="0" cy="-2" r="6" fill="#FFECB3" stroke="#F9A825" stroke-width="0.6"/>` +
      `<circle cx="18" cy="-2" r="6" fill="#B3E5FC" stroke="#0288D1" stroke-width="0.6"/>` +
      `<path d="M-18,-8 L-13,-6 L-16,-1 Z" fill="#FDD835"/>` +
      `<path d="M0,-8 L5,-6 L2,-1 Z" fill="#FFB74D"/>` +
      `<path d="M18,-8 L23,-6 L20,-1 Z" fill="#81D4FA"/>`,
    groupBy: 'Mocktail Bar',
  },
  // Beverage End

  // Bar Start
  {
    id: 'bar-straight-1',
    type: 'furniture',
    category: 'Bars',
    name: 'Straight Bar (6ft)',
    defaultDimensions: { width: 72, height: 24, unit: 'in' },
    svgPath: `
    <rect x="-36" y="-12" width="72" height="24" fill="#4B77BE" />
    <text x="0" y="5" text-anchor="middle" fill="#FFF" font-size="10">BAR</text>
  `,
    groupBy: "6' Bar",
  },
  {
    id: 'bar-straight-2',
    type: 'furniture',
    category: 'Bars',
    name: 'Straight Bar (12ft)',
    defaultDimensions: { width: 144, height: 24, unit: 'in' },
    svgPath: `<rect x="-72" y="-12" width="144" height="24" fill="#00A79D" />
              <text x="0" y="5" text-anchor="middle" fill="#FFF" font-size="10">BAR</text>`,
    groupBy: "12' Bar",
  },
  {
    id: 'bar-straight-3',
    type: 'furniture',
    category: 'Bars',
    name: 'Straight Bar (18ft)',
    defaultDimensions: { width: 216, height: 24, unit: 'in' },
    svgPath: `<rect x="-108" y="-12" width="216" height="24" fill="#9E1F63" />
              <text x="0" y="5" text-anchor="middle" fill="#FFF" font-size="10">BAR</text>`,
    groupBy: "18' Bar",
  },
  {
    id: 'bar-straight-4',
    type: 'furniture',
    category: 'Bars',
    name: 'Straight Bar (24ft)',
    defaultDimensions: { width: 288, height: 24, unit: 'in' },
    svgPath: `<rect x="-144" y="-12" width="288" height="24" fill="#E67E22" />
              <text x="0" y="5" text-anchor="middle" fill="#FFF" font-size="10">BAR</text>`,
    groupBy: "24' Bar",
  },
  // Bar End

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
  {
    id: 'waste-recycling-bins',
    type: 'catering',
    category: 'Service',
    name: 'Waste & Recycling Bins',
    defaultDimensions: { width: 36, height: 18, unit: 'in' },
    svgPath:
      "<rect x='-18' y='-9' width='16' height='18' rx='2' ry='2' fill='#4A4A4A' stroke='#222222' stroke-width='1.2'/>" +
      "<rect x='2' y='-9' width='16' height='18' rx='2' ry='2' fill='#1E88E5' stroke='#0B3A6F' stroke-width='1.2'/>" +
      "<circle cx='-10' cy='0' r='4' fill='#F5F5F5' stroke='none'/>" +
      "<circle cx='10' cy='0' r='4' fill='#F5F5F5' stroke='none'/>",
  },
  {
    id: 'rolling-cart',
    type: 'catering',
    category: 'Service',
    name: 'Rolling Cart',
    defaultDimensions: { width: 36, height: 24, unit: 'in' },
    svgPath:
      "<rect x='-18' y='-12' width='36' height='24' fill='#E0E0E0' stroke='#666666' stroke-width='1.5'/>" +
      "<rect x='12' y='-16' width='8' height='8' fill='#C0C0C0' stroke='#555555' stroke-width='1'/>" +
      "<circle cx='-14' cy='12' r='3' fill='#444444'/>" +
      "<circle cx='14' cy='12' r='3' fill='#444444'/>",
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
