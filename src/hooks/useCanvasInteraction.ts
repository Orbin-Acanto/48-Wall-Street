import { useState, useCallback, RefObject } from 'react';
import { Point, Tool, ViewportTransform } from '../types/floorplan.types';
import { snapToGrid as snapPointToGrid } from '../utils/geometryUtils';

interface UseCanvasInteractionProps {
  svgRef: RefObject<SVGSVGElement>;
  selectedTool: Tool;
  shouldSnapToGrid: boolean;
  gridSize: number;
  onWallCreate?: (start: Point, end: Point) => void;
  onCurvedWallCreate?: (start: Point, control: Point, end: Point) => void;
  onItemSelect?: (id: string | null) => void;
}

export const useCanvasInteraction = ({
  svgRef,
  selectedTool,
  shouldSnapToGrid,
  gridSize,
  onCurvedWallCreate,
  onWallCreate,
}: UseCanvasInteractionProps) => {
  const [viewport, setViewport] = useState<ViewportTransform>({
    x: 0,
    y: 0,
    scale: 1,
  });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<Point>({ x: 0, y: 0 });
  const [drawingStart, setDrawingStart] = useState<Point | null>(null);
  const [currentMousePos, setCurrentMousePos] = useState<Point | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [curveStart, setCurveStart] = useState<Point | null>(null);
  const [curveEnd, setCurveEnd] = useState<Point | null>(null);

  // Convert screen coordinates to canvas coordinates
  const screenToCanvas = useCallback(
    (screenX: number, screenY: number): Point => {
      if (!svgRef.current) return { x: 0, y: 0 };

      const rect = svgRef.current.getBoundingClientRect();
      const x = (screenX - rect.left - viewport.x) / viewport.scale;
      const y = (screenY - rect.top - viewport.y) / viewport.scale;

      return shouldSnapToGrid ? snapPointToGrid({ x, y }, gridSize) : { x, y };
    },
    [viewport, shouldSnapToGrid, gridSize, svgRef]
  );

  // Convert canvas coordinates to screen coordinates
  const canvasToScreen = useCallback(
    (canvasX: number, canvasY: number): Point => {
      return {
        x: canvasX * viewport.scale + viewport.x,
        y: canvasY * viewport.scale + viewport.y,
      };
    },
    [viewport]
  );

  // Handle mouse down
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const point = screenToCanvas(e.clientX, e.clientY);

      // Pan with middle mouse or space key
      if (e.button === 1 || (e.button === 0 && selectedTool === 'pan')) {
        setIsPanning(true);
        setPanStart({ x: e.clientX - viewport.x, y: e.clientY - viewport.y });
        return;
      }

      // Tool-specific actions
      switch (selectedTool) {
        case 'wall':
          if (!drawingStart) {
            setDrawingStart(point);
          } else {
            onWallCreate?.(drawingStart, point);
            setDrawingStart(null);
          }
          break;
        case 'curveWall':
          if (!curveStart) {
            setCurveStart(point);
          } else if (!curveEnd) {
            setCurveEnd(point);
          } else {
            onCurvedWallCreate?.(curveStart, point, curveEnd);
            setCurveStart(null);
            setCurveEnd(null);
          }
          break;

        case 'select':
          setIsDragging(true);
          break;

        default:
          break;
      }
    },
    [
      screenToCanvas,
      selectedTool,
      drawingStart,
      viewport,
      onWallCreate,
      onCurvedWallCreate,
      curveStart,
      curveEnd,
    ]
  );

  // Handle mouse move
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
    },
    [screenToCanvas, isPanning, panStart]
  );

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
    setIsDragging(false);
  }, []);

  // Handle wheel for zoom
  const handleWheel = useCallback(
    (e: React.WheelEvent<SVGSVGElement>) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;

      setViewport((prev) => {
        const newScale = Math.max(0.1, Math.min(5, prev.scale * delta));

        // Zoom towards mouse position
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
    },
    [svgRef]
  );

  // Zoom controls
  const zoomIn = useCallback(() => {
    setViewport((prev) => ({
      ...prev,
      scale: Math.min(prev.scale * 1.2, 5),
    }));
  }, []);

  const zoomOut = useCallback(() => {
    setViewport((prev) => ({
      ...prev,
      scale: Math.max(prev.scale / 1.2, 0.1),
    }));
  }, []);

  const resetZoom = useCallback(() => {
    setViewport({ x: 0, y: 0, scale: 1 });
  }, []);

  // Pan controls
  const pan = useCallback((dx: number, dy: number) => {
    setViewport((prev) => ({
      ...prev,
      x: prev.x + dx,
      y: prev.y + dy,
    }));
  }, []);

  return {
    viewport,
    isPanning,
    drawingStart,
    currentMousePos,
    isDragging,
    screenToCanvas,
    canvasToScreen,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    zoomIn,
    zoomOut,
    resetZoom,
    pan,
    setDrawingStart,
  };
};
