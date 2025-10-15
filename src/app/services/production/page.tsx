'use client';
import React from 'react';
import ServicesShowcase from '@/components/ServicesShowcase';
import { eventProductionData } from '@/data';

export default function EventProductionPage() {
  return <ServicesShowcase {...eventProductionData} />;
}
