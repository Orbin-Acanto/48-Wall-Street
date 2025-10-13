import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event Rentals',
  description: 'Event Service Vendors | 48 Wall Street NYC',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
