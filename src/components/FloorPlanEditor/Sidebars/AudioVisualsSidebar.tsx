import {
  AV_EQUIPMENT_LIBRARY,
  getAllAVCategories,
} from '@/constants/avEquipment';
import React from 'react';
import { LibrarySidebar } from './LibrarySidebar';

export const AudioVisualsSidebar: React.FC = () => (
  <LibrarySidebar
    title="Audio/Visual"
    subtitle="Drag equipment to canvas"
    items={AV_EQUIPMENT_LIBRARY}
    categories={getAllAVCategories()}
    searchPlaceholder="Search audio / visual..."
  />
);
