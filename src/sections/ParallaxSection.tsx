'use client';

import { useEffect, useRef, useState } from 'react';

interface ParallaxSectionProps {
  videoSrc: string;
  title?: string;
  subtitle?: string;
  height?: string;
}

export default function ParallaxSection({
  videoSrc,
  title,
  subtitle,
  height = 'h-screen',
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;

        const scrollProgress =
          (windowHeight - sectionTop) / (windowHeight + sectionHeight);
        setScrollPosition(Math.max(0, Math.min(1, scrollProgress)));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className={`relative ${height} overflow-hidden`}>
      <div className="absolute inset-0 h-[120%] w-full">
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {(title || subtitle) && (
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="px-6 text-center text-white">
            {title && (
              <h1 className="heading-hero max-w-5xl text-white">{title}</h1>
            )}
            {subtitle && (
              <p className="font-secondary text-background text-lg font-semibold tracking-wider uppercase md:text-xl lg:text-2xl">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
