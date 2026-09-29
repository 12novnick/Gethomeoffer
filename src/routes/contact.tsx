import type { MetaFunction } from 'react-router';
import { CONTACT_CRUMBS } from '../data/breadcrumbs';
import { PAGES } from '../data/pages';
import { breadcrumbSchema } from '../lib/schema';
import { seo } from '../lib/seo';
import { ContactPage } from '../pages/contact/ContactPage';

export const meta: MetaFunction = () => [
  ...seo({ ...PAGES['/contact/'], path: '/contact/' }),
  breadcrumbSchema(CONTACT_CRUMBS),
];

export default ContactPage;
