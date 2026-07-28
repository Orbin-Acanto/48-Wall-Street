import { useState, useCallback, useRef, useEffect } from 'react';
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
import {
  loadSavedFloorPlan,
  saveFloorPlan,
  clearSavedFloorPlan,
} from '../utils/floorPlanStorage';

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
    width: 3200,
    height: 2400,
    scale: 20,
    gridSize: 20,
    showGrid: true,
    showDimensions: false,
    snapToGrid: true,
    backgroundColor: '#FFFFFF',
  },
  isLocked: false,
});

// Maximum number of undo steps retained. Older states are discarded so a long
// editing session cannot grow memory without bound.
const MAX_HISTORY = 50;

export const useFloorPlanState = () => {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: createInitialFloorPlan(),
    future: [],
  });

  // Snapshot of `present` taken at the start of a transient interaction (e.g. a
  // drag). Used to push a single history entry when the interaction commits,
  // instead of one entry per mouse-move frame.
  const pendingCommitBaseRef = useRef<FloorPlanData | null>(null);

  const present = history.present;

  // ----------------------------
  // Persistence: restore on mount, then debounced auto-save
  // ----------------------------
  // `saveEnabled` gates auto-save until the one-time restore has finished, so
  // we never overwrite saved work with the empty initial plan on first mount.
  const [saveEnabled, setSaveEnabled] = useState(false);
  useEffect(() => {
    // Runs once on the client only (never during SSR) to avoid a hydration
    // mismatch — the first client render still matches the server's empty
    // initial plan, then this swaps in the saved one.
    const saved = loadSavedFloorPlan();
    if (saved) {
      setHistory({ past: [], present: saved, future: [] });
    }
    setSaveEnabled(true);
  }, []);

  // Debounced auto-save whenever the present design changes.
  useEffect(() => {
    if (!saveEnabled) return;
    const timer = setTimeout(() => saveFloorPlan(present), 600);
    return () => clearTimeout(timer);
  }, [present, saveEnabled]);

  // ----------------------------
  //Canvas settings
  // ----------------------------
  // `commitToHistory: false` mutates `present` in place without touching the
  // undo stack — used for high-frequency updates during a drag. Call
  // `commitHistory()` once when the interaction ends to record a single step.
  const updateFloorPlan = useCallback(
    (
      updater: (prev: FloorPlanData) => FloorPlanData,
      commitToHistory: boolean = true
    ) => {
      setHistory((prev) => {
        const newPresent = updater(prev.present);
        const stamped = { ...newPresent, updatedAt: new Date().toISOString() };

        if (!commitToHistory) {
          // Remember where this transient run started so the eventual commit
          // records the pre-drag state as the single undo target.
          if (pendingCommitBaseRef.current === null) {
            pendingCommitBaseRef.current = prev.present;
          }
          return { ...prev, present: stamped, future: [] };
        }

        return {
          past: [...prev.past, prev.present].slice(-MAX_HISTORY),
          present: stamped,
          future: [],
        };
      });
    },
    []
  );

  // Push a single history entry representing everything changed transiently
  // since the transient run began. No-op if nothing transient happened.
  const commitHistory = useCallback(() => {
    const base = pendingCommitBaseRef.current;
    pendingCommitBaseRef.current = null;
    if (base === null) return;

    setHistory((prev) => {
      // Nothing actually changed (e.g. a click that didn't move anything).
      if (prev.present === base) return prev;
      return {
        past: [...prev.past, base].slice(-MAX_HISTORY),
        present: prev.present,
        future: [],
      };
    });
  }, []);

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

  // Resets to a blank plan and clears the auto-saved design. The confirmation
  // dialog is owned by the UI (in-app modal), not this hook.
  const resetFloorPlan = useCallback(() => {
    clearSavedFloorPlan();
    setHistory({
      past: [],
      present: createInitialFloorPlan(),
      future: [],
    });
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

  // Transient move for drag frames: updates position without pushing history.
  // Pair with `commitHistory()` on drag end to record one undo step.
  const moveFurnitureTransient = useCallback(
    (furnitureId: string, position: Point) => {
      updateFloorPlan(
        (prev) => ({
          ...prev,
          furniture: prev.furniture.map((item) =>
            item.id === furnitureId ? { ...item, position } : item
          ),
        }),
        false
      );
    },
    [updateFloorPlan]
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

  // Transient room move for drag frames (no history push per frame).
  const moveRoomTransient = useCallback(
    (roomId: string, x: number, y: number) => {
      updateFloorPlan(
        (prev) => ({
          ...prev,
          rooms: prev.rooms.map((room) =>
            room.id === roomId ? { ...room, x, y } : room
          ),
        }),
        false
      );
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
    moveFurnitureTransient,
    rotateFurniture,
    deleteFurniture,
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
    updateFloorPlanName,
  };
};
