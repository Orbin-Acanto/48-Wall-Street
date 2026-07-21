'use client';

import { useState } from 'react';
import CustomButton from '@/components/CustomButton';
import Image from 'next/image';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const aboutImages = [
  { src: '/about/hero-01.png', alt: '48 Wall Street Venue' },
  { src: '/about/gallery-01.jpg', alt: 'Lounge Area' },
  { src: '/about/gallery-04.jpg', alt: 'Concourse Level' },

  {
    src: '/gallery/corporate/gallery-24.jpg',
    alt: '48 Wall Street Building Exterior',
  },
  { src: '/about/gallery-02.jpg', alt: 'Concourse Level' },
  { src: '/about/gallery-03.jpg', alt: 'Concourse Level' },
];

export default function About() {
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
        (selectedIndex - 1 + aboutImages.length) % aboutImages.length
      );
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % aboutImages.length);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  return (
    <>
      <section className="bg-white px-6 pt-20 pb-18">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <p className="font-primary text-primary mb-6 text-3xl tracking-[0.3em] uppercase">
              Welcome to 48 Wall Street
            </p>
            <div className="bg-primary mx-auto mb-8 h-px w-16"></div>
            <h1 className="heading-hero">Historic Event Venue in Lower Manhattan</h1>
            <p className="text-lead">
              Built in 1927 as the Bank of New York and Trust Company, 48 Wall
              Street has been at the center of New York City history for nearly
              a century. Today it is one of the most distinctive event venues in
              the Financial District, offering 12,500 square feet of grand
              historic space for corporate events, conferences, weddings, galas,
              and private celebrations. The 30-foot ceilings, grand marble
              staircase, crystal chandeliers, and original Palladian windows
              create an atmosphere that no modern venue can manufacture.
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Top Image */}
              <button
                onClick={() => openLightbox(0)}
                className="group relative h-64 w-full cursor-pointer overflow-hidden md:h-80"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }}
              >
                <Image
                  src="/about/hero-01.png"
                  alt="48 Wall Street Venue"
                  fill
                  quality={100}
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{
                    imageRendering: '-webkit-optimize-contrast',
                  }}
                />
              </button>

              {/* Bottom Row - Two Images */}
              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => openLightbox(1)}
                  className="group relative h-64 cursor-pointer overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                >
                  <Image
                    src="/about/gallery-01.jpg"
                    alt="Lounge Area"
                    fill
                    quality={100}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                    }}
                  />
                </button>
                <button
                  onClick={() => openLightbox(2)}
                  className="group relative h-64 cursor-pointer overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                >
                  <Image
                    src="/about/gallery-04.jpg"
                    alt="Concourse Level"
                    fill
                    quality={100}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Right Column - Large Image */}
            <div className="grid grid-cols-1 gap-6">
              <button
                onClick={() => openLightbox(3)}
                className="group relative h-96 cursor-pointer overflow-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }}
              >
                <Image
                  src="/gallery/corporate/gallery-24.jpg"
                  alt="48 Wall Street Building Exterior"
                  fill
                  quality={100}
                  className="object-cover transition-transform duration-500 group-hover:scale-115"
                  style={{
                    imageRendering: '-webkit-optimize-contrast',
                  }}
                />
              </button>
              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => openLightbox(4)}
                  className="group relative h-48 cursor-pointer overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                >
                  <Image
                    src="/about/gallery-02.jpg"
                    alt="48 Wall Street Building Exterior"
                    fill
                    quality={100}
                    className="object-cover transition-transform duration-500 group-hover:scale-115"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                    }}
                  />
                </button>
                <button
                  onClick={() => openLightbox(5)}
                  className="group relative h-48 cursor-pointer overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                >
                  <Image
                    src="/about/gallery-03.jpg"
                    alt="48 Wall Street Building Exterior"
                    fill
                    quality={100}
                    className="object-cover transition-transform duration-500 group-hover:scale-115"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-18 flex items-center justify-center gap-4">
          <Link href="/about">
            <CustomButton variant="primary">learn More</CustomButton>
          </Link>
          <Link href="/about/customize-plan">
            <CustomButton variant="secondary" className="border-primary">
              Create Your Floor Plan
            </CustomButton>
          </Link>
        </div>
      </section>

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
              src={aboutImages[selectedIndex].src}
              alt={aboutImages[selectedIndex].alt}
              fill
              className="object-contain"
              style={{
                imageRendering: '-webkit-optimize-contrast',
              }}
              priority
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 z-50 -translate-x-1/2">
            <div className="rounded-full bg-white/10 px-6 py-3 backdrop-blur-sm">
              <p className="font-secondary text-sm text-white">
                {selectedIndex + 1} / {aboutImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
