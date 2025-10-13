import ParallaxSection from '@/sections/ParallaxSection';
import About from '@/sections/About';
import HeroSection from '@/sections/HeroSection';
import ImageSection from '@/sections/ImageSection';
import VenueAmenities from '@/sections/VenueAmenities';
import PhotoGallery from '@/sections/PhotoGallery';
import { photos } from '@/data';
import ContactUs from '@/components/ContactUs';
import CateringParralax from '@/sections/CateringParralax';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <About />
      <ParallaxSection
        imageSrc="/misc/parallax.jpg"
        title="Historic Venue Location"
        subtitle="Wall Street's Best Kept Secret"
        height="h-[80vh]"
      />

      <VenueAmenities />
      <PhotoGallery galleryPhotos={photos} />
      <CateringParralax />
      <ContactUs />
      <ImageSection
        text="ClIENT ENJOY DRAMATIC, 360° UNOBSTRUCTED CITY AND WATER VIEWS ALONG WITH HISTORIC AND WHITE-GLOVE CONCIERGE SERVICES."
        imageSrc="/misc/wall-sign.jpg"
        imageAlt="Wall Street Sign"
      />
    </main>
  );
}
