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
          <div className="mx-auto max-w-5xl space-y-6">
            <p className="text-lead">
              At 48 Wall Street, our dedicated leadership team ensures that every
              event receives personalized attention, strategic planning, and
              seamless execution from start to finish.
            </p>
            <p className="text-lead">
              Owner Michael Tardi oversees the vision and stewardship of the
              venue, balancing its rich historic legacy with the modern
              amenities and capabilities required for today&rsquo;s events.
              Director of Sales Lauren Leuci collaborates closely with clients
              and planners to understand event objectives, develop customized
              layouts, and coordinate proposals and timelines tailored to each
              occasion. Director of Operations Andrew Heaton leads on-site
              logistics, vendor management, and event-day operations, ensuring
              that every detail is executed with precision and professionalism.
            </p>
            <p className="text-lead">
              Together, this experienced team provides a trusted foundation for
              corporate events, social celebrations, nonprofit galas, and
              weddings at one of the most distinguished event venues in New York
              City&rsquo;s Financial District (FiDi).
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
