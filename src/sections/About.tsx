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
          <h2 className="heading-hero">THE HISTORIC VENUE LOCATION</h2>
          <p className="text-lead">
            With 1.3 million square feet of class-a offices space, this 72-story
            landmark address features floorplans ranging from 6,000 square feet
            to 38,000 square feet with the incredible views and world-class
            management team.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Top Image */}
            <div className="group relative h-64 overflow-hidden shadow-xl md:h-80">
              <Image
                src="/about/aboutHero.TIF"
                alt="48 Wall Street Venue"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Bottom Row - Two Images */}
            <div className="grid grid-cols-2 gap-6">
              <div className="group relative h-64 overflow-hidden shadow-xl">
                <Image
                  src="/about/about (2).jpg"
                  alt="Elevators 48 Wall Street"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="group relative h-64 overflow-hidden shadow-xl">
                <Image
                  src="/about/about (4).jpg"
                  alt="Lounge Area"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Large Image */}
          <div className="group relative h-full min-h-[600px] overflow-hidden shadow-xl">
            <Image
              src="/about/about (3).jpg"
              alt="48 Wall Street Building Exterior"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
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
