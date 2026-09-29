import type { MetaFunction } from 'react-router';
import { ABOUT_CRUMBS } from '../data/breadcrumbs';
import { PAGES } from '../data/pages';
import { breadcrumbSchema } from '../lib/schema';
import { seo } from '../lib/seo';
import { AboutPage } from '../pages/about/AboutPage';

export const meta: MetaFunction = () => [...seo({ ...PAGES['/about/'], path: '/about/' }), breadcrumbSchema(ABOUT_CRUMBS)];

export default AboutPage;
