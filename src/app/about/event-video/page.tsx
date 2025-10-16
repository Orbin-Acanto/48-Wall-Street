'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { VideoItem } from '@/types';
import { portfolioVideos } from '@/data';
import Link from 'next/link';

export default function PortfolioVideoPage() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', name: 'All Events' },
    { id: 'wedding', name: 'Weddings' },
    { id: 'corporate', name: 'Corporate Events' },
    { id: 'special', name: 'Special Events' },
  ];

  const filteredVideos =
    activeTab === 'all'
      ? portfolioVideos
      : portfolioVideos.filter((video) => video.category === activeTab);

  const openVideo = (video: VideoItem) => {
    setSelectedVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div className="font-secondary bg-whitesmoke min-h-screen pt-32 pb-10">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-primary text-primary mb-10 text-center text-5xl tracking-wide md:text-6xl lg:text-7xl"
        >
          VIDEO PORTFOLIO
        </motion.h1>

        {/* Tabs */}
        <div className="mb-12 flex flex-wrap justify-center border-b border-gray-700/30">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              className={`relative px-4 py-4 text-xs tracking-wider uppercase transition-all md:px-8 md:text-sm lg:px-10 lg:text-base ${
                activeTab === tab.id
                  ? 'text-dark-black'
                  : 'hover:text-dark-black text-gray-600'
              }`}
            >
              {tab.name}
              {activeTab === tab.id && (
                <motion.span
                  layoutId="activeIndicator"
                  className="bg-primary absolute right-0 bottom-0 left-0 h-[3px] rounded-t-md"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Video Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group relative flex cursor-pointer flex-col overflow-hidden bg-white shadow-lg"
                onClick={() => openVideo(video)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-gray-200">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition group-hover:bg-black/60">
                    <div className="border-primary bg-primary flex h-12 w-12 items-center justify-center border-3 transition group-hover:scale-110 md:h-14 md:w-14">
                      <svg
                        className="ml-0.5 h-6 w-6 text-white md:h-7 md:w-7"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="flex-1 bg-white p-6">
                  <div className="text-primary mb-2 text-xs font-bold tracking-wider uppercase md:text-sm">
                    {video.category}
                  </div>
                  <h3 className="font-primary mb-2 text-lg font-bold text-gray-900 md:text-xl">
                    {video.title}
                  </h3>
                  <p className="font-secondary text-sm text-gray-700 md:text-base">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state if no videos */}
        {filteredVideos.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-600">
              No videos available in this category.
            </p>
          </div>
        )}
      </div>

      {/* Video Modal/Lightbox */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="bg-dark-black/95 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideo}
          >
            {/* Close Button */}
            <motion.button
              onClick={closeVideo}
              className="absolute top-6 right-6 z-10 rounded-full bg-white/10 p-3 transition hover:bg-white/20"
              whileHover={{ rotate: 90 }}
            >
              <X className="h-8 w-8 text-white" />
            </motion.button>

            {/* Video Container */}
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative mx-auto w-full max-w-5xl px-4"
            >
              <div className="aspect-video w-full overflow-hidden border-4 border-white bg-black shadow-2xl">
                <iframe
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info Below */}
              <motion.div
                className="mt-4 rounded-lg bg-white/10 p-6 backdrop-blur-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-primary mb-2 text-xs font-bold tracking-wider uppercase md:text-sm">
                  {selectedVideo.category}
                </div>
                <h2 className="font-primary mb-2 text-xl font-bold text-white md:text-2xl">
                  {selectedVideo.title}
                </h2>
                <p className="font-secondary text-sm text-white/90 md:text-base">
                  {selectedVideo.description}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="mt-20 border-t-4 border-gray-900 bg-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-primary mb-4 text-3xl tracking-wider text-white uppercase md:text-4xl">
              Ready to Create Your Event?
            </h2>
            <p className="font-secondary mb-8 text-lg text-white/90">
              Let&apos;s make your next event unforgettable
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border-primary font-secondary bg-primary hover:bg-primary/90 border-2 px-10 py-4 text-lg tracking-wider text-white uppercase shadow-xl transition"
              >
                Contact Us
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
