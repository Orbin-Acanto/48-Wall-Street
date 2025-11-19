'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { ServiceSection } from '@/types';

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

  const images =
    section.images && section.images.length > 0
      ? section.images
      : ['/placeholder.jpg'];

  const imageAlts =
    section.imageAlts && section.imageAlts.length > 0
      ? section.imageAlts
      : images.map((_, i) => `${section.title} image ${i + 1}`);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [images.length]);

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
              className="font-primary mb-4 text-[2rem] leading-tight uppercase md:text-[2.6rem]"
            >
              {section.title}
            </h3>

            <p className="text-lead mb-4 text-gray-500">
              {section.description}
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
            <div className="relative h-72 md:h-96">
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

              {/* Slideshow indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                  {images.map((_, imgIdx) => (
                    <button
                      key={imgIdx}
                      onClick={() => setCurrentImageIndex(imgIdx)}
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
