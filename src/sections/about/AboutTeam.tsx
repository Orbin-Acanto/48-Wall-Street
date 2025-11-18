'use client';

import { teamMembers } from '@/data';
import Image from 'next/image';

export default function AboutTeam() {
  return (
    <section className="bg-whitesmoke px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="font-secondary text-primary mb-4 text-sm tracking-[0.3em] uppercase">
            Get to Know Us
          </p>
          <h2 className="heading-hero">MEET OUR TEAM</h2>
          <div className="mx-auto max-w-5xl">
            <p className="text-lead">
              At 48 Wall Street, a dedicated leadership team ensures that every
              event receives personal attention and professional guidance from
              start to finish. Owner Micheal Tardi oversees the overall vision
              of the venue and is committed to maintaining both its historic
              character and its modern event capabilities. Director of Sales
              Lauren Leuci partners with planners and clients to understand
              goals, design layouts, and coordinate proposals and timelines that
              match each program. Director of Operations Andrew Heaton manages
              on site logistics, vendor coordination, and event day execution so
              that service, flow, and technical details run smoothly. Together,
              this experienced team provides a trusted foundation for corporate
              events, social celebrations, and weddings in the heart of New York
              City.
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
