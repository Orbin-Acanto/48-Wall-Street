import React from 'react';
import EventDetails from '@/components/EventDetails';
import { corporateData } from '@/data';

export default function CorporatePage() {
  return <EventDetails {...corporateData} />;
}
