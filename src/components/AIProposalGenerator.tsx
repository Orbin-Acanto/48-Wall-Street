import {
  FileText,
  DollarSign,
  Map,
  UtensilsCrossed,
  Monitor,
  Users,
  Clock,
  Truck,
  ClipboardList,
  Calendar,
  TrendingUp,
  Star,
  Leaf,
  Download,
} from 'lucide-react';

const proposals = [
  { text: 'A customized venue proposal', icon: FileText },
  { text: 'Estimated pricing and budget', icon: DollarSign },
  { text: 'Suggested floor plans', icon: Map },
  { text: 'Catering recommendations', icon: UtensilsCrossed },
  { text: 'AV and production recommendations', icon: Monitor },
  { text: 'Staffing recommendations', icon: Users },
  { text: 'Event timeline', icon: Clock },
  { text: 'Load-in/load-out schedule', icon: Truck },
  { text: 'Equipment list', icon: ClipboardList },
  { text: 'Preliminary production schedule', icon: Calendar },
  { text: 'Recommended enhancements and upgrades', icon: TrendingUp },
  { text: 'Luxury guest experience recommendations', icon: Star },
  { text: 'Sustainability recommendations', icon: Leaf },
  {
    text: 'A downloadable professional PDF proposal ready for review',
    icon: Download,
  },
];

export default function AIProposalGenerator() {
  return (
    <section className="bg-white px-6 py-20 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
            <FileText className="text-primary h-7 w-7" />
          </div>
          <p className="font-secondary text-primary mb-4 text-sm tracking-[0.3em] uppercase">
            Powered by AI
          </p>
          <h2 className="heading-hero">Quick Quote</h2>
          <p className="text-lead">
            Once your selections are complete, the AI Proposal Generator will
            automatically produce:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proposals.map(({ text, icon: Icon }, idx) => (
            <div key={idx} className="group flex items-start gap-4 px-5 py-5">
              <div className="bg-primary/10 group-hover:bg-primary flex h-9 w-9 flex-shrink-0 items-center justify-center transition-colors duration-200">
                <Icon className="text-primary h-4 w-4 group-hover:text-white" />
              </div>
              <span className="font-secondary text-dark-black/80 pt-1.5 text-sm leading-relaxed">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
