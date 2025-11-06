import React from 'react';

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}) => {
  const zoomPercentage = Math.round(zoom * 100);

  return (
    <div className="absolute bottom-6 left-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
      <div className="flex flex-col">
        {/* Zoom In */}
        <button
          onClick={onZoomIn}
          className="border-b border-gray-200 px-4 py-3 transition-colors hover:bg-gray-100"
          title="Zoom In (+)"
        >
          <svg
            className="h-5 w-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>

        {/* Zoom Level */}
        <button
          onClick={onResetZoom}
          className="border-b border-gray-200 px-4 py-2 transition-colors hover:bg-gray-100"
          title="Reset Zoom"
        >
          <span className="text-sm font-medium text-gray-700">
            {zoomPercentage}%
          </span>
        </button>

        {/* Zoom Out */}
        <button
          onClick={onZoomOut}
          className="px-4 py-3 transition-colors hover:bg-gray-100"
          title="Zoom Out (-)"
        >
          <svg
            className="h-5 w-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
