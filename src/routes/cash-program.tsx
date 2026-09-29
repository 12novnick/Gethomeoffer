import type { MetaFunction } from 'react-router';
import { LOCATIONS } from '../data/locations';
import { PAGES } from '../data/pages';
import { CASH_PROGRAM } from '../data/programs';
import { breadcrumbSchema, serviceSchema } from '../lib/schema';
import { seo } from '../lib/seo';
import { CASH_CRUMBS } from '../data/breadcrumbs';
import { CashProgramPage } from '../pages/programs/CashProgramPage';

export const meta: MetaFunction = () => [
  ...seo({ ...PAGES[CASH_PROGRAM.path], path: CASH_PROGRAM.path }),
  breadcrumbSchema(CASH_CRUMBS),
  serviceSchema({
    name: CASH_PROGRAM.name,
    description: CASH_PROGRAM.summary,
    path: CASH_PROGRAM.path,
    areaServed: LOCATIONS.map((state) => state.name),
  }),
];

export default CashProgramPage;
