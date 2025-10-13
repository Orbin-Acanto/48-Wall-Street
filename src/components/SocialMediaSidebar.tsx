'use client';

import Image from 'next/image';

export default function SocialMediaSidebar() {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: '/icons/facebook.svg',
      href: 'https://facebook.com',
    },
    {
      name: 'Instagram',
      icon: '/icons/instagram.svg',
      href: 'https://instagram.com',
    },
    {
      name: 'X',
      icon: '/icons/x.svg',
      href: 'https://x.com',
    },
    {
      name: 'YouTube',
      icon: '/icons/youtube.svg',
      href: 'https://youtube.com',
    },
  ];

  return (
    <div className="fixed top-1/2 left-0 z-50 hidden -translate-y-1/2 md:block">
      <div className="flex flex-col gap-1 bg-white p-1 shadow-2xl">
        {socialLinks.map((social) => (
          <a
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

            {/* Tooltip */}
            {/* <span className="font-secondary invisible absolute left-full ml-3 rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-300 group-hover:visible group-hover:opacity-100">
              {social.name}
            </span> */}
          </a>
        ))}
      </div>
    </div>
  );
}
