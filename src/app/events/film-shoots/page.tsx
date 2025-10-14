import React from 'react';
import EventDetails from '@/components/EventDetails';
import { filmtvData } from '@/data';

export default function FilmPage() {
  return <EventDetails {...filmtvData} />;
}
