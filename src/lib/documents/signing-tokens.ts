import crypto from 'crypto';
import { Redis } from '@upstash/redis';

/**
 * One-time-use tracking for document signing links.
 *
 * The signing token itself is a stateless HMAC, so a signature check alone
 * cannot tell a fresh link from one that was already used — the same URL stays
 * valid forever. We therefore record consumed tokens in Redis and refuse them
 * on any later visit or submit.
 */

const CONSUMED_PREFIX = 'signing-token:consumed:';

// Keep the record well past the link's own deadline so a used link can never
// outlive its marker and become valid again.
const CONSUMED_TTL_SECONDS = 60 * 60 * 24 * 180; // 180 days

let redis: Redis | null = null;

function getRedis(): Redis | null {
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
      { nx: true, ex: CONSUMED_TTL_SECONDS }
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
