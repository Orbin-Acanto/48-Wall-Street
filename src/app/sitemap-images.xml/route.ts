// Image sitemap — helps Google discover and index venue/event photos faster
// Served at /sitemap-images.xml

const baseUrl = 'https://www.48wallnyc.com';

const imageEntries: Array<{
  loc: string;
  images: Array<{ loc: string; title: string; caption?: string }>;
}> = [
  {
    loc: `${baseUrl}/`,
    images: [
      {
        loc: `${baseUrl}/shared/og/og-home.jpg`,
        title: '48 Wall Street Historic Event Venue — Financial District NYC',
        caption:
          'Grand Mezzanine Banking Hall at 48 Wall Street, a historic 1927 event venue in Lower Manhattan',
      },
    ],
  },
  {
    loc: `${baseUrl}/spaces/grand-mezzanine`,
    images: [
      {
        loc: `${baseUrl}/spaces/grand-mezzanine/featured-02.jpg`,
        title: 'Grand Mezzanine Banking Hall — 48 Wall Street NYC',
        caption:
          '9,000 sq ft main event hall with 30-foot ceilings and original crystal chandeliers',
      },
      {
        loc: `${baseUrl}/spaces/grand-mezzanine/featured-03.jpg`,
        title: 'Grand Marble Staircase — 48 Wall Street',
        caption: 'The iconic dual marble staircase at 48 Wall Street Financial District',
      },
      {
        loc: `${baseUrl}/spaces/grand-mezzanine/featured-04.jpg`,
        title: 'Palladian Windows — 48 Wall Street Banking Hall',
        caption: 'Original 1920s Palladian windows in the Grand Mezzanine',
      },
      {
        loc: `${baseUrl}/spaces/grand-mezzanine/featured-05.jpg`,
        title: '48 Wall Street Venue Interior',
        caption: 'Historic banking hall interior at 48 Wall Street, Lower Manhattan',
      },
    ],
  },
  {
    loc: `${baseUrl}/spaces/concourse-level`,
    images: [
      {
        loc: `${baseUrl}/spaces/concourse-level/featured-02.jpg`,
        title: 'Concourse Level — 48 Wall Street Meeting Space',
        caption: '3,000 sq ft Concourse Level with 6 breakout rooms for conferences and workshops',
      },
      {
        loc: `${baseUrl}/spaces/concourse-level/featured-03.jpg`,
        title: 'Concourse Level Event Setup — 48 Wall Street NYC',
        caption: 'Flexible meeting configuration in the Concourse Level at 48 Wall Street',
      },
    ],
  },
  {
    loc: `${baseUrl}/events/corporate`,
    images: [
      {
        loc: `${baseUrl}/gallery/corporate/corporate-01.jpg`,
        title: 'Corporate Event at 48 Wall Street Financial District NYC',
        caption: 'Professional corporate event setup in the Grand Mezzanine Banking Hall',
      },
      {
        loc: `${baseUrl}/gallery/corporate/corporate-04.jpg`,
        title: 'Conference Setup — 48 Wall Street Corporate Venue NYC',
        caption: 'Theater-style conference configuration at 48 Wall Street',
      },
      {
        loc: `${baseUrl}/gallery/corporate/corporate-02.jpg`,
        title: 'Corporate Gala Dinner — 48 Wall Street NYC',
        caption: 'Gala dinner setup at 48 Wall Street historic corporate event venue',
      },
    ],
  },
  {
    loc: `${baseUrl}/events/conferences`,
    images: [
      {
        loc: `${baseUrl}/gallery/corporate/corporate-05.jpg`,
        title: 'Conference Venue NYC — 48 Wall Street Financial District',
        caption: 'Industry conference in the Grand Mezzanine at 48 Wall Street',
      },
      {
        loc: `${baseUrl}/gallery/corporate/corporate-06.jpg`,
        title: 'Meeting Space Financial District — 48 Wall Street NYC',
        caption: 'Professional conference setup with full AV at 48 Wall Street',
      },
    ],
  },
  {
    loc: `${baseUrl}/events/weddings`,
    images: [
      {
        loc: `${baseUrl}/gallery/wedding/wedding-01.jpg`,
        title: 'Wedding at 48 Wall Street NYC — Historic Venue Lower Manhattan',
        caption:
          'Elegant wedding reception at 48 Wall Street with grand marble staircase backdrop',
      },
      {
        loc: `${baseUrl}/gallery/wedding/wedding-04.jpg`,
        title: 'Wedding Reception — 48 Wall Street Financial District',
        caption: 'Romantic wedding reception in the Grand Mezzanine Banking Hall',
      },
      {
        loc: `${baseUrl}/gallery/wedding/wedding-03.jpg`,
        title: 'Wedding Ceremony — 48 Wall Street NYC',
        caption: 'Historic wedding ceremony beneath 30-foot ceilings at 48 Wall Street',
      },
    ],
  },
  {
    loc: `${baseUrl}/events/holiday-events`,
    images: [
      {
        loc: `${baseUrl}/gallery/holiday/holiday-01.jpg`,
        title: 'Corporate Holiday Party — 48 Wall Street NYC',
        caption: 'Festive corporate holiday party at 48 Wall Street Financial District',
      },
      {
        loc: `${baseUrl}/gallery/holiday/holiday-02.jpg`,
        title: 'Holiday Gala Venue NYC — 48 Wall Street',
        caption: 'Holiday gala celebration in the Grand Mezzanine at 48 Wall Street',
      },
    ],
  },
  {
    loc: `${baseUrl}/events/bar-bat-mitzvahs`,
    images: [
      {
        loc: `${baseUrl}/gallery/bar/bar-01.jpg`,
        title: 'Bar Mitzvah Venue NYC — 48 Wall Street Financial District',
        caption: 'Bar Mitzvah celebration at 48 Wall Street historic Manhattan venue',
      },
      {
        loc: `${baseUrl}/gallery/bar/bar-02.jpg`,
        title: 'Bat Mitzvah Venue NYC — 48 Wall Street',
        caption: 'Bat Mitzvah party setup at 48 Wall Street with custom decor',
      },
    ],
  },
  {
    loc: `${baseUrl}/events/fashion-shows`,
    images: [
      {
        loc: `${baseUrl}/gallery/fashion/fashion-01.jpg`,
        title: 'Fashion Show Venue NYC — 48 Wall Street Runway Event',
        caption:
          'Fashion runway show at 48 Wall Street using the grand marble staircase as a runway',
      },
      {
        loc: `${baseUrl}/gallery/fashion/fashion-02.jpg`,
        title: 'New York Fashion Week Venue — 48 Wall Street Financial District',
        caption: 'Fashion Week event at 48 Wall Street historic Manhattan venue',
      },
    ],
  },
  {
    loc: `${baseUrl}/events/non-profit`,
    images: [
      {
        loc: `${baseUrl}/gallery/corporate/corporate-10.jpg`,
        title: 'Non-Profit Gala Venue NYC — 48 Wall Street',
        caption: 'Charity gala dinner at 48 Wall Street Financial District Manhattan',
      },
    ],
  },
  {
    loc: `${baseUrl}/gallery`,
    images: [
      {
        loc: `${baseUrl}/gallery/gallery-01.jpg`,
        title: '48 Wall Street Event Venue Gallery — NYC',
        caption: 'Historic event space at 48 Wall Street, Financial District New York City',
      },
      {
        loc: `${baseUrl}/gallery/gallery-09.jpg`,
        title: '48 Wall Street Interior — Grand Mezzanine NYC',
        caption: 'Grand Mezzanine Banking Hall at 48 Wall Street',
      },
      {
        loc: `${baseUrl}/gallery/gallery-10.jpg`,
        title: '48 Wall Street Event Space — Lower Manhattan',
        caption: 'Event setup in the historic Banking Hall at 48 Wall Street',
      },
    ],
  },
];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${imageEntries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
${entry.images
  .map(
    (img) => `    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${img.title}</image:title>
      ${img.caption ? `<image:caption>${img.caption}</image:caption>` : ''}
    </image:image>`
  )
  .join('\n')}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  });
}
