'use client';

import { teamMembers } from '@/data';
import Image from 'next/image';

export default function AboutTeam() {
  return (
    <section className="bg-whitesmoke px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="font-secondary text-primary text-md mb-4 tracking-[0.3em] uppercase">
            Get to Know Us
          </p>
          <h2 className="font-primary text-dark-black mb-8 text-4xl tracking-wide md:text-5xl lg:text-6xl">
            MEET OUR TEAM
          </h2>
          <div className="mx-auto max-w-5xl">
            <p className="font-secondary text-dark-black/80 text-base leading-relaxed md:text-lg">
              Opened in 1999, 48 Wall Street has established itself as one of
              New York City's premier event venues. Renowned for outstanding
              culinary expertise, impeccable service, and warm hospitality, our
              commitment to delivering unparalleled experiences ensures that
              every event is truly unforgettable. With two distinct event
              spaces, 48 Wall Street offers a sophisticated and contemporary
              atmosphere complemented by stunning panoramic views of the
              cityscape and riverside views. Discover limitless potential and
              witness your vision unfold into reality with our exceptional team
              and versatile event spaces.
            </p>
          </div>
        </div>

        {/* Team Grid */}
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div key={index} className="group">
              {/* Image */}
              <div className="relative mx-auto mb-6 aspect-[3/4] overflow-hidden bg-gray-900">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="font-primary text-dark-black mb-2 text-2xl tracking-wide md:text-3xl">
                  {member.name}
                </h3>
                <p className="font-secondary text-dark-black/60 text-sm tracking-wider uppercase">
                  {member.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
