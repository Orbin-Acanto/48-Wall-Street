import React, { useRef, useCallback } from 'react';
import {
  FloorPlanData,
  Point,
  Tool,
  FurnitureItem as FurnitureItemType,
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
  onItemSelect: (
    id: string | null,
    type: 'wall' | 'furniture' | 'room'
  ) => void;
  onWallCreate: (start: Point, end: Point) => void;
  onFurnitureMove: (id: string, position: Point) => void;
  onFurnitureDrop: (libraryItemId: string, position: Point) => void;
  onAddDoor: (wallId: string, position?: number) => void;
  onAddWindow: (wallId: string, position?: number) => void;
  onDoorSelect: (wallId: string, doorId: string) => void;
  onWindowSelect: (wallId: string, windowId: string) => void;
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
}) => {
  const svgRef = useRef<SVGSVGElement>(null!);

  const { canvasSettings, walls, furniture } = floorPlan;

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
    draggingItemId,
    isDragging: isFurnitureDragging,
    startDrag,
    continueDrag,
    endDrag,
  } = useFurnitureDrag({
    onMove: onFurnitureMove,
    screenToCanvas,
  });

  const handleSvgMouseDown = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const canvasPoint = screenToCanvas(e.clientX, e.clientY);

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

  const handleSvgMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      canvasMouseMove(e);
      continueDrag(e);
    },
    [canvasMouseMove, continueDrag]
  );

  const handleSvgMouseUp = useCallback(() => {
    canvasMouseUp();
    endDrag();
  }, [canvasMouseUp, endDrag]);

  const renderFurniture = () =>
    furniture.map((item: FurnitureItemType) => {
      const isSelected = selectedItemId === item.id;

      return (
        <FurnitureItem
          key={item.id}
          item={item}
          isSelected={isSelected}
          showDimensions={showDimensions}
          pixelsPerFoot={pixelsPerFoot}
          onClick={() => {
            onItemSelect(item.id, 'furniture');
          }}
          onDragStart={(e) => {
            e.stopPropagation();

            if (selectedTool === 'select') {
              onItemSelect(item.id, 'furniture');
            }

            startDrag(e, item.id, item.position);
          }}
        />
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

  const findWallHit = (
    pt: Point,
    walls: FloorPlanData['walls'],
    threshold = 10
  ) => {
    for (const wall of walls) {
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

  const isAnyDragging = isPanning || isCanvasDragging || isFurnitureDragging;

  return (
    <div
      id="floor-plan-canvas"
      className="relative h-full w-full overflow-hidden"
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        onMouseDown={handleSvgMouseDown}
        onMouseMove={handleSvgMouseMove}
        onMouseUp={handleSvgMouseUp}
        onMouseLeave={handleSvgMouseUp}
        onWheel={handleWheel}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragEnd={handleDragEnd}
        className={
          isAnyDragging
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
          <GridOverlay
            width={width}
            height={height}
            gridSize={gridSize}
            showGrid={showGrid}
            color="#D1D5DB"
            opacity={0.9}
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

          {renderTempWall()}

          {renderDragPreview()}
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
