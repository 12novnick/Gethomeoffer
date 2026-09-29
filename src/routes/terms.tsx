import type { MetaFunction } from 'react-router';
import { isFinal, TERMS } from '../data/legal';
import { PAGES } from '../data/pages';
import { breadcrumbSchema } from '../lib/schema';
import { seo } from '../lib/seo';
import { LegalPage } from '../pages/legal/LegalPage';

export const meta: MetaFunction = () => [
  ...seo({ ...PAGES[TERMS.path], path: TERMS.path, noindex: !isFinal(TERMS) }),
  breadcrumbSchema([
    { label: 'Home', path: '/' },
    { label: TERMS.title, path: TERMS.path },
  ]),
];

export default function Terms() {
  return <LegalPage document={TERMS} />;
}
