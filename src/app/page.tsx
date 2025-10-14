import ParallaxSection from '@/sections/ParallaxSection';
import About from '@/sections/About';
import HeroSection from '@/sections/HeroSection';
import ImageSection from '@/sections/ImageSection';
import VenueAmenities from '@/sections/VenueAmenities';
import PhotoGallery from '@/sections/PhotoGallery';
import { photos } from '@/data';
import ContactUs from '@/components/ContactUs';
import CateringParralax from '@/sections/CateringParralax';
import JourneyTimelineScroll from '@/components/ScrollAnimations/JourneyTimelineScroll';

const items = [
  {
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop',
    title: 'Intimate Wedding Celebration',
    category: 'Weddings',
    location: 'Napa Valley',
    href: '#',
  },
  {
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop',
    title: 'Tech Summit 2024',
    category: 'Conferences',
    location: 'San Francisco',
  },
  {
    src: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2000&auto=format&fit=crop',
    title: 'Fashion Week After Party',
    category: 'Fashion Shows',
    location: 'Los Angeles',
  },
  {
    src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2000&auto=format&fit=crop',
    title: 'Charity Gala Evening',
    category: 'Non-Profit',
    location: 'Boston',
  },
];

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
      <JourneyTimelineScroll items={items} />
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
