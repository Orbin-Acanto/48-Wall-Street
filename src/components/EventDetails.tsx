'use client';
import React, { Fragment, useState } from 'react';
import { motion } from 'framer-motion';
import CustomButton from '@/components/CustomButton';
import { CTA, ImageItem, InfoItem, Stat } from '@/types';
import {
  GlassCard,
  Lightbox,
  Marquee,
  SoftFadeIn,
  SplitTitle,
  useParallax,
} from '@/utils';
import Link from 'next/link';
import { emptyFashionVenue, services as defaultServices } from '@/data';
import EmptyPhotoGallery from './EmptyPhotoGallery';
import ClientLogos, { ClientLogo } from './ClientLogos';
import BookReader from './BookReader';

export interface ServiceItem {
  title: string;
  subtitle?: string;
  body: string;
  /** Optional dedicated image for this section (sections variant). Falls back to the shared images array when omitted. */
  image?: string;
  imageAlt?: string;
}

export interface BrochureConfig {
  pages: { id: number; image: string; alt?: string }[];
  downloadUrl: string;
  title?: string;
  subtitle?: string;
  shareSlug?: string;
}

export interface EventShowcaseProps {
  title: string;
  subtitle?: string;
  description: string;
  images: ImageItem[];
  tags: string[];
  primaryCta?: CTA;
  /** When provided, renders multiple primary buttons (each linking to its own href) in place of primaryCta. */
  primaryCtas?: CTA[];
  secondaryCta?: CTA;
  stats: Stat[];
  info: InfoItem[];
  services?: ServiceItem[];
  servicesVariant?: 'cards' | 'sections';
  clientLogos?: ClientLogo[];
  brochure?: BrochureConfig;
  /**
   * Optional full-width content rendered immediately after the brochure
   * section. Used for page-specific features such as the holiday Santa
   * experience.
   */
  afterBrochure?: React.ReactNode;
}

