import { Suspense } from 'react';
import type { Metadata } from 'next';
import PacketSigning from '@/components/PacketSigning';

export const metadata: Metadata = {
  title: 'Your Event Documents | 48 Wall Street',
  robots: { index: false, follow: false },
};

export default function PacketSigningPage() {
  return (
    <Suspense>
      <PacketSigning />
    </Suspense>
  );
}
