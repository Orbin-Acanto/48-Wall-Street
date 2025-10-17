import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
            {/* Image  */}
            <div className="relative h-64 overflow-hidden md:h-80 lg:h-96">
              <motion.img
                src={event.src}
                alt={event.title}
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Index number */}
              <div className="absolute top-6 right-6 flex h-14 w-14 items-center justify-center border-2 border-white/80 bg-white/95 shadow-lg backdrop-blur-sm">
                <span className="font-secondary text-primary text-3xl font-bold">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {event.location}
                </p>
              )}

              {event.href && (
                <motion.a
                  href={event.href}
                  whileHover={{ x: 5 }}
                  className="group/link text-primary inline-flex items-center gap-2 transition-colors hover:text-gray-900"
                >
                  View Project
                  <svg
                    className="h-5 w-5 transition-transform group-hover/link:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.a>
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
