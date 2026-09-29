import { stateMeta } from '../lib/location-meta';
import { buildStatePage } from '../lib/location-pages';
import { StatePage } from '../pages/locations/StatePage';
import type { Route } from './+types/agent-state';

export const loader = ({ params }: Route.LoaderArgs) => buildStatePage('agent', params.state);

export const meta = ({ loaderData }: Route.MetaArgs) => stateMeta(loaderData);

export default function AgentState({ loaderData }: Route.ComponentProps) {
  return <StatePage page={loaderData} />;
}
