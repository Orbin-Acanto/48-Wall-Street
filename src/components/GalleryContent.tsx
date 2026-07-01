'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryPhotos } from '@/data';
import { useSearchParams, useRouter } from 'next/navigation';

const TABS = [
  { id: 'welcome', name: 'Welcome to 48 Wall Street' },
  { id: 'corporate', name: 'Corporate' },
  { id: 'wedding', name: 'Wedding' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'bar', name: 'Bar & Bat Mitzvahs' },
  { id: 'holiday', name: 'Holiday Events' },
  { id: 'food', name: 'Food' },
  { id: 'setup', name: 'Setup' },
  { id: 'nonprofit', name: 'Non-Profit' },
  { id: 'hospitality', name: 'Hospitality' },
] as const;

type TabId = (typeof TABS)[number]['id'];
type GalleryTabId = Exclude<TabId, 'welcome'>;

const VALID_TABS: GalleryTabId[] = TABS.map((tab) => tab.id).filter(
  (id): id is GalleryTabId => id !== 'welcome'
);

export default function GalleryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabFromUrl = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState<TabId>(() => {
    if (tabFromUrl && VALID_TABS.includes(tabFromUrl as GalleryTabId)) {
      return tabFromUrl as TabId;
    }
    return 'welcome';
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (tabFromUrl && VALID_TABS.includes(tabFromUrl as GalleryTabId)) {
      setActiveTab(tabFromUrl as TabId);
    } else if (!tabFromUrl) {
      setActiveTab('welcome');
    }
  }, [tabFromUrl]);

  const filteredPhotos =
    activeTab === 'welcome'
      ? []
      : galleryPhotos.filter((photo) => photo.category === activeTab);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
    setSelectedIndex(null);
    document.body.style.overflow = 'unset';

    if (tabId === 'welcome') {
      router.push('/gallery', { scroll: false });
      return;
    }

    router.push(`/gallery?tab=${tabId}`, { scroll: false });
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = 'unset';
  }, []);

  const goToPrevious = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) return null;
      return (current - 1 + filteredPhotos.length) % filteredPhotos.length;
    });
  }, [filteredPhotos.length]);

  const goToNext = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null) return null;
      return (current + 1) % filteredPhotos.length;
    });
  }, [filteredPhotos.length]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedIndex, closeLightbox, goToNext, goToPrevious]);

  const getImageHeight = (size: string) => {
    switch (size) {
      case 'large':
        return 'h-[400px] md:h-[500px]';
      case 'tall':
        return 'h-[450px] md:h-[550px]';
      case 'wide':
        return 'h-[250px] md:h-[300px]';
      case 'medium':
        return 'h-[300px] md:h-[350px]';
      case 'small':
        return 'h-[200px] md:h-[250px]';
      default:
        return 'h-[300px] md:h-[350px]';
    }
  };

  return (
    <div className="font-secondary min-h-screen bg-[var(--color-whitesmoke)] pt-32 pb-20">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-primary mb-10 text-center text-5xl tracking-wide text-[var(--color-primary)] md:text-6xl lg:text-7xl"
        >
          PHOTO GALLERY
        </motion.h1>

        <div
          className="mb-12 flex flex-wrap justify-center border-b border-[var(--color-gray-700)]/30"
          role="tablist"
          aria-label="Gallery categories"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`relative px-4 py-4 text-[0.7rem] tracking-wider uppercase transition-all md:px-8 md:text-[0.825rem] lg:px-10 lg:text-[0.925rem] ${
                activeTab === tab.id
                  ? 'text-[var(--color-dark-black)]'
                  : 'text-[var(--color-gray-600)] hover:scale-105 hover:text-[var(--color-dark-black)]'
              }`}
            >
              {tab.name}
              {activeTab === tab.id && (
                <span className="absolute right-0 bottom-0 left-0 h-[3px] rounded-t-md bg-[var(--color-primary)]" />
              )}
            </button>
          ))}
        </div>

        {activeTab === 'welcome' ? (
          <section
            className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 pb-8 lg:grid-cols-2 lg:gap-16"
            aria-labelledby="welcome-title"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-gray-800)] shadow-2xl">
              <Image
                src="/gallery/welcome/lobby.png"
                alt="48 Wall Street lobby entrance"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="mb-4 text-xs tracking-[0.2em] text-[var(--color-primary)] uppercase">
                Welcome
              </p>
              <h2
                id="welcome-title"
                className="font-primary mb-6 text-4xl leading-tight font-normal text-[var(--color-dark-black)] md:text-5xl"
              >
                Welcome to{' '}
                <span className="text-[var(--color-primary)]">
                  48 Wall Street
                </span>
              </h2>
              <div
                className="mb-7 h-0.5 w-16 bg-[var(--color-primary)]"
                aria-hidden="true"
              />
              <p className="mb-5 text-[0.975rem] leading-relaxed text-[var(--color-gray-700)]">
                Step into one of New York City&apos;s most iconic landmarks. Set
                in the heart of the Financial District, 48 Wall Street pairs
                historic 1920s architecture — soaring coffered ceilings,
                Palladian windows, and a grand marble staircase — with the
                modern infrastructure today&apos;s events demand.
              </p>
              <p className="mb-5 text-[0.975rem] leading-relaxed text-[var(--color-gray-700)]">
                From intimate gatherings on the Concourse Level to galas of
                350+ on the Grand Mezzanine, every event is hosted in a venue
                built to leave an impression long after the last guest leaves.
              </p>
              <p className="text-[0.975rem] leading-relaxed text-[var(--color-gray-700)]">
                Explore the categories above to see how our spaces transform
                for weddings, corporate events, fashion shows, mitzvahs, and
                holiday celebrations.
              </p>
            </div>
          </section>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {filteredPhotos.length === 0 ? (
                <p className="py-24 text-center text-base tracking-widest text-[var(--color-gray-600)] uppercase">
                  Photos coming soon.
                </p>
              ) : (
                <div className="columns-1 gap-4 md:columns-2 lg:columns-3 xl:columns-4">
                  {filteredPhotos.map((photo, index) => {
                    const heightClass = getImageHeight(photo.size || 'medium');

                    return (
                      <motion.div
                        key={photo.src}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        className={`group relative mb-4 cursor-pointer break-inside-avoid overflow-hidden bg-[var(--color-gray-800)] shadow-lg ${heightClass}`}
                        onClick={() => openLightbox(index)}
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <div className="absolute right-4 bottom-4 left-4 translate-y-2 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <p className="text-sm font-medium text-white drop-shadow-lg">
                            {photo.alt}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && filteredPhotos[selectedIndex] && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-dark-black)]/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <motion.button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 rounded-full bg-white/10 p-3 transition hover:bg-white/20"
              whileHover={{ rotate: 90 }}
              aria-label="Close"
            >
              <X className="h-8 w-8 text-[var(--color-white)]" />
            </motion.button>

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 transition hover:scale-110 hover:bg-white/20 md:left-8 md:p-4"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6 text-[var(--color-white)] md:h-8 md:w-8" />
            </motion.button>

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 transition hover:scale-110 hover:bg-white/20 md:right-8 md:p-4"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6 text-[var(--color-white)] md:h-8 md:w-8" />
            </motion.button>

            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative mx-auto h-full max-h-[90vh] w-full max-w-6xl px-4"
            >
              <Image
                src={filteredPhotos[selectedIndex].src}
                alt={filteredPhotos[selectedIndex].alt}
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-6 py-3 backdrop-blur-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="font-secondary text-sm text-[var(--color-whitesmoke)]">
                {selectedIndex + 1} / {filteredPhotos.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
