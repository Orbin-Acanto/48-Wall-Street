import { Tool } from '@/types/floorplan.types';
import React from 'react';

interface DrawingToolsProps {
  selectedTool: Tool;
  onToolChange: (tool: Tool) => void;
  isLocked: boolean;
}

export const DrawingTools: React.FC<DrawingToolsProps> = ({
  selectedTool,
  onToolChange,
  isLocked,
}) => {
  const tools = [
    {
      id: 'select' as Tool,
      name: 'Select',
      icon: (
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
            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
          />
        </svg>
      ),
      shortcut: 'V',
      disabled: false,
    },
    {
      id: 'wall' as Tool,
      name: 'Wall',
      icon: (
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
            d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5z"
          />
        </svg>
      ),
      shortcut: 'W',
      disabled: isLocked,
    },
    {
      id: 'door' as Tool,
      name: 'Door',
      icon: (
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
            d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
          />
        </svg>
      ),
      shortcut: 'D',
      disabled: isLocked,
    },
    {
      id: 'window' as Tool,
      name: 'Window',
      icon: (
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
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z M12 5v14 M4 12h16"
          />
        </svg>
      ),
      shortcut: 'N',
      disabled: isLocked,
    },
    {
      id: 'measure' as Tool,
      name: 'Measure',
      icon: (
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
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
      ),
      shortcut: 'M',
      disabled: false,
    },
    {
      id: 'pan' as Tool,
      name: 'Pan',
      icon: (
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
            d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11"
          />
        </svg>
      ),
      shortcut: 'H',
      disabled: false,
    },
    {
      id: 'delete' as Tool,
      name: 'Delete',
      icon: (
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
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      ),
      shortcut: 'Del',
      disabled: false,
    },
  ];

  return (
    <div className="absolute top-24 left-6 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
      <div className="flex flex-col gap-1">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => !tool.disabled && onToolChange(tool.id)}
            disabled={tool.disabled}
            className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
              selectedTool === tool.id
                ? 'bg-blue-500 text-white shadow-md'
                : tool.disabled
                  ? 'cursor-not-allowed text-gray-300'
                  : 'text-gray-700 hover:bg-gray-100'
            }`}
            title={`${tool.name} (${tool.shortcut})`}
          >
            {/* Icon */}
            <div className="flex-shrink-0">{tool.icon}</div>

            {/* Label */}
            <div className="min-w-[80px] flex-1 text-left">
              <div className="text-sm font-medium">{tool.name}</div>
              <div
                className={`text-xs ${
                  selectedTool === tool.id ? 'text-blue-100' : 'text-gray-500'
                }`}
              >
                {tool.shortcut}
              </div>
            </div>

            {/* Active Indicator */}
            {selectedTool === tool.id && (
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            )}

            {/* Lock Badge */}
            {tool.disabled && isLocked && (
              <div className="absolute -top-1 -right-1 rounded-full bg-red-500 p-1">
                <svg
                  className="h-3 w-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            )}

            {/* Tooltip on hover */}
            <div className="pointer-events-none absolute left-full z-10 ml-2 rounded-lg bg-gray-900 px-3 py-2 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
              {tool.name}
              <div className="mt-0.5 text-gray-400">Press {tool.shortcut}</div>
              <div className="absolute top-1/2 left-0 h-2 w-2 -translate-x-1 -translate-y-1/2 rotate-45 bg-gray-900" />
            </div>
          </button>
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-3 border-t border-gray-200 pt-3">
        <p className="px-2 text-center text-xs text-gray-500">
          Press <span className="font-semibold">Space</span> + drag to pan
        </p>
      </div>
    </div>
  );
};
