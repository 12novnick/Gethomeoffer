import { data } from 'react-router';
import { SERVICE_CONTENT } from '../data/service-content';
import { SERVICE_GROUPS, SERVICES, getService, servicePath } from '../data/service-list';
import { publishedCashCities } from './location-pages';

// Build-time only: imported by the service route loader, so page copy never ships in the JS bundle.
export function buildServicePage(slug: string | undefined) {
  const service = getService(slug ?? '');
  const content = service && SERVICE_CONTENT[service.slug];
  if (!service || !content) throw data(null, { status: 404 });

  return {
    service,
    path: servicePath(service.slug),
    content,
    related: content.related.flatMap((relatedSlug) => {
      const related = getService(relatedSlug);
      return related ? [{ name: related.name, path: servicePath(related.slug) }] : [];
    }),
    cities: publishedCashCities(),
  };
}

export type ServicePageData = ReturnType<typeof buildServicePage>;

/** Card data for the services hub: every service grouped, with its one-line summary. */
export function buildServiceCards() {
  return SERVICE_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
    services: SERVICES.filter((service) => service.group === group.id).map((service) => ({
      name: service.name,
      path: servicePath(service.slug),
      summary: SERVICE_CONTENT[service.slug].summary,
    })),
  }));
}

export type ServiceCardGroup = ReturnType<typeof buildServiceCards>[number];
