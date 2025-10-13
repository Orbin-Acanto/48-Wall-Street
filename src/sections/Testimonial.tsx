'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/data';

export default function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="bg-whitesmoke relative overflow-hidden px-6 py-20">
      {/* Decorative Line */}
      <div className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-gray-800/20"></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Title */}
        <h2 className="font-primary text-primary mb-16 text-center text-4xl tracking-wide md:text-5xl lg:text-6xl">
          WHAT OUR GUESTS SAY
        </h2>

        {/* Testimonial Card */}
        <div className="border-primary mx-auto max-w-6xl border-1 bg-white shadow-2xl">
          <div className="grid md:grid-cols-2">
            {/* Left Side - Testimonial Content */}
            <div className="relative flex flex-col justify-center p-8 md:p-12">
              {/* Quote Mark */}
              <div className="font-primary text-dark-black/10 absolute top-4 left-4 text-8xl leading-none">
                &quot;
              </div>

              {/* Main Quote */}
              <div className="relative z-10 mb-6">
                <p className="font-secondary text-primary mb-6 text-lg leading-relaxed tracking-wide md:text-xl">
                  {currentTestimonial.quote}
                </p>
              </div>

              {/* Detailed Review */}
              <div className="mb-8">
                <p className="font-secondary text-dark-black/70 text-sm leading-relaxed">
                  {currentTestimonial.details}
                </p>
              </div>

              {/* Author Info */}
              <div className="border-primary border-t-2 pt-6">
                <p className="font-primary text-dark-black mb-1 text-xl">
                  {currentTestimonial.author}
                </p>
                <p className="font-secondary text-dark-black/60 text-sm tracking-wider uppercase">
                  {currentTestimonial.event}
                </p>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative h-full min-h-[400px] md:min-h-[600px]">
              <Image
                src={currentTestimonial.image}
                alt={currentTestimonial.author}
                fill
                className="object-cover"
              />
              {/* Image Label */}
              {/* <div className="bg-dark-black writing-mode-vertical absolute top-1/2 right-0 -translate-y-1/2 px-4 py-8 text-white">
                <p className="font-secondary rotate-180 transform text-xs tracking-[0.3em] uppercase">
                  {currentTestimonial.imageLabel}
                </p>
              </div> */}
              <div className="bg-dark-black/70 absolute bottom-4 left-4 rounded-sm px-3 py-1 text-white">
                <p className="font-secondary text-xs tracking-wider uppercase">
                  {currentTestimonial.imageLabel}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-12 flex items-center justify-center gap-8">
          <button
            onClick={handlePrevious}
            className="group font-secondary text-dark-black hover:text-primary flex items-center gap-2 text-sm tracking-wider uppercase transition-colors duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="hidden md:inline">Previous</span>
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-dark-black/30 hover:bg-dark-black/50 w-2'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="group font-secondary text-dark-black hover:text-primary flex items-center gap-2 text-sm tracking-wider uppercase transition-colors duration-300"
            aria-label="Next testimonial"
          >
            <span className="hidden md:inline">Next</span>
            <ChevronRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Custom CSS for vertical text */}
      <style jsx>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
        }
      `}</style>
    </section>
  );
}
