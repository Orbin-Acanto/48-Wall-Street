import React from 'react';
import EventDetails from '@/components/EventDetails';
import { nonprofitData } from '@/data';

export default function NonprofitPage() {
  return <EventDetails {...nonprofitData} />;
}
