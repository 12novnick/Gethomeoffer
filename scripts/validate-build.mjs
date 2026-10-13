// Fails the build when the prerendered site has SEO errors: broken internal links, orphan pages,
// missing/duplicate titles, missing canonicals, missing alt text, invalid JSON-LD or bad sitemap entries.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'build/client';
const ORIGIN = 'https://gethomeoffer.com';
const SKIP_FILES = new Set(['__spa-fallback.html', '404.html', path.join('404', 'index.html')]);
const errors = [];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

function toUrlPath(file) {
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  return '/' + rel.replace(/index\.html$/, '');
}

function exists(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  const target = path.join(ROOT, clean);
  if (clean.endsWith('/')) return fs.existsSync(path.join(target, 'index.html'));
  return fs.existsSync(target) && fs.statSync(target).isFile();
}

const pages = walk(ROOT)
  .filter((file) => file.endsWith('.html') && !SKIP_FILES.has(path.relative(ROOT, file)))
  .map((file) => {
    const html = fs.readFileSync(file, 'utf8');
    return {
      url: toUrlPath(file),
      html,
      title: html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim(),
      canonical: html.match(/<link rel="canonical" href="([^"]+)"/)?.[1],
      noindex: /<meta name="robots" content="[^"]*noindex/.test(html),
      links: [...html.matchAll(/<a [^>]*href="(\/[^"]*)"/g)].map((m) => m[1]).filter((href) => !href.startsWith('//')),
    };
  });

const titles = new Map();
const inbound = new Map();

for (const page of pages) {
  if (!page.title) errors.push(`${page.url}: missing <title>`);
  if (!page.noindex) {
    if (!page.canonical) errors.push(`${page.url}: missing canonical`);
    else if (page.canonical !== ORIGIN + page.url) errors.push(`${page.url}: canonical points to ${page.canonical}`);
    if (page.title) titles.set(page.title, [...(titles.get(page.title) ?? []), page.url]);
  }

  for (const img of page.html.match(/<img [^>]*>/g) ?? []) {
    if (!/\salt="/.test(img)) errors.push(`${page.url}: <img> without alt: ${img.slice(0, 80)}`);
  }

  for (const [, json] of page.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(json);
      if (!data['@context']) errors.push(`${page.url}: JSON-LD without @context`);
    } catch {
      errors.push(`${page.url}: JSON-LD does not parse`);
    }
  }

  for (const href of page.links) {
    const target = href.split(/[?#]/)[0];
    if (target.startsWith('/api/') || target.startsWith('/cdn-cgi/')) continue;
    if (!exists(target)) errors.push(`${page.url}: broken internal link ${href}`);
    if (target !== page.url) inbound.set(target, (inbound.get(target) ?? 0) + 1);
  }
}

for (const [title, urls] of titles) {
  if (urls.length > 1) errors.push(`duplicate title "${title}" on ${urls.join(', ')}`);
}

const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
for (const [, loc] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const urlPath = loc.replace(ORIGIN, '');
  const page = pages.find((p) => p.url === urlPath);
  if (!page) errors.push(`sitemap: ${loc} has no built page`);
  else if (page.noindex) errors.push(`sitemap: ${loc} is noindex`);
  else if (page.canonical !== loc) errors.push(`sitemap: ${loc} is not canonical`);
  if (urlPath !== '/' && !inbound.get(urlPath)) errors.push(`orphan page: ${loc} has no internal links pointing to it`);
}

if (errors.length) {
  console.error(`\nSEO validation failed (${errors.length}):\n- ${errors.join('\n- ')}\n`);
  process.exit(1);
}
console.log(`SEO validation passed: ${pages.length} pages checked.`);
