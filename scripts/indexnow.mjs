#!/usr/bin/env node
// Sends every URL in the live sitemap to IndexNow (Bing, Yandex and others). Run after a deploy.
const host = 'www.48wallnyc.com';
const key = '39f4fa733735f6b720fa2712b0a20995';

const res = await fetch(`https://${host}/sitemap.xml`);
if (!res.ok) {
  console.error(`Could not read sitemap: HTTP ${res.status}`);
  process.exit(1);
}

const xml = await res.text();
const urlList = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map(
  (m) => m[1]
);
if (urlList.length === 0) {
  console.error('No URLs found in sitemap');
  process.exit(1);
}

const submit = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList,
  }),
});

console.log(`Submitted ${urlList.length} URLs: HTTP ${submit.status}`);
if (!submit.ok) {
  console.error(await submit.text());
  process.exit(1);
}
