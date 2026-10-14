import { data } from 'react-router';
import { LOCATION_CONTENT, type LocalContent, type ProgramId } from '../data/location-content';
import { CASH_STATE_SLUGS, LOCATIONS, getCityBySlug, getStateBySlug } from '../data/locations';
import { AGENT_PATH, CASH_PATH } from './site';

// Build-time only: imported by route loaders, never by components.

function contentFor(program: ProgramId, key: string): LocalContent {
  return LOCATION_CONTENT[program][key] ?? {};
}

export function isPublished(content: LocalContent) {
  return Boolean(content.intro?.length);
}

export function buildCityPage(program: ProgramId, stateSlug: string | undefined, citySlug: string | undefined) {
  const state = getStateBySlug(stateSlug ?? '');
  const city = state && getCityBySlug(state.slug, citySlug ?? '');
  if (!state || !city || !CASH_STATE_SLUGS.includes(state.slug)) throw data(null, { status: 404 });

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

export type CityPageData = ReturnType<typeof buildCityPage>;

const PROGRAM_BASE: Record<ProgramId, string> = { cash: CASH_PATH, agent: AGENT_PATH };

export function publishedLocationPaths() {
  return (Object.keys(PROGRAM_BASE) as ProgramId[]).flatMap((program) =>
    LOCATIONS.flatMap((state) => {
      const paths: string[] = [];
      for (const city of state.cities) {
        if (isPublished(contentFor(program, `${state.slug}/${city.slug}`))) {
          paths.push(`${PROGRAM_BASE[program]}${state.slug}/${city.slug}/`);
        }
      }
      return paths;
    }),
  );
}

/** Published Cash Program city pages, for "Where we buy" links on service pages. */
export function publishedCashCities() {
  return LOCATIONS.flatMap((state) =>
    state.cities
      .filter((city) => CASH_STATE_SLUGS.includes(state.slug) && isPublished(contentFor('cash', `${state.slug}/${city.slug}`)))
      .map((city) => ({ name: city.name, stateName: state.name, stateAbbr: state.abbr, path: `${CASH_PATH}${state.slug}/${city.slug}/` })),
  );
}
