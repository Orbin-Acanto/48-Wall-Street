import React from 'react';

interface GridOverlayProps {
  width: number;
  height: number;
  gridSize: number;
  showGrid: boolean;
  color?: string;
  opacity?: number;
}

export const GridOverlay: React.FC<GridOverlayProps> = ({
  width,
  height,
  gridSize,
  showGrid,
  color = '#D1D5DB',
  opacity = 0.5,
}) => {
  if (!showGrid) return null;

  const verticalLines = [];
  const horizontalLines = [];

  for (let x = 0; x <= width; x += gridSize) {
    verticalLines.push(
      <line
        key={`v-${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        stroke={color}
        strokeWidth={x % (gridSize * 5) === 0 ? 1 : 0.5}
        opacity={opacity}
      />
    );
  }

  for (let y = 0; y <= height; y += gridSize) {
    horizontalLines.push(
      <line
        key={`h-${y}`}
        x1={0}
        y1={y}
        x2={width}
        y2={y}
        stroke={color}
        strokeWidth={y % (gridSize * 5) === 0 ? 1 : 0.5}
        opacity={opacity}
      />
    );
  }

  return (
    <g className="grid-overlay" data-grid="true" id="fp-grid-overlay">
      {verticalLines}
      {horizontalLines}

      <circle
        cx={0}
        cy={0}
        r={3}
        fill="#3B82F6"
        opacity={0.5}
        data-grid="true"
      />
      <text
        x={10}
        y={20}
        fontSize="10"
        fill="#999"
        className="select-none"
        data-grid="true"
      >
        Grid: {gridSize}px
      </text>
    </g>
  );
};
