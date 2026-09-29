import { data } from 'react-router';
import { LOCATION_CONTENT, type LocalContent, type ProgramId } from '../data/location-content';
import { LOCATIONS, getCityBySlug, getStateBySlug } from '../data/locations';
import { AGENT_PATH, CASH_PATH } from './site';

// Build-time only: imported by route loaders, never by components.

function contentFor(program: ProgramId, key: string): LocalContent {
  return LOCATION_CONTENT[program][key] ?? {};
}

export function isPublished(content: LocalContent) {
  return Boolean(content.intro?.length);
}

export function buildStatePage(program: ProgramId, stateSlug: string | undefined) {
  const state = getStateBySlug(stateSlug ?? '');
  if (!state) throw data(null, { status: 404 });

  const content = contentFor(program, state.slug);
  return {
    program,
    state: { name: state.name, abbr: state.abbr, slug: state.slug },
    cities: state.cities.map((city) => ({ name: city.name, slug: city.slug })),
    content,
    published: isPublished(content),
  };
}

export function buildCityPage(program: ProgramId, stateSlug: string | undefined, citySlug: string | undefined) {
  const state = getStateBySlug(stateSlug ?? '');
  const city = state && getCityBySlug(state.slug, citySlug ?? '');
  if (!state || !city) throw data(null, { status: 404 });

  const content = contentFor(program, `${state.slug}/${city.slug}`);
  return {
    program,
    state: { name: state.name, abbr: state.abbr, slug: state.slug },
    city: { name: city.name, slug: city.slug },
    otherCities: state.cities.filter((other) => other.slug !== city.slug).map((other) => ({ name: other.name, slug: other.slug })),
    content,
    published: isPublished(content),
  };
}

export type StatePageData = ReturnType<typeof buildStatePage>;
export type CityPageData = ReturnType<typeof buildCityPage>;

const PROGRAM_BASE: Record<ProgramId, string> = { cash: CASH_PATH, agent: AGENT_PATH };

export function publishedLocationPaths() {
  return (Object.keys(PROGRAM_BASE) as ProgramId[]).flatMap((program) =>
    LOCATIONS.flatMap((state) => {
      const paths: string[] = [];
      if (isPublished(contentFor(program, state.slug))) paths.push(`${PROGRAM_BASE[program]}${state.slug}/`);
      for (const city of state.cities) {
        if (isPublished(contentFor(program, `${state.slug}/${city.slug}`))) {
          paths.push(`${PROGRAM_BASE[program]}${state.slug}/${city.slug}/`);
        }
      }
      return paths;
    }),
  );
}
