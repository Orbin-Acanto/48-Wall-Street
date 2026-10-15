import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import {
  SESSION_COOKIE,
  SESSION_LONG_SECONDS,
  SESSION_SHORT_SECONDS,
  checkStaffLogin,
  mintSession,
  sessionSecret,
} from '@/lib/admin-session';

let limiter: Ratelimit | null | undefined;

/** 10 attempts per IP per 15 minutes. Null when Redis is not configured. */
function loginLimiter(): Ratelimit | null {
  if (limiter !== undefined) return limiter;
  try {
    limiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, '15 m'),
      prefix: 'admin-login',
    });
  } catch {
    limiter = null;
  }
  return limiter;
}

export async function POST(request: NextRequest) {
  const secret = sessionSecret();
  if (!secret) {
    return NextResponse.json(
      { success: false, error: 'Staff sign-in is not configured.' },
      { status: 503 }
    );
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  try {
    const result = await loginLimiter()?.limit(ip);
    if (result && !result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many attempts. Please wait a few minutes and try again.',
        },
        { status: 429 }
      );
    }
  } catch (error) {
    // A Redis outage must not lock staff out.
    console.error('Login rate limit check failed:', error);
  }

  const { email, password, remember } = await request.json().catch(() => ({}));

  const staff = checkStaffLogin(String(email ?? ''), String(password ?? ''));
  if (!staff) {
    return NextResponse.json(
      { success: false, error: 'That email and password do not match.' },
      { status: 401 }
    );
  }

  const maxAge = remember ? SESSION_LONG_SECONDS : SESSION_SHORT_SECONDS;
  const response = NextResponse.json({ success: true, staff });
  response.cookies.set(
    SESSION_COOKIE,
    await mintSession(secret, staff, maxAge),
    {
      httpOnly: true,
      sameSite: 'lax',
      secure: request.nextUrl.protocol === 'https:',
      path: '/',
      maxAge,
    }
  );
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
