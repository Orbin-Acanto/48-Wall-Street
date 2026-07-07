import Link from 'next/link';
import ContactUs from '@/components/ContactUs';
import ContactHero from '@/sections/ContactHero';
import CustomButton from '@/components/CustomButton';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ContactHero />
      <ContactUs />

      {/* Proposal Builder CTA */}
      <section className="bg-white px-6 py-16 text-center md:px-12 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="font-secondary text-primary mb-4 text-sm tracking-[0.3em] uppercase">
            Plan Every Detail
          </p>
          <h2 className="heading-hero mb-4">Build Your Event Proposal</h2>
          <p className="text-lead mb-10">
            Prefer to design your event yourself? Use our AI-powered Request for
            Proposal (RFP) Builder to customize every aspect of your event and
            receive a tailored proposal, budget, floor plan, and timeline.
          </p>
          <Link href="/proposal">
            <CustomButton>Build Your Proposal</CustomButton>
          </Link>
        </div>
      </section>
    </main>
  );
}
