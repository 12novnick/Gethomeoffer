import type { MetaFunction } from 'react-router';
import { PAGES } from '../data/pages';
import { breadcrumbSchema } from '../lib/schema';
import { seo } from '../lib/seo';
import { SERVICES_CRUMBS } from '../data/breadcrumbs';
import { ServicesPage } from '../pages/services/ServicesPage';

export const meta: MetaFunction = () => [
  ...seo({ ...PAGES['/services/'], path: '/services/' }),
  breadcrumbSchema(SERVICES_CRUMBS),
];

export default ServicesPage;
