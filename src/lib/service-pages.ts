import { data } from 'react-router';
import { GROUP_CONTENT, SERVICE_CONTENT } from '../data/service-content';
import {
  SERVICE_GROUPS,
  SERVICES,
  getGroup,
  getGroupBySlug,
  getService,
  groupPath,
  servicePath,
  type ServiceGroup,
} from '../data/service-list';
import { publishedCashCities } from './location-pages';

// Build-time only: imported by route loaders, so page copy never ships in the JS bundle.

function cardsFor(groupId: ServiceGroup) {
  return SERVICES.filter((service) => service.group === groupId).map((service) => ({
    name: service.name,
    path: servicePath(service.slug),
    summary: SERVICE_CONTENT[service.slug].summary,
  }));
}

function buildService(slug: string) {
  const service = getService(slug);
  const content = service && SERVICE_CONTENT[service.slug];
  if (!service || !content) return null;
  const group = getGroup(service.group);
  return {
    kind: 'service' as const,
    service,
    group: { label: group.label, path: groupPath(group.slug) },
    path: servicePath(service.slug),
    content,
    cities: publishedCashCities(),
  };
}

function buildGroup(slug: string) {
  const group = getGroupBySlug(slug);
  if (!group) return null;
  return {
    kind: 'group' as const,
    group,
    path: groupPath(group.slug),
    content: GROUP_CONTENT[group.id],
    services: cardsFor(group.id),
    otherGroups: SERVICE_GROUPS.filter((other) => other.id !== group.id).map((other) => ({
      label: other.label,
      path: groupPath(other.slug),
    })),
    cities: publishedCashCities(),
  };
}

/** One route serves both /we-buy-houses-cash/<service>/ and the group hubs /we-buy-houses-cash/<group>/. */
export function buildServiceRoute(slug: string | undefined) {
  const page = buildService(slug ?? '') ?? buildGroup(slug ?? '');
  if (!page) throw data(null, { status: 404 });
  return page;
}

export type ServicePageData = NonNullable<ReturnType<typeof buildService>>;
export type GroupPageData = NonNullable<ReturnType<typeof buildGroup>>;

/** Card data for the services hub: every service grouped, with its one-line summary. */
export function buildServiceCards() {
  return SERVICE_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
    path: groupPath(group.slug),
    services: cardsFor(group.id),
  }));
}

export type ServiceCardGroup = ReturnType<typeof buildServiceCards>[number];
