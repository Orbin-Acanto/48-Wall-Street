import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | 48 Wall Street Events',
  description: 'Read our terms and conditions.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
  },
};

export default function TermsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
