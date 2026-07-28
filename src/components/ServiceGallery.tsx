'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { renderMultiline } from '@/utils';

export type ServiceGalleryImage = {
  src: string;
  alt: string;
  /** portrait images span two rows for a natural masonry rhythm */
  orientation?: 'portrait' | 'landscape';
};

type Props = {
  title: string;
  subtitle?: string;
  images: readonly ServiceGalleryImage[];
};

export default function ServiceGallery({ title, subtitle, images }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;

  const close = useCallback(() => setActiveIndex(null), []);
  const next = useCallback(
    () =>
      setActiveIndex((prev) =>
        prev === null ? prev : (prev + 1) % images.length,
      ),
    [images.length],
  );
  const prev = useCallback(
    () =>
      setActiveIndex((p) =>
        p === null ? p : (p - 1 + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
    return () => {
      if (typeof window !== 'undefined') document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close, next, prev]);

  if (!images || images.length === 0) return null;

  return (
    <section id="gallery" className="bg-white py-12 lg:py-20">
      <div className="container mx-auto px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mx-auto mb-12 max-w-4xl text-center"
        >
          <h4 className="heading-hero text-primary mb-4">{title}</h4>
          {subtitle && (
            <p className="text-lead text-gray-400">
              {renderMultiline(subtitle)}
            </p>
          )}
        </motion.div>

        {/* Masonry layout */}
        <div className="[column-fill:_balance] gap-4 sm:columns-2 lg:columns-3">
          {images.map((img, idx) => (
            <motion.button
              key={img.src}
              type="button"
              onClick={() => setActiveIndex(idx)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: (idx % 6) * 0.05 }}
              className="group relative mb-4 block w-full overflow-hidden rounded-lg shadow-lg shadow-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(210,179,113,0.9)]"
              aria-label={`View ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.orientation === 'portrait' ? 800 : 1200}
                height={img.orientation === 'portrait' ? 1067 : 800}
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {isOpen && activeIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Close gallery"
            className="absolute top-4 right-4 z-10 text-3xl text-white/90 transition-opacity hover:opacity-70"
          >
            ✕
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Previous image"
                className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white/90 transition-colors hover:bg-white/10 sm:left-6"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Next image"
                className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white/90 transition-colors hover:bg-white/10 sm:right-6"
              >
                ›
              </button>
            </>
          )}

          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="relative flex max-h-[85vh] w-full max-w-5xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              width={1600}
              height={1067}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/70">
            {activeIndex + 1} / {images.length}
          </p>
        </motion.div>
      )}
    </section>
  );
}
