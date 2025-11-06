import { FurnitureItem, Wall } from '@/types/floorplan.types';
import { formatFeetAndInches } from '@/utils/conversionUtils';
import React, { useState } from 'react';

interface PropertiesPanelProps {
  selectedItem: Wall | FurnitureItem | null | undefined;
  selectedItemType: 'wall' | 'furniture' | 'room' | null;
  isLocked: boolean;
  onUpdate: (updates: any) => void;
  onRotate: (rotation: number) => void;
  onDelete: () => void;
  onClose: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedItem,
  selectedItemType,
  isLocked,
  onUpdate,
  onRotate,
  onDelete,
  onClose,
}) => {
  if (!selectedItem) {
    return (
      <div className="flex w-80 flex-col border-l border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
          <h3 className="text-lg font-semibold text-gray-900">Properties</h3>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 items-center justify-center p-8">
          <div className="text-center text-gray-400">
            <svg
              className="mx-auto mb-4 h-16 w-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm">No item selected</p>
            <p className="mt-1 text-xs">Select an item to view properties</p>
          </div>
        </div>
      </div>
    );
  }

  const renderWallProperties = (wall: Wall) => (
    <>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Length
          </label>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-lg font-semibold text-gray-900">
              {formatFeetAndInches(wall.lengthInInches)}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {wall.lengthInFeet.toFixed(2)} feet
            </p>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Thickness
          </label>
          <input
            type="number"
            value={wall.thickness}
            onChange={(e) =>
              onUpdate({ thickness: parseFloat(e.target.value) || 6 })
            }
            disabled={isLocked}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
            min="1"
            max="12"
          />
          <p className="mt-1 text-xs text-gray-500">Thickness in pixels</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Doors
          </label>
          <div className="space-y-2">
            {wall.doors.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No doors</p>
            ) : (
              wall.doors.map((door) => (
                <div
                  key={door.id}
                  className="rounded border border-gray-200 bg-gray-50 p-2"
                >
                  <p className="text-xs font-medium">{door.style} door</p>
                  <p className="text-xs text-gray-500">{door.width}" wide</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Windows
          </label>
          <div className="space-y-2">
            {wall.windows.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No windows</p>
            ) : (
              wall.windows.map((window) => (
                <div
                  key={window.id}
                  className="rounded border border-gray-200 bg-gray-50 p-2"
                >
                  <p className="text-xs font-medium">{window.style} window</p>
                  <p className="text-xs text-gray-500">
                    {window.width}" × {window.height}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );

  const renderFurnitureProperties = (furniture: FurnitureItem) => (
    <>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Name
          </label>
          <p className="text-base font-medium text-gray-900">
            {furniture.name}
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Category
          </label>
          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
            {furniture.category}
          </span>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Type
          </label>
          <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800">
            {furniture.type}
          </span>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Dimensions
          </label>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-base font-semibold text-gray-900">
              {furniture.dimensions.width}" × {furniture.dimensions.height}"
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Width × Height (inches)
            </p>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Position
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded bg-gray-50 p-2">
              <p className="text-xs text-gray-500">X</p>
              <p className="text-sm font-medium">
                {Math.round(furniture.position.x)}px
              </p>
            </div>
            <div className="rounded bg-gray-50 p-2">
              <p className="text-xs text-gray-500">Y</p>
              <p className="text-sm font-medium">
                {Math.round(furniture.position.y)}px
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Rotation
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={furniture.rotation}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                onRotate(value % 360);
              }}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              step="15"
            />
            <span className="flex items-center text-sm text-gray-500">°</span>
          </div>

          <div className="mt-2 grid grid-cols-4 gap-2">
            {[0, 90, 180, 270].map((angle) => (
              <button
                key={angle}
                onClick={() => onRotate(angle)}
                className="rounded bg-gray-100 px-2 py-1 text-xs font-medium transition-colors hover:bg-gray-200"
              >
                {angle}°
              </button>
            ))}
          </div>

          <div className="mt-2 flex gap-2">
            <button
              onClick={() => onRotate((furniture.rotation - 15 + 360) % 360)}
              className="flex-1 rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              ↶ -15°
            </button>
            <button
              onClick={() => onRotate((furniture.rotation + 15) % 360)}
              className="flex-1 rounded-lg bg-blue-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              +15° ↷
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex w-80 flex-col border-l border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
        <h3 className="text-lg font-semibold text-gray-900">Properties</h3>
        <button
          onClick={onClose}
          className="text-gray-400 transition-colors hover:text-gray-600"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4 border-b border-gray-200 pb-4">
          <div className="mb-2 flex items-center gap-2">
            {selectedItemType === 'wall' && (
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5z"
                />
              </svg>
            )}
            {selectedItemType === 'furniture' && (
              <svg
                className="h-5 w-5 text-gray-600"
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
            )}
            <h4 className="text-sm font-semibold text-gray-700 uppercase">
              {selectedItemType}
            </h4>
          </div>
        </div>

        {selectedItemType === 'wall' &&
          renderWallProperties(selectedItem as Wall)}
        {selectedItemType === 'furniture' &&
          renderFurnitureProperties(selectedItem as FurnitureItem)}
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-200 bg-gray-50 p-4">
        <button
          onClick={onDelete}
          disabled={selectedItemType === 'wall' && isLocked}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete {selectedItemType}
        </button>
        {selectedItemType === 'wall' && isLocked && (
          <p className="mt-2 text-center text-xs text-gray-500">
            Unlock floor plan to delete walls
          </p>
        )}
      </div>
    </div>
  );
};
