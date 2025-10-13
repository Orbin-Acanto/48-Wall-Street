import AboutHero from '@/sections/about/AboutHero';
import AboutParralax from '@/sections/about/AboutParralax';
import AboutPlan from '@/sections/about/AboutPlan';
import AboutTeam from '@/sections/about/AboutTeam';
import Testimonial from '@/sections/Testimonial';

export default function Home() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <AboutParralax />
      <AboutTeam />
      <Testimonial />
      <AboutPlan />
    </main>
  );
}
