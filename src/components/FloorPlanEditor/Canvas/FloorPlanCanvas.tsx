import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  FloorPlanData,
  Point,
  Tool,
  Room,
  UnderlayProps,
} from '@/types/floorplan.types';

import { useCanvasInteraction } from '@/hooks/useCanvasInteraction';
import { useDragAndDrop, useFurnitureDrag } from '@/hooks/useDragAndDrop';

import { GridOverlay } from './GridOverlay';
import { Wall as WallComponent } from './Wall';
import { FurnitureItem } from './FurnitureItem';
import { isPointNearLine } from '@/utils/geometryUtils';

interface FloorPlanCanvasProps {
  floorPlan: FloorPlanData;
  selectedTool: Tool;
  selectedItemId: string | null;
  selectedFurnitureIds?: Set<string>;
  onFurnitureClick?: (id: string, opts: { toggle: boolean }) => void;
  onItemSelect: (
    id: string | null,
    type: 'wall' | 'furniture' | 'room'
  ) => void;
  onWallCreate: (start: Point, end: Point) => void;
  onCurveWallComplete?: (points: Point[]) => void;
  onFurnitureMove: (id: string, position: Point) => void;
  onFurnitureDrop: (libraryItemId: string, position: Point) => void;
  onAddDoor: (wallId: string, position?: number) => void;
  onAddWindow: (wallId: string, position?: number) => void;
  onDoorSelect: (wallId: string, doorId: string) => void;
  onWindowSelect: (wallId: string, windowId: string) => void;
  onRoomSelect: (roomId: string) => void;
  onCreateRoomAtPosition: (position: Point) => void;
  onRoomMove: (roomId: string, x: number, y: number) => void;
  underlay?: UnderlayProps;
  onCanvasMousePosition?: (p: Point) => void;
  onBatchFurnitureSelect?: (ids: string[]) => void;
}

