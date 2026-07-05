#!/usr/bin/env node
/**
 * Orphan finder for /public.
 *
 * Finds files in public/ that are never referenced anywhere in the codebase,
 * so they can be safely deleted. Because assets are sometimes referenced by a
 * dynamically-built path (e.g. `/catering/${id}.jpg`), this script is
 * deliberately conservative and sorts every public file into three buckets:
 *
 *   referenced  – its web path ("/gallery/x.jpg") appears in the source.  KEEP.
 *   uncertain   – the web path is NOT found, but the bare filename ("x.jpg")
 *                 appears somewhere. Could be a dynamic reference. KEPT by
 *                 default; only removed with --include-uncertain.
 *   orphan      – neither the path nor the filename appears anywhere.  DELETE.
 *
 * The "haystack" it searches is every text file in the repo (src, config, and
 * even other files inside public such as .html/.css/.svg, so intra-public
 * references are honored), excluding node_modules/.next/.git.
 *
 * SAFE BY DEFAULT: reports only. Pass --delete to actually remove orphans.
 *
 * Usage:
 *   node scripts/find-orphans.mjs                    # report (no deletion)
 *   node scripts/find-orphans.mjs --delete           # delete the "orphan" bucket
 *   node scripts/find-orphans.mjs --delete --include-uncertain
 *   node scripts/find-orphans.mjs --dir public/gallery
 *   node scripts/find-orphans.mjs --json             # machine-readable output
 */

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const has = (n) => args.includes(`--${n}`);
const getFlag = (n, def) => {
  const i = args.indexOf(`--${n}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : def;
};

const PUBLIC_DIR = path.resolve(ROOT, 'public');
const TARGET_DIR = path.resolve(ROOT, getFlag('dir', 'public'));
const DO_DELETE = has('delete');
const INCLUDE_UNCERTAIN = has('include-uncertain');
const AS_JSON = has('json');

// Directories never traversed when building the source haystack.
const IGNORE_DIRS = new Set(['node_modules', '.next', '.git', '.turbo', 'dist']);

// Text file types that may reference an asset.
const TEXT_EXTS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.json', '.css', '.scss',
  '.md', '.mdx', '.html', '.htm', '.xml', '.svg', '.txt', '.webmanifest',
  '.yml', '.yaml',
]);

// Files/patterns under public that Next.js or crawlers use implicitly and must
// never be flagged, even though nothing "imports" them.
const ALWAYS_KEEP = [
  /^favicon\.ico$/i,
  /^icon\.(png|svg|ico)$/i,
  /^apple-icon\.png$/i,
  /^apple-touch-icon.*\.png$/i,
  /^android-chrome.*\.png$/i,
  /^robots\.txt$/i,
  /^llms\.txt$/i,
  /^ads\.txt$/i,
  /^security\.txt$/i,
  /^humans\.txt$/i,
  /^sitemap.*\.xml$/i,
  /^manifest\.(json|webmanifest)$/i,
  /^site\.webmanifest$/i,
  /^browserconfig\.xml$/i,
  /^og-.*\.(jpg|jpeg|png|webp)$/i,
  /^twitter-.*\.(jpg|jpeg|png|webp)$/i,
];

// Skip reading giant files into the haystack (lockfiles etc.).
const MAX_TEXT_BYTES = 5 * 1024 * 1024;

const rel = (abs) => path.relative(ROOT, abs).split(path.sep).join('/');
const webPath = (abs) =>
  '/' + path.relative(PUBLIC_DIR, abs).split(path.sep).join('/');
const isKept = (base) => ALWAYS_KEEP.some((re) => re.test(base));

async function walk(dir, { textOnly = false } = {}) {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    if (e.isDirectory()) {
      if (IGNORE_DIRS.has(e.name)) continue;
      out.push(...(await walk(path.join(dir, e.name), { textOnly })));
    } else {
      const full = path.join(dir, e.name);
      if (textOnly && !TEXT_EXTS.has(path.extname(e.name).toLowerCase())) continue;
      out.push(full);
    }
  }
  return out;
}

async function buildHaystack() {
  const files = await walk(ROOT, { textOnly: true });
  const parts = [];
  for (const f of files) {
    // Skip this script itself so its example paths don't count as references.
    if (path.resolve(f) === path.resolve(fileURLToPath(import.meta.url))) continue;
    try {
      const stat = await fs.stat(f);
      if (stat.size > MAX_TEXT_BYTES) continue;
      parts.push((await fs.readFile(f, 'utf8')).toLowerCase());
    } catch {
      /* ignore unreadable */
    }
  }
  return parts.join('\n');
}

async function removeEmptyDirs(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (e.isDirectory()) await removeEmptyDirs(path.join(dir, e.name));
  }
  try {
    const after = await fs.readdir(dir);
    if (after.length === 0 && path.resolve(dir) !== PUBLIC_DIR) {
      await fs.rmdir(dir);
      console.log(`  🗑  removed empty dir  ${rel(dir)}`);
    }
  } catch {
    /* ignore */
  }
}

async function main() {
  console.log(`\n  Orphan finder`);
  console.log(
    `  scanning ${rel(TARGET_DIR)}${DO_DELETE ? '' : '   [REPORT ONLY — pass --delete to remove]'}\n`
  );

  const haystack = await buildHaystack();
  const publicFiles = await walk(TARGET_DIR);

  const referenced = [];
  const uncertain = [];
  const orphans = [];

  for (const abs of publicFiles) {
    const base = path.basename(abs).toLowerCase();
    if (isKept(base)) {
      referenced.push(rel(abs));
      continue;
    }
    const wp = webPath(abs).toLowerCase();
    if (haystack.includes(wp)) {
      referenced.push(rel(abs));
    } else if (haystack.includes(base)) {
      uncertain.push(rel(abs));
    } else {
      orphans.push(rel(abs));
    }
  }

  if (AS_JSON) {
    console.log(JSON.stringify({ referenced, uncertain, orphans }, null, 2));
    return;
  }

  const bytesOf = async (list) => {
    let n = 0;
    for (const r of list) {
      try {
        n += (await fs.stat(path.join(ROOT, r))).size;
      } catch {
        /* ignore */
      }
    }
    return n;
  };

  if (uncertain.length) {
    console.log(`  ── UNCERTAIN (filename seen, path not — kept unless --include-uncertain) ──`);
    uncertain.forEach((r) => console.log(`     ? ${r}`));
    console.log('');
  }

  console.log(`  ── ORPHANS (no reference found) ──`);
  if (orphans.length === 0) console.log(`     none 🎉`);
  else orphans.forEach((r) => console.log(`     ✗ ${r}`));

  const orphanBytes = await bytesOf(orphans);
  const uncertainBytes = await bytesOf(uncertain);

  console.log(`\n  ── Summary ─────────────────────────────`);
  console.log(`  referenced:  ${referenced.length}`);
  console.log(`  uncertain:   ${uncertain.length}  (${(uncertainBytes / 1048576).toFixed(2)} MB)`);
  console.log(`  orphans:     ${orphans.length}  (${(orphanBytes / 1048576).toFixed(2)} MB)`);

  const toDelete = INCLUDE_UNCERTAIN ? [...orphans, ...uncertain] : orphans;

  if (!DO_DELETE) {
    console.log(
      `\n  REPORT ONLY. Re-run with --delete to remove ${toDelete.length} file(s)` +
        `${INCLUDE_UNCERTAIN ? ' (orphans + uncertain)' : ''}.\n`
    );
    return;
  }

  let deleted = 0;
  for (const r of toDelete) {
    try {
      await fs.unlink(path.join(ROOT, r));
      console.log(`  🗑  deleted  ${r}`);
      deleted++;
    } catch (e) {
      console.error(`  ! failed  ${r}: ${e.message}`);
    }
  }
  await removeEmptyDirs(TARGET_DIR);
  console.log(`\n  Deleted ${deleted} file(s).\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
