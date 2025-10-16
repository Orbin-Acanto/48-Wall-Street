'use client';
import React from 'react';
import ServicesShowcase from '@/components/ServicesShowcase';
import { eventRentalsData } from '@/data';

export default function EventRentalPage() {
  return <ServicesShowcase {...eventRentalsData} />;
}
