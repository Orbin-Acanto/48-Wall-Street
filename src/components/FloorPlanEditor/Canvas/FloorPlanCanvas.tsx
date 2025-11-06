import {
  FloorPlanData,
  Point,
  Tool,
  ViewportTransform,
} from '@/types/floorplan.types';
import { feetToPixels } from '@/utils/conversionUtils';
import { calculateDistance, snapToGrid } from '@/utils/geometryUtils';
import React, { useRef, useState, useCallback, useEffect } from 'react';

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
}

export const FloorPlanCanvas: React.FC<FloorPlanCanvasProps> = ({
  floorPlan,
  selectedTool,
  selectedItemId,
  onItemSelect,
  onWallCreate,
  onFurnitureMove,
  onFurnitureDrop,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewport, setViewport] = useState<ViewportTransform>({
    x: 0,
    y: 0,
    scale: 1,
  });
  const [isPanning, setIsPanning] = useState(false);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [panStart, setPanStart] = useState<Point>({ x: 0, y: 0 });
  const [drawingStart, setDrawingStart] = useState<Point | null>(null);
  const [currentMousePos, setCurrentMousePos] = useState<Point | null>(null);
  const [draggingFurnitureId, setDraggingFurnitureId] = useState<string | null>(
    null
  );
  const [dragOffset, setDragOffset] = useState<Point>({ x: 0, y: 0 });

  const { canvasSettings, walls, furniture, isLocked } = floorPlan;
  const {
    scale: pixelsPerFoot,
    showGrid,
    showDimensions,
    snapToGrid: shouldSnapToGrid,
    gridSize,
  } = canvasSettings;

  const screenToCanvas = useCallback(
    (screenX: number, screenY: number): Point => {
      if (!svgRef.current) return { x: 0, y: 0 };

      const rect = svgRef.current.getBoundingClientRect();
      const x = (screenX - rect.left - viewport.x) / viewport.scale;
      const y = (screenY - rect.top - viewport.y) / viewport.scale;

      return shouldSnapToGrid ? snapToGrid({ x, y }, gridSize) : { x, y };
    },
    [viewport, shouldSnapToGrid, gridSize]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsSpacePressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const point = screenToCanvas(e.clientX, e.clientY);

      if (e.button === 1 || (e.button === 0 && isSpacePressed)) {
        setIsPanning(true);
        setPanStart({ x: e.clientX - viewport.x, y: e.clientY - viewport.y });
        return;
      }

      switch (selectedTool) {
        case 'wall':
          if (!isLocked) {
            if (!drawingStart) {
              setDrawingStart(point);
            } else {
              onWallCreate(drawingStart, point);
              setDrawingStart(null);
            }
          }
          break;

        case 'select':
          const clickedFurniture = furniture.find((item) => {
            const dx = point.x - item.position.x;
            const dy = point.y - item.position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const itemRadius =
              Math.max(
                feetToPixels(item.dimensions.width / 12, pixelsPerFoot),
                feetToPixels(item.dimensions.height / 12, pixelsPerFoot)
              ) / 2;
            return distance < itemRadius;
          });

          if (clickedFurniture) {
            onItemSelect(clickedFurniture.id, 'furniture');
            setDraggingFurnitureId(clickedFurniture.id);
            setDragOffset({
              x: point.x - clickedFurniture.position.x,
              y: point.y - clickedFurniture.position.y,
            });
          } else {
            const clickedWall = walls.find((wall) => {
              const distToLine = pointToLineDistance(
                point,
                wall.start,
                wall.end
              );
              return distToLine < 10;
            });

            if (clickedWall) {
              onItemSelect(clickedWall.id, 'wall');
            } else {
              onItemSelect(null, 'wall');
            }
          }
          break;
      }
    },
    [
      screenToCanvas,
      selectedTool,
      isLocked,
      drawingStart,
      furniture,
      walls,
      viewport,
      pixelsPerFoot,
      onWallCreate,
      onItemSelect,
    ]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const point = screenToCanvas(e.clientX, e.clientY);
      setCurrentMousePos(point);

      if (isPanning) {
        setViewport((prev) => ({
          ...prev,
          x: e.clientX - panStart.x,
          y: e.clientY - panStart.y,
        }));
        return;
      }

      if (draggingFurnitureId) {
        const newPosition = {
          x: point.x - dragOffset.x,
          y: point.y - dragOffset.y,
        };
        onFurnitureMove(draggingFurnitureId, newPosition);
      }
    },
    [
      screenToCanvas,
      isPanning,
      panStart,
      draggingFurnitureId,
      dragOffset,
      onFurnitureMove,
    ]
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
    setDraggingFurnitureId(null);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;

    setViewport((prev) => {
      const newScale = Math.max(0.1, Math.min(5, prev.scale * delta));

      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return prev;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const newX = mouseX - (mouseX - prev.x) * (newScale / prev.scale);
      const newY = mouseY - (mouseY - prev.y) * (newScale / prev.scale);

      return {
        x: newX,
        y: newY,
        scale: newScale,
      };
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<SVGSVGElement>) => {
      e.preventDefault();
      const libraryItemId = e.dataTransfer.getData('libraryItemId');
      if (!libraryItemId) return;

      const point = screenToCanvas(e.clientX, e.clientY);
      onFurnitureDrop(libraryItemId, point);
    },
    [screenToCanvas, onFurnitureDrop]
  );

  const handleDragOver = useCallback((e: React.DragEvent<SVGSVGElement>) => {
    e.preventDefault();
  }, []);

  const renderGrid = () => {
    if (!showGrid) return null;

    const gridLines = [];
    const { width, height } = canvasSettings;

    for (let x = 0; x <= width; x += gridSize) {
      gridLines.push(
        <line
          key={`v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={height}
          stroke="#E0E0E0"
          strokeWidth={0.5}
        />
      );
    }

    for (let y = 0; y <= height; y += gridSize) {
      gridLines.push(
        <line
          key={`h-${y}`}
          x1={0}
          y1={y}
          x2={width}
          y2={y}
          stroke="#E0E0E0"
          strokeWidth={0.5}
        />
      );
    }

    return <g className="grid">{gridLines}</g>;
  };

  const renderWalls = () => {
    return walls.map((wall) => {
      const isSelected = selectedItemId === wall.id;
      const length = calculateDistance(wall.start, wall.end);
      const angle = Math.atan2(
        wall.end.y - wall.start.y,
        wall.end.x - wall.start.x
      );

      return (
        <g key={wall.id}>
          <line
            x1={wall.start.x}
            y1={wall.start.y}
            x2={wall.end.x}
            y2={wall.end.y}
            stroke={isSelected ? '#FF6B6B' : '#333'}
            strokeWidth={wall.thickness}
            strokeLinecap="square"
          />

          {showDimensions && (
            <text
              x={(wall.start.x + wall.end.x) / 2}
              y={(wall.start.y + wall.end.y) / 2 - 10}
              fontSize="12"
              fill="#333"
              textAnchor="middle"
            >
              {wall.lengthInFeet.toFixed(1)}'
            </text>
          )}

          {wall.doors.map((door) => renderDoorOnWall(wall, door, angle))}
          {wall.windows.map((window) =>
            renderWindowOnWall(wall, window, angle)
          )}
        </g>
      );
    });
  };

  const renderDoorOnWall = (wall: any, door: any, wallAngle: number) => {
    const wallLength = calculateDistance(wall.start, wall.end);
    const doorPosition =
      wall.start.x + (wall.end.x - wall.start.x) * door.position;
    const doorY = wall.start.y + (wall.end.y - wall.start.y) * door.position;
    const doorWidth = feetToPixels(door.width / 12, pixelsPerFoot);

    return (
      <g
        key={door.id}
        transform={`translate(${doorPosition},${doorY}) rotate(${(wallAngle * 180) / Math.PI})`}
      >
        <rect
          x={-doorWidth / 2}
          y={-wall.thickness / 2}
          width={doorWidth}
          height={wall.thickness}
          fill="#8B4513"
          stroke="#000"
          strokeWidth={1}
        />
      </g>
    );
  };

  const renderWindowOnWall = (wall: any, window: any, wallAngle: number) => {
    const windowPosition =
      wall.start.x + (wall.end.x - wall.start.x) * window.position;
    const windowY =
      wall.start.y + (wall.end.y - wall.start.y) * window.position;
    const windowWidth = feetToPixels(window.width / 12, pixelsPerFoot);

    return (
      <g
        key={window.id}
        transform={`translate(${windowPosition},${windowY}) rotate(${(wallAngle * 180) / Math.PI})`}
      >
        <rect
          x={-windowWidth / 2}
          y={-wall.thickness / 2}
          width={windowWidth}
          height={wall.thickness}
          fill="#87CEEB"
          stroke="#000"
          strokeWidth={1}
          opacity={0.6}
        />
      </g>
    );
  };

  const renderFurniture = () => {
    return furniture.map((item) => {
      const isSelected = selectedItemId === item.id;
      const widthPx = feetToPixels(item.dimensions.width / 12, pixelsPerFoot);
      const heightPx = feetToPixels(item.dimensions.height / 12, pixelsPerFoot);

      return (
        <g
          key={item.id}
          transform={`translate(${item.position.x},${item.position.y}) rotate(${item.rotation})`}
          style={{ cursor: 'move' }}
        >
          {isSelected && (
            <rect
              x={-widthPx / 2 - 5}
              y={-heightPx / 2 - 5}
              width={widthPx + 10}
              height={heightPx + 10}
              fill="none"
              stroke="#4ECDC4"
              strokeWidth={2}
              strokeDasharray="4"
            />
          )}

          <g dangerouslySetInnerHTML={{ __html: item.svgPath }} />

          {showDimensions && (
            <text
              y={heightPx / 2 + 15}
              fontSize="10"
              fill="#666"
              textAnchor="middle"
            >
              {item.dimensions.width}" × {item.dimensions.height}"
            </text>
          )}
        </g>
      );
    });
  };

  const renderTempWall = () => {
    if (selectedTool !== 'wall' || !drawingStart || !currentMousePos)
      return null;

    return (
      <line
        x1={drawingStart.x}
        y1={drawingStart.y}
        x2={currentMousePos.x}
        y2={currentMousePos.y}
        stroke="#999"
        strokeWidth={6}
        strokeDasharray="5,5"
      />
    );
  };

  const handleZoomIn = () => {
    setViewport((prev) => ({
      ...prev,
      scale: Math.min(prev.scale * 1.2, 5),
    }));
  };

  const handleZoomOut = () => {
    setViewport((prev) => ({
      ...prev,
      scale: Math.max(prev.scale / 1.2, 0.1),
    }));
  };

  const handleResetZoom = () => {
    setViewport({ x: 0, y: 0, scale: 1 });
  };

  return (
    <div
      id="floor-plan-canvas"
      className="relative h-full w-full overflow-hidden"
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`${isPanning ? 'cursor-grabbing' : selectedTool === 'pan' ? 'cursor-grab' : 'cursor-default'}`}
        style={{
          backgroundColor: canvasSettings.backgroundColor,
        }}
      >
        <g
          transform={`translate(${viewport.x},${viewport.y}) scale(${viewport.scale})`}
        >
          {renderGrid()}
          {renderWalls()}
          {renderFurniture()}
          {renderTempWall()}
        </g>
      </svg>

      <div className="absolute bottom-6 left-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
        <div className="flex flex-col">
          <button
            onClick={handleZoomIn}
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
            onClick={handleResetZoom}
            className="border-b border-gray-200 px-4 py-2 transition-colors hover:bg-gray-100"
            title="Reset Zoom"
          >
            <span className="text-sm font-medium text-gray-700">
              {Math.round(viewport.scale * 100)}%
            </span>
          </button>

          <button
            onClick={handleZoomOut}
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

function pointToLineDistance(
  point: Point,
  lineStart: Point,
  lineEnd: Point
): number {
  const A = point.x - lineStart.x;
  const B = point.y - lineStart.y;
  const C = lineEnd.x - lineStart.x;
  const D = lineEnd.y - lineStart.y;

  const dot = A * C + B * D;
  const lenSq = C * C + D * D;
  let param = -1;

  if (lenSq !== 0) param = dot / lenSq;

  let xx, yy;

  if (param < 0) {
    xx = lineStart.x;
    yy = lineStart.y;
  } else if (param > 1) {
    xx = lineEnd.x;
    yy = lineEnd.y;
  } else {
    xx = lineStart.x + param * C;
    yy = lineStart.y + param * D;
  }

  const dx = point.x - xx;
  const dy = point.y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}
