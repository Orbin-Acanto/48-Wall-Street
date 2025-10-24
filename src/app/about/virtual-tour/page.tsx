'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CustomButton from '@/components/CustomButton';

export default function VirtualTourPage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-whitesmoke min-h-screen">
      {/* Hero Section */}
      <section className="relative mt-22 h-[600px] overflow-hidden md:h-[700px] lg:h-[700px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/misc/hv_1.jpg')",
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
              <h1 className="heading-hero text-white">
                Experience 48 Wall Street
              </h1>

              {/* Decorative Line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '200px' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-primary mx-auto mb-8 h-0.5 w-16"
              />

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lead mb-24 text-gray-300"
              >
                Take an immersive 3D journey through our historic venue from
                anywhere in the world
              </motion.p>

              {/* CTA Button */}
              <motion.a
                href="#tour"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="font-secondary bg-primary text-dark-black border-primary hover:bg-primary/90 cursor-pointer border-2 px-8 py-4 text-sm font-semibold tracking-wide uppercase shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>Start Virtual Tour</span>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <motion.div
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
        </motion.div> */}
      </section>

      {/* Virtual Tour Section */}
      <section id="tour" className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <h2 className="font-primary text-primary mb-4 text-4xl uppercase md:text-5xl lg:text-6xl">
              Explore Every Detail
            </h2>
            <p className="text-lead text-gray-500">
              Navigate through our stunning venue at your own pace.
              <br />
              Click, drag, and discover the perfect space for your event.
            </p>
          </motion.div>

          {/* Tour Controls Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-8 max-w-4xl"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Control Tip 1 */}
              <div className="flex items-center gap-3 bg-gray-50 p-4">
                <div className="bg-primary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Click & Drag</h3>
                  <p className="text-sm text-gray-600">Navigate 360° views</p>
                </div>
              </div>

              {/* Control Tip 2 */}
              <div className="flex items-center gap-3 bg-gray-50 p-4">
                <div className="bg-primary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Zoom In/Out</h3>
                  <p className="text-sm text-gray-600">See fine details</p>
                </div>
              </div>

              {/* Control Tip 3 */}
              <div className="flex items-center gap-3 bg-gray-50 p-4">
                <div className="bg-primary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Floor Plan</h3>
                  <p className="text-sm text-gray-600">View layout map</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3D Tour Iframe Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative mx-auto max-w-7xl"
          >
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-gray-100">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="bg-primary mx-auto mb-4 h-12 w-12 rounded-full border-4 border-t-transparent"
                  />
                  <p className="font-secondary text-gray-600">
                    Loading Virtual Tour...
                  </p>
                </div>
              </div>
            )}

            {/* Main Tour Container */}
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              {/* Decorative Border */}
              <div className="absolute inset-0 z-0 rounded-lg bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-1">
                <div className="h-full w-full rounded-lg bg-white" />
              </div>

              {/* Iframe */}
              <div className="relative z-10 aspect-[16/10] w-full overflow-hidden rounded-lg bg-gray-900">
                <iframe
                  src="https://my.matterport.com/show/?m=3hYUN9sWNUa"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  allow="xr-spatial-tracking"
                  onLoad={() => setIsLoading(false)}
                  className="h-full w-full"
                  title="48 Wall Street Virtual Tour"
                />
              </div>
            </div>

            {/* Tour Features */}
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="border border-gray-200 bg-white p-4 text-center">
                <div className="text-primary mb-2 text-2xl font-bold">360°</div>
                <div className="text-sm text-gray-600">Panoramic Views</div>
              </div>
              <div className="border border-gray-200 bg-white p-4 text-center">
                <div className="text-primary mb-2 text-2xl font-bold">4K</div>
                <div className="text-sm text-gray-600">Ultra HD Quality</div>
              </div>
              <div className="border border-gray-200 bg-white p-4 text-center">
                <div className="text-primary mb-2 text-2xl font-bold">VR</div>
                <div className="text-sm text-gray-600">Ready Experience</div>
              </div>
              <div className="border border-gray-200 bg-white p-4 text-center">
                <div className="text-primary mb-2 text-2xl font-bold">24/7</div>
                <div className="text-sm text-gray-600">Available Anytime</div>
              </div>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-12 max-w-3xl text-center"
          >
            <p className="font-secondary text-gray-600">
              Best viewed on desktop or tablet for the full experience.
              <br className="hidden md:inline" />
              Mobile VR mode available for compatible devices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gray-50 py-12 md:py-20">
        <div className="relative container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-primary text-primary mb-4 text-3xl uppercase md:text-4xl lg:text-5xl">
                Ready to See It in Person?
              </h2>

              <p className="text-lead mb-8 max-w-2xl">
                The virtual tour is just the beginning. Schedule a private
                walkthrough and experience the elegance of 48 Wall Street
                firsthand.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/about/digital-brochure">
                  <CustomButton variant="primary">View Brochure</CustomButton>
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="font-medium">
                    48 Wall Street, New York, NY
                  </span>
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
