import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About US',
  description: 'Event Service Vendors | 48 Wall Street NYC',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
