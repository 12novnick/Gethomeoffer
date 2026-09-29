import type { MetaFunction } from 'react-router';
import { HOW_IT_WORKS_CRUMBS } from '../data/breadcrumbs';
import { PAGES } from '../data/pages';
import { breadcrumbSchema } from '../lib/schema';
import { seo } from '../lib/seo';
import { HowItWorksPage } from '../pages/how-it-works/HowItWorksPage';

export const meta: MetaFunction = () => [
  ...seo({ ...PAGES['/how-it-works/'], path: '/how-it-works/' }),
  breadcrumbSchema(HOW_IT_WORKS_CRUMBS),
];

export default HowItWorksPage;
