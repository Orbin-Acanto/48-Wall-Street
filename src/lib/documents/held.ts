import { getRedis } from '@/lib/documents/signing-tokens';
import { logSentDocuments } from '@/lib/documents/delivery';
import { EmailMessage, sendEmail } from '@/lib/email';

/**
 * Temporary hold on some documents (HOLD_DOCUMENT_TYPES, comma-separated, e.g.
 * "client_guidelines,credit_card_auth"). Requests for them are created as
 * usual, but the client invitation is queued here instead of emailed. Once the
 * types are no longer held, opening the Document Center sends the queue.
 */

const HELD = 'packets:held';
const KEY = (packetId: string) => `packet-held:${packetId}`;

export interface HeldInvitation {
  packetId: string;
  documents: string[];
  email: EmailMessage;
  log: Parameters<typeof logSentDocuments>[0];
}

export function heldDocumentTypes(): Set<string> {
  return new Set(
    (process.env.HOLD_DOCUMENT_TYPES ?? '')
      .split(',')
      .map((type) => type.trim())
      .filter(Boolean)
  );
}

/** Queue an invitation. False when it could not be stored. */
export async function holdInvitation(held: HeldInvitation): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return false;
  try {
    await redis.set(KEY(held.packetId), JSON.stringify(held));
    await redis.sadd(HELD, held.packetId);
    return true;
  } catch (error) {
    console.error('hold invitation failed:', error);
    return false;
  }
}

export async function isHeld(packetId: string | undefined | null) {
  const redis = getRedis();
  if (!redis || !packetId) return false;
  try {
    return (await redis.sismember(HELD, packetId)) === 1;
  } catch {
    return false;
  }
}

/** Drop a queued invitation (the request was cancelled). True if it was held. */
export async function dropHeld(packetId: string | undefined | null) {
  const redis = getRedis();
  if (!redis || !packetId) return false;
  try {
    const removed = await redis.srem(HELD, packetId);
    await redis.del(KEY(packetId));
    return removed === 1;
  } catch (error) {
    console.error('drop held invitation failed:', error);
    return false;
  }
}

/** Send every queued invitation whose documents are no longer held. */
export async function releaseHeldInvitations(): Promise<number> {
  const redis = getRedis();
  if (!redis) return 0;
  const holding = heldDocumentTypes();
  let released = 0;
  for (const packetId of await redis.smembers(HELD)) {
    const held = await redis.get<HeldInvitation>(KEY(packetId));
    if (!held) {
      await redis.srem(HELD, packetId);
      continue;
    }
    if (held.documents.some((type) => holding.has(type))) continue;
    // SREM is the claim: only one concurrent caller sends each invitation.
    if ((await redis.srem(HELD, packetId)) !== 1) continue;
    const result = await sendEmail(held.email);
    if (!result.success) {
      await redis.sadd(HELD, packetId);
      continue;
    }
    await redis.del(KEY(packetId));
    await logSentDocuments(held.log);
    released++;
  }
  return released;
}
