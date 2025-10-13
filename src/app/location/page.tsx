'use client';

import { useState } from 'react';
import {
  MapPin,
  Users,
  Sparkles,
  ArrowRight,
  Phone,
  Mail,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { locationAmenities, locations, venues } from '@/data';
import CustomButton from '@/components/CustomButton';

export default function LocationPage() {
  const [activeLocation, setActiveLocation] = useState(0);

  return (
    <div className="bg-whitesmoke min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&auto=format&fit=crop')",
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="from-dark-black/70 via-dark-black/50 to-dark-black/80 absolute inset-0 bg-gradient-to-b" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-whitesmoke font-primary mb-4 text-5xl tracking-wider md:text-7xl lg:text-8xl">
              OUR LOCATIONS
            </h1>
            <div className="bg-primary mx-auto mb-6 h-[2px] w-32" />
            <p className="font-secondary text-whitesmoke/90 mx-auto max-w-2xl text-lg md:text-xl">
              Discover exceptional venues across New York, thoughtfully curated
              for unforgettable events
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8"
          >
            <CustomButton className="group inline-flex items-center gap-2 px-8 py-4 text-sm tracking-wider uppercase transition-all">
              Explore Venues
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </CustomButton>
          </motion.div>
        </div>
      </section>

      {/* Event Types */}
      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-primary mb-12 text-center text-4xl tracking-wide uppercase md:text-5xl"
          >
            Venues for Every Occasion
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {venues.map((venue, index) => (
              <motion.div
                key={venue.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden bg-white p-8 shadow-lg transition-all hover:shadow-2xl"
              >
                <div className="bg-primary/10 mb-6 inline-flex rounded-full p-4">
                  <venue.icon className="text-primary h-8 w-8" />
                </div>
                <h3 className="font-secondary text-dark-black mb-3 text-xl font-bold">
                  {venue.title}
                </h3>
                <p className="font-secondary text-sm text-gray-600">
                  {venue.desc}
                </p>
                <div className="bg-primary/80 absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Locations */}
      <section id="locations" className="bg-white px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary/80 font-primary mb-16 text-center text-4xl tracking-wide uppercase md:text-5xl"
          >
            Featured Venues
          </motion.h2>

          {/* Location Tabs */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {locations.map((location, index) => (
              <CustomButton
                key={location.name}
                onClick={() => setActiveLocation(index)}
                className={`font-secondary border-none px-6 py-3 text-sm font-medium tracking-wider uppercase transition-all ${
                  activeLocation === index
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-whitesmoke hover:text-whitesmoke'
                }`}
              >
                {location.type}
              </CustomButton>
            ))}
          </div>

          {/* Location Details */}
          <motion.div
            key={activeLocation}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-8 lg:grid-cols-2"
          >
            {/* Image */}
            <div className="relative h-[400px] overflow-hidden rounded-3xl lg:h-[600px]">
              <img
                src={locations[activeLocation].image}
                alt={locations[activeLocation].name}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="from-dark-black/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
              <div className="absolute right-6 bottom-6 left-6">
                <span className="bg-primary font-secondary text-dark-black inline-block rounded-full px-4 py-2 text-xs font-bold tracking-wider uppercase">
                  {locations[activeLocation].type}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              <h3 className="text-dark-black font-primary mb-4 text-3xl tracking-wide md:text-4xl">
                {locations[activeLocation].name}
              </h3>

              <div className="mb-6 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="text-primary mt-1 h-5 w-5 flex-shrink-0" />
                  <p className="font-secondary text-gray-600">
                    {locations[activeLocation].address}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-primary h-5 w-5" />
                  <p className="font-secondary text-gray-600">
                    Capacity:{' '}
                    <span className="text-dark-black font-semibold">
                      {locations[activeLocation].capacity}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Sparkles className="text-primary h-5 w-5" />
                  <p className="font-secondary text-gray-600">
                    Space:{' '}
                    <span className="text-dark-black font-semibold">
                      {locations[activeLocation].sqft}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="font-secondary text-dark-black mb-4 text-lg font-bold">
                  Key Features
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {locations[activeLocation].features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle className="text-primary h-4 w-4" />
                      <span className="font-secondary text-sm text-gray-600">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="bg-primary font-secondary hover:text-whitesmoke cursor-pointer px-8 py-4 text-sm font-semibold tracking-wider text-white uppercase transition-all hover:shadow-xl">
                  Schedule Tour
                </button>
                <button className="font-secondary text-dark-black hover:bg-primary hover:text-whitesmoke cursor-pointer border-2 border-none px-8 py-4 text-sm font-semibold tracking-wider uppercase shadow-lg transition-all">
                  Get Pricing
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Amenities */}
      <section className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-dark-black font-primary mb-4 text-4xl tracking-wide md:text-5xl">
              Premium Amenities
            </h2>
            <p className="font-secondary mb-12 text-lg text-gray-600">
              Every venue includes professional-grade amenities
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {locationAmenities.map((amenity, index) => (
              <motion.div
                key={amenity}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 bg-white p-4 shadow-md"
              >
                <CheckCircle className="text-primary h-5 w-5 flex-shrink-0" />
                <span className="font-secondary text-dark-black text-sm font-medium">
                  {amenity}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-dark-black px-6 py-20 text-center md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          <h2 className="text-primary font-primary mb-6 text-4xl tracking-wide md:text-5xl">
            Ready to Plan Your Event?
          </h2>
          <p className="font-secondary text-whitesmoke/80 mb-8 text-lg">
            Let us help you find the perfect venue and create an unforgettable
            experience
          </p>

          <div className="text-whitesmoke flex flex-wrap items-center justify-center gap-6">
            <a
              href="tel:+1234567890"
              className="hover:text-primary font-secondary flex items-center gap-2 transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>(123) 456-7890</span>
            </a>
            <a
              href="mailto:info@events.com"
              className="hover:text-primary font-secondary flex items-center gap-2 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>info@events.com</span>
            </a>
            <div className="font-secondary flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>Mon-Fri: 9AM-6PM</span>
            </div>
          </div>

          <div className="mt-10">
            <CustomButton className="bg-primary font-secondary hover:bg-whitesmoke hover:text-dark-black border-none px-10 py-5 text-sm font-semibold tracking-wider text-white uppercase transition-all hover:shadow-2xl">
              Book a Consultation
            </CustomButton>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
