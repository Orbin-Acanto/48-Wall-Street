import ContactUs from '@/components/ContactUs';
import ContactHero from '@/sections/ContactHero';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ContactHero />
      <ContactUs />
    </main>
  );
}
