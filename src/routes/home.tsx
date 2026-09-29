import type { MetaFunction } from 'react-router';
import { PAGES } from '../data/pages';
import { SITE_NAME, SITE_URL, seo } from '../lib/seo';
import { HomePage } from '../pages/home/HomePage';

export const meta: MetaFunction = () => [
  ...seo({ ...PAGES['/'], path: '/' }),
  {
    'script:ld+json': {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'Organization', '@id': `${SITE_URL}/#organization`, name: SITE_NAME, url: `${SITE_URL}/` },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          name: SITE_NAME,
          url: `${SITE_URL}/`,
          publisher: { '@id': `${SITE_URL}/#organization` },
        },
      ],
    },
  },
];

export default HomePage;
