import React from 'react';
import EventDetails from '@/components/EventDetails';
import { conferenceData } from '@/data';

export default function ConferencePage() {
  return <EventDetails {...conferenceData} />;
}
