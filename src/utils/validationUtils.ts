import {
  FloorPlanData,
  Wall,
  FurnitureItem,
  Point,
} from '../types/floorplan.types';

export const isValidPoint = (point: Point): boolean => {
  return (
    typeof point.x === 'number' &&
    typeof point.y === 'number' &&
    !isNaN(point.x) &&
    !isNaN(point.y) &&
    isFinite(point.x) &&
    isFinite(point.y)
  );
};

export const isValidWall = (wall: Wall): wall is Wall => {
  return (
    wall &&
    typeof wall.id === 'string' &&
    isValidPoint(wall.start) &&
    isValidPoint(wall.end) &&
    typeof wall.thickness === 'number' &&
    typeof wall.lengthInFeet === 'number' &&
    typeof wall.lengthInInches === 'number' &&
    Array.isArray(wall.doors) &&
    Array.isArray(wall.windows) &&
    wall.thickness > 0 &&
    wall.lengthInFeet >= 0 &&
    wall.lengthInInches >= 0
  );
};

export const isValidFurnitureItem = (
  item: FurnitureItem
): item is FurnitureItem => {
  return (
    item &&
    typeof item.id === 'string' &&
    typeof item.type === 'string' &&
    typeof item.category === 'string' &&
    typeof item.name === 'string' &&
    isValidPoint(item.position) &&
    typeof item.rotation === 'number' &&
    item.dimensions &&
    typeof item.dimensions.width === 'number' &&
    typeof item.dimensions.height === 'number' &&
    (item.dimensions.unit === 'ft' || item.dimensions.unit === 'in') &&
    typeof item.svgPath === 'string'
  );
};

export const isValidFloorPlan = (
  data: FloorPlanData
): data is FloorPlanData => {
  if (!data || typeof data !== 'object') return false;

  if (
    typeof data.id !== 'string' ||
    typeof data.name !== 'string' ||
    typeof data.version !== 'string' ||
    typeof data.createdAt !== 'string' ||
    typeof data.updatedAt !== 'string' ||
    typeof data.isLocked !== 'boolean'
  ) {
    return false;
  }

  if (
    !Array.isArray(data.walls) ||
    !Array.isArray(data.rooms) ||
    !Array.isArray(data.furniture)
  ) {
    return false;
  }

  if (!data.walls.every(isValidWall)) {
    return false;
  }

  if (!data.furniture.every(isValidFurnitureItem)) {
    return false;
  }

  if (
    !data.eventDetails ||
    typeof data.eventDetails.eventType !== 'string' ||
    typeof data.eventDetails.guestCount !== 'number' ||
    !Array.isArray(data.eventDetails.services)
  ) {
    return false;
  }

  if (
    !data.canvasSettings ||
    typeof data.canvasSettings.width !== 'number' ||
    typeof data.canvasSettings.height !== 'number' ||
    typeof data.canvasSettings.scale !== 'number' ||
    typeof data.canvasSettings.gridSize !== 'number' ||
    typeof data.canvasSettings.showGrid !== 'boolean' ||
    typeof data.canvasSettings.showDimensions !== 'boolean' ||
    typeof data.canvasSettings.snapToGrid !== 'boolean'
  ) {
    return false;
  }

  return true;
};

export const isValidDimension = (value: number, unit: 'ft' | 'in'): boolean => {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    return false;
  }

  if (value < 0) return false;

  const maxFeet = 1000;
  const maxInches = 12000;

  if (unit === 'ft' && value > maxFeet) return false;
  if (unit === 'in' && value > maxInches) return false;

  return true;
};

export const isValidRotation = (rotation: number): boolean => {
  return (
    typeof rotation === 'number' &&
    !isNaN(rotation) &&
    isFinite(rotation) &&
    rotation >= 0 &&
    rotation < 360
  );
};

export const sanitizeString = (
  input: string,
  maxLength: number = 255
): string => {
  if (typeof input !== 'string') return '';

  return input.trim().slice(0, maxLength).replace(/[<>]/g, '');
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidGuestCount = (count: number): boolean => {
  return (
    typeof count === 'number' &&
    !isNaN(count) &&
    isFinite(count) &&
    count >= 0 &&
    count <= 10000
  );
};

export const isValidWallThickness = (thickness: number): boolean => {
  return (
    typeof thickness === 'number' &&
    !isNaN(thickness) &&
    isFinite(thickness) &&
    thickness >= 1 &&
    thickness <= 24
  );
};

export const isValidZoom = (zoom: number): boolean => {
  return (
    typeof zoom === 'number' &&
    !isNaN(zoom) &&
    isFinite(zoom) &&
    zoom >= 0.1 &&
    zoom <= 5
  );
};

export const doItemsOverlap = (
  item1: { position: Point; width: number; height: number },
  item2: { position: Point; width: number; height: number }
): boolean => {
  const rect1 = {
    left: item1.position.x - item1.width / 2,
    right: item1.position.x + item1.width / 2,
    top: item1.position.y - item1.height / 2,
    bottom: item1.position.y + item1.height / 2,
  };

  const rect2 = {
    left: item2.position.x - item2.width / 2,
    right: item2.position.x + item2.width / 2,
    top: item2.position.y - item2.height / 2,
    bottom: item2.position.y + item2.height / 2,
  };

  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
};

export const isValidFileSize = (
  size: number,
  maxSizeMB: number = 10
): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return size > 0 && size <= maxSizeBytes;
};

export const isValidJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};
