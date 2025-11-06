import { Point } from '@/types/floorplan.types';
import { getMidpoint } from '@/utils/geometryUtils';
import React from 'react';

interface DimensionLabelProps {
  start: Point;
  end: Point;
  value: string;
  offset?: number;
}

export const DimensionLabel: React.FC<DimensionLabelProps> = ({
  start,
  end,
  value,
  offset = 15,
}) => {
  const midpoint = getMidpoint(start, end);
  const angle = Math.atan2(end.y - start.y, end.x - start.x);
  const degrees = (angle * 180) / Math.PI;

  const offsetX = Math.sin(angle) * offset;
  const offsetY = -Math.cos(angle) * offset;

  let textRotation = degrees;
  if (degrees > 90 || degrees < -90) {
    textRotation = degrees + 180;
  }

  return (
    <g
      transform={`translate(${midpoint.x + offsetX}, ${midpoint.y + offsetY})`}
    >
      <rect
        x={-25}
        y={-10}
        width={50}
        height={20}
        fill="#FFF"
        fillOpacity={0.9}
        stroke="#999"
        strokeWidth={0.5}
        rx={3}
      />

      <text
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="11"
        fill="#333"
        fontWeight="600"
        transform={`rotate(${textRotation})`}
        className="select-none"
      >
        {value}
      </text>

      <line
        x1={0}
        y1={10}
        x2={start.x - midpoint.x - offsetX}
        y2={start.y - midpoint.y - offsetY}
        stroke="#999"
        strokeWidth={0.5}
        strokeDasharray="2,2"
        opacity={0.6}
      />
    </g>
  );
};
