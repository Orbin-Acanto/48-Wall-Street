import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  GlassCardProps,
  LightboxProps,
  MarqueeProps,
  SoftFadeInProps,
  SplitTitleProps,
} from '@/types';
import CustomButton from '@/components/CustomButton';

export const useParallax = (offset: [string, string] = ['0%', '-20%']) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], offset);
  return { ref, y };
};

export const SplitTitle = ({ text, immediate = false }: SplitTitleProps) => {
  return (
    <h1 className="font-secondary text-4xl leading-[1.1] tracking-tight md:text-6xl">
      {text.split(/(\s+)/).map((part, i) => (
        <motion.span
          key={i}
          initial={{ y: '100%', opacity: 0 }}
          {...(immediate
            ? { animate: { y: 0, opacity: 1 } }
            : {
                whileInView: { y: 0, opacity: 1 },
                viewport: { once: true, margin: '-10%' },
              })}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: i * 0.04,
          }}
          className="inline-block will-change-transform"
          style={{ whiteSpace: 'pre' }}
        >
          {part}
        </motion.span>
      ))}
    </h1>
  );
};

export const SoftFadeIn = ({
  children,
  delay = 0,
  immediate = false,
}: SoftFadeInProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    {...(immediate
      ? { animate: { opacity: 1, y: 0 } }
      : {
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-10%' },
        })}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

export const GlassCard = ({ children, className = '' }: GlassCardProps) => (
  <div
    className={`border border-white/30 bg-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md ${className}`}
  >
    {children}
  </div>
);

export const Lightbox = ({ images, index, onClose }: LightboxProps) => {
  const [i, setI] = useState(index);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  if (i < 0) return null;

  const prev = () => setI((x) => (x === 0 ? images.length - 1 : x - 1));
  const next = () => setI((x) => (x === images.length - 1 ? 0 : x + 1));

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-dark-black)]/80 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        className="absolute top-5 right-5 text-xl text-white/90 hover:text-white"
        onClick={onClose}
      >
        ×
      </button>
      <div className="flex w-full max-w-6xl flex-col items-center gap-4">
        <img
          src={images[i].src}
          alt={images[i].alt || 'image'}
          className="max-h-[75vh] w-auto shadow-2xl"
        />
        <div className="flex items-center gap-3">
          <CustomButton variant="primary" onClick={prev}>
            Previous
          </CustomButton>
          <CustomButton onClick={next}>Next</CustomButton>
        </div>
      </div>
    </motion.div>
  );
};

export const Marquee = ({ items = [] }: MarqueeProps) => {
  const track = items.concat(items);

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex gap-8 pr-8"
        animate={{ x: [0, -600] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 18 }}
      >
        {track.map((t, idx) => (
          <span
            key={idx}
            className="text-sm tracking-widest text-[var(--color-gray-600)] uppercase md:text-base"
          >
            • {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
};
