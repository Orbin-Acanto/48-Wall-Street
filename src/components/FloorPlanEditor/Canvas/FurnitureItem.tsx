import React from 'react';
import { FurnitureItem as FurnitureItemType } from '@/types/floorplan.types';

interface FurnitureItemProps {
  item: FurnitureItemType;
  isSelected: boolean;
  showDimensions: boolean;
  pixelsPerFoot: number;
  onClick: () => void;
  onDragStart: (e: React.MouseEvent) => void;
}

export const FurnitureItem: React.FC<FurnitureItemProps> = ({
  item,
  isSelected,
  showDimensions,
  pixelsPerFoot,
  onClick,
  onDragStart,
}) => {
  const pixelsPerInch = pixelsPerFoot / 12;

  const widthPx = item.dimensions.width * pixelsPerInch;
  const heightPx = item.dimensions.height * pixelsPerInch;

  return (
    <g
      transform={`translate(${item.position.x},${item.position.y}) rotate(${item.rotation})`}
      onMouseDown={(e) => {
        e.stopPropagation();
        onClick();
        if (!item.locked) {
          onDragStart(e);
        }
      }}
      style={{ cursor: item.locked ? 'not-allowed' : 'move' }}
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

      <g
        transform={`scale(${pixelsPerInch})`}
        dangerouslySetInnerHTML={{ __html: item.svgPath }}
        opacity={isSelected ? 0.95 : 1}
      />

      {isSelected && (
        <text
          y={-heightPx / 2 - 20}
          fontSize="10"
          fill="#3B82F6"
          fontWeight="600"
          textAnchor="middle"
          className="select-none"
        >
          {item.name}
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
          {item.dimensions.width}" × {item.dimensions.height}"
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
            {item.type === 'furniture'
              ? 'Rental'
              : item.type === 'av'
                ? 'A/V'
                : 'FOOD'}
          </text>
        </g>
      )}
    </g>
  );
};
