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
    id: 'chair-standard-2',
    type: 'furniture',
    category: 'Seating',
    name: 'Standard Chair 2',
    defaultDimensions: { width: 18, height: 18, unit: 'in' },

    svgPath: `
    <rect x="-9" y="-9" width="18" height="18" rx="2" ry="2"
          fill="#2BACE2" stroke="#000" stroke-width="0.6" />
    <rect x="-7" y="-13" width="14" height="3"
          fill="#2BACE2" stroke="#000" stroke-width="0.5" rx="1" />
    <line x1="-7" y1="9" x2="-7" y2="12" stroke="#000" stroke-width="0.7"/>
    <line x1="7" y1="9" x2="7" y2="12" stroke="#000" stroke-width="0.7"/>
    <line x1="-7" y1="-9" x2="-7" y2="-11" stroke="#000" stroke-width="0.7"/>
    <line x1="7" y1="-9" x2="7" y2="-11" stroke="#000" stroke-width="0.7"/>
  `,

    groupBy: 'Seating',
  },
  {
    id: 'chair-arm',
    type: 'furniture',
    category: 'Seating',
    name: 'Arm Chair',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },
    svgPath: `
    <rect x="-12" y="-12" width="24" height="24" rx="3" ry="3"
          fill="#2BACE2" stroke="#000" stroke-width="0.7" />
    <rect x="-10" y="-16" width="20" height="4"
          fill="#2BACE2" stroke="#000" stroke-width="0.6" rx="1" />
    <rect x="-15" y="-8" width="3" height="16"
          fill="#2BACE2" stroke="#000" stroke-width="0.6" rx="1" />
    <rect x="12" y="-8" width="3" height="16"
          fill="#2BACE2" stroke="#000" stroke-width="0.6" rx="1" />
    <line x1="-10" y1="12" x2="-10" y2="15" stroke="#000" stroke-width="0.8"/>
    <line x1="10" y1="12" x2="10" y2="15" stroke="#000" stroke-width="0.8"/>
    <line x1="-10" y1="-12" x2="-10" y2="-14" stroke="#000" stroke-width="0.8"/>
    <line x1="10" y1="-12" x2="10" y2="-14" stroke="#000" stroke-width="0.8"/>
  `,
    groupBy: 'Seating',
  },
  {
    id: 'sofa-2seat',
    type: 'furniture',
    category: 'Seating',
    name: '2-Seat Sofa',
    defaultDimensions: { width: 60, height: 36, unit: 'in' },
    svgPath: `
    <rect x="-30" y="-18" width="60" height="36" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    <rect x="-28" y="-20" width="56" height="3" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    <line x1="0" y1="-18" x2="0" y2="18" stroke="#000" stroke-width="0.5"/>
  `,
    groupBy: 'Seating',
  },
  {
    id: 'sofa-3seat',
    type: 'furniture',
    category: 'Seating',
    name: '3-Seat Sofa',
    defaultDimensions: { width: 84, height: 36, unit: 'in' },
    svgPath: `
    <rect x="-42" y="-18" width="84" height="36" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    <rect x="-40" y="-20" width="80" height="3" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    <line x1="-16" y1="-18" x2="-16" y2="18" stroke="#000" stroke-width="0.5"/>
    <line x1="16" y1="-18" x2="16" y2="18" stroke="#000" stroke-width="0.5"/>
  `,
    groupBy: 'Seating',
  },
  {
    id: 'bench',
    type: 'furniture',
    category: 'Seating',
    name: 'Bench',
    defaultDimensions: { width: 48, height: 18, unit: 'in' },
    svgPath: `<rect x="-24" y="-9" width="48" height="18" fill="#2BACE2"/>`,
    groupBy: 'Seating',
  },
  {
    id: 'ottoman',
    type: 'furniture',
    category: 'Seating',
    name: 'Ottoman',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },
    svgPath: `<circle cx="0" cy="0" r="12" fill="#2BACE2"/>`,
    groupBy: 'Seating',
  },
  // Seating End

  // Tables Start
  // Highboys table
  {
    id: 'hight-boys-1',
    type: 'furniture',
    category: 'Tables',
    name: 'High Boys',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },

    svgPath: `
    <!-- 24-inch diameter → r = 12 -->
    <circle cx="0" cy="0" r="12" fill="#1a1a1a" stroke="#000" stroke-width="0.5"/>
  `,

    groupBy: 'Black Highboys',
  },
  {
    id: 'hight-boys-2',
    type: 'furniture',
    category: 'Tables',
    name: 'High Boys',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },

    svgPath: `
    <!-- Correct 24-inch table top -->
    <circle cx="0" cy="0" r="12" fill="#1a1a1a" stroke="#000" stroke-width="0.5"/>

    <!-- 4 stools positioned properly -->
    <circle cx="0" cy="-16" r="3.5" fill="#333333" stroke="#000" stroke-width="0.3"/>
    <circle cx="16" cy="0" r="3.5" fill="#333333" stroke="#000" stroke-width="0.3"/>
    <circle cx="0" cy="16" r="3.5" fill="#333333" stroke="#000" stroke-width="0.3"/>
    <circle cx="-16" cy="0" r="3.5" fill="#333333" stroke="#000" stroke-width="0.3"/>
  `,

    groupBy: 'Black Highboys',
  },
  // Highboys table

  // 36 inch table
  {
    id: 'table-round-36',
    type: 'furniture',
    category: 'Tables',
    name: 'Round Table 36"',
    defaultDimensions: { width: 36, height: 36, unit: 'in' },

    svgPath: `
    <!-- 36" round table -->
    <circle cx="0" cy="0" r="18" fill="#2BACE2" stroke="#000" stroke-width="1"/>
    <circle cx="0" cy="0" r="16" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2"/>
  `,

    groupBy: '36" Round Tables',
  },
  {
    id: 'table-round-4',
    type: 'furniture',
    category: 'Tables',
    name: 'Round Table 4 Seat',
    defaultDimensions: { width: 36, height: 36, unit: 'in' },

    svgPath: `
    <!-- 36" round table -->
    <circle cx="0" cy="0" r="18" fill="#2BACE2" stroke="#000" stroke-width="1"/>
    <circle cx="0" cy="0" r="16" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2"/>

    <!-- Chair (18"x18") placed outside table with ~3" gap -->
    <rect x="-9" y="-39" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    <rect x="-7" y="-41" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>

    <g transform="rotate(90)">
      <rect x="-9" y="-39" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-41" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(180)">
      <rect x="-9" y="-39" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-41" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(270)">
      <rect x="-9" y="-39" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-41" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>
  `,

    groupBy: '36" Round Tables',
  },
  {
    id: 'table-round-5',
    type: 'furniture',
    category: 'Tables',
    name: 'Round Table 5 Seat',
    defaultDimensions: { width: 36, height: 36, unit: 'in' },

    svgPath: `
    <!-- 36" round table -->
    <circle cx="0" cy="0" r="18" fill="#2BACE2" stroke="#000" stroke-width="1"/>
    <circle cx="0" cy="0" r="16" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2"/>

    <!-- Chair (18"x18") outside table with ~3" gap -->
    <rect x="-9" y="-39" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    <rect x="-7" y="-41" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>

    <g transform="rotate(72)">
      <rect x="-9" y="-39" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-41" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(144)">
      <rect x="-9" y="-39" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-41" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(216)">
      <rect x="-9" y="-39" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-41" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(288)">
      <rect x="-9" y="-39" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-41" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>
  `,

    groupBy: '36" Round Tables',
  },
  // 36 inch table

  // 54 inch table
  {
    id: 'table-round-8',
    type: 'furniture',
    category: 'Tables',
    name: 'Round Table 8 Seat',
    defaultDimensions: { width: 54, height: 54, unit: 'in' },

    svgPath: `
    <!-- 54" round table -->
    <circle cx="0" cy="0" r="27" fill="#2BACE2" stroke="#000" stroke-width="1"/>
    <circle cx="0" cy="0" r="25" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2"/>

    <!-- Chair (18"x18") outside table with ~3" gap -->
    <rect x="-9" y="-48" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    <rect x="-7" y="-50" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>

    <g transform="rotate(45)">
      <rect x="-9" y="-48" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-50" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(90)">
      <rect x="-9" y="-48" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-50" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(135)">
      <rect x="-9" y="-48" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-50" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(180)">
      <rect x="-9" y="-48" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-50" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(225)">
      <rect x="-9" y="-48" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-50" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(270)">
      <rect x="-9" y="-48" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-50" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(315)">
      <rect x="-9" y="-48" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-50" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>
  `,

    groupBy: '54" Round Tables',
  },
  {
    id: 'table-round-10',
    type: 'furniture',
    category: 'Tables',
    name: 'Round Table 10 Seat',
    defaultDimensions: { width: 54, height: 54, unit: 'in' },

    svgPath: `
    <!-- 54" round table -->
    <circle cx="0" cy="0" r="27" fill="#2BACE2" stroke="#000" stroke-width="1"/>
    <circle cx="0" cy="0" r="25" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2"/>

    <!-- Chair (18"x18") outside table with ~3" gap -->
    <rect x="-9" y="-48" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    <rect x="-7" y="-50" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>

    <g transform="rotate(36)">
      <rect x="-9" y="-48" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-50" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(72)">
      <rect x="-9" y="-48" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-50" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(108)">
      <rect x="-9" y="-48" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-50" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(144)">
      <rect x="-9" y="-48" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-50" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(180)">
      <rect x="-9" y="-48" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-50" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(216)">
      <rect x="-9" y="-48" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-50" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(252)">
      <rect x="-9" y="-48" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-50" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(288)">
      <rect x="-9" y="-48" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-50" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(324)">
      <rect x="-9" y="-48" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-50" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>
  `,

    groupBy: '54" Round Tables',
  },
  // 54 inch table

  // 60 inch table
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
    id: 'table-round-8-60',
    type: 'furniture',
    category: 'Tables',
    name: 'Round Table 8 Seat 60"',
    defaultDimensions: { width: 60, height: 60, unit: 'in' },

    svgPath: `
    <!-- 60" round table -->
    <circle cx="0" cy="0" r="30" fill="#2BACE2" stroke="#000" stroke-width="1"/>
    <circle cx="0" cy="0" r="28" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2"/>

    <!-- Chair (18"x18") outside table with ~3" gap -->
    <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>

    <g transform="rotate(45)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(90)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(135)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(180)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(225)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(270)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(315)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>
  `,

    groupBy: '60" Round Tables',
  },
  {
    id: 'table-round-10-60',
    type: 'furniture',
    category: 'Tables',
    name: 'Round Table 10 Seat 60"',
    defaultDimensions: { width: 60, height: 60, unit: 'in' },

    svgPath: `
    <!-- 60" round table -->
    <circle cx="0" cy="0" r="30" fill="#2BACE2" stroke="#000" stroke-width="1"/>
    <circle cx="0" cy="0" r="28" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2"/>

    <!-- Chair (18"x18") outside table with ~3" gap -->
    <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>

    <g transform="rotate(36)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(72)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(108)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(144)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(180)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(216)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(252)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(288)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(324)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>
  `,

    groupBy: '60" Round Tables',
  },
  {
    id: 'table-round-11-60',
    type: 'furniture',
    category: 'Tables',
    name: 'Round Table 11 Seat 60"',
    defaultDimensions: { width: 60, height: 60, unit: 'in' },

    svgPath: `
    <!-- 60" round table -->
    <circle cx="0" cy="0" r="30" fill="#2BACE2" stroke="#000" stroke-width="1"/>
    <circle cx="0" cy="0" r="28" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2"/>

    <!-- Chair (18"x18") outside table with ~3" gap -->
    <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>

    <g transform="rotate(32.727)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(65.454)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(98.182)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(130.909)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(163.636)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(196.364)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(229.091)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(261.818)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(294.545)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(327.273)">
      <rect x="-9" y="-51" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-53" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>
  `,

    groupBy: '60" Round Tables',
  },
  // 60 inch table

  // 72 inch table
  {
    id: 'table-round-10-72',
    type: 'furniture',
    category: 'Tables',
    name: 'Round Table 10 Seat 72"',
    defaultDimensions: { width: 72, height: 72, unit: 'in' },

    svgPath: `
    <!-- 72" round table -->
    <circle cx="0" cy="0" r="36" fill="#2BACE2" stroke="#000" stroke-width="1"/>
    <circle cx="0" cy="0" r="34" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2"/>

    <!-- Chair (18"x18") outside table with ~3" gap -->
    <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>

    <g transform="rotate(36)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(72)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(108)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(144)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(180)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(216)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(252)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(288)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(324)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>
  `,

    groupBy: '72" Round Tables',
  },
  {
    id: 'table-round-12-72',
    type: 'furniture',
    category: 'Tables',
    name: 'Round Table 12 Seat 72"',
    defaultDimensions: { width: 72, height: 72, unit: 'in' },

    svgPath: `
    <!-- 72" round table -->
    <circle cx="0" cy="0" r="36" fill="#2BACE2" stroke="#000" stroke-width="1"/>
    <circle cx="0" cy="0" r="34" fill="none" stroke="#000" stroke-width="0.5" stroke-dasharray="2,2"/>

    <!-- Chair (18"x18") outside table with ~3" gap -->
    <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>

    <g transform="rotate(30)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(60)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(90)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(120)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(150)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(180)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(210)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(240)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(270)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(300)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>

    <g transform="rotate(330)">
      <rect x="-9" y="-57" width="18" height="18" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
      <rect x="-7" y="-59" width="14" height="2" fill="#2BACE2" stroke="#000" stroke-width="0.5"/>
    </g>
  `,

    groupBy: '72" Round Tables',
  },
  // 72 inch table

  // SERPENTINE & FARM TABLES
  {
    id: 'serpentine-table',
    type: 'furniture',
    category: 'Tables',
    name: 'Serpentine Table',
    defaultDimensions: { width: 96, height: 30, unit: 'in' },
    svgPath:
      "<path d='M-48,-15 Q0,-45 48,-15 L48,15 Q0,45 -48,15 Z' fill='#E0E0E0' stroke='#555' stroke-width='1.5'/>",
  },
  {
    id: 'communal-farm-table',
    type: 'furniture',
    category: 'Tables',
    name: 'Communal Farm Table',
    defaultDimensions: { width: 96, height: 40, unit: 'in' },
    svgPath:
      "<rect x='-48' y='-20' width='96' height='40' fill='#8B5A2B' stroke='#4A2E10' stroke-width='1.5'/>" +
      "<line x1='-48' y1='-5' x2='48' y2='-5' stroke='#6D3F18' stroke-width='1'/>" +
      "<line x1='-48' y1='5' x2='48' y2='5' stroke='#6D3F18' stroke-width='1'/>",
  },
  // SERPENTINE & FARM TABLES

  // Misc Table
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
  {
    id: 'square-table',
    type: 'furniture',
    category: 'Tables',
    name: 'Square Table',
    defaultDimensions: { width: 36, height: 36, unit: 'in' },
    svgPath: `<rect x="-18" y="-18" width="36" height="36" fill="#1E88E5"/>`,
    groupBy: 'Square Table',
  },
  {
    id: 'conference-table',
    type: 'furniture',
    category: 'Tables',
    name: 'Conference Table',
    defaultDimensions: { width: 96, height: 48, unit: 'in' },
    svgPath: `<rect x="-48" y="-24" width="96" height="48" fill="#26A69A"/>`,
    groupBy: 'Conference Table',
  },
  {
    id: '6ft-exhibitor-table',
    type: 'furniture',
    category: 'Tables',
    name: 'Exhibitor Table 6ft',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath: `<rect x="-36" y="-15" width="72" height="30" fill="#FFCA28"/>`,
    groupBy: 'Exhibitor Table 6ft',
  },
  {
    id: '8ft-exhibitor-table',
    type: 'furniture',
    category: 'Tables',
    name: 'Exhibitor Table 8ft',
    defaultDimensions: { width: 96, height: 30, unit: 'in' },
    svgPath: `<rect x="-48" y="-15" width="96" height="30" fill="#FFA726"/>`,
    groupBy: 'Exhibitor Table 8ft',
  },
  {
    id: '6ft-sponsor-table',
    type: 'furniture',
    category: 'Tables',
    name: 'Sponsor Table 6ft',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath: `<rect x="-36" y="-15" width="72" height="30" fill="#FF7043"/>`,
    groupBy: 'Sponsor Table 6ft',
  },
  {
    id: '8ft-sponsor-table',
    type: 'furniture',
    category: 'Tables',
    name: 'Sponsor Table 8ft',
    defaultDimensions: { width: 96, height: 30, unit: 'in' },
    svgPath: `<rect x="-48" y="-15" width="96" height="30" fill="#EC407A"/>`,
    groupBy: 'Sponsor Table 8ft',
  },
  {
    id: '6ft-banquet-table',
    type: 'furniture',
    category: 'Tables',
    name: 'Banquet Table 6ft',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath: `<rect x="-36" y="-15" width="72" height="30" fill="#AB47BC"/>`,
    groupBy: 'Banquet Table 6ft',
  },
  {
    id: '8ft-banquet-table',
    type: 'furniture',
    category: 'Tables',
    name: 'Banquet Table 8ft',
    defaultDimensions: { width: 96, height: 30, unit: 'in' },
    svgPath: `<rect x="-48" y="-15" width="96" height="30" fill="#7E57C2"/>`,
    groupBy: 'Banquet Table 8ft',
  },
  // Misc Table
  // Tables End

  // Stage Start
  {
    id: 'stage-1',
    type: 'furniture',
    category: 'Staging',
    name: 'Stage (8x8)',
    defaultDimensions: { width: 96, height: 96, unit: 'in' },
    svgPath: `<rect x="-48" y="-48" width="96" height="96" fill="#00A651"/>`,
    groupBy: 'Staging-1',
  },
  {
    id: 'stage-2',
    type: 'furniture',
    category: 'Staging',
    name: 'Stage (8x16)',
    defaultDimensions: { width: 96, height: 192, unit: 'in' },
    svgPath: `<rect x="-48" y="-96" width="96" height="192" fill="#00A651"/>`,
    groupBy: 'Staging-2',
  },
  {
    id: 'stage-3',
    type: 'furniture',
    category: 'Staging',
    name: 'Stage (8x24)',
    defaultDimensions: { width: 96, height: 288, unit: 'in' },
    svgPath: `<rect x="-48" y="-144" width="96" height="288" fill="#00A651"/>`,
    groupBy: 'Staging-3',
  },
  {
    id: 'camera-platform',
    type: 'furniture',
    category: 'Staging',
    name: 'Camera Platform',
    defaultDimensions: { width: 36, height: 24, unit: 'in' },
    svgPath: `
    <rect x='-18' y='-12' width='36' height='24' rx='2' fill='#555' stroke='#000' stroke-width='1.5'/>
    <rect x='-16' y='-10' width='32' height='20' rx='1' fill='#777' stroke='#000' stroke-width='0.5'/>
    <line x1='-16' y1='-8' x2='16' y2='-8' stroke='#333' stroke-width='1'/>
    <line x1='-16' y1='-4' x2='16' y2='-4' stroke='#333' stroke-width='1'/>
    <line x1='-16' y1='0' x2='16' y2='0' stroke='#333' stroke-width='1'/>
    <circle cx='0' cy='-6' r='2' fill='#1C1C1C' stroke='#000' stroke-width='0.5'/>
    <circle cx='0' cy='-6' r='1' fill='#4169E1' stroke='#000' stroke-width='0.3' opacity='0.7'/>
  `,
  },
  {
    id: 'ada-ramp',
    type: 'furniture',
    category: 'Staging',
    name: 'ADA Compliant Ramp',
    defaultDimensions: { width: 36, height: 12, unit: 'in' },
    svgPath:
      "<rect x='-18' y='-6' width='36' height='12' fill='#A9A9A9' stroke='#000' stroke-width='1.5'/>" +
      "<line x1='-18' y1='-4' x2='18' y2='-4' stroke='#666' stroke-width='1'/>" +
      "<line x1='-18' y1='-1' x2='18' y2='-1' stroke='#666' stroke-width='1'/>" +
      "<line x1='-18' y1='2' x2='18' y2='2' stroke='#666' stroke-width='1'/>" +
      "<line x1='-18' y1='5' x2='18' y2='5' stroke='#666' stroke-width='1'/>",
  },
  {
    id: 'stage-rails',
    type: 'furniture',
    category: 'Staging',
    name: 'Stage Rails',
    defaultDimensions: { width: 192, height: 4, unit: 'in' },
    svgPath: `
    <!-- Outer rail -->
    <rect x='-96' y='-2' width='192' height='4' fill='#222' stroke='#000' stroke-width='1'/>

    <!-- Inner rail line -->
    <line x1='-96' y1='-1' x2='96' y2='-1' stroke='#555' stroke-width='1'/>

    <!-- Rail posts -->
    <circle cx='-96' cy='0' r='1.2' fill='#444' stroke='#000' stroke-width='0.5'/>
    <circle cx='-72' cy='0' r='1.2' fill='#444' stroke='#000' stroke-width='0.5'/>
    <circle cx='-48' cy='0' r='1.2' fill='#444' stroke='#000' stroke-width='0.5'/>
    <circle cx='-24' cy='0' r='1.2' fill='#444' stroke='#000' stroke-width='0.5'/>
    <circle cx='0' cy='0' r='1.2' fill='#444' stroke='#000' stroke-width='0.5'/>
    <circle cx='24' cy='0' r='1.2' fill='#444' stroke='#000' stroke-width='0.5'/>
    <circle cx='48' cy='0' r='1.2' fill='#444' stroke='#000' stroke-width='0.5'/>
    <circle cx='72' cy='0' r='1.2' fill='#444' stroke='#000' stroke-width='0.5'/>
    <circle cx='96' cy='0' r='1.2' fill='#444' stroke='#000' stroke-width='0.5'/>
  `,
  },
  {
    id: 'custom-fabricated-staging',
    type: 'furniture',
    category: 'Staging',
    name: 'Custom Fabricated Staging',
    defaultDimensions: { width: 96, height: 48, unit: 'in' },
    svgPath:
      "<polygon points='-48,-24 48,-24 40,24 -40,24' fill='#2E8B57' stroke='#000' stroke-width='1.5'/>" +
      "<line x1='-40' y1='0' x2='40' y2='0' stroke='#1C5F3B' stroke-width='1'/>" +
      "<line x1='-30' y1='-12' x2='30' y2='-12' stroke='#1C5F3B' stroke-width='1'/>",
  },
  {
    id: 'stool-white-modern',
    type: 'furniture',
    category: 'Staging',
    name: 'White Modern Stool',
    defaultDimensions: { width: 12, height: 12, unit: 'in' },
    svgPath:
      "<circle cx='0' cy='0' r='6' fill='#FFFFFF' stroke='#000' stroke-width='1'/><circle cx='0' cy='0' r='3' fill='#EEE' stroke='#000' stroke-width='0.5'/>",
  },
  {
    id: 'stool-black-modern',
    type: 'furniture',
    category: 'Staging',
    name: 'Black Modern Stool',
    defaultDimensions: { width: 12, height: 12, unit: 'in' },
    svgPath:
      "<circle cx='0' cy='0' r='6' fill='#000000' stroke='#000' stroke-width='1'/><circle cx='0' cy='0' r='3' fill='#333' stroke='#000' stroke-width='0.5'/>",
  },
  {
    id: 'chair-black-club',
    type: 'furniture',
    category: 'Staging',
    name: 'Black Club Chair',
    defaultDimensions: { width: 18, height: 18, unit: 'in' },
    svgPath:
      "<ellipse cx='0' cy='0' rx='9' ry='8' fill='#000000' stroke='#000' stroke-width='1'/><ellipse cx='0' cy='0' rx='5' ry='4' fill='#222' stroke='#000' stroke-width='0.5'/>",
  },
  {
    id: 'chair-white-club',
    type: 'furniture',
    category: 'Staging',
    name: 'White Club Chair',
    defaultDimensions: { width: 18, height: 18, unit: 'in' },
    svgPath:
      "<ellipse cx='0' cy='0' rx='9' ry='8' fill='#FFFFFF' stroke='#000' stroke-width='1'/><ellipse cx='0' cy='0' rx='5' ry='4' fill='#EEE' stroke='#000' stroke-width='0.5'/>",
  },
  {
    id: 'side-table-gold',
    type: 'furniture',
    category: 'Staging',
    name: 'Gold Side Table',
    defaultDimensions: { width: 12, height: 12, unit: 'in' },
    svgPath:
      "<rect x='-6' y='-6' width='12' height='12' rx='2' fill='#FFD700' stroke='#000' stroke-width='1'/><rect x='-4' y='-4' width='8' height='8' rx='1' fill='#FFE066' stroke='#000' stroke-width='0.5'/>",
  },
  {
    id: 'table-white-silver-modern',
    type: 'furniture',
    category: 'Staging',
    name: 'White & Silver Square Modern Table',
    defaultDimensions: { width: 18, height: 18, unit: 'in' },
    svgPath:
      "<rect x='-9' y='-9' width='18' height='18' rx='3' fill='#FFFFFF' stroke='#C0C0C0' stroke-width='1'/><rect x='-6' y='-6' width='12' height='12' rx='2' fill='#E0E0E0' stroke='#C0C0C0' stroke-width='0.5'/>",
  },
  {
    id: 'podium-1',
    type: 'furniture',
    category: 'Staging',
    name: 'Black Wooden Podium',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },
    svgPath: `<rect x="-12" y="-12" width="24" height="24" fill="#F7941D"/>`,
    groupBy: 'Podium / Mic',
  },
  {
    id: 'podium-2',
    type: 'furniture',
    category: 'Staging',
    name: 'Lucite Acrylic Podium',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },
    svgPath: `<rect x="-12" y="-12" width="24" height="24" fill="#F7941D"/>`,
    groupBy: 'Podium / Mic',
  },
  {
    id: 'stage-skirting-section',
    type: 'furniture',
    category: 'Staging',
    name: 'Stage Skirting (Section)',
    defaultDimensions: { width: 96, height: 12, unit: 'in' },
    svgPath:
      "<rect x='-48' y='-6' width='96' height='12' fill='#333333' stroke='#111111' stroke-width='1.5'/>" +
      "<path d='M-46,-6 L-42,6 L-38,-6 L-34,6 L-30,-6 L-26,6 L-22,-6 L-18,6 L-14,-6 L-10,6 L-6,-6 L-2,6 L2,-6 L6,6 L10,-6 L14,6 L18,-6 L22,6 L26,-6 L30,6 L34,-6 L38,6 L42,-6 L46,6' fill='none' stroke='#555555' stroke-width='0.8'/>",
  },
  // Stage End

  // Lounge Furniture Set
  {
    id: 'vip-booth-curved',
    type: 'decor',
    category: 'Lounge',
    name: 'VIP Booth (Curved)',
    defaultDimensions: { width: 120, height: 60, unit: 'in' },
    svgPath:
      "<path d='M-60,-12 A80,80 0 0 1 60,-12 L50,14 A60,60 0 0 0 -50,14 Z' fill='#222' stroke='#000' stroke-width='1.5'/>" +
      "<rect x='-14' y='-5' width='28' height='14' rx='2' ry='2' fill='#222' stroke='#777' stroke-width='1'/>",
  },
  {
    id: 'lounge-sofa-lshape',
    type: 'decor',
    category: 'Lounge',
    name: 'L-Shaped Lounge Sofa',
    defaultDimensions: { width: 72, height: 72, unit: 'in' },
    svgPath:
      "<rect x='-36' y='-36' width='72' height='24' fill='#808080' stroke='#555' stroke-width='1.2'/>" +
      "<rect x='-36' y='-36' width='24' height='72' fill='#808080' stroke='#555' stroke-width='1.2'/>" +
      "<circle cx='0' cy='0' r='10' fill='#C0C0C0' stroke='#888' stroke-width='1'/>",
  },
  {
    id: 'lounge-sofa-modular',
    type: 'decor',
    category: 'Lounge',
    name: 'Modular Sofa Blocks',
    defaultDimensions: { width: 48, height: 48, unit: 'in' },
    svgPath:
      "<rect x='-24' y='-24' width='24' height='24' fill='#696969' stroke='#444' stroke-width='1'/>" +
      "<rect x='0' y='-24' width='24' height='24' fill='#696969' stroke='#444' stroke-width='1'/>" +
      "<rect x='-24' y='0' width='24' height='24' fill='#696969' stroke='#444' stroke-width='1'/>" +
      "<rect x='0' y='0' width='24' height='24' fill='#696969' stroke='#444' stroke-width='1'/>" +
      "<circle cx='0' cy='0' r='8' fill='#D2B48C' stroke='#888' stroke-width='1'/>",
  },
  {
    id: 'chaise-lounge-left',
    type: 'furniture',
    category: 'Lounge',
    name: 'Chaise Lounge (Left Arm)',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      "<path d='M-36,-15 L30,-15 L36,0 L30,15 L-36,15 Z' fill='#C07A73' stroke='#5A3530' stroke-width='1.5'/>" +
      "<rect x='-36' y='-15' width='10' height='30' fill='#8B4A43' stroke='#5A3530' stroke-width='1'/>" +
      "<rect x='16' y='-11' width='14' height='10' rx='2' ry='2' fill='#E5C4B5' stroke='#8B6A5E' stroke-width='0.8'/>",
  },
  {
    id: 'chaise-lounge-right',
    type: 'furniture',
    category: 'Lounge',
    name: 'Chaise Lounge (Right Arm)',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath:
      "<path d='M36,-15 L-30,-15 L-36,0 L-30,15 L36,15 Z' fill='#C07A73' stroke='#5A3530' stroke-width='1.5'/>" +
      "<rect x='26' y='-15' width='10' height='30' fill='#8B4A43' stroke='#5A3530' stroke-width='1'/>" +
      "<rect x='-30' y='-11' width='14' height='10' rx='2' ry='2' fill='#E5C4B5' stroke='#8B6A5E' stroke-width='0.8'/>",
  },
  // Lounge Furniture Set

  // COCKTAIL TABLES
  {
    id: 'cocktail-table-round-low',
    type: 'furniture',
    category: 'Cocktail',
    name: 'Cocktail Table – Round (Low)',
    defaultDimensions: { width: 30, height: 30, unit: 'in' },
    svgPath:
      "<circle cx='0' cy='0' r='15' fill='#D8D8D8' stroke='#666' stroke-width='1.5'/>" +
      "<circle cx='0' cy='0' r='4' fill='#B0B0B0' stroke='#777' stroke-width='1'/>",
  },
  {
    id: 'cocktail-table-round-high',
    type: 'furniture',
    category: 'Cocktail',
    name: 'Cocktail Table – Round (Highboy)',
    defaultDimensions: { width: 30, height: 30, unit: 'in' },
    svgPath:
      "<circle cx='0' cy='0' r='15' fill='#F3F3F3' stroke='#555' stroke-width='1.5'/>" +
      "<circle cx='0' cy='0' r='9' fill='none' stroke='#AAAAAA' stroke-width='1'/>" +
      "<circle cx='0' cy='0' r='3' fill='#C0C0C0' stroke='#777' stroke-width='0.8'/>",
  },
  {
    id: 'cocktail-table-square-low',
    type: 'furniture',
    category: 'Cocktail',
    name: 'Cocktail Table – Square (Low)',
    defaultDimensions: { width: 30, height: 30, unit: 'in' },
    svgPath:
      "<rect x='-15' y='-15' width='30' height='30' fill='#D8D8D8' stroke='#666' stroke-width='1.5'/>" +
      "<circle cx='0' cy='0' r='4' fill='#B0B0B0' stroke='#777' stroke-width='1'/>",
  },
  {
    id: 'cocktail-table-square-high',
    type: 'furniture',
    category: 'Cocktail',
    name: 'Cocktail Table – Square (Highboy)',
    defaultDimensions: { width: 30, height: 30, unit: 'in' },
    svgPath:
      "<rect x='-15' y='-15' width='30' height='30' fill='#F3F3F3' stroke='#555' stroke-width='1.5'/>" +
      "<rect x='-9' y='-9' width='18' height='18' fill='none' stroke='#AAAAAA' stroke-width='1'/>" +
      "<circle cx='0' cy='0' r='3' fill='#C0C0C0' stroke='#777' stroke-width='0.8'/>",
  },
  // COCKTAIL TABLES

  // DANCE FLOOR (VARIANTS)
  {
    id: 'dance-floor-white',
    type: 'furniture',
    category: 'Dance',
    name: 'Dance Floor – White',
    defaultDimensions: { width: 192, height: 192, unit: 'in' },
    svgPath:
      "<rect x='-96' y='-96' width='192' height='192' fill='#FDFDFD' stroke='#BBBBBB' stroke-width='2'/>",
  },
  {
    id: 'dance-floor-black',
    type: 'furniture',
    category: 'Dance',
    name: 'Dance Floor – Black',
    defaultDimensions: { width: 192, height: 192, unit: 'in' },
    svgPath:
      "<rect x='-96' y='-96' width='192' height='192' fill='#111111' stroke='#444444' stroke-width='2'/>",
  },
  {
    id: 'dance-floor-checker',
    type: 'furniture',
    category: 'Dance',
    name: 'Dance Floor – Checkerboard',
    defaultDimensions: { width: 192, height: 192, unit: 'in' },
    svgPath:
      "<rect x='-96' y='-96' width='192' height='192' fill='#FFFFFF' stroke='#555555' stroke-width='2'/>" +
      Array.from({ length: 4 })
        .map((_, row) =>
          Array.from({ length: 4 })
            .map((_, col) => {
              const size = 48;
              const x = -96 + col * size;
              const y = -96 + row * size;
              const isDark = (row + col) % 2 === 0;
              return `<rect x='${x}' y='${y}' width='${size}' height='${size}' fill='${
                isDark ? '#111111' : 'none'
              }' stroke='none'/>`;
            })
            .join('')
        )
        .join(''),
  },
  {
    id: 'dance-floor-led',
    type: 'furniture',
    category: 'Dance',
    name: 'Dance Floor – LED',
    defaultDimensions: { width: 192, height: 192, unit: 'in' },
    svgPath:
      "<rect x='-96' y='-96' width='192' height='192' fill='#000015' stroke='#6666FF' stroke-width='2'/>" +
      "<path d='M-48,-96 L-48,96 M0,-96 L0,96 M48,-96 L48,96 M96,-96 L96,96 M-96,-48 L96,-48 M-96,0 L96,0 M-96,48 L96,48 M-96,96 L96,96' stroke='#4444AA' stroke-width='1'/>" +
      "<circle cx='-84' cy='-96' r='3' fill='#FF33CC'/>" +
      "<circle cx='-60' cy='-96' r='3' fill='#33FFCC'/>" +
      "<circle cx='-36' cy='-96' r='3' fill='#FFFF66'/>" +
      "<circle cx='-12' cy='-96' r='3' fill='#66AAFF'/>" +
      "<circle cx='12' cy='-96' r='3' fill='#FF6633'/>" +
      "<circle cx='36' cy='-96' r='3' fill='#CC33FF'/>" +
      "<circle cx='60' cy='-96' r='3' fill='#33FF66'/>" +
      "<circle cx='84' cy='-96' r='3' fill='#FF33AA'/>" +
      "<circle cx='96' cy='-84' r='3' fill='#33CCFF'/>" +
      "<circle cx='96' cy='-60' r='3' fill='#FFAA33'/>" +
      "<circle cx='96' cy='-36' r='3' fill='#AA33FF'/>" +
      "<circle cx='96' cy='-12' r='3' fill='#33FF99'/>" +
      "<circle cx='96' cy='12' r='3' fill='#FF66CC'/>" +
      "<circle cx='96' cy='36' r='3' fill='#66FF33'/>" +
      "<circle cx='96' cy='60' r='3' fill='#3366FF'/>" +
      "<circle cx='96' cy='84' r='3' fill='#FFCC33'/>" +
      "<circle cx='84' cy='96' r='3' fill='#CC66FF'/>" +
      "<circle cx='60' cy='96' r='3' fill='#33FFAA'/>" +
      "<circle cx='36' cy='96' r='3' fill='#FF9933'/>" +
      "<circle cx='12' cy='96' r='3' fill='#6633FF'/>" +
      "<circle cx='-12' cy='96' r='3' fill='#FFFF33'/>" +
      "<circle cx='-36' cy='96' r='3' fill='#33AAFF'/>" +
      "<circle cx='-60' cy='96' r='3' fill='#FF3399'/>" +
      "<circle cx='-84' cy='96' r='3' fill='#99FF33'/>" +
      "<circle cx='-96' cy='84' r='3' fill='#FF6699'/>" +
      "<circle cx='-96' cy='60' r='3' fill='#33FF33'/>" +
      "<circle cx='-96' cy='36' r='3' fill='#9933FF'/>" +
      "<circle cx='-96' cy='12' r='3' fill='#FFAA66'/>" +
      "<circle cx='-96' cy='-12' r='3' fill='#33CCAA'/>" +
      "<circle cx='-96' cy='-36' r='3' fill='#FF33FF'/>" +
      "<circle cx='-96' cy='-60' r='3' fill='#66FF99'/>" +
      "<circle cx='-96' cy='-84' r='3' fill='#FFCC66'/>" +
      "<circle cx='0' cy='0' r='12' fill='#C0C0C0' stroke='#888888' stroke-width='1'/>" +
      "<path d='M-8,-8 L8,-8 L8,8 L-8,8 Z M-8,0 L8,0 M0,-8 L0,8' stroke='#555555' stroke-width='0.5' opacity='0.6'/>" +
      "<circle cx='-4' cy='-4' r='2' fill='#FFFFFF' opacity='0.8'/>" +
      "<circle cx='4' cy='-4' r='2' fill='#FF00FF' opacity='0.7'/>" +
      "<circle cx='-4' cy='4' r='2' fill='#00FFFF' opacity='0.7'/>" +
      "<circle cx='4' cy='4' r='2' fill='#FFFF00' opacity='0.7'/>" +
      "<circle cx='0' cy='0' r='2' fill='#FFFFFF' opacity='0.9'/>",
  },
  {
    id: 'dancefloor',
    type: 'furniture',
    category: 'Dance',
    name: 'Dancefloor (Parquet)',
    defaultDimensions: { width: 144, height: 144, unit: 'in' },
    svgPath:
      "<rect x='-72' y='-72' width='144' height='144' fill='#CDAA7D' stroke='#8B5A2B' stroke-width='1'/>" +
      "<g stroke='#A67C52' stroke-width='1'>" +
      "<line x1='-72' y1='-48' x2='72' y2='-48'/>" +
      "<line x1='-72' y1='-24' x2='72' y2='-24'/>" +
      "<line x1='-72' y1='0' x2='72' y2='0'/>" +
      "<line x1='-72' y1='24' x2='72' y2='24'/>" +
      "<line x1='-72' y1='48' x2='72' y2='48'/>" +
      "<line x1='-48' y1='-72' x2='-48' y2='72'/>" +
      "<line x1='-24' y1='-72' x2='-24' y2='72'/>" +
      "<line x1='0' y1='-72' x2='0' y2='72'/>" +
      "<line x1='24' y1='-72' x2='24' y2='72'/>" +
      "<line x1='48' y1='-72' x2='48' y2='72'/>" +
      '</g>' +
      "<text x='0' y='4' text-anchor='middle' font-size='10' fill='#6B3F1F'>DANCEFLOOR</text>",
  },
  // DANCE FLOOR (VARIANTS)

  // Customize
  {
    id: 'Rectangle-table',
    type: 'furniture',
    category: 'Customize',
    name: 'Rectangle Table',
    defaultDimensions: { width: 72, height: 24, unit: 'in' },
    color: '#8B4789',
    svgPath: `
    <rect x="-36" y="-12" width="72" height="24" fill="#8B4789" />
  `,
    groupBy: 'Customize',
  },
  {
    id: '4ft-table',
    type: 'furniture',
    category: 'Customize',
    name: '4 ft Table',
    defaultDimensions: { width: 48, height: 30, unit: 'in' },
    svgPath: `<rect x="-24" y="-15" width="48" height="30" fill="#66BB6A"/>`,
    groupBy: '4 ft Table',
  },
  {
    id: '6ft-table',
    type: 'furniture',
    category: 'Customize',
    name: '6 ft Table',
    defaultDimensions: { width: 72, height: 30, unit: 'in' },
    svgPath: `<rect x="-36" y="-15" width="72" height="30" fill="#9CCC65"/>`,
    groupBy: '6 ft Table',
  },
  {
    id: '8ft-table',
    type: 'furniture',
    category: 'Customize',
    name: '8 ft Table',
    defaultDimensions: { width: 96, height: 30, unit: 'in' },
    svgPath: `<rect x="-48" y="-15" width="96" height="30" fill="#D4E157"/>`,
    groupBy: '8 ft Table',
  },
  {
    id: 'round-shape',
    type: 'furniture',
    category: 'Customize',
    name: 'Round Shape',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },
    svgPath: `<circle cx="0" cy="0" r="12" fill="#673AB7"/>`,
  },
  // Customize

  // entertainment
  {
    id: 'touchscreen-kiosk',
    type: 'furniture',
    category: 'entertainment',
    name: 'Touchscreen Kiosk',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },
    svgPath:
      "<rect x='-10' y='-14' width='20' height='14' rx='2' ry='2' fill='#1F2933' stroke='#111820' stroke-width='1.5'/>" +
      "<rect x='-8' y='-12' width='16' height='10' rx='1' ry='1' fill='#1E88E5' stroke='#0B3A6F' stroke-width='1'/>" +
      "<rect x='-6' y='2' width='12' height='6' rx='2' ry='2' fill='#444444' stroke='#111111' stroke-width='1'/>",
  },
  {
    id: 'casino-table',
    type: 'furniture',
    category: 'entertainment',
    name: 'Casino Table',
    defaultDimensions: { width: 84, height: 48, unit: 'in' },
    svgPath:
      "<path d='M-42,0 Q0,-24 42,0 L42,18 Q0,30 -42,18 Z' fill='#0F5132' stroke='#06341F' stroke-width='1.5'/>" +
      "<ellipse cx='0' cy='4' rx='30' ry='10' fill='none' stroke='#F4D03F' stroke-width='1.2'/>",
  },
  {
    id: 'karaoke-station',
    type: 'furniture',
    category: 'entertainment',
    name: 'Karaoke Station',
    defaultDimensions: { width: 60, height: 48, unit: 'in' },
    svgPath:
      "<rect x='-30' y='0' width='60' height='24' fill='#2C3E50' stroke='#111820' stroke-width='1.5'/>" +
      "<rect x='-14' y='-18' width='28' height='14' rx='2' ry='2' fill='#1E88E5' stroke='#0B3A6F' stroke-width='1'/>" +
      "<circle cx='-24' cy='12' r='4' fill='#AAAAAA'/>" +
      "<circle cx='24' cy='12' r='4' fill='#AAAAAA'/>",
  },
  {
    id: 'games-table',
    type: 'furniture',
    category: 'entertainment',
    name: 'Games Table',
    defaultDimensions: { width: 72, height: 36, unit: 'in' },
    svgPath:
      "<rect x='-36' y='-18' width='72' height='36' fill='#FFFFFF' stroke='#666666' stroke-width='1.5'/>" +
      "<line x1='0' y1='-18' x2='0' y2='18' stroke='#BBBBBB' stroke-width='1'/>" +
      "<circle cx='0' cy='0' r='4' fill='#FF5252'/>" +
      "<circle cx='-18' cy='0' r='3' fill='#42A5F5'/>" +
      "<circle cx='18' cy='0' r='3' fill='#66BB6A'/>",
  },
  {
    id: 'photo-booth',
    type: 'furniture',
    category: 'entertainment',
    name: 'Photo Booth',
    defaultDimensions: { width: 72, height: 48, unit: 'in' },
    svgPath:
      "<path d='M-30,-18 L30,-18 L30,18 L14,18 L14,-4 L-14,-4 L-14,18 L-30,18 Z' fill='#F2F2F2' stroke='#777777' stroke-width='1.5'/>" +
      "<rect x='-12' y='-18' width='24' height='8' fill='#E57373' stroke='#B71C1C' stroke-width='1'/>",
  },
  // entertainment

  // TENTS / CANOPIES
  {
    id: 'canopy-pagoda-10x10',
    type: 'furniture',
    category: 'Canopy',
    name: 'Canopy / Pagoda 10x10',
    defaultDimensions: { width: 120, height: 120, unit: 'in' },
    svgPath:
      "<rect x='-60' y='-60' width='120' height='120' fill='#F5F5F5' stroke='#BBBBBB' stroke-width='1.5'/>" +
      "<path d='M-60,-60 L0,-20 L60,-60 M-60,60 L0,20 L60,60 M-60,-60 L-20,0 L-60,60 M60,-60 L20,0 L60,60' fill='none' stroke='#D0D0D0' stroke-width='1'/>" +
      "<circle cx='-56' cy='-56' r='3' fill='#777777'/>" +
      "<circle cx='56' cy='-56' r='3' fill='#777777'/>" +
      "<circle cx='-56' cy='56' r='3' fill='#777777'/>" +
      "<circle cx='56' cy='56' r='3' fill='#777777'/>",
  },
  // TENTS / CANOPIES
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
