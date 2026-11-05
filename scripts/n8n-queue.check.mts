// Self-check for src/lib/n8n-queue.ts with fake Upstash + fake n8n (no network).
// Run: npx tsx scripts/n8n-queue.check.mts
import assert from 'node:assert/strict';

process.env.UPSTASH_REDIS_REST_URL = 'https://fake-upstash.test';
process.env.UPSTASH_REDIS_REST_TOKEN = 'x';
process.env.N8N_LEAD_WEBHOOK_URL = 'https://fake-n8n.test/lead';
process.env.N8N_USERNAME = 'u';
process.env.N8N_PASSWORD = 'p';

const hash = new Map<string, string>();
let n8nUp = false;
const n8nCalls: { body: unknown; auth: string | null }[] = [];

globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = String(input);
  if (url.startsWith('https://fake-upstash.test')) {
    const run = (cmd: string[]) => {
      const [op, , ...args] = cmd;
      if (op === 'hset') { for (let i = 0; i < args.length; i += 2) hash.set(args[i], args[i + 1]); return args.length / 2; }
      if (op === 'hgetall') return [...hash].flat();
      if (op === 'hdel') { args.forEach((f) => hash.delete(f)); return args.length; }
      throw new Error('unexpected redis op ' + op);
    };
    const body = JSON.parse(String(init!.body));
    // The client auto-pipelines: /pipeline takes [[cmd...], ...] and returns [{result}, ...].
    const out = Array.isArray(body[0]) ? body.map((c: string[]) => ({ result: run(c) })) : { result: run(body) };
    return new Response(JSON.stringify(out), { status: 200 });
  }
  if (url.startsWith('https://fake-n8n.test')) {
    n8nCalls.push({ body: init!.body, auth: new Headers(init!.headers).get('authorization') });
    return n8nUp
      ? new Response(JSON.stringify({ ok: 1 }), { status: 200 })
      : new Response('{"code":503,"message":"Database is not ready!"}', { status: 503 });
  }
  throw new Error('unexpected fetch ' + url);
}) as typeof fetch;

const q = await import(new URL('../src/lib/n8n-queue.ts', import.meta.url).href);
const file = new File([Buffer.from('hello pdf')], 'brief.pdf', { type: 'application/pdf' });
const sub = { target: 'N8N_LEAD_WEBHOOK_URL', kind: 'form', fields: { fullName: 'Test', email: 't@x.com' }, files: await q.toQueuedFiles([file]) };

// 1. n8n down -> queued, visitor gets a truthy data object
assert.deepEqual(await q.deliverToN8n(sub), { queued: true });
assert.equal(hash.size, 1);
assert.ok(!JSON.stringify([...hash.values()]).includes('"u"'), 'credentials must not be queued');

// 2. retry while still down -> nothing removed
assert.deepEqual(await q.retryQueued(), { sent: 0, remaining: 1 });
assert.equal(hash.size, 1);

// 3. n8n back -> delivered as multipart with the file under `data`, queue emptied
n8nUp = true;
assert.deepEqual(await q.retryQueued(), { sent: 1, remaining: 0 });
assert.equal(hash.size, 0);
const last = n8nCalls.at(-1)!;
assert.ok(last.body instanceof FormData);
const form = last.body as FormData;
assert.equal(form.get('fullName'), 'Test');
const sentFile = form.get('data') as File;
assert.equal(sentFile.name, 'brief.pdf');
assert.equal(Buffer.from(await sentFile.arrayBuffer()).toString(), 'hello pdf');
assert.equal(last.auth, 'Basic ' + Buffer.from('u:p').toString('base64'));

// 4. n8n up -> delivered directly, nothing queued
assert.deepEqual(await q.deliverToN8n(sub), { ok: 1 });
assert.equal(hash.size, 0);

// 5. oversized attachments are dropped from the queued copy, with a note
n8nUp = false;
const big = { ...sub, files: [{ name: 'huge.mov', type: 'video/quicktime', base64: 'A'.repeat(800_000) }] };
await q.deliverToN8n(big);
const queued = JSON.parse([...hash.values()][0]);
assert.equal(queued.files.length, 0);
assert.match(queued.fields.attachmentsDropped, /huge\.mov/);

console.log('n8n-queue self-check: all 5 scenarios passed');
