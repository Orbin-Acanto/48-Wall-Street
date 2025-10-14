import React from 'react';
import EventDetails from '@/components/EventDetails';
import { mitzvahData } from '@/data';

export default function BarBatMitzvahs() {
  return <EventDetails {...mitzvahData} />;
}
