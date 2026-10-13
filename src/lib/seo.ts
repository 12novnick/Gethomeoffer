import type { MetaDescriptor } from 'react-router';
import { BUSINESS_ADDRESS, BUSINESS_GEO, COMPANY, SOCIAL_LINKS } from '../data/company';

// Production origin used for canonical URLs, Open Graph and the sitemap.
export const SITE_URL = 'https://gethomeoffer.com';
export const SITE_NAME = 'Get Home Offer';
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/images/og-default.jpg`,
  width: 1200,
  height: 630,
  alt: 'A family home on a quiet residential street.',
};

interface SeoInput {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  /** ISO dates (YYYY-MM-DD) for WebPage schema. Update `modified` only when the page content changes. */
  published?: string;
  modified?: string;
}

// The same business entity is emitted on every page so search engines and AI systems see one consistent graph.
const BUSINESS = {
  '@type': 'LocalBusiness',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/logo.png`,
  image: DEFAULT_OG_IMAGE.url,
  ...(COMPANY.phone && { telephone: COMPANY.phone }),
  ...(COMPANY.email && { email: COMPANY.email }),
  address: { '@type': 'PostalAddress', ...BUSINESS_ADDRESS },
  geo: { '@type': 'GeoCoordinates', ...BUSINESS_GEO },
  areaServed: { '@type': 'Country', name: 'United States' },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '09:00',
    closes: '21:00',
  },
  sameAs: SOCIAL_LINKS.map((item) => item.url),
};

export function seo({ title, description, path, noindex = false, published, modified }: SeoInput): MetaDescriptor[] {
  const url = `${SITE_URL}${path}`;
  const tags: MetaDescriptor[] = [
    { title },
    { name: 'description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: DEFAULT_OG_IMAGE.url },
    { property: 'og:image:width', content: String(DEFAULT_OG_IMAGE.width) },
    { property: 'og:image:height', content: String(DEFAULT_OG_IMAGE.height) },
    { property: 'og:image:alt', content: DEFAULT_OG_IMAGE.alt },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: DEFAULT_OG_IMAGE.url },
  ];

  if (noindex) {
    tags.push({ name: 'robots', content: 'noindex' });
  } else {
    tags.push({ tagName: 'link', rel: 'canonical', href: url }, { property: 'og:url', content: url });
  }

  tags.push({
    'script:ld+json': {
      '@context': 'https://schema.org',
      '@graph': [
        BUSINESS,
        {
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: title,
          description,
          isPartOf: { '@id': WEBSITE_ID },
          about: { '@id': ORGANIZATION_ID },
          ...(published && { datePublished: published }),
          ...(modified && { dateModified: modified }),
        },
      ],
    },
  });

  return tags;
}
