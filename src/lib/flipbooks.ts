export type FlipbookImage = {
  id: string;
};

export type Flipbook = {
  title: string;
  pdfUrl: string;
  images: FlipbookImage[];
};

export async function getFlipbooks(): Promise<Flipbook[]> {
  const res = await fetch(process.env.N8N_FLIPBOOK_API!, {
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch flipbooks: ${res.statusText}`);
  }

  return res.json();
}

export function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/\.pdf$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
