import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { JourneyEvent } from '@/types';

interface EventCardProps {
  event: JourneyEvent;
  index: number;
  isLeft: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  index,
  isLeft,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 2.0', 'end 0.1'],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isLeft ? [-100, 0] : [100, 0]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0.85]
  );

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % event.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + event.images.length) % event.images.length
    );
  };

  const goToImage = (idx: number) => {
    setCurrentImageIndex(idx);
  };

  return (
    <div
      ref={cardRef}
      className={`relative flex cursor-pointer ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
    >
      <motion.div
        style={{ x, opacity }}
        className="w-full md:w-[calc(50%-2rem)]"
      >
        <div className="group relative">
          <div
            className="border-primary absolute top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 rounded-full border-4 bg-white shadow-md md:block"
            style={{
              [isLeft ? 'right' : 'left']: '-3.25rem',
            }}
          />

          {/* Connecting line to dot */}
          <div
            className="from-primary/70 absolute top-1/2 z-0 hidden h-px bg-gradient-to-r to-transparent md:block"
            style={{
              [isLeft ? 'right' : 'left']: '-2.75rem',
              width: '2.75rem',
            }}
          />

          {/* Card  */}
          <motion.div
            whileHover={{ y: -8 }}
            className="group-hover:border-primary bg-whitesmoke/95 relative overflow-hidden border-2 border-gray-200 backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl"
          >
            {/* Image Slider */}
            <div className="relative h-64 overflow-hidden md:h-80 lg:h-96">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={event.images[currentImageIndex]}
                  alt={`${event.title} - Image ${currentImageIndex + 1}`}
                  className="h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Navigation Arrows */}
              {event.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute top-1/2 left-4 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-white"
                    aria-label="Previous image"
                  >
                    <svg
                      className="h-6 w-6 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute top-1/2 right-4 z-20 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-white"
                    aria-label="Next image"
                  >
                    <svg
                      className="h-6 w-6 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Dot Indicators */}
              {event.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                  {event.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        goToImage(idx);
                      }}
                      className={`h-2 transition-all duration-300 ${
                        idx === currentImageIndex
                          ? 'bg-primary w-8'
                          : 'w-2 bg-white/60 hover:bg-white/80'
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Index number */}
              {/* <div className="absolute top-6 right-6 flex h-14 w-14 items-center justify-center border-2 border-white/80 bg-white/95 shadow-lg backdrop-blur-sm">
                <span className="font-secondary text-primary text-3xl font-bold">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div> */}
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 lg:p-10">
              <span className="bg-primary/15 text-primary font-secondary mb-4 inline-block px-4 py-1.5 text-xs tracking-wider uppercase">
                {event.category}
              </span>

              <h3 className="font-primary group-hover:text-primary mb-4 text-2xl text-gray-900 transition-colors md:text-3xl lg:text-4xl">
                {event.title}
              </h3>

              {event.location && (
                <p className="font-secondary mb-6 flex items-center gap-2 text-base text-gray-700 md:text-lg">
                  <svg
                    className="text-primary h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {event.location}
                </p>
              )}
            </div>

            {/* Decorative corner element */}
            <div className="from-primary/8 group-hover:from-primary/12 absolute -top-20 -left-20 h-40 w-40 bg-gradient-to-br to-transparent transition-all duration-500" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
