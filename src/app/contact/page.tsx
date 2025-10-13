import ContactUs from '@/components/ContactUs';
import ContactHero from '@/sections/ContactHero';
import Testimonial from '@/sections/Testimonial';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ContactHero />
      <ContactUs />
    </main>
  );
}
