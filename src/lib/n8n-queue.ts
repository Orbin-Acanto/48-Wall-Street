import { Redis } from '@upstash/redis';

/**
 * Safety net for website form submissions.
 *
 * Every public form hands its data to an n8n webhook. When n8n is down (it was
 * for five days in Nov 2026 and every lead was lost), the submission is parked
 * in Redis instead and /api/cron/retry-n8n re-sends it until n8n accepts it.
 * Webhook URLs and credentials are read from env at send time, never stored.
 */

const redis = Redis.fromEnv();
// Per-site key: the Upstash database may be shared with other MME sites.
const QUEUE_KEY = '48wall:n8n-pending';

const DEFAULT_URLS: Record<string, string> = {
  N8N_RFP_WEBHOOK_URL:
    'https://primary-production-f807.up.railway.app/webhook/35339c3d-5ccf-4015-b6c6-458109f44a89',
};

export type N8nTarget =
  | 'N8N_LEAD_WEBHOOK_URL'
  | 'N8N_RFP_WEBHOOK_URL'
  | 'N8N_RENTAL_WEBHOOK_URL';

export interface QueuedFile {
  name: string;
  type: string;
  base64: string;
}

export type N8nSubmission =
  | { target: N8nTarget; kind: 'json'; body: unknown }
  | {
      target: N8nTarget;
      kind: 'form';
      fields: Record<string, string>;
      files: QueuedFile[];
    };

// shortcut: Upstash caps a request at 1 MB, so bigger attachments are dropped
// from the queued copy (noted in a field); store them in blob storage if that bites.
const MAX_QUEUED_FILE_BYTES = 700_000;

function authHeaders(): Record<string, string> {
  const username = process.env.N8N_USERNAME;
  const password = process.env.N8N_PASSWORD;
  return username && password
    ? {
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
      }
    : {};
}

async function send(submission: N8nSubmission): Promise<Response> {
  const url = process.env[submission.target] || DEFAULT_URLS[submission.target];
  if (!url) throw new Error(`${submission.target} is not configured`);

  if (submission.kind === 'json') {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(submission.body),
    });
  }

  const form = new FormData();
  for (const [key, value] of Object.entries(submission.fields)) {
    form.append(key, value);
  }
  for (const file of submission.files) {
    // n8n reads uploaded files from the `data` field.
    form.append(
      'data',
      new Blob([Buffer.from(file.base64, 'base64')], { type: file.type }),
      file.name
    );
  }
  return fetch(url, { method: 'POST', headers: authHeaders(), body: form });
}

/** Read browser-uploaded files into a queueable form. */
export async function toQueuedFiles(files: File[]): Promise<QueuedFile[]> {
  return Promise.all(
    files.map(async (file) => ({
      name: file.name,
      type: file.type || 'application/octet-stream',
      base64: Buffer.from(await file.arrayBuffer()).toString('base64'),
    }))
  );
}

/**
 * Deliver to n8n, or park the submission for retry if n8n is unavailable.
 * Returns n8n's JSON reply when delivered, or `{ queued: true }`.
 * Throws only if n8n and the queue are both unavailable.
 */
export async function deliverToN8n(submission: N8nSubmission): Promise<unknown> {
  try {
    const response = await send(submission);
    if (response.ok) return await response.json().catch(() => ({}));
    console.error('n8n webhook error:', response.status, await response.text());
  } catch (error) {
    console.error('n8n webhook unreachable:', error);
  }

  let toQueue = submission;
  if (submission.kind === 'form') {
    const size = submission.files.reduce((sum, f) => sum + f.base64.length, 0);
    if (size > MAX_QUEUED_FILE_BYTES) {
      toQueue = {
        ...submission,
        files: [],
        fields: {
          ...submission.fields,
          attachmentsDropped: `${submission.files.length} attachment(s) were too large to hold while n8n was down: ${submission.files.map((f) => f.name).join(', ')}`,
        },
      };
    }
  }

  const id = `${Date.now()}-${crypto.randomUUID()}`;
  await redis.hset(QUEUE_KEY, { [id]: toQueue });
  console.error(`n8n unavailable; submission queued as ${id}`);
  return { queued: true };
}

/** Re-send everything parked in the queue. Stops at the first failure. */
export async function retryQueued(): Promise<{ sent: number; remaining: number }> {
  const pending =
    (await redis.hgetall<Record<string, N8nSubmission>>(QUEUE_KEY)) ?? {};
  const ids = Object.keys(pending).sort(); // oldest first
  let sent = 0;

  for (const id of ids) {
    try {
      const response = await send(pending[id]);
      if (!response.ok) {
        console.error('n8n still refusing queued submission:', response.status);
        break;
      }
    } catch (error) {
      console.error('n8n still unreachable:', error);
      break;
    }
    await redis.hdel(QUEUE_KEY, id);
    sent++;
  }

  return { sent, remaining: ids.length - sent };
}
