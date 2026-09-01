import { NextRequest, NextResponse } from 'next/server';

/**
 * Staff-only gate for the admin pages and the document APIs behind them.
 *
 * Anything that mints a signing token or emails a client a signing link is
 * staff-only: left open, anyone could send a stranger a credible 48 Wall Street
 * credit card authorization from our own domain. The client-facing half of the
 * flow (`verify-token`, `sign/submit`) stays public — clients hold a signed
 * token, which is its own credential.
 *
 * Three ways in, so both a person and a machine can authenticate:
 *   - Basic auth        — the browser prompts, staff type the shared login
 *   - Session cookie    — set after a successful Basic auth, so the admin
 *                         page's own fetches to /api/documents/* carry it
 *   - x-admin-secret    — for n8n and any other scheduled caller
 */

const PROTECTED_API = [
  '/api/documents/generate-token',
  '/api/documents/send',
  '/api/documents/reminder',
  '/api/documents/cancel',
];

const SESSION_COOKIE = 'admin_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

function sessionSecret(): string | undefined {
  return process.env.ADMIN_SESSION_SECRET ?? process.env.SIGNING_SECRET;
}

/** HMAC-SHA256 as lowercase hex. Web Crypto, because middleware runs on Edge. */
async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(message)
  );
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Length-safe, constant-time-ish string compare. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

async function mintSession(secret: string): Promise<string> {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  return `${expiresAt}.${await hmac(secret, String(expiresAt))}`;
}

async function sessionIsValid(
  value: string | undefined,
  secret: string
): Promise<boolean> {
  if (!value) return false;
  const [expiresAt, signature] = value.split('.');
  if (!expiresAt || !signature) return false;
  if (Number(expiresAt) < Date.now()) return false;
  return safeEqual(signature, await hmac(secret, expiresAt));
}

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

function challenge(isApi: boolean): NextResponse {
  if (isApi) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="48 Wall Street staff", charset="UTF-8"',
    },
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApi = PROTECTED_API.some((route) => pathname.startsWith(route));

  const secret = sessionSecret();
  const configured =
    !!secret &&
    ((!!process.env.ADMIN_USERNAME && !!process.env.ADMIN_PASSWORD) ||
      !!process.env.ADMIN_API_SECRET);

  // Fail closed. An unconfigured gate that lets everyone through is the bug
  // this middleware exists to fix.
  if (!configured) {
    console.error(
      'Admin auth is not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD ' +
        '(and SIGNING_SECRET or ADMIN_SESSION_SECRET) to enable staff access.'
    );
    return NextResponse.json(
      {
        success: false,
        error:
          'Admin access is not configured on this deployment. Set ADMIN_USERNAME and ADMIN_PASSWORD.',
      },
      { status: 503 }
    );
  }

  if (sharedSecretMatches(request)) return NextResponse.next();

  if (await sessionIsValid(request.cookies.get(SESSION_COOKIE)?.value, secret)) {
    return NextResponse.next();
  }

  if (basicAuthMatches(request.headers.get('authorization'))) {
    // Hand back a session so the admin page's own API calls are authenticated
    // without the browser re-prompting on a different path.
    const response = NextResponse.next();
    response.cookies.set(SESSION_COOKIE, await mintSession(secret), {
      httpOnly: true,
      sameSite: 'lax',
      secure: request.nextUrl.protocol === 'https:',
      path: '/',
      maxAge: SESSION_MAX_AGE_SECONDS,
    });
    return response;
  }

  return challenge(isApi);
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/documents/generate-token',
    '/api/documents/send',
    '/api/documents/reminder',
    '/api/documents/cancel',
  ],
};
