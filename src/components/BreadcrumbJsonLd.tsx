const siteUrl = 'https://www.48wallnyc.com';

export default function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const list = [{ name: 'Home', path: '' }, ...items];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: list.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: `${siteUrl}${item.path}`,
          })),
        }),
      }}
    />
  );
}
