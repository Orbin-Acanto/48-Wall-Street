'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowUpRight, MapPin } from 'lucide-react';
import { vendorsData } from '@/data';
import CustomButton from '@/components/CustomButton';

const { hero, intro, vendors, closing } = vendorsData;

export default function VendorsPage() {
  return (
    <div className="bg-whitesmoke min-h-screen">
      {/* HERO */}
      <section className="relative mt-16 flex h-[70vh] items-center overflow-hidden sm:mt-6">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero.image})` }}
        />
        <div className="from-dark-black/80 via-dark-black/75 to-dark-black/90 absolute inset-0 bg-gradient-to-b" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-primary mb-4 flex items-center justify-center gap-2">
              <MapPin className="h-5 w-5" />
              <span className="font-secondary text-sm tracking-widest uppercase">
                {hero.eyebrow}
              </span>
            </div>
            <h1 className="heading-hero mb-6 text-white">{hero.title}</h1>
            <div className="bg-primary mx-auto h-[2px] w-44" />
          </motion.div>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 py-16 text-center md:px-12 md:py-24 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl"
        >
          {intro.map((p, i) => (
            <p key={i} className="text-lead mb-5 last:mb-0">
              {p}
            </p>
          ))}
        </motion.div>
      </section>

      {/* VENDORS */}
      {vendors.map((vendor, idx) => (
        <section
          key={vendor.id}
          id={vendor.id}
          className={`px-6 py-16 md:px-12 md:py-20 lg:px-20 ${
            idx % 2 === 0 ? 'bg-white' : 'bg-whitesmoke'
          }`}
        >
          <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-5 lg:gap-16">
            {/* Logo panel */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`lg:col-span-2 lg:sticky lg:top-28 ${
                idx % 2 === 1 ? 'lg:order-last' : ''
              }`}
            >
              <VendorLogo vendor={vendor} />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <h2 className="font-primary text-primary mb-2 text-[2rem] leading-tight uppercase md:text-[2.6rem]">
                {vendor.name}
              </h2>
              <p className="font-secondary mb-6 text-sm tracking-[0.15em] text-gray-400 uppercase">
                {vendor.tagline}
              </p>

              {vendor.description.map((p, i) => (
                <p key={i} className="text-lead mx-0 mb-4 text-gray-600">
                  {p}
                </p>
              ))}

              <h3 className="font-secondary text-dark-black mt-8 mb-4 text-lg font-bold">
                {vendor.servicesLabel}
              </h3>
              <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {vendor.services.map((service) => (
                  <div key={service} className="flex items-start gap-3">
                    <CheckCircle className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span className="font-secondary text-sm text-gray-600">
                      {service}
                    </span>
                  </div>
                ))}
              </div>

              {vendor.href && (
                <a
                  href={vendor.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-secondary group mt-8 inline-flex items-center gap-2 text-sm font-medium tracking-wider uppercase transition-opacity hover:opacity-80"
                >
                  Visit Website
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </motion.div>
          </div>
        </section>
      ))}

      {/* CLOSING CTA */}
      <section className="bg-dark-black px-6 py-20 text-center md:px-12 md:py-28 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl"
        >
          <h2 className="heading-hero text-primary mb-2">{closing.title}</h2>
          <div className="bg-primary mx-auto mb-8 h-[2px] w-24" />
          <p className="text-lead mb-10 text-gray-200">{closing.description}</p>
          <Link href="/contact">
            <CustomButton>Book a Consultation</CustomButton>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

function VendorLogo({
  vendor,
}: {
  vendor: (typeof vendors)[number];
}) {
  const darkBg = 'darkLogoBg' in vendor && vendor.darkLogoBg;
  const inner = (
    <div
      className={`flex h-44 items-center justify-center rounded-xl border p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow duration-300 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.10)] md:h-56 ${
        darkBg ? 'bg-dark-black border-white/10' : 'border-black/[0.06] bg-white'
      }`}
    >
      <div className="relative h-full w-full">
        <Image
          src={vendor.logo}
          alt={`${vendor.name} logo`}
          fill
          sizes="(max-width: 1024px) 90vw, 40vw"
          className="object-contain"
        />
      </div>
    </div>
  );

  if (!vendor.href) return <div className="group">{inner}</div>;

  return (
    <a
      href={vendor.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      aria-label={`Visit ${vendor.name} website`}
    >
      {inner}
    </a>
  );
}
