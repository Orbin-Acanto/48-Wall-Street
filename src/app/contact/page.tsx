import ContactUs from '@/components/ContactUs';
import EventRFPForm from '@/components/EventRFPForm';
import AIProposalGenerator from '@/components/AIProposalGenerator';
import ContactHero from '@/sections/ContactHero';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ContactHero />
      <ContactUs />
      <EventRFPForm />
      <AIProposalGenerator />
    </main>
  );
}
