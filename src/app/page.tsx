import ParallaxSection from '@/sections/ParallaxSection';
import About from '@/sections/About';
import HeroSection from '@/sections/HeroSection';
import ImageSection from '@/sections/ImageSection';
import VenueAmenities from '@/sections/VenueAmenities';
import PhotoGallery from '@/sections/PhotoGallery';
import { items, photos } from '@/data';
import ContactUs from '@/components/ContactUs';
import CateringParralax from '@/sections/CateringParralax';
import JourneyTimelineScroll from '@/components/ScrollAnimations/JourneyTimelineScroll';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <About />
      <ParallaxSection
        videoSrc="/videos/Lower_Manhattan_Financial_District_Website.mp4"
        title="Lower Manhattan's Premier Event Venue"
        height="h-[70vh]"
      />

      <VenueAmenities />
      <JourneyTimelineScroll items={items} />
      <PhotoGallery galleryPhotos={photos} />
      <CateringParralax />
      <ContactUs />
      <ImageSection
        text="ENJOY STRESS-FREE EVENT PLANNING WITH FULL SERVICE PRODUCTION, CREATIVE DESIGN AND DEDICATED SUPPORT FROM CONCEPT TO FINAL CURTAIN CALL"
        imageSrc="/misc/wall-sign.jpg"
        imageAlt="Wall Street Sign"
      />
    </main>
  );
}
