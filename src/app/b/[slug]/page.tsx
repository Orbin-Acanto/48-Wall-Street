import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BookReader from '@/components/BookReader';
import { shareableBrochures } from '@/data';

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Pre-render every shareable brochure at build time.
export function generateStaticParams() {
  return Object.keys(shareableBrochures).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brochure = shareableBrochures[slug as keyof typeof shareableBrochures];
  if (!brochure) return {};

  return {
    title: `${brochure.title} | 48 Wall Street NYC`,
    description: brochure.subtitle || `${brochure.title}, 48 Wall Street`,
    alternates: { canonical: `/b/${slug}` },
    openGraph: {
      title: `${brochure.title} | 48 Wall Street NYC`,
      description: brochure.subtitle || `${brochure.title}, 48 Wall Street`,
      url: `/b/${slug}`,
      images: brochure.pages[0]?.image ? [brochure.pages[0].image] : undefined,
    },
  };
}

export default async function SharedBrochurePage({ params }: PageProps) {
  const { slug } = await params;
  const brochure = shareableBrochures[slug as keyof typeof shareableBrochures];

  if (!brochure) notFound();

  return (
    <main id="shared-brochure" className="pt-14">
      <BookReader
        pages={brochure.pages}
        title={brochure.title}
        subtitle={brochure.subtitle}
        downloadUrl={brochure.downloadUrl}
        shareSlug={brochure.shareSlug}
      />
    </main>
  );
}
