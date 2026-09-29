import type { MetaDescriptor } from 'react-router';
import { SITE_NAME, SITE_URL } from './seo';

export interface Crumb {
  label: string;
  path: string;
}

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function breadcrumbSchema(crumbs: Crumb[]): MetaDescriptor {
  return {
    'script:ld+json': {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.label,
        item: `${SITE_URL}${crumb.path}`,
      })),
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]): MetaDescriptor {
  return {
    'script:ld+json': {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  };
}

interface ServiceSchemaInput {
  name: string;
  description: string;
  path: string;
  areaServed: string[];
  areaType?: 'State' | 'City';
}

export function serviceSchema({ name, description, path, areaServed, areaType = 'State' }: ServiceSchemaInput): MetaDescriptor {
  return {
    'script:ld+json': {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name,
      description,
      url: `${SITE_URL}${path}`,
      serviceType: 'Real estate',
      provider: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: SITE_NAME },
      areaServed: areaServed.map((area) => ({ '@type': areaType, name: area })),
    },
  };
}