export default function EventDetails({
  title,
  subtitle,
  description,
  images,
  tags,
  primaryCta,
  primaryCtas,
  secondaryCta,
  info,
  services,
  servicesVariant = 'cards',
  clientLogos,
  brochure,
  afterBrochure,
}: EventShowcaseProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const { ref: heroRef, y: heroY } = useParallax(['0%', '-12%']);

  const displayServices: ServiceItem[] = services || defaultServices;

  return (
    <div className="mt-16 min-h-screen bg-white text-gray-900 md:mt-10">
      {/* HERO */}
      <section ref={heroRef} className="relative isolate">
        {/* Decorative gradient */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(210,179,113,0.18),rgba(255,255,255,0))]" />

        <motion.div
          style={{ y: heroY }}
          className="container mx-auto px-4 pt-24 md:pt-32"
        >
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* LEFT SIDE - Content */}
            <div className="font-primary space-y-6">
              {/* <SplitTitle text={title} immediate /> */}
              <h1 className="heading-hero">{title}</h1>
              {subtitle && (
                <SoftFadeIn immediate>
                  <h2 className="font-secondary text-primary text-base font-bold tracking-widest uppercase md:text-sm">
                    {subtitle}
                  </h2>
                </SoftFadeIn>
              )}
              <SoftFadeIn delay={0.1} immediate>
                <div className="text-lead space-y-4">
                  {description
                    .split(/\r\n|\r|\n|\\n|<\/?br\s*\/?>/i)
                    .map((line) => line.trim())
                    .filter((line) => line.length > 0)
                    .map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                </div>
              </SoftFadeIn>

              <SoftFadeIn delay={0.15} immediate>
                <div className="flex flex-wrap gap-3 pt-2">
                  {primaryCtas && primaryCtas.length > 0
                    ? primaryCtas.map((cta, i) => (
                        <Link key={i} href={cta.href || '/contact'}>
                          <CustomButton className="text-dark-black">
                            {cta.label}
                          </CustomButton>
                        </Link>
                      ))
                    : primaryCta && (
                        <Link href="/contact">
                          <CustomButton className="text-dark-black">
                            {primaryCta.label}
                          </CustomButton>
                        </Link>
                      )}
                  {secondaryCta && (
                    <Link href={secondaryCta.href || '/contact'}>
                      <CustomButton variant="secondary" className="border-none">
                        {secondaryCta.label}
                      </CustomButton>
                    </Link>
                  )}
                </div>
              </SoftFadeIn>
            </div>

            {/* RIGHT SIDE - Mosaic Gallery */}
            <div className="w-full">
              {/* Mobile: 2 column grid */}
              <div className="grid grid-cols-2 gap-3 sm:hidden">
                {images.slice(0, 6).map((img, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="aspect-square overflow-hidden bg-white"
                  >
                    <img
                      src={img.src}
                      alt={img.alt || `event-${idx}`}
                      className="h-full w-full object-cover"
                      style={{
                        imageRendering: '-webkit-optimize-contrast',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                      }}
                      loading="eager"
                    />
                  </motion.button>
                ))}
              </div>

              {/* Tablet & Desktop: Complex mosaic grid */}
              <div className="hidden auto-rows-[120px] grid-cols-6 gap-3 sm:grid lg:gap-4">
                {/* Image 1 - Large featured */}
                <motion.button
                  onClick={() => setLightboxIndex(0)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="col-span-4 row-span-2 overflow-hidden bg-white"
                >
                  <img
                    src={images[0]?.src}
                    alt={images[0]?.alt || 'event-0'}
                    className="h-full w-full object-cover"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                    }}
                    loading="eager"
                  />
                </motion.button>

                {/* Image 2 - Top right */}
                <motion.button
                  onClick={() => setLightboxIndex(1)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="col-span-2 row-span-2 overflow-hidden bg-white"
                >
                  <img
                    src={images[1]?.src}
                    alt={images[1]?.alt || 'event-1'}
                    className="h-full w-full object-cover"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                    }}
                    loading="eager"
                  />
                </motion.button>

                {/* Image 3 - Middle left */}
                <motion.button
                  onClick={() => setLightboxIndex(2)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="col-span-2 row-span-2 overflow-hidden bg-white"
                >
                  <img
                    src={images[2]?.src}
                    alt={images[2]?.alt || 'event-2'}
                    className="h-full w-full object-cover"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                    }}
                    loading="eager"
                  />
                </motion.button>

                {/* Image 4 - Middle center large */}
                <motion.button
                  onClick={() => setLightboxIndex(3)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="col-span-4 row-span-2 overflow-hidden bg-white"
                >
                  <img
                    src={images[3]?.src}
                    alt={images[3]?.alt || 'event-3'}
                    className="h-full w-full object-cover"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                    }}
                    loading="eager"
                  />
                </motion.button>

                {/* Image 5 - Bottom left */}
                <motion.button
                  onClick={() => setLightboxIndex(4)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="col-span-3 row-span-2 overflow-hidden bg-white"
                >
                  <img
                    src={images[4]?.src}
                    alt={images[4]?.alt || 'event-4'}
                    className="h-full w-full object-cover"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                    }}
                    loading="eager"
                  />
                </motion.button>

                {/* Image 6 - Bottom right */}
                <motion.button
                  onClick={() => setLightboxIndex(5)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="col-span-3 row-span-2 overflow-hidden bg-white"
                >
                  <img
                    src={images[5]?.src}
                    alt={images[5]?.alt || 'event-5'}
                    className="h-full w-full object-cover"
                    style={{
                      imageRendering: '-webkit-optimize-contrast',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                    }}
                    loading="eager"
                  />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="bg-white pb-8">
        {tags?.length > 0 && (
          <div className="border-y border-gray-800/20 bg-white py-3">
            <div className="container mx-auto px-4">
              <Marquee items={tags} />
            </div>
          </div>
        )}
      </div>

      {/* FEATURE STRIP */}
      {servicesVariant === 'sections' ? (
        <section className="bg-whitesmoke">
          <div className="container mx-auto px-4 py-16 md:px-8 md:py-20 lg:px-16">
            <div className="divide-primary/15 divide-y">
              {displayServices.map((service, i) => {
                const img = service.image
                  ? {
                      src: service.image,
                      alt: service.imageAlt || service.title,
                    }
                  : images[(i + 1) % images.length];
                const reverse = i % 2 === 1;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7 }}
                    className="grid items-start gap-10 py-12 first:pt-0 last:pb-0 md:gap-16 md:py-16 lg:grid-cols-2 lg:gap-20"
                  >
                    {/* Visual */}
                    <div
                      className={`lg:sticky lg:top-28 ${reverse ? 'lg:order-last' : ''}`}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-2xl shadow-black/20">
                        <img
                          src={img?.src}
                          alt={img?.alt || service.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="font-primary text-primary text-[1.9rem] leading-tight uppercase md:text-[2.4rem]">
                        {service.title}
                      </h3>
                      {service.subtitle && (
                        <p className="font-secondary mt-2 mb-6 text-sm tracking-[0.15em] text-gray-400 uppercase">
                          {service.subtitle}
                        </p>
                      )}
                      <div className="text-lead space-y-4 text-left text-gray-600">
                        {service.body
                          .split(/\n+/)
                          .map((p) => p.trim())
                          .filter(Boolean)
                          .map((p, idx) => (
                            <p key={idx}>{p}</p>
                          ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-whitesmoke">
          <div className="container mx-auto px-4 pt-12 pb-12 md:pt-20 md:pb-20">
            <div className="grid gap-6 lg:grid-cols-3">
              {displayServices.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard className="h-full p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div>
                        <h3 className="font-secondary text-xl text-gray-900 md:text-2xl">
                          {service.title}
                        </h3>
                        {service.subtitle && (
                          <p className="font-secondary text-primary mt-1 text-xs tracking-[0.15em] uppercase">
                            {service.subtitle}
                          </p>
                        )}
                        <p className="mt-2 text-sm text-gray-700 md:text-base">
                          {service.body}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BROCHURE, placed ahead of the immersive CTA section.
          White background so it alternates against the section above it. */}
      {brochure && brochure.pages.length > 0 && (
        <section id="brochure" className="bg-white">
          <BookReader
            pages={brochure.pages}
            title={brochure.title || 'View Our Brochure'}
            subtitle={brochure.subtitle}
            downloadUrl={brochure.downloadUrl}
            shareSlug={brochure.shareSlug}
          />
        </section>
      )}

      {/* Page-specific full-width feature, rendered after the brochure */}
      {afterBrochure}

      {/* IMMERSIVE Food Service Section */}
      <section className="relative min-h-[500px] overflow-hidden md:min-h-[600px]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0">
            {[
              '/shared/event-details/gallery-01.jpg',
              '/shared/event-details/gallery-02.jpg',
              '/shared/event-details/gallery-03.jpg',
            ].map((url, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('${url}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                initial={{ opacity: i === 0 ? 1 : 0 }}
                animate={{
                  opacity:
                    i === 0
                      ? [1, 1, 0, 0, 0, 0, 1]
                      : i === 1
                        ? [0, 0, 1, 1, 0, 0, 0]
                        : [0, 0, 0, 0, 1, 1, 0],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.22, 0.33, 0.55, 0.66, 0.88, 1],
                }}
              />
            ))}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/60 to-black/60" />

          {/* <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px w-32 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                style={{
                  top: `${30 + i * 20}%`,
                  left: '-10%',
                }}
                animate={{
                  left: ['0%', '110%'],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div> */}

          <div className="absolute inset-0 opacity-40">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + i * 12}%`,
                  bottom: '10%',
                }}
                animate={{
                  y: [-20, -150],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1.2, 0.8],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: 'easeOut',
                }}
              >
                <div className="h-3 w-3 rounded-full bg-white/60 blur-sm" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 container mx-auto flex flex-col items-center justify-center py-28 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-secondary text-base font-light tracking-[0.25em] uppercase shadow-2xl"
          >
            Full-Service • Professional Staff • Any Scale
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="heading-hero my-8 text-white"
          >
            Exceptional events for every occasion
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="text-lead mb-4 text-gray-100"
          >
            Every detail perfected, every moment unforgettable
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="mt-8"
          >
            <Link href="/contact">
              <CustomButton>Start Planning Your Event</CustomButton>
            </Link>
          </motion.div>
        </div>
      </section>
      {clientLogos && clientLogos.length > 0 ? (
        <ClientLogos logos={clientLogos} />
      ) : (
        <EmptyPhotoGallery galleryPhotos={emptyFashionVenue} />
      )}

      {/* ACCORDION */}
      {info?.length > 0 && (
        <section className="bg-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
              >
                <h2 className="heading-hero text-primary">
                  Frequently Asked Questions
                </h2>
                <p className="text-lead">
                  Everything you need to know about our services
                </p>
              </motion.div>

              {/* Accordion Items */}
              <div className="space-y-4">
                {info.map((item, i) => (
                  <motion.details
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between">
                      <span className="font-secondary text-lg font-medium text-gray-900 md:text-xl">
                        {item.heading}
                      </span>
                      <span className="text-primary bg-primary/10 ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xl transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="font-primary mt-4 border-t border-gray-100 pt-4 leading-relaxed text-gray-700">
                        {item.body}
                      </p>
                    </motion.div>
                  </motion.details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {lightboxIndex >= 0 && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
        />
      )}
    </div>
  );
}
