import {
  FURNITURE_LIBRARY,
  getAllCategories,
} from '@/constants/furnitureLibrary';
import React from 'react';
import { LibrarySidebar } from './LibrarySidebar';

export const FurnitureSidebar: React.FC = () => (
  <LibrarySidebar
    title="Furniture"
    subtitle="Drag items to canvas"
    items={FURNITURE_LIBRARY}
    categories={getAllCategories()}
    searchPlaceholder="Search furniture..."
  />
);
