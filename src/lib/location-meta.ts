import type { MetaDescriptor } from 'react-router';
import { LOCATIONS_CRUMB } from '../data/breadcrumbs';
import { LOCATION_LABELS } from '../data/location-labels';
import type { CityPageData } from './location-pages';
import { breadcrumbSchema, faqSchema, serviceSchema, type Crumb } from './schema';
import { seo } from './seo';

// No state pages: city breadcrumbs go Home > Locations > City.
export function cityCrumbs(page: CityPageData): Crumb[] {
  const { program } = LOCATION_LABELS[page.program];
  return [
    { label: 'Home', path: '/' },
    LOCATIONS_CRUMB,
    { label: page.city.name, path: `${program.path}${page.state.slug}/${page.city.slug}/` },
  ];
}

export function cityMeta(page: CityPageData | undefined): MetaDescriptor[] {
  if (!page) return [];
  const labels = LOCATION_LABELS[page.program];
  const crumbs = cityCrumbs(page);
  const description =
    page.content.metaDescription ?? page.content.summary ?? labels.cityDescription(page.city.name, page.state.abbr);
  return [
    ...seo({
      title: page.content.metaTitle ?? `${labels.cityTitle(page.city.name, page.state.abbr)} | Get Home Offer`,
      description,
      path: crumbs[crumbs.length - 1].path,
      noindex: !page.published,
      published: page.content.published,
      modified: page.content.modified,
    }),
    breadcrumbSchema(crumbs),
    serviceSchema({
      name: labels.cityTitle(page.city.name, page.state.abbr),
      description,
      path: crumbs[crumbs.length - 1].path,
      areaServed: [`${page.city.name}, ${page.state.name}`],
      areaType: 'City',
    }),
    ...(page.content.faqs?.length ? [faqSchema(page.content.faqs)] : []),
  ];
}
