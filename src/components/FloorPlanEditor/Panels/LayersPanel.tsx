import { FloorPlanData } from '@/types/floorplan.types';
import React, { useState } from 'react';

interface LayersPanelProps {
  floorPlan: FloorPlanData;
  onToggleLayer: (layer: string) => void;
  onReorderLayer: (layer: string, direction: 'up' | 'down') => void;
}

export const LayersPanel: React.FC<LayersPanelProps> = ({
  floorPlan,
  onToggleLayer,
  onReorderLayer,
}) => {
  const [expandedLayers, setExpandedLayers] = useState<Set<string>>(
    new Set(['furniture'])
  );

  const toggleExpand = (layer: string) => {
    setExpandedLayers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(layer)) {
        newSet.delete(layer);
      } else {
        newSet.add(layer);
      }
      return newSet;
    });
  };

  const layers = [
    {
      id: 'walls',
      name: 'Walls',
      icon: (
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
            d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"
          />
        </svg>
      ),
      count: floorPlan.walls.length,
      items: floorPlan.walls.map((w) => ({
        id: w.id,
        name: `Wall ${w.lengthInFeet.toFixed(1)}'`,
        subcount: w.doors.length + w.windows.length,
      })),
    },
    {
      id: 'furniture',
      name: 'Furniture',
      icon: (
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
            d="M3 9.5L12 4l9 5.5M3 9.5v9l9 5.5m-9-14.5l9 5.5m0 0l9-5.5M12 19v-9.5"
          />
        </svg>
      ),
      count: floorPlan.furniture.length,
      items: floorPlan.furniture.map((f) => ({
        id: f.id,
        name: f.name,
        category: f.category,
      })),
    },
    {
      id: 'rooms',
      name: 'Rooms',
      icon: (
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      count: floorPlan.rooms.length,
      items: floorPlan.rooms.map((r) => ({
        id: r.id,
        name: r.name,
        area: r.area,
      })),
    },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-l border-gray-200 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-900">Layers</h3>
        <p className="mt-1 text-xs text-gray-500">Manage floor plan layers</p>
      </div>

      {/* Layers List */}
      <div className="flex-1 overflow-y-auto">
        {layers.map((layer) => (
          <div key={layer.id} className="border-b border-gray-200">
            {/* Layer Header */}
            <button
              onClick={() => toggleExpand(layer.id)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-gray-50"
            >
              <div className="text-gray-600">{layer.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    {layer.name}
                  </span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    {layer.count}
                  </span>
                </div>
              </div>
              <svg
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  expandedLayers.has(layer.id) ? 'rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Layer Items */}
            {expandedLayers.has(layer.id) && layer.items.length > 0 && (
              <div className="bg-gray-50">
                {layer.items.map((item) => (
                  <div
                    key={item.id}
                    className="group flex items-center justify-between px-4 py-2 pl-12 transition-colors hover:bg-gray-100"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-gray-700">
                        {item.name}
                      </p>
                      {item.category && (
                        <p className="text-xs text-gray-500">{item.category}</p>
                      )}
                      {item.subcount !== undefined && item.subcount > 0 && (
                        <p className="text-xs text-gray-500">
                          {item.subcount} opening{item.subcount > 1 ? 's' : ''}
                        </p>
                      )}
                      {item.area !== undefined && (
                        <p className="text-xs text-gray-500">
                          {item.area.toFixed(1)} sq ft
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        className="rounded p-1 text-gray-400 hover:text-gray-600"
                        title="Visible"
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button
                        className="rounded p-1 text-gray-400 hover:text-gray-600"
                        title="Lock"
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
                            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {expandedLayers.has(layer.id) && layer.items.length === 0 && (
              <div className="bg-gray-50 px-4 py-4 pl-12">
                <p className="text-xs text-gray-400 italic">
                  No {layer.name.toLowerCase()} yet
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Total Walls:</span>
            <span className="font-medium">{floorPlan.walls.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Items:</span>
            <span className="font-medium">{floorPlan.furniture.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Guest Capacity:</span>
            <span className="font-medium">
              {floorPlan.eventDetails.guestCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
