'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';

import { FloorPlanCanvas } from '@/components/FloorPlanEditor/Canvas/FloorPlanCanvas';
import { EventDetailsModal } from '@/components/FloorPlanEditor/Modals/EventDetailsModal';
import { ExportImportModal } from '@/components/FloorPlanEditor/Modals/ExportImportModal';
import { PropertiesPanel } from '@/components/FloorPlanEditor/Panels/PropertiesPanel';

import { AudioVisualsSidebar } from '@/components/FloorPlanEditor/Sidebars/AudioVisualsSidebar';
import { CateringSidebar } from '@/components/FloorPlanEditor/Sidebars/CateringSidebar';
import { FurnitureSidebar } from '@/components/FloorPlanEditor/Sidebars/FurnitureSidebar';

import { TopToolbar } from '@/components/FloorPlanEditor/Toolbars/TopToolbar';
import { DrawingTools } from '@/components/FloorPlanEditor/Toolbars/DrawingTools';

import { MobileWarning } from '@/components/Mobilewarning';

import { useFloorPlanState } from '@/hooks/useFloorPlanState';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

import {
  Tool,
  Point,
  Wall as WallType,
  FurnitureItem,
  SelectedType,
} from '@/types/floorplan.types';
import { v4 as uuidv4 } from 'uuid';
import { DoorWindow } from '@/types/floorplan.types';
import { exportToJSON, importFromJSON } from '@/utils/exportUtils';
import { calculateDistance } from '@/utils/geometryUtils';
import { isValidWall, isValidFurnitureItem } from '@/utils/validationUtils';
import { feetToInches } from '@/utils/conversionUtils';

import { FURNITURE_LIBRARY } from '@/constants/furnitureLibrary';
import { AV_EQUIPMENT_LIBRARY } from '@/constants/avEquipment';
import { CATERING_LIBRARY } from '@/constants/cateringStations';

type SidebarType = 'furniture' | 'av' | 'catering' | null;
type ModalType = 'event' | 'wall' | 'export' | null;

interface LibraryItemLike {
  id: string;
  type: string;
  category: string;
  name: string;
  defaultDimensions: FurnitureItem['dimensions'];
  svgPath: string;
}

const ALL_LIBRARY_ITEMS: LibraryItemLike[] = [
  ...(FURNITURE_LIBRARY as LibraryItemLike[]),
  ...(AV_EQUIPMENT_LIBRARY as LibraryItemLike[]),
  ...(CATERING_LIBRARY as LibraryItemLike[]),
];

const DEFAULT_WALL_THICKNESS = 6; // px

