import { tools } from '@/data';
import { Tool } from '@/types/floorplan.types';
import React from 'react';

interface TopToolbarProps {
  selectedTool: Tool;
  onToolChange: (tool: Tool) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onLoad: () => void;
  onExport: () => void;
  onReset: () => void;
  showGrid: boolean;
  showDimensions: boolean;
  onToggleGrid: () => void;
  onToggleDimensions: () => void;
  isLocked: boolean;
  onToggleLock: () => void;
  onOpenEventDetails: () => void;
}

export const TopToolbar: React.FC<TopToolbarProps> = ({
  selectedTool,
  onToolChange,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSave,
  onLoad,
  onExport,
  onReset,
  showGrid,
  showDimensions,
  onToggleGrid,
  onToggleDimensions,
  isLocked,
  onToggleLock,
  onOpenEventDetails,
}) => {
  return (
    <div className="flex h-16 items-center gap-2 border-b border-gray-200 bg-white px-4">
      {/* File Operations */}
      <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
        <button
          onClick={onSave}
          className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          title="Save (Ctrl+S)"
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
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
            />
          </svg>
          Save
        </button>
        <button
          onClick={onLoad}
          className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          title="Load"
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Load
        </button>
        <button
          onClick={onExport}
          className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          title="Export"
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
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Export
        </button>
      </div>

      {/* Edit Operations */}
      <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          title="Undo (Ctrl+Z)"
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
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
            />
          </svg>
          Undo
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          title="Redo (Ctrl+Y)"
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
              d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"
            />
          </svg>
          Redo
        </button>
      </div>

      {/* Drawing Tools */}
      <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onToolChange(tool.id)}
            disabled={
              isLocked &&
              (tool.id === 'wall' || tool.id === 'door' || tool.id === 'window')
            }
            className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              selectedTool === tool.id
                ? 'bg-primary text-white'
                : 'text-gray-700 hover:bg-gray-100'
            } disabled:cursor-not-allowed disabled:opacity-40`}
            title={tool.label}
          >
            {tool.icon}
            <span className="hidden lg:inline">{tool.label}</span>
          </button>
        ))}
      </div>

      {/* View Options */}
      <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
        <button
          onClick={onToggleGrid}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            showGrid
              ? 'bg-primary text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          title="Toggle Grid (G)"
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
              d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
            />
          </svg>
          <span className="hidden lg:inline">Grid</span>
        </button>
        <button
          onClick={onToggleDimensions}
          className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            showDimensions
              ? 'bg-primary text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          title="Toggle Dimensions (D)"
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
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <span className="hidden lg:inline">Dimensions</span>
        </button>
      </div>

      {/* Right-aligned Actions */}
      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={onOpenEventDetails}
          className="bg-primary hover:bg-primary/80 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:cursor-pointer"
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Event Details
        </button>

        <button
          onClick={onToggleLock}
          className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            isLocked
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'text-dark-black bg-white hover:bg-gray-300'
          }`}
          title={isLocked ? 'Floor plan is locked' : 'Floor plan is unlocked'}
        >
          {isLocked ? (
            <>
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Locked
            </>
          ) : (
            <>
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
              Unlocked
            </>
          )}
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          title="Reset Floor Plan"
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span className="hidden xl:inline">Reset</span>
        </button>
      </div>
    </div>
  );
};
