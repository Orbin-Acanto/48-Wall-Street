import type { Metadata } from 'next';
import Link from 'next/link';
import CustomButton from '@/components/CustomButton';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Event Venue FAQ: Capacity, Catering and Booking',
  description:
    'Answers about 48 Wall Street: guest capacity, event spaces, NYC venue pricing, catering and bar, outside vendors, subway access, parking and booking.',
  alternates: {
    canonical: 'https://www.48wallnyc.com/faq',
  },
  openGraph: {
    title: 'Event Venue FAQ | 48 Wall Street NYC',
    description:
      'Capacity, spaces, pricing, catering, vendors, transit and booking at 48 Wall Street, a historic event venue in the Financial District.',
    url: 'https://www.48wallnyc.com/faq',
    siteName: '48 Wall Street NYC',
    images: [
      {
        url: '/shared/og/og-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Grand Mezzanine at 48 Wall Street with 30-foot ceilings',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Event Venue FAQ | 48 Wall Street NYC',
    description:
      'Capacity, spaces, pricing, catering, vendors, transit and booking at 48 Wall Street.',
    images: ['/shared/og/twitter-home.jpg'],
  },
};

type Faq = { q: string; a: string; link?: { href: string; label: string } };

const groups: { title: string; faqs: Faq[] }[] = [
  {
    title: 'Capacity and Spaces',
    faqs: [
      {
        q: 'How many guests can 48 Wall Street hold?',
        a: '48 Wall Street holds up to 500 guests for a cocktail reception and up to 350 for a seated dinner in the Grand Mezzanine Banking Hall. The Concourse Level below seats 150 or holds 200 for a reception, and can run alongside the main floor as a cocktail hour or breakout space. Events here range from 50 to 500 guests.',
        link: { href: '/about/floor-plans', label: 'View floor plans' },
      },
      {
        q: 'Which space is right for my event?',
        a: 'The Grand Mezzanine Banking Hall is the main room for large dinners, galas, conferences and receptions, and the other spaces suit smaller or supporting uses. The Concourse Vault Level is 3,000 sq ft with 14-foot ceilings and divides into six breakout rooms. The Upper Mezzanine overlooks the main hall for cocktails, VIP areas and registration, and The Alexander Hamilton Office is a private room for board meetings and executive dinners.',
        link: {
          href: '/spaces/grand-mezzanine',
          label: 'See the Grand Mezzanine',
        },
      },
      {
        q: 'Can one event use more than one floor?',
        a: 'Yes, the Grand Mezzanine and the Concourse Level are connected by the grand marble staircase and can be used together. A conference can hold the main program upstairs and breakout sessions downstairs, and a wedding can use the lower level for a separate cocktail hour.',
        link: {
          href: '/spaces/concourse-level',
          label: 'See the Concourse Level',
        },
      },
    ],
  },
  {
    title: 'Pricing and Booking',
    faqs: [
      {
        q: 'How much does it cost to rent an event venue in NYC like 48 Wall Street?',
        a: 'There is no fixed rental rate at 48 Wall Street: every event is quoted individually. The quote depends on the date, day of the week, event type, guest count and the services you need, such as catering, AV and production. Call 212.971.5353 or email info@48WallNYC.com with your details for pricing.',
        link: { href: '/proposal', label: 'Build a proposal online' },
      },
      {
        q: 'How do I book a date at 48 Wall Street?',
        a: 'Send an inquiry with your preferred date, estimated guest count and event type, and the events team will follow up with availability and next steps. Most inquiries get a response within one business day. Final guest counts, menus and the final balance are due two weeks before the event.',
        link: { href: '/contact', label: 'Send an inquiry' },
      },
      {
        q: 'How far in advance should I book?',
        a: 'Book 3 to 6 months ahead for corporate events and 12 to 18 months ahead for weddings and Bar or Bat Mitzvahs. Shorter timelines can sometimes work, so it is worth asking about open dates. For December holiday parties, start planning in spring or early summer, since December dates often book out by September.',
      },
      {
        q: 'Can I see the venue before booking?',
        a: 'Yes, you can schedule an in-person site tour with the events team. Before you visit, you can also take the virtual tour, review the floor plans and browse photos of past events online.',
        link: { href: '/about/virtual-tour', label: 'Take the virtual tour' },
      },
    ],
  },
  {
    title: 'Catering and Bar',
    faqs: [
      {
        q: 'Does 48 Wall Street have catering?',
        a: "Yes, catering is provided by Tardi's Catering, the venue's exclusive catering partner with more than 30 years of experience. Menus are custom and cover breakfast, lunch, cocktail receptions, buffets, food stations and seated dinners. Kosher, halal, vegan, gluten-free and allergen-specific needs can be accommodated.",
        link: { href: '/services/catering', label: 'Catering details' },
      },
      {
        q: 'Is bar service available?',
        a: 'Yes, bar service is arranged through the catering team, with bartenders and waitstaff provided. 48 Wall Street handles the liquor license for events catered in house.',
      },
      {
        q: 'Can we bring our own caterer?',
        a: "Outside caterers can work at 48 Wall Street if they meet the building's catering rules. They submit a certificate of insurance, liquor permits and a floor plan two weeks before the event, use electric equipment only, and rent kitchen equipment through the venue's exclusive vendors. Open flame, gas and propane are not allowed.",
        link: {
          href: '/about/rules-regulations',
          label: 'Read the venue rules',
        },
      },
    ],
  },
  {
    title: 'Vendors and Production',
    faqs: [
      {
        q: 'Can we bring our own AV, decor or florist?',
        a: 'No, 48 Wall Street uses exclusive vendors for AV, lighting, staging, power, decor, floral, rentals, printing and entertainment. Your own event designer can work with them, and you may bring a technical director and A1 to supervise sound. Every outside vendor must provide a certificate of insurance.',
        link: { href: '/vendors', label: 'Meet the event partners' },
      },
      {
        q: 'Who handles AV and production?',
        a: "MME Worldwide, the venue's exclusive production partner, handles AV and production on site. Services include sound, wireless microphones, projection and LED walls, lighting design, custom staging, live streaming and recording. A shared WiFi network covers the space, and a private network is available at extra cost.",
        link: { href: '/services/production', label: 'Event production' },
      },
    ],
  },
  {
    title: 'Getting Here',
    faqs: [
      {
        q: 'Where is 48 Wall Street and which subway stations are nearby?',
        a: '48 Wall Street is at the corner of Wall and William Streets, steps from Wall Street station on the 2 and 3 trains. Broad Street on the J and Z and Rector Street on the 1 are a short walk away. Guests coming from New Jersey can take PATH to World Trade Center.',
        link: { href: '/location', label: 'Directions and map' },
      },
      {
        q: 'Is there parking or valet?',
        a: 'Valet service can be arranged for private events, and several public parking garages are a short walk away. Most guests arrive by subway or car service, since the venue sits directly above the Wall Street subway station.',
        link: { href: '/location', label: 'See nearby garages' },
      },
      {
        q: 'Is the venue wheelchair accessible?',
        a: 'Yes, the venue has accessible entry and elevator access between the Grand Mezzanine and the Concourse Level. Share any accessibility needs with the events team in advance so arrangements can be confirmed.',
      },
    ],
  },
  {
    title: 'Weddings, Corporate and Seasonal Events',
    faqs: [
      {
        q: 'What does 48 Wall Street offer as an event venue in the Financial District?',
        a: '48 Wall Street is a 1927 landmark bank building at Wall and William Streets with event space for up to 500 guests. It is on the National Register of Historic Places and has 30-foot ceilings, original crystal chandeliers, Palladian windows and a dual marble staircase. Catering, production and planning partners work on site, and the venue hosts corporate events, conferences, weddings, galas, fashion shows and film shoots.',
        link: { href: '/about', label: 'About the building' },
      },
      {
        q: 'What should we look for when choosing a wedding venue in NYC?',
        a: 'Start with four things: guest count, whether the ceremony and reception can be held in one place, which dates are open, and what services come with the venue. At 48 Wall Street, weddings range from 50 to 500 guests, the ceremony and reception can stay in the same building, and planning, catering and production are handled by on-site partners. Spring and fall weekends book quickly, so start 12 to 18 months ahead.',
        link: { href: '/events/weddings', label: 'Weddings at 48 Wall Street' },
      },
      {
        q: 'What should we look for in a corporate event venue?',
        a: 'Look for the right capacity, breakout space, in-house AV and an easy commute for attendees. 48 Wall Street seats 350 in the Grand Mezzanine, has six breakout rooms on the Concourse Level and an on-site production team for AV and live streaming. It sits steps from the Wall Street 2 and 3 station in the Financial District.',
        link: { href: '/events/corporate', label: 'Corporate events' },
      },
      {
        q: 'Does 48 Wall Street host product launches and brand activations?',
        a: 'Yes, the venue hosts product launches, brand activations, press events and experiential marketing events. The 30-foot ceilings and an on-site team for AV, lighting, staging and custom fabrication suit large branded builds.',
        link: { href: '/gallery', label: 'See past events' },
      },
      {
        q: 'What happens at 48 Wall Street during the holiday season?',
        a: 'Besides private holiday parties, the venue offers seasonal experiences you can book online, including Sit Down With Santa visits on weekends and private dinners in The Alexander Hamilton Office. The Vault also hosts a Prohibition inspired holiday speakeasy for private events.',
        link: { href: '/events/holiday-events', label: 'Holiday events' },
      },
    ],
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: groups.flatMap((group) =>
    group.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    }))
  ),
};

