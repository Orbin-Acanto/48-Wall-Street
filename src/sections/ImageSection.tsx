'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface TextImageSectionProps {
  text: string;
  imageSrc: string;
  imageAlt?: string;
}

export default function ImageSection({
  text,
  imageSrc,
  imageAlt = 'Background',
}: TextImageSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Trigger animation when section is 30% in view
      if (rect.top < windowHeight * 0.7) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-dark-black relative w-full overflow-hidden"
    >
      {/* Background Image with Zoom-in Effect */}
      <div
        className={`relative h-auto w-full transition-all duration-[1500ms] ease-out ${
          isVisible ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
        }`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1920}
          height={1080}
          className="h-auto w-full"
          priority
        />
        {/* Dark overlay for text contrast */}
        <div className="from-dark-black/60 via-dark-black/40 to-dark-black/60 absolute inset-0 bg-gradient-to-b"></div>
      </div>

      {/* Text Content Overlay - Absolute positioned over image */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div
          className={`mx-auto max-w-5xl text-center transition-all delay-300 duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Top decorative element */}
          <div
            className={`bg-primary mx-auto mb-8 h-16 w-1 transition-all delay-500 duration-700 ${
              isVisible ? 'scale-y-100' : 'scale-y-0'
            }`}
          ></div>

          <p
            className="font-primary text-2xl leading-relaxed tracking-wide text-white md:text-3xl lg:text-4xl"
            style={{
              textShadow:
                '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.9)',
            }}
          >
            {text}
          </p>

          {/* Bottom decorative element */}
          <div
            className={`bg-primary mx-auto mt-8 h-16 w-1 transition-all delay-700 duration-700 ${
              isVisible ? 'scale-y-100' : 'scale-y-0'
            }`}
          ></div>
        </div>
      </div>
      {/* Decorative corner frames - Absolute positioned */}
      {/* <div
        className={`border-primary absolute top-8 left-8 z-10 h-16 w-16 border-t-2 border-l-2 transition-all delay-200 duration-1000 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      ></div>
      <div
        className={`border-primary absolute top-8 right-8 z-10 h-16 w-16 border-t-2 border-r-2 transition-all delay-400 duration-1000 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      ></div>
      <div
        className={`border-primary absolute bottom-8 left-8 z-10 h-16 w-16 border-b-2 border-l-2 transition-all delay-600 duration-1000 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      ></div>
      <div
        className={`border-primary absolute right-8 bottom-8 z-10 h-16 w-16 border-r-2 border-b-2 transition-all delay-800 duration-1000 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      ></div> */}
    </section>
  );
}
