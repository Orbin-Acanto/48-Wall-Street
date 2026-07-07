import EventRFPForm from '@/components/EventRFPForm';
import AIProposalGenerator from '@/components/AIProposalGenerator';

export default function ProposalPage() {
  return (
    <main className="min-h-screen pt-22">
      <EventRFPForm />
      <AIProposalGenerator />
    </main>
  );
}
