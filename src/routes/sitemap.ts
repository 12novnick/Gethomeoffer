import { isDraftLegalPath } from '../data/legal';
import { PAGES } from '../data/pages';
import { publishedLocationPaths } from '../lib/location-pages';
import { SITE_URL } from '../lib/seo';

// Location pages are listed only once they have localized content (see isPublished).
export function loader() {
  const urls = [...Object.keys(PAGES).filter((path) => !isDraftLegalPath(path)), ...publishedLocationPaths()]
    .map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
