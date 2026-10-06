import type { MetaDescriptor } from 'react-router';
import { LOCATIONS_CRUMB } from '../data/breadcrumbs';
import { LOCATION_LABELS } from '../data/location-labels';
import type { CityPageData, StatePageData } from './location-pages';
import { breadcrumbSchema, faqSchema, serviceSchema, type Crumb } from './schema';
import { seo } from './seo';

export function stateCrumbs(page: StatePageData | CityPageData): Crumb[] {
  const { program } = LOCATION_LABELS[page.program];
  return [
    { label: 'Home', path: '/' },
    LOCATIONS_CRUMB,
    { label: page.state.name, path: `${program.path}${page.state.slug}/` },
  ];
}

export function cityCrumbs(page: CityPageData): Crumb[] {
  return [...stateCrumbs(page), { label: page.city.name, path: `${stateCrumbs(page)[2].path}${page.city.slug}/` }];
}

export function stateMeta(page: StatePageData | undefined): MetaDescriptor[] {
  if (!page) return [];
  const labels = LOCATION_LABELS[page.program];
  const crumbs = stateCrumbs(page);
  const description = page.content.metaDescription ?? page.content.summary ?? labels.stateDescription(page.state.name);
  return [
    ...seo({
      title: `${labels.stateTitle(page.state.name)} | GetHomeOffer`,
      description,
      path: crumbs[crumbs.length - 1].path,
      noindex: !page.published,
    }),
    breadcrumbSchema(crumbs),
    serviceSchema({
      name: labels.stateTitle(page.state.name),
      description,
      path: crumbs[crumbs.length - 1].path,
      areaServed: [page.state.name],
    }),
    ...(page.content.faqs?.length ? [faqSchema(page.content.faqs)] : []),
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
      title: page.content.metaTitle ?? `${labels.cityTitle(page.city.name, page.state.abbr)} | GetHomeOffer`,
      description,
      path: crumbs[crumbs.length - 1].path,
      noindex: !page.published,
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
