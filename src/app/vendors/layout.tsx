import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exclusive Event Partners | 48 Wall Street NYC',
  description:
    "48 Wall Street's exclusive collection of hospitality, culinary, entertainment, and production partners: Tardi's Catering, FiDi Hospitality, MME Worldwide, and Mikey Mike Entertainment. One venue, one team, endless possibilities.",
  keywords:
    "48 Wall Street vendors, preferred event partners NYC, Tardi's Catering, FiDi Hospitality, MME Worldwide, Mikey Mike Entertainment, event production NYC, luxury catering Manhattan, event entertainment NYC, hospitality management",
  openGraph: {
    title: 'Exclusive Event Partners | 48 Wall Street NYC',
    description:
      'Trusted hospitality, culinary, entertainment, and production partners delivering a seamless, full-service event experience under one historic roof.',
    url: 'https://www.48wallnyc.com/vendors',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/shared/og/og-home.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street Historic Event Venue Manhattan',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exclusive Event Partners | 48 Wall Street NYC',
    description:
      'Trusted hospitality, culinary, entertainment, and production partners for extraordinary events in the Financial District.',
    images: ['/shared/og/twitter-home.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/vendors',
  },
};

export default function VendorsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
