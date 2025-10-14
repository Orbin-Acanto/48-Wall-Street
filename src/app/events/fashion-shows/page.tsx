import React from 'react';
import EventDetails from '@/components/EventDetails';
import { fashionData } from '@/data';

export default function FashionPage() {
  return <EventDetails {...fashionData} />;
}
