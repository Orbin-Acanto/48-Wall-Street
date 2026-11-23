import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  alternates: { canonical: '/privacy-policy' },
  description: 'Read our privacy policy.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
  },
};

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
