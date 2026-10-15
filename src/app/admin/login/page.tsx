'use client';

import { Suspense, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get('next');
  // Only ever bounce back into the admin area.
  const destination =
    next && next.startsWith('/admin') && !next.startsWith('/admin/login')
      ? next
      : '/admin/document-request';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, remember }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || 'Sign-in failed');
      // Full navigation so middleware sees the new cookie.
      window.location.assign(destination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-24">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/about/digital-brochure-hero.jpg')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/90"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center">
          <Image
            src="/shared/logo/48-wall-logo-white.png"
            alt="48 Wall Street Events"
            width={220}
            height={103}
            priority
          />
          <div className="bg-primary mt-6 h-px w-16" />
          <p className="mt-4 text-xs tracking-[0.3em] text-white/70 uppercase">
            Staff Portal
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 border border-white/10 bg-white p-6 shadow-2xl sm:p-8"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-medium tracking-widest text-gray-600 uppercase"
            >
              Work email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@48wallnyc.com"
              className="focus:border-primary focus:ring-primary/30 w-full border border-gray-300 px-3 py-3 text-base text-gray-900 focus:ring-2 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-medium tracking-widest text-gray-600 uppercase"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus:border-primary focus:ring-primary/30 w-full border border-gray-300 px-3 py-3 pr-16 text-base text-gray-900 focus:ring-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute top-1/2 right-2 -translate-y-1/2 px-2 py-1 text-xs font-medium text-gray-500 hover:text-gray-800"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-primary h-4 w-4"
            />
            Keep me signed in for 30 days
          </label>

          {error && (
            <p
              role="alert"
              className="border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary w-full px-4 py-3 text-sm font-medium tracking-widest text-white uppercase transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="text-center text-xs leading-relaxed text-gray-500">
            Use your company email and the team password, or your personal
            password if one was set up for you.
          </p>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
