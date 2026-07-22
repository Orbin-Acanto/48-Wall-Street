#!/usr/bin/env node
/**
 * Image optimizer for /public.
 *
 * Goal: shrink only the oversized images so pages load fast, with NO visible
 * quality loss. Already-optimized images are recorded in a manifest (keyed by
 * content hash) and skipped on future runs.
 *
 * What it does:
 *   - Walks the target dir (default: public) for .jpg/.jpeg/.png files.
 *   - Skips anything smaller than MIN_KB (those are already fine).
 *   - Re-encodes at high quality (JPEG mozjpeg q=QUALITY, 4:4:4 — no color loss;
 *     PNG max compression, lossless).
 *   - Downscales ONLY if the longest side is bigger than MAX_DIM (web never
 *     needs more; this is where the big wins come from). At 3000px it stays
 *     razor sharp even on retina / full-bleed heroes.
 *   - Writes the result in place ONLY if it is actually smaller; otherwise the
 *     original is left untouched.
 *   - Records every processed file in scripts/.image-optim-manifest.json so it
 *     is never re-optimized unless the file content changes.
 *
 * Usage:
 *   node scripts/optimize-images.mjs                 # optimize public/
 *   node scripts/optimize-images.mjs --dry           # report only, write nothing
 *   node scripts/optimize-images.mjs --dir public/gallery
 *   node scripts/optimize-images.mjs --min 1500      # only files > 1.5 MB
 *   node scripts/optimize-images.mjs --max-dim 2560  # cap longest side at 2560px
 *   node scripts/optimize-images.mjs --quality 90    # JPEG quality
 *   node scripts/optimize-images.mjs --force         # ignore manifest, redo all
 */

import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ---- Config (override via CLI flags) --------------------------------------
const args = process.argv.slice(2);
const getFlag = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : def;
};
const has = (name) => args.includes(`--${name}`);

const TARGET_DIR = path.resolve(ROOT, getFlag('dir', 'public'));
const MIN_KB = Number(getFlag('min', 800)); // only touch files bigger than this
const MAX_DIM = Number(getFlag('max-dim', 2560)); // cap longest side (px)
const QUALITY = Number(getFlag('quality', 88)); // JPEG quality (visually lossless)
const DRY_RUN = has('dry');
const FORCE = has('force');

const MANIFEST_PATH = path.join(__dirname, '.image-optim-manifest.json');
const EXTS = new Set(['.jpg', '.jpeg', '.png']);

// ---- Helpers --------------------------------------------------------------
const sha1 = (buf) => crypto.createHash('sha1').update(buf).digest('hex');
const kb = (bytes) => (bytes / 1024).toFixed(0);
const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);
const relKey = (abs) => path.relative(ROOT, abs).split(path.sep).join('/');

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (EXTS.has(path.extname(e.name).toLowerCase())) {
      out.push(full);
    }
  }
  return out;
}

async function loadManifest() {
  try {
    return JSON.parse(await fs.readFile(MANIFEST_PATH, 'utf8'));
  } catch {
    return {};
  }
}

async function reencode(absPath, ext) {
  const input = await fs.readFile(absPath);
  let pipeline = sharp(input, { failOn: 'none' }).rotate(); // bake EXIF orientation

  const meta = await sharp(input).metadata();
  const longest = Math.max(meta.width || 0, meta.height || 0);
  let resized = false;
  if (longest > MAX_DIM) {
    pipeline = pipeline.resize({
      width: meta.width >= meta.height ? MAX_DIM : undefined,
      height: meta.height > meta.width ? MAX_DIM : undefined,
      withoutEnlargement: true,
      fit: 'inside',
    });
    resized = true;
  }

  if (ext === '.png') {
    pipeline = pipeline.png({ compressionLevel: 9, effort: 10 }); // lossless
  } else {
    pipeline = pipeline.jpeg({
      quality: QUALITY,
      mozjpeg: true,
      chromaSubsampling: '4:4:4', // no color detail loss
    });
  }

  const output = await pipeline.toBuffer();
  return { input, output, resized, width: meta.width, height: meta.height };
}

// ---- Main -----------------------------------------------------------------
async function main() {
  console.log(`\n  Image optimizer`);
  console.log(
    `  dir=${relKey(TARGET_DIR)}  min=${MIN_KB}KB  max-dim=${MAX_DIM}px  quality=${QUALITY}${DRY_RUN ? '  [DRY RUN]' : ''}${FORCE ? '  [FORCE]' : ''}\n`
  );

  const manifest = await loadManifest();
  const files = await walk(TARGET_DIR);

  let processed = 0;
  let skippedSmall = 0;
  let skippedDone = 0;
  let savedBytes = 0;
  const changed = [];

  for (const abs of files) {
    const ext = path.extname(abs).toLowerCase();
    const key = relKey(abs);
    const stat = await fs.stat(abs);

    if (stat.size < MIN_KB * 1024) {
      skippedSmall++;
      continue;
    }

    const buf = await fs.readFile(abs);
    const hash = sha1(buf);

    if (!FORCE && manifest[key] && manifest[key].hash === hash) {
      skippedDone++;
      continue;
    }

    try {
      const { output, resized, width, height } = await reencode(abs, ext);
      const smaller = output.length < stat.size * 0.97; // must beat original by >3%

      if (smaller && !DRY_RUN) {
        const tmp = `${abs}.tmp-optim`;
        await fs.writeFile(tmp, output);
        await fs.rename(tmp, abs);
      }

      const finalBuf = smaller ? output : buf;
      const finalHash = smaller ? sha1(output) : hash;
      const finalSize = smaller ? output.length : stat.size;

      if (smaller) {
        savedBytes += stat.size - output.length;
        changed.push({
          key,
          before: stat.size,
          after: output.length,
          resized,
          dims: resized ? `${width}px→${MAX_DIM}px` : '',
        });
        console.log(
          `  ✓ ${key}\n      ${mb(stat.size)}MB → ${mb(output.length)}MB  (-${(((stat.size - output.length) / stat.size) * 100).toFixed(0)}%)${resized ? `  resized ${width}×${height}` : ''}`
        );
      } else {
        console.log(`  – ${key}  already efficient, left as-is`);
      }

      if (!DRY_RUN) {
        manifest[key] = {
          hash: finalHash,
          optimizedAt: new Date().toISOString(),
          originalBytes: stat.size,
          finalBytes: finalSize,
          resized,
        };
      }
      processed++;
    } catch (err) {
      console.error(`  ! ${key}  ERROR: ${err.message}`);
    }
  }

  if (!DRY_RUN) {
    await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  }

  console.log(`\n  ── Summary ─────────────────────────────`);
  console.log(`  optimized:        ${changed.length} file(s)`);
  console.log(`  processed:        ${processed} file(s)`);
  console.log(`  skipped (small):  ${skippedSmall}  (< ${MIN_KB}KB)`);
  console.log(`  skipped (done):   ${skippedDone}  (already in manifest)`);
  console.log(`  total saved:      ${mb(savedBytes)} MB`);
  if (DRY_RUN) console.log(`\n  DRY RUN — no files were written.`);
  console.log('');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
