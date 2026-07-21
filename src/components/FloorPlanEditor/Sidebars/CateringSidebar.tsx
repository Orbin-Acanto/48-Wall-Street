import React from 'react';
import {
  CATERING_LIBRARY,
  getAllCateringCategories,
} from '@/constants/cateringStations';
import { LibrarySidebar } from './LibrarySidebar';

export const CateringSidebar: React.FC = () => (
  <LibrarySidebar
    title="Catering"
    subtitle="Drag stations to canvas"
    items={CATERING_LIBRARY}
    categories={getAllCateringCategories()}
    searchPlaceholder="Search catering..."
  />
);
