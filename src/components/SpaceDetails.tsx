'use client';

import Link from 'next/link';
import CustomButton from '@/components/CustomButton';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
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
  /** Hero slider images. Falls back to images[0] when omitted. */
  heroImages?: string[];
  images: string[];
  lightboxImages?: string[];
  videoUrl?: string;
  floorPlanImage?: string;
  features?: string[];
  stats: SpaceStats;
  enquireHref?: string;
  thenNow?: {
    then: string;
    now: string;
    caption?: string;
    thenAlt?: string;
    nowAlt?: string;
  }[];
}

export default function SpaceDetails({
  levelLabel,
  title,
  subtitle,
  description,
  heroImages,
  images,
  videoUrl,
  lightboxImages,
  floorPlanImage,
  features = [],
  stats,
  enquireHref = '/contact',
  thenNow,
}: SpaceDetailsProps) {
  // When a dedicated hero slider is provided, the full `images` array is the
  // gallery. Otherwise keep the legacy behavior: images[0] is the hero.
  const slides =
    heroImages && heroImages.length > 0 ? heroImages : images.slice(0, 1);
  const galleryImages = heroImages && heroImages.length > 0 ? images : images.slice(1);
  const lbImages = lightboxImages ?? galleryImages;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(
      () => setCurrentSlide((s) => (s + 1) % slides.length),
      5000
    );
    return () => clearInterval(timer);
  }, [slides.length]);

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
        <AnimatePresence mode="wait">
          <motion.img
            key={currentSlide}
            src={slides[currentSlide]}
            alt={`${title} ${subtitle}`}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1 },
              scale: { duration: 6, ease: 'linear' },
            }}
          />
        </AnimatePresence>
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

        {slides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentSlide ? 'bg-primary w-8' : 'w-2 bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
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
                    onClick={() => openLightbox(i)}
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
                  onClick={() => openLightbox(2)}
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
                    onClick={() => openLightbox(i)}
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

      {thenNow && thenNow.length > 0 && (
        <section className="bg-white px-6 py-16 md:px-12 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="font-secondary text-primary mb-4 text-sm tracking-[0.3em] uppercase">
                A Living Landmark
              </p>
              <h2 className="heading-hero">Then &amp; Now</h2>
              <p className="font-secondary text-dark-black/70 mx-auto mt-3 max-w-2xl text-base leading-relaxed md:text-lg">
                From its Bank of New York era to the present day, this landmark
                has hosted the story of American finance. See how these historic
                spaces live on.
              </p>
            </div>

            <div className="space-y-10 md:space-y-16">
              {thenNow.map((pair, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
                >
                  {(
                    [
                      { label: 'Then', src: pair.then, alt: pair.thenAlt },
                      { label: 'Now', src: pair.now, alt: pair.nowAlt },
                    ] as const
                  ).map((frame) => (
                    <figure key={frame.label} className="group relative">
                      <div className="relative aspect-[16/10] overflow-hidden bg-black">
                        <img
                          src={frame.src}
                          alt={
                            frame.alt ||
                            `${title} ${subtitle} — ${frame.label.toLowerCase()}`
                          }
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="font-secondary bg-dark-black/70 absolute top-4 left-4 px-3 py-1 text-[10px] tracking-[0.3em] text-white uppercase backdrop-blur-sm">
                          {frame.label}
                        </span>
                      </div>
                    </figure>
                  ))}

                  {pair.caption && (
                    <p className="font-secondary text-dark-black/60 -mt-1 text-center text-sm md:col-span-2">
                      {pair.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
                <CustomButton variant="primary">
                  Request a Proposal
                </CustomButton>
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
