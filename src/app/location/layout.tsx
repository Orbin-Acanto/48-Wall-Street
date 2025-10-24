import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Location | 48 Wall Street NYC Event Venue in Financial District',
  description:
    "Visit 48 Wall Street in Manhattan's Financial District. Easily accessible by subway, surrounded by hotels and restaurants. Premier historic event venue in Lower Manhattan.",
  keywords:
    'Financial District venue location, 48 Wall Street address, Lower Manhattan event space, Wall Street venue access, NYC event venue transit',
  openGraph: {
    title: 'Location - 48 Wall Street NYC Event Venue',
    description:
      'Prime Financial District location with easy subway access, nearby hotels, and iconic NYC landmarks minutes away.',
    url: 'https://www.48wallnyc.com/location',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/location/historic_location.jpg',
        width: 1200,
        height: 630,
        alt: '48 Wall Street Location in Financial District Manhattan',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Location - 48 Wall Street NYC',
    description:
      'Prime Financial District location with convenient transit access and nearby amenities.',
    images: ['/location/historic_location.jpg'],
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/location',
  },
};

export default function LocationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EventVenue',
            name: '48 Wall Street',
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
              latitude: '40.7074',
              longitude: '-74.0089',
            },
            url: 'https://www.48wallnyc.com',
            telephone: '+1-877-885-0705',
            openingHoursSpecification: {
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
          }),
        }}
      />
      {children}
    </>
  );
}
