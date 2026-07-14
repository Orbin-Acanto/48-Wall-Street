'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CustomButton from '@/components/CustomButton';

// NOTE: The full video gallery (category tabs, grid, Vimeo thumbnail fetching,
// and the video modal) is temporarily disabled and preserved — line-commented —
// at the bottom of this file. We plan to bring it back in the future. For now
// this page shows only the single "48 Wall Sizzle" video, displayed large.

const getVimeoEmbedUrl = (url: string) => {
  const match = url.match(/vimeo\.com\/(\d+)\/([a-zA-Z0-9]+)/);
  if (match) {
    return `https://player.vimeo.com/video/${match[1]}?h=${match[2]}`;
  }
  return url;
};

// The single featured video for now.
const SIZZLE_VIDEO = {
  src: 'https://vimeo.com/686078385/829c7b3957',
  alt: '48 Wall Sizzle',
};

export default function PortfolioVideoPage() {
  return (
    <div className="font-secondary bg-whitesmoke min-h-screen pt-32">
      <div className="mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-primary heading-hero text-center"
        >
          VIDEO Gallery
        </motion.h1>

        {/* Single large featured video — 48 Wall Sizzle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-8 mb-4 w-full max-w-[1600px]"
        >
          <div className="relative aspect-video w-full overflow-hidden border-2 border-white bg-black shadow-2xl sm:border-4">
            <iframe
              src={getVimeoEmbedUrl(SIZZLE_VIDEO.src)}
              title={SIZZLE_VIDEO.alt}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <h2 className="font-primary text-dark-black mt-4 text-center text-xl font-bold md:text-2xl">
            {SIZZLE_VIDEO.alt}
          </h2>
        </motion.div>
      </div>

      {/* CTA Section */}
      <section className="mt-12 border-t-4 border-gray-900 bg-gray-900 py-12 sm:mt-16 sm:py-16 md:mt-20 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-hero text-center text-white">
              Ready to Create <br />
              Your Event?
            </h2>
            <p className="text-lead mb-6 text-gray-300 sm:mb-8">
              Let&apos;s make your next event unforgettable
            </p>
            <Link href="/contact">
              <CustomButton variant="primary">Contact US</CustomButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* ================================================================== */
// FULL VIDEO GALLERY — TEMPORARILY DISABLED (we plan to bring it back).
// The original implementation is preserved below, line-commented. To
// restore: delete the simplified component above and un-comment this.
// The videoGallery data in @/data is intentionally left intact.
/* ================================================================== */
// 'use client';
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X } from 'lucide-react';
// import Link from 'next/link';
// import CustomButton from '@/components/CustomButton';
// import { videoGallery } from '@/data';
//
// const getVimeoEmbedUrl = (url: string) => {
//   const match = url.match(/vimeo\.com\/(\d+)\/([a-zA-Z0-9]+)/);
//   if (match) {
//     return `https://player.vimeo.com/video/${match[1]}?h=${match[2]}&autoplay=1`;
//   }
//   return url;
// };
//
// const getVimeoThumbnail = async (url: string): Promise<string> => {
//   try {
//     const response = await fetch(
//       `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`
//     );
//     const data = await response.json();
//     const thumbnail = data.thumbnail_url;
//     if (thumbnail) {
//       return thumbnail.replace(/_\d+x\d+/, '_1280');
//     }
//     return '';
//   } catch (error) {
//     console.error('Error fetching Vimeo thumbnail:', error);
//     return '';
//   }
// };
//
// interface VideoItem {
//   src: string;
//   alt: string;
//   categories: string;
//   thumbnail?: string;
// }
//
// export default function PortfolioVideoPage() {
//   const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
//   const [activeTab, setActiveTab] = useState('all');
//   const [videos, setVideos] = useState<VideoItem[]>(videoGallery);
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => {
//     const fetchThumbnails = async () => {
//       setLoading(true);
//       const updatedVideos = await Promise.all(
//         videoGallery.map(async (video) => {
//           const thumbnail = await getVimeoThumbnail(video.src);
//           return {
//             ...video,
//             thumbnail:
//               thumbnail ||
//               'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop',
//           };
//         })
//       );
//       setVideos(updatedVideos);
//       setLoading(false);
//     };
//
//     fetchThumbnails();
//   }, []);
//
//   const tabs = [
//     { id: 'all', name: 'All Events' },
//     { id: 'wedding', name: 'Weddings' },
//     { id: 'corporate', name: 'Corporate Events' },
//     { id: 'special', name: 'Special Events' },
//   ];
//
//   const filteredVideos =
//     activeTab === 'all'
//       ? videos
//       : videos.filter((video) => video.categories === activeTab);
//
//   const openVideo = (video: VideoItem) => {
//     setSelectedVideo(video);
//     document.body.style.overflow = 'hidden';
//   };
//
//   const closeVideo = () => {
//     setSelectedVideo(null);
//     document.body.style.overflow = 'unset';
//   };
//
//   return (
//     <div className="font-secondary bg-whitesmoke min-h-screen pt-32">
//       <div className="mx-auto px-6 md:px-12 lg:px-20">
//         {/* Header */}
//         <motion.h1
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-primary heading-hero text-center"
//         >
//           VIDEO Gallery
//         </motion.h1>
//
//         {/* Tabs */}
//         <div className="font-secondary mb-12 flex flex-wrap justify-center border-b border-gray-700/30">
//           {tabs.map((tab) => (
//             <motion.button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               whileHover={{ scale: 1.05 }}
//               className={`relative px-4 py-4 text-xs tracking-wider uppercase transition-all md:px-8 md:text-sm lg:px-10 lg:text-base ${
//                 activeTab === tab.id
//                   ? 'text-dark-black'
//                   : 'hover:text-dark-black text-gray-600'
//               }`}
//             >
//               {tab.name}
//               {activeTab === tab.id && (
//                 <motion.span
//                   layoutId="activeIndicator"
//                   className="bg-primary absolute right-0 bottom-0 left-0 h-[3px] rounded-t-md"
//                 />
//               )}
//             </motion.button>
//           ))}
//         </div>
//
//         {/* Video Grid */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5 }}
//             className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
//           >
//             {filteredVideos.map((video, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.4, delay: index * 0.05 }}
//                 whileHover={{ scale: 1.02, y: -4 }}
//                 className="group relative flex cursor-pointer flex-col overflow-hidden bg-white shadow-lg"
//                 onClick={() => openVideo(video)}
//               >
//                 {/* Thumbnail */}
//                 <div className="relative aspect-video overflow-hidden bg-gray-200">
//                   {video.thumbnail ? (
//                     <img
//                       src={video.thumbnail}
//                       alt={video.alt}
//                       className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
//                     />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
//                       <span className="text-sm text-gray-500">Loading...</span>
//                     </div>
//                   )}
//
//                   {/* Play Button */}
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all duration-300 group-hover:bg-black/50">
//                     <motion.div
//                       whileHover={{ scale: 1.15 }}
//                       transition={{ duration: 0.2 }}
//                       className="relative flex items-center justify-center"
//                     >
//                       <div className="bg-primary/30 absolute inset-0 scale-150 rounded-sm blur-2xl"></div>
//
//                       <div className="bg-primary hover:bg-opacity-90 relative flex h-12 w-12 items-center justify-center shadow-2xl transition-all duration-300 md:h-16 md:w-16">
//                         <div className="ml-1 h-0 w-0 border-t-[8px] border-b-[8px] border-l-[14px] border-t-transparent border-b-transparent border-l-white md:border-t-[10px] md:border-b-[10px] md:border-l-[18px]"></div>
//                       </div>
//                     </motion.div>
//                   </div>
//                 </div>
//
//                 {/* Video Info */}
//                 <div className="flex-1 bg-white p-4 md:p-6">
//                   <div className="text-primary mb-2 text-xs font-bold tracking-wider uppercase md:text-sm">
//                     {video.categories}
//                   </div>
//                   <h3 className="font-primary text-base font-bold text-gray-900 md:text-lg lg:text-xl">
//                     {video.alt}
//                   </h3>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </AnimatePresence>
//
//         {/* Loading state */}
//         {loading && (
//           <div className="py-20 text-center">
//             <p className="text-gray-600">Loading videos...</p>
//           </div>
//         )}
//
//         {/* Empty state if no videos */}
//         {!loading && filteredVideos.length === 0 && (
//           <div className="py-20 text-center">
//             <p className="text-gray-600">
//               No videos available in this category.
//             </p>
//           </div>
//         )}
//       </div>
//
//       {/* Video Modal*/}
//       <AnimatePresence>
//         {selectedVideo && (
//           <motion.div
//             className="bg-dark-black/95 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm sm:p-6 md:p-8"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={closeVideo}
//           >
//             {/* Close Button */}
//             <motion.button
//               onClick={closeVideo}
//               className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 transition hover:bg-white/20 sm:top-6 sm:right-6 sm:p-3"
//               whileHover={{ rotate: 90 }}
//             >
//               <X className="h-6 w-6 text-white sm:h-8 sm:w-8" />
//             </motion.button>
//
//             <motion.div
//               onClick={(e) => e.stopPropagation()}
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.4 }}
//               className="relative flex h-full max-h-[90vh] w-full max-w-[95vw] items-center justify-center"
//             >
//               <div className="h-full max-h-[900px] w-full max-w-[1600px] overflow-hidden border-2 border-white bg-black shadow-2xl sm:border-4">
//                 <iframe
//                   src={getVimeoEmbedUrl(selectedVideo.src)}
//                   title={selectedVideo.alt}
//                   className="h-full w-full"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 />
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//
//       {/* CTA Section */}
//       <section className="mt-12 border-t-4 border-gray-900 bg-gray-900 py-12 sm:mt-16 sm:py-16 md:mt-20 md:py-24">
//         <div className="container mx-auto px-4 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <h2 className="heading-hero text-center text-white">
//               Ready to Create <br />
//               Your Event?
//             </h2>
//             <p className="text-lead mb-6 text-gray-300 sm:mb-8">
//               Let&apos;s make your next event unforgettable
//             </p>
//             <Link href="/contact">
//               <CustomButton variant="primary">Contact US</CustomButton>
//             </Link>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// }
//
