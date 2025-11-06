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
    width: 2000,
    height: 1500,
    scale: 20, // 20 pixels per foot
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

  // Wall operations
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

  // Furniture operations
  const addFurniture = useCallback(
    (furniture: Omit<FurnitureItem, 'id'>) => {
      updateFloorPlan((prev) => ({
        ...prev,
        furniture: [...prev.furniture, { ...furniture, id: uuidv4() }],
      }));
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

  // Room operations
  const addRoom = useCallback(
    (room: Omit<Room, 'id'>) => {
      updateFloorPlan((prev) => ({
        ...prev,
        rooms: [...prev.rooms, { ...room, id: uuidv4() }],
      }));
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

  // Event details
  const updateEventDetails = useCallback(
    (updates: Partial<EventDetails>) => {
      updateFloorPlan((prev) => ({
        ...prev,
        eventDetails: { ...prev.eventDetails, ...updates },
      }));
    },
    [updateFloorPlan]
  );

  // Canvas settings
  const updateCanvasSettings = useCallback(
    (updates: Partial<CanvasSettings>) => {
      updateFloorPlan((prev) => ({
        ...prev,
        canvasSettings: { ...prev.canvasSettings, ...updates },
      }));
    },
    [updateFloorPlan]
  );

  // Lock/unlock floor plan
  const toggleLock = useCallback(() => {
    updateFloorPlan((prev) => ({
      ...prev,
      isLocked: !prev.isLocked,
    }));
  }, [updateFloorPlan]);

  // Load floor plan
  const loadFloorPlan = useCallback((data: FloorPlanData) => {
    setHistory({
      past: [],
      present: data,
      future: [],
    });
  }, []);

  // Reset floor plan
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

  // Update floor plan name
  const updateFloorPlanName = useCallback(
    (name: string) => {
      updateFloorPlan((prev) => ({ ...prev, name }));
    },
    [updateFloorPlan]
  );

  // Batch delete
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

  return {
    floorPlan: present,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    undo,
    redo,
    addWall,
    updateWall,
    deleteWall,
    addFurniture,
    updateFurniture,
    deleteFurniture,
    moveFurniture,
    rotateFurniture,
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
