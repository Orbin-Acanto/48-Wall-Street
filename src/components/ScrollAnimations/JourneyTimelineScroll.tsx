'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { JourneyEvent } from '@/types';
import { EventCard } from '../EventCard';
import Link from 'next/link';

interface Props {
  items: JourneyEvent[];
}

export default function JourneyTimelineScroll({ items }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (latest > 0.05) {
        setShowScrollHint(false);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen overflow-hidden bg-cover bg-fixed bg-center`}
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519167758481-83f29b8f4e3c?q=80&w=2000&auto=format&fit=crop')",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollHint ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none fixed bottom-8 left-1/2 z-50 -translate-x-1/2 md:bottom-12"
      >
        <motion.div
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="pointer-events-auto flex flex-col items-center gap-3"
        >
          <span className="text-xs font-medium tracking-widest text-gray-600 uppercase">
            Scroll to explore
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              window.scrollBy({
                top: window.innerHeight * 0.8,
                behavior: 'smooth',
              });
            }}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-900 bg-white transition-all hover:bg-gray-900"
          >
            {/* Pulse effect */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className="bg-primary absolute inset-0 rounded-full"
            />

            {/* Icon */}
            <svg
              className="relative h-6 w-6 text-gray-900 transition-all group-hover:translate-y-1 group-hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 py-16 md:py-20 lg:py-24">
        {/* Header */}
        <div className="container mx-auto mb-16 px-4 text-center md:mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="border-primary/20 mb-6 inline-flex items-center gap-2 rounded-full border bg-white/90 px-5 py-2 backdrop-blur-sm"
            >
              <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
              <span className="text-primary text-xs font-semibold tracking-wider uppercase">
                Our Portfolio
              </span>
            </motion.div>

            <h2 className="font-secondary mb-4 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
              Our Event Journey
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-700 md:text-lg lg:text-xl">
              Follow our path of creating unforgettable moments across the
              country
            </p>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="relative container mx-auto px-4">
          {/* Vertical Path Line */}
          <div className="absolute top-0 bottom-15 left-1/2 hidden w-1 -translate-x-1/2 md:block">
            {/* Background line */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300" />

            {/* Animated progress line */}
            <motion.div
              style={{
                height: pathHeight,
              }}
              className="from-primary to-primary bg-primary absolute inset-x-0 top-0"
            />

            {/* Traveling Indicator */}
            <motion.div
              style={{
                top: pathHeight,
              }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="bg-primary relative h-10 w-10 rounded-full border-4 border-white shadow-lg"
              >
                {/* Inner glow */}
                <div className="absolute inset-2 rounded-full bg-white/40" />

                {/* Pulse effect */}
                <motion.div
                  animate={{
                    scale: [1, 2.2, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                  className="bg-primary absolute inset-0 rounded-full"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Events */}
          <div className="space-y-32 md:space-y-40 lg:space-y-48">
            {items.map((event, index) => {
              const isLeft = index % 2 === 0;
              return (
                <EventCard
                  key={index}
                  event={event}
                  index={index}
                  isLeft={isLeft}
                />
              );
            })}
          </div>

          {/* End Marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="relative mt-32 hidden justify-center md:mt-40 md:flex lg:mt-48"
          >
            <div className="relative">
              <div className="from-primary bg-primary flex h-20 w-20 items-center justify-center rounded-full border-4 border-white to-gray-900 shadow-xl md:h-24 md:w-24">
                <svg
                  className="h-10 w-10 text-white md:h-12 md:w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="bg-primary absolute inset-0 rounded-full"
              />
            </div>
          </motion.div>
        </div>
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center md:mt-24 lg:mt-32"
        >
          <div className="mx-auto max-w-3xl border-2 border-gray-200 bg-white/95 p-8 backdrop-blur-sm md:p-12 lg:p-16">
            <h3 className="font-secondary mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              Ready to start your journey?
            </h3>
            <p className="mx-auto mb-8 max-w-xl text-base text-gray-700 md:text-lg">
              Let's create an unforgettable event experience together
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-primary bg-primary hover:border-primary/80 hover:bg-primary/80 cursor-pointer border-2 px-10 py-4 text-base font-semibold text-white transition-all md:px-12 md:text-lg"
              >
                Begin Your Event
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
