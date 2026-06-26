import ContactUs from '@/components/ContactUs';
import ServiceStyleSelector from '@/components/ServiceStyleSelector';
import RFPBuilder from '@/components/RFPBuilder';
import AIProposalGenerator from '@/components/AIProposalGenerator';
import ContactHero from '@/sections/ContactHero';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ContactHero />
      <ContactUs />
      <ServiceStyleSelector />
      <RFPBuilder />
      <AIProposalGenerator />
    </main>
  );
}
