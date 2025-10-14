import React from 'react';
import EventDetails from '@/components/EventDetails';
import { weddingData } from '@/data';

export default function WeddingPage() {
  return <EventDetails {...weddingData} />;
}
