import type { MetaDescriptor } from 'react-router';

// Production origin used for canonical URLs, Open Graph and the sitemap.
export const SITE_URL = 'https://gethomeoffer.com';
export const SITE_NAME = 'GetHomeOffer';

interface SeoInput {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

export function seo({ title, description, path, noindex = false }: SeoInput): MetaDescriptor[] {
  const url = `${SITE_URL}${path}`;
  const tags: MetaDescriptor[] = [
    { title },
    { name: 'description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ];

  if (noindex) {
    tags.push({ name: 'robots', content: 'noindex' });
  } else {
    tags.push({ tagName: 'link', rel: 'canonical', href: url }, { property: 'og:url', content: url });
  }

  return tags;
}
