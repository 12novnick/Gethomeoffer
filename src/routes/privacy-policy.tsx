import type { MetaFunction } from 'react-router';
import { isFinal, PRIVACY_POLICY } from '../data/legal';
import { PAGES } from '../data/pages';
import { breadcrumbSchema } from '../lib/schema';
import { seo } from '../lib/seo';
import { LegalPage } from '../pages/legal/LegalPage';

export const meta: MetaFunction = () => [
  ...seo({ ...PAGES[PRIVACY_POLICY.path], path: PRIVACY_POLICY.path, noindex: !isFinal(PRIVACY_POLICY) }),
  breadcrumbSchema([
    { label: 'Home', path: '/' },
    { label: PRIVACY_POLICY.title, path: PRIVACY_POLICY.path },
  ]),
];

export default function PrivacyPolicy() {
  return <LegalPage document={PRIVACY_POLICY} />;
}
