'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ServiceSection {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  link?: {
    text: string;
    url: string;
  };
}

interface ServicesShowcaseProps {
  title: string;
  subtitle: string;
  heroImage: string;
  leadDescription: string;
  sections: ServiceSection[];
  logoImage?: string;
  logoLink?: string;
  videoSection?: {
    title: string;
    embedUrl: string;
    thumbnail: string;
  };
}

export default function ServicesShowcase({
  title,
  subtitle,
  heroImage,
  leadDescription,
  sections,
  logoImage,
  logoLink,
  videoSection,
}: ServicesShowcaseProps) {
  const [selectedVideo, setSelectedVideo] = React.useState(false);

  return (
    <div className="bg-whitesmoke min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden md:h-[600px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${heroImage}')`,
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

        {/* Content */}
        <div className="relative flex h-full items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-primary text-whitesmoke mb-4 text-4xl tracking-wider uppercase md:text-5xl lg:text-6xl">
                {title}
              </h1>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '150px' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-primary mx-auto mb-6 h-1"
              />

              <p className="font-secondary mx-auto max-w-2xl text-lg text-white/90 md:text-xl">
                {subtitle}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lead Description */}
      <section className="border-b-4 border-gray-900 bg-white py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-5xl"
          >
            <p className="font-secondary text-lg leading-relaxed text-gray-700 md:text-xl">
              {leadDescription}
            </p>

            {/* Logo if provided */}
            {logoImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-12 flex justify-center"
              >
                {logoLink ? (
                  <a href={logoLink} target="_blank" rel="noopener noreferrer">
                    <img
                      src={logoImage}
                      alt="Partner Logo"
                      className="h-20 w-auto transition hover:scale-105 md:h-24"
                    />
                  </a>
                ) : (
                  <img
                    src={logoImage}
                    alt="Partner Logo"
                    className="h-20 w-auto md:h-24"
                  />
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Service Sections */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="space-y-16 md:space-y-24">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image */}
                <div className="lg:w-1/2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="group relative aspect-video overflow-hidden border-4 border-gray-900 shadow-xl"
                  >
                    <img
                      src={section.image}
                      alt={section.imageAlt}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center lg:w-1/2">
                  <h2 className="font-primary text-primary mb-4 text-2xl font-bold tracking-wider uppercase md:text-3xl lg:text-4xl">
                    {section.title}
                  </h2>
                  <p className="font-secondary mb-6 text-base leading-relaxed text-gray-700 md:text-lg">
                    {section.description}
                  </p>

                  {section.link && (
                    <div>
                      <motion.a
                        href={section.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="border-primary text-primary hover:bg-primary group inline-flex items-center gap-2 border-2 px-6 py-3 font-bold tracking-wider uppercase transition hover:text-white"
                      >
                        <span>{section.link.text}</span>
                        <svg
                          className="h-5 w-5 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </motion.a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Video Section */}
          {videoSection && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-24"
            >
              <h2 className="font-primary text-primary mb-8 text-center text-2xl font-bold tracking-wider uppercase md:text-3xl lg:text-4xl">
                {videoSection.title}
              </h2>

              <div
                className="group relative mx-auto aspect-video max-w-4xl cursor-pointer overflow-hidden border-4 border-gray-900 bg-gray-200 shadow-xl"
                onClick={() => setSelectedVideo(true)}
              >
                <img
                  src={videoSection.thumbnail}
                  alt="Video thumbnail"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition group-hover:bg-black/60">
                  <div className="border-primary bg-primary flex h-20 w-20 items-center justify-center border-4 transition group-hover:scale-110">
                    <svg
                      className="ml-1 h-10 w-10 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Video Modal */}
              {selectedVideo && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                  onClick={() => setSelectedVideo(false)}
                >
                  <motion.button
                    onClick={() => setSelectedVideo(false)}
                    className="absolute top-6 right-6 text-white transition hover:text-gray-300"
                    whileHover={{ rotate: 90 }}
                  >
                    <svg
                      className="h-10 w-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>

                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="aspect-video w-full max-w-5xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <iframe
                      src={videoSection.embedUrl}
                      className="h-full w-full border-4 border-white"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t-4 border-gray-900 bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-primary mb-4 text-3xl font-bold tracking-wider text-white uppercase md:text-4xl">
              Ready to Plan Your Event?
            </h2>
            <p className="font-secondary mb-8 text-lg text-white/90">
              Let our expert team bring your vision to life
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="border-primary bg-primary hover:bg-primary/90 border-2 px-10 py-4 text-lg font-bold tracking-wider text-white uppercase shadow-xl transition"
            >
              Contact Us Today
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
