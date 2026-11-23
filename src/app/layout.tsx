import type { Metadata, Viewport } from 'next';
import { Gilda_Display, Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
// Social media sidebar temporarily disabled: the holiday banner now occupies
// the left-slide position. Re-enable by uncommenting this import and the
// <SocialMediaSidebar /> usage in the body below.
// import SocialMediaSidebar from '@/components/SocialMediaSidebar';
import ChatbotWidget from '@/components/ChatBotWidget';
import Footer from '@/components/Footer';
import ContactUsSlider from '@/components/ContactUsSlider';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import ClickTracking from '@/components/ClickTracking';

// Self-hosted by next/font, so no request to Google Fonts at runtime
const gilda = Gilda_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-gilda',
});

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.48wallnyc.com';

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Historic Event Venue NYC | Financial District | 48 Wall Street',
    template: '%s | 48 Wall Street NYC',
  },
  description:
    "A historic 1927 event venue in Lower Manhattan's Financial District for corporate events, conferences, weddings and galas of up to 500 guests.",
  keywords:
    '48 Wall Street, NYC event venue, Manhattan event space, Financial District venue, historic venue NYC, corporate event space Manhattan, wedding venue NYC, Bar Mitzvah venue, Bat Mitzvah venue, Grand Mezzanine, Wall Street events, Lower Manhattan venue, historic bank building venue, event venue with catering, Financial District wedding, corporate meeting space NYC, Bank of New York building, 1920s architecture venue, Manhattan private events, New York event venue, event space NYC, event space rental NYC, venue rental NYC, event venues near me, banquet hall NYC, private event space Manhattan, gala venue NYC, landmark venue NYC, event venue with 500 capacity NYC, downtown Manhattan event space, FiDi event venue, product launch venue NYC, brand activation venue NYC, conference venue Financial District, large event venue NYC',
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
        url: '/shared/og/og-home.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street Grand Mezzanine, a historic NYC event venue with 30-foot ceilings',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '48 Wall Street NYC | Historic Event Venue',
    description:
      "Historic 1927 venue in Manhattan's Financial District. Perfect for corporate events, weddings & celebrations with full-service catering.",
    images: ['/shared/og/twitter-home.jpg'],
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
    'business:contact_data:phone_number': '212.971.5353',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gilda.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': ['EventVenue', 'LocalBusiness'],
              '@id': `${siteUrl}/#eventvenue`,
              name: '48 Wall Street',
              alternateName: '48 Wall Street Events',
              description:
                "Historic 1927 Bank of New York & Trust Company building in Manhattan's Financial District. Features Grand Mezzanine Banking Hall with 30-foot ceilings, original 1920s architecture, Palladian windows, and grand marble staircase. Added to National Register of Historic Places in 2003.",
              url: siteUrl,
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/shared/logo/48-wall-logo.png`,
                width: 600,
                height: 200,
              },
              image: [
                `${siteUrl}/shared/og/og-home.jpg`,
                `${siteUrl}/spaces/grand-mezzanine/hero-01.jpg`,
                `${siteUrl}/spaces/banking-hall/hero-01.jpg`,
              ],
              address: {
                '@type': 'PostalAddress',
                streetAddress: '48 Wall Street, Lobby 1',
                addressLocality: 'New York',
                addressRegion: 'NY',
                postalCode: '10005',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 40.707421,
                longitude: -74.009224,
              },
              telephone: '212.971.5353',
              email: 'info@48WallNYC.com',
              priceRange: '$$$',
              maximumAttendeeCapacity: 500,
              smokingAllowed: false,
              publicAccess: true,
              isAccessibleForFree: false,
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
                  closes: '23:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Saturday', 'Sunday'],
                  opens: '10:00',
                  closes: '23:00',
                },
              ],
              sameAs: [
                'https://www.facebook.com/48wallst/',
                'https://www.instagram.com/48wallst/',
                'https://www.google.com/search?kgmid=/g/11vyrhqqjc',
              ],
              amenityFeature: [
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Grand Mezzanine Banking Hall',
                  value: '30-foot ceilings with original 1920s architecture',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Seating Capacity',
                  value: '350 seated dinner guests',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Reception Capacity',
                  value: '500 cocktail reception guests',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Audio Visual Equipment',
                  value: 'State-of-the-art AV capabilities',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Full-Service Catering',
                  value: 'Professional catering services available',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Event Planning',
                  value: 'Expert event planning team',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Breakout Rooms',
                  value: 'Multiple breakout spaces on Concourse Level',
                },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Historic Architecture',
                  value: 'Original 1920s architectural details preserved',
                },
              ],
              hasMap:
                'https://maps.google.com/?q=48+Wall+Street+New+York+NY+10005',
              parentOrganization: { '@id': `${siteUrl}/#organization` },
              containedInPlace: { '@id': `${siteUrl}/#building` },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': `${siteUrl}/#organization`,
              name: '48 Wall Street Events',
              legalName: '48 Wall Street Events LLC',
              url: siteUrl,
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/shared/logo/48-wall-logo.png`,
              },
              foundingDate: '2010',
              description:
                "Premier historic event venue in New York City's Financial District, specializing in corporate events, weddings, and private celebrations.",
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '212.971.5353',
                contactType: 'Sales',
                email: 'info@48WallNYC.com',
                availableLanguage: ['English'],
                areaServed: 'US',
                contactOption: 'TollFree',
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: '48 Wall Street, Lobby 1',
                addressLocality: 'New York',
                addressRegion: 'NY',
                postalCode: '10005',
                addressCountry: 'US',
              },
              sameAs: [
                'https://www.instagram.com/48wallst/',
                'https://www.google.com/search?kgmid=/g/11vyrhqqjc',
                'https://www.facebook.com/48wallst/',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              '@id': `${siteUrl}/#venue-spaces`,
              name: 'Event Spaces at 48 Wall Street',
              description:
                'Bookable event spaces at 48 Wall Street, a historic 1927 landmark venue in the Financial District of Lower Manhattan.',
              numberOfItems: 6,
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  item: {
                    '@type': 'Room',
                    name: 'Grand Mezzanine Banking Hall',
                    description:
                      'The main event hall at 48 Wall Street. 9,000 square feet with 30-foot ceilings, original crystal chandeliers, Palladian windows, and a grand dual marble staircase. Seats 350 for dinner or 500 for a cocktail reception.',
                    url: `${siteUrl}/spaces/grand-mezzanine`,
                    floorSize: {
                      '@type': 'QuantitativeValue',
                      value: 9000,
                      unitCode: 'FTK',
                    },
                    maximumAttendeeCapacity: 500,
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  item: {
                    '@type': 'Room',
                    name: 'Concourse Vault Level',
                    description:
                      'A 3,000 square foot lower level with 14-foot ceilings, divisible into six separate breakout rooms. Accommodates 150 seated or 200 for a reception. Connected to the Grand Mezzanine by the marble staircase.',
                    url: `${siteUrl}/spaces/concourse-level`,
                    floorSize: {
                      '@type': 'QuantitativeValue',
                      value: 3000,
                      unitCode: 'FTK',
                    },
                    maximumAttendeeCapacity: 200,
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  item: {
                    '@type': 'Room',
                    name: 'Banking Hall',
                    description:
                      'The historic 1927 banking floor at 48 Wall Street, featuring preserved 1920s architectural detail and grand proportions for receptions, dinners, and branded events.',
                    url: `${siteUrl}/spaces/banking-hall`,
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  item: {
                    '@type': 'Room',
                    name: 'Upper Mezzanine',
                    description:
                      'An elevated mezzanine level overlooking the Grand Mezzanine Banking Hall, suited to cocktail receptions, VIP areas, and breakout space.',
                    url: `${siteUrl}/spaces/upper-mezzanine`,
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 5,
                  item: {
                    '@type': 'Room',
                    name: 'Alexander Hamilton Ballroom',
                    description:
                      'A luxury fifth floor ballroom at 48 Wall Street for galas, receptions, and corporate celebrations.',
                    url: `${siteUrl}/spaces/5th-floor`,
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 6,
                  item: {
                    '@type': 'Room',
                    name: 'The Alexander Hamilton Office',
                    description:
                      'A private executive salon at 48 Wall Street for intimate board meetings, executive dinners, and VIP receptions.',
                    url: `${siteUrl}/spaces/hamilton-room`,
                  },
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
                "Historic 1927 event venue in Manhattan's Financial District",
              publisher: {
                '@id': `${siteUrl}/#organization`,
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
              '@id': `${siteUrl}/#building`,
              name: '48 Wall Street',
              alternateName: 'Bank of New York & Trust Company Building',
              sameAs: ['https://en.wikipedia.org/wiki/48_Wall_Street'],
              description:
                'Historic 1927 Bank of New York & Trust Company building at the corner of Wall and William Streets in Lower Manhattan',
              hasMap:
                'https://maps.google.com/?q=48+Wall+Street+New+York+NY+10005',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '48 Wall Street, Lobby 1',
                addressLocality: 'New York',
                addressRegion: 'NY',
                postalCode: '10005',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 40.707421,
                longitude: -74.009224,
              },
              containedInPlace: {
                '@type': 'City',
                name: 'New York',
              },
              additionalProperty: [
                {
                  '@type': 'PropertyValue',
                  name: 'Historic Designation',
                  value: 'National Register of Historic Places (2003)',
                },
                {
                  '@type': 'PropertyValue',
                  name: 'Original Building',
                  value: 'Bank of New York & Trust Company Building',
                },
                {
                  '@type': 'PropertyValue',
                  name: 'Year Built',
                  value: '1927',
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-80XQBNM6K4"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-80XQBNM6K4');
            gtag('config', 'AW-11296477299');
          `}
        </Script>
        <Navbar />
        {/* <SocialMediaSidebar /> */}
        {/* Promo banner is mounted on the homepage only (see app/page.tsx),
            so it no longer appears site wide. */}
        <ChatbotWidget />
        <ContactUsSlider />
        {children}
        <SpeedInsights />
        <Analytics />
        <ClickTracking />
        <Footer />
      </body>
    </html>
  );
}
