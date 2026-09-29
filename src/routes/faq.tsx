import type { MetaFunction } from 'react-router';
import { FAQ_CRUMBS } from '../data/breadcrumbs';
import { FAQ_CATEGORIES } from '../data/faq';
import { PAGES } from '../data/pages';
import { breadcrumbSchema, faqSchema } from '../lib/schema';
import { seo } from '../lib/seo';
import { FaqPage } from '../pages/faq/FaqPage';

export const meta: MetaFunction = () => [
  ...seo({ ...PAGES['/faq/'], path: '/faq/' }),
  breadcrumbSchema(FAQ_CRUMBS),
  faqSchema(FAQ_CATEGORIES.flatMap((category) => category.faqs)),
];

export default FaqPage;
