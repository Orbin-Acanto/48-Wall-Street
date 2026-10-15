/**
 * Staff sign-in for /admin and the document APIs.
 *
 * Edge-safe (Web Crypto only) because middleware imports it.
 *
 * Who can sign in:
 *   - STAFF_ACCOUNTS       personal logins, "jane@48wallnyc.com:pass,john@mmeink.com:pass2"
 *   - ADMIN_PASSWORD       the shared team password, with any email on a company
 *                          domain (STAFF_EMAIL_DOMAINS, default 48wallnyc.com,mmeink.com)
 *   - ADMIN_USERNAME       the legacy shared username still works with ADMIN_PASSWORD
 *
 * Each person signs in with their own email either way, so every request they
 * send is attributed to them.
 */

export const SESSION_COOKIE = 'admin_session';
export const SESSION_SHORT_SECONDS = 60 * 60 * 12;
export const SESSION_LONG_SECONDS = 60 * 60 * 24 * 30;

export interface StaffIdentity {
  email: string;
  name: string;
}

export function sessionSecret(): string | undefined {
  return process.env.ADMIN_SESSION_SECRET ?? process.env.SIGNING_SECRET;
}

/** HMAC-SHA256 as lowercase hex. */
export async function hmac(secret: string, message: string): Promise<string> {
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
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

function toBase64Url(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function fromBase64Url(value: string): string {
  const binary = atob(value.replace(/-/g, '+').replace(/_/g, '/'));
  return new TextDecoder().decode(
    Uint8Array.from(binary, (c) => c.charCodeAt(0))
  );
}

/** "jane.doe@48wallnyc.com" → "Jane Doe". */
export function nameFromEmail(email: string): string {
  return email
    .split('@')[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

export async function mintSession(
  secret: string,
  staff: StaffIdentity,
  maxAgeSeconds: number
): Promise<string> {
  const expiresAt = Date.now() + maxAgeSeconds * 1000;
  const body = `${expiresAt}.${toBase64Url(JSON.stringify(staff))}`;
  return `${body}.${await hmac(secret, body)}`;
}

export async function readSession(
  value: string | undefined,
  secret: string
): Promise<StaffIdentity | null> {
  if (!value) return null;
  const [expiresAt, identity, signature] = value.split('.');
  if (!expiresAt || !identity || !signature) return null;
  if (Number(expiresAt) < Date.now()) return null;
  if (!safeEqual(signature, await hmac(secret, `${expiresAt}.${identity}`))) {
    return null;
  }
  try {
    const staff = JSON.parse(fromBase64Url(identity));
    return typeof staff?.email === 'string' ? staff : null;
  } catch {
    return null;
  }
}

function staffAccounts(): Map<string, string> {
  const accounts = new Map<string, string>();
  for (const entry of (process.env.STAFF_ACCOUNTS ?? '').split(',')) {
    const separator = entry.indexOf(':');
    if (separator === -1) continue;
    const email = entry.slice(0, separator).trim().toLowerCase();
    const password = entry.slice(separator + 1).trim();
    if (email && password) accounts.set(email, password);
  }
  return accounts;
}

function staffDomains(): string[] {
  return (process.env.STAFF_EMAIL_DOMAINS ?? '48wallnyc.com,mmeink.com')
    .split(',')
    .map((d) => d.trim().toLowerCase().replace(/^@/, ''))
    .filter(Boolean);
}

export function loginConfigured(): boolean {
  return (
    !!sessionSecret() &&
    (staffAccounts().size > 0 || !!process.env.ADMIN_PASSWORD)
  );
}

/** Returns who signed in, or null for bad credentials. */
export function checkStaffLogin(
  rawEmail: string,
  password: string
): StaffIdentity | null {
  const email = rawEmail.trim().toLowerCase();
  if (!email || !password) return null;

  const personal = staffAccounts().get(email);
  if (personal !== undefined) {
    // A personal account never falls back to the team password.
    return safeEqual(password, personal)
      ? { email, name: nameFromEmail(email) }
      : null;
  }

  const team = process.env.ADMIN_PASSWORD;
  if (!team || !safeEqual(password, team)) return null;

  const legacyUser = process.env.ADMIN_USERNAME?.trim().toLowerCase();
  if (legacyUser && safeEqual(email, legacyUser)) {
    return { email, name: nameFromEmail(email) || 'Events Team' };
  }

  const domain = email.split('@')[1] ?? '';
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    staffDomains().includes(domain)
    ? { email, name: nameFromEmail(email) }
    : null;
}
