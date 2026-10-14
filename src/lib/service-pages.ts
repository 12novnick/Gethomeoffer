import { data } from 'react-router';
import { SERVICE_CONTENT } from '../data/service-content';
import { getService, servicePath } from '../data/service-list';
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
