import { SITEMAP_CRUMBS } from '../data/breadcrumbs';
import { CASH_STATES } from '../data/locations';
import { PAGES } from '../data/pages';
import { CASH_PATH } from '../lib/site';
import { publishedLocationPaths } from '../lib/location-pages';
import { breadcrumbSchema } from '../lib/schema';
import { seo } from '../lib/seo';
import { SitemapPage } from '../pages/sitemap/SitemapPage';
import type { Route } from './+types/sitemap-page';

// Runs at build time so the location list matches what is published, without shipping location content.
export function loader() {
  const published = new Set(publishedLocationPaths());
  return CASH_STATES.flatMap((state) => {
    const statePath = `${CASH_PATH}${state.slug}/`;
    const links = published.has(statePath) ? [{ label: `We Buy Houses in ${state.name}`, path: statePath }] : [];
    for (const city of state.cities) {
      const path = `${statePath}${city.slug}/`;
      if (published.has(path)) links.push({ label: `We Buy Houses in ${city.name}, ${state.abbr}`, path });
    }
    return links;
  });
}

export const meta = () => [...seo({ ...PAGES['/sitemap/'], path: '/sitemap/' }), breadcrumbSchema(SITEMAP_CRUMBS)];

export default function Sitemap({ loaderData }: Route.ComponentProps) {
  return <SitemapPage locationLinks={loaderData} />;
}
