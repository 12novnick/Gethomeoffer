import { cityMeta } from '../lib/location-meta';
import { buildCityPage } from '../lib/location-pages';
import { CityPage } from '../pages/locations/CityPage';
import type { Route } from './+types/cash-city';

export const loader = ({ params }: Route.LoaderArgs) => buildCityPage('cash', params.state, params.city);

export const meta = ({ loaderData }: Route.MetaArgs) => cityMeta(loaderData);

export default function CashCity({ loaderData }: Route.ComponentProps) {
  return <CityPage page={loaderData} />;
}
