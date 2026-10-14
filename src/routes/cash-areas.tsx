import { Link } from 'react-router';
import { PageHero } from '../components/ui/PageHero';
import { LOCATIONS_CRUMB } from '../data/breadcrumbs';
import { CASH_PROGRAM } from '../data/programs';
import { buildAreasHub, type AreasHubData } from '../lib/location-pages';
import { breadcrumbSchema, type Crumb } from '../lib/schema';
import { seo } from '../lib/seo';
import { AreaCards } from '../pages/locations/LocationAreas';
import '../pages/services/ServicePage.css';
import type { Route } from './+types/cash-areas';

const crumbs = (page: AreasHubData): Crumb[] => [
  { label: 'Home', path: '/' },
  LOCATIONS_CRUMB,
  { label: page.city.name, path: page.city.path },
  { label: 'Areas', path: page.path },
];

export const loader = ({ params }: Route.LoaderArgs) => buildAreasHub(params.state, params.city);

export const meta = ({ loaderData }: Route.MetaArgs) => {
  if (!loaderData) return [];
  const { city, state, path } = loaderData;
  return [
    ...seo({
      title: `${city.name} Neighborhoods We Buy Houses In | Get Home Offer`,
      description: `We buy houses across ${city.name}, ${state.abbr}. Choose your neighborhood to see how selling your house for cash works there.`,
      path,
      published: '2026-10-14',
      modified: '2026-10-14',
    }),
    breadcrumbSchema(crumbs(loaderData)),
  ];
};

export default function CashAreas({ loaderData }: Route.ComponentProps) {
  const page = loaderData;
  return (
    <>
      <div className="container service-page__back">
        <Link to={page.city.path} className="arrow-link">
          <span aria-hidden="true">←</span> Back to We Buy Houses in {page.city.name}
        </Link>
      </div>
      <PageHero
        crumbs={crumbs(page)}
        title={`Areas We Serve in ${page.city.name}`}
        lede={`We buy houses across ${page.city.name}. Choose your neighborhood to see how selling works there.`}
        actions={
          <Link to={CASH_PROGRAM.cta.path} className="btn btn--primary">
            {CASH_PROGRAM.cta.label}
          </Link>
        }
      />
      <AreaCards city={page.city.name} areas={page.areas} />
    </>
  );
}
