'use client';
import React from 'react';
import ServicesShowcase from '@/components/ServicesShowcase';
import OffsiteCateringBanner from '@/components/OffsiteCateringBanner';
import { eventCateringData } from '@/data';

export default function EventCateringPage() {
  return (
    <>
      <ServicesShowcase {...eventCateringData} menu={true} />
      <OffsiteCateringBanner background="whitesmoke" />
    </>
  );
}
