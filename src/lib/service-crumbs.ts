import { CASH_CRUMBS } from '../data/breadcrumbs';
import type { Crumb } from './schema';

export const serviceCrumbs = (service: { name: string }, path: string): Crumb[] => [
  ...CASH_CRUMBS,
  { label: service.name, path },
];
