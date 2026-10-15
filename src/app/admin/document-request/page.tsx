import type { Metadata } from 'next';
import { headers } from 'next/headers';
import DocumentRequestDashboard from '@/components/DocumentRequestDashboard';

export const metadata: Metadata = {
  title: 'Document Center | 48 Wall Street',
  robots: { index: false, follow: false },
};

export default async function DocumentRequestPage() {
  // Set by middleware from the verified session cookie.
  const requestHeaders = await headers();
  const staff = {
    email: requestHeaders.get('x-staff-email') ?? '',
    name:
      decodeURIComponent(requestHeaders.get('x-staff-name') ?? '') ||
      'Events Team',
  };

  return <DocumentRequestDashboard staff={staff} />;
}
