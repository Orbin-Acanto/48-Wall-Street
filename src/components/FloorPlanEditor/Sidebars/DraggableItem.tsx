import { DraggableLibraryItem } from '@/types/floorplan.types';
import React from 'react';

interface DraggableItemProps {
  item: DraggableLibraryItem;
}

export const DraggableItem: React.FC<DraggableItemProps> = ({ item }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('libraryItemId', item.id);
    e.dataTransfer.effectAllowed = 'copy';

    const dragImage = e.currentTarget.cloneNode(true) as HTMLElement;
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 50, 50);

    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="group flex cursor-grab flex-col items-center rounded-lg border-2 border-gray-200 bg-white p-3 transition-all hover:border-blue-400 hover:shadow-md active:cursor-grabbing"
    >
      {/* SVG Preview */}
      <div className="mb-2 flex h-20 w-20 items-center justify-center rounded bg-gray-50 transition-colors group-hover:bg-blue-50">
        <svg
          width="80"
          height="80"
          viewBox="-40 -40 80 80"
          className="max-h-full max-w-full"
        >
          <g dangerouslySetInnerHTML={{ __html: item.svgPath }} />
        </svg>
      </div>

      {/* Item Name */}
      <p className="line-clamp-2 min-h-[2rem] text-center text-xs font-medium text-gray-700">
        {item.name}
      </p>

      {/* Dimensions */}
      <p className="mt-1 text-xs text-gray-500">
        {item.defaultDimensions.width}&quot; × {item.defaultDimensions.height}
        &quot;
      </p>

      {/* Category Badge */}
      <span className="mt-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
        {item.category}
      </span>
    </div>
  );
};
