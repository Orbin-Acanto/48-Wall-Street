import GalleryContent from '@/components/GalleryContent';
import { Suspense } from 'react';

export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <div className="font-secondary min-h-screen bg-[var(--color-whitesmoke)] pt-32 pb-20">
          <div className="flex h-64 items-center justify-center">
            <p className="text-xl text-gray-600">Loading gallery...</p>
          </div>
        </div>
      }
    >
      <GalleryContent />
    </Suspense>
  );
}
