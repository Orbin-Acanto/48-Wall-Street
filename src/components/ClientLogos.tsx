'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface ClientLogo {
  src: string;
  name: string;
}

interface ClientLogosProps {
  logos: ClientLogo[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

function LogoCard({ logo }: { logo: ClientLogo }) {
  return (
    <div className="group flex h-24 w-40 flex-shrink-0 items-center justify-center px-6 md:h-28 md:w-52 md:px-8">
      <img
        src={logo.src}
        alt={logo.name}
        title={logo.name}
        loading="lazy"
        draggable={false}
        className="max-h-14 w-auto max-w-full object-contain opacity-60 grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 md:max-h-16"
      />
    </div>
  );
}

function MarqueeRow({
  logos,
  reverse = false,
  duration = 45,
}: {
  logos: ClientLogo[];
  reverse?: boolean;
  duration?: number;
}) {
  // Duplicate the row so translateX(-50%) loops seamlessly.
  const track = [...logos, ...logos];
  return (
    <div className="logo-marquee overflow-hidden">
      <div
        className={`logo-marquee-track flex ${reverse ? 'is-reverse' : ''}`}
        style={{ '--marquee-duration': `${duration}s` } as React.CSSProperties}
      >
        {track.map((logo, i) => (
          <div key={`${logo.src}-${i}`} className="flex items-center">
            <LogoCard logo={logo} />
            <span className="bg-primary/25 h-10 w-px flex-shrink-0" aria-hidden />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClientLogos({
  logos,
  eyebrow = 'Our Clients',
  title = 'Trusted by the best',
  subtitle = 'Leading organizations choose 48 Wall Street for their most important events.',
}: ClientLogosProps) {
  if (!logos || logos.length === 0) return null;

  const mid = Math.ceil(logos.length / 2);
  const rowOne = logos.slice(0, mid);
  const rowTwo = logos.length > 6 ? logos.slice(mid) : logos;

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-24">
      {/* Soft gold ambience */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-40 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(210,179,113,0.12),transparent)]" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl px-6 text-center"
        >
          {eyebrow && (
            <p className="font-secondary text-primary mb-4 text-xs font-semibold tracking-[0.3em] uppercase md:text-sm">
              {eyebrow}
            </p>
          )}
          <h2 className="heading-hero text-primary mb-0">{title}</h2>
          <span className="bg-primary mx-auto mt-6 mb-6 block h-px w-16" />
          {subtitle && <p className="text-lead">{subtitle}</p>}
        </motion.div>

        {/* Marquee rows with edge fade */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-col gap-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:gap-6"
        >
          <MarqueeRow logos={rowOne} duration={48} />
          {logos.length > 6 && (
            <MarqueeRow logos={rowTwo} reverse duration={56} />
          )}
        </motion.div>
      </div>
    </section>
  );
}
