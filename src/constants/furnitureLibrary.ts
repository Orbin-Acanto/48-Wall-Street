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
  {
    id: 'hight-boys-1',
    type: 'furniture',
    category: 'Seating',
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
    category: 'Seating',
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
  // 36 inch table
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
    id: 'stage-1',
    type: 'furniture',
    category: 'Staging',
    name: 'Stage (8x16)',
    defaultDimensions: { width: 96, height: 192, unit: 'in' },
    svgPath: `<rect x="-48" y="-96" width="96" height="192" fill="#00A651"/>`,
    groupBy: 'Staging',
  },
  {
    id: 'stage-2',
    type: 'furniture',
    category: 'Staging',
    name: 'Stage (8x8)',
    defaultDimensions: { width: 96, height: 96, unit: 'in' },
    svgPath: `<rect x="-48" y="-48" width="96" height="96" fill="#00A651"/>`,
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
  {
    id: 'bar-straight-3',
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
    svgPath: `<rect x="-36" y="-3" width="72" height="6" fill="#8B8B8B"/>`,
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
