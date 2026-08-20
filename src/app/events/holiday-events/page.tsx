import React from 'react';
import EventDetails from '@/components/EventDetails';
import SantaSection from '@/components/SantaSection';
import HolidayThemes from '@/components/HolidayThemes';
import { holidayData } from '@/data';

export default function HolidayPage() {
  return (
    <EventDetails
      {...holidayData}
      // Rendered directly after the brochure. Whitesmoke alternates against
      // the brochure section's white background above it.
      afterBrochure={
        <>
          <HolidayThemes background="whitesmoke" />
          <SantaSection background="white" />
        </>
      }
    />
  );
}
