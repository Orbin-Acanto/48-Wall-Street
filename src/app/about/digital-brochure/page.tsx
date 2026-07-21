'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import BookReader from '@/components/BookReader';
import { brochurePages } from '@/data';
import CustomButton from '@/components/CustomButton';

export default function DigitalBrochurePage() {
  return (
    <div className="bg-whitesmoke min-h-screen">
      <section className="relative mt-22 h-[600px] overflow-hidden md:h-[700px] lg:h-[700px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/about/digital-brochure-hero.jpg')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/30" />

        <div className="relative flex h-full items-center justify-center">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="heading-hero text-white">
                Discover Our Historic Venue
              </h1>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '200px' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-primary mx-auto mb-8 h-0.5 w-16"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="tex-lead font-secondary mb-8 text-center"
                style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)' }}
              >
                Take a closer look at 48 Wall Street&apos;s stunning 1920s
                architecture and versatile event spaces. Our digital brochure
                features detailed floor plans, capacity information, and
                beautiful photography showcasing why we&apos;re Lower
                Manhattan&apos;s premier destination for unforgettable
                celebrations.
              </motion.p>

              <Link
                href={'/brochures/general/48-wall-street-brochure.pdf'}
                download
              >
                <CustomButton variant="primary">Download Brochure</CustomButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="book">
        <BookReader
          pages={brochurePages}
          title="48 Wall Street Brochure"
          subtitle="Historic Venue • Modern Events • Unforgettable Moments"
          downloadUrl="/brochures/general/48-wall-street-brochure.pdf"
        />
      </section>

      <section className="relative overflow-hidden bg-white py-12 md:py-20">
        <div className="relative container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-primary mb-4 text-3xl text-gray-900 uppercase md:text-4xl lg:text-5xl">
                Ready to Host Your Event?
              </h2>

              <p className="text-lead mb-8 max-w-2xl">
                Let&apos;s discuss how 48 Wall Street can be the perfect venue
                for your next celebration
                <br /> or corporate gathering.
              </p>

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
                  <span className="font-medium">212.971.5353</span>
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
                  <span className="font-medium">info@48wallnyc.com</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
