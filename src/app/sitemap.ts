import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.48wallnyc.com';
  const now = new Date();

  return [
    // Home
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },

    // About Section
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about/event-video`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/digital-brochure`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/virtual-tour`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/floor-plans`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/rules-regulations`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },

    // Events Section
    {
      url: `${baseUrl}/events/corporate`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/events/fashion-shows`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events/film-shoots`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events/non-profit`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events/weddings`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/events/bar-bat-mitzvahs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events/holiday-events`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Services Section
    {
      url: `${baseUrl}/services/production`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/catering`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/rentals`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },

    {
      url: `${baseUrl}/rentals`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/location`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery?tab=corporate`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/gallery?tab=fashion`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/gallery?tab=wedding`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/gallery?tab=bar`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/gallery?tab=holiday`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.64,
    },
    {
      url: `${baseUrl}/menu/48-wall-menu.2025_.pdf`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.64,
    },
  ];
}
