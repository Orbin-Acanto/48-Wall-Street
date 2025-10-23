'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { menuPages } from '@/data';
import BookReader from './BookReader';
import { ServiceSection } from '@/types';
import ServiceSectionItem from './ServiceSectionItem';
import CustomButton from './CustomButton';
import Link from 'next/link';

type Props = {
  title: string;
  subtitle: string;
  heroImage: string;
  leadTitle: string;
  leadDescription: string;
  leadDescription2?: string;
  leadDescription3?: string;
  sections: ServiceSection[];
  logoImage?: string;
  logoLink?: string;
  videoSection?: { title: string; embedUrl: string; thumbnail: string };
  menu?: boolean;
};

export default function CinematicServicesShowcase({
  title,
  subtitle,
  heroImage,
  leadTitle,
  leadDescription,
  leadDescription2,
  leadDescription3,
  sections,
  logoImage,
  logoLink,
  videoSection,
  menu = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const splitWords = (text: string) =>
    text.split(' ').map((w, i) => ({ word: w, i }));

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

  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = videoOpen ? 'hidden' : '';
    }
    return () => {
      if (typeof window !== 'undefined') document.body.style.overflow = '';
    };
  }, [videoOpen]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.25;
    }
  }, []);

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
        <div className="absolute inset-0 overflow-hidden will-change-transform">
          <video
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out"
            autoPlay
            muted
            playsInline
            preload="auto"
            loop={false}
            onEnded={(e) => {
              const vid = e.currentTarget;
              vid.currentTime = 0;
              vid.play();
            }}
          >
            <source src={heroImage} type="video/mp4" />
          </video>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.6) 60%, rgba(10,10,10,0.9) 100%)',
            }}
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
              <h2 className="heading-hero text-white">
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
              </h2>

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
                className="textt-lead font-secondary text-white"
              >
                {subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="mt-10 flex justify-center gap-4"
              >
                <Link href="#services">
                  <CustomButton variant="primary">
                    Explore Services
                  </CustomButton>
                </Link>
                {videoSection && (
                  <button
                    onClick={() => videoSection && setVideoOpen(true)}
                    className="border-dark-black/30 bg-dark-black hover:bg-dark-black/70 inline-flex cursor-pointer items-center gap-3 border-1 px-6 py-3 text-base text-white"
                  >
                    Watch Story
                  </button>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2ND SECTION */}
      <section
        id="lead"
        className={`relative overflow-hidden ${menu ? 'bg-white' : 'bg-whitesmoke'} py-12 lg:py-20`}
      >
        <div className="relative z-10 container mx-auto px-6 text-center lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="mx-auto max-w-5xl"
          >
            <h2 className="font-primary text-primary mb-8 text-[3rem] leading-tight uppercase md:text-[3.6rem]">
              {leadTitle}
            </h2>
            <p className="text-lead text-gray-500">{leadDescription}</p>
            {leadDescription2 && (
              <p className="text-lead text-gray-500">{leadDescription2}</p>
            )}
            {leadDescription3 && (
              <p className="text-lead text-gray-500">{leadDescription3}</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* LOGO SECTION */}
      {logoImage && (
        <section className="relative overflow-hidden bg-white py-12">
          <div className="container mx-auto px-6 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="mx-auto max-w-4xl text-center"
            >
              {logoLink ? (
                <a href={logoLink} className="inline-block">
                  <Image
                    src={logoImage}
                    alt="Logo"
                    width={200}
                    height={100}
                    className="mx-auto"
                  />
                </a>
              ) : (
                <Image
                  src={logoImage}
                  alt="Logo"
                  width={200}
                  height={100}
                  className="mx-auto"
                />
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* MENU SECTION */}
      {menu && (
        <section>
          <BookReader
            pages={menuPages}
            title="Tardis Catering & Hospitality 2025"
            subtitle="Indulge in a Gourmet Dining Experience at Your Next Event"
            downloadUrl="/menu/48-wall-menu.2025_.pdf"
            pageColor="text-dark-black"
          />
        </section>
      )}

      {/* SERVICES SECTIONS */}
      <main id="services" className="relative">
        {sections.map((section, idx) => (
          <ServiceSectionItem
            key={section.id}
            section={section}
            idx={idx}
            panelVariants={panelVariants}
          />
        ))}
      </main>

      {/* VIDEO SECTION CTA (if provided) */}
      {videoSection && (
        <section className="bg-white py-12 lg:py-20">
          <div className="container mx-auto px-6 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="mx-auto max-w-4xl text-center"
            >
              <h4
                className="heading-hero"
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
            <h3 className="font-primary mb-4 text-3xl font-bold text-white uppercase md:text-4xl lg:text-5xl">
              Ready to Plan Your Event?
            </h3>
            <p className="text-lead mb-8 max-w-2xl text-gray-200">
              Let our expert team bring your vision to life — from design to
              production to unforgettable moments.
            </p>

            <Link href="/contact">
              <CustomButton>Contact US</CustomButton>
            </Link>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
