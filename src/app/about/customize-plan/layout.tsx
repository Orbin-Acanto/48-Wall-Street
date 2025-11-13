import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Floor Plan | 48 Wall Street NYC - Historic Venue Since 1928',
  description:
    "Discover the history of 48 Wall Street, Manhattan's premier historic event venue. Explore our story, meet our team, view floor plans, virtual tours, and learn about our 1920s landmark venue in the Financial District.",
  keywords:
    'about 48 Wall Street, historic venue NYC history, Bank of New York building, Alexander Hamilton venue, Financial District landmark, 1928 historic building, Manhattan event venue team, venue floor plans NYC',
};

export default function FloorPlannerlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
