import { NextRequest, NextResponse } from 'next/server';
import {
  SESSION_COOKIE,
  loginConfigured,
  readSession,
  safeEqual,
  sessionSecret,
  type StaffIdentity,
} from '@/lib/admin-session';

/**
 * Staff-only gate for the admin pages and the document APIs behind them.
 *
 * Anything that mints a signing token or emails a client a signing link is
 * staff-only: left open, anyone could send a stranger a credible 48 Wall Street
 * credit card authorization from our own domain. The client-facing half of the
 * flow (`verify-token`, `sign/*`) stays public — clients hold a signed token,
 * which is its own credential.
 *
 * Ways in:
 *   - Session cookie    — set by /admin/login; carries who is signed in
 *   - x-admin-secret    — for n8n and any other scheduled caller
 *   - Basic auth        — legacy shared login, still honoured for scripts
 *
 * The signed-in person is forwarded to the route as x-staff-email /
 * x-staff-name so requests are attributed to whoever sent them.
 */

const LOGIN_PATH = '/admin/login';

function basicAuthMatches(header: string | null): boolean {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password || !header?.startsWith('Basic ')) return false;

  let decoded: string;
  try {
    decoded = atob(header.slice(6));
  } catch {
    return false;
  }

  const separator = decoded.indexOf(':');
  if (separator === -1) return false;

  return (
    safeEqual(decoded.slice(0, separator), username) &&
    safeEqual(decoded.slice(separator + 1), password)
  );
}

function sharedSecretMatches(request: NextRequest): boolean {
  const expected = process.env.ADMIN_API_SECRET;
  if (!expected) return false;
  const provided = request.headers.get('x-admin-secret');
  return !!provided && safeEqual(provided, expected);
}

/** Pass through, replacing any client-supplied identity headers with ours. */
function allow(request: NextRequest, staff: StaffIdentity | null) {
  const headers = new Headers(request.headers);
  headers.delete('x-staff-email');
  headers.delete('x-staff-name');
  if (staff) {
    headers.set('x-staff-email', staff.email);
    // Header values must be ByteString; names with accents are encoded.
    headers.set('x-staff-name', encodeURIComponent(staff.name));
  }
  return NextResponse.next({ request: { headers } });
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isApi = pathname.startsWith('/api/');

  if (pathname === LOGIN_PATH) return allow(request, null);

  const secret = sessionSecret();

  // Fail closed. An unconfigured gate that lets everyone through is the bug
  // this middleware exists to fix.
  if (!secret || (!loginConfigured() && !process.env.ADMIN_API_SECRET)) {
    console.error(
      'Admin auth is not configured. Set ADMIN_PASSWORD or STAFF_ACCOUNTS ' +
        '(and SIGNING_SECRET or ADMIN_SESSION_SECRET) to enable staff access.'
    );
    return NextResponse.json(
      {
        success: false,
        error:
          'Admin access is not configured on this deployment. Set ADMIN_PASSWORD or STAFF_ACCOUNTS.',
      },
      { status: 503 }
    );
  }

  const staff = await readSession(
    request.cookies.get(SESSION_COOKIE)?.value,
    secret
  );
  if (staff) return allow(request, staff);

  if (sharedSecretMatches(request)) {
    return allow(request, { email: 'automation', name: 'Automation' });
  }

  if (basicAuthMatches(request.headers.get('authorization'))) {
    return allow(request, {
      email: process.env.ADMIN_USERNAME!,
      name: 'Events Team',
    });
  }

  if (isApi) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const login = new URL(LOGIN_PATH, request.url);
  login.searchParams.set('next', `${pathname}${search}`);
  return NextResponse.redirect(login);
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/documents/generate-token',
    '/api/documents/send',
    '/api/documents/reminder',
    '/api/documents/cancel',
    '/api/documents/packets',
    '/api/documents/files',
  ],
};
