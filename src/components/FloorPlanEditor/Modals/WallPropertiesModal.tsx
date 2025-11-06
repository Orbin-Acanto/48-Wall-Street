import { DoorWindow, Wall } from '@/types/floorplan.types';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface WallPropertiesModalProps {
  isOpen: boolean;
  wall: Wall;
  onSave: (updates: Partial<Wall>) => void;
  onClose: () => void;
}

export const WallPropertiesModal: React.FC<WallPropertiesModalProps> = ({
  isOpen,
  wall,
  onSave,
  onClose,
}) => {
  const [doors, setDoors] = useState<DoorWindow[]>(wall.doors);
  const [windows, setWindows] = useState<DoorWindow[]>(wall.windows);
  const [thickness, setThickness] = useState(wall.thickness);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ doors, windows, thickness });
  };

  const addDoor = () => {
    const newDoor: DoorWindow = {
      id: uuidv4(),
      type: 'door',
      position: 0.5,
      width: 36,
      height: 80,
      style: 'single',
    };
    setDoors([...doors, newDoor]);
  };

  const addWindow = () => {
    const newWindow: DoorWindow = {
      id: uuidv4(),
      type: 'window',
      position: 0.5,
      width: 48,
      height: 60,
      style: 'single',
    };
    setWindows([...windows, newWindow]);
  };

  const updateDoor = (id: string, updates: Partial<DoorWindow>) => {
    setDoors(doors.map((d) => (d.id === id ? { ...d, ...updates } : d)));
  };

  const updateWindow = (id: string, updates: Partial<DoorWindow>) => {
    setWindows(windows.map((w) => (w.id === id ? { ...w, ...updates } : w)));
  };

  const removeDoor = (id: string) => {
    setDoors(doors.filter((d) => d.id !== id));
  };

  const removeWindow = (id: string) => {
    setWindows(windows.filter((w) => w.id !== id));
  };

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

  return (
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <svg
                className="h-6 w-6 text-blue-600"
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
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Wall Properties
              </h2>
              <p className="text-sm text-gray-500">
                Edit wall dimensions and add doors/windows
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <form
          onSubmit={handleSubmit}
          className="max-h-[calc(90vh-140px)] overflow-y-auto"
        >
          <div className="space-y-6 px-6 py-6">
            {/* Wall Info */}
            <div className="rounded-lg bg-gray-50 p-4">
              <h4 className="mb-2 text-sm font-semibold text-gray-700">
                Wall Information
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Length:</span>
                  <span className="ml-2 font-medium">
                    {wall.lengthInFeet.toFixed(2)} ft
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Inches:</span>
                  <span className="ml-2 font-medium">
                    {wall.lengthInInches.toFixed(0)} in
                  </span>
                </div>
              </div>
            </div>

            {/* Thickness */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Wall Thickness (pixels)
              </label>
              <input
                type="number"
                value={thickness}
                onChange={(e) => setThickness(parseFloat(e.target.value) || 6)}
                min="1"
                max="12"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Doors Section */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Doors
                </label>
                <button
                  type="button"
                  onClick={addDoor}
                  className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100"
                >
                  + Add Door
                </button>
              </div>

              <div className="space-y-3">
                {doors.length === 0 ? (
                  <p className="py-4 text-center text-sm text-gray-400 italic">
                    No doors added
                  </p>
                ) : (
                  doors.map((door) => (
                    <div
                      key={door.id}
                      className="space-y-3 rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-medium text-gray-900">
                          Door
                        </h5>
                        <button
                          type="button"
                          onClick={() => removeDoor(door.id)}
                          className="text-sm text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="mb-1 block text-xs text-gray-500">
                            Style
                          </label>
                          <select
                            value={door.style}
                            onChange={(e) =>
                              updateDoor(door.id, {
                                style: e.target.value as any,
                              })
                            }
                            className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          >
                            {doorStyles.map((style) => (
                              <option key={style} value={style}>
                                {style}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="mb-1 block text-xs text-gray-500">
                            Width (in)
                          </label>
                          <input
                            type="number"
                            value={door.width}
                            onChange={(e) =>
                              updateDoor(door.id, {
                                width: parseFloat(e.target.value) || 36,
                              })
                            }
                            min="24"
                            max="96"
                            className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs text-gray-500">
                            Position
                          </label>
                          <input
                            type="range"
                            value={door.position}
                            onChange={(e) =>
                              updateDoor(door.id, {
                                position: parseFloat(e.target.value),
                              })
                            }
                            min="0"
                            max="1"
                            step="0.01"
                            className="w-full"
                          />
                          <span className="text-xs text-gray-500">
                            {Math.round(door.position * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Windows Section */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Windows
                </label>
                <button
                  type="button"
                  onClick={addWindow}
                  className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100"
                >
                  + Add Window
                </button>
              </div>

              <div className="space-y-3">
                {windows.length === 0 ? (
                  <p className="py-4 text-center text-sm text-gray-400 italic">
                    No windows added
                  </p>
                ) : (
                  windows.map((window) => (
                    <div
                      key={window.id}
                      className="space-y-3 rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="text-sm font-medium text-gray-900">
                          Window
                        </h5>
                        <button
                          type="button"
                          onClick={() => removeWindow(window.id)}
                          className="text-sm text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-3">
                        <div>
                          <label className="mb-1 block text-xs text-gray-500">
                            Style
                          </label>
                          <select
                            value={window.style}
                            onChange={(e) =>
                              updateWindow(window.id, {
                                style: e.target.value as any,
                              })
                            }
                            className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          >
                            {windowStyles.map((style) => (
                              <option key={style} value={style}>
                                {style}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="mb-1 block text-xs text-gray-500">
                            Width (in)
                          </label>
                          <input
                            type="number"
                            value={window.width}
                            onChange={(e) =>
                              updateWindow(window.id, {
                                width: parseFloat(e.target.value) || 48,
                              })
                            }
                            min="12"
                            max="96"
                            className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs text-gray-500">
                            Height (in)
                          </label>
                          <input
                            type="number"
                            value={window.height}
                            onChange={(e) =>
                              updateWindow(window.id, {
                                height: parseFloat(e.target.value) || 60,
                              })
                            }
                            min="12"
                            max="96"
                            className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs text-gray-500">
                            Position
                          </label>
                          <input
                            type="range"
                            value={window.position}
                            onChange={(e) =>
                              updateWindow(window.id, {
                                position: parseFloat(e.target.value),
                              })
                            }
                            min="0"
                            max="1"
                            step="0.01"
                            className="w-full"
                          />
                          <span className="text-xs text-gray-500">
                            {Math.round(window.position * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
