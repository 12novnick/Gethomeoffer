import { cityMeta } from '../lib/location-meta';
import { buildCityPage } from '../lib/location-pages';
import { CityPage } from '../pages/locations/CityPage';
import type { Route } from './+types/agent-city';

export const loader = ({ params }: Route.LoaderArgs) => buildCityPage('agent', params.state, params.city);

export const meta = ({ loaderData }: Route.MetaArgs) => cityMeta(loaderData);

export default function AgentCity({ loaderData }: Route.ComponentProps) {
  return <CityPage page={loaderData} />;
}
