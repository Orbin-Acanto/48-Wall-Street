'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { FloorPlanCanvas } from '@/components/FloorPlanEditor/Canvas/FloorPlanCanvas';
import { EventDetailsModal } from '@/components/FloorPlanEditor/Modals/EventDetailsModal';
import { ExportImportModal } from '@/components/FloorPlanEditor/Modals/ExportImportModal';
import { WallPropertiesModal } from '@/components/FloorPlanEditor/Modals/WallPropertiesModal';
import { PropertiesPanel } from '@/components/FloorPlanEditor/Panels/PropertiesPanel';
import { AudioVisualsSidebar } from '@/components/FloorPlanEditor/Sidebars/AudioVisualsSidebar';
import { CateringSidebar } from '@/components/FloorPlanEditor/Sidebars/CateringSidebar';
import { FurnitureSidebar } from '@/components/FloorPlanEditor/Sidebars/FurnitureSidebar';
import { TopToolbar } from '@/components/FloorPlanEditor/Toolbars/TopToolbar';
import { MobileWarning } from '@/components/Mobilewarning';
import { useFloorPlanState } from '@/hooks/useFloorPlanState';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { Tool } from '@/types/floorplan.types';
import { exportToJSON, importFromJSON } from '@/utils/exportUtils';

type SidebarType = 'furniture' | 'av' | 'catering' | null;
type ModalType = 'event' | 'wall' | 'export' | null;

export const FloorPlanEditor: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileWarning />;
  }
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
    updateEventDetails,
    updateCanvasSettings,
    toggleLock,
    loadFloorPlan,
    resetFloorPlan,
  } = useFloorPlanState();

  const [selectedTool, setSelectedTool] = useState<Tool>('select');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedItemType, setSelectedItemType] = useState<
    'wall' | 'furniture' | 'room' | null
  >(null);
  const [activeSidebar, setActiveSidebar] = useState<SidebarType>('furniture');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(true);

  const handleItemSelect = useCallback(
    (id: string | null, type: 'wall' | 'furniture' | 'room') => {
      setSelectedItemId(id);
      setSelectedItemType(id ? type : null);
    },
    []
  );

  const handleWallCreate = useCallback(
    (start: any, end: any) => {
      const length = Math.sqrt(
        Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
      );
      const lengthInFeet = length / floorPlan.canvasSettings.scale;

      addWall({
        start,
        end,
        thickness: 6,
        lengthInFeet,
        lengthInInches: lengthInFeet * 12,
        doors: [],
        windows: [],
      });
    },
    [addWall, floorPlan.canvasSettings.scale]
  );

  const handleFurnitureDrop = useCallback(
    (libraryItemId: string, position: any) => {
      const libraryItem = findLibraryItem(libraryItemId);
      if (!libraryItem) return;

      addFurniture({
        type: libraryItem.type,
        category: libraryItem.category,
        name: libraryItem.name,
        position,
        rotation: 0,
        dimensions: libraryItem.defaultDimensions,
        svgPath: libraryItem.svgPath,
        locked: false,
        zIndex: 1,
      });
    },
    [addFurniture]
  );

  const handleDelete = useCallback(() => {
    if (!selectedItemId) return;

    if (selectedItemType === 'wall' && !floorPlan.isLocked) {
      deleteWall(selectedItemId);
    } else if (selectedItemType === 'furniture') {
      deleteFurniture(selectedItemId);
    }

    setSelectedItemId(null);
    setSelectedItemType(null);
  }, [
    selectedItemId,
    selectedItemType,
    floorPlan.isLocked,
    deleteWall,
    deleteFurniture,
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
      updateCanvasSettings({ showGrid: !floorPlan.canvasSettings.showGrid }),
    onToggleDimensions: () =>
      updateCanvasSettings({
        showDimensions: !floorPlan.canvasSettings.showDimensions,
      }),
  });

  const selectedItem = selectedItemId
    ? selectedItemType === 'wall'
      ? floorPlan.walls.find((w) => w.id === selectedItemId)
      : selectedItemType === 'furniture'
        ? floorPlan.furniture.find((f) => f.id === selectedItemId)
        : null
    : null;

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
          updateCanvasSettings({ showGrid: !floorPlan.canvasSettings.showGrid })
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
              onClick={() =>
                setActiveSidebar(
                  activeSidebar === 'furniture' ? null : 'furniture'
                )
              }
              className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                activeSidebar === 'furniture'
                  ? 'bg-blue-500 text-white'
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
              onClick={() =>
                setActiveSidebar(activeSidebar === 'av' ? null : 'av')
              }
              className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                activeSidebar === 'av'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              title="Audio/Visual"
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
              onClick={() =>
                setActiveSidebar(
                  activeSidebar === 'catering' ? null : 'catering'
                )
              }
              className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors ${
                activeSidebar === 'catering'
                  ? 'bg-blue-500 text-white'
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
          <FloorPlanCanvas
            floorPlan={floorPlan}
            selectedTool={selectedTool}
            selectedItemId={selectedItemId}
            onItemSelect={handleItemSelect}
            onWallCreate={handleWallCreate}
            onFurnitureMove={moveFurniture}
            onFurnitureDrop={handleFurnitureDrop}
          />
        </div>

        {showPropertiesPanel && (
          <PropertiesPanel
            selectedItem={selectedItem}
            selectedItemType={selectedItemType}
            isLocked={floorPlan.isLocked}
            onUpdate={(updates) => {
              if (selectedItemId && selectedItemType === 'wall') {
                updateWall(selectedItemId, updates);
              } else if (selectedItemId && selectedItemType === 'furniture') {
                updateFurniture(selectedItemId, updates);
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
          isOpen={true}
          eventDetails={floorPlan.eventDetails}
          onSave={(details) => {
            updateEventDetails(details);
            setActiveModal(null);
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'wall' &&
        selectedItemId &&
        selectedItemType === 'wall' && (
          <WallPropertiesModal
            isOpen={true}
            wall={floorPlan.walls.find((w) => w.id === selectedItemId)!}
            onSave={(updates) => {
              updateWall(selectedItemId, updates);
              setActiveModal(null);
            }}
            onClose={() => setActiveModal(null)}
          />
        )}

      {activeModal === 'export' && (
        <ExportImportModal
          isOpen={true}
          floorPlan={floorPlan}
          onImport={handleLoad}
          onClose={() => setActiveModal(null)}
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

function findLibraryItem(id: string): any {
  const { FURNITURE_LIBRARY } = require('@/constants/furnitureLibrary');
  const { AV_EQUIPMENT_LIBRARY } = require('@/constants/avEquipment');
  const { CATERING_LIBRARY } = require('@/constants/cateringStations');

  return [
    ...FURNITURE_LIBRARY,
    ...AV_EQUIPMENT_LIBRARY,
    ...CATERING_LIBRARY,
  ].find((item) => item.id === id);
}
