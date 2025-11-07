import { DoorWindow, Point } from '@/types/floorplan.types';
import { inchesToPixels } from '@/utils/conversionUtils';
import { getPointAlongLine } from '@/utils/geometryUtils';
import React from 'react';

interface DoorProps {
  door: DoorWindow;
  wallStart: Point;
  wallEnd: Point;
  wallThickness: number;
  wallAngle: number;
  pixelsPerFoot: number;
  onClick?: () => void;
}

export const Door: React.FC<DoorProps> = ({
  door,
  wallStart,
  wallEnd,
  wallThickness,
  wallAngle,
  pixelsPerFoot,
  onClick,
}) => {
  const doorCenter = getPointAlongLine(
    wallStart,
    wallEnd,
    door.position *
      Math.sqrt(
        Math.pow(wallEnd.x - wallStart.x, 2) +
          Math.pow(wallEnd.y - wallStart.y, 2)
      )
  );

  const doorWidth = inchesToPixels(door.width, pixelsPerFoot);

  const renderDoorStyle = () => {
    switch (door.style) {
      case 'double':
        return (
          <g>
            <rect
              x={-doorWidth / 2}
              y={-wallThickness / 2}
              width={doorWidth}
              height={wallThickness}
              fill="#8B4513"
              stroke="#654321"
              strokeWidth={1}
            />
            <line
              x1={0}
              y1={-wallThickness / 2}
              x2={0}
              y2={wallThickness / 2}
              stroke="#654321"
              strokeWidth={2}
            />
            <circle cx={-doorWidth / 4} cy={0} r={2} fill="#D4AF37" />
            <circle cx={doorWidth / 4} cy={0} r={2} fill="#D4AF37" />
          </g>
        );

      case 'sliding':
        return (
          <g>
            <rect
              x={-doorWidth / 2}
              y={-wallThickness / 2}
              width={doorWidth}
              height={wallThickness}
              fill="#8B4513"
              stroke="#654321"
              strokeWidth={1}
            />
            <line
              x1={-doorWidth / 2}
              y1={-wallThickness / 2 - 3}
              x2={doorWidth / 2}
              y2={-wallThickness / 2 - 3}
              stroke="#999"
              strokeWidth={1}
              strokeDasharray="4,2"
            />
          </g>
        );

      case 'french':
        return (
          <g>
            <rect
              x={-doorWidth / 2}
              y={-wallThickness / 2}
              width={doorWidth}
              height={wallThickness}
              fill="#8B4513"
              stroke="#654321"
              strokeWidth={1}
            />
            <line
              x1={-doorWidth / 4}
              y1={-wallThickness / 2}
              x2={-doorWidth / 4}
              y2={wallThickness / 2}
              stroke="#87CEEB"
              strokeWidth={1}
              opacity={0.6}
            />
            <line
              x1={doorWidth / 4}
              y1={-wallThickness / 2}
              x2={doorWidth / 4}
              y2={wallThickness / 2}
              stroke="#87CEEB"
              strokeWidth={1}
              opacity={0.6}
            />
            <line
              x1={0}
              y1={-wallThickness / 2}
              x2={0}
              y2={wallThickness / 2}
              stroke="#654321"
              strokeWidth={2}
            />
          </g>
        );

      case 'single':
      default:
        return (
          <g>
            <rect
              x={-doorWidth / 2}
              y={-wallThickness / 2}
              width={doorWidth}
              height={wallThickness}
              fill="#8B4513"
              stroke="#654321"
              strokeWidth={1}
            />
            <path
              d={`M ${-doorWidth / 2} ${-wallThickness / 2} Q ${-doorWidth / 2 - 10} ${-wallThickness / 2 - doorWidth / 4} ${-doorWidth / 2} ${-wallThickness / 2 - doorWidth / 2}`}
              fill="none"
              stroke="#8B4513"
              strokeWidth={1}
              strokeDasharray="3,2"
              opacity={0.5}
            />
            <circle cx={doorWidth / 3} cy={0} r={2} fill="#D4AF37" />
          </g>
        );
    }
  };

  return (
    <g
      transform={`translate(${doorCenter.x},${doorCenter.y}) rotate(${wallAngle})`}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      style={{ cursor: 'pointer' }}
    >
      {renderDoorStyle()}
      <text y={wallThickness + 10} fontSize="8" fill="#666" textAnchor="middle">
        {door.style}
      </text>
    </g>
  );
};
