import type { MetaFunction } from 'react-router';
import { LOCATIONS } from '../data/locations';
import { PAGES } from '../data/pages';
import { AGENT_PROGRAM } from '../data/programs';
import { breadcrumbSchema, serviceSchema } from '../lib/schema';
import { seo } from '../lib/seo';
import { AGENT_CRUMBS } from '../data/breadcrumbs';
import { AgentProgramPage } from '../pages/programs/AgentProgramPage';

export const meta: MetaFunction = () => [
  ...seo({ ...PAGES[AGENT_PROGRAM.path], path: AGENT_PROGRAM.path }),
  breadcrumbSchema(AGENT_CRUMBS),
  serviceSchema({
    name: AGENT_PROGRAM.name,
    description: AGENT_PROGRAM.summary,
    path: AGENT_PROGRAM.path,
    areaServed: LOCATIONS.map((state) => state.name),
  }),
];

export default AgentProgramPage;
