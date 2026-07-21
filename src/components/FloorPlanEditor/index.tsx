'use client';

import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { FloorPlanCanvas } from '@/components/FloorPlanEditor/Canvas/FloorPlanCanvas';
import { EventDetailsModal } from '@/components/FloorPlanEditor/Modals/EventDetailsModal';
import { ExportImportModal } from '@/components/FloorPlanEditor/Modals/ExportImportModal';
import { PropertiesPanel } from '@/components/FloorPlanEditor/Panels/PropertiesPanel';

import { AudioVisualsSidebar } from '@/components/FloorPlanEditor/Sidebars/AudioVisualsSidebar';
import { CateringSidebar } from '@/components/FloorPlanEditor/Sidebars/CateringSidebar';
import { FurnitureSidebar } from '@/components/FloorPlanEditor/Sidebars/FurnitureSidebar';

import { TopToolbar } from '@/components/FloorPlanEditor/Toolbars/TopToolbar';

import { MobileWarning } from '@/components/Mobilewarning';

import { useFloorPlanState } from '@/hooks/useFloorPlanState';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

import {
  Tool,
  Point,
  Wall as WallType,
  FurnitureItem,
  SelectedType,
  LibraryItemLike,
  SidebarType,
  ModalType,
  FloorKey,
  LegendItemWithCount,
} from '@/types/floorplan.types';
import { v4 as uuidv4 } from 'uuid';
import { DoorWindow } from '@/types/floorplan.types';
import { exportToJSON, importFromJSON } from '@/utils/exportUtils';
import { calculateDistance } from '@/utils/geometryUtils';
import { isValidWall, isValidFurnitureItem } from '@/utils/validationUtils';
import { feetToInches, getNextAvailableColor } from '@/utils/conversionUtils';

import { FURNITURE_LIBRARY } from '@/constants/furnitureLibrary';
import { AV_EQUIPMENT_LIBRARY } from '@/constants/avEquipment';
import { CATERING_LIBRARY } from '@/constants/cateringStations';
import { getPolylineLength } from '@/utils/geometryUtils';
import { DecorSidebar } from './Sidebars/DecorSidebar';
import { Paintbrush, Pizza, Sofa, Tv } from 'lucide-react';
import { DECOR_LIBRARY } from '@/constants/decorLibrary';

const ALL_LIBRARY_ITEMS: LibraryItemLike[] = [
  ...(FURNITURE_LIBRARY as LibraryItemLike[]),
  ...(AV_EQUIPMENT_LIBRARY as LibraryItemLike[]),
  ...(CATERING_LIBRARY as LibraryItemLike[]),
  ...(DECOR_LIBRARY as LibraryItemLike[]),
];

const DEFAULT_WALL_THICKNESS = 6;

const findLibraryItem = (id: string): LibraryItemLike | undefined =>
  ALL_LIBRARY_ITEMS.find((item) => item.id === id);

export const FLOOR_UNDERLAYS: Record<
  FloorKey,
  { label: string; svg?: string; href?: string; scale: number }
> = {
  'banking-hall': {
    label: 'Banking Hall',
    href: '/floor-plans/banking-hall.svg',
    scale: 0.6,
  },
  'grand-mezzanine': {
    label: 'Grand Mezzanine',
    href: '/floor-plans/grand-mezzanine.svg',
    scale: 2.65,
  },
  'upper-mezzanine': {
    label: 'Upper Mezzanine',
    href: '/floor-plans/upper-mezzanine.svg',
    scale: 2.15,
  },
  'hamilton-office': {
    label: 'Hamilton Office',
    href: '/floor-plans/hamilton-office.svg',
    scale: 0.65,
  },
  'concourse-vault': {
    label: 'Concourse Vault',
    href: '/floor-plans/concourse-vault.svg',
    scale: 1.85,
  },
};

