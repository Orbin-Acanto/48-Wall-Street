'use client';

import CustomButton from '@/components/CustomButton';
import { amenities } from '@/data';
import Image from 'next/image';
import Link from 'next/link';

export default function VenueAmenities() {
  return (
    <section className="bg-whitesmoke px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="font-secondary text-primary mb-4 text-sm tracking-[0.3em] uppercase">
            Space & Amenities
          </p>
          <h2 className="font-primary text-dark-black text-4xl tracking-wide md:text-5xl lg:text-6xl">
            ABOUT THE VENUE
          </h2>
        </div>

        {/* Amenities Grid */}
        <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="mb-4 flex h-20 w-20 items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={amenity.icon}
                  alt={amenity.title}
                  width={64}
                  height={64}
                  className="h-16 w-16 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="font-secondary text-primary mb-2 text-sm font-bold tracking-wide uppercase">
                {amenity.title}
              </h3>

              {/* Description */}
              <p className="font-secondary text-dark-black/80 text-xs leading-relaxed">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>

        {/* Description Text */}
        <div className="mx-auto max-w-5xl space-y-6 text-center">
          <p className="font-secondary text-dark-black/80 text-sm leading-relaxed md:text-base">
            Recent renovations have elevated 48 Wall Street to new heights,
            doubling its size and opening new, breathtaking views. Upgraded with
            state-of-the-art features, the renovations include a meticulously
            crafted wrap-around quartz bar spanning over 60 feet, an extended
            dance floor that measures 2,000 square feet, and newly installed
            custom Italian drop lights.
          </p>

          <p className="font-secondary text-dark-black/80 text-sm leading-relaxed md:text-base">
            <span className="text-dark-black font-bold">48 Wall Street</span>{' '}
            offers a dual event space with rooftop access and an interior venue
            that both showcase phenomenal panoramic views of the cityscape and
            riverside views. Discover limitless potential and witness your
            vision unfold into reality with our exceptional team and versatile
            event spaces.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/contact">
            <CustomButton variant="primary">Request Virtual Tour</CustomButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
