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
  isCurved?: boolean;
  curvePoints?: Point[];
}

export type LegendItemConfig = {
  category: string;
  label: string;
  color: string;
};

export interface DoorWindow {
  id: string;
  type: 'door' | 'window';
  position: number;
  width: number;
  height: number;
  style: 'single' | 'double' | 'sliding' | 'french' | 'bay' | 'casement';
  svgIcon?: string;
}

export type LegendItemWithCount = {
  category: string;
  label: string;
  color: string;
  count: number;
};

export type ExportLayoutOptions = {
  filename?: string;
  hideGrid?: boolean;
  headerTitle?: string;
  clientName?: string;
  eventDate?: string;
  logoUrl?: string;
  clientLogo?: string | null;
  legendItems?: LegendItemWithCount[];
};

export type BBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export interface Room {
  id: string;
  name: string;
  walls: string[];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  area?: number;
  color?: string;
}

export type SelectedType =
  | 'wall'
  | 'furniture'
  | 'room'
  | 'door'
  | 'window'
  | null;

export interface FurnitureItem {
  id: string;
  type: 'furniture' | 'av' | 'catering' | string;
  category: string;
  name: string;
  position: Point;
  rotation: number;
  dimensions: Dimensions;
  baseDimensions?: Dimensions;
  svgPath: string;
  locked?: boolean;
  zIndex?: number;
  groupBy?: string;
  color?: string;
  customName?: string;
}

export interface EventDetails {
  clientName?: string;
  clientEmail?: string;

  foodType?: string;
  cateringStyle?: string;

  layoutStyle?: string;
  decorStyle?: string;
  colorPalette?: string;

  hasDanceFloor?: boolean;
  danceFloorSize?: string;
  hasStage?: boolean;
  stageSize?: string;
  barsCount?: number;

  specialNotes?: string;
  eventType: string;
  guestCount: number;
  services: string[];
  eventDate?: string;
  eventName?: string;
  floor?: string;

  barStylePreference?: string;
  barFinishPreference?: string;
  barServiceType?: string;

  stageSkirtingType?: string;
  stageBackdropStyle?: string;
  hasPodium?: boolean;
  podiumBranding?: string;
  podiumNotes?: string;

  danceFloorType?: string;
  danceFloorColor?: string;
  danceFloorLocation?: string;
  danceFloorNotes?: string;

  avNeeds?: string[];
  avNotes?: string;
  powerPlan?: string;
  powerNotes?: string;

  entertainmentOptions?: string[];
  entertainmentNotes?: string;

  loadInTime?: string;
  loadOutTime?: string;
  eventScheduleNotes?: string;
}

export type GetPosFn = (id: string) => Point | null;

export interface UseFurnitureDragProps {
  onMove: (id: string, position: Point) => void;
  screenToCanvas: (screenX: number, screenY: number) => Point;
}

export interface ExportImportModalProps {
  isOpen: boolean;
  floorPlan: FloorPlanData;
  onImport: (file: File) => void;
  onClose: () => void;
  eventDetails: EventDetails;
  legendItems: LegendItemWithCount[];
}

export type FloorLevel = 'grand_mezzanine' | 'concourse';

export type ExportFormat = 'json' | 'svg' | 'png' | 'pdf';

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
  type: 'furniture' | 'av' | 'catering' | 'decor';
  category: string;
  name: string;
  defaultDimensions: Dimensions;
  svgPath: string;
  thumbnail?: string;
  groupBy?: string;
  color?: string;
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

export type SidebarType = 'furniture' | 'av' | 'catering' | 'decor' | null;
export type ModalType = 'event' | 'wall' | 'export' | null;
export type FloorKey =
  | 'banking-hall'
  | 'grand-mezzanine'
  | 'upper-mezzanine'
  | 'hamilton-office'
  | 'concourse-vault';

export type UnderlayProps = {
  svg?: string;
  href?: string;
  scale?: number;
  opacity?: number;
  offset?: { x: number; y: number };
};

export interface LibraryItemLike {
  id: string;
  type: string;
  category: string;
  name: string;
  defaultDimensions: FurnitureItem['dimensions'];
  svgPath: string;
  groupBy?: string;
}

export type Tool =
  | 'select'
  | 'wall'
  | 'door'
  | 'window'
  | 'curve-wall'
  | 'room'
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
