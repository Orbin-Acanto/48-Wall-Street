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
import VenueLevels from '@/sections/Venuelevels';
import PrivateDinnerBanner from '@/components/PrivateDinnerBanner';
import HolidayHomeBanner from '@/components/HolidayHomeBanner';
import VaultDiscoverBanner from '@/components/VaultDiscoverBanner';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <About />
      {/* Holiday feature sits high on the page for seasonal visibility.
          White background alternates against About (white -> gray) below. */}
      <HolidayHomeBanner />
      <VenueLevels />
      {/* White alternates against VenueLevels (bg-gray-100) above */}
      <PrivateDinnerBanner background="white" />
      <ParallaxSection
        videoSrc="/home/videos/lower_manhattan_financial_district_website.mp4"
        title="Lower Manhattan's Premier Event Venue"
        height="h-[70vh]"
      />
      {/* Drives discovery of the Vault Level from the homepage */}
      <VaultDiscoverBanner />
      <VenueAmenities />
      <JourneyTimelineScroll items={items} />
      <PhotoGallery galleryPhotos={photos} />
      <CateringParralax />
      <ContactUs />
      <ImageSection
        text="ENJOY STRESS-FREE EVENT PLANNING WITH FULL SERVICE PRODUCTION, CREATIVE DESIGN AND DEDICATED SUPPORT FROM CONCEPT TO FINAL CURTAIN CALL"
        imageSrc="/home/wall-sign.jpg"
        imageAlt="Wall Street Sign"
      />
    </main>
  );
}
