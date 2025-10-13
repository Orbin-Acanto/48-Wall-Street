'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryPhotos } from '@/data';

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('holiday');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const tabs = [
    { id: 'corporate', name: 'Corporate' },
    { id: 'conference', name: 'Conference & Meetings' },
    { id: 'wedding', name: 'Wedding' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'bar', name: 'Bar & Bat Mitzvahs' },
    { id: 'holiday', name: 'Holiday Events' },
  ];

  const filteredPhotos = galleryPhotos.filter(
    (photo) => photo.category === activeTab
  );

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        (selectedIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      );
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredPhotos.length);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    if (selectedIndex !== null) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedIndex]);

  // Get height based on size prop for Pinterest-style layout
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
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-primary mb-10 text-center text-5xl tracking-wide text-[var(--color-primary)] md:text-6xl lg:text-7xl"
        >
          PHOTO GALLERY
        </motion.h1>

        {/* Tabs */}
        <div className="mb-12 flex flex-wrap justify-center border-b border-[var(--color-gray-700)]/30">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              whileHover={{ scale: 1.05 }}
              className={`relative px-4 py-4 text-xs tracking-wider uppercase transition-all md:px-8 md:text-sm lg:px-10 lg:text-base ${
                activeTab === tab.id
                  ? 'text-[var(--color-dark-black)]'
                  : 'text-[var(--color-gray-600)] hover:text-[var(--color-dark-black)]'
              }`}
            >
              {tab.name}
              {activeTab === tab.id && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute right-0 bottom-0 left-0 h-[3px] rounded-t-md bg-[var(--color-primary)]"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Pinterest-Style Masonry Gallery */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="columns-1 gap-4 md:columns-2 lg:columns-3 xl:columns-4"
          >
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-4 bottom-4 left-4 text-left"
                  >
                    <p className="text-sm font-medium text-white drop-shadow-lg">
                      {photo.alt}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-dark-black)]/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <motion.button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 rounded-full bg-white/10 p-3 transition hover:bg-white/20"
              whileHover={{ rotate: 90 }}
            >
              <X className="h-8 w-8 text-[var(--color-white)]" />
            </motion.button>

            {/* Prev */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 transition hover:scale-110 hover:bg-white/20 md:left-8 md:p-4"
            >
              <ChevronLeft className="h-6 w-6 text-[var(--color-white)] md:h-8 md:w-8" />
            </motion.button>

            {/* Next */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 transition hover:scale-110 hover:bg-white/20 md:right-8 md:p-4"
            >
              <ChevronRight className="h-6 w-6 text-[var(--color-white)] md:h-8 md:w-8" />
            </motion.button>

            {/* Image */}
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

            {/* Counter */}
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
