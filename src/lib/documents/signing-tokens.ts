import crypto from 'crypto';
import { Redis } from '@upstash/redis';

/**
 * One-time-use tracking for document signing links.
 *
 * The signing token itself is a stateless HMAC and links never expire, so a
 * signature check alone cannot tell a fresh link from one that was already
 * used or cancelled. We therefore record consumed tokens in Redis, with no
 * TTL, and refuse them on any later visit or submit.
 */

const CONSUMED_PREFIX = 'signing-token:consumed:';

let redis: Redis | null = null;

export function getRedis(): Redis | null {
  if (redis) return redis;
  try {
    redis = Redis.fromEnv();
    return redis;
  } catch {
    // Credentials absent (e.g. local dev) — callers decide how to degrade.
    return null;
  }
}

/** Stable, non-reversible id for a token; avoids storing raw card-auth links. */
export function tokenId(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export type TokenState = 'fresh' | 'consumed' | 'unknown';

/** Whether this token has already been used to submit a document. */
export async function getTokenState(token: string): Promise<TokenState> {
  const client = getRedis();
  if (!client) return 'unknown';
  try {
    const hit = await client.get(`${CONSUMED_PREFIX}${tokenId(token)}`);
    return hit ? 'consumed' : 'fresh';
  } catch (error) {
    console.error('signing-token lookup failed:', error);
    return 'unknown';
  }
}

/**
 * Atomically claim a token. Returns true if this call won the claim, false if
 * it was already consumed. NX makes concurrent double-submits safe.
 */
export async function consumeToken(
  token: string,
  meta: Record<string, unknown> = {}
): Promise<boolean> {
  const client = getRedis();
  if (!client) return true; // No store configured; don't block real signings.
  try {
    const result = await client.set(
      `${CONSUMED_PREFIX}${tokenId(token)}`,
      JSON.stringify({ consumedAt: new Date().toISOString(), ...meta }),
      // No expiry: links never expire, so neither may the marker.
      { nx: true }
    );
    return result === 'OK';
  } catch (error) {
    console.error('signing-token claim failed:', error);
    return true;
  }
}

/** Release a claim so the client can retry after a failed submission. */
export async function releaseToken(token: string): Promise<void> {
  const client = getRedis();
  if (!client) return;
  try {
    await client.del(`${CONSUMED_PREFIX}${tokenId(token)}`);
  } catch (error) {
    console.error('signing-token release failed:', error);
  }
}

/** `payload.signature`: base64 JSON, HMAC'd with SIGNING_SECRET. */
export function signToken(data: Record<string, unknown>): string {
  const payload = Buffer.from(JSON.stringify(data)).toString('base64');
  const signature = crypto
    .createHmac('sha256', process.env.SIGNING_SECRET!)
    .update(payload)
    .digest('hex');
  return `${payload}.${signature}`;
}

export type VerifiedToken =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { ok: true; data: Record<string, any> }
  | { ok: false; status: number; error: string; message: string };

/**
 * Check signature and one-time use. The token is the only thing a
 * client holds, so everything about who they are comes from here — never from
 * the request body.
 */
export async function verifySigningToken(
  token: string
): Promise<VerifiedToken> {
  const [payload, signature] = String(token ?? '').split('.');
  if (!payload || !signature) {
    return {
      ok: false,
      status: 400,
      error: 'invalid',
      message: 'Invalid signing link.',
    };
  }

  const expected = Buffer.from(
    crypto
      .createHmac('sha256', process.env.SIGNING_SECRET!)
      .update(payload)
      .digest('hex')
  );
  const provided = Buffer.from(signature);
  if (
    provided.length !== expected.length ||
    !crypto.timingSafeEqual(provided, expected)
  ) {
    return {
      ok: false,
      status: 401,
      error: 'invalid',
      message: 'Invalid signature',
    };
  }

  let data;
  try {
    data = JSON.parse(Buffer.from(payload, 'base64').toString());
  } catch {
    return {
      ok: false,
      status: 400,
      error: 'invalid',
      message: 'Invalid signing link.',
    };
  }

  // No expiry check: a link stays valid until it is signed or cancelled. Any
  // `exp`/`deadline` in older tokens is only a "please complete by" date.
  if ((await getTokenState(token)) === 'consumed') {
    return {
      ok: false,
      status: 409,
      error: 'already_signed',
      message: 'This document has already been signed and submitted.',
    };
  }

  return { ok: true, data };
}