export const FloorPlanCanvas: React.FC<FloorPlanCanvasProps> = ({
  floorPlan,
  selectedTool,
  selectedItemId,
  onItemSelect,
  onWallCreate,
  onFurnitureMove,
  onFurnitureDrop,
  onAddDoor,
  onAddWindow,
  onDoorSelect,
  onWindowSelect,
  onRoomSelect,
  onCreateRoomAtPosition,
  onRoomMove,
  onCurveWallComplete,
  underlay,
  selectedFurnitureIds,
  onFurnitureClick,
  onCanvasMousePosition,
  onBatchFurnitureSelect,
}) => {
  const svgRef = useRef<SVGSVGElement>(null!);

  const { canvasSettings, walls, furniture, rooms } = floorPlan;

  const [draggingRoomId, setDraggingRoomId] = useState<string | null>(null);
  const roomDragOffsetRef = useRef<Point | null>(null);

  const [marqueeStart, setMarqueeStart] = useState<Point | null>(null);
  const [marqueeEnd, setMarqueeEnd] = useState<Point | null>(null);
  const [isMarqueeActive, setIsMarqueeActive] = useState(false);

  const {
    width,
    height,
    scale: pixelsPerFoot,
    gridSize,
    showGrid,
    showDimensions,
    snapToGrid,
    backgroundColor,
  } = canvasSettings;

  const {
    viewport,
    drawingStart,
    currentMousePos,
    isPanning,
    isDragging: isCanvasDragging,
    screenToCanvas,
    screenToCanvasRaw,
    handleMouseDown: canvasMouseDown,
    handleMouseMove: canvasMouseMove,
    handleMouseUp: canvasMouseUp,
    handleWheel,
    zoomIn,
    zoomOut,
    resetZoom,
  } = useCanvasInteraction({
    svgRef,
    selectedTool,
    shouldSnapToGrid: snapToGrid,
    gridSize,
    onWallCreate,
  });

  const {
    draggedItemId,
    dragPreviewPosition,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  } = useDragAndDrop({
    onDrop: onFurnitureDrop,
    screenToCanvas,
  });

  const {
    isDragging: isFurnitureDragging,
    startGroupDrag,
    continueDrag,
    endDrag,
  } = useFurnitureDrag({ onMove: onFurnitureMove, screenToCanvas });

  const [curvePoints, setCurvePoints] = useState<Point[]>([]);
  const prevToolRef = useRef<Tool>(selectedTool);

  useEffect(() => {
    const prevTool = prevToolRef.current;

    if (prevTool === 'curve-wall' && selectedTool !== 'curve-wall') {
      if (curvePoints.length >= 2 && onCurveWallComplete) {
        onCurveWallComplete(curvePoints);
      }
      setCurvePoints([]);
    }

    prevToolRef.current = selectedTool;
  }, [selectedTool, curvePoints, onCurveWallComplete]);

  const handleSvgMouseDown = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (
        selectedTool === 'select' &&
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.button === 0
      ) {
        const canvasPoint = screenToCanvas(e.clientX, e.clientY);
        setMarqueeStart(canvasPoint);
        setMarqueeEnd(canvasPoint);
        setIsMarqueeActive(true);
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const canvasPoint = screenToCanvas(e.clientX, e.clientY);

      if (selectedTool === 'curve-wall' && e.button === 0) {
        const pt = e.altKey
          ? screenToCanvasRaw(e.clientX, e.clientY)
          : screenToCanvasRaw(e.clientX, e.clientY);
        e.stopPropagation();
        setCurvePoints((prev) => [...prev, pt]);
        return;
      }

      if (selectedTool === 'door' || selectedTool === 'window') {
        const hitWall = findWallHit(canvasPoint, walls, 10);
        if (hitWall) {
          const position = getPositionAlongWall(
            canvasPoint,
            hitWall.start,
            hitWall.end
          );

          if (selectedTool === 'door') {
            onAddDoor(hitWall.id, position);
          } else {
            onAddWindow(hitWall.id, position);
          }

          return;
        }
      }

      if (selectedTool === 'select' && e.target === svgRef.current) {
        onItemSelect(null, 'wall');
      }

      canvasMouseDown(e);
    },
    [
      selectedTool,
      screenToCanvas,
      walls,
      onAddDoor,
      onAddWindow,
      onItemSelect,
      canvasMouseDown,
    ]
  );

  const selectFurnitureInMarquee = useCallback(
    (start: Point, end: Point) => {
      const minX = Math.min(start.x, end.x);
      const maxX = Math.max(start.x, end.x);
      const minY = Math.min(start.y, end.y);
      const maxY = Math.max(start.y, end.y);

      const selectedIds = furniture
        .filter((item) => {
          const { x, y } = item.position;
          return x >= minX && x <= maxX && y >= minY && y <= maxY;
        })
        .map((item) => item.id);

      if (selectedIds.length > 0 && onBatchFurnitureSelect) {
        onBatchFurnitureSelect(selectedIds);
      }
    },
    [furniture, onBatchFurnitureSelect]
  );

  const renderFurniture = () =>
    furniture.map((item) => {
      const isSelected =
        (selectedFurnitureIds?.has?.(item.id) ?? false) ||
        selectedItemId === item.id;

      return (
        <FurnitureItem
          key={item.id}
          item={item}
          isSelected={isSelected}
          showDimensions={showDimensions}
          pixelsPerFoot={pixelsPerFoot}
          onClick={(e) => {
            const toggle = e.ctrlKey || e.metaKey;
            if (onFurnitureClick) onFurnitureClick(item.id, { toggle });
            else onItemSelect(item.id, 'furniture');
          }}
          onDragStart={(e) => {
            e.stopPropagation();
            const idsToDrag = selectedFurnitureIds?.has?.(item.id)
              ? Array.from(selectedFurnitureIds)
              : [item.id];

            startGroupDrag(e, item.id, idsToDrag, (id) => {
              const f = furniture.find((ff) => ff.id === id);
              return f ? f.position : null;
            });
          }}
        />
      );
    });

  const handleSvgDoubleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (selectedTool !== 'select') return;
      if (e.target !== e.currentTarget) return;

      const canvasPoint = screenToCanvas(e.clientX, e.clientY);
      onCreateRoomAtPosition(canvasPoint);
    },
    [selectedTool, screenToCanvas, onCreateRoomAtPosition]
  );

  const handleRoomMouseDown = useCallback(
    (e: React.MouseEvent<SVGGElement>, room: Room) => {
      if (selectedTool !== 'select') return;

      if (typeof room.x !== 'number' || typeof room.y !== 'number') {
        return;
      }

      e.stopPropagation();

      const pt = screenToCanvas(e.clientX, e.clientY);

      roomDragOffsetRef.current = {
        x: pt.x - room.x,
        y: pt.y - room.y,
      };

      setDraggingRoomId(room.id);
      onRoomSelect(room.id);
    },
    [screenToCanvas, onRoomSelect, selectedTool]
  );

  const handleSvgMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const pt = screenToCanvas(e.clientX, e.clientY);
      onCanvasMousePosition?.(pt);

      if (isMarqueeActive && marqueeStart) {
        setMarqueeEnd(pt);
        e.stopPropagation();
        return;
      }

      canvasMouseMove(e);
      continueDrag(e);

      if (draggingRoomId && roomDragOffsetRef.current) {
        const { x: ox, y: oy } = roomDragOffsetRef.current;
        onRoomMove(draggingRoomId, pt.x - ox, pt.y - oy);
      }
    },
    [
      canvasMouseMove,
      continueDrag,
      draggingRoomId,
      screenToCanvas,
      onRoomMove,
      onCanvasMousePosition,
      isMarqueeActive,
      marqueeStart,
    ]
  );

  const handleSvgMouseUp = useCallback(() => {
    if (isMarqueeActive && marqueeStart && marqueeEnd) {
      selectFurnitureInMarquee(marqueeStart, marqueeEnd);
      setIsMarqueeActive(false);
      setMarqueeStart(null);
      setMarqueeEnd(null);
      return;
    }

    canvasMouseUp();
    endDrag();
    setDraggingRoomId(null);
    roomDragOffsetRef.current = null;
  }, [
    isMarqueeActive,
    marqueeStart,
    marqueeEnd,
    selectFurnitureInMarquee,
    canvasMouseUp,
    endDrag,
  ]);

  // const renderRooms = () =>
  //   rooms
  //     .filter(
  //       (room) =>
  //         typeof room.x === 'number' &&
  //         typeof room.y === 'number' &&
  //         typeof room.width === 'number' &&
  //         typeof room.height === 'number'
  //     )
  //     .map((room) => {
  //       const isSelected = selectedItemId === room.id;

  //       const stroke = room.color || '#CBA35C';
  //       const fill =
  //         room.color && room.color.startsWith('#')
  //           ? `${room.color}99`
  //           : room.color || 'rgba(203,163,92,0.52)';

  //       const centerX = room.x! + room.width! / 2;
  //       const centerY = room.y! + room.height! / 2;

  //       return (
  //         <g key={room.id} onMouseDown={(e) => handleRoomMouseDown(e, room)}>
  //           <rect
  //             x={room.x}
  //             y={room.y}
  //             width={room.width}
  //             height={room.height}
  //             rx={4}
  //             ry={4}
  //             fill={fill}
  //             stroke={stroke}
  //             strokeWidth={isSelected ? 1.5 : 0.75}
  //             strokeDasharray={isSelected ? '4 2' : '3 3'}
  //           />
  //           <text
  //             x={centerX}
  //             y={centerY}
  //             textAnchor="middle"
  //             fontSize={14}
  //             fontWeight="bold"
  //             fill="#1E3A8A"
  //             stroke="#ffffff"
  //             strokeWidth={0.5}
  //             paintOrder="stroke"
  //             style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}
  //           >
  //             {room.name || 'ROOM'}
  //           </text>
  //           {room.area ? (
  //             <text
  //               x={centerX}
  //               y={centerY + 16}
  //               textAnchor="middle"
  //               fontSize={12}
  //               fill="#374151"
  //             >
  //               {room.area} sq ft
  //             </text>
  //           ) : null}
  //         </g>
  //       );
  //     });

  const renderRooms = () =>
    rooms
      .filter(
        (room) =>
          typeof room.x === 'number' &&
          typeof room.y === 'number' &&
          typeof room.width === 'number' &&
          typeof room.height === 'number'
      )
      .map((room) => {
        const textColor = room.color || '#000000';

        const centerX = room.x! + room.width! / 2;
        const centerY = room.y! + room.height! / 2;

        return (
          <g key={room.id} onMouseDown={(e) => handleRoomMouseDown(e, room)}>
            <rect
              x={room.x}
              y={room.y}
              width={room.width}
              height={room.height}
              rx={4}
              ry={4}
              fill="transparent"
            />
            <text
              x={centerX}
              y={centerY}
              textAnchor="middle"
              fontSize={18}
              fontWeight="bold"
              fill={textColor}
              paintOrder="stroke"
              style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}
            >
              {room.name || 'ROOM'}
            </text>
          </g>
        );
      });

  const renderTempWall = () => {
    if (selectedTool !== 'wall' || !drawingStart || !currentMousePos) {
      return null;
    }

    return (
      <line
        x1={drawingStart.x}
        y1={drawingStart.y}
        x2={currentMousePos.x}
        y2={currentMousePos.y}
        stroke="#9CA3AF"
        strokeWidth={6}
        strokeDasharray="5,5"
      />
    );
  };

  const renderDragPreview = () => {
    if (!dragPreviewPosition || !draggedItemId) return null;

    return (
      <g
        transform={`translate(${dragPreviewPosition.x},${dragPreviewPosition.y})`}
        pointerEvents="none"
        opacity={0.45}
      >
        <circle r={12} fill="#3B82F6" />
      </g>
    );
  };

  const renderMarquee = () => {
    if (!isMarqueeActive || !marqueeStart || !marqueeEnd) return null;

    const x = Math.min(marqueeStart.x, marqueeEnd.x);
    const y = Math.min(marqueeStart.y, marqueeEnd.y);
    const width = Math.abs(marqueeEnd.x - marqueeStart.x);
    const height = Math.abs(marqueeEnd.y - marqueeStart.y);

    return (
      <g pointerEvents="none">
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill="rgba(59, 130, 246, 0.15)"
          stroke="#3B82F6"
          strokeWidth={2}
          strokeDasharray="5 3"
        />
        <circle cx={x} cy={y} r={3} fill="#3B82F6" />
        <circle cx={x + width} cy={y} r={3} fill="#3B82F6" />
        <circle cx={x} cy={y + height} r={3} fill="#3B82F6" />
        <circle cx={x + width} cy={y + height} r={3} fill="#3B82F6" />
      </g>
    );
  };

  const findWallHit = (
    pt: Point,
    walls: FloorPlanData['walls'],
    threshold = 10
  ) => {
    for (const wall of walls) {
      if (wall.isCurved && wall.curvePoints?.length) continue;
      if (isPointNearLine(pt, wall.start, wall.end, threshold)) {
        return wall;
      }
    }
    return null;
  };

  const getPositionAlongWall = (
    pt: Point,
    wallStart: Point,
    wallEnd: Point
  ): number => {
    const dx = wallEnd.x - wallStart.x;
    const dy = wallEnd.y - wallStart.y;
    const lenSq = dx * dx + dy * dy;
    if (!lenSq) return 0.5;

    let t = ((pt.x - wallStart.x) * dx + (pt.y - wallStart.y) * dy) / lenSq;
    if (t < 0) t = 0;
    if (t > 1) t = 1;
    return t;
  };

  const renderCurveDraft = () => {
    if (selectedTool !== 'curve-wall' || curvePoints.length === 0) return null;

    const pts = [...curvePoints];
    if (currentMousePos) pts.push(currentMousePos);

    if (pts.length === 1) {
      const p = pts[0];
      return <circle cx={p.x} cy={p.y} r={4} fill="#3B82F6" />;
    }

    const d = pts
      .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
      .join(' ');

    return (
      <path
        d={d}
        stroke="#3B82F6"
        strokeWidth={4}
        fill="none"
        strokeDasharray="4 2"
      />
    );
  };

  const renderUnderlay = () => {
    if (!underlay) return null;

    const scale = underlay.scale ?? 0.8;
    const opacity = underlay.opacity ?? 0.35;
    const tx = underlay.offset?.x ?? 40;
    const ty = underlay.offset?.y ?? 40;

    if (underlay.svg) {
      return (
        <g
          opacity={opacity}
          transform={`translate(${tx},${ty}) scale(${scale})`}
          pointerEvents="none"
          dangerouslySetInnerHTML={{ __html: underlay.svg }}
        />
      );
    }

    if (underlay.href) {
      return (
        <g
          opacity={opacity}
          transform={`translate(${tx},${ty}) scale(${scale})`}
          pointerEvents="none"
        >
          <image href={underlay.href} width={1200} height={900} />
        </g>
      );
    }

    return null;
  };

  const isAnyDragging = isPanning || isCanvasDragging || isFurnitureDragging;

  useEffect(() => {
    console.log('selectedItemId', selectedItemId);
    console.log('selectedFurnitureIds', selectedFurnitureIds);
  }, [selectedItemId, selectedFurnitureIds]);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const onWheelNative = (ev: WheelEvent) => {
      ev.preventDefault();
      handleWheel(ev);
    };

    el.addEventListener('wheel', onWheelNative, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheelNative);
    };
  }, [handleWheel]);

  return (
    <div
      id="floor-plan-canvas"
      className="absolute inset-0 h-full w-full overflow-hidden"
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        onMouseDown={handleSvgMouseDown}
        onMouseMove={handleSvgMouseMove}
        onMouseUp={handleSvgMouseUp}
        onMouseLeave={handleSvgMouseUp}
        // onWheel={handleWheel}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragEnd={handleDragEnd}
        onDoubleClick={handleSvgDoubleClick}
        className={
          isMarqueeActive
            ? 'cursor-crosshair'
            : isAnyDragging
              ? 'cursor-grabbing'
              : selectedTool === 'pan'
                ? 'cursor-grab'
                : 'cursor-default'
        }
        style={{ backgroundColor }}
      >
        <g
          transform={`translate(${viewport.x},${viewport.y}) scale(${viewport.scale})`}
        >
          {renderUnderlay()}
          <GridOverlay
            width={width}
            height={height}
            gridSize={gridSize}
            showGrid={showGrid}
            color="#36454F"
            opacity={0.3}
          />

          {walls.map((wall) => (
            <WallComponent
              key={wall.id}
              wall={wall}
              isSelected={selectedItemId === wall.id}
              showDimensions={showDimensions}
              pixelsPerFoot={pixelsPerFoot}
              onClick={() => {
                if (selectedTool === 'select') {
                  onItemSelect(wall.id, 'wall');
                }
              }}
              onDoorClick={(doorId) => {
                onDoorSelect(wall.id, doorId);
              }}
              onWindowClick={(windowId) => {
                onWindowSelect(wall.id, windowId);
              }}
            />
          ))}

          {renderFurniture()}

          {renderRooms()}

          {renderTempWall()}

          {renderCurveDraft()}

          {renderDragPreview()}

          {renderMarquee()}
        </g>
      </svg>

      <div className="absolute bottom-6 left-6 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
        <div className="flex items-center">
          <button
            onClick={zoomIn}
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

          <button
            onClick={resetZoom}
            className="border-b border-gray-200 px-2 py-2 transition-colors hover:bg-gray-100"
            title="Reset Zoom"
          >
            <span className="text-sm font-medium text-gray-700">
              {Math.round(viewport.scale * 100)}%
            </span>
          </button>

          <button
            onClick={zoomOut}
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

      {currentMousePos && (
        <div className="bg-opacity-80 absolute right-6 bottom-6 rounded-lg bg-gray-900 px-3 py-2 font-mono text-xs text-white">
          X: {Math.round(currentMousePos.x)} Y: {Math.round(currentMousePos.y)}
        </div>
      )}
    </div>
  );
};
