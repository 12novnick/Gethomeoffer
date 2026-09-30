import type { Crumb } from '../lib/schema';
import { AGENT_PROGRAM, CASH_PROGRAM } from './programs';

const HOME: Crumb = { label: 'Home', path: '/' };

export const SERVICES_CRUMBS: Crumb[] = [HOME, { label: 'Services', path: '/services/' }];
export const ABOUT_CRUMBS: Crumb[] = [HOME, { label: 'About Us', path: '/about/' }];
export const FAQ_CRUMBS: Crumb[] = [HOME, { label: 'FAQ', path: '/faq/' }];
export const CONTACT_CRUMBS: Crumb[] = [HOME, { label: 'Contact', path: '/contact/' }];
export const CASH_CRUMBS: Crumb[] = [HOME, { label: CASH_PROGRAM.name, path: CASH_PROGRAM.path }];
export const AGENT_CRUMBS: Crumb[] = [HOME, { label: AGENT_PROGRAM.name, path: AGENT_PROGRAM.path }];
