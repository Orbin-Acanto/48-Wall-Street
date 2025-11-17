import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank You for contacting us | 48 Wall Street NYC',
  description: 'Thank You for contacting us',
};

export default function ThankYouLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
