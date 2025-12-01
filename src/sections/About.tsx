'use client';

import CustomButton from '@/components/CustomButton';
import Image from 'next/image';
import Link from 'next/link';

export default function About() {
  return (
    <section className="bg-white px-6 pt-20 pb-18">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="font-primary text-primary mb-6 text-3xl tracking-[0.3em] uppercase">
            Welcome to 48 Wall Street
          </p>
          <div className="bg-primary mx-auto mb-8 h-px w-16"></div>
          <h1 className="heading-hero">HISTORIC Downtown VENUE</h1>
          <p className="text-lead">
            Located in the heart of the Financial District, 48 Wall Street is a
            restored historic landmark that now serves as a unique event space
            in Lower Manhattan. Elegant architecture, soaring ceilings, and
            flexible floor layouts provide a refined backdrop for corporate
            gatherings, weddings, and social celebrations of many sizes.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Top Image */}
            <div
              className="group relative h-64 overflow-hidden md:h-80"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
            >
              <Image
                src="/about/aboutHero-1.jpg"
                alt="48 Wall Street Venue"
                fill
                quality={100}
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                }}
              />
            </div>

            {/* Bottom Row - Two Images */}
            <div className="grid grid-cols-2 gap-6">
              <div
                className="group relative h-64 overflow-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }}
              >
                <Image
                  src="/about/about (3).jpg"
                  alt="Lounge Area"
                  fill
                  quality={100}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{
                    imageRendering: '-webkit-optimize-contrast',
                  }}
                />
              </div>
              <div
                className="group relative h-64 overflow-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }}
              >
                <Image
                  src="/about/about (2).jpg"
                  alt="Lounge Area"
                  fill
                  quality={100}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{
                    imageRendering: '-webkit-optimize-contrast',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Large Image */}
          <div
            className="group relative h-full overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }}
          >
            <Image
              src="/gallery/corporate/ (25).jpg"
              alt="48 Wall Street Building Exterior"
              fill
              quality={100}
              className="scale-105 object-cover transition-transform duration-500 group-hover:scale-115"
              style={{
                imageRendering: '-webkit-optimize-contrast',
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-18 flex items-center justify-center">
        <Link href="/about">
          <CustomButton variant="primary">learn More</CustomButton>
        </Link>
      </div>
    </section>
  );
}
