import { AGENT_CONNECT_PATH, AGENT_PATH, CASH_OFFER_PATH, CASH_PATH } from '../lib/site';
import { IMAGES, type ImageAsset } from './images';

export interface ContentItem {
  title: string;
  body?: string;
}

export interface Program {
  id: 'cash' | 'agent';
  name: string;
  path: string;
  kicker: string;
  summary: string;
  exploreLabel: string;
  cta: { label: string; path: string };
  image: ImageAsset;
  bestFor: string[];
  steps: ContentItem[];
}

// Draft copy. Statements about process and property types must be confirmed by the business before launch.
export const CASH_PROGRAM: Program = {
  id: 'cash',
  name: 'We Buy Houses Cash',
  path: CASH_PATH,
  kicker: 'Direct sale',
  summary: 'Explore a direct sale and get a straightforward offer for your property.',
  exploreLabel: 'Explore the Cash Program',
  cta: { label: 'Get My Cash Offer', path: CASH_OFFER_PATH },
  image: IMAGES.programCash,
  bestFor: [
    'You value certainty and a simple process',
    'The property needs work you would rather not take on',
    'You are working toward a specific timeline',
  ],
  steps: [
    { title: 'Tell us about the property.', body: 'Share the address and a few details about the home and your situation.' },
    { title: 'Evaluation.', body: "We review the property's details, condition and local market." },
    { title: 'Your offer.', body: 'We present a straightforward offer and explain how we arrived at it.' },
    { title: 'Your decision.', body: 'Take the time you need. You are never obligated to accept.' },
    { title: 'Closing.', body: 'If you move forward, we work toward a closing date that fits your plans.' },
  ],
};

export const AGENT_PROGRAM: Program = {
  id: 'agent',
  name: 'Agent Program',
  path: AGENT_PATH,
  kicker: 'Traditional market',
  summary: 'Prefer the traditional market? Explore connecting with a real estate professional.',
  exploreLabel: 'Explore the Agent Program',
  cta: { label: 'Connect With an Agent', path: AGENT_CONNECT_PATH },
  image: IMAGES.programAgent,
  bestFor: [
    "You'd like to see what the open market will offer",
    'The property is ready, or you are ready to prepare it',
    'You have flexibility on timing',
  ],
  steps: [
    { title: 'Tell us about the property.', body: 'Share the address and a few details about the home.' },
    { title: 'Understanding your situation.', body: 'We learn about your goals, timeline and what matters most to you.' },
    { title: 'Agent connection.', body: 'We help you explore connecting with a real estate professional in your area.' },
    { title: 'Listing.', body: 'Your agent guides pricing, preparation and marketing, and brings the home to market.' },
    { title: 'Sale.', body: 'Your agent helps you review offers, negotiate and move through to closing.' },
  ],
};

export const PROGRAMS = [CASH_PROGRAM, AGENT_PROGRAM];

export const CASH_AUDIENCE: ContentItem[] = [
  { title: 'Inheriting a property', body: 'Managing an estate, or a home you do not plan to keep.' },
  { title: 'Facing significant repairs', body: 'Work you would rather not fund or manage before selling.' },
  { title: 'Relocating on a timeline', body: 'A move that needs a clear plan for the property left behind.' },
  { title: 'Stepping back from renting', body: 'A rental you are ready to move on from.' },
  { title: 'Holding a vacant property', body: 'A home sitting empty while costs continue.' },
  { title: 'Avoiding showings', body: 'You would rather not prepare for open houses and repeated visits.' },
];

export const CASH_PROPERTY_TYPES: ContentItem[] = [
  { title: 'Single-family homes' },
  { title: 'Condos and townhomes' },
  { title: 'Small multi-family (2–4 units)' },
  { title: 'Inherited and estate properties' },
  { title: 'Vacant properties' },
  { title: 'Homes needing repairs' },
  { title: 'Rental properties' },
];

export type AgentTopic = 'pricing' | 'preparation' | 'marketing' | 'showings' | 'negotiation' | 'closing';

export const AGENT_HELP_AREAS: (ContentItem & { id: AgentTopic })[] = [
  { id: 'pricing', title: 'Pricing', body: 'Reviewing comparable sales and market conditions to recommend a list price.' },
  { id: 'preparation', title: 'Preparation', body: 'Advising on repairs, staging and presentation worth doing before listing.' },
  { id: 'marketing', title: 'Marketing', body: 'Photography, listing details and getting the home in front of buyers.' },
  { id: 'showings', title: 'Showings', body: 'Coordinating visits and open houses, and gathering buyer feedback.' },
  { id: 'negotiation', title: 'Negotiation', body: 'Reviewing offers, terms and contingencies, and negotiating on your behalf.' },
  { id: 'closing', title: 'Closing', body: 'Keeping inspections, appraisal and paperwork moving toward closing day.' },
];

export interface ComparisonRow {
  label: string;
  cash: string;
  agent: string;
}

export const PROGRAM_COMPARISON: ComparisonRow[] = [
  { label: 'How you sell', cash: 'Directly, without listing', agent: 'Listed on the open market' },
  { label: 'Showings', cash: 'Not part of the process', agent: 'Usually part of the process' },
  { label: 'Preparing the home', cash: 'Considered in its current condition', agent: 'Preparation and repairs are common' },
  { label: 'Timeline', cash: 'Discussed around your needs', agent: 'Depends on the market and the buyer' },
  { label: 'Price', cash: 'A straightforward offer', agent: 'Set by market demand' },
];
