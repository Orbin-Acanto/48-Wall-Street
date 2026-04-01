// 'use client';

// import { useState, useEffect } from 'react';

// export default function HeroSection() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const images = ['/hero/home-slider (5).jpg'];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [images.length]);

//   const goToSlide = (index: number) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <section className="relative h-screen w-full overflow-hidden">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//             index === currentIndex ? 'opacity-100' : 'opacity-0'
//           }`}
//         >
//           <img
//             src={image}
//             alt={`Slide ${index + 1}`}
//             className="h-full w-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/30" />
//         </div>
//       ))}

//       <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 transform space-x-3">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`h-3 w-3 rounded-full transition-all duration-300 ${
//               index === currentIndex
//                 ? 'w-8 bg-white'
//                 : 'bg-white/50 hover:bg-white/75'
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

'use client';

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        src="/videos/landing_hero.mp4"
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/images/og-home.jpg"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="sr-only">
          48 Wall Street — Historic Event Venue in the Financial District, New York City
        </h1>
      </div>
    </section>
  );
}
