'use client';

import Image from 'next/image';
import Link from 'next/link';
import { LogOut } from 'lucide-react';

const LINKS = [
  { href: '/admin/document-request', label: 'Document Center' },
  { href: '/admin/floor-plans', label: 'Floor Plans' },
];

/** Dark staff-portal header, matching the Document Center's. */
export function StaffHeader({
  title,
  staffName,
  active,
}: {
  title: string;
  staffName: string;
  active: string;
}) {
  const signOut = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    window.location.assign('/admin/login');
  };

  return (
    <div className="bg-[#0a0a0a]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6">
        <div className="flex items-center gap-4">
          <Image
            src="/shared/logo/48-wall-logo-white.png"
            alt="48 Wall Street Events"
            width={110}
            height={52}
          />
          <div className="hidden h-10 w-px bg-white/20 sm:block" />
          <div>
            <p className="text-xs tracking-[0.25em] text-[#d2b371] uppercase">
              Staff Portal
            </p>
            <h1 className="text-xl text-white sm:text-2xl">{title}</h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
          <nav className="flex gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={link.href === active ? 'page' : undefined}
                className={`px-3 py-1.5 ${
                  link.href === active
                    ? 'text-[#d2b371]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <span className="hidden md:inline">
            Signed in as <span className="text-white">{staffName}</span>
          </span>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-1.5 border border-white/20 px-3 py-1.5 text-white/80 hover:bg-white/10"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
