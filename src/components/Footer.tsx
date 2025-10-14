'use client';

import Image from 'next/image';
import { footerLinks, socialLinks } from '@/data';

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white">
      <div className="bg-primary right-0 left-0 z-10 h-0.5"></div>
      {/* Building Image Background */}
      {/* <div className="absolute inset-0 opacity-50">
        <Image
          src="/misc/tower_golden.svg"
          alt="48 Wall Street Building"
          fill
          className="object-contain object-left"
        />
      </div> */}

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="mx-auto max-w-7xl px-6 pt-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: About */}
            <div>
              <h3 className="font-primary text-primary mb-6 text-xl uppercase">
                48 Wall Street
              </h3>
              <ul className="space-y-3">
                {footerLinks.about.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="font-secondary hover:text-primary text-sm text-white/70 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Events & Services */}
            <div>
              <h3 className="font-primary text-primary mb-6 text-xl uppercase">
                Events & Services
              </h3>
              <ul className="space-y-3">
                {footerLinks.events.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="font-secondary hover:text-primary text-sm text-white/70 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: More Services */}
            <div>
              <h3 className="font-primary text-primary mb-6 text-xl uppercase">
                Our Work
              </h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="font-secondary hover:text-primary text-sm text-white/70 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h3 className="font-primary text-primary mb-6 text-xl uppercase">
                Get in touch today.
              </h3>
              <div className="space-y-4">
                <p className="font-secondary text-sm leading-relaxed text-white/70">
                  Discover what options are available to you when planning your
                  next event.
                </p>
                <a
                  href="/contact-us"
                  className="font-secondary text-primary inline-block text-sm underline transition-colors duration-300 hover:text-white"
                >
                  Contact Us
                </a>
                <div className="pt-4">
                  <p className="font-primary text-primary mb-6 text-xl uppercase">
                    Corporate Contact:
                  </p>
                  <a
                    href="mailto:info@48WallNYC.com"
                    className="font-secondary hover:text-primary text-sm text-white/70 transition-colors duration-300"
                  >
                    info@48WallNYC.com
                  </a>
                  <p className="font-secondary mt-4 text-sm text-white/70">
                    48 Wall St.
                    <br />
                    Lobby 1<br />
                    New York, NY 10005
                    <br />
                    1-877-885-0705
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="mt-16 flex items-center justify-center gap-6 border-t border-white/10 pt-8">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary transition-colors duration-300 hover:text-white"
                  aria-label={social.label}
                >
                  <Image
                    src={social.icon}
                    alt={social.label}
                    width={22}
                    height={22}
                    className="h-5.5 w-5.5 opacity-60 invert transition-all duration-300 group-hover:opacity-100"
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <div className="flex flex-col items-center justify-center gap-4 text-center md:flex-row">
              <a
                href="/terms-of-service"
                className="font-secondary hover:text-primary text-xs text-white/50 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <span className="hidden text-white/30 md:inline">|</span>
              <a
                href="/privacy-policy"
                className="font-secondary hover:text-primary text-xs text-white/50 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <span className="hidden text-white/30 md:inline">|</span>
              <p className="font-secondary text-xs text-white/50">
                Copyright © 2025 The Trump Organization
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
