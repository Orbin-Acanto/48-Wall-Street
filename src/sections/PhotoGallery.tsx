'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PhotoGalleryProps } from '@/types';

export default function PhotoGallery({ galleryPhotos }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        (selectedIndex - 1 + galleryPhotos.length) % galleryPhotos.length
      );
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryPhotos.length);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  const getSpanClass = (span?: string) => {
    switch (span) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'wide':
        return 'md:col-span-2';
      case 'tall':
        return 'md:row-span-2';
      case 'medium':
        return 'md:col-span-1 md:row-span-1';
      default:
        return '';
    }
  };

  return (
    <section className="bg-whitesmoke/25 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <h2 className="font-primary text-primary mb-6 text-4xl tracking-wide uppercase md:text-5xl lg:text-7xl">
            PHOTO GALLERY
          </h2>
          <a
            href="/gallery"
            className="font-secondary text-dark-black hover:text-primary flex items-center gap-2 text-base tracking-wider uppercase transition-colors duration-300"
          >
            View All
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>

        {/* Masonry Gallery Grid */}
        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
          {galleryPhotos.map((photo, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className={`group relative cursor-pointer overflow-hidden bg-gray-900 ${getSpanClass(photo.span)}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* <div className="absolute inset-0 z-10 bg-black/30 opacity-100 transition-opacity duration-500 group-hover:opacity-0"></div> */}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="bg-dark-black/95 fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyPress}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-3 transition-colors duration-300 hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-8 w-8 text-white" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute top-1/2 left-6 z-50 -translate-y-1/2 rounded-full bg-white/10 p-4 transition-colors duration-300 hover:bg-white/20"
            aria-label="Previous"
          >
            <ChevronLeft className="h-8 w-8 text-white" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute top-1/2 right-6 z-50 -translate-y-1/2 rounded-full bg-white/10 p-4 transition-colors duration-300 hover:bg-white/20"
            aria-label="Next"
          >
            <ChevronRight className="h-8 w-8 text-white" />
          </button>

          {/* Image */}
          <div
            className="relative mx-auto h-full max-h-[90vh] w-full max-w-7xl px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryPhotos[selectedIndex].src}
              alt={galleryPhotos[selectedIndex].alt}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 z-50 -translate-x-1/2">
            <div className="rounded-full bg-white/10 px-6 py-3 backdrop-blur-sm">
              <p className="font-secondary text-sm text-white">
                {selectedIndex + 1} / {galleryPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
