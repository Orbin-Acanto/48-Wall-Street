import { getRedis } from '@/lib/documents/signing-tokens';

/**
 * A shared log of document packets sent to clients, so everyone on the team
 * can see what went out, who sent it and whether it has been signed.
 *
 * Best effort: without Redis nothing is recorded and sending still works.
 */

const KEY = (id: string) => `packet:${id}`;
const INDEX = 'packets:index';
const TTL_SECONDS = 60 * 60 * 24 * 365;

export type PacketStatus = 'sent' | 'signed' | 'cancelled';

export interface PacketRecord {
  id: string;
  clientName: string;
  clientEmail: string;
  documents: string[];
  deadline: string;
  eventDate?: string;
  sentBy: { email: string; name: string };
  sentAt: string;
  status: PacketStatus;
  signingUrl: string;
  token: string;
  signedAt?: string;
  cancelledAt?: string;
  lastReminderAt?: string;
}

export async function savePacket(record: PacketRecord): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.set(KEY(record.id), JSON.stringify(record), {
      ex: TTL_SECONDS,
    });
    await redis.zadd(INDEX, {
      score: Date.parse(record.sentAt),
      member: record.id,
    });
  } catch (error) {
    console.error('packet save failed:', error);
  }
}

export async function updatePacket(
  id: string | undefined | null,
  patch: Partial<PacketRecord>
): Promise<void> {
  const redis = getRedis();
  if (!redis || !id) return;
  try {
    const current = await redis.get<PacketRecord>(KEY(id));
    if (!current) return;
    await redis.set(KEY(id), JSON.stringify({ ...current, ...patch }), {
      ex: TTL_SECONDS,
    });
  } catch (error) {
    console.error('packet update failed:', error);
  }
}

export async function listPackets(limit = 40): Promise<PacketRecord[]> {
  const redis = getRedis();
  if (!redis) return [];
  try {
    const ids = await redis.zrange<string[]>(INDEX, 0, limit - 1, {
      rev: true,
    });
    if (!ids.length) return [];
    const records = await redis.mget<(PacketRecord | null)[]>(...ids.map(KEY));
    return records.filter((r): r is PacketRecord => !!r);
  } catch (error) {
    console.error('packet list failed:', error);
    return [];
  }
}

/** What we remember about a sealed PDF, keyed by its SHA-256. */
export interface SealedDocumentRecord {
  title: string;
  reference: string;
  signerName: string;
  signedAt: string;
  sealed: boolean;
}

const HASH_KEY = (sha256: string) => `doc-hash:${sha256}`;
// Executed documents must stay verifiable for years.
const HASH_TTL_SECONDS = 60 * 60 * 24 * 365 * 7;

export async function recordSealedDocument(
  sha256: string,
  record: SealedDocumentRecord
): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  try {
    await redis.set(HASH_KEY(sha256), JSON.stringify(record), {
      ex: HASH_TTL_SECONDS,
    });
  } catch (error) {
    console.error('document hash save failed:', error);
  }
}

export async function findSealedDocument(
  sha256: string
): Promise<SealedDocumentRecord | null> {
  const redis = getRedis();
  if (!redis) return null;
  try {
    return await redis.get<SealedDocumentRecord>(HASH_KEY(sha256));
  } catch (error) {
    console.error('document hash lookup failed:', error);
    return null;
  }
}
