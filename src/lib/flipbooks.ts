export type FlipbookImage = { id: string };

type FlipbookRaw = {
  title?: unknown;
  pdfUrl?: unknown;
  images?: unknown;
};

export type Flipbook = {
  title: string;
  pdfUrl: string;
  images: FlipbookImage[];
};

export async function getFlipbooks(): Promise<Flipbook[]> {
  const url = process.env.N8N_FLIPBOOK_API;
  if (!url) return [];

  const res = await fetch(url, { next: { revalidate: 14400 } });
  if (!res.ok) return [];

  const data: FlipbookRaw[] = await res.json();
  if (!Array.isArray(data)) return [];

  return data
    .map(normalizeFlipbook)
    .filter((b) => b.title && b.images.length > 0);
}

function normalizeFlipbook(raw: FlipbookRaw): Flipbook {
  const title = typeof raw.title === 'string' ? raw.title : '';
  const pdfUrl = typeof raw.pdfUrl === 'string' ? raw.pdfUrl : '';

  const imagesArray = Array.isArray(raw.images) ? raw.images : [];

  const images: FlipbookImage[] = imagesArray
    .map((img) => {
      if (typeof img === 'string') {
        try {
          const idFromUrl = new URL(img).searchParams.get('id');
          return idFromUrl ? { id: idFromUrl } : { id: img };
        } catch {
          return { id: img };
        }
      }
      if (img && typeof img.id === 'string') {
        return { id: img.id };
      }
      return null;
    })
    .filter(Boolean) as FlipbookImage[];

  return { title, pdfUrl, images };
}

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/\.pdf$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
