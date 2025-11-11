import React from 'react';
import { Wall as WallType } from '@/types/floorplan.types';
import { calculateAngle } from '@/utils/geometryUtils';
import { DimensionLabel } from './DimensionLabel';
import { Door } from './Door';
import { Window } from './Window';
import { buildSmoothCurvePath } from '@/utils/geometryUtils';

interface WallProps {
  wall: WallType;
  isSelected: boolean;
  showDimensions: boolean;
  pixelsPerFoot: number;
  onClick: () => void;
  onDoorClick?: (doorId: string) => void;
  onWindowClick?: (windowId: string) => void;
}

export const Wall: React.FC<WallProps> = ({
  wall,
  isSelected,
  showDimensions,
  pixelsPerFoot,
  onClick,
  onDoorClick,
  onWindowClick,
}) => {
  const handleClick = (e: React.MouseEvent<SVGGElement>) => {
    e.stopPropagation();
    onClick();
  };

  const hasCurve =
    wall.isCurved && wall.curvePoints && wall.curvePoints.length >= 2;

  const strokeColor = isSelected ? '#EF4444' : '#333333';
  const strokeWidth = wall.thickness;

  let mainShape: React.ReactNode = null;

  if (hasCurve) {
    const d = buildSmoothCurvePath(wall.curvePoints!);
    mainShape = (
      <path
        d={d}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="none"
        className={isSelected ? 'animate-pulse' : ''}
      />
    );
  } else {
    mainShape = (
      <line
        x1={wall.start.x}
        y1={wall.start.y}
        x2={wall.end.x}
        y2={wall.end.y}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        className={isSelected ? 'animate-pulse' : ''}
      />
    );
  }

  const angle = calculateAngle(wall.start, wall.end);

  return (
    <g onClick={handleClick} style={{ cursor: 'pointer' }}>
      {mainShape}

      {!hasCurve && isSelected && (
        <>
          <circle
            cx={wall.start.x}
            cy={wall.start.y}
            r={6}
            fill="#EF4444"
            stroke="#FFF"
            strokeWidth={2}
          />
          <circle
            cx={wall.end.x}
            cy={wall.end.y}
            r={6}
            fill="#EF4444"
            stroke="#FFF"
            strokeWidth={2}
          />
        </>
      )}

      {showDimensions && (
        <DimensionLabel
          start={wall.start}
          end={wall.end}
          value={`${wall.lengthInFeet.toFixed(1)}'`}
        />
      )}

      {!hasCurve &&
        wall.doors.map((door) => (
          <Door
            key={door.id}
            door={door}
            wallStart={wall.start}
            wallEnd={wall.end}
            wallThickness={wall.thickness}
            wallAngle={angle}
            pixelsPerFoot={pixelsPerFoot}
            onClick={onDoorClick ? () => onDoorClick(door.id) : undefined}
          />
        ))}

      {!hasCurve &&
        wall.windows.map((window) => (
          <Window
            key={window.id}
            window={window}
            wallStart={wall.start}
            wallEnd={wall.end}
            wallThickness={wall.thickness}
            wallAngle={angle}
            pixelsPerFoot={pixelsPerFoot}
            onClick={onWindowClick ? () => onWindowClick(window.id) : undefined}
          />
        ))}
    </g>
  );
};
