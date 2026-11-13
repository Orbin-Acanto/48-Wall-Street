'use client';

import { FLOOR_UNDERLAYS } from '@/components/FloorPlanEditor';
import { FurnitureItem } from '@/components/FloorPlanEditor/Canvas/FurnitureItem';
import type { FloorKey, FloorPlanData } from '@/types/floorplan.types';

const noop = () => {};
const OFFSET = 40; // matches the editor's underlay offset

/** Read-only render of a plan, drawn exactly as the editor draws it. */
export function TemplatePreview({
  plan,
  floor,
  className,
}: {
  plan: FloorPlanData;
  floor: FloorKey;
  className?: string;
}) {
  const underlay = FLOOR_UNDERLAYS[floor] ?? FLOOR_UNDERLAYS['grand-mezzanine'];
  const scale = plan.canvasSettings?.scale || 20;

  // Frame the floor drawing, widened to any item placed outside it.
  let [x0, y0] = [OFFSET, OFFSET];
  let [x1, y1] = [
    OFFSET + 1200 * underlay.scale,
    OFFSET + 900 * underlay.scale,
  ];
  for (const f of plan.furniture) {
    x0 = Math.min(x0, f.position.x - 60);
    y0 = Math.min(y0, f.position.y - 60);
    x1 = Math.max(x1, f.position.x + 60);
    y1 = Math.max(y1, f.position.y + 60);
  }

  return (
    <svg
      viewBox={`${x0} ${y0} ${x1 - x0} ${y1 - y0}`}
      className={className}
      role="img"
      aria-label={`Preview of ${plan.name}`}
    >
      <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill="#fff" />
      {underlay.href && (
        <g
          opacity={underlay.opacity ?? 1}
          transform={`translate(${OFFSET},${OFFSET}) scale(${underlay.scale})`}
        >
          <image href={underlay.href} width={1200} height={900} />
        </g>
      )}
      {plan.walls.map((w) => (
        <polyline
          key={w.id}
          points={(w.curvePoints ?? [w.start, w.end])
            .map((p) => `${p.x},${p.y}`)
            .join(' ')}
          fill="none"
          stroke="#111"
          strokeWidth={w.thickness}
        />
      ))}
      {[...plan.furniture]
        .sort((a, b) => (a.zIndex ?? 1) - (b.zIndex ?? 1))
        .map((item) => (
          <FurnitureItem
            key={item.id}
            item={item}
            isSelected={false}
            showDimensions={false}
            pixelsPerFoot={scale}
            onClick={noop}
            onDragStart={noop}
          />
        ))}
      {plan.rooms.map((room) => {
        if (room.x == null || room.y == null) return null;
        const cx = room.x + (room.width ?? 0) / 2;
        const cy = room.y + (room.height ?? 0) / 2;
        return (
          <text
            key={room.id}
            x={cx}
            y={cy}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={room.fontSize ?? 18}
            fontWeight="bold"
            fill={room.color || '#000'}
            transform={`rotate(${room.rotation ?? 0} ${cx} ${cy})`}
          >
            {room.name}
          </text>
        );
      })}
    </svg>
  );
}
