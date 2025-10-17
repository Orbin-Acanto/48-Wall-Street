'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import CustomButton from '@/components/CustomButton';
import Link from 'next/link';

export default function CateringSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      const progress = Math.max(
        0,
        Math.min(
          1,
          (windowHeight - sectionTop) / (windowHeight + sectionHeight)
        )
      );

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1536);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-whitesmoke relative min-h-screen overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 -top-[10%] h-[120%] w-full"
        style={{
          transform: `translateY(${scrollProgress * 10}%)`,
        }}
      >
        <Image
          src="/catering/c1.jpg"
          alt="Cocktails with city view"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="from-whitesmoke to-whitesmoke absolute inset-0 bg-gradient-to-b via-transparent"></div>
        <div className="absolute inset-0 bg-white/10"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20">
        <div className="grid items-center gap-6 lg:grid-cols-2">
          {/* Left Side - Text Content */}
          <div
            className="relative mt-20 border border-gray-800/10 bg-white/95 p-8 shadow-2xl backdrop-blur-sm md:px-8 md:py-8"
            style={{
              transform: `translateY(${scrollProgress * -30}px)`,
            }}
          >
            {/* Logo Watermark - Top Left */}
            <div className="absolute -top-22 left-0 sm:-top-30 md:-top-40 lg:-top-60 2xl:-top-67 2xl:-left-45">
              <div
                className="relative h-24 w-24 opacity-100 transition-all duration-500 hover:opacity-85 sm:h-32 sm:w-32 md:h-48 md:w-48 lg:h-64 lg:w-64"
                style={{
                  transform: isLargeScreen ? 'rotate(-30deg)' : 'rotate(0deg)',
                }}
              >
                <Image
                  src="/logo/tardis-logo-new.png"
                  alt="Catering Service Logo"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
            </div>

            <h2 className="font-primary text-primary mb-6 text-3xl tracking-wide uppercase md:text-4xl lg:text-6xl">
              OUR CATERING SERVICES
            </h2>
            <p className="font-secondary text-dark-black/80 text-md mb-8 leading-relaxed md:text-base">
              Experience culinary excellence with our in-house catering, led by
              Chef Orbin Acanto who has worked in the food industry for over
              four decades. Each menu is meticulously crafted to fit your unique
              event. With our attentive staff seamlessly orchestrating every
              detail, you can relax and enjoy every moment knowing that your
              event is in expert hands.
            </p>
            <Link href="/services/catering">
              <CustomButton variant="primary" className="text-white">
                VIEW SAMPLE MENU
              </CustomButton>
            </Link>
          </div>

          {/* Right Side - Floating Images */}
          <div className="relative h-[600px] md:h-[800px]">
            {/* Image 1 - Top Right */}
            <div
              className="absolute top-0 right-0 hidden h-48 w-64 overflow-hidden border-4 border-white shadow-2xl sm:block md:h-64 md:w-80"
              style={{
                transform: `translateY(${scrollProgress * 120}px)`,
                opacity: Math.max(0.8, 1 - scrollProgress * 0.3),
              }}
            >
              <Image
                src="/catering/c2.jpg"
                alt="Catering appetizers"
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

            {/* Image 2 - Bottom Left*/}
            <div
              className="absolute bottom-40 left-0 h-56 w-56 overflow-hidden border-4 border-white shadow-2xl md:h-68 md:w-68"
              style={{
                transform: `translateY(${scrollProgress * -200}px)`,
                opacity: Math.max(0.8, 1 - scrollProgress * 0.3),
              }}
            >
              <Image
                src="/catering/c3.jpg"
                alt="Caviar dish"
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

            {/* Image 3 - Bottom Right */}
            <div
              className="absolute right-0 bottom-20 h-60 w-60 overflow-hidden border-4 border-white shadow-2xl md:h-80 md:w-80"
              style={{
                transform: `translateY(${scrollProgress * 160}px)`,
                opacity: Math.max(0.8, 1 - scrollProgress * 0.3),
              }}
            >
              <Image
                src="/catering/c4.jpg"
                alt="Sushi platter"
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
