'use client';

import * as React from 'react';
import {
  motion,
  useReducedMotion,
  type Transition,
  type Easing,
} from 'framer-motion';

const easeInOutBezier: Easing = [0.42, 0, 0.58, 1];

export interface ScrollIconProps {
  visible?: boolean;
  label?: string;
  className?: string;
  colorClassName?: string;
}

const ScrollIcon: React.FC<ScrollIconProps> = ({
  visible = true,
  label = '',
  className = '',
  colorClassName,
}) => {
  const reduceMotion = useReducedMotion();

  const wheelAnimate = reduceMotion
    ? { opacity: 1, top: '10px' }
    : { top: ['10px', '60px'], opacity: [1, 0] };

  const wheelTransition: Transition = reduceMotion
    ? { duration: 0 }
    : {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop',
        ease: easeInOutBezier,
      };

  const textColor = colorClassName ?? 'text-gray-700';
  const iconColor = colorClassName ?? 'text-gray-900';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={[
        'pointer-events-none fixed bottom-5 left-10 z-[60] -translate-x-1/2 md:bottom-8',
        className,
      ].join(' ')}
      aria-hidden
    >
      <div className="flex flex-col items-center gap-3">
        <span
          className={`text-xs font-medium tracking-widest uppercase ${textColor}`}
        >
          {label}
        </span>

        <div
          className={[
            'relative flex h-[70px] w-[40px] items-start justify-center rounded-[60px] border-1 bg-white/30 shadow-md backdrop-blur',
            iconColor,
          ].join(' ')}
          style={{ borderColor: 'currentColor' }}
        >
          <motion.div
            className="absolute h-3 w-3 rounded-full"
            style={{ backgroundColor: 'currentColor', top: '10px' }}
            animate={wheelAnimate}
            transition={wheelTransition}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ScrollIcon;
