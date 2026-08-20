import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import SocialMediaSidebar from '@/components/SocialMediaSidebar';
import ChatbotWidget from '@/components/ChatBotWidget';
import Footer from '@/components/Footer';
import ContactUsSlider from '@/components/ContactUsSlider';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

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
    '48 Wall Street is a premier historic event venue in the Financial District of Lower Manhattan. The 1927 Banking Hall offers 12,500 sq ft for corporate events, conferences, weddings, galas, and private celebrations. Up to 500 guests.',
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
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts to eliminate render-blocking latency */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Non-render-blocking font load with font-display:swap built in */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Gilda+Display&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EventVenue',
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
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '150',
                bestRating: '5',
                worstRating: '1',
              },
              review: [
                {
                  '@type': 'Review',
                  reviewRating: {
                    '@type': 'Rating',
                    ratingValue: '5',
                    bestRating: '5',
                  },
                  author: {
                    '@type': 'Person',
                    name: 'Sarah M.',
                  },
                  reviewBody:
                    'We held our annual conference at 48 Wall Street and it was flawless. The Banking Hall is stunning and our attendees kept commenting on the architecture. The AV team handled everything without a single issue.',
                },
                {
                  '@type': 'Review',
                  reviewRating: {
                    '@type': 'Rating',
                    ratingValue: '5',
                    bestRating: '5',
                  },
                  author: {
                    '@type': 'Person',
                    name: 'James T.',
                  },
                  reviewBody:
                    'Hosted our product launch here and the venue delivered exactly what we needed. The grand marble staircase made for incredible photos and the catering was excellent. Will absolutely be back.',
                },
                {
                  '@type': 'Review',
                  reviewRating: {
                    '@type': 'Rating',
                    ratingValue: '5',
                    bestRating: '5',
                  },
                  author: {
                    '@type': 'Person',
                    name: 'Rachel K.',
                  },
                  reviewBody:
                    'Our wedding at 48 Wall Street was everything we dreamed of. The 30-foot ceilings and chandeliers created a magical atmosphere. The planning team was attentive from the first call all the way through the reception.',
                },
              ],
              hasMap:
                'https://maps.google.com/?q=48+Wall+Street+New+York+NY+10005',
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
              '@type': 'LocalBusiness',
              '@id': `${siteUrl}/#localbusiness`,
              name: '48 Wall Street',
              image: `${siteUrl}/spaces/banking-hall/hero-01.jpg`,
              url: siteUrl,
              telephone: '212.971.5353',
              priceRange: '$$$',
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
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                  ],
                  opens: '09:00',
                  closes: '23:00',
                },
              ],
              sameAs: [
                'https://www.instagram.com/48wallst/',
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
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is the capacity of 48 Wall Street?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '48 Wall Street can accommodate 350 guests for seated dinners and up to 500 guests for cocktail-style receptions. The venue features flexible spaces that can be configured for various event sizes.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What types of events can be held at 48 Wall Street?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '48 Wall Street hosts a wide variety of events including corporate meetings, conferences, product launches, weddings, Bar/Bat Mitzvahs, fashion shows, film productions, holiday parties, and private celebrations.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Where is 48 Wall Street located?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: "48 Wall Street is located in the heart of Manhattan's Financial District at 48 Wall Street, Lobby 1, New York, NY 10005. The venue is easily accessible by subway and is near major Wall Street landmarks.",
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What makes 48 Wall Street unique?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: '48 Wall Street is a historic 1927 former Bank of New York building featuring original architecture, 30-foot ceilings, Palladian windows, a grand marble staircase, and stunning chandeliers. The venue maintains much of its 1920s architectural detail and was added to the National Register of Historic Places in 2003.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Does 48 Wall Street provide catering and event services?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, 48 Wall Street offers comprehensive event services through exclusive vendors including full-service catering, audiovisual equipment, event planning, decor, floral design, and event rentals.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How much does it cost to rent 48 Wall Street?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Pricing depends on the event date, event type, guest count, day of the week, and services required such as catering, audio visual, and production. There is no fixed published rate because every event is quoted individually. For a quote, contact 48 Wall Street at 212.971.5353 or info@48WallNYC.com with your event details.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How far in advance should I book 48 Wall Street?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'For corporate events, 3 to 6 months is typical, though shorter timelines can often be accommodated. For weddings and Bar or Bat Mitzvahs, 12 to 18 months is recommended because popular spring and fall dates fill quickly. For December holiday parties, planning should begin in spring or early summer.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What subway lines are near 48 Wall Street?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Wall Street station on the 2 and 3 trains is steps away. Broad Street station on the J and Z trains is a short walk, and Rector Street station on the 1 train is nearby. The venue is also reachable from New Jersey via the PATH train at Fulton Street or World Trade Center.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is 48 Wall Street available for weddings?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. 48 Wall Street hosts wedding ceremonies and receptions for 50 to 500 guests. The grand dual marble staircase and 30-foot ceilings provide a historic backdrop, and the team handles planning, coordination, catering, and production. Spring and fall weekends book quickly, so 12 to 18 months of lead time is recommended.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Does 48 Wall Street have parking or valet?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'There are several public parking garages within a short walk of 48 Wall Street in the Financial District, and valet service can be arranged for private events. Because the venue sits directly on top of the Wall Street subway station, most guests arrive by subway or car service.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Can 48 Wall Street host brand activations and product launches?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. 48 Wall Street hosts product launches, brand activations, press events, and experiential marketing events. The 12,500 square feet of landmark space, 30-foot ceilings, and on-site production team supporting AV, lighting, staging, and custom fabrication make it well suited to large-scale branded environments.',
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
              '@type': 'Place',
              name: '48 Wall Street',
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
        <SocialMediaSidebar />
        <ChatbotWidget />
        <ContactUsSlider />
        {children}
        <SpeedInsights />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
