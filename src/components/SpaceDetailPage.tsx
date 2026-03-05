'use client';

import Link from 'next/link';
import CustomButton from '@/components/CustomButton';

export interface SpaceStats {
  capacity: string;
  sqft: string;
}

export interface SpaceDetailProps {
  levelLabel: string;
  title: string;
  subtitle: string;
  description: string;
  images: string[];
  videoUrl: string;
  floorPlanImage: string;
  features: string[];
  stats: SpaceStats;
  enquireHref?: string;
}

export default function SpaceDetailPage({
  levelLabel,
  title,
  subtitle,
  description,
  images,
  videoUrl,
  floorPlanImage,
  features,
  stats,
  enquireHref = '/contact',
}: SpaceDetailProps) {
  const [heroImage, ...galleryImages] = images;

  return (
    <main className="bg-white">
      <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
        <img
          src={heroImage}
          alt={`${title} ${subtitle}`}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />

        <div className="absolute top-8 left-8 md:left-16">
          <span className="font-secondary border border-white/40 px-3 py-1 text-[10px] tracking-[0.3em] text-white/70 uppercase">
            Level {levelLabel}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 px-8 pb-16 md:px-16">
          <h1 className="font-primary text-5xl leading-none font-light tracking-wide text-white md:text-7xl">
            {title}
          </h1>
          <h1 className="font-primary text-5xl leading-none font-bold tracking-wide text-white uppercase md:text-7xl">
            {subtitle}
          </h1>

          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="h-px w-6 bg-white/50" />
              <span className="font-secondary text-xs tracking-[0.15em] text-white/80 uppercase">
                {stats.capacity}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-px w-6 bg-white/50" />
              <span className="font-secondary text-xs tracking-[0.15em] text-white/80 uppercase">
                {stats.sqft}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
            <div className="lg:sticky lg:top-32">
              <p className="font-secondary text-primary mb-4 text-sm tracking-[0.3em] uppercase">
                The Space
              </p>
              <p className="font-secondary text-dark-black/80 text-base leading-relaxed md:text-lg">
                {description}
              </p>

              <div className="mt-10">
                <Link href={enquireHref}>
                  <CustomButton variant="primary">Enquire Now</CustomButton>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {galleryImages.map((src, i) => (
                <div
                  key={i}
                  className={`overflow-hidden ${i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}
                >
                  <img
                    src={src}
                    alt={`${title} view ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <div className="h-px w-full bg-black/10" />
      </div>

      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="font-secondary text-primary mb-4 text-sm tracking-[0.3em] uppercase">
              Take a Tour
            </p>
            <h2 className="heading-hero">Virtual Walkthrough</h2>
          </div>

          <div className="relative aspect-video w-full overflow-hidden bg-black">
            <iframe
              src={videoUrl}
              title={`${title} ${subtitle} virtual tour`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <div className="h-px w-full bg-black/10" />
      </div>

      <section className="bg-whitesmoke px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="font-secondary text-primary mb-4 text-sm tracking-[0.3em] uppercase">
              Layout
            </p>
            <h2 className="heading-hero">Floor Plan</h2>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden border border-black/10 bg-white p-4 shadow-sm">
            <img
              src={floorPlanImage}
              alt={`${title} ${subtitle} floor plan`}
              className="h-auto w-full object-contain"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div>
              <p className="font-secondary text-primary mb-4 text-sm tracking-[0.3em] uppercase">
                Highlights
              </p>
              <h2 className="heading-hero mb-10">Key Features</h2>

              <ul className="space-y-4">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="font-secondary text-primary mt-0.5 w-6 shrink-0 text-xs tracking-widest">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex flex-1 items-center gap-4">
                      <div className="h-px flex-1 bg-black/10" />
                      <span className="font-secondary text-dark-black text-sm font-medium tracking-wide uppercase">
                        {feature}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-start lg:justify-end">
              <div className="bg-whitesmoke w-full max-w-sm border border-black/10 p-10">
                <p className="font-secondary text-primary mb-8 text-sm tracking-[0.3em] uppercase">
                  At a Glance
                </p>

                <div className="space-y-8">
                  <div>
                    <p className="font-secondary mb-1 text-[10px] tracking-[0.25em] text-black/40 uppercase">
                      Capacity
                    </p>
                    <p className="font-primary text-dark-black text-xl font-light">
                      {stats.capacity}
                    </p>
                  </div>

                  <div className="h-px bg-black/10" />

                  <div>
                    <p className="font-secondary mb-1 text-[10px] tracking-[0.25em] text-black/40 uppercase">
                      Total Space
                    </p>
                    <p className="font-primary text-dark-black text-xl font-light">
                      {stats.sqft}
                    </p>
                  </div>

                  <div className="h-px bg-black/10" />

                  <Link href={enquireHref} className="block">
                    <CustomButton variant="primary" className="w-full">
                      Request a Proposal
                    </CustomButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
