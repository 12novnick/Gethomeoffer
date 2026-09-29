import { stateMeta } from '../lib/location-meta';
import { buildStatePage } from '../lib/location-pages';
import { StatePage } from '../pages/locations/StatePage';
import type { Route } from './+types/cash-state';

export const loader = ({ params }: Route.LoaderArgs) => buildStatePage('cash', params.state);

export const meta = ({ loaderData }: Route.MetaArgs) => stateMeta(loaderData);

export default function CashState({ loaderData }: Route.ComponentProps) {
  return <StatePage page={loaderData} />;
}
