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
    <section className="bg-whitesmoke px-6 py-20 md:px-12 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center md:mb-16">
          <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
            <FileText className="text-primary h-7 w-7" />
          </div>
          <h2 className="heading-hero mb-4">Quick Quote</h2>
          <div className="bg-primary mx-auto mb-6 h-[2px] w-20 rounded-full" />
          <p className="text-lead">
            Once your selections are complete, the AI Proposal Generator will
            automatically produce:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proposals.map(({ text, icon: Icon }, idx) => (
            <div
              key={idx}
              className="group hover:border-primary/40 flex items-start gap-4 rounded-xl border border-black/[0.06] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            >
              <div className="bg-primary/10 group-hover:bg-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-colors duration-300">
                <Icon className="text-primary h-[18px] w-[18px] transition-colors duration-300 group-hover:text-white" />
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
