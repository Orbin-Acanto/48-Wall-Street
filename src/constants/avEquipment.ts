import { DraggableLibraryItem } from '../types/floorplan.types';

export const AV_EQUIPMENT_LIBRARY: DraggableLibraryItem[] = [
  // sound
  {
    id: 'speaker-large',
    type: 'av',
    category: 'Sound',
    name: 'Large Speaker',
    defaultDimensions: { width: 24, height: 18, unit: 'in' },
    svgPath: `<rect x="-12" y="-9" width="24" height="18" fill="#1C1C1C" stroke="#000" stroke-width="1.5"/>
              <circle cx="0" cy="0" r="6" fill="#333" stroke="#666" stroke-width="1"/>
              <circle cx="0" cy="0" r="3" fill="#555" stroke="#777" stroke-width="0.5"/>`,
  },
  {
    id: 'speaker-room-pole',
    type: 'av',
    category: 'Sound',
    name: 'Room Monitor w/ Pole',
    defaultDimensions: { width: 20, height: 20, unit: 'in' },
    svgPath: `
    <circle cx="0" cy="0" r="3" fill="#000" stroke="#333" stroke-width="0.8"/>
    <polygon points="0,-3 10,12 -10,12" fill="#1C1C1C" stroke="#000" stroke-width="0.8" opacity="0.8"/>
  `,
  },
  {
    id: 'speaker-monitor',
    type: 'av',
    category: 'Sound',
    name: 'Monitor Speaker',
    defaultDimensions: { width: 18, height: 12, unit: 'in' },
    svgPath: `<rect x="-9" y="-6" width="18" height="12" fill="#1C1C1C" stroke="#000" stroke-width="1.5"/>
              <circle cx="0" cy="0" r="4" fill="#333" stroke="#666" stroke-width="1"/>`,
  },
  {
    id: 'subwoofer',
    type: 'av',
    category: 'Sound',
    name: 'Subwoofer',
    defaultDimensions: { width: 24, height: 24, unit: 'in' },
    svgPath: `<rect x="-12" y="-12" width="24" height="24" fill="#0A0A0A" stroke="#000" stroke-width="2"/>
              <circle cx="0" cy="0" r="8" fill="#1C1C1C" stroke="#333" stroke-width="1"/>
              <circle cx="0" cy="0" r="5" fill="#2C2C2C" stroke="#444" stroke-width="0.5"/>`,
  },
  // sound

  // audio
  {
    id: 'microphone-handheld',
    type: 'av',
    category: 'Audio',
    name: 'Handheld Microphone',
    defaultDimensions: { width: 10, height: 20, unit: 'in' },
    svgPath: `
    <ellipse cx="0" cy="-6" rx="4" ry="3" fill="#1C1C1C" stroke="#000" stroke-width="0.8"/>
    <rect x="-1.5" y="-6" width="3" height="10" fill="#555" stroke="#000" stroke-width="0.6"/>
  `,
  },
  {
    id: 'microphone-lapel',
    type: 'av',
    category: 'Audio',
    name: 'Lapel Microphone',
    defaultDimensions: { width: 6, height: 6, unit: 'in' },
    svgPath: `
    <circle cx="0" cy="0" r="2" fill="#222" stroke="#000" stroke-width="0.5"/>
    <line x1="0" y1="2" x2="0" y2="5" stroke="#555" stroke-width="0.6"/>
  `,
  },
  {
    id: 'microphone-qa',
    type: 'av',
    category: 'Audio',
    name: 'Q&A Microphone',
    defaultDimensions: { width: 12, height: 18, unit: 'in' },
    svgPath: `
    <circle cx="0" cy="0" r="5" fill="#C0C0C0" stroke="#000" stroke-width="1"/>
    <rect x="-1.2" y="-12" width="2.4" height="10" fill="#666" stroke="#000" stroke-width="0.6"/>
    <ellipse cx="0" cy="-12" rx="3" ry="2" fill="#1C1C1C" stroke="#000" stroke-width="0.6"/>
  `,
  },
  {
    id: 'microphone-podium',
    type: 'av',
    category: 'Audio',
    name: 'Podium Microphone',
    defaultDimensions: { width: 10, height: 20, unit: 'in' },
    svgPath: `
    <rect x="-4" y="6" width="8" height="6" fill="#333" stroke="#000" stroke-width="0.8"/>
    <path d="M0,6 L0,-6" stroke="#444" stroke-width="1.2"/>
    <circle cx="0" cy="-8" r="2.5" fill="#000" stroke="#333" stroke-width="0.5"/>
  `,
  },
  {
    id: 'microphone-panel',
    type: 'av',
    category: 'Audio',
    name: 'Panel Microphones',
    defaultDimensions: { width: 28, height: 10, unit: 'in' },
    svgPath: `
    <rect x="-14" y="-3" width="28" height="6" fill="#222" stroke="#000" stroke-width="0.8"/>
    <circle cx="-10" cy="0" r="2" fill="#555" stroke="#000" stroke-width="0.5"/>
    <circle cx="-3" cy="0" r="2" fill="#555" stroke="#000" stroke-width="0.5"/>
    <circle cx="4" cy="0" r="2" fill="#555" stroke="#000" stroke-width="0.5"/>
    <circle cx="11" cy="0" r="2" fill="#555" stroke="#000" stroke-width="0.5"/>
  `,
  },
  {
    id: 'dj-booth',
    type: 'av',
    category: 'Audio',
    name: 'DJ Booth',
    defaultDimensions: { width: 60, height: 36, unit: 'in' },
    svgPath: `<rect x="-30" y="-18" width="60" height="36" fill="#2F4F4F" stroke="#000" stroke-width="2"/>
              <rect x="-25" y="-13" width="20" height="15" fill="#1C1C1C" stroke="#666" stroke-width="1"/>
              <rect x="5" y="-13" width="20" height="15" fill="#1C1C1C" stroke="#666" stroke-width="1"/>`,
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
    id: 'band-setup',
    type: 'av',
    category: 'Audio',
    name: 'Band Setup Zone',
    defaultDimensions: { width: 96, height: 48, unit: 'in' },
    svgPath: `
    <rect x="-48" y="-24" width="96" height="48" fill="#555" stroke="#000" stroke-width="1.5" opacity="0.4"/>
    <circle cx="-20" cy="0" r="6" fill="#222" stroke="#000" stroke-width="0.8"/>
    <rect x="10" y="-6" width="18" height="12" fill="#222" stroke="#000" stroke-width="0.8"/>
  `,
  },
  // audio

  // Video
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
    id: 'tv-32',
    type: 'av',
    category: 'Video',
    name: 'TV 32"',
    defaultDimensions: { width: 28, height: 6, unit: 'in' },
    svgPath:
      "<rect x='-14' y='-3' width='28' height='6' fill='#1C1C1C' stroke='#000' stroke-width='1.5'/><rect x='-13' y='-2' width='26' height='4' fill='#0A0A0A' stroke='#333' stroke-width='0.5'/>",
  },
  {
    id: 'tv-42',
    type: 'av',
    category: 'Video',
    name: 'TV 42"',
    defaultDimensions: { width: 36, height: 6, unit: 'in' },
    svgPath:
      "<rect x='-18' y='-3' width='36' height='6' fill='#1C1C1C' stroke='#000' stroke-width='1.5'/><rect x='-17' y='-2' width='34' height='4' fill='#0A0A0A' stroke='#333' stroke-width='0.5'/>",
  },
  {
    id: 'tv-50',
    type: 'av',
    category: 'Video',
    name: 'TV 50"',
    defaultDimensions: { width: 44, height: 6, unit: 'in' },
    svgPath:
      "<rect x='-22' y='-3' width='44' height='6' fill='#1C1C1C' stroke='#000' stroke-width='1.5'/><rect x='-21' y='-2' width='42' height='4' fill='#0A0A0A' stroke='#333' stroke-width='0.5'/>",
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
    id: 'tv-60',
    type: 'av',
    category: 'Video',
    name: 'TV 60"',
    defaultDimensions: { width: 52, height: 6, unit: 'in' },
    svgPath:
      "<rect x='-26' y='-3' width='52' height='6' fill='#1C1C1C' stroke='#000' stroke-width='1.5'/><rect x='-25' y='-2' width='50' height='4' fill='#0A0A0A' stroke='#333' stroke-width='0.5'/>",
  },
  {
    id: 'tv-65',
    type: 'av',
    category: 'Video',
    name: 'TV 65"',
    defaultDimensions: { width: 58, height: 6, unit: 'in' },
    svgPath:
      "<rect x='-29' y='-3' width='58' height='6' fill='#1C1C1C' stroke='#000' stroke-width='1.5'/><rect x='-28' y='-2' width='56' height='4' fill='#0A0A0A' stroke='#333' stroke-width='0.5'/>",
  },
  {
    id: 'tv-70',
    type: 'av',
    category: 'Video',
    name: 'TV 70"',
    defaultDimensions: { width: 62, height: 6, unit: 'in' },
    svgPath:
      "<rect x='-31' y='-3' width='62' height='6' fill='#1C1C1C' stroke='#000' stroke-width='1.5'/><rect x='-30' y='-2' width='60' height='4' fill='#0A0A0A' stroke='#333' stroke-width='0.5'/>",
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
    id: 'tv-85',
    type: 'av',
    category: 'Video',
    name: 'TV 85"',
    defaultDimensions: { width: 76, height: 6, unit: 'in' },
    svgPath:
      "<rect x='-38' y='-3' width='76' height='6' fill='#1C1C1C' stroke='#000' stroke-width='1.5'/><rect x='-37' y='-2' width='74' height='4' fill='#0A0A0A' stroke='#333' stroke-width='0.5'/>",
  },
  {
    id: 'projection-screen-dresskit-10ft',
    type: 'av',
    category: 'Video',
    name: 'Projection Screen w/ Dress Kit (10ft)',
    defaultDimensions: { width: 120, height: 24, unit: 'in' },
    svgPath:
      "<rect x='-60' y='-12' width='120' height='24' fill='#000' stroke='#000' stroke-width='2'/><rect x='-58' y='-10' width='116' height='20' fill='#FFF' stroke='#888' stroke-width='1'/><text x='0' y='3' text-anchor='middle' fill='#999' font-size='8'>SCREEN</text>",
  },
  {
    id: 'front-projector',
    type: 'av',
    category: 'Video',
    name: 'Front Projector',
    defaultDimensions: { width: 18, height: 12, unit: 'in' },
    svgPath:
      "<rect x='-9' y='-6' width='18' height='12' fill='#4A4A4A' stroke='#000' stroke-width='1.5' rx='2'/><circle cx='6' cy='0' r='4' fill='#1C1C1C' stroke='#000' stroke-width='1'/><circle cx='6' cy='0' r='2.5' fill='#00BFFF' stroke='#000' stroke-width='0.5' opacity='0.7'/>",
  },
  {
    id: 'rear-projector',
    type: 'av',
    category: 'Video',
    name: 'Rear Projector',
    defaultDimensions: { width: 18, height: 12, unit: 'in' },
    svgPath:
      "<rect x='-9' y='-6' width='18' height='12' fill='#2E2E2E' stroke='#000' stroke-width='1.5' rx='2'/><circle cx='-6' cy='0' r='4' fill='#1C1C1C' stroke='#000' stroke-width='1'/><circle cx='-6' cy='0' r='2.5' fill='#FF6347' stroke='#000' stroke-width='0.5' opacity='0.7'/>",
  },
  {
    id: 'projector-stand',
    type: 'av',
    category: 'Video',
    name: 'Projector Stand / Base',
    defaultDimensions: { width: 18, height: 18, unit: 'in' },
    svgPath:
      "<rect x='-9' y='-9' width='18' height='18' fill='#D3D3D3' stroke='#000' stroke-width='1.5'/><rect x='-7' y='-7' width='14' height='14' fill='#F0F0F0' stroke='#999' stroke-width='1'/>",
  },
  {
    id: 'time-clock',
    type: 'av',
    category: 'Video',
    name: 'Time Clock',
    defaultDimensions: { width: 18, height: 18, unit: 'in' },
    svgPath:
      "<circle cx='0' cy='0' r='9' fill='#1C1C1C' stroke='#000' stroke-width='1.5'/><text x='0' y='3' font-size='8' text-anchor='middle' fill='#FFF'>CLK</text>",
  },
  {
    id: 'perfect-cue',
    type: 'av',
    category: 'Video',
    name: 'Perfect Cue',
    defaultDimensions: { width: 18, height: 12, unit: 'in' },
    svgPath:
      "<rect x='-9' y='-6' width='18' height='12' fill='#2F2F2F' stroke='#000' stroke-width='1.5'/><text x='0' y='3' font-size='7' text-anchor='middle' fill='#FFF'>PCUE</text>",
  },
  {
    id: 'conference-monitor',
    type: 'av',
    category: 'Video',
    name: 'Conference Monitor',
    defaultDimensions: { width: 36, height: 6, unit: 'in' },
    svgPath:
      "<rect x='-18' y='-3' width='36' height='6' fill='#1C1C1C' stroke='#000' stroke-width='1.5'/><rect x='-17' y='-2' width='34' height='4' fill='#0A0A0A' stroke='#333' stroke-width='0.5'/>",
  },
  {
    id: 'teleprompter',
    type: 'av',
    category: 'Video',
    name: 'Teleprompter',
    defaultDimensions: { width: 24, height: 18, unit: 'in' },
    svgPath:
      "<rect x='-12' y='-9' width='24' height='18' fill='#2E2E2E' stroke='#000' stroke-width='1.5'/><rect x='-10' y='-7' width='20' height='6' fill='#1C1C1C'/><text x='0' y='5' font-size='6' fill='#FFF' text-anchor='middle'>TP</text>",
  },
  {
    id: 'led-panel',
    type: 'av',
    category: 'Video',
    name: 'LED Panel',
    defaultDimensions: { width: 24, height: 4, unit: 'in' },
    svgPath:
      "<rect x='-12' y='-2' width='24' height='4' fill='#1A1A1A' stroke='#000' stroke-width='1.5'/><text x='0' y='2' text-anchor='middle' fill='#666' font-size='6'>PANEL</text>",
  },
  {
    id: 'led-video-wall',
    type: 'av',
    category: 'Video',
    name: 'LED Video Wall',
    defaultDimensions: { width: 240, height: 8, unit: 'in' },
    svgPath: `
    <rect x="-120" y="-4" width="240" height="8" fill="#111" stroke="#444" stroke-width="1.5"/>
    <rect x="-118" y="-3" width="236" height="6" fill="#222" stroke="#000" stroke-width="0.5"/>
    <text x="0" y="2" fill="#666" font-size="8" text-anchor="middle">LED WALL</text>
  `,
  },
  // Video

  // Camra
  {
    id: 'camera',
    type: 'av',
    category: 'Camera',
    name: 'Camera on Tripod',
    defaultDimensions: { width: 18, height: 18, unit: 'in' },
    svgPath: `<circle cx="0" cy="0" r="9" fill="#E0E0E0" stroke="#000" stroke-width="1"/>
              <rect x="-4" y="-3" width="8" height="6" fill="#1C1C1C" stroke="#000" stroke-width="1"/>
              <rect x="4" y="-1" width="4" height="2" fill="#2C2C2C" stroke="#000" stroke-width="0.5"/>`,
  },
  // Camra

  // Light
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
    id: 'custom-gobo',
    type: 'av',
    category: 'Lighting',
    name: 'Custom Gobo',
    defaultDimensions: { width: 18, height: 18, unit: 'in' },
    svgPath:
      "<circle cx='0' cy='0' r='9' fill='#333' stroke='#000' stroke-width='1.5'/><text x='0' y='3' text-anchor='middle' fill='#FFF' font-size='6'>GOBO</text>",
  },
  {
    id: 'ceiling-texture-light',
    type: 'av',
    category: 'Lighting',
    name: 'Ceiling Texture Lighting',
    defaultDimensions: { width: 20, height: 20, unit: 'in' },
    svgPath:
      "<circle cx='0' cy='0' r='10' fill='#B0C4DE' stroke='#000' stroke-width='1.5' opacity='0.6'/><circle cx='0' cy='0' r='6' fill='#FFF' stroke='#B0C4DE' stroke-width='1' opacity='0.7'/>",
  },
  {
    id: 'led-uplight',
    type: 'av',
    category: 'Lighting',
    name: 'LED Uplight',
    defaultDimensions: { width: 12, height: 12, unit: 'in' },
    svgPath:
      "<rect x='-6' y='-6' width='12' height='12' fill='#1C1C1C' stroke='#000' stroke-width='1'/><rect x='-4' y='-4' width='8' height='8' fill='#00FFFF' stroke='#000' stroke-width='0.5' opacity='0.8'/>",
  },
  {
    id: 'source-four',
    type: 'av',
    category: 'Lighting',
    name: 'Source Four Light',
    defaultDimensions: { width: 20, height: 12, unit: 'in' },
    svgPath:
      "<rect x='-10' y='-4' width='20' height='8' fill='#2C2C2C' stroke='#000' stroke-width='1.5'/><circle cx='10' cy='0' r='4' fill='#FFE4B5' stroke='#000' stroke-width='1'/>",
  },
  {
    id: 'intelligent-light',
    type: 'av',
    category: 'Lighting',
    name: 'Intelligent Lighting',
    defaultDimensions: { width: 18, height: 18, unit: 'in' },
    svgPath:
      "<rect x='-8' y='-5' width='16' height='10' fill='#2F2F2F' stroke='#000' stroke-width='1.5' rx='2'/><circle cx='0' cy='0' r='5' fill='#7FFFD4' stroke='#000' stroke-width='1' opacity='0.7'/>",
  },
  {
    id: 'pin-spot',
    type: 'av',
    category: 'Lighting',
    name: 'Pin Spot Lighting',
    defaultDimensions: { width: 12, height: 12, unit: 'in' },
    svgPath:
      "<circle cx='0' cy='0' r='6' fill='#FFFACD' stroke='#000' stroke-width='1.5'/><circle cx='0' cy='0' r='3' fill='#FFFF00' stroke='#000' stroke-width='0.8' opacity='0.8'/>",
  },
  {
    id: 'lighting-truss-stand',
    type: 'av',
    category: 'Lighting',
    name: 'Free-Standing Lighting Truss',
    defaultDimensions: { width: 120, height: 24, unit: 'in' },
    svgPath:
      "<rect x='-60' y='-12' width='120' height='24' fill='#696969' stroke='#000' stroke-width='2'/><line x1='-55' y1='-8' x2='-55' y2='8' stroke='#000' stroke-width='1.5'/><line x1='55' y1='-8' x2='55' y2='8' stroke='#000' stroke-width='1.5'/>",
  },
  // Light

  // power
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
    id: 'internet-drop',
    type: 'av',
    category: 'Power',
    name: 'Internet Drop',
    defaultDimensions: { width: 24, height: 18, unit: 'in' },
    svgPath:
      "<rect x='-12' y='-9' width='24' height='18' fill='#1E90FF' stroke='#000' stroke-width='1.5'/><text x='0' y='3' text-anchor='middle' fill='#000' font-size='8'>INT</text>",
  },
  {
    id: 'cat6-drop',
    type: 'av',
    category: 'Power',
    name: 'Cat6 Internet Drop',
    defaultDimensions: { width: 24, height: 18, unit: 'in' },
    svgPath:
      "<rect x='-12' y='-9' width='24' height='18' fill='#32CD32' stroke='#000' stroke-width='1.5'/><text x='0' y='3' text-anchor='middle' fill='#000' font-size='8'>CAT6</text>",
  },
  {
    id: 'power-drop-20a',
    type: 'av',
    category: 'Power',
    name: '20-Amp Power Drop',
    defaultDimensions: { width: 24, height: 18, unit: 'in' },
    svgPath:
      "<rect x='-12' y='-9' width='24' height='18' fill='#FF4500' stroke='#000' stroke-width='1.5'/><text x='0' y='3' text-anchor='middle' fill='#000' font-size='8'>20A</text>",
  },
  {
    id: 'power-drop-3phase',
    type: 'av',
    category: 'Power',
    name: '3-Phase Power Drop',
    defaultDimensions: { width: 24, height: 18, unit: 'in' },
    svgPath:
      "<rect x='-12' y='-9' width='24' height='18' fill='#8A2BE2' stroke='#000' stroke-width='1.5'/><text x='0' y='3' text-anchor='middle' fill='#000' font-size='8'>3PH</text>",
  },
  // power

  // Safety
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
  {
    id: 'safety-signage',
    type: 'av',
    category: 'Safety',
    name: 'Safety & Emergency Signage',
    defaultDimensions: { width: 24, height: 18, unit: 'in' },
    svgPath:
      "<rect x='-12' y='-9' width='24' height='18' fill='#FFD700' stroke='#000' stroke-width='1.5'/><text x='0' y='3' text-anchor='middle' fill='#000' font-size='8'>SAFE</text>",
  },
  // Safety
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
