import React from 'react';
import EventDetails from '@/components/EventDetails';
import { holidayData } from '@/data';

export default function HolidayPage() {
  return <EventDetails {...holidayData} />;
}
