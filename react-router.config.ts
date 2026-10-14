import { copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Config } from '@react-router/dev/config';
import { CASH_STATES } from './src/data/locations.ts';
import { PAGES } from './src/data/pages.ts';
import { SERVICE_GROUPS, SERVICES } from './src/data/service-list.ts';
import { CITY_AREAS, areaPath, areasHubPath } from './src/data/location-areas.ts';

const locationPaths = CASH_STATES.flatMap((state) => state.cities.map((city) => `/we-buy-houses-cash/${state.slug}/${city.slug}/`));
const areaPaths = Object.entries(CITY_AREAS).flatMap(([cityKey, areas]) => [
  areasHubPath(cityKey),
  ...areas.map((area) => areaPath(cityKey, area.slug)),
]);
const servicePaths = [...SERVICE_GROUPS, ...SERVICES].map((item) => `/we-buy-houses-cash/${item.slug}/`);

export default {
  appDirectory: 'src',
  ssr: false,
  prerender: {
    paths: [...Object.keys(PAGES), ...servicePaths, ...locationPaths, ...areaPaths, '/sitemap.xml', '/404'],
    concurrency: 8,
  },
  // Static hosts (Cloudflare included) serve /404.html with a 404 status for unknown URLs.
  async buildEnd({ reactRouterConfig }) {
    const client = join(reactRouterConfig.buildDirectory, 'client');
    await copyFile(join(client, '404', 'index.html'), join(client, '404.html'));
  },
} satisfies Config;
