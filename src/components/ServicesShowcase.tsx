'use client';
import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Image from 'next/image';

type ServiceSection = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  link?: { text: string; url: string };
};

type Props = {
  title: string;
  subtitle: string;
  heroImage: string;
  leadDescription: string;
  sections: ServiceSection[];
  logoImage?: string;
  logoLink?: string;
  videoSection?: { title: string; embedUrl: string; thumbnail: string };
};

export default function CinematicServicesShowcase({
  title,
  subtitle,
  heroImage,
  leadDescription,
  sections,
  logoImage,
  logoLink,
  videoSection,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroBgRef = useRef<HTMLDivElement | null>(null);
  const { scrollY } = useScroll({
    container: typeof window === 'undefined' ? undefined : undefined,
  });

  const yHero = useTransform(scrollY, [0, 600], [0, -120]);
  const scaleHero = useTransform(scrollY, [0, 600], [1.05, 1]);

  const splitWords = (text: string) =>
    text.split(' ').map((w, i) => ({ word: w, i }));

  // Variants
  const wordVariant: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1], duration: 0.6 },
    }),
  };

  const panelVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] },
    },
  };

  const [videoOpen, setVideoOpen] = React.useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = videoOpen ? 'hidden' : '';
    }
    return () => {
      if (typeof window !== 'undefined') document.body.style.overflow = '';
    };
  }, [videoOpen]);

  return (
    <div
      ref={containerRef}
      className="font-primary bg-whitesmoke w-full text-gray-700"
    >
      {/* HERO */}
      <section
        aria-label="Hero"
        className="relative flex h-screen max-h-[1100px] w-full items-center overflow-hidden"
      >
        {/* Background image (no parallax) */}
        <div className="absolute inset-0 will-change-transform">
          <Image
            src={heroImage}
            alt={title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Cinematic overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,0.22) 0%, rgba(10,10,10,0.4) 45%, rgba(10,10,10,0.6) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-20">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div initial="hidden" animate="show">
              <h1 className="font-primary text-[clamp(2.4rem,6vw,4.8rem)] leading-relaxed tracking-wider text-white md:leading-tight">
                <motion.span
                  className="inline-flex flex-wrap justify-center gap-3"
                  initial="hidden"
                  animate="show"
                >
                  {splitWords(title).map((w, idx) => (
                    <motion.span
                      key={`${w.word}-${idx}`}
                      custom={idx}
                      variants={wordVariant}
                      className="inline-block whitespace-nowrap"
                      style={{ display: 'inline-block' }}
                    >
                      <span style={{ paddingRight: 8 }}>{w.word}</span>
                    </motion.span>
                  ))}
                </motion.span>
              </h1>

              <div className="mb-6 flex justify-center">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 120 }}
                  transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
                  className="bg-primary h-[2px] rounded-full"
                />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="font-secondary mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white md:text-xl"
              >
                {subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mt-10 flex justify-center gap-4"
              >
                <a
                  href="#services"
                  className="bg-primary hover:bg-primary/80 inline-flex cursor-pointer items-center gap-3 px-6 py-3 text-base text-white shadow-sm"
                >
                  Explore Services
                </a>
                <button
                  onClick={() => videoSection && setVideoOpen(true)}
                  className="border-dark-black/30 bg-dark-black hover:bg-dark-black/70 inline-flex cursor-pointer items-center gap-3 border-1 px-6 py-3 text-base text-white"
                >
                  Watch Film
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* REFINED 2ND SECTION */}
      <section
        id="lead"
        className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100 py-24 lg:py-32"
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at center, rgba(210,179,113,0.08) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="mx-auto max-w-4xl"
          >
            <h2
              className="font-primary mb-6 text-3xl text-gray-900 md:text-4xl"
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              Our Philosophy
            </h2>

            <p
              className="font-secondary text-lg leading-relaxed text-gray-700 md:text-xl"
              style={{ fontFamily: 'var(--font-secondary)' }}
            >
              {leadDescription}
            </p>

            {logoImage && (
              <div className="mt-14 flex items-center justify-center">
                {logoLink ? (
                  <a
                    href={logoLink}
                    rel="noreferrer"
                    target="_blank"
                    className="inline-block"
                  >
                    <Image
                      src={logoImage}
                      alt="Partner logo"
                      width={220}
                      height={80}
                      className="object-contain opacity-90 transition-opacity duration-300 hover:opacity-100"
                    />
                  </a>
                ) : (
                  <Image
                    src={logoImage}
                    alt="Partner logo"
                    width={220}
                    height={80}
                    className="object-contain opacity-90 transition-opacity duration-300 hover:opacity-100"
                  />
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <main id="services" className="relative">
        {sections.map((section, idx) => {
          const ref = React.createRef<HTMLDivElement>();
          return (
            <section
              key={section.id}
              className="relative flex items-center py-12"
              aria-labelledby={`panel-${section.id}`}
            >
              {/* background image layer */}
              <div className="absolute inset-0 -z-20 overflow-hidden">
                <div className="absolute inset-0">
                  <Image
                    src={section.image}
                    alt={section.imageAlt}
                    fill
                    className="scale-105 object-cover object-center transition-transform duration-800"
                    sizes="100vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(10,10,10,0.28) 0%, rgba(10,10,10,0.42) 50%, rgba(10,10,10,0.6) 100%)',
                      mixBlendMode: 'multiply',
                    }}
                  />
                </div>

                {/* subtle vignette and ambient gold feather */}
                <div className="pointer-events-none absolute inset-0">
                  <div
                    style={{
                      position: 'absolute',
                      right: '-20%',
                      top: '10%',
                      width: '40%',
                      height: '60%',
                      background:
                        'radial-gradient(closest-side, rgba(210,179,113,0.12), transparent)',
                      filter: 'blur(40px)',
                      transform: 'rotate(-12deg)',
                    }}
                  />
                </div>
              </div>

              {/* content */}
              <div className="relative z-10 container mx-auto px-6 lg:px-20">
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                  {/* left copy */}
                  <motion.div
                    ref={ref}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.35 }}
                    variants={panelVariants}
                    className="max-w-2xl"
                  >
                    <h3
                      id={`panel-${section.id}`}
                      className="font-primary mb-4 text-[2rem] leading-tight md:text-[2.6rem]"
                      style={{
                        color: 'var(--color-gray-900)',
                        fontFamily: 'var(--font-primary)',
                      }}
                    >
                      {section.title}
                    </h3>

                    <p
                      className="font-secondary mb-6 text-[1.05rem] leading-relaxed text-gray-700 md:text-lg"
                      style={{ fontFamily: 'var(--font-secondary)' }}
                    >
                      {section.description}
                    </p>

                    <div className="text-primary font-secondary flex items-center">
                      <button
                        onClick={() => {
                          const next =
                            document.querySelectorAll('section')[idx + 3];
                          if (next)
                            (next as HTMLElement).scrollIntoView({
                              behavior: 'smooth',
                            });
                        }}
                        className="text-primary text-sm font-medium underline underline-offset-4"
                        aria-label={`Scroll to next section after ${section.title}`}
                      >
                        Explore next
                      </button>
                    </div>
                  </motion.div>

                  {/* right visual card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 24 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.8 }}
                    className="relative overflow-hidden shadow-2xl shadow-black/20"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
                    }}
                  >
                    <div className="relative h-72 md:h-96">
                      <Image
                        src={section.image}
                        alt={section.imageAlt}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width:1024px)100vw,50vw"
                      />

                      {/* soft glass overlay */}
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(255,255,255,0.02), transparent)',
                          mixBlendMode: 'overlay',
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          );
        })}
      </main>

      {/* VIDEO SECTION CTA (if provided) */}
      {videoSection && (
        <section className="bg-[linear-gradient(180deg,#fff,#f7f6f4)] py-20 lg:py-28">
          <div className="container mx-auto px-6 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="mx-auto max-w-4xl text-center"
            >
              <h4
                className="font-primary mb-6 text-3xl"
                style={{ color: 'var(--color-gray-900)' }}
              >
                {videoSection.title}
              </h4>

              <div
                className="relative mx-auto aspect-video max-w-4xl cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setVideoOpen(true)}
              >
                <Image
                  src={videoSection.thumbnail}
                  alt="video"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: 9999,
                      border: '4px solid rgba(210,179,113,0.16)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <svg
                      className="h-8 w-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Video Modal */}
          {videoOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
              onClick={() => setVideoOpen(false)}
            >
              <div
                className="relative aspect-video w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <iframe
                  src={videoSection.embedUrl}
                  title="Video"
                  className="h-full w-full rounded-xl border border-white/10"
                  allowFullScreen
                />
                <button
                  onClick={() => setVideoOpen(false)}
                  aria-label="Close video"
                  className="absolute top-4 right-4 text-2xl text-white"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </section>
      )}

      {/* CTA FOOTER */}
      <footer className="bg-[var(--color-gray-900)] py-20 text-white">
        <div className="container mx-auto px-6 text-center lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <h3 className="font-primary mb-4 text-3xl">
              Ready to Plan Your Event?
            </h3>
            <p className="mx-auto mb-8 max-w-2xl text-white/90">
              Let our expert team bring your vision to life — from design to
              production to unforgettable moments.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 font-semibold text-white"
              style={{
                background:
                  'linear-gradient(90deg, var(--color-primary), rgba(210,179,113,0.85))',
              }}
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
