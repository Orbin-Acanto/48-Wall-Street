import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  FloorPlanData,
  Wall,
  FurnitureItem,
  EventDetails,
  CanvasSettings,
  Room,
  HistoryState,
  Point,
} from '../types/floorplan.types';

const createInitialFloorPlan = (): FloorPlanData => ({
  id: uuidv4(),
  name: 'Untitled Floor Plan',
  version: '1.0.0',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  walls: [],
  rooms: [],
  furniture: [],
  eventDetails: {
    eventType: '',
    guestCount: 0,
    services: [],
  },
  canvasSettings: {
    width: 5000,
    height: 2500,
    scale: 20,
    gridSize: 20,
    showGrid: true,
    showDimensions: false,
    snapToGrid: true,
    backgroundColor: '#FFFFFF',
  },
  isLocked: false,
});

export const useFloorPlanState = () => {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: createInitialFloorPlan(),
    future: [],
  });

  const present = history.present;

  // ----------------------------
  //Canvas settings
  // ----------------------------
  const updateFloorPlan = useCallback(
    (updater: (prev: FloorPlanData) => FloorPlanData) => {
      setHistory((prev) => {
        const newPresent = updater(prev.present);
        return {
          past: [...prev.past, prev.present],
          present: { ...newPresent, updatedAt: new Date().toISOString() },
          future: [],
        };
      });
    },
    []
  );

  const updateCanvasSettings = useCallback(
    (updates: Partial<CanvasSettings>) => {
      updateFloorPlan((prev) => ({
        ...prev,
        canvasSettings: { ...prev.canvasSettings, ...updates },
      }));
    },
    [updateFloorPlan]
  );

  const toggleLock = useCallback(() => {
    updateFloorPlan((prev) => ({
      ...prev,
      isLocked: !prev.isLocked,
    }));
  }, [updateFloorPlan]);

  const loadFloorPlan = useCallback((data: FloorPlanData) => {
    setHistory({
      past: [],
      present: data,
      future: [],
    });
  }, []);

  const resetFloorPlan = useCallback(() => {
    if (
      window.confirm(
        'Are you sure you want to reset? All unsaved changes will be lost.'
      )
    ) {
      setHistory({
        past: [],
        present: createInitialFloorPlan(),
        future: [],
      });
    }
  }, []);

  const updateFloorPlanName = useCallback(
    (name: string) => {
      updateFloorPlan((prev) => ({ ...prev, name }));
    },
    [updateFloorPlan]
  );
  // ----------------------------
  //Canvas settings
  // ----------------------------

  // Undo
  const undo = useCallback(() => {
    setHistory((prev) => {
      if (prev.past.length === 0) return prev;
      const previous = prev.past[prev.past.length - 1];
      const newPast = prev.past.slice(0, prev.past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [prev.present, ...prev.future],
      };
    });
  }, []);

  // Redo
  const redo = useCallback(() => {
    setHistory((prev) => {
      if (prev.future.length === 0) return prev;
      const next = prev.future[0];
      const newFuture = prev.future.slice(1);
      return {
        past: [...prev.past, prev.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  // ----------------------------
  // Wall
  // ----------------------------
  const addWall = useCallback(
    (wall: Omit<Wall, 'id'>) => {
      updateFloorPlan((prev) => ({
        ...prev,
        walls: [...prev.walls, { ...wall, id: uuidv4() }],
      }));
    },
    [updateFloorPlan]
  );

  const updateWall = useCallback(
    (wallId: string, updates: Partial<Wall>) => {
      updateFloorPlan((prev) => ({
        ...prev,
        walls: prev.walls.map((wall) =>
          wall.id === wallId ? { ...wall, ...updates } : wall
        ),
      }));
    },
    [updateFloorPlan]
  );

  const deleteWall = useCallback(
    (wallId: string) => {
      updateFloorPlan((prev) => ({
        ...prev,
        walls: prev.walls.filter((wall) => wall.id !== wallId),
      }));
    },
    [updateFloorPlan]
  );
  // ----------------------------
  // Wall
  // ----------------------------

  // ----------------------------
  // Furniture
  // ----------------------------
  const addFurniture = useCallback(
    (f: Omit<FurnitureItem, 'id'>) => {
      const newId = uuidv4();
      updateFloorPlan((prev) => ({
        ...prev,
        furniture: [...prev.furniture, { ...f, id: newId }],
      }));
      return newId;
    },
    [updateFloorPlan]
  );

  const updateFurniture = useCallback(
    (furnitureId: string, updates: Partial<FurnitureItem>) => {
      updateFloorPlan((prev) => ({
        ...prev,
        furniture: prev.furniture.map((item) =>
          item.id === furnitureId ? { ...item, ...updates } : item
        ),
      }));
    },
    [updateFloorPlan]
  );

  const deleteFurniture = useCallback(
    (furnitureId: string) => {
      updateFloorPlan((prev) => ({
        ...prev,
        furniture: prev.furniture.filter((item) => item.id !== furnitureId),
      }));
    },
    [updateFloorPlan]
  );

  const moveFurniture = useCallback(
    (furnitureId: string, position: Point) => {
      updateFurniture(furnitureId, { position });
    },
    [updateFurniture]
  );

  const rotateFurniture = useCallback(
    (furnitureId: string, rotation: number) => {
      updateFurniture(furnitureId, { rotation });
    },
    [updateFurniture]
  );

  const deleteFurnitureItems = useCallback(
    (furnitureIds: string[]) => {
      updateFloorPlan((prev) => ({
        ...prev,
        furniture: prev.furniture.filter(
          (item) => !furnitureIds.includes(item.id)
        ),
      }));
    },
    [updateFloorPlan]
  );

  // ----------------------------
  // Furniture
  // ----------------------------

  // ----------------------------
  // Room
  // ----------------------------
  const addRoom = useCallback(
    (room: Omit<Room, 'id'>) => {
      const id = uuidv4();
      updateFloorPlan((prev) => ({
        ...prev,
        rooms: [...prev.rooms, { ...room, id }],
      }));
      return id;
    },
    [updateFloorPlan]
  );

  const updateRoom = useCallback(
    (roomId: string, updates: Partial<Room>) => {
      updateFloorPlan((prev) => ({
        ...prev,
        rooms: prev.rooms.map((room) =>
          room.id === roomId ? { ...room, ...updates } : room
        ),
      }));
    },
    [updateFloorPlan]
  );

  const deleteRoom = useCallback(
    (roomId: string) => {
      updateFloorPlan((prev) => ({
        ...prev,
        rooms: prev.rooms.filter((room) => room.id !== roomId),
      }));
    },
    [updateFloorPlan]
  );
  // ----------------------------
  // Room
  // ----------------------------

  // ----------------------------
  // Event
  // ----------------------------
  const updateEventDetails = useCallback(
    (updates: Partial<EventDetails>) => {
      updateFloorPlan((prev) => ({
        ...prev,
        eventDetails: { ...prev.eventDetails, ...updates },
      }));
    },
    [updateFloorPlan]
  );
  // ----------------------------
  // Event
  // ----------------------------

  // ----------------------------
  // Window and Door delete Logic
  // ----------------------------
  const deleteDoor = useCallback(
    (doorId: string) => {
      updateFloorPlan((prev) => ({
        ...prev,
        walls: prev.walls.map((wall) => ({
          ...wall,
          doors: wall.doors.filter((d) => d.id !== doorId),
        })),
      }));
    },
    [updateFloorPlan]
  );

  const deleteWindow = useCallback(
    (windowId: string) => {
      updateFloorPlan((prev) => ({
        ...prev,
        walls: prev.walls.map((wall) => ({
          ...wall,
          windows: wall.windows.filter((w) => w.id !== windowId),
        })),
      }));
    },
    [updateFloorPlan]
  );
  // ----------------------------
  // Window and Door delete Logic
  // ----------------------------

  return {
    floorPlan: present,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    undo,
    redo,
    addWall,
    updateWall,
    deleteWall,
    deleteDoor,
    deleteWindow,
    addFurniture,
    updateFurniture,
    moveFurniture,
    rotateFurniture,
    deleteFurniture,
    deleteFurnitureItems,
    addRoom,
    updateRoom,
    deleteRoom,
    updateEventDetails,
    updateCanvasSettings,
    toggleLock,
    loadFloorPlan,
    resetFloorPlan,
    updateFloorPlanName,
  };
};
