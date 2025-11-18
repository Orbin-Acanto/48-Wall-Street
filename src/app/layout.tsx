import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import SocialMediaSidebar from '@/components/SocialMediaSidebar';
import ChatbotWidget from '@/components/ChatBotWidget';
import Footer from '@/components/Footer';
import ContactUsSlider from '@/components/ContactUsSlider';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.48wallnyc.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      '48 Wall Street NYC | Historic Event Venue in Manhattan Financial District',
    template: '%s | 48 Wall Street NYC',
  },
  description:
    "Discover 48 Wall Street - a historic 1927 Bank of New York building turned premier NYC event venue. Host corporate events, weddings, Bar/Bat Mitzvahs & celebrations in our stunning Grand Mezzanine with 30-foot ceilings, original architecture & full-service catering. Located in Manhattan's Financial District. Book your tour today.",
  keywords:
    '48 Wall Street, NYC event venue, Manhattan event space, Financial District venue, historic venue NYC, corporate event space Manhattan, wedding venue NYC, Bar Mitzvah venue, Bat Mitzvah venue, Grand Mezzanine, Wall Street events, Lower Manhattan venue, historic bank building venue, event venue with catering, Financial District wedding, corporate meeting space NYC, Bank of New York building, 1920s architecture venue, Manhattan private events, New York event venue',
  authors: [{ name: '48 Wall Street Events' }],
  creator: '48 Wall Street Events',
  publisher: '48 Wall Street Events',
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
      "Premier historic event venue in Manhattan's Financial District. Host corporate events, weddings & celebrations in our stunning 1927 landmark building featuring 30-foot ceilings, grand marble staircase, and original 1920s architecture. Full-service catering available.",
    images: [
      {
        url: '/images/og-home.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street Grand Mezzanine - Historic NYC Event Venue with 30-foot ceilings',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '48 Wall Street NYC | Historic Event Venue',
    description:
      "Historic 1927 venue in Manhattan's Financial District. Perfect for corporate events, weddings & celebrations with full-service catering.",
    images: ['/images/twitter-home.jpg'],
    site: '@48wallst',
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
    google: 'ola-WXXq-bJgIEbRdGZMr4cGuKqcyF65J94yOY0ybQ8',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
    'business:contact_data:street_address': '48 Wall Street, Lobby 1',
    'business:contact_data:locality': 'New York',
    'business:contact_data:region': 'NY',
    'business:contact_data:postal_code': '10005',
    'business:contact_data:country_name': 'United States',
    'business:contact_data:email': 'info@48WallNYC.com',
    'business:contact_data:phone_number': '1.877.885.0705',
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
