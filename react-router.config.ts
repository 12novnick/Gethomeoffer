import { copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { Config } from '@react-router/dev/config';
import { LOCATIONS } from './src/data/locations.ts';
import { PAGES } from './src/data/pages.ts';

const locationPaths = ['/we-buy-houses-cash/', '/real-estate-agent-program/'].flatMap((base) =>
  LOCATIONS.flatMap((state) => [
    `${base}${state.slug}/`,
    ...state.cities.map((city) => `${base}${state.slug}/${city.slug}/`),
  ]),
);

export default {
  appDirectory: 'src',
  ssr: false,
  prerender: {
    paths: [...Object.keys(PAGES), ...locationPaths, '/sitemap.xml', '/404'],
    concurrency: 8,
  },
  // Static hosts (Cloudflare included) serve /404.html with a 404 status for unknown URLs.
  async buildEnd({ reactRouterConfig }) {
    const client = join(reactRouterConfig.buildDirectory, 'client');
    await copyFile(join(client, '404', 'index.html'), join(client, '404.html'));
  },
} satisfies Config;
