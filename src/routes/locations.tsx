import type { MetaFunction } from 'react-router';
import { LOCATIONS_CRUMBS } from '../data/breadcrumbs';
import { PAGES } from '../data/pages';
import { breadcrumbSchema } from '../lib/schema';
import { seo } from '../lib/seo';
import { LocationsPage } from '../pages/locations/LocationsPage';

export const meta: MetaFunction = () => [
  ...seo({ ...PAGES['/locations/'], path: '/locations/' }),
  breadcrumbSchema(LOCATIONS_CRUMBS),
];

export default LocationsPage;
