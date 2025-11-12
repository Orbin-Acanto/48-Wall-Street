import { useState, useCallback } from 'react';
import {
  GetPosFn,
  Point,
  UseFurnitureDragProps,
} from '../types/floorplan.types';

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

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>, libraryItemId: string) => {
      e.dataTransfer.effectAllowed = 'copy';
      e.dataTransfer.setData('libraryItemId', libraryItemId);
      setDraggedItemId(libraryItemId);

      const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;
      dragImage.style.position = 'absolute';
      dragImage.style.top = '-1000px';
      dragImage.style.opacity = '0.8';
      document.body.appendChild(dragImage);

      e.dataTransfer.setDragImage(dragImage, 50, 50);

      setTimeout(() => {
        if (document.body.contains(dragImage)) {
          document.body.removeChild(dragImage);
        }
      }, 0);
    },
    []
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<SVGSVGElement>) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';

      const position = screenToCanvas(e.clientX, e.clientY);
      setDragPreviewPosition(position);
    },
    [screenToCanvas]
  );

  const handleDragEnter = useCallback((e: React.DragEvent<SVGSVGElement>) => {
    e.preventDefault();
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<SVGSVGElement>) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
      setDragPreviewPosition(null);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<SVGSVGElement>) => {
      e.preventDefault();

      const libraryItemId = e.dataTransfer.getData('libraryItemId');
      if (!libraryItemId) return;

      const position = screenToCanvas(e.clientX, e.clientY);
      onDrop(libraryItemId, position);

      setDraggedItemId(null);
      setDragPreviewPosition(null);
    },
    [screenToCanvas, onDrop]
  );

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

export const useFurnitureDrag = ({
  onMove,
  screenToCanvas,
}: UseFurnitureDragProps) => {
  const [draggingAnchorId, setDraggingAnchorId] = useState<string | null>(null);
  const [groupIds, setGroupIds] = useState<string[]>([]);
  const [groupStartPos, setGroupStartPos] = useState<Map<string, Point> | null>(
    null
  );
  const [anchorStart, setAnchorStart] = useState<Point | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const startGroupDrag = useCallback(
    (
      e: React.MouseEvent,
      anchorId: string,
      selectedIds: string[],
      getPositionById: GetPosFn
    ) => {
      const startPt = screenToCanvas(e.clientX, e.clientY);
      const ids = selectedIds.length ? selectedIds : [anchorId];

      const startMap = new Map<string, Point>();
      ids.forEach((id) => {
        const p = getPositionById(id);
        if (p) startMap.set(id, { x: p.x, y: p.y });
      });

      setDraggingAnchorId(anchorId);
      setGroupIds(ids);
      setGroupStartPos(startMap);
      setAnchorStart(startPt);
      setIsDragging(true);
    },
    [screenToCanvas]
  );

  const continueDrag = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !anchorStart || !groupStartPos) return;
      const pt = screenToCanvas(e.clientX, e.clientY);
      const dx = pt.x - anchorStart.x;
      const dy = pt.y - anchorStart.y;

      groupStartPos.forEach((startPos, id) => {
        onMove(id, { x: startPos.x + dx, y: startPos.y + dy });
      });
    },
    [isDragging, anchorStart, groupStartPos, screenToCanvas, onMove]
  );

  const endDrag = useCallback(() => {
    setIsDragging(false);
    setDraggingAnchorId(null);
    setGroupIds([]);
    setGroupStartPos(null);
    setAnchorStart(null);
  }, []);

  return {
    isDragging,
    startGroupDrag,
    continueDrag,
    endDrag,
  };
};
