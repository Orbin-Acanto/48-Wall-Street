'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import HTMLFlipBook from 'react-pageflip';

interface BookPage {
  id: number;
  image: string;
  alt?: string;
}

interface BookReaderProps {
  pages: BookPage[];
  title: string;
  subtitle?: string;
  downloadUrl?: string;
  className?: string;
}

interface PageProps {
  image: string;
  alt: string;
  pageNumber: number;
  isFirstPage?: boolean;
  isLastPage?: boolean;
}

interface FlipBookRef {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    turnToPage: (page: number) => void;
  };
}

const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({ image, alt, pageNumber, isFirstPage, isLastPage }, ref) => {
    return (
      <div
        ref={ref}
        className={`relative h-full w-full bg-white shadow-xl ${isFirstPage || isLastPage ? 'flex items-center justify-center' : ''}`}
      >
        <img
          src={image}
          alt={alt}
          className={`${isFirstPage || isLastPage ? 'h-full w-auto max-w-full object-contain' : 'h-full w-full object-cover'}`}
          draggable={false}
        />
        <div className="absolute right-4 bottom-0 px-3 py-1 text-sm font-semibold text-white">
          {pageNumber}
        </div>
      </div>
    );
  }
);

Page.displayName = 'Page';

export default function BookReader({
  pages,
  title,
  subtitle,
  downloadUrl,
  className = '',
}: BookReaderProps) {
  const bookRef = useRef<FlipBookRef | null>(null);
  const fullscreenBookRef = useRef<FlipBookRef | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const totalPages = pages.length;

  const nextPage = useCallback(() => {
    const activeBookRef = isFullscreen ? fullscreenBookRef : bookRef;
    activeBookRef.current?.pageFlip()?.flipNext();
  }, [isFullscreen]);

  const prevPage = useCallback(() => {
    const activeBookRef = isFullscreen ? fullscreenBookRef : bookRef;
    activeBookRef.current?.pageFlip()?.flipPrev();
  }, [isFullscreen]);

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  const handlePrint = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
      if (e.key === 'Escape' && isFullscreen) closeFullscreen();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextPage, prevPage, isFullscreen, closeFullscreen]);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  useEffect(() => {
    const syncTimeout = setTimeout(() => {
      if (!isFullscreen && bookRef.current) {
        try {
          const pageFlip = bookRef.current.pageFlip();
          if (pageFlip && typeof pageFlip.turnToPage === 'function') {
            pageFlip.turnToPage(currentPage);
          }
        } catch (error) {
          console.log('Error syncing page:', error);
        }
      } else if (isFullscreen && fullscreenBookRef.current) {
        try {
          const pageFlip = fullscreenBookRef.current.pageFlip();
          if (pageFlip && typeof pageFlip.turnToPage === 'function') {
            pageFlip.turnToPage(currentPage);
          }
        } catch (error) {
          console.log('Error syncing page:', error);
        }
      }
    }, 100);

    return () => clearTimeout(syncTimeout);
  }, [isFullscreen, currentPage]);

  return (
    <div className={`bg-whitesmoke min-h-screen ${className}`}>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="font-primary mb-2 text-3xl text-gray-900 uppercase md:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="text-primary font-secondary text-base md:text-lg">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Book Container - Larger */}
        <div className="relative mx-auto max-w-[1800px]">
          {/* Download, Print & Fullscreen Buttons - Top Right Corner */}
          <div className="absolute top-0 right-0 z-30 flex gap-2">
            {downloadUrl && (
              <motion.a
                href={downloadUrl}
                download
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="border-primary bg-primary hover:bg-primary/90 flex h-10 w-10 items-center justify-center border-1 text-white shadow-lg transition"
                title="Download PDF"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </motion.a>
            )}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrint}
              className="flex h-10 w-10 cursor-pointer items-center justify-center border-1 border-gray-400 bg-white text-gray-900 shadow-lg transition hover:bg-gray-50"
              title="Print"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFullscreen}
              className="flex h-10 w-10 cursor-pointer items-center justify-center border-1 border-gray-400 bg-white text-gray-900 shadow-lg transition hover:bg-gray-50"
              title="Fullscreen"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </motion.button>
          </div>

          {/* Book Wrapper */}
          <div className="relative flex items-center justify-center pt-12">
            {/* Book */}
            <div className="flip-book-container">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                {/* Flip Book */}
                <div className="bg-whitesmoke">
                  <HTMLFlipBook
                    ref={bookRef}
                    width={isMobile ? 350 : 550}
                    height={isMobile ? 500 : 733}
                    size="stretch"
                    minWidth={isMobile ? 400 : 600}
                    maxWidth={isMobile ? 640 : 960}
                    minHeight={isMobile ? 520 : 780}
                    maxHeight={isMobile ? 880 : 1320}
                    drawShadow={true}
                    flippingTime={1000}
                    usePortrait={isMobile}
                    startZIndex={0}
                    autoSize={true}
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={true}
                    onFlip={onFlip}
                    className="flip-book"
                    style={{}}
                    startPage={0}
                    clickEventForward={true}
                    useMouseEvents={true}
                    swipeDistance={30}
                    showPageCorners={true}
                    disableFlipByClick={false}
                  >
                    {pages.map((page, index) => (
                      <Page
                        key={page.id}
                        image={page.image}
                        alt={page.alt || `Page ${index + 1}`}
                        pageNumber={index + 1}
                        isFirstPage={index === 0}
                        isLastPage={index === pages.length - 1}
                      />
                    ))}
                  </HTMLFlipBook>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Navigation Buttons - Bottom Center */}
          <div className="mt-8 flex items-center justify-center gap-8">
            {/* Previous Button */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevPage}
              disabled={currentPage === 0}
              className="border-primary bg-primary hover:bg-primary/90 flex h-12 w-12 items-center justify-center border-2 text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-30"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

            {/* Page Indicator */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-700">
                {currentPage + 1}
              </span>
              <span className="text-sm text-gray-500">of</span>
              <span className="text-sm font-bold text-gray-700">
                {totalPages}
              </span>
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextPage}
              disabled={currentPage >= totalPages - 1}
              className="border-primary bg-primary hover:bg-primary/90 flex h-12 w-12 items-center justify-center border-2 text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-30"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeFullscreen();
          }}
        >
          <div className="relative flex h-full w-full flex-col items-center justify-center p-4 md:p-8">
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeFullscreen}
              className="absolute top-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-900 shadow-2xl transition hover:bg-gray-100"
              title="Close Fullscreen (ESC)"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            {/* Fullscreen Book */}
            <div className="flex h-full w-full flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative mb-6"
              >
                <div className="bg-transparent">
                  <HTMLFlipBook
                    ref={fullscreenBookRef}
                    width={isMobile ? 400 : 700}
                    height={isMobile ? 570 : 933}
                    size="stretch"
                    minWidth={isMobile ? 350 : 650}
                    maxWidth={isMobile ? 500 : 1100}
                    minHeight={isMobile ? 500 : 867}
                    maxHeight={isMobile ? 700 : 1467}
                    drawShadow={true}
                    flippingTime={1000}
                    usePortrait={isMobile}
                    startZIndex={0}
                    autoSize={true}
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={true}
                    onFlip={onFlip}
                    className="flip-book"
                    style={{}}
                    startPage={currentPage}
                    clickEventForward={true}
                    useMouseEvents={true}
                    swipeDistance={30}
                    showPageCorners={true}
                    disableFlipByClick={false}
                  >
                    {pages.map((page, index) => (
                      <Page
                        key={`fullscreen-${page.id}`}
                        image={page.image}
                        alt={page.alt || `Page ${index + 1}`}
                        pageNumber={index + 1}
                        isFirstPage={index === 0}
                        isLastPage={index === pages.length - 1}
                      />
                    ))}
                  </HTMLFlipBook>
                </div>
              </motion.div>

              {/* Fullscreen Navigation Controls */}
              <div className="flex items-center justify-center gap-8">
                {/* Previous Button */}
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className="border-primary bg-primary hover:bg-primary/90 flex h-10 w-10 items-center justify-center text-white shadow-2xl transition disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </motion.button>

                {/* Page Indicator */}
                <div className="flex items-center gap-3 bg-white/20 px-4 py-2 shadow-2xl">
                  <span className="text-dark-black text-base font-bold">
                    {currentPage + 1}
                  </span>
                  <span className="text-base text-gray-900">of</span>
                  <span className="text-dark-black text-base font-bold">
                    {totalPages}
                  </span>
                </div>

                {/* Next Button */}
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextPage}
                  disabled={currentPage >= totalPages - 1}
                  className="border-primary bg-primary hover:bg-primary/90 flex h-10 w-10 items-center justify-center border-2 text-white shadow-2xl transition disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
