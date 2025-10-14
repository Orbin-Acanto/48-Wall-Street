'use client';
import React, { useState } from 'react';
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

export interface EventShowcaseProps {
  title: string;
  subtitle?: string;
  description: string;
  images: ImageItem[];
  tags: string[];
  primaryCta?: CTA;
  secondaryCta?: CTA;
  stats: Stat[];
  info: InfoItem[];
}

export default function EventDetails({
  title,
  subtitle,
  description,
  images,
  tags,
  primaryCta,
  secondaryCta,
  stats,
  info,
}: EventShowcaseProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const { ref: heroRef, y: heroY } = useParallax(['0%', '-12%']);

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
              <SplitTitle text={title} immediate />
              {subtitle && (
                <SoftFadeIn immediate>
                  <p className="font-secondary text-primary text-sm tracking-widest uppercase md:text-sm">
                    {subtitle}
                  </p>
                </SoftFadeIn>
              )}
              <SoftFadeIn delay={0.1} immediate>
                <p className="font-secondary text-base leading-relaxed text-gray-700 md:text-lg">
                  {description}
                </p>
              </SoftFadeIn>

              <SoftFadeIn delay={0.15} immediate>
                <div className="flex flex-wrap gap-3 pt-2">
                  {primaryCta && (
                    <CustomButton className="text-white">
                      {primaryCta.label}
                    </CustomButton>
                  )}
                  {secondaryCta && (
                    <CustomButton variant="secondary" className="border-none">
                      {secondaryCta.label}
                    </CustomButton>
                  )}
                </div>
              </SoftFadeIn>

              {stats?.length > 0 && (
                <SoftFadeIn delay={0.2} immediate>
                  <div className="grid grid-cols-3 gap-3 pt-6">
                    {stats.map((s, i) => (
                      <GlassCard key={i} className="p-4 text-center">
                        <div className="font-secondary text-2xl text-gray-900 md:text-3xl">
                          {s.value}
                        </div>
                        <div className="text-xs tracking-widest text-gray-600 uppercase md:text-sm">
                          {s.label}
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </SoftFadeIn>
              )}
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
      <section className="bg-white">
        <div className="container mx-auto px-4 pt-4 pb-16 md:pt-10 md:pb-24">
          <div className="grid gap-6 md:grid-cols-3">
            {['Venue Sourcing', 'Culinary & Mixology', 'Production & AV'].map(
              (t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                  className="group"
                >
                  <GlassCard className="h-full p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      {/* <div className="bg-primary/30 group-hover:bg-primary/40 h-10 w-10 rounded-full transition" /> */}
                      <div>
                        <h3 className="font-secondary text-xl text-gray-900 md:text-2xl">
                          {t}
                        </h3>
                        <p className="mt-2 text-sm text-gray-700 md:text-base">
                          Elevate your experience with end-to-end planning,
                          premium vendor relations, and impeccable on-site
                          execution.
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* IMMERSIVE BANNER - Food Service Animation */}
      <section className="relative min-h-[500px] overflow-hidden md:min-h-[600px]">
        <div className="absolute inset-0 z-0">
          {/* Static Fallback Background - Always visible */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Animated Crossfade Images */}
          <div className="absolute inset-0">
            {[
              'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1600&auto=format&fit=crop', // Food plating
              'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop', // Dining ambiance
            ].map((url, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('${url}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                animate={{
                  opacity: i === 0 ? [0, 1, 1, 0, 0] : [0, 0, 1, 1, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/60" />

          {/* Animated Light Streaks */}
          <div className="absolute inset-0 overflow-hidden">
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
          </div>

          {/* Floating Elements (like steam or sparkles) */}
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

        <div className="relative z-10 container mx-auto px-4 py-20 text-center md:py-28">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-secondary text-base font-light tracking-[0.25em] uppercase shadow-2xl"
          >
            Full‑Service • Anywhere • Any Scale
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="font-secondary mx-auto mt-4 max-w-4xl text-3xl leading-tight text-white md:text-5xl lg:text-6xl"
          >
            From intimate vows to global premieres
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="font-primary mx-auto mt-4 max-w-2xl text-base text-white/80 md:text-lg"
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
            <CustomButton className="text-white">Start Your Event</CustomButton>
          </motion.div>
        </div>
      </section>

      {/* INFO / ACCORDION */}
      {info?.length > 0 && (
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
              >
                <h2 className="font-secondary text-3xl text-gray-900 md:text-4xl lg:text-5xl">
                  Frequently Asked Questions
                </h2>
                <p className="font-primary mt-3 text-gray-600">
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
