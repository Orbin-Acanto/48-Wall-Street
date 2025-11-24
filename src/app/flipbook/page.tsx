import Link from 'next/link';
import { getFlipbooks, slugify } from '@/lib/flipbooks';

export const dynamic = 'force-dynamic';
export const revalidate = 14400;

export default async function FlipbookIndex() {
  const flipbooks = await getFlipbooks();

  return (
    <main className="mt-28 mb-20 px-6 lg:px-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-wide text-gray-900">
          Flipbooks Library
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Explore brochures, branding books, and visual collections.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {flipbooks.map((b) => {
          const slug = slugify(b.title);

          return (
            <Link
              key={slug}
              href={`/flipbook/${slug}`}
              className="group block border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <h2 className="group-hover:text-primary text-xl font-semibold text-gray-800 transition-colors duration-300">
                  {b.title}
                </h2>
                <span className="group-hover:text-primary text-gray-400 transition-colors duration-300">
                  →
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                View flipbook → {b.images.length} pages
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
