import BookReader from '@/components/BookReader';
import { getFlipbooks, slugify } from '@/lib/flipbooks';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 14400;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const flipbooks = await getFlipbooks();
  const book = flipbooks.find((b) => slugify(b.title) === slug);
  if (!book) return {};

  return {
    title: book.title,
    description: `${book.title}: a brochure from 48 Wall Street, a historic 1927 event venue in the Financial District.`,
    alternates: { canonical: `/flipbook/${slug}` },
  };
}

export default async function FlipbookPage({ params }: PageProps) {
  const { slug } = await params;

  const flipbooks = await getFlipbooks();
  const book = flipbooks.find((b) => slugify(b.title) === slug);

  if (!book) notFound();

  const pages = book.images.map((img, index) => ({
    id: index + 1,
    image: `/api/drive-image?id=${img.id}`,
  }));

  return (
    <section id="book" className="mt-14">
      <BookReader
        pages={pages}
        title={book.title}
        downloadUrl={book.pdfUrl}
        standalone
      />
    </section>
  );
}
