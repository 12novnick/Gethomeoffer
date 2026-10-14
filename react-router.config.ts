import { copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Config } from '@react-router/dev/config';
import { CASH_STATES } from './src/data/locations.ts';
import { PAGES } from './src/data/pages.ts';
import { SERVICES } from './src/data/service-list.ts';

const locationPaths = CASH_STATES.flatMap((state) => state.cities.map((city) => `/we-buy-houses-cash/${state.slug}/${city.slug}/`));
const servicePaths = SERVICES.map((service) => `/we-buy-houses-cash/${service.slug}/`);

export default {
  appDirectory: 'src',
  ssr: false,
  prerender: {
    paths: [...Object.keys(PAGES), ...servicePaths, ...locationPaths, '/sitemap.xml', '/404'],
    concurrency: 8,
  },
  // Static hosts (Cloudflare included) serve /404.html with a 404 status for unknown URLs.
  async buildEnd({ reactRouterConfig }) {
    const client = join(reactRouterConfig.buildDirectory, 'client');
    await copyFile(join(client, '404', 'index.html'), join(client, '404.html'));
  },
} satisfies Config;
