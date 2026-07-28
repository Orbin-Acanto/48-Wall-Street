import type { Metadata } from 'next';
import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.48wallnyc.com';

export const metadata: Metadata = {
  title: 'Thank You | 48 Wall Street NYC Event Venue',
  description:
    'Thank you for contacting 48 Wall Street. Our team will reach out shortly regarding your event inquiry.',
  keywords: [
    'thank you',
    '48 Wall Street',
    'event inquiry received',
    'NYC event venue',
    'Financial District event space',
    'corporate event venue NYC',
    'wedding venue NYC',
    'historic event venue',
  ],
  alternates: {
    canonical: `${siteUrl}/thank-you`,
  },
  openGraph: {
    title: 'Thank You | 48 Wall Street NYC',
    description:
      'We have received your inquiry. A member of our events team will respond shortly.',
    url: `${siteUrl}/thank-you`,
    type: 'website',
    siteName: '48 Wall Street NYC',
    locale: 'en_US',
    images: [
      {
        url: '/shared/og/og-home.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street NYC Event Venue',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thank You | 48 Wall Street NYC',
    description:
      'Thank you for contacting 48 Wall Street. Our team will be in touch soon.',
    images: ['/shared/og/twitter-home.jpg'],
  },
  robots: {
    index: false,
    follow: false,
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function ThankYouLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Script id="thankyou-conversion" strategy="afterInteractive">
        {`
          if (typeof gtag === "function") {
            gtag('event', 'conversion', {
              'send_to': 'AW-11296477299/WyLfCKeqmtEYEPOgyooq'
            });
          }
        `}
      </Script>

      {children}
    </>
  );
}