export default function FaqPage() {
  return (
    <div className="bg-whitesmoke min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <BreadcrumbJsonLd items={[{ name: 'FAQ', path: '/faq' }]} />

      <section className="relative mt-22 h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/spaces/grand-mezzanine/hero-01.jpg')",
          }}
        />
        <div className="from-dark-black/70 via-dark-black/70 to-dark-black/80 absolute inset-0 bg-gradient-to-b" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="heading-hero text-white">Event Venue FAQ</h1>
          <div className="bg-primary mx-auto mb-6 h-[2px] w-32" />
          <p className="font-secondary text-whitesmoke/90 mx-auto max-w-2xl text-lg md:text-xl">
            What people ask most before booking 48 Wall Street
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-3xl space-y-14">
          {groups.map((group) => (
            <section key={group.title}>
              <h2 className="font-primary text-primary mb-6 text-2xl tracking-wider uppercase md:text-3xl">
                {group.title}
              </h2>
              <div className="space-y-4">
                {group.faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="group border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between">
                      <h3 className="font-secondary text-lg font-medium text-gray-900 md:text-xl">
                        {faq.q}
                      </h3>
                      <span className="text-primary bg-primary/10 ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xl transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <p className="font-primary leading-relaxed text-gray-700">
                        {faq.a}
                      </p>
                      {faq.link && (
                        <Link
                          href={faq.link.href}
                          className="font-secondary text-primary mt-3 inline-block text-sm font-semibold tracking-wide uppercase hover:underline"
                        >
                          {faq.link.label}
                        </Link>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <section className="bg-white px-6 py-16 text-center md:py-20">
        <h2 className="font-primary text-primary mb-4 text-3xl tracking-wider uppercase md:text-4xl">
          Still have a question?
        </h2>
        <p className="text-lead mb-8">
          Call 212.971.5353 or email info@48WallNYC.com and the events team will
          help.
        </p>
        <Link href="/contact">
          <CustomButton>Contact the Events Team</CustomButton>
        </Link>
      </section>
    </div>
  );
}