export const FloorPlanEditor: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  const {
    floorPlan,
    canUndo,
    canRedo,
    undo,
    redo,
    addWall,
    updateWall,
    deleteWall,
    deleteDoor,
    deleteWindow,
    deleteFurniture,
    addFurniture,
    updateFurniture,
    moveFurnitureTransient,
    rotateFurniture,
    deleteFurnitureItems,
    addRoom,
    updateRoom,
    moveRoomTransient,
    deleteRoom,
    commitHistory,
    updateEventDetails,
    updateCanvasSettings,
    toggleLock,
    loadFloorPlan,
    resetFloorPlan,
  } = useFloorPlanState();

  const [selectedTool, setSelectedTool] = useState<Tool>('pan');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const [activeSidebar, setActiveSidebar] = useState<SidebarType>('furniture');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [showPropertiesPanel, setShowPropertiesPanel] = useState<boolean>(true);
  const [legendItemsWithCounts, setLegendItemsWithCounts] = useState<
    LegendItemWithCount[]
  >([]);

  const [selectedItemType, setSelectedItemType] = useState<SelectedType>(null);
  const [selectedDoorRef, setSelectedDoorRef] = useState<{
    wallId: string;
    doorId: string;
  } | null>(null);
  const [selectedWindowRef, setSelectedWindowRef] = useState<{
    wallId: string;
    windowId: string;
  } | null>(null);

  // Multi Select Copy Paste Furniture Item State
  const [selectedFurnitureIds, setSelectedFurnitureIds] = useState<Set<string>>(
    new Set()
  );
  const [clipboardFurniture, setClipboardFurniture] = useState<
    FurnitureItem[] | null
  >(null);
  const pasteBumpRef = useRef(0);

  // ---Underlay UI state ---
  const [selectedFloor, setSelectedFloor] =
    useState<FloorKey>('grand-mezzanine');
  const underlayDef = FLOOR_UNDERLAYS[selectedFloor];
  const underlayScale: number = underlayDef.scale;
  const underlayOpacity: number = 1;
  const underlayOffset: { x: number; y: number } = { x: 40, y: 40 };

  const lastMouseCanvasPosRef = useRef<Point | null>(null);

  // Total seats placed across all table furniture, for the capacity badge.
  const seatsPlaced = useMemo(
    () => floorPlan.furniture.reduce((sum, f) => sum + (f.seats ?? 0), 0),
    [floorPlan.furniture]
  );

  const selectedItem = useMemo(() => {
    if (!selectedItemId) return null;

    if (selectedItemType === 'wall') {
      const wall = floorPlan.walls.find((w) => w.id === selectedItemId);
      return wall || null;
    }

    if (selectedItemType === 'furniture') {
      const furniture = floorPlan.furniture.find(
        (f) => f.id === selectedItemId
      );
      return furniture || null;
    }

    if (selectedItemType === 'door' && selectedDoorRef) {
      const wall = floorPlan.walls.find((w) => w.id === selectedDoorRef.wallId);
      return wall?.doors.find((d) => d.id === selectedDoorRef.doorId) || null;
    }

    if (selectedItemType === 'window' && selectedWindowRef) {
      const wall = floorPlan.walls.find(
        (w) => w.id === selectedWindowRef.wallId
      );
      return (
        wall?.windows.find((w) => w.id === selectedWindowRef.windowId) || null
      );
    }

    if (selectedItemType === 'room') {
      return floorPlan.rooms.find((r) => r.id === selectedItemId) || null;
    }

    return null;
  }, [
    selectedItemId,
    selectedItemType,
    selectedDoorRef,
    selectedWindowRef,
    floorPlan.walls,
    floorPlan.furniture,
    floorPlan.rooms,
  ]);

  const handleWallCreate = useCallback(
    (start: Point, end: Point) => {
      const pixels = calculateDistance(start, end);
      const scale = floorPlan.canvasSettings.scale;

      if (scale <= 0) return;

      const lengthInFeet = pixels / scale;
      const lengthInInches = feetToInches(lengthInFeet);

      const candidate: Omit<WallType, 'id'> = {
        start,
        end,
        thickness: DEFAULT_WALL_THICKNESS,
        lengthInFeet,
        lengthInInches,
        doors: [],
        windows: [],
      };

      if (!isValidWall({ ...candidate, id: 'tmp-wall-id' })) {
        console.warn('Invalid wall data, creation skipped', candidate);
        return;
      }

      addWall(candidate);
    },
    [floorPlan.canvasSettings.scale, addWall]
  );

  const handleItemSelect = useCallback(
    (id: string | null, type: SelectedType) => {
      if (!id) {
        setSelectedItemId(null);
        setSelectedItemType(null);
        setSelectedFurnitureIds(new Set());
        setSelectedDoorRef(null);
        setSelectedWindowRef(null);
        return;
      }

      if (type === 'furniture') {
        setSelectedItemType('furniture');
        setSelectedItemId(id);
        setSelectedFurnitureIds(new Set([id]));
        setSelectedDoorRef(null);
        setSelectedWindowRef(null);
        return;
      }

      setSelectedItemId(id);
      setSelectedItemType(type);
      if (type !== 'door') setSelectedDoorRef(null);
      if (type !== 'window') setSelectedWindowRef(null);
      setSelectedFurnitureIds(new Set());
    },
    []
  );

  const handleDoorSelect = useCallback((wallId: string, doorId: string) => {
    setSelectedItemId(doorId);
    setSelectedItemType('door');
    setSelectedDoorRef({ wallId, doorId });
    setSelectedWindowRef(null);
  }, []);

  const handleWindowSelect = useCallback((wallId: string, windowId: string) => {
    setSelectedItemId(windowId);
    setSelectedItemType('window');
    setSelectedWindowRef({ wallId, windowId });
    setSelectedDoorRef(null);
  }, []);

  const handleFurnitureDrop = useCallback(
    (libraryItemId: string, position: Point) => {
      const libraryItem = findLibraryItem(libraryItemId);
      if (!libraryItem) {
        console.warn(`Library item with id "${libraryItemId}" not found`);
        return;
      }

      const isCustomTable = libraryItem.category === 'Customize';

      let svgPath = libraryItem.svgPath;
      let color: string | undefined;

      if (isCustomTable) {
        color = getNextAvailableColor(floorPlan.furniture);
        svgPath = libraryItem.svgPath.replace(
          /fill="#[0-9A-Fa-f]{6}"/gi,
          `fill="${color}"`
        );
      }

      const candidate: Omit<FurnitureItem, 'id'> = {
        type: libraryItem.type,
        category: libraryItem.category,
        name: libraryItem.name,
        position,
        rotation: 0,
        dimensions: libraryItem.defaultDimensions,
        baseDimensions: libraryItem.defaultDimensions,
        svgPath,
        locked: false,
        zIndex: 1,
        groupBy: libraryItem.groupBy,
        seats: libraryItem.seats,
        ...(color && { color }),
      };

      if (
        !isValidFurnitureItem({
          ...candidate,
          id: 'tmp-furniture-id',
        })
      ) {
        console.warn('Invalid furniture data, drop skipped', candidate);
        return;
      }

      addFurniture(candidate);
    },
    [addFurniture, floorPlan.furniture]
  );

  const handleDelete = useCallback(() => {
    if (!selectedItemId || !selectedItemType) return;

    if (selectedItemType === 'wall' && !floorPlan.isLocked) {
      deleteWall(selectedItemId);
    } else if (selectedItemType === 'furniture') {
      if (selectedFurnitureIds.size > 1) {
        // Atomic multi-delete: one undo step for the whole group.
        deleteFurnitureItems(Array.from(selectedFurnitureIds));
      } else if (selectedItemId) {
        deleteFurniture(selectedItemId);
      }
    } else if (selectedItemType === 'room') {
      deleteRoom(selectedItemId);
    } else if (selectedItemType === 'door') {
      deleteDoor(selectedItemId);
    } else if (selectedItemType === 'window') {
      deleteWindow(selectedItemId);
    }

    setSelectedItemId(null);
    setSelectedFurnitureIds(new Set());
    setSelectedItemType(null);
  }, [
    selectedItemId,
    selectedFurnitureIds,
    selectedItemType,
    floorPlan.isLocked,
    deleteDoor,
    deleteWindow,
    deleteWall,
    deleteFurniture,
    deleteFurnitureItems,
    deleteRoom,
  ]);

  const handleBatchFurnitureSelect = useCallback((ids: string[]) => {
    if (ids.length === 0) return;

    setSelectedItemType('furniture');
    setSelectedItemId(ids[ids.length - 1]);
    setSelectedDoorRef(null);
    setSelectedWindowRef(null);
    setSelectedFurnitureIds(new Set(ids));
  }, []);

  const handleFurnitureClick = useCallback(
    (id: string, { toggle }: { toggle: boolean }) => {
      setSelectedItemType('furniture');
      setSelectedItemId(id);
      setSelectedDoorRef(null);
      setSelectedWindowRef(null);

      setSelectedFurnitureIds((prev) => {
        const next = new Set(prev);
        if (toggle) {
          next.has(id) ? next.delete(id) : next.add(id);
        } else {
          next.clear();
          next.add(id);
        }
        return next;
      });
    },
    []
  );

  const handleSave = useCallback(() => {
    exportToJSON(floorPlan);
  }, [floorPlan]);

  const handleLoad = useCallback(
    async (file: File) => {
      try {
        const data = await importFromJSON(file);
        loadFloorPlan(data);
        setActiveModal(null);
        setSelectedItemId(null);
        setSelectedItemType(null);
        setSelectedFurnitureIds(new Set());
      } catch (error) {
        console.error('Failed to load floor plan:', error);
        alert('Failed to load floor plan. Please check the file format.');
      }
    },
    [loadFloorPlan]
  );

  const handleCreateRoomAt = useCallback(
    (position: Point) => {
      const pixelsPerFoot = floorPlan.canvasSettings.scale || 20;

      const defaultWidth = 120;
      const defaultHeight = 40;

      const widthFt = defaultWidth / pixelsPerFoot;
      const heightFt = defaultHeight / pixelsPerFoot;
      const areaSqFt = +(widthFt * heightFt).toFixed(2);

      const newRoomId = addRoom({
        name: `Label ${floorPlan.rooms.length + 1}`,
        walls: [],
        x: position.x - defaultWidth / 2,
        y: position.y - defaultHeight / 2,
        width: defaultWidth,
        height: defaultHeight,
        area: areaSqFt,
        color: '#000000',
      });

      setSelectedItemId(newRoomId);
      setSelectedItemType('room');
    },
    [addRoom, floorPlan.rooms.length, floorPlan.canvasSettings.scale]
  );

  const toggleSidebar = (type: SidebarType) => {
    setActiveSidebar((current) => (current === type ? null : type));
  };

  // Layer ordering for the selected furniture item(s).
  const changeLayer = useCallback(
    (mode: 'front' | 'back' | 'forward' | 'backward') => {
      if (floorPlan.isLocked) return;
      const ids =
        selectedFurnitureIds.size > 0
          ? Array.from(selectedFurnitureIds)
          : selectedItemType === 'furniture' && selectedItemId
            ? [selectedItemId]
            : [];
      if (!ids.length) return;

      const zValues = floorPlan.furniture.map((f) => f.zIndex ?? 1);
      const maxZ = zValues.length ? Math.max(...zValues) : 1;
      const minZ = zValues.length ? Math.min(...zValues) : 1;

      ids.forEach((id) => {
        const f = floorPlan.furniture.find((ff) => ff.id === id);
        if (!f) return;
        const current = f.zIndex ?? 1;
        let next = current;
        if (mode === 'front') next = maxZ + 1;
        else if (mode === 'back') next = minZ - 1;
        else if (mode === 'forward') next = current + 1;
        else if (mode === 'backward') next = current - 1;
        updateFurniture(id, { zIndex: next });
      });
    },
    [
      floorPlan.isLocked,
      floorPlan.furniture,
      selectedFurnitureIds,
      selectedItemType,
      selectedItemId,
      updateFurniture,
    ]
  );

  // Select every furniture item on the canvas.
  const selectAllFurniture = useCallback(() => {
    const ids = floorPlan.furniture.map((f) => f.id);
    if (!ids.length) return;
    setSelectedItemType('furniture');
    setSelectedItemId(ids[ids.length - 1]);
    setSelectedDoorRef(null);
    setSelectedWindowRef(null);
    setSelectedFurnitureIds(new Set(ids));
  }, [floorPlan.furniture]);

  // Align selected furniture to a common edge/center. `position` is the item
  // center, so left/right/top/bottom account for each item's half-extent.
  const alignSelected = useCallback(
    (mode: 'left' | 'hcenter' | 'right' | 'top' | 'vcenter' | 'bottom') => {
      if (floorPlan.isLocked) return;
      const ids =
        selectedFurnitureIds.size > 1
          ? Array.from(selectedFurnitureIds)
          : [];
      if (ids.length < 2) return;

      const items = ids
        .map((id) => floorPlan.furniture.find((f) => f.id === id))
        .filter((f): f is FurnitureItem => !!f && !f.locked);
      if (items.length < 2) return;

      const pxPerInch = floorPlan.canvasSettings.scale / 12;
      const halfW = (f: FurnitureItem) => {
        const u = f.dimensions.unit || 'in';
        const win = u === 'ft' ? f.dimensions.width * 12 : f.dimensions.width;
        return (win * pxPerInch) / 2;
      };
      const halfH = (f: FurnitureItem) => {
        const u = f.dimensions.unit || 'in';
        const hin = u === 'ft' ? f.dimensions.height * 12 : f.dimensions.height;
        return (hin * pxPerInch) / 2;
      };

      const lefts = items.map((f) => f.position.x - halfW(f));
      const rights = items.map((f) => f.position.x + halfW(f));
      const tops = items.map((f) => f.position.y - halfH(f));
      const bottoms = items.map((f) => f.position.y + halfH(f));

      const minLeft = Math.min(...lefts);
      const maxRight = Math.max(...rights);
      const minTop = Math.min(...tops);
      const maxBottom = Math.max(...bottoms);
      const avgX =
        items.reduce((s, f) => s + f.position.x, 0) / items.length;
      const avgY =
        items.reduce((s, f) => s + f.position.y, 0) / items.length;

      items.forEach((f) => {
        let { x, y } = f.position;
        if (mode === 'left') x = minLeft + halfW(f);
        else if (mode === 'right') x = maxRight - halfW(f);
        else if (mode === 'hcenter') x = avgX;
        else if (mode === 'top') y = minTop + halfH(f);
        else if (mode === 'bottom') y = maxBottom - halfH(f);
        else if (mode === 'vcenter') y = avgY;
        updateFurniture(f.id, { position: { x, y } });
      });
    },
    [
      floorPlan.isLocked,
      floorPlan.furniture,
      floorPlan.canvasSettings.scale,
      selectedFurnitureIds,
      updateFurniture,
    ]
  );

  const addDoorToWall = useCallback(
    (wallId: string, position: number = 0.5) => {
      const wall = floorPlan.walls.find((w) => w.id === wallId);
      if (!wall) return;

      const newDoor: DoorWindow = {
        id: uuidv4(),
        type: 'door',
        position,
        width: 36,
        height: 80,
        style: 'single',
      };

      updateWall(wallId, {
        doors: [...wall.doors, newDoor],
      });
    },
    [floorPlan.walls, updateWall]
  );

  const addWindowToWall = useCallback(
    (wallId: string, position: number = 0.5) => {
      const wall = floorPlan.walls.find((w) => w.id === wallId);
      if (!wall) return;

      const newWindow: DoorWindow = {
        id: uuidv4(),
        type: 'window',
        position,
        width: 48,
        height: 48,
        style: 'single',
      };

      updateWall(wallId, {
        windows: [...wall.windows, newWindow],
      });
    },
    [floorPlan.walls, updateWall]
  );

  const updateDoorOnWall = useCallback(
    (wallId: string, doorId: string, updates: Partial<DoorWindow>) => {
      const wall = floorPlan.walls.find((w) => w.id === wallId);
      if (!wall) return;

      updateWall(wallId, {
        doors: wall.doors.map((door) =>
          door.id === doorId ? { ...door, ...updates } : door
        ),
      });
    },
    [floorPlan.walls, updateWall]
  );

  const updateWindowOnWall = useCallback(
    (wallId: string, windowId: string, updates: Partial<DoorWindow>) => {
      const wall = floorPlan.walls.find((w) => w.id === wallId);
      if (!wall) return;

      updateWall(wallId, {
        windows: wall.windows.map((win) =>
          win.id === windowId ? { ...win, ...updates } : win
        ),
      });
    },
    [floorPlan.walls, updateWall]
  );

  const handleCurveWallComplete = useCallback(
    (points: Point[]) => {
      if (!points || points.length < 2) return;

      const start = points[0];
      const end = points[points.length - 1];

      const pixels = getPolylineLength(points);
      const scale = floorPlan.canvasSettings.scale;
      if (scale <= 0) return;

      const lengthInFeet = pixels / scale;
      const lengthInInches = feetToInches(lengthInFeet);

      const candidate: Omit<WallType, 'id'> = {
        start,
        end,
        thickness: DEFAULT_WALL_THICKNESS,
        lengthInFeet,
        lengthInInches,
        doors: [],
        windows: [],
        isCurved: true,
        curvePoints: points,
      };

      addWall(candidate);
    },
    [floorPlan.canvasSettings.scale, addWall]
  );

  const copySelectedFurniture = useCallback(() => {
    const ids = Array.from(selectedFurnitureIds);
    if (!ids.length) return;

    const items = ids
      .map((id) => floorPlan.furniture.find((f) => f.id === id))
      .filter(Boolean) as FurnitureItem[];

    const clones: FurnitureItem[] = items.map((f) => ({
      ...f,
      position: { ...f.position },
      dimensions: { ...f.dimensions },
      baseDimensions: f.baseDimensions ? { ...f.baseDimensions } : undefined,
    }));

    setClipboardFurniture(clones);
    pasteBumpRef.current = 0;
  }, [selectedFurnitureIds, floorPlan.furniture]);

  const pasteFurniture = useCallback(() => {
    if (!clipboardFurniture?.length) return;

    const mouse = lastMouseCanvasPosRef.current;

    pasteBumpRef.current += 1;
    const bump = 10 * pasteBumpRef.current;

    const cx =
      clipboardFurniture.reduce((s, f) => s + f.position.x, 0) /
      clipboardFurniture.length;
    const cy =
      clipboardFurniture.reduce((s, f) => s + f.position.y, 0) /
      clipboardFurniture.length;

    let dx = bump,
      dy = bump;
    if (mouse) {
      dx = mouse.x - cx;
      dy = mouse.y - cy;
    }

    const newIds: string[] = [];
    clipboardFurniture.forEach((f) => {
      const newId = addFurniture({
        type: f.type,
        category: f.category,
        name: f.name,
        position: {
          x: f.position.x + dx,
          y: f.position.y + dy,
        },
        rotation: f.rotation,
        dimensions: f.dimensions,
        baseDimensions: f.baseDimensions,
        svgPath: f.svgPath,
        locked: false,
        zIndex: (f.zIndex ?? 1) + 1,
        groupBy: f.groupBy,
        seats: f.seats,
      });

      if (newId) newIds.push(newId);
    });

    if (newIds.length) {
      setSelectedItemId(newIds[newIds.length - 1]);
      setSelectedItemType('furniture');
      setSelectedFurnitureIds(new Set(newIds));
    }
  }, [clipboardFurniture, addFurniture]);

  // Move the current selection by (dx, dy). Furniture (single or multi) and
  // rooms are supported. Each keypress is one history step (discrete action).
  const handleNudge = useCallback(
    (dx: number, dy: number) => {
      if (floorPlan.isLocked) return;

      if (selectedItemType === 'furniture') {
        const ids =
          selectedFurnitureIds.size > 0
            ? Array.from(selectedFurnitureIds)
            : selectedItemId
              ? [selectedItemId]
              : [];
        ids.forEach((id) => {
          const f = floorPlan.furniture.find((ff) => ff.id === id);
          if (f && !f.locked) {
            updateFurniture(id, {
              position: { x: f.position.x + dx, y: f.position.y + dy },
            });
          }
        });
      } else if (selectedItemType === 'room' && selectedItemId) {
        const room = floorPlan.rooms.find((r) => r.id === selectedItemId);
        if (room && typeof room.x === 'number' && typeof room.y === 'number') {
          updateRoom(selectedItemId, { x: room.x + dx, y: room.y + dy });
        }
      }
    },
    [
      floorPlan.isLocked,
      floorPlan.furniture,
      floorPlan.rooms,
      selectedItemType,
      selectedItemId,
      selectedFurnitureIds,
      updateFurniture,
      updateRoom,
    ]
  );

  // Duplicate the currently selected furniture in place (offset a little),
  // without touching the copy/paste clipboard.
  const duplicateSelectedFurniture = useCallback(() => {
    if (floorPlan.isLocked) return;
    const ids =
      selectedFurnitureIds.size > 0
        ? Array.from(selectedFurnitureIds)
        : selectedItemType === 'furniture' && selectedItemId
          ? [selectedItemId]
          : [];
    if (!ids.length) return;

    const OFFSET = 20;
    const newIds: string[] = [];
    ids.forEach((id) => {
      const f = floorPlan.furniture.find((ff) => ff.id === id);
      if (!f) return;
      const newId = addFurniture({
        type: f.type,
        category: f.category,
        name: f.name,
        position: { x: f.position.x + OFFSET, y: f.position.y + OFFSET },
        rotation: f.rotation,
        dimensions: { ...f.dimensions },
        baseDimensions: f.baseDimensions ? { ...f.baseDimensions } : undefined,
        svgPath: f.svgPath,
        locked: false,
        zIndex: (f.zIndex ?? 1) + 1,
        groupBy: f.groupBy,
        seats: f.seats,
        ...(f.color && { color: f.color }),
        ...(f.customName && { customName: f.customName }),
      });
      if (newId) newIds.push(newId);
    });

    if (newIds.length) {
      setSelectedItemType('furniture');
      setSelectedItemId(newIds[newIds.length - 1]);
      setSelectedFurnitureIds(new Set(newIds));
    }
  }, [
    floorPlan.isLocked,
    floorPlan.furniture,
    selectedFurnitureIds,
    selectedItemType,
    selectedItemId,
    addFurniture,
  ]);

  useKeyboardShortcuts({
    onUndo: canUndo ? undo : undefined,
    onRedo: canRedo ? redo : undefined,
    onSave: handleSave,
    onDelete: selectedItemId ? handleDelete : undefined,
    onNudge: selectedItemId ? handleNudge : undefined,
    onDuplicate: duplicateSelectedFurniture,
    onSelectAll: selectAllFurniture,
    onEscape: () => {
      setSelectedItemId(null);
      setSelectedItemType(null);
      setSelectedTool('select');
      setSelectedFurnitureIds(new Set());
    },
    onToggleGrid: () =>
      updateCanvasSettings({
        showGrid: !floorPlan.canvasSettings.showGrid,
      }),
    onToggleDimensions: () =>
      updateCanvasSettings({
        showDimensions: !floorPlan.canvasSettings.showDimensions,
      }),
    onCopy: copySelectedFurniture,
    onPaste: pasteFurniture,
  });

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileWarning />;
  }

  return (
    <div className="mt-22 flex h-[90vh] min-w-7xl flex-col bg-gray-50">
      <TopToolbar
        selectedTool={selectedTool}
        onToolChange={setSelectedTool}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        onSave={handleSave}
        onLoad={() => setActiveModal('export')}
        onExport={() => setActiveModal('export')}
        onReset={() => setActiveModal('reset')}
        showGrid={floorPlan.canvasSettings.showGrid}
        showDimensions={floorPlan.canvasSettings.showDimensions}
        onToggleGrid={() =>
          updateCanvasSettings({
            showGrid: !floorPlan.canvasSettings.showGrid,
          })
        }
        onToggleDimensions={() =>
          updateCanvasSettings({
            showDimensions: !floorPlan.canvasSettings.showDimensions,
          })
        }
        isLocked={floorPlan.isLocked}
        onToggleLock={toggleLock}
        onOpenEventDetails={() => setActiveModal('event')}
        selectedFloor={selectedFloor}
        onFloorChange={setSelectedFloor}
        seatsPlaced={seatsPlaced}
        guestCount={floorPlan.eventDetails.guestCount}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex">
          <div className="flex flex-col items-center bg-gray-800 py-4">
            <button
              onClick={() => toggleSidebar('furniture')}
              className={`flex h-12 w-12 items-center justify-center transition-colors ${
                activeSidebar === 'furniture'
                  ? 'bg-primary text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Furniture"
            >
              <Sofa />
            </button>

            <button
              onClick={() => toggleSidebar('av')}
              className={`flex h-12 w-12 items-center justify-center transition-colors ${
                activeSidebar === 'av'
                  ? 'bg-primary text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Audio / Visual"
            >
              <Tv />
            </button>

            <button
              onClick={() => toggleSidebar('catering')}
              className={`flex h-12 w-12 items-center justify-center transition-colors ${
                activeSidebar === 'catering'
                  ? 'bg-primary text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Catering"
            >
              <Pizza />
            </button>
            <button
              onClick={() => toggleSidebar('decor')}
              className={`flex h-12 w-12 items-center justify-center transition-colors ${
                activeSidebar === 'decor'
                  ? 'bg-primary text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Decor/Props"
            >
              <Paintbrush />
            </button>
          </div>

          {activeSidebar === 'furniture' && <FurnitureSidebar />}
          {activeSidebar === 'av' && <AudioVisualsSidebar />}
          {activeSidebar === 'catering' && <CateringSidebar />}
          {activeSidebar === 'decor' && <DecorSidebar />}
        </div>

        <div className="relative h-full w-full flex-1">

          <FloorPlanCanvas
            floorPlan={floorPlan}
            selectedTool={selectedTool}
            selectedItemId={selectedItemId}
            selectedFurnitureIds={selectedFurnitureIds}
            onFurnitureClick={handleFurnitureClick}
            onItemSelect={handleItemSelect}
            onWallCreate={handleWallCreate}
            onCurveWallComplete={handleCurveWallComplete}
            onFurnitureMove={moveFurnitureTransient}
            onFurnitureDrop={handleFurnitureDrop}
            onDragCommit={commitHistory}
            onAddDoor={addDoorToWall}
            onAddWindow={addWindowToWall}
            onDoorSelect={handleDoorSelect}
            onWindowSelect={handleWindowSelect}
            onBatchFurnitureSelect={handleBatchFurnitureSelect}
            onRoomSelect={(roomId) => handleItemSelect(roomId, 'room')}
            onCreateRoomAtPosition={handleCreateRoomAt}
            onRoomMove={(id, x, y) => moveRoomTransient(id, x, y)}
            underlay={{
              href: underlayDef.href,
              opacity: underlayOpacity,
              scale: underlayScale,
              offset: underlayOffset,
            }}
            onCanvasMousePosition={(p) => {
              lastMouseCanvasPosRef.current = p;
            }}
          />
        </div>

        {showPropertiesPanel && (
          <PropertiesPanel
            selectedItem={selectedItem}
            selectedItemType={selectedItemType}
            isLocked={floorPlan.isLocked}
            furnitureItems={floorPlan.furniture}
            onLegendUpdate={setLegendItemsWithCounts}
            onUpdate={(updates) => {
              if (!selectedItemId || !selectedItemType) return;

              if (selectedItemType === 'wall') {
                updateWall(selectedItemId, updates as Partial<WallType>);
              } else if (selectedItemType === 'furniture') {
                const furnitureUpdates = updates as Partial<FurnitureItem>;
                const ids =
                  selectedFurnitureIds.size > 1
                    ? Array.from(selectedFurnitureIds)
                    : [selectedItemId];
                const isGroup = ids.length > 1;

                // Position never propagates to a group (items would collapse).
                if (isGroup && 'position' in furnitureUpdates) {
                  const { position, ...rest } = furnitureUpdates;
                  void position;
                  if (Object.keys(rest).length === 0) return;
                  ids.forEach((id) => updateFurniture(id, rest));
                  return;
                }

                // Smart group resize: if the selection is all the same item
                // type, set every item to the exact same size; if the types are
                // mixed, scale each item proportionally by the same ratio.
                if (isGroup && furnitureUpdates.dimensions) {
                  const active = floorPlan.furniture.find(
                    (f) => f.id === selectedItemId
                  );
                  const selected = floorPlan.furniture.filter((f) =>
                    ids.includes(f.id)
                  );
                  const sameType = selected.every(
                    (f) => f.name === selected[0].name
                  );

                  if (sameType || !active) {
                    ids.forEach((id) =>
                      updateFurniture(id, {
                        dimensions: furnitureUpdates.dimensions,
                      })
                    );
                  } else {
                    const wRatio =
                      active.dimensions.width > 0
                        ? furnitureUpdates.dimensions.width /
                          active.dimensions.width
                        : 1;
                    const hRatio =
                      active.dimensions.height > 0
                        ? furnitureUpdates.dimensions.height /
                          active.dimensions.height
                        : 1;
                    selected.forEach((f) =>
                      updateFurniture(f.id, {
                        dimensions: {
                          ...f.dimensions,
                          width: +(f.dimensions.width * wRatio).toFixed(2),
                          height: +(f.dimensions.height * hRatio).toFixed(2),
                        },
                      })
                    );
                  }
                  return;
                }

                // Non-dimension edits (color, etc.) apply to the whole selection.
                ids.forEach((id) => updateFurniture(id, furnitureUpdates));
              } else if (selectedItemType === 'room') {
                updateRoom(selectedItemId, updates);
              } else if (selectedItemType === 'door' && selectedDoorRef) {
                updateDoorOnWall(
                  selectedDoorRef.wallId,
                  selectedDoorRef.doorId,
                  updates as Partial<DoorWindow>
                );
              } else if (selectedItemType === 'window' && selectedWindowRef) {
                updateWindowOnWall(
                  selectedWindowRef.wallId,
                  selectedWindowRef.windowId,
                  updates as Partial<DoorWindow>
                );
              }
            }}
            onRotate={(rotation) => {
              if (selectedItemType !== 'furniture') return;
              // Rotate the whole selection together.
              const ids =
                selectedFurnitureIds.size > 1
                  ? Array.from(selectedFurnitureIds)
                  : selectedItemId
                    ? [selectedItemId]
                    : [];
              ids.forEach((id) => rotateFurniture(id, rotation));
            }}
            onDelete={handleDelete}
            onClose={() => setShowPropertiesPanel(false)}
            pixelsPerFoot={floorPlan.canvasSettings.scale}
            onChangeLayer={changeLayer}
            onDuplicate={duplicateSelectedFurniture}
            onAlign={alignSelected}
            selectionCount={selectedFurnitureIds.size}
          />
        )}
      </div>

      {activeModal === 'event' && (
        <EventDetailsModal
          isOpen
          selectedFloor={selectedFloor}
          eventDetails={floorPlan.eventDetails}
          onSave={(details) => {
            updateEventDetails(details);
            setActiveModal(null);
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'export' && (
        <ExportImportModal
          isOpen
          floorPlan={floorPlan}
          onImport={handleLoad}
          onClose={() => setActiveModal(null)}
          eventDetails={floorPlan.eventDetails}
          legendItems={legendItemsWithCounts}
        />
      )}

      {activeModal === 'reset' && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-gray-900">
              Reset floor plan?
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              This clears the entire canvas and your saved design. This action
              cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setActiveModal(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetFloorPlan();
                  setSelectedItemId(null);
                  setSelectedItemType(null);
                  setSelectedFurnitureIds(new Set());
                  setActiveModal(null);
                }}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {!showPropertiesPanel && (
        <button
          onClick={() => setShowPropertiesPanel(true)}
          className="fixed top-1/2 right-0 -translate-y-1/2 rounded-l-lg bg-blue-500 p-2 text-white shadow-lg transition-colors hover:bg-blue-600"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
