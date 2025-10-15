'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BookReader from '@/components/BookReader';
import { brochurePages } from '@/data';

export default function DigitalBrochurePage() {
  return (
    <div className="bg-whitesmoke min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden md:h-[800px] lg:h-[800px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/misc/hv.jpg')",
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

        {/* Content */}
        <div className="relative flex h-full items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Main Title */}
              <h1 className="font-primary text-whitesmoke mb-6 text-5xl tracking-wider uppercase md:text-6xl lg:text-7xl">
                Lower Manhattan's Premier Event Venue
              </h1>

              {/* Decorative Line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '200px' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-primary mx-auto mb-8 h-1"
              />

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="font-primary mx-auto mb-10 max-w-3xl text-lg text-white/90 md:text-xl lg:text-2xl"
              >
                Discover exceptional venues across New York, thoughtfully
                curated for unforgettable events
              </motion.p>

              <motion.a
                href="#book"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-primary/90 inline-flex items-center gap-3 px-10 py-4 font-bold tracking-wider text-white uppercase shadow-2xl transition md:px-12 md:py-5"
              >
                <span>Explore Venues</span>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs font-medium tracking-widest text-white/70 uppercase">
              Scroll Down
            </span>
            <svg
              className="h-6 w-6 text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Book Reader */}
      <section id="book">
        <BookReader
          pages={brochurePages}
          title="48 Wall Street Brochure 2025"
          subtitle="Historic Venue • Modern Events • Unforgettable Moments"
          downloadUrl="/brochures/48Brochure-2025.v7.pdf"
        />
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="relative container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-primary mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                Ready to Host Your Event?
              </h2>

              <p className="font-secondary mb-8 text-lg text-gray-700 md:text-xl">
                Let's discuss how 48 Wall Street can be the perfect venue for
                your next celebration or corporate gathering.
              </p>

              {/* Single CTA Button */}
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-primary bg-primary hover:bg-primary/90 inline-flex cursor-pointer items-center gap-3 border-2 px-10 py-5 text-lg font-bold text-white shadow-xl transition"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Schedule Consultation</span>
                </motion.button>
              </Link>

              {/* Contact Info */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg
                    className="text-primary h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="font-medium">Call us for inquiries</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="text-primary h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-medium">Quick email response</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
