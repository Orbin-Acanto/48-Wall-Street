import React from 'react';
import { FurnitureItem as FurnitureItemType } from '@/types/floorplan.types';

interface FurnitureItemProps {
  item: FurnitureItemType;
  isSelected: boolean;
  showDimensions: boolean;
  pixelsPerFoot: number;
  onClick: (e: React.MouseEvent) => void;
  onDragStart: (e: React.MouseEvent) => void;
}

const toInches = (value: number, unit: 'in' | 'ft') =>
  unit === 'ft' ? value * 12 : value;

export const FurnitureItem: React.FC<FurnitureItemProps> = ({
  item,
  isSelected,
  showDimensions,
  pixelsPerFoot,
  onClick,
  onDragStart,
}) => {
  const pxPerInch = pixelsPerFoot / 12;

  const dimUnit = item.dimensions.unit || 'in';
  const currentWIn = toInches(item.dimensions.width, dimUnit);
  const currentHIn = toInches(item.dimensions.height, dimUnit);

  const baseUnit = item.baseDimensions?.unit || dimUnit;
  const baseWIn = toInches(
    item.baseDimensions?.width ?? item.dimensions.width,
    baseUnit
  );
  const baseHIn = toInches(
    item.baseDimensions?.height ?? item.dimensions.height,
    baseUnit
  );

  const safeBaseWIn = baseWIn || currentWIn || 1;
  const safeBaseHIn = baseHIn || currentHIn || 1;

  const widthPx = currentWIn * pxPerInch;
  const heightPx = currentHIn * pxPerInch;

  const scaleX = currentWIn / safeBaseWIn;
  const scaleY = currentHIn / safeBaseHIn;

  const isLocked = !!item.locked;
  const isCustom = item.category === 'Customize';

  // Get the color for custom items
  const color = item.color || '#8B4789';

  // Replace color in SVG path for custom items
  const svgPath = isCustom
    ? item.svgPath.replace(/fill="[^"]*"/g, `fill="${color}"`)
    : item.svgPath;

  return (
    <g
      transform={`translate(${item.position.x},${item.position.y}) rotate(${item.rotation})`}
      onMouseDown={(e) => {
        e.stopPropagation();
        onClick(e);
        if (!isLocked) {
          onDragStart(e);
        }
      }}
      style={{ cursor: isLocked ? 'not-allowed' : 'move' }}
      className={isSelected ? 'furniture-item-selected' : 'furniture-item'}
    >
      {isSelected && (
        <g>
          <rect
            x={-widthPx / 2 - 5}
            y={-heightPx / 2 - 5}
            width={widthPx + 10}
            height={heightPx + 10}
            fill="none"
            stroke="#3B82F6"
            strokeWidth={2}
            strokeDasharray="5,5"
          />
          <circle
            cx={-widthPx / 2 - 5}
            cy={-heightPx / 2 - 5}
            r={4}
            fill="#3B82F6"
            stroke="#FFF"
            strokeWidth={1}
          />
          <circle
            cx={widthPx / 2 + 5}
            cy={-heightPx / 2 - 5}
            r={4}
            fill="#3B82F6"
            stroke="#FFF"
            strokeWidth={1}
          />
          <circle
            cx={-widthPx / 2 - 5}
            cy={heightPx / 2 + 5}
            r={4}
            fill="#3B82F6"
            stroke="#FFF"
            strokeWidth={1}
          />
          <circle
            cx={widthPx / 2 + 5}
            cy={heightPx / 2 + 5}
            r={4}
            fill="#3B82F6"
            stroke="#FFF"
            strokeWidth={1}
          />
          <line
            x1={0}
            y1={-heightPx / 2 - 5}
            x2={0}
            y2={-heightPx / 2 - 15}
            stroke="#3B82F6"
            strokeWidth={2}
          />
          <circle cx={0} cy={-heightPx / 2 - 15} r={3} fill="#3B82F6" />
        </g>
      )}

      <g transform={`scale(${scaleX},${scaleY})`}>
        <g
          transform={`scale(${pxPerInch})`}
          dangerouslySetInnerHTML={{ __html: svgPath }}
          opacity={isSelected ? 0.95 : 1}
        />
      </g>

      {/* {isCustom && item.customName && !isSelected && (
        <text
          y={0}
          fontSize="10"
          fill="#ffffff"
          fontWeight="600"
          textAnchor="middle"
          dominantBaseline="middle"
          className="select-none"
          style={{
            textShadow: '0 0 3px rgba(0,0,0,0.5)',
          }}
        >
          {item.customName}
        </text>
      )} */}

      {isSelected && (
        <text
          y={-heightPx / 2 - 20}
          fontSize="10"
          fill="#3B82F6"
          fontWeight="600"
          textAnchor="middle"
          className="select-none"
        >
          {item.customName || item.name}
          {isLocked ? ' (Locked)' : ''}
        </text>
      )}

      {showDimensions && (
        <text
          y={heightPx / 2 + 15}
          fontSize="9"
          fill="#666"
          textAnchor="middle"
          className="select-none"
        >
          {item.dimensions.width}
          {dimUnit === 'ft' ? 'ft' : '"'} × {item.dimensions.height}
          {dimUnit === 'ft' ? 'ft' : '"'}
        </text>
      )}

      {isSelected && (
        <g transform={`translate(${widthPx / 2 + 10}, ${-heightPx / 2 - 5})`}>
          <rect x={0} y={-8} width={40} height={16} fill="#3B82F6" rx={8} />
          <text
            x={20}
            y={2}
            fontSize="8"
            fill="#FFF"
            textAnchor="middle"
            fontWeight="500"
            className="select-none"
          >
            {isCustom
              ? 'CUSTOM'
              : item.type === 'furniture'
                ? 'FURN'
                : item.type === 'av'
                  ? 'A/V'
                  : item.type === 'av'
                    ? 'Food'
                    : 'Decor'}
          </text>
        </g>
      )}
    </g>
  );
};
