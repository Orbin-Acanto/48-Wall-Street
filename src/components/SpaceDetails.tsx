'use client';

import Link from 'next/link';
import CustomButton from '@/components/CustomButton';
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface SpaceStats {
  capacity: string;
  sqft: string;
}

export interface SpaceDetailsProps {
  levelLabel: string;
  title: string;
  subtitle: string;
  description: React.ReactNode;
  images: string[];
  lightboxImages?: string[];
  videoUrl?: string;
  floorPlanImage?: string;
  features?: string[];
  stats: SpaceStats;
  enquireHref?: string;
}

export default function SpaceDetails({
  levelLabel,
  title,
  subtitle,
  description,
  images,
  videoUrl,
  lightboxImages,
  floorPlanImage,
  features = [],
  stats,
  enquireHref = '/contact',
}: SpaceDetailsProps) {
  const [heroImage, ...galleryImages] = images;
  const lbImages = lightboxImages ?? images;

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };
  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = 'unset';
  };
  const goToPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + lbImages.length) % lbImages.length);
  };
  const goToNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % lbImages.length);
  };
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrev();
    if (e.key === 'ArrowRight') goToNext();
  };

  return (
    <main className="bg-white">
      <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
        <img
          src={heroImage}
          alt={`${title} ${subtitle}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />

        <div className="absolute top-8 left-8 md:left-16">
          <span className="font-secondary border border-white/40 px-3 py-1 text-[10px] tracking-[0.3em] text-white/70 uppercase">
            Level {levelLabel}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 px-8 pb-16 md:px-16">
          <h1 className="font-primary text-5xl leading-none font-light tracking-wide text-white md:text-7xl">
            {title}
          </h1>
          <h1 className="font-primary text-5xl leading-none font-bold tracking-wide text-white uppercase md:text-7xl">
            {subtitle}
          </h1>

          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="h-px w-6 bg-white/50" />
              <span className="font-secondary text-xs tracking-[0.15em] text-white/80 uppercase">
                {stats.capacity}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-px w-6 bg-white/50" />
              <span className="font-secondary text-xs tracking-[0.15em] text-white/80 uppercase">
                {stats.sqft}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
            <div className="lg:sticky lg:top-32">
              <p className="font-secondary text-primary mb-4 text-sm tracking-[0.3em] uppercase">
                The Space
              </p>
              <div className="font-secondary text-dark-black/80 space-y-4 text-base leading-relaxed md:text-lg">
                {description}
              </div>

              <div className="mt-10">
                <Link href={enquireHref}>
                  <CustomButton variant="primary">Enquire Now</CustomButton>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[0, 1].map((i) =>
                galleryImages[i] ? (
                  <button
                    key={i}
                    onClick={() => openLightbox(i + 1)}
                    className="group relative aspect-[4/3] cursor-pointer overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                    }}
                  >
                    <img
                      src={galleryImages[i]}
                      alt={`${title} view ${i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </button>
                ) : null
              )}

              {galleryImages[2] && (
                <button
                  onClick={() => openLightbox(3)}
                  className="group relative col-span-2 aspect-[16/9] cursor-pointer overflow-hidden"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                >
                  <img
                    src={galleryImages[2]}
                    alt={`${title} wide view`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </button>
              )}

              {[3, 4].map((i) =>
                galleryImages[i] ? (
                  <button
                    key={i}
                    onClick={() => openLightbox(i + 1)}
                    className="group relative aspect-[4/3] cursor-pointer overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                    }}
                  >
                    <img
                      src={galleryImages[i]}
                      alt={`${title} view ${i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </button>
                ) : null
              )}
            </div>
          </div>
        </div>
      </section>

      {videoUrl && (
        <section className="bg-whitesmoke px-6 py-16 md:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="font-secondary text-primary mb-4 text-sm tracking-[0.3em] uppercase">
                Take a Tour
              </p>
              <h2 className="heading-hero">Virtual Walkthrough</h2>
            </div>

            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <iframe
                src={videoUrl}
                title={`${title} ${subtitle} virtual tour`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </section>
      )}

      {floorPlanImage && (
        <section className="bg-white px-6 pt-16 pb-12 md:pt-12 md:pb-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="heading-hero text-center">Floor Plans</h2>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6">
              <div>
                <p className="font-secondary text-primary mb-1 text-sm tracking-[0.3em] uppercase">
                  Highlights
                </p>
              </div>

              <div className="space-y-2">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white p-3 shadow-sm"
                  >
                    <span className="font-secondary text-primary w-5 shrink-0 text-[10px] tracking-widest">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-secondary text-dark-black/80 text-sm capitalize">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border border-black/10 bg-white p-6 shadow-sm">
                <p className="font-secondary text-primary mb-6 text-[10px] tracking-[0.3em] uppercase">
                  At a Glance Total Capacity & Size
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="font-primary text-dark-black text-base font-light">
                      {stats.capacity} — {stats.sqft}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="mb-6">
                <p className="font-secondary text-primary mb-1 text-sm tracking-[0.3em] uppercase">
                  Layout
                </p>
              </div>
              <div className="overflow-hidden border border-black/10 bg-white p-4 shadow-sm">
                <img
                  src={floorPlanImage}
                  alt={`${title} ${subtitle} floor plan`}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <Link href={enquireHref} className="block">
              <CustomButton variant="primary">Request a Proposal</CustomButton>
            </Link>
          </div>
        </div>
      </section>
      )}

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={closeLightbox}
          onKeyDown={handleKey}
          tabIndex={0}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-7 w-7 text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            className="absolute top-1/2 left-6 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20"
            aria-label="Previous"
          >
            <ChevronLeft className="h-7 w-7 text-white" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute top-1/2 right-6 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 transition-colors hover:bg-white/20"
            aria-label="Next"
          >
            <ChevronRight className="h-7 w-7 text-white" />
          </button>

          <div
            className="relative mx-auto h-full max-h-[90vh] w-full max-w-7xl px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lbImages[selectedIndex]}
              alt={`${title} ${subtitle} image ${selectedIndex + 1}`}
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="absolute bottom-6 left-1/2 z-50 -translate-x-1/2">
            <div className="rounded-full bg-white/10 px-6 py-2 backdrop-blur-sm">
              <p className="font-secondary text-sm text-white">
                {selectedIndex + 1} / {lbImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
