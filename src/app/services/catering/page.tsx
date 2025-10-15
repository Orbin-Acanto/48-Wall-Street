'use client';
import React from 'react';
import ServicesShowcase from '@/components/ServicesShowcase';
import { eventCateringData } from '@/data';

export default function EventCateringPage() {
  return <ServicesShowcase {...eventCateringData} />;
}