const findLibraryItem = (id: string): LibraryItemLike | undefined =>
  ALL_LIBRARY_ITEMS.find((item) => item.id === id);

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
    addFurniture,
    updateFurniture,
    deleteFurniture,
    moveFurniture,
    rotateFurniture,
    addRoom,
    updateRoom,
    deleteRoom,
    updateEventDetails,
    updateCanvasSettings,
    toggleLock,
    loadFloorPlan,
    resetFloorPlan,
    deleteDoor,
    deleteWindow,
  } = useFloorPlanState();

  const [selectedTool, setSelectedTool] = useState<Tool>('select');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const [activeSidebar, setActiveSidebar] = useState<SidebarType>('furniture');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [showPropertiesPanel, setShowPropertiesPanel] = useState<boolean>(true);

  const [selectedItemType, setSelectedItemType] = useState<SelectedType>(null);
  const [selectedDoorRef, setSelectedDoorRef] = useState<{
    wallId: string;
    doorId: string;
  } | null>(null);
  const [selectedWindowRef, setSelectedWindowRef] = useState<{
    wallId: string;
    windowId: string;
  } | null>(null);

  const selectedItem = useMemo(() => {
    if (!selectedItemId) return null;

    console.log('Computing selectedItem:', {
      selectedItemId,
      selectedItemType,
    });

    if (selectedItemType === 'wall') {
      const wall = floorPlan.walls.find((w) => w.id === selectedItemId);
      console.log('Found wall:', wall);
      return wall || null;
    }

    if (selectedItemType === 'furniture') {
      const furniture = floorPlan.furniture.find(
        (f) => f.id === selectedItemId
      );
      console.log('Found furniture:', furniture);
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

    return null;
  }, [
    selectedItemId,
    selectedItemType,
    selectedDoorRef,
    selectedWindowRef,
    floorPlan.walls,
    floorPlan.furniture,
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

      // Optional safety: validate before committing
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
      setSelectedItemId(id);
      setSelectedItemType(id ? type : null);

      if (type !== 'door') setSelectedDoorRef(null);
      if (type !== 'window') setSelectedWindowRef(null);
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

      const candidate: Omit<FurnitureItem, 'id'> = {
        type: libraryItem.type,
        category: libraryItem.category,
        name: libraryItem.name,
        position,
        rotation: 0,
        dimensions: libraryItem.defaultDimensions,
        baseDimensions: libraryItem.defaultDimensions,
        svgPath: libraryItem.svgPath,
        locked: false,
        zIndex: 1,
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
    [addFurniture]
  );

  const handleDelete = useCallback(() => {
    if (!selectedItemId || !selectedItemType) return;

    if (selectedItemType === 'wall' && !floorPlan.isLocked) {
      deleteWall(selectedItemId);
    } else if (selectedItemType === 'furniture') {
      deleteFurniture(selectedItemId);
    } else if (selectedItemType === 'room') {
      deleteRoom(selectedItemId);
    } else if (selectedItemType === 'door') {
      deleteDoor(selectedItemId);
    } else if (selectedItemType === 'window') {
      deleteWindow(selectedItemId);
    }

    setSelectedItemId(null);
    setSelectedItemType(null);
  }, [
    selectedItemId,
    selectedItemType,
    floorPlan.isLocked,
    deleteWall,
    deleteFurniture,
    deleteRoom,
  ]);

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
      } catch (error) {
        console.error('Failed to load floor plan:', error);
        alert('Failed to load floor plan. Please check the file format.');
      }
    },
    [loadFloorPlan]
  );

  useKeyboardShortcuts({
    onUndo: canUndo ? undo : undefined,
    onRedo: canRedo ? redo : undefined,
    onSave: handleSave,
    onDelete: selectedItemId ? handleDelete : undefined,
    onEscape: () => {
      setSelectedItemId(null);
      setSelectedItemType(null);
      setSelectedTool('select');
    },
    onToggleGrid: () =>
      updateCanvasSettings({
        showGrid: !floorPlan.canvasSettings.showGrid,
      }),
    onToggleDimensions: () =>
      updateCanvasSettings({
        showDimensions: !floorPlan.canvasSettings.showDimensions,
      }),
  });

  const toggleSidebar = (type: SidebarType) => {
    setActiveSidebar((current) => (current === type ? null : type));
  };

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
    <div className="mt-22 flex h-[90vh] flex-col bg-gray-50">
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
        onReset={resetFloorPlan}
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
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex">
          <div className="flex w-16 flex-col items-center space-y-2 bg-gray-800 py-4">
            <button
              onClick={() => toggleSidebar('furniture')}
              className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                activeSidebar === 'furniture'
                  ? 'bg-primary text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Furniture"
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
                  d="M3 9.5L12 4l9 5.5M3 9.5v9l9 5.5m-9-14.5l9 5.5m0 0l9-5.5M12 19v-9.5"
                />
              </svg>
            </button>

            <button
              onClick={() => toggleSidebar('av')}
              className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                activeSidebar === 'av'
                  ? 'bg-primary text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Audio / Visual"
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
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 0112.728 0"
                />
              </svg>
            </button>

            <button
              onClick={() => toggleSidebar('catering')}
              className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                activeSidebar === 'catering'
                  ? 'bg-primary text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Catering"
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </div>

          {activeSidebar === 'furniture' && <FurnitureSidebar />}
          {activeSidebar === 'av' && <AudioVisualsSidebar />}
          {activeSidebar === 'catering' && <CateringSidebar />}
        </div>

        <div className="relative flex-1">
          <DrawingTools
            selectedTool={selectedTool}
            onToolChange={setSelectedTool}
            isLocked={floorPlan.isLocked}
          />

          <FloorPlanCanvas
            floorPlan={floorPlan}
            selectedTool={selectedTool}
            selectedItemId={selectedItemId}
            onItemSelect={handleItemSelect}
            onWallCreate={handleWallCreate}
            onFurnitureMove={moveFurniture}
            onFurnitureDrop={handleFurnitureDrop}
            onAddDoor={addDoorToWall}
            onAddWindow={addWindowToWall}
            onDoorSelect={handleDoorSelect}
            onWindowSelect={handleWindowSelect}
          />
        </div>

        {showPropertiesPanel && (
          <PropertiesPanel
            selectedItem={selectedItem}
            selectedItemType={selectedItemType}
            isLocked={floorPlan.isLocked}
            onUpdate={(updates) => {
              if (!selectedItemId || !selectedItemType) return;

              if (selectedItemType === 'wall') {
                updateWall(selectedItemId, updates as Partial<WallType>);
              } else if (selectedItemType === 'furniture') {
                updateFurniture(
                  selectedItemId,
                  updates as Partial<FurnitureItem>
                );
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
              if (selectedItemId && selectedItemType === 'furniture') {
                rotateFurniture(selectedItemId, rotation);
              }
            }}
            onDelete={handleDelete}
            onClose={() => setShowPropertiesPanel(false)}
          />
        )}
      </div>

      {activeModal === 'event' && (
        <EventDetailsModal
          isOpen
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
        />
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
