import React from 'react';
import {
  FurnitureItem,
  Room,
  SelectedType,
  Wall,
  DoorWindow,
} from '@/types/floorplan.types';
import { formatFeetAndInches } from '@/utils/conversionUtils';

interface PropertiesPanelProps {
  selectedItem: Wall | FurnitureItem | Room | DoorWindow | null;
  selectedItemType: SelectedType;
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

  const doorStyles: DoorWindow['style'][] = [
    'single',
    'double',
    'sliding',
    'french',
  ];

  const windowStyles: DoorWindow['style'][] = [
    'single',
    'double',
    'bay',
    'casement',
  ];

  const clampNumber = (
    value: any,
    fallback: number,
    min?: number,
    max?: number
  ) => {
    let n = typeof value === 'number' ? value : parseFloat(value);
    if (Number.isNaN(n)) n = fallback;
    if (typeof min === 'number') n = Math.max(min, n);
    if (typeof max === 'number') n = Math.min(max, n);
    return n;
  };

  const renderWallProperties = (wall: Wall) => {
    const handleDoorChange = (doorId: string, updates: Partial<DoorWindow>) => {
      const updatedDoors = wall.doors.map((door) =>
        door.id === doorId ? { ...door, ...updates } : door
      );
      onUpdate({ doors: updatedDoors });
    };

    const handleWindowChange = (
      windowId: string,
      updates: Partial<DoorWindow>
    ) => {
      const updatedWindows = wall.windows.map((win) =>
        win.id === windowId ? { ...win, ...updates } : win
      );
      onUpdate({ windows: updatedWindows });
    };

    return (
      <div className="space-y-6">
        {/* Length */}
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

        {/* Thickness */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Thickness
          </label>
          <input
            type="number"
            value={wall.thickness}
            onChange={(e) =>
              onUpdate({
                thickness: clampNumber(e.target.value, wall.thickness, 1, 24),
              })
            }
            disabled={isLocked}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
            min={1}
            max={24}
          />
          <p className="mt-1 text-xs text-gray-500">
            Thickness in pixels (visual wall line weight)
          </p>
        </div>

        {/* Doors on this wall */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Doors on this wall
          </label>
          <div className="space-y-2">
            {wall.doors.length === 0 ? (
              <p className="text-sm text-gray-400 italic">
                No doors. Use the Door tool and click on this wall to add one.
              </p>
            ) : (
              wall.doors.map((door) => (
                <div
                  key={door.id}
                  className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-700">
                      Door • {door.style}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Pos: {(door.position * 100).toFixed(0)}%
                    </p>
                  </div>

                  {/* Style */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500">Style</span>
                    <select
                      value={door.style}
                      onChange={(e) =>
                        handleDoorChange(door.id, {
                          style: e.target.value as DoorWindow['style'],
                        })
                      }
                      disabled={isLocked}
                      className="flex-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                    >
                      {doorStyles.map((style) => (
                        <option key={style} value={style}>
                          {style}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Width / Height */}
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-gray-500">
                        Width (")
                      </span>
                      <input
                        type="number"
                        value={door.width}
                        onChange={(e) =>
                          handleDoorChange(door.id, {
                            width: clampNumber(e.target.value, door.width, 12),
                          })
                        }
                        disabled={isLocked}
                        className="mt-0.5 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                        min={12}
                        max={120}
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500">
                        Height (")
                      </span>
                      <input
                        type="number"
                        value={door.height}
                        onChange={(e) =>
                          handleDoorChange(door.id, {
                            height: clampNumber(
                              e.target.value,
                              door.height,
                              60
                            ),
                          })
                        }
                        disabled={isLocked}
                        className="mt-0.5 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                        min={60}
                        max={120}
                      />
                    </div>
                  </div>

                  {/* Position along wall */}
                  <div className="mt-1">
                    <span className="text-[10px] text-gray-500">
                      Position along wall
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={door.position}
                      onChange={(e) =>
                        handleDoorChange(door.id, {
                          position: parseFloat(e.target.value),
                        })
                      }
                      disabled={isLocked}
                      className="mt-0.5 h-1 w-full cursor-pointer appearance-none rounded-full bg-gray-300"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Windows on this wall */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Windows on this wall
          </label>
          <div className="space-y-2">
            {wall.windows.length === 0 ? (
              <p className="text-sm text-gray-400 italic">
                No windows. Use the Window tool and click on this wall to add
                one.
              </p>
            ) : (
              wall.windows.map((window) => (
                <div
                  key={window.id}
                  className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-2"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-700">
                      Window • {window.style}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Pos: {(window.position * 100).toFixed(0)}%
                    </p>
                  </div>

                  {/* Style */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500">Style</span>
                    <select
                      value={window.style}
                      onChange={(e) =>
                        handleWindowChange(window.id, {
                          style: e.target.value as DoorWindow['style'],
                        })
                      }
                      disabled={isLocked}
                      className="flex-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                    >
                      {windowStyles.map((style) => (
                        <option key={style} value={style}>
                          {style}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Width / Height */}
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] text-gray-500">
                        Width (")
                      </span>
                      <input
                        type="number"
                        value={window.width}
                        onChange={(e) =>
                          handleWindowChange(window.id, {
                            width: clampNumber(
                              e.target.value,
                              window.width,
                              12
                            ),
                          })
                        }
                        disabled={isLocked}
                        className="mt-0.5 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                        min={12}
                        max={200}
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500">
                        Height (")
                      </span>
                      <input
                        type="number"
                        value={window.height}
                        onChange={(e) =>
                          handleWindowChange(window.id, {
                            height: clampNumber(
                              e.target.value,
                              window.height,
                              12
                            ),
                          })
                        }
                        disabled={isLocked}
                        className="mt-0.5 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                        min={12}
                        max={200}
                      />
                    </div>
                  </div>

                  {/* Position along wall */}
                  <div className="mt-1">
                    <span className="text-[10px] text-gray-500">
                      Position along wall
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={window.position}
                      onChange={(e) =>
                        handleWindowChange(window.id, {
                          position: parseFloat(e.target.value),
                        })
                      }
                      disabled={isLocked}
                      className="mt-0.5 h-1 w-full cursor-pointer appearance-none rounded-full bg-gray-300"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderFurnitureProperties = (furniture: FurnitureItem) => (
    <div className="space-y-4">
      {/* Name */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Name
        </label>
        <p className="text-base font-medium text-gray-900">{furniture.name}</p>
      </div>

      {/* Category */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Category
        </label>
        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
          {furniture.category}
        </span>
      </div>

      {/* Type */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Type
        </label>
        <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800">
          {furniture.type}
        </span>
      </div>

      {/* Dimensions */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Dimensions
        </label>
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="text-base font-semibold text-gray-900">
            {furniture.dimensions.width}" × {furniture.dimensions.height}"
          </p>
          <p className="mt-1 text-xs text-gray-500">Width × Height (inches)</p>
        </div>
      </div>

      {/* Position */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Position
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded bg-gray-50 p-2">
            <p className="text-xs text-gray-500">X</p>
            <p className="text-sm font-medium text-gray-900">
              {Math.round(furniture.position.x)}px
            </p>
          </div>
          <div className="rounded bg-gray-50 p-2">
            <p className="text-xs text-gray-500">Y</p>
            <p className="text-sm font-medium text-gray-900">
              {Math.round(furniture.position.y)}px
            </p>
          </div>
        </div>
      </div>

      {/* Rotation */}
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
              onRotate(((value % 360) + 360) % 360);
            }}
            className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            step={15}
          />
          <span className="flex items-center text-sm text-gray-500">°</span>
        </div>

        <div className="mt-2 grid grid-cols-4 gap-2">
          {[0, 90, 180, 270].map((angle) => (
            <button
              key={angle}
              onClick={() => onRotate(angle)}
              className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              {angle}°
            </button>
          ))}
        </div>

        <div className="mt-2 flex gap-2">
          <button
            onClick={() =>
              onRotate((((furniture.rotation - 15) % 360) + 360) % 360)
            }
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
  );

  const renderDoorProperties = (door: DoorWindow) => (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Door Style
        </label>
        <select
          value={door.style}
          onChange={(e) =>
            onUpdate({ style: e.target.value as DoorWindow['style'] })
          }
          disabled={isLocked}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
        >
          {doorStyles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Width (")
          </label>
          <input
            type="number"
            value={door.width}
            onChange={(e) =>
              onUpdate({
                width: clampNumber(e.target.value, door.width, 12, 120),
              })
            }
            disabled={isLocked}
            className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Height (")
          </label>
          <input
            type="number"
            value={door.height}
            onChange={(e) =>
              onUpdate({
                height: clampNumber(e.target.value, door.height, 60, 120),
              })
            }
            disabled={isLocked}
            className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-700">
          Position along wall
        </label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={door.position}
          onChange={(e) => onUpdate({ position: parseFloat(e.target.value) })}
          disabled={isLocked}
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-gray-300"
        />
        <p className="mt-1 text-[10px] text-gray-500">
          {(door.position * 100).toFixed(0)}% from wall start
        </p>
      </div>
    </div>
  );

  const renderWindowProperties = (window: DoorWindow) => (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Window Style
        </label>
        <select
          value={window.style}
          onChange={(e) =>
            onUpdate({ style: e.target.value as DoorWindow['style'] })
          }
          disabled={isLocked}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
        >
          {windowStyles.map((style) => (
            <option key={style} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Width (")
          </label>
          <input
            type="number"
            value={window.width}
            onChange={(e) =>
              onUpdate({
                width: clampNumber(e.target.value, window.width, 12, 200),
              })
            }
            disabled={isLocked}
            className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Height (")
          </label>
          <input
            type="number"
            value={window.height}
            onChange={(e) =>
              onUpdate({
                height: clampNumber(e.target.value, window.height, 12, 200),
              })
            }
            disabled={isLocked}
            className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-gray-700">
          Position along wall
        </label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={window.position}
          onChange={(e) => onUpdate({ position: parseFloat(e.target.value) })}
          disabled={isLocked}
          className="h-1 w-full cursor-pointer appearance-none rounded-full bg-gray-300"
        />
        <p className="mt-1 text-[10px] text-gray-500">
          {(window.position * 100).toFixed(0)}% from wall start
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex w-80 flex-col border-l border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-2">
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
                d="M4 5h7v7H4zM13 5h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"
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
                d="M3 9.5L12 4l9 5.5v9L12 24l-9-5.5v-9z"
              />
            </svg>
          )}
          {selectedItemType === 'door' && (
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
                d="M8 3h8l2 4v14H6V7z"
              />
            </svg>
          )}
          {selectedItemType === 'window' && (
            <svg
              className="h-5 w-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <rect
                x={4}
                y={4}
                width={16}
                height={16}
                rx={1}
                ry={1}
                strokeWidth={2}
              />
              <line x1={12} y1={4} x2={12} y2={20} strokeWidth={2} />
              <line x1={4} y1={12} x2={20} y2={12} strokeWidth={2} />
            </svg>
          )}
          <h3 className="text-lg font-semibold text-gray-900">Properties</h3>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {selectedItemType === 'wall' &&
          renderWallProperties(selectedItem as Wall)}

        {selectedItemType === 'furniture' &&
          renderFurnitureProperties(selectedItem as FurnitureItem)}

        {selectedItemType === 'door' &&
          renderDoorProperties(selectedItem as DoorWindow)}

        {selectedItemType === 'window' &&
          renderWindowProperties(selectedItem as DoorWindow)}
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-200 bg-gray-50 p-4">
        <button
          onClick={onDelete}
          disabled={selectedItemType === 'wall' && isLocked}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
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
