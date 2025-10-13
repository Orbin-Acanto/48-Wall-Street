import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import SocialMediaSidebar from '@/components/SocialMediaSidebar';
import ChatbotWidget from '@/components/ChatBotWidget';
import Footer from '@/components/Footer';
import ContactUsSlider from '@/components/ContactUsSlider';

export const metadata: Metadata = {
  title: '48 Wall Street',
  description: 'Event Service Vendors | 48 Wall Street NYC',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <SocialMediaSidebar />
        <ChatbotWidget />
        <ContactUsSlider />
        {children}
        <Footer />
      </body>
    </html>
  );
}
