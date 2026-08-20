import React from 'react';
import EventDetails from '@/components/EventDetails';
import SantaSection from '@/components/SantaSection';
import { holidayData } from '@/data';

export default function HolidayPage() {
  return (
    <>
      <EventDetails {...holidayData} />
      {/* Alternates against the white section that closes EventDetails */}
      <SantaSection background="whitesmoke" />
    </>
  );
}
