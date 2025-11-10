import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import SocialMediaSidebar from '@/components/SocialMediaSidebar';
import ChatbotWidget from '@/components/ChatBotWidget';
import Footer from '@/components/Footer';
import ContactUsSlider from '@/components/ContactUsSlider';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      '48 Wall Street NYC | Historic Event Venue in Manhattan Financial District',
    template: '%s | 48 Wall Street NYC',
  },
  description:
    "Premier historic event venue in Manhattan's Financial District. Host corporate events, weddings, Bar/Bat Mitzvahs, and celebrations in our stunning 1920s landmark building with 30-foot ceilings and grand architecture.",
  keywords:
    'event venue NYC, Financial District venue, historic venue Manhattan, corporate event space NYC, wedding venue Manhattan, Lower Manhattan event space, Wall Street venue, 48 Wall Street, Bank of New York building',
  authors: [{ name: '48 Wall Street NYC' }],
  creator: '48 Wall Street NYC',
  publisher: '48 Wall Street NYC',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: '48 Wall Street NYC',
    title: '48 Wall Street NYC | Historic Event Venue in Financial District',
    description:
      "Manhattan's premier historic event venue for corporate events, weddings, and celebrations. 1920s landmark with stunning architecture.",
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street Historic Event Venue Manhattan',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '48 Wall Street NYC | Historic Event Venue',
    description:
      'Premier Manhattan event venue for corporate events, weddings & celebrations in historic Financial District landmark.',
    images: ['/images/twitter-home.jpg'],
    creator: '@48WallStreetNYC',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EventVenue',
              '@id': `${siteUrl}/#organization`,
              name: '48 Wall Street',
              alternateName: '48 Wall Street NYC',
              description:
                "Historic 1928 event venue in Manhattan's Financial District, former Bank of New York building",
              url: siteUrl,
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/images/logo.png`,
                width: 250,
                height: 100,
              },
              image: {
                '@type': 'ImageObject',
                url: `${siteUrl}/images/venue-exterior.jpg`,
                width: 1200,
                height: 630,
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: '48 Wall Street',
                addressLocality: 'New York',
                addressRegion: 'NY',
                postalCode: '10005',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 40.7074,
                longitude: -74.0089,
              },
              telephone: '+1-XXX-XXX-XXXX',
              email: 'events@48wallnyc.com',
              priceRange: '$$$',
              maximumAttendeeCapacity: 500,
              smokingAllowed: false,
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                  ],
                  opens: '09:00',
                  closes: '18:00',
                },
              ],
              sameAs: [
                'https://facebook.com/48wallst',
                'https://instagram.com/48wallstreetnyc',
                'https://www.linkedin.com/company/48-wall-street',
              ],
              amenityFeature: [
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Grand Mezzanine Banking Hall',
                  value: true,
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'AV Equipment',
                  value: true,
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Catering Services',
                  value: true,
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Event Planning',
                  value: true,
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Wheelchair Accessible',
                  value: true,
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${siteUrl}/#website`,
              url: siteUrl,
              name: '48 Wall Street NYC',
              description:
                "Historic event venue in Manhattan's Financial District",
              publisher: {
                '@id': `${siteUrl}/#organization`,
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${siteUrl}/search?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Place',
              name: '48 Wall Street',
              description:
                'Historic landmark building at the corner of Wall and William Streets',
              hasMap:
                'https://maps.google.com/?q=48+Wall+Street+New+York+NY+10005',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '48 Wall Street',
                addressLocality: 'New York',
                addressRegion: 'NY',
                postalCode: '10005',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 40.7074,
                longitude: -74.0089,
              },
              containedInPlace: {
                '@type': 'City',
                name: 'New York',
              },
            }),
          }}
        />
      </head>
      <body>
        <Navbar />
        <SocialMediaSidebar />
        <ChatbotWidget />
        <ContactUsSlider />
        {children}
        <Footer />
      </body>
    </html>
  );
}
