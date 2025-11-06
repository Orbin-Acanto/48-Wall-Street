import { useState, useCallback } from 'react';
import { Point } from '../types/floorplan.types';

interface UseDragAndDropProps {
  onDrop: (libraryItemId: string, position: Point) => void;
  screenToCanvas: (screenX: number, screenY: number) => Point;
}

export const useDragAndDrop = ({
  onDrop,
  screenToCanvas,
}: UseDragAndDropProps) => {
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragPreviewPosition, setDragPreviewPosition] = useState<Point | null>(
    null
  );

  // Handle drag start from library
  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, libraryItemId: string) => {
      e.dataTransfer.effectAllowed = 'copy';
      e.dataTransfer.setData('libraryItemId', libraryItemId);
      setDraggedItemId(libraryItemId);

      // Create custom drag image
      const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;
      dragImage.style.position = 'absolute';
      dragImage.style.top = '-1000px';
      dragImage.style.opacity = '0.8';
      document.body.appendChild(dragImage);

      e.dataTransfer.setDragImage(dragImage, 50, 50);

      // Clean up drag image after a short delay
      setTimeout(() => {
        if (document.body.contains(dragImage)) {
          document.body.removeChild(dragImage);
        }
      }, 0);
    },
    []
  );

  // Handle drag over canvas
  const handleDragOver = useCallback(
    (e: React.DragEvent<SVGSVGElement>) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';

      const position = screenToCanvas(e.clientX, e.clientY);
      setDragPreviewPosition(position);
    },
    [screenToCanvas]
  );

  // Handle drag enter
  const handleDragEnter = useCallback((e: React.DragEvent<SVGSVGElement>) => {
    e.preventDefault();
  }, []);

  // Handle drag leave
  const handleDragLeave = useCallback((e: React.DragEvent<SVGSVGElement>) => {
    // Only clear if leaving the canvas entirely
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
      setDragPreviewPosition(null);
    }
  }, []);

  // Handle drop on canvas
  const handleDrop = useCallback(
    (e: React.DragEvent<SVGSVGElement>) => {
      e.preventDefault();

      const libraryItemId = e.dataTransfer.getData('libraryItemId');
      if (!libraryItemId) return;

      const position = screenToCanvas(e.clientX, e.clientY);
      onDrop(libraryItemId, position);

      // Clean up
      setDraggedItemId(null);
      setDragPreviewPosition(null);
    },
    [screenToCanvas, onDrop]
  );

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setDraggedItemId(null);
    setDragPreviewPosition(null);
  }, []);

  return {
    draggedItemId,
    dragPreviewPosition,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  };
};

/**
 * Hook for handling furniture item dragging on canvas
 */
interface UseFurnitureDragProps {
  onMove: (id: string, position: Point) => void;
  screenToCanvas: (screenX: number, screenY: number) => Point;
}

export const useFurnitureDrag = ({
  onMove,
  screenToCanvas,
}: UseFurnitureDragProps) => {
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<Point>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const startDrag = useCallback(
    (e: React.MouseEvent, itemId: string, itemPosition: Point) => {
      const canvasPoint = screenToCanvas(e.clientX, e.clientY);
      setDraggingItemId(itemId);
      setDragOffset({
        x: canvasPoint.x - itemPosition.x,
        y: canvasPoint.y - itemPosition.y,
      });
      setIsDragging(true);
    },
    [screenToCanvas]
  );

  const continueDrag = useCallback(
    (e: React.MouseEvent) => {
      if (!draggingItemId || !isDragging) return;

      const canvasPoint = screenToCanvas(e.clientX, e.clientY);
      const newPosition = {
        x: canvasPoint.x - dragOffset.x,
        y: canvasPoint.y - dragOffset.y,
      };

      onMove(draggingItemId, newPosition);
    },
    [draggingItemId, isDragging, dragOffset, screenToCanvas, onMove]
  );

  const endDrag = useCallback(() => {
    setDraggingItemId(null);
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  return {
    draggingItemId,
    isDragging,
    startDrag,
    continueDrag,
    endDrag,
  };
};
