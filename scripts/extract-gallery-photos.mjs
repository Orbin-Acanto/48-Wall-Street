import fs from 'fs';

const html = fs.readFileSync('public/gallery.html', 'utf8');
const match = html.match(/const PHOTOS = \[([\s\S]*?)\];/);
if (!match) {
  console.error('PHOTOS not found');
  process.exit(1);
}

const photos = eval(`[${match[1]}]`);
const lines = photos.map((p) => {
  const src = `'/${p.src.replace(/^\//, '')}'`;
  const alt = JSON.stringify(p.alt);
  return `  { src: ${src}, alt: ${alt}, category: '${p.category}', size: '${p.size}' },`;
});

const output = `import type { GPhoto } from '@/types';

export const galleryPhotos: GPhoto[] = [
${lines.join('\n')}
];
`;

fs.writeFileSync('src/data/galleryPhotos.ts', output);
console.log(`Wrote ${photos.length} photos to src/data/galleryPhotos.ts`);
