import { CASH_CRUMBS } from '../data/breadcrumbs';
import type { Crumb } from './schema';

type CrumbLink = { label: string; path: string };

export const groupCrumbs = (group: CrumbLink): Crumb[] => [...CASH_CRUMBS, group];

export const serviceCrumbs = (group: CrumbLink, service: { name: string }, path: string): Crumb[] => [
  ...groupCrumbs(group),
  { label: service.name, path },
];
