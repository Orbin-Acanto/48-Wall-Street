'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { ServiceSection } from '@/types';
import { renderMultiline } from '@/utils';

export default function ServiceSectionItem({
  section,
  idx,
  panelVariants,
}: {
  section: ServiceSection;
  idx: number;
  panelVariants: Variants;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxOpen = lightboxIndex !== null;

  const images =
    section.images && section.images.length > 0
      ? section.images
      : ['/shared/placeholder.jpg'];

  const imageAlts =
    section.imageAlts && section.imageAlts.length > 0
      ? section.imageAlts
      : images.map((_, i) => `${section.title} image ${i + 1}`);

  useEffect(() => {
    if (images.length <= 1 || lightboxOpen) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [images.length, lightboxOpen]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextLightbox = useCallback(
    () =>
      setLightboxIndex((prev) =>
        prev === null ? prev : (prev + 1) % images.length,
      ),
    [images.length],
  );
  const prevLightbox = useCallback(
    () =>
      setLightboxIndex((prev) =>
        prev === null ? prev : (prev - 1 + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = lightboxOpen ? 'hidden' : '';
    }
    return () => {
      if (typeof window !== 'undefined') document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, closeLightbox, nextLightbox, prevLightbox]);

  return (
    <section
      key={section.id}
      className="relative flex items-center py-20"
      style={{
        backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f5f5f5',
      }}
      aria-labelledby={`panel-${section.id}`}
    >
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {images.map((image, imgIdx) => (
          <div
            key={imgIdx}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: currentImageIndex === imgIdx ? 1 : 0,
            }}
          >
            <Image
              src={image}
              alt={
                imageAlts[imgIdx] || `${section.title} background ${imgIdx + 1}`
              }
              fill
              className="scale-105 object-cover object-center transition-transform duration-800"
              sizes="100vw"
              priority={imgIdx === 0}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10,10,10,0.28) 0%, rgba(10,10,10,0.42) 50%, rgba(10,10,10,0.6) 100%)',
                mixBlendMode: 'multiply',
              }}
            />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0">
          <div
            style={{
              position: 'absolute',
              right: '-20%',
              top: '10%',
              width: '40%',
              height: '60%',
              background:
                'radial-gradient(closest-side, rgba(210,179,113,0.12), transparent)',
              filter: 'blur(40px)',
              transform: 'rotate(-12deg)',
            }}
          />
        </div>
      </div>

      {/* content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/* left copy */}
          <motion.div
            ref={ref}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={panelVariants}
            className="max-w-2xl"
          >
            <h3
              id={`panel-${section.id}`}
              className="font-primary text-primary mb-3 text-[2rem] leading-tight uppercase md:text-[2.6rem]"
            >
              {section.title}
            </h3>

            {section.subtitle && (
              <p className="text-lead mb-4 text-gray-400">
                {renderMultiline(section.subtitle)}
              </p>
            )}

            <p className="text-lead mb-4 text-gray-500">
              {renderMultiline(section.description)}
            </p>

            <div className="text-primary font-secondary flex items-center gap-4">
              {/* <button
                onClick={() => {
                  const next = document.querySelectorAll('section')[idx + 3];
                  if (next)
                    (next as HTMLElement).scrollIntoView({
                      behavior: 'smooth',
                    });
                }}
                className="text-primary text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-80"
                aria-label={`Scroll to next section after ${section.title}`}
              >
                Explore next
              </button> */}

              {section.link && (
                <a
                  href={section.link.url}
                  className="text-primary text-sm font-medium underline underline-offset-4 transition-opacity hover:opacity-80"
                >
                  {section.link.text}
                </a>
              )}
            </div>
          </motion.div>

          {/* right visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded shadow-2xl shadow-black/20"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
            }}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(currentImageIndex)}
              className="group relative block h-72 w-full cursor-zoom-in md:h-96"
              aria-label={`Enlarge ${section.title} image`}
            >
              {images.map((image, imgIdx) => (
                <div
                  key={imgIdx}
                  className="absolute inset-0 transition-opacity duration-1000"
                  style={{
                    opacity: currentImageIndex === imgIdx ? 1 : 0,
                  }}
                >
                  <Image
                    src={image}
                    alt={imageAlts[imgIdx] || `${section.title} ${imgIdx + 1}`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width:1024px)100vw,50vw"
                    priority={imgIdx === 0}
                  />
                </div>
              ))}

              {/* soft glass overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)',
                  mixBlendMode: 'overlay',
                }}
              />

              {/* hover darken + expand icon */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                </span>
              </div>

              {/* Slideshow indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                  {images.map((_, imgIdx) => (
                    <button
                      key={imgIdx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(imgIdx);
                      }}
                      className="h-2 rounded-full transition-all duration-300 hover:scale-125"
                      style={{
                        backgroundColor:
                          currentImageIndex === imgIdx
                            ? 'rgba(210,179,113,0.9)'
                            : 'rgba(255,255,255,0.5)',
                        width: currentImageIndex === imgIdx ? '24px' : '8px',
                      }}
                      aria-label={`Go to slide ${imgIdx + 1}`}
                    />
                  ))}
                </div>
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && lightboxIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            aria-label="Close image"
            className="absolute top-4 right-4 z-10 text-3xl text-white/90 transition-opacity hover:opacity-70"
          >
            ✕
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevLightbox();
                }}
                aria-label="Previous image"
                className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white/90 transition-colors hover:bg-white/10 sm:left-6"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextLightbox();
                }}
                aria-label="Next image"
                className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white/90 transition-colors hover:bg-white/10 sm:right-6"
              >
                ›
              </button>
            </>
          )}

          <motion.div
            key={lightboxIndex}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="relative flex max-h-[85vh] w-full max-w-5xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={
                imageAlts[lightboxIndex] ||
                `${section.title} ${lightboxIndex + 1}`
              }
              width={1600}
              height={1067}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>

          {images.length > 1 && (
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/70">
              {lightboxIndex + 1} / {images.length}
            </p>
          )}
        </motion.div>
      )}
    </section>
  );
}
