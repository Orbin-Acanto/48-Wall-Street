'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { navItems } from '@/data';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const leftItems = navItems.slice(0, 4);
  const rightItems = navItems.slice(4);

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-whitesmoke/95 border-b border-gray-800/20 shadow-sm backdrop-blur-md'
            : 'bg-whitesmoke/95 border-b border-gray-800/20 backdrop-blur-md'
          // : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-22 items-center justify-between">
            {/* Desktop Left Nav Items */}
            <div className="hidden flex-1 items-center justify-end space-x-12 pr-16 lg:flex">
              {leftItems.map((item) => (
                <div key={item.name} className="group relative">
                  <Link
                    href={item.href}
                    className="font-primary text-dark-black/80 hover:text-dark-black relative flex items-center gap-1 py-2 text-[0.75rem] tracking-wide uppercase transition-colors duration-300"
                  >
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" />
                    )}
                    {/* Animated Underline */}
                    <span className="bg-primary absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 ease-out group-hover:w-full"></span>
                  </Link>
                  {item.dropdown && (
                    <div className="invisible absolute top-full left-1/2 mt-6 w-52 -translate-x-1/2 border border-gray-800/20 bg-white/98 opacity-0 shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:mt-3 group-hover:opacity-100">
                      <div className="py-3">
                        {item.dropdown.map((subItem, idx) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`font-primary text-dark-black/70 hover:text-dark-black block px-6 py-3 text-[0.75rem] transition-all duration-200 hover:bg-gray-800/5 ${
                              idx === 0 ? 'rounded-none' : ''
                            } ${idx === item.dropdown.length - 1 ? 'rounded-none' : ''}`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Center Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo/48-wall-logo.svg"
                  alt="48 Wall Street"
                  width={200}
                  height={60}
                  priority
                  className="h-16 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Right Nav Items */}
            <div className="hidden flex-1 items-center space-x-12 pl-16 lg:flex">
              {rightItems.map((item) => (
                <div key={item.name} className="group relative">
                  <Link
                    href={item.href}
                    className="font-primary text-dark-black/80 hover:text-dark-black relative flex items-center gap-1 py-2 text-[0.75rem] tracking-wide uppercase transition-colors duration-300"
                  >
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" />
                    )}
                    {/* Animated Underline */}
                    <span className="bg-primary absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 ease-out group-hover:w-full"></span>
                  </Link>
                  {item.dropdown && (
                    <div className="invisible absolute top-full left-1/2 mt-6 w-52 -translate-x-1/2 border border-gray-800/20 bg-white/98 opacity-0 shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:visible group-hover:mt-3 group-hover:opacity-100">
                      <div className="py-3">
                        {item.dropdown.map((subItem, idx) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`font-primary text-dark-black/70 hover:text-dark-black block px-6 py-3 text-[0.75rem] transition-all duration-200 hover:bg-gray-800/5 ${
                              idx === 0 ? 'rounded-none' : ''
                            } ${idx === item.dropdown.length - 1 ? 'rounded-none' : ''}`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-dark-black p-2 transition-colors duration-200 hover:bg-gray-800/10 lg:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`bg-dark-black/60 fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 transform border-l border-gray-800/20 bg-white/98 backdrop-blur-md transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-800/20 p-6">
          <span className="font-primary text-dark-black text-xl font-semibold">
            Menu
          </span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-dark-black p-2 transition-colors duration-200 hover:bg-gray-800/10"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="h-[calc(100%-73px)] overflow-y-auto p-6">
          <div className="space-y-1">
            {navItems.map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="font-primary text-dark-black/80 hover:text-primary flex-1 py-3 text-[0.75rem] tracking-wide uppercase transition-colors duration-200"
                    onClick={() => !item.dropdown && setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.name ? null : item.name
                        )
                      }
                      className="text-dark-black/60 hover:text-dark-black p-2 transition-all duration-200 hover:bg-gray-800/10"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${
                          openDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>
                {item.dropdown && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openDropdown === item.name
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="border-primary/30 ml-2 space-y-1 border-l-2 pt-2 pl-4">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="font-primary text-dark-black/60 hover:text-primary block py-2.5 text-[0.75rem] transition-colors duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-primary fixed top-[89px] right-0 left-0 z-10 h-0.5"></div>
    </>
  );
}
