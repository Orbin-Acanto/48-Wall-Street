import type { Metadata } from 'next';
import { headers } from 'next/headers';
import FloorPlanLibrary from '@/components/FloorPlanTemplates/FloorPlanLibrary';

export const metadata: Metadata = {
  title: 'Floor Plan Templates | 48 Wall Street',
  robots: { index: false, follow: false },
};

export default async function FloorPlansPage() {
  // Set by middleware from the verified session cookie.
  const name =
    decodeURIComponent((await headers()).get('x-staff-name') ?? '') ||
    'Events Team';
  return <FloorPlanLibrary staffName={name} />;
}
