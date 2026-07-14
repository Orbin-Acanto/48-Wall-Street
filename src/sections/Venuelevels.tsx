'use client';

import Link from 'next/link';
import CustomButton from '@/components/CustomButton';

const levels = [
  {
    id: 'mezzanine',
    label: 'Level 01',
    title: 'Grand Mezzanine Hall',
    subtitle: '',
    description:
      "This space has retained much of its original 1920's architectural detail, from the 30-foot ceilings to its beautiful Palladian windows. The Banking Hall can accommodate a variety of events.",
    href: '/spaces/grand-mezzanine',
    image: '/venue/Grand Mezzanine Hall.jpg',
    cta: 'Explore Space',
  },
  {
    id: 'concourse',
    label: 'Level 02',
    title: 'Concourse Level',
    subtitle: '',
    description:
      'Situated on the lower level, the concourse is designed to hold meetings, breakouts, classes, and events.',
    href: '/spaces/concourse-level',
    image: '/venue/Hero Concourse Level 2.png',
    cta: 'Explore Space',
  },
];

export default function VenueLevels() {
  return (
    <section className="bg-gray-100 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="font-secondary text-primary mb-4 text-sm tracking-[0.3em] uppercase">
            Our Spaces
          </p>
          <h2 className="heading-hero">Explore the Venue</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {levels.map((level) => (
            <Link
              key={level.id}
              href={level.href}
              className="group relative block overflow-hidden"
              style={{ aspectRatio: '4 / 4' }}
            >
              <img
                src={level.image}
                alt={`${level.title} ${level.subtitle}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/0 transition-opacity duration-500 group-hover:opacity-90" />

              <div className="absolute top-6 left-6">
                <span className="font-secondary border border-white/40 px-3 py-1 text-[10px] tracking-[0.25em] text-white/70 uppercase">
                  {level.label}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="font-primary mb-1 text-3xl leading-none font-light tracking-wide text-white md:text-4xl">
                  {level.title}
                </h3>
                <h3 className="font-primary mb-5 text-3xl leading-none font-bold tracking-wide text-white uppercase md:text-4xl">
                  {level.subtitle}
                </h3>

                <div className="mb-5 h-px w-12 bg-white/40 transition-all duration-500 group-hover:w-20 group-hover:bg-white/80" />

                <p className="font-secondary max-h-0 overflow-hidden text-sm leading-relaxed text-white/80 opacity-0 transition-all duration-500 ease-out group-hover:max-h-24 group-hover:opacity-100">
                  {level.description}
                </p>

                <div className="mt-5 flex items-center gap-2 transition-all duration-300 group-hover:gap-3">
                  <span className="font-secondary text-xs tracking-[0.2em] text-white uppercase">
                    {level.cta}
                  </span>
                  <svg
                    className="h-3 w-3 text-white transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
