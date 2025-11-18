import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Customize Event Plan | 48 Wall Street NYC - Interactive Floor Plan Designer',
  description:
    'Design your perfect event at 48 Wall Street NYC with our interactive floor plan customization tool. Arrange seating, plan layouts, visualize your setup for the Grand Mezzanine and Concourse Level, and export your custom event plan as PDF. Free event planning tool for Manhattan corporate events, weddings, and celebrations.',
  keywords:
    '48 Wall Street event planner, customize floor plan NYC, interactive event planner, venue layout tool, event design tool, floor plan designer, PDF floor plan export, seating arrangement tool, event planning NYC, customize venue layout, Manhattan event planner tool, venue visualization tool',
  openGraph: {
    title: 'Customize Your Event Plan | 48 Wall Street NYC Interactive Tool',
    description:
      'Design your event layout with our interactive floor plan tool. Customize seating, visualize your setup, and export your plan as PDF for your Manhattan event.',
    url: 'https://www.48wallnyc.com/about/customize-plan',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/images/og-home.jpg',
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
    title: 'Customize Event Plan | 48 Wall Street NYC',
    description:
      'Design your event with our interactive floor plan tool. Customize layouts and export your plan as PDF.',
    images: ['/images/twitter-home.jpg'],
    site: '@48wallst',
  },
  alternates: {
    canonical: 'https://www.48wallnyc.com/about/customize-plan',
  },
  other: {
    'geo.region': 'US-NY',
    'geo.placename': 'New York City',
    'geo.position': '40.707421;-74.009224',
    ICBM: '40.707421, -74.009224',
  },
};

export default function CustomizePlanLayout({
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
            '@type': 'WebApplication',
            name: '48 Wall Street Event Plan Customization Tool',
            description:
              'Interactive floor plan designer for customizing event layouts at 48 Wall Street venue with PDF export capability',
            url: 'https://www.48wallnyc.com/about/customize-plan',
            applicationCategory: 'Event Planning Tool',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
            },
            featureList: [
              'Interactive floor plan customization',
              'Seating arrangement designer',
              'Layout visualization',
              'PDF export of custom plans',
              'Grand Mezzanine layout options',
              'Concourse Level configuration',
            ],
            provider: {
              '@type': 'EventVenue',
              name: '48 Wall Street',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '48 Wall Street, Lobby 1',
                addressLocality: 'New York',
                addressRegion: 'NY',
                postalCode: '10005',
                addressCountry: 'US',
              },
              telephone: '1.877.885.0705',
              email: 'info@48WallNYC.com',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.48wallnyc.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'About',
                item: 'https://www.48wallnyc.com/about',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Customize Plan',
                item: 'https://www.48wallnyc.com/about/customize-plan',
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
            '@type': 'WebPage',
            name: 'Customize Event Plan',
            description:
              'Interactive event planning tool for customizing floor plans and exporting layouts for 48 Wall Street events',
            url: 'https://www.48wallnyc.com/about/customize-plan',
            isPartOf: {
              '@type': 'WebSite',
              name: '48 Wall Street NYC',
              url: 'https://www.48wallnyc.com',
            },
            about: {
              '@type': 'EventVenue',
              name: '48 Wall Street',
            },
            potentialAction: {
              '@type': 'CreateAction',
              name: 'Customize Event Floor Plan',
              description:
                'Create and customize event floor plan with seating arrangements and layout options',
              result: {
                '@type': 'DigitalDocument',
                name: 'Custom Event Floor Plan PDF',
                encodingFormat: 'application/pdf',
              },
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Floor Plan Customization Tool',
            applicationCategory: 'DesignApplication',
            description:
              'Interactive tool for designing custom event layouts at 48 Wall Street with real-time visualization and PDF export',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'Drag-and-drop floor plan designer',
              'Customize seating arrangements',
              'Visualize event layout in real-time',
              'Export customized plans as PDF',
              'Multiple venue space options',
              'Capacity calculations',
            ],
            provider: {
              '@type': 'Organization',
              name: '48 Wall Street Events',
              url: 'https://www.48wallnyc.com',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Customize Your Event Floor Plan',
            description:
              'Step-by-step guide to using the 48 Wall Street floor plan customization tool',
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'Select Venue Space',
                text: 'Choose between Grand Mezzanine or Concourse Level for your event',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'Customize Layout',
                text: 'Arrange seating, tables, and event elements using the interactive designer',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: 'Visualize Setup',
                text: 'Preview your custom event layout in real-time',
              },
              {
                '@type': 'HowToStep',
                position: 4,
                name: 'Export PDF',
                text: 'Download your customized floor plan as a PDF for your records',
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
