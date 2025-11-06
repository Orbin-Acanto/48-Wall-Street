export interface Point {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
  unit: 'ft' | 'in';
}

export interface Wall {
  id: string;
  start: Point;
  end: Point;
  thickness: number;
  lengthInFeet: number;
  lengthInInches: number;
  doors: DoorWindow[];
  windows: DoorWindow[];
}

export interface DoorWindow {
  id: string;
  type: 'door' | 'window';
  position: number;
  width: number;
  height: number;
  style: 'single' | 'double' | 'sliding' | 'french' | 'bay' | 'casement';
  svgIcon?: string;
}

export interface Room {
  id: string;
  name: string;
  walls: string[];
  area: number;
  color?: string;
}

export interface FurnitureItem {
  id: string;
  type: 'furniture' | 'av' | 'catering';
  category: string;
  name: string;
  position: Point;
  rotation: number;
  dimensions: Dimensions;
  svgPath: string;
  locked?: boolean;
  zIndex?: number;
}

export interface EventDetails {
  eventType: string;
  guestCount: number;
  services: string[];
  eventDate?: string;
  eventName?: string;
}

export interface FloorPlanData {
  id: string;
  name: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  walls: Wall[];
  rooms: Room[];
  furniture: FurnitureItem[];
  eventDetails: EventDetails;
  canvasSettings: CanvasSettings;
  isLocked: boolean;
}

export interface CanvasSettings {
  width: number;
  height: number;
  scale: number;
  gridSize: number;
  showGrid: boolean;
  showDimensions: boolean;
  snapToGrid: boolean;
  backgroundColor: string;
}

export interface DraggableLibraryItem {
  id: string;
  type: 'furniture' | 'av' | 'catering';
  category: string;
  name: string;
  defaultDimensions: Dimensions;
  svgPath: string;
  thumbnail?: string;
}

export interface ViewportTransform {
  x: number;
  y: number;
  scale: number;
}

export interface SelectionBox {
  start: Point;
  end: Point;
}

export type Tool =
  | 'select'
  | 'wall'
  | 'door'
  | 'window'
  | 'measure'
  | 'pan'
  | 'delete';

export type DrawingMode = 'wall' | 'room' | 'none';

export interface HistoryState {
  past: FloorPlanData[];
  present: FloorPlanData;
  future: FloorPlanData[];
}

export const EVENT_TYPES = [
  'Wedding',
  'Corporate Event',
  'Birthday Party',
  'Conference',
  'Exhibition',
  'Concert',
  'Workshop',
  'Networking Event',
  'Other',
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export const SERVICE_TYPES = [
  'Catering',
  'Audio/Visual',
  'Photography',
  'Videography',
  'DJ/Entertainment',
  'Decoration',
  'Furniture Rental',
  'Lighting',
  'Security',
  'Valet Parking',
] as const;

export type ServiceType = (typeof SERVICE_TYPES)[number];

export const FURNITURE_CATEGORIES = [
  'Seating',
  'Tables',
  'Staging',
  'Decor',
  'Bars',
  'Buffet',
  'Reception',
  'Lounge',
] as const;

export type FurnitureCategory = (typeof FURNITURE_CATEGORIES)[number];
