import React from 'react';
import { DECOR_LIBRARY, getDecorCategories } from '@/constants/decorLibrary';
import { LibrarySidebar } from './LibrarySidebar';

export const DecorSidebar: React.FC = () => (
  <LibrarySidebar
    title="Decor/Props"
    subtitle="Drag items to canvas"
    items={DECOR_LIBRARY}
    categories={getDecorCategories()}
    searchPlaceholder="Search decor / props..."
  />
);
