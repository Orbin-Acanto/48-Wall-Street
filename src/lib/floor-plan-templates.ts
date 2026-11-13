import { randomUUID } from 'crypto';
import { getRedis } from '@/lib/documents/signing-tokens';
import type { FloorKey, FloorPlanData } from '@/types/floorplan.types';
import emptyTemplate from '@/data/floor-plan-templates/empty-template.json';
import ilfaTemplate from '@/data/floor-plan-templates/ilfa.json';

/**
 * Staff floor-plan template library.
 *
 * Starter templates ship with the code (read-only). Templates staff save from
 * the editor live in one Redis hash, id → JSON record.
 */

export interface FloorPlanTemplate {
  id: string;
  name: string;
  floor: FloorKey;
  plan: FloorPlanData;
  builtIn?: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

const HASH = 'floorplan:templates';
const MAX_PLAN_BYTES = 900_000; // stays under Upstash's 1 MB request limit

const STARTERS: FloorPlanTemplate[] = [
  ['starter-empty', 'Empty Template', emptyTemplate],
  ['starter-ilfa', 'ILFA', ilfaTemplate],
].map(([id, name, plan]) => ({
  id: id as string,
  name: name as string,
  floor: 'grand-mezzanine',
  plan: plan as unknown as FloorPlanData,
  builtIn: true,
  createdBy: '48 Wall Street',
  updatedBy: '48 Wall Street',
  createdAt: '2026-11-13T00:00:00.000Z',
  updatedAt: '2026-11-13T00:00:00.000Z',
}));

function redisOrThrow() {
  const redis = getRedis();
  if (!redis) throw new Error('Template storage (Redis) is not configured.');
  return redis;
}

// @upstash/redis auto-parses JSON, but tolerate a raw string too.
const parse = (value: unknown) =>
  (typeof value === 'string' ? JSON.parse(value) : value) as FloorPlanTemplate;

export async function listTemplates(): Promise<FloorPlanTemplate[]> {
  // shortcut: loads every template in one call; page it if the library grows past a few hundred.
  const all = (await redisOrThrow().hgetall(HASH)) ?? {};
  const saved = Object.values(all)
    .map(parse)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return [...STARTERS, ...saved];
}

export async function getTemplate(id: string) {
  const starter = STARTERS.find((t) => t.id === id);
  if (starter) return starter;
  const raw = await redisOrThrow().hget(HASH, id);
  return raw ? parse(raw) : null;
}

/** Validates untrusted input; returns an error message or the clean fields. */
export function checkTemplateInput(
  body: unknown
): { error: string } | { name: string; floor: FloorKey; plan: FloorPlanData } {
  const { name, floor, plan } = (body ?? {}) as Record<string, unknown>;
  const cleanName = typeof name === 'string' ? name.trim() : '';
  if (!cleanName || cleanName.length > 120) {
    return { error: 'Give the template a name (up to 120 characters).' };
  }
  if (typeof floor !== 'string' || !/^[a-z0-9-]{1,40}$/.test(floor)) {
    return { error: 'Unknown floor.' };
  }
  // Same shape check as the editor's import (exportUtils is browser-only).
  const p = plan as Record<string, unknown> | null;
  if (
    !p ||
    typeof p !== 'object' ||
    !['walls', 'rooms', 'furniture'].every((k) => Array.isArray(p[k])) ||
    typeof p.canvasSettings !== 'object' ||
    typeof p.eventDetails !== 'object'
  ) {
    return { error: 'That is not a floor plan.' };
  }
  if (JSON.stringify(plan).length > MAX_PLAN_BYTES) {
    return { error: 'This floor plan is too large to save.' };
  }
  return {
    name: cleanName,
    floor: floor as FloorKey,
    plan: plan as FloorPlanData,
  };
}

export async function saveTemplate(
  input: { name: string; floor: FloorKey; plan: FloorPlanData },
  staff: string,
  id?: string
): Promise<FloorPlanTemplate | null> {
  const now = new Date().toISOString();
  const existing = id ? await getTemplate(id) : null;
  if (id && (!existing || existing.builtIn)) return null;

  const template: FloorPlanTemplate = {
    id: existing?.id ?? randomUUID(),
    name: input.name,
    floor: input.floor,
    plan: { ...input.plan, name: input.name },
    createdBy: existing?.createdBy ?? staff,
    createdAt: existing?.createdAt ?? now,
    updatedBy: staff,
    updatedAt: now,
  };
  await redisOrThrow().hset(HASH, { [template.id]: JSON.stringify(template) });
  return template;
}

/** True if a saved template was deleted. Starters cannot be deleted. */
export async function deleteTemplate(id: string) {
  if (STARTERS.some((t) => t.id === id)) return false;
  return (await redisOrThrow().hdel(HASH, id)) === 1;
}
