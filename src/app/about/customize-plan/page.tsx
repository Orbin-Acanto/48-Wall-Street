'use client';

import { FloorPlanEditor } from '@/components/FloorPlanEditor';
import React from 'react';

const Page = () => {
  return (
    <>
      <h1 className="sr-only">Customize Your Event Floor Plan</h1>
      <FloorPlanEditor />
    </>
  );
};

export default Page;
