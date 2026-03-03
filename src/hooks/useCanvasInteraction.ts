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
    scale: 0.33,
  });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<Point>({ x: 0, y: 0 });
  const [drawingStart, setDrawingStart] = useState<Point | null>(null);
  const [currentMousePos, setCurrentMousePos] = useState<Point | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [curveStart, setCurveStart] = useState<Point | null>(null);
  const [curveEnd, setCurveEnd] = useState<Point | null>(null);

  const screenToCanvasRaw = useCallback(
    (screenX: number, screenY: number): Point => {
      if (!svgRef.current) return { x: 0, y: 0 };
      const rect = svgRef.current.getBoundingClientRect();
      const x = (screenX - rect.left - viewport.x) / viewport.scale;
      const y = (screenY - rect.top - viewport.y) / viewport.scale;
      return { x, y };
    },
    [viewport, svgRef]
  );

  const screenToCanvas = useCallback(
    (screenX: number, screenY: number): Point => {
      const raw = screenToCanvasRaw(screenX, screenY);
      return shouldSnapToGrid ? snapPointToGrid(raw, gridSize) : raw;
    },
    [screenToCanvasRaw, shouldSnapToGrid, gridSize]
  );

  const canvasToScreen = useCallback(
    (canvasX: number, canvasY: number): Point => {
      return {
        x: canvasX * viewport.scale + viewport.x,
        y: canvasY * viewport.scale + viewport.y,
      };
    },
    [viewport]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const point = screenToCanvas(e.clientX, e.clientY);

      if (e.button === 1 || (e.button === 0 && selectedTool === 'pan')) {
        setIsPanning(true);
        setPanStart({ x: e.clientX - viewport.x, y: e.clientY - viewport.y });
        return;
      }

      switch (selectedTool) {
        case 'wall':
          if (!drawingStart) {
            setDrawingStart(point);
          } else {
            onWallCreate?.(drawingStart, point);
            setDrawingStart(null);
          }
          break;
        case 'curve-wall':
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

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
    setIsDragging(false);
  }, []);

  // const handleWheel = useCallback(
  //   (e: WheelEvent) => {
  //     e.preventDefault();
  //     const delta = e.deltaY > 0 ? 0.9 : 1.1;

  //     setViewport((prev) => {
  //       const newScale = Math.max(0.1, Math.min(5, prev.scale * delta));

  //       const rect = svgRef.current?.getBoundingClientRect();
  //       if (!rect) return prev;

  //       const mouseX = e.clientX - rect.left;
  //       const mouseY = e.clientY - rect.top;

  //       const newX = mouseX - (mouseX - prev.x) * (newScale / prev.scale);
  //       const newY = mouseY - (mouseY - prev.y) * (newScale / prev.scale);

  //       return {
  //         x: newX,
  //         y: newY,
  //         scale: newScale,
  //       };
  //     });
  //   },
  //   [svgRef]
  // );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let dy = e.deltaY;

      if (e.deltaMode === 1) dy *= 16;
      if (e.deltaMode === 2) dy *= rect.height;

      dy = Math.max(-120, Math.min(120, dy));

      const zoomIntensity = 0.0025;
      const zoomFactor = Math.exp(-dy * zoomIntensity);

      setViewport((prev) => {
        const minScale = 0.1;
        const maxScale = 5;

        const nextScale = Math.max(
          minScale,
          Math.min(maxScale, prev.scale * zoomFactor)
        );
        if (nextScale === prev.scale) return prev;

        const scaleRatio = nextScale / prev.scale;
        const nextX = mouseX - (mouseX - prev.x) * scaleRatio;
        const nextY = mouseY - (mouseY - prev.y) * scaleRatio;

        return { x: nextX, y: nextY, scale: nextScale };
      });
    },
    [svgRef]
  );

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
    setViewport({ x: 0, y: 0, scale: 0.33 });
  }, []);

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
    screenToCanvasRaw,
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
