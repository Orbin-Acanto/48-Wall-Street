import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  alternates: { canonical: '/terms-of-service' },
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
