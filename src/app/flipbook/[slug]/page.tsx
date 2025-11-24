import BookReader from '@/components/BookReader';
import { getFlipbooks, slugify } from '@/lib/flipbooks';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const flipbooks = await getFlipbooks();
  return flipbooks.map((b) => ({ slug: slugify(b.title) }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const flipbooks = await getFlipbooks();
  const book = flipbooks.find((b) => slugify(b.title) === slug);
  if (!book) return {};

  return {
    title: `${book.title} | 48 Wall Street NYC`,
    description: `${book.title} flipbook brochure`,
  };
}

export default async function FlipbookPage({ params }: PageProps) {
  const { slug } = await params;

  const flipbooks = await getFlipbooks();
  const book = flipbooks.find((b) => slugify(b.title) === slug);

  if (!book) notFound();

  const pages = book.images.map((img, index) => {
    let fileId: string | null = null;

    if (typeof img === 'string') {
      try {
        fileId = new URL(img).searchParams.get('id') ?? img;
      } catch {
        fileId = img;
      }
    } else {
      fileId = img?.id ?? null;
    }

    if (!fileId) {
      console.warn('Missing image id for', img);
    }

    return {
      id: index + 1,
      image: `/api/drive-image?id=${fileId}`,
    };
  });

  return (
    <section id="book" className="mt-14">
      <BookReader pages={pages} title={book.title} downloadUrl={book.pdfUrl} />
    </section>
  );
}
