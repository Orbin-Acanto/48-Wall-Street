'use client';
import React, { useEffect } from 'react';
import {
  FurnitureItem,
  Room,
  SelectedType,
  Wall,
  DoorWindow,
  LegendItemWithCount,
} from '@/types/floorplan.types';
import { formatFeetAndInches } from '@/utils/conversionUtils';
import {
  Armchair,
  BrickWall,
  DoorClosed,
  Grid2x2,
  Lock,
  LockOpen,
} from 'lucide-react';
import { LEGEND_ITEMS } from '@/data';

interface PropertiesPanelProps {
  selectedItem: Wall | FurnitureItem | Room | DoorWindow | null;
  selectedItemType: SelectedType;
  isLocked: boolean;
  onUpdate: (
    updates:
      | Partial<Wall>
      | Partial<FurnitureItem>
      | Partial<Room>
      | Partial<DoorWindow>
  ) => void;
  onRotate: (rotation: number) => void;
  onDelete: () => void;
  onClose: () => void;
  furnitureItems?: FurnitureItem[];
  pixelsPerFoot?: number;
  onLegendUpdate: (items: LegendItemWithCount[]) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedItem,
  selectedItemType,
  isLocked,
  onUpdate,
  onRotate,
  onDelete,
  furnitureItems = [],
  pixelsPerFoot,
  onLegendUpdate,
}) => {
  const getLegendItems = () => {
    const items: Array<{
      category: string;
      label: string;
      color: string;
      count: number;
      isCustom: boolean;
    }> = [];

    LEGEND_ITEMS.forEach((legendItem) => {
      const count = categoryCounts[legendItem.category] ?? 0;
      if (count > 0) {
        items.push({
          category: legendItem.category,
          label: legendItem.label,
          color: legendItem.color,
          count,
          isCustom: false,
        });
      }
    });

    const customItems = furnitureItems.filter(
      (item) => item.category === 'Customize'
    );

    const customGroups = new Map<
      string,
      { color: string; count: number; items: typeof furnitureItems }
    >();

    customItems.forEach((item) => {
      const key = `${item.customName || 'Custom Table'}-${item.color || '#8B4789'}`;
      const existing = customGroups.get(key);

      if (existing) {
        existing.count += 1;
        existing.items.push(item);
      } else {
        customGroups.set(key, {
          color: item.color || '#8B4789',
          count: 1,
          items: [item],
        });
      }
    });

    customGroups.forEach((data, key) => {
      const name = key.split('-')[0];
      items.push({
        category: name,
        label: name.toUpperCase(),
        color: data.color,
        count: data.count,
        isCustom: true,
      });
    });

    return items;
  };

  const categoryCounts = furnitureItems.reduce<Record<string, number>>(
    (acc, item) => {
      if (item.category === 'Customize') {
        const key = item.customName || 'Custom Table';
        acc[key] = (acc[key] ?? 0) + 1;
      } else {
        const key = item.groupBy || item.category;
        acc[key] = (acc[key] ?? 0) + 1;
      }
      return acc;
    },
    {}
  );

  const allLegendItems = getLegendItems();

  useEffect(() => {
    onLegendUpdate(allLegendItems);
  }, [furnitureItems, onLegendUpdate]);

  if (!selectedItem) {
    return (
      <div className="flex w-80 flex-col border-l border-gray-200 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
          <h3 className="text-lg font-semibold text-gray-900">Plan Legend</h3>
        </div>

        {/* Legend body */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-3">
            <h4 className="text-sm font-semibold tracking-wide text-gray-900">
              LEGEND
            </h4>
            <p className="mt-1 text-xs text-gray-500">
              Overview of key layout elements placed on this floor plan.
            </p>
          </div>

          <div className="space-y-1.5">
            {allLegendItems.map((item, index) => (
              <div
                key={`${item.category}-${item.isCustom ? 'custom' : 'static'}-${index}`}
                className="flex items-center justify-between gap-2 rounded-md border border-gray-100 bg-white px-2.5 py-1.5"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-4 w-4 flex-shrink-0 rounded-sm border border-gray-300"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[11px] font-medium text-gray-800">
                    {item.label}
                  </span>
                  {item.isCustom && (
                    <span className="text-[9px] text-gray-500 italic">
                      (Custom)
                    </span>
                  )}
                </div>

                <span className="text-[10px] font-semibold text-gray-600">
                  {item.count}
                </span>
              </div>
            ))}

            {allLegendItems.length === 0 && (
              <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-4 text-center">
                <p className="text-xs text-gray-500">
                  No items placed yet. Drag items from the sidebar to get
                  started.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 rounded-md border border-gray-100 bg-gray-50 px-3 py-2">
            <p className="text-[10px] text-gray-500">
              Tip: Select any item on the canvas to edit its properties.
            </p>
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
    value: string | number,
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

  // WALL PROPERTIES
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
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[#CBA35C]/60 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
            min={1}
            max={24}
          />
          <p className="mt-1 text-xs text-gray-500">
            Visual wall line weight (pixels)
          </p>
        </div>

        {/* Doors */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Doors on this wall
          </label>
          <div className="space-y-2">
            {wall.doors.length === 0 ? (
              <p className="text-sm text-gray-400 italic">
                No doors. Use the Door tool and click this wall to add one.
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
                      className="flex-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 focus:ring-1 focus:ring-[#CBA35C]/60 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
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
                        Width (&quot;)
                      </span>
                      <input
                        type="number"
                        value={door.width}
                        onChange={(e) =>
                          handleDoorChange(door.id, {
                            width: clampNumber(
                              e.target.value,
                              door.width,
                              12,
                              120
                            ),
                          })
                        }
                        disabled={isLocked}
                        className="mt-0.5 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 focus:ring-1 focus:ring-[#CBA35C]/60 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500">
                        Height (&quot;)
                      </span>
                      <input
                        type="number"
                        value={door.height}
                        onChange={(e) =>
                          handleDoorChange(door.id, {
                            height: clampNumber(
                              e.target.value,
                              door.height,
                              60,
                              120
                            ),
                          })
                        }
                        disabled={isLocked}
                        className="mt-0.5 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 focus:ring-1 focus:ring-[#CBA35C]/60 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  {/* Position */}
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

        {/* Windows */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Windows on this wall
          </label>
          <div className="space-y-2">
            {wall.windows.length === 0 ? (
              <p className="text-sm text-gray-400 italic">
                No windows. Use the Window tool and click this wall to add one.
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
                      className="flex-1 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 focus:ring-1 focus:ring-[#CBA35C]/60 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
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
                        Width (&quot;)
                      </span>
                      <input
                        type="number"
                        value={window.width}
                        onChange={(e) =>
                          handleWindowChange(window.id, {
                            width: clampNumber(
                              e.target.value,
                              window.width,
                              12,
                              200
                            ),
                          })
                        }
                        disabled={isLocked}
                        className="mt-0.5 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 focus:ring-1 focus:ring-[#CBA35C]/60 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500">
                        Height (&quot;)
                      </span>
                      <input
                        type="number"
                        value={window.height}
                        onChange={(e) =>
                          handleWindowChange(window.id, {
                            height: clampNumber(
                              e.target.value,
                              window.height,
                              12,
                              200
                            ),
                          })
                        }
                        disabled={isLocked}
                        className="mt-0.5 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-xs text-gray-900 focus:ring-1 focus:ring-[#CBA35C]/60 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                      />
                    </div>
                  </div>

                  {/* Position */}
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
                      className="h-1 w-full cursor-pointer appearance-none rounded-full bg-gray-300"
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

  // FURNITURE PROPERTIES
  const renderFurnitureProperties = (item: FurnitureItem) => {
    const itemLocked = !!item.locked || isLocked;
    const dims = item.dimensions;
    const isCustomizable = item.category === 'Customize';

    const handleUnitChange = (nextUnit: 'in' | 'ft') => {
      if (nextUnit === dims.unit) return;

      const currentUnit = dims.unit || 'in';

      let width = dims.width;
      let height = dims.height;

      if (currentUnit === 'in' && nextUnit === 'ft') {
        width = +(width / 12).toFixed(2);
        height = +(height / 12).toFixed(2);
      } else if (currentUnit === 'ft' && nextUnit === 'in') {
        width = +(width * 12);
        height = +(height * 12);
      }

      onUpdate({
        dimensions: {
          ...dims,
          width,
          height,
          unit: nextUnit,
        },
      });
    };

    const updatePosition = (axis: 'x' | 'y', value: number | string) => {
      if (itemLocked) return;
      const next = clampNumber(value, item.position[axis], -99999, 99999);
      onUpdate({
        position: {
          ...item.position,
          [axis]: next,
        },
      });
    };

    const nudge = (axis: 'x' | 'y', delta: number) => {
      if (itemLocked) return;
      onUpdate({
        position: {
          ...item.position,
          [axis]: item.position[axis] + delta,
        },
      });
    };

    const updateDimension = (
      key: 'width' | 'height',
      value: number | string
    ) => {
      if (itemLocked) return;
      const next = clampNumber(
        value,
        item.dimensions[key],
        1,
        item.dimensions.unit === 'ft' ? 200 : 2400
      );
      onUpdate({
        dimensions: {
          ...item.dimensions,
          [key]: next,
        },
      });
    };

    // const handleUnitChange = (unit: 'ft' | 'in') => {
    //   if (itemLocked) return;
    //   if (unit === item.dimensions.unit) return;

    //   let { width, height } = item.dimensions;

    //   if (unit === 'ft' && item.dimensions.unit === 'in') {
    //     width = +(width / 12).toFixed(2);
    //     height = +(height / 12).toFixed(2);
    //   } else if (unit === 'in' && item.dimensions.unit === 'ft') {
    //     width = Math.round(width * 12);
    //     height = Math.round(height * 12);
    //   }

    //   onUpdate({
    //     dimensions: {
    //       ...item.dimensions,
    //       unit,
    //       width,
    //       height,
    //     },
    //   });
    // };

    const toggleLock = () => {
      if (isLocked) return;
      onUpdate({ locked: !item.locked });
    };

    const safeRotate = (value: number) => {
      if (itemLocked) return;
      const normalized = ((value % 360) + 360) % 360;
      onRotate(normalized);
    };

    const updateColor = (color: string) => {
      if (itemLocked) return;
      onUpdate({ color });
    };

    const updateCustomName = (customName: string) => {
      if (itemLocked) return;
      onUpdate({ customName });
    };

    return (
      <div className="space-y-5">
        {/* Basic meta */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
              {item.type}
            </p>
            <h4 className="text-base font-semibold text-gray-900">
              {item.customName || item.name}
            </h4>
            <p className="mt-0.5 inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-700">
              {item.category}
            </p>
          </div>
          <button
            type="button"
            onClick={toggleLock}
            className={`inline-flex items-center px-2 py-1 text-[9px] font-semibold`}
          >
            {itemLocked ? (
              <Lock className="h-6 w-6 text-red-500" />
            ) : (
              <LockOpen className="text-dark-black h-6 w-6" />
            )}
          </button>
        </div>

        {isCustomizable && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Custom Name
            </label>
            <input
              type="text"
              value={item.customName || ''}
              onChange={(e) => updateCustomName(e.target.value)}
              placeholder="Enter custom name"
              disabled={itemLocked}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#CBA35C]/50 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
            />
            <p className="mt-1 text-[10px] text-gray-500">
              This name will appear in the legend
            </p>
          </div>
        )}

        {isCustomizable && (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={item.color || '#8B4789'}
                onChange={(e) => updateColor(e.target.value)}
                disabled={itemLocked}
                className="h-10 w-16 cursor-pointer rounded-lg border border-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <input
                type="text"
                value={item.color || '#8B4789'}
                onChange={(e) => updateColor(e.target.value)}
                placeholder="#8B4789"
                disabled={itemLocked}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 font-mono text-sm text-gray-900 uppercase placeholder:text-gray-400 focus:ring-2 focus:ring-[#CBA35C]/50 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>
            <p className="mt-1 text-[10px] text-gray-500">
              This color will appear in the legend
            </p>
          </div>
        )}

        {/* Dimensions */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Dimensions
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-gray-500">Width</span>
              <input
                type="number"
                value={item.dimensions.width}
                onChange={(e) => updateDimension('width', e.target.value)}
                disabled={itemLocked}
                className="mt-0.5 w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[#CBA35C]/50 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>
            <div>
              <span className="text-[10px] text-gray-500">Height</span>
              <input
                type="number"
                value={item.dimensions.height}
                onChange={(e) => updateDimension('height', e.target.value)}
                disabled={itemLocked}
                className="mt-0.5 w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[#CBA35C]/50 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>
          </div>
          <div className="mt-2 inline-flex gap-1 rounded-full bg-gray-50 p-1 text-[9px]">
            <button
              type="button"
              onClick={() => handleUnitChange('in')}
              className={`rounded-full px-2 py-0.5 ${
                item.dimensions.unit === 'in'
                  ? 'bg-primary text-white'
                  : 'text-gray-600'
              }`}
            >
              Inches
            </button>
            <button
              type="button"
              onClick={() => handleUnitChange('ft')}
              className={`rounded-full px-2 py-0.5 ${
                item.dimensions.unit === 'ft'
                  ? 'bg-primary text-white'
                  : 'text-gray-600'
              }`}
            >
              Feet
            </button>
          </div>
          <p className="mt-1 text-[10px] text-gray-500">
            Size is used for spacing + layout suggestions.
          </p>
        </div>

        {/* Position */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Position
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-gray-500">X (canvas)</span>
              <input
                type="number"
                value={Math.round(item.position.x)}
                onChange={(e) => updatePosition('x', e.target.value)}
                disabled={itemLocked}
                className="mt-0.5 w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[#CBA35C]/50 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>
            <div>
              <span className="text-[10px] text-gray-500">Y (canvas)</span>
              <input
                type="number"
                value={Math.round(item.position.y)}
                onChange={(e) => updatePosition('y', e.target.value)}
                disabled={itemLocked}
                className="mt-0.5 w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-900 focus:ring-2 focus:ring-[#CBA35C]/50 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>
          </div>
          <div className="mt-2 grid grid-cols-4 gap-1 text-[9px]">
            <button
              type="button"
              onClick={() => nudge('y', -5)}
              disabled={itemLocked}
              className="rounded-md bg-gray-100 py-1 text-center text-gray-700 hover:bg-gray-200 disabled:opacity-40"
            >
              ↑ 5
            </button>
            <button
              type="button"
              onClick={() => nudge('y', 5)}
              disabled={itemLocked}
              className="rounded-md bg-gray-100 py-1 text-center text-gray-700 hover:bg-gray-200 disabled:opacity-40"
            >
              ↓ 5
            </button>
            <button
              type="button"
              onClick={() => nudge('x', -5)}
              disabled={itemLocked}
              className="rounded-md bg-gray-100 py-1 text-center text-gray-700 hover:bg-gray-200 disabled:opacity-40"
            >
              ← 5
            </button>
            <button
              type="button"
              onClick={() => nudge('x', 5)}
              disabled={itemLocked}
              className="rounded-md bg-gray-100 py-1 text-center text-gray-700 hover:bg-gray-200 disabled:opacity-40"
            >
              → 5
            </button>
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
              value={item.rotation}
              onChange={(e) => safeRotate(parseFloat(e.target.value) || 0)}
              disabled={itemLocked}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[#CBA35C]/60 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
              step={15}
            />
            <span className="flex items-center text-sm text-gray-500">°</span>
          </div>
          <div className="mt-2 grid grid-cols-4 gap-2 text-[10px]">
            {[0, 90, 180, 270].map((angle) => (
              <button
                key={angle}
                type="button"
                onClick={() => safeRotate(angle)}
                disabled={itemLocked}
                className="rounded-md bg-gray-100 px-2 py-1 text-gray-700 hover:bg-gray-200 disabled:opacity-40"
              >
                {angle}°
              </button>
            ))}
          </div>
          <div className="mt-2 flex gap-2 text-[10px]">
            <button
              type="button"
              onClick={() => safeRotate(item.rotation - 15)}
              disabled={itemLocked}
              className="flex-1 rounded-lg bg-[#CBA35C] px-3 py-2 text-center font-semibold text-black shadow-sm hover:bg-[#b0914f] disabled:opacity-40"
            >
              ↶ -15°
            </button>
            <button
              type="button"
              onClick={() => safeRotate(item.rotation + 15)}
              disabled={itemLocked}
              className="flex-1 rounded-lg bg-[#CBA35C] px-3 py-2 text-center font-semibold text-black shadow-sm hover:bg-[#b0914f] disabled:opacity-40"
            >
              +15° ↷
            </button>
          </div>
        </div>
      </div>
    );
  };

  // DOOR (selected as its own item)
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
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[#CBA35C]/60 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
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
            Width (&quot;)
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
            className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 focus:ring-2 focus:ring-[#CBA35C]/60 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Height (&quot;)
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
            className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 focus:ring-2 focus:ring-[#CBA35C]/60 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
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

  // WINDOW (selected as its own item)
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
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[#CBA35C]/60 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
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
            Width (&quot;)
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
            className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 focus:ring-2 focus:ring-[#CBA35C]/60 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-700">
            Height (&quot;)
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
            className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 focus:ring-2 focus:ring-[#CBA35C]/60 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
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

  // Room
  const renderRoomProperties = (room: Room) => {
    const pxPerFt = pixelsPerFoot || 20;

    const updateDim = (key: 'width' | 'height', raw: string) => {
      const val = parseFloat(raw);
      if (Number.isNaN(val) || val <= 0) {
        onUpdate({ [key]: undefined });
        return;
      }

      const other = key === 'width' ? (room.height ?? 0) : (room.width ?? 0);

      let area = room.area ?? 0;

      if (other > 0 && pxPerFt > 0) {
        const wPx = key === 'width' ? val : other;
        const hPx = key === 'width' ? other : val;
        const wFt = wPx / pxPerFt;
        const hFt = hPx / pxPerFt;
        area = +(wFt * hFt).toFixed(2);
      }

      onUpdate({
        [key]: val,
        area,
      });
    };

    const widthFt =
      room.width && pxPerFt ? +(room.width / pxPerFt).toFixed(2) : null;
    const heightFt =
      room.height && pxPerFt ? +(room.height / pxPerFt).toFixed(2) : null;

    return (
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {/* Room Name */}
            Label Name
          </label>
          <input
            type="text"
            value={room.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[#CBA35C]/40 focus:outline-none"
          />
        </div>

        {/* <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Label Box Size (px)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-[10px] text-gray-500">Width</span>
              <input
                type="number"
                min={10}
                value={room.width ?? ''}
                onChange={(e) => updateDim('width', e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[#CBA35C]/40 focus:outline-none"
              />
            </div>
            <div>
              <span className="text-[10px] text-gray-500">Height</span>
              <input
                type="number"
                min={10}
                value={room.height ?? ''}
                onChange={(e) => updateDim('height', e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-[#CBA35C]/40 focus:outline-none"
              />
            </div>
          </div>
          {widthFt && heightFt && (
            <p className="mt-1 text-[10px] text-gray-500">
              {widthFt} ft × {heightFt} ft
            </p>
          )}
        </div> */}

        {/* <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Area (sq ft)
          </label>
          <input
            type="number"
            readOnly
            value={room.area ?? ''}
            className="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-500"
          />
          <p className="mt-1 text-[10px] text-gray-500">
            Calculated from label box width × height using canvas scale.
          </p>
        </div> */}

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {/* Highlight Color */}
            Label Color
          </label>
          <input
            type="color"
            value={room.color || '#FDE68A'}
            onChange={(e) => onUpdate({ color: e.target.value })}
            className="h-9 w-16 cursor-pointer rounded border border-gray-300 bg-white"
          />
        </div>
      </div>
    );
  };

  // PANEL SHELL
  return (
    <div className="flex w-80 flex-col border-l border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-2">
          {selectedItemType === 'wall' && (
            <BrickWall className="text-dark-black h-6 w-6" />
          )}
          {selectedItemType === 'furniture' && (
            <Armchair className="text-dark-black h-6 w-6" />
          )}
          {selectedItemType === 'door' && (
            <DoorClosed className="text-dark-black h-6 w-6" />
          )}
          {selectedItemType === 'window' && (
            <Grid2x2 className="text-dark-black h-6 w-6" />
          )}
          {selectedItemType === 'room' && (
            <Grid2x2 className="text-dark-black h-6 w-6" />
          )}
          <h3 className="text-lg font-semibold text-gray-900">Properties</h3>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4">
        {selectedItemType === 'wall' &&
          renderWallProperties(selectedItem as Wall)}

        {selectedItemType === 'furniture' &&
          renderFurnitureProperties(selectedItem as FurnitureItem)}

        {selectedItemType === 'door' &&
          renderDoorProperties(selectedItem as DoorWindow)}

        {selectedItemType === 'window' &&
          renderWindowProperties(selectedItem as DoorWindow)}
        {selectedItemType === 'room' &&
          renderRoomProperties(selectedItem as Room)}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-gray-50 p-4">
        <button
          onClick={onDelete}
          disabled={
            (selectedItemType === 'wall' && isLocked) ||
            (selectedItemType === 'furniture' &&
              (selectedItem as FurnitureItem)?.locked)
          }
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
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
          <p className="mt-2 text-center text-[10px] text-gray-500">
            Unlock the floor plan to delete walls.
          </p>
        )}
      </div>
    </div>
  );
};
