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
          <h2 className="heading-hero">ABOUT THE VENUE</h2>
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
              <p className="font-secondary text-dark-black/80 text-xs leading-relaxed capitalize">
                {amenity.description}
              </p>
            </div>
          ))}
        </div>

        {/* Description Text */}
        <div className="mx-auto max-w-5xl space-y-6 text-center">
          <p className="font-secondary text-dark-black/80 text-sm leading-relaxed md:text-base">
            Recent renovations at 48 Wall Street have refined the venue into an
            even more impressive destination for private and corporate events.
            The main level now features expanded entertaining areas, enhanced
            finishes, upgraded lighting, and improved technical infrastructure
            that bring modern comfort to a historic setting. Generous space for
            bar service, dining, and dancing allows the venue to support
            conferences, galas, fashion shows, weddings, and large scale
            celebrations with ease.
          </p>

          <p className="font-secondary text-dark-black/80 text-sm leading-relaxed md:text-base">
            <span className="text-dark-black font-bold">48 Wall Street</span>{' '}
            offers multiple event levels with both elegant interior rooms and
            access to sweeping views of the city skyline and nearby river. Host
            a welcome reception in a grand hall, move guests through dramatic
            stairways and mezzanine spaces, and incorporate rooftop access or
            partner spaces for outdoor experiences. With flexible floor plans, a
            responsive planning team, and versatile layouts, the venue provides
            the setting you need to turn any event concept into a memorable New
            York City experience.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/about/virtual-tour">
            <CustomButton variant="primary">Virtual Tour</CustomButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
