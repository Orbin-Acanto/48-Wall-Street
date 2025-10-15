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
        <div className="absolute right-4 bottom-4 bg-white px-3 py-1 text-xs font-bold text-gray-900 shadow-md">
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
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const totalPages = pages.length;

  const nextPage = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext();
  }, []);

  const prevPage = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev();
  }, []);

  const onFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
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
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextPage, prevPage]);

  return (
    <div className={`bg-whitesmoke min-h-screen ${className}`}>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="font-primary mb-2 text-3xl text-gray-900 md:text-4xl lg:text-5xl">
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
          {/* Download & Print Buttons - Top Right Corner */}
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
                    // width={550}
                    // height={733}
                    width={isMobile ? 350 : 550}
                    height={isMobile ? 500 : 733}
                    size="stretch"
                    // minWidth={500}
                    // maxWidth={800}
                    // minHeight={650}
                    // maxHeight={1100}
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
                Page {currentPage + 1}
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
    </div>
  );
}
