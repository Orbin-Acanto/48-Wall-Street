import { DoorWindow, Point } from '@/types/floorplan.types';
import { inchesToPixels } from '@/utils/conversionUtils';
import { getPointAlongLine } from '@/utils/geometryUtils';
import React from 'react';

interface WindowProps {
  window: DoorWindow;
  wallStart: Point;
  wallEnd: Point;
  wallThickness: number;
  wallAngle: number;
  pixelsPerFoot: number;
  onClick?: () => void;
}

export const Window: React.FC<WindowProps> = ({
  window,
  wallStart,
  wallEnd,
  wallThickness,
  wallAngle,
  pixelsPerFoot,
  onClick,
}) => {
  const windowCenter = getPointAlongLine(
    wallStart,
    wallEnd,
    window.position *
      Math.sqrt(
        Math.pow(wallEnd.x - wallStart.x, 2) +
          Math.pow(wallEnd.y - wallStart.y, 2)
      )
  );

  const windowWidth = inchesToPixels(window.width, pixelsPerFoot);

  const renderWindowStyle = () => {
    switch (window.style) {
      case 'double':
        return (
          <g>
            <rect
              x={-windowWidth / 2}
              y={-wallThickness / 2}
              width={windowWidth}
              height={wallThickness}
              fill="#87CEEB"
              stroke="#4682B4"
              strokeWidth={1}
              opacity={0.7}
            />
            <line
              x1={0}
              y1={-wallThickness / 2}
              x2={0}
              y2={wallThickness / 2}
              stroke="#4682B4"
              strokeWidth={2}
            />
            <line
              x1={-windowWidth / 2 + 3}
              y1={-wallThickness / 2 + 2}
              x2={-5}
              y2={-wallThickness / 2 + 2}
              stroke="#FFF"
              strokeWidth={1}
              opacity={0.6}
            />
            <line
              x1={5}
              y1={-wallThickness / 2 + 2}
              x2={windowWidth / 2 - 3}
              y2={-wallThickness / 2 + 2}
              stroke="#FFF"
              strokeWidth={1}
              opacity={0.6}
            />
          </g>
        );

      case 'bay':
        return (
          <g>
            <path
              d={`
                M ${-windowWidth / 2} ${-wallThickness / 2}
                L ${-windowWidth / 2} ${-wallThickness / 2 - 10}
                L ${-windowWidth / 4} ${-wallThickness / 2 - 15}
                L ${windowWidth / 4} ${-wallThickness / 2 - 15}
                L ${windowWidth / 2} ${-wallThickness / 2 - 10}
                L ${windowWidth / 2} ${-wallThickness / 2}
              `}
              fill="#87CEEB"
              stroke="#4682B4"
              strokeWidth={1}
              opacity={0.7}
            />
            <line
              x1={-windowWidth / 4}
              y1={-wallThickness / 2}
              x2={-windowWidth / 4}
              y2={-wallThickness / 2 - 15}
              stroke="#4682B4"
              strokeWidth={1}
            />
            <line
              x1={windowWidth / 4}
              y1={-wallThickness / 2}
              x2={windowWidth / 4}
              y2={-wallThickness / 2 - 15}
              stroke="#4682B4"
              strokeWidth={1}
            />
          </g>
        );

      case 'casement':
        return (
          <g>
            <rect
              x={-windowWidth / 2}
              y={-wallThickness / 2}
              width={windowWidth}
              height={wallThickness}
              fill="#87CEEB"
              stroke="#4682B4"
              strokeWidth={1}
              opacity={0.7}
            />
            <line
              x1={-windowWidth / 3}
              y1={-wallThickness / 2}
              x2={-windowWidth / 3}
              y2={wallThickness / 2}
              stroke="#4682B4"
              strokeWidth={1}
            />
            <line
              x1={windowWidth / 3}
              y1={-wallThickness / 2}
              x2={windowWidth / 3}
              y2={wallThickness / 2}
              stroke="#4682B4"
              strokeWidth={1}
            />
            <line
              x1={-windowWidth / 2}
              y1={0}
              x2={windowWidth / 2}
              y2={0}
              stroke="#4682B4"
              strokeWidth={1}
            />
            <circle cx={-windowWidth / 3} cy={0} r={1.5} fill="#888" />
            <circle cx={windowWidth / 3} cy={0} r={1.5} fill="#888" />
          </g>
        );

      case 'single':
      default:
        return (
          <g>
            <rect
              x={-windowWidth / 2}
              y={-wallThickness / 2}
              width={windowWidth}
              height={wallThickness}
              fill="#87CEEB"
              stroke="#4682B4"
              strokeWidth={1}
              opacity={0.7}
            />
            <line
              x1={-windowWidth / 2}
              y1={0}
              x2={windowWidth / 2}
              y2={0}
              stroke="#4682B4"
              strokeWidth={1}
            />
            <line
              x1={0}
              y1={-wallThickness / 2}
              x2={0}
              y2={wallThickness / 2}
              stroke="#4682B4"
              strokeWidth={1}
            />
            <line
              x1={-windowWidth / 2 + 3}
              y1={-wallThickness / 2 + 2}
              x2={-2}
              y2={-wallThickness / 2 + 2}
              stroke="#FFF"
              strokeWidth={1}
              opacity={0.6}
            />
          </g>
        );
    }
  };

  return (
    <g
      transform={`translate(${windowCenter.x},${windowCenter.y}) rotate(${wallAngle})`}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      style={{ cursor: 'pointer' }}
    >
      {renderWindowStyle()}

      <text y={wallThickness + 10} fontSize="8" fill="#666" textAnchor="middle">
        {window.style}
      </text>
    </g>
  );
};
