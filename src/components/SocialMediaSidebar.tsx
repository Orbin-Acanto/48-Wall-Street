'use client';

import { sidebarSocialLinks } from '@/data';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SocialMediaSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  if (pathname === '/about/customize-plan') return null;

  return (
    <div className="fixed top-1/2 left-0 z-50 -translate-y-1/2">
      <div
        className={`relative flex flex-col gap-1 bg-white p-1 shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarSocialLinks.map((social) => (
          <Link
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group hover:bg-dark-black/20 relative rounded-lg px-4 py-4 transition-all duration-300"
            aria-label={social.name}
          >
            <Image
              src={social.icon}
              alt={social.name}
              width={24}
              height={24}
              className="h-6 w-6 transition-all duration-300 group-hover:scale-110"
            />
          </Link>
        ))}

        {!isOpen && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-primary hover:bg-primary/80 absolute top-1/2 -right-7 -translate-y-1/2 p-1.5 shadow-lg transition-all duration-300"
            aria-label={
              isOpen ? 'Hide social media links' : 'Show social media links'
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
