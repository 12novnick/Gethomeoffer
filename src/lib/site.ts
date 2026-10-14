// Every "Get My Cash Offer" CTA points here so it changes in one place.
export const OFFER_PATH = '/contact/';

export const CASH_PATH = '/we-buy-houses-cash/';
export const AGENT_PATH = '/real-estate-agent-program/';

// Program-specific CTAs pre-select the matching pathway on the contact page.
export const CASH_OFFER_PATH = '/contact/?path=cash';
export const AGENT_CONNECT_PATH = '/contact/?path=agent';

// Top-level menu. Items with a `menu` open a dropdown; none of them link to city-specific service pages.
export const NAV_ITEMS: { label: string; path: string; menu?: 'services' | 'locations' }[] = [
  { label: 'We Buy Houses', path: CASH_PATH, menu: 'services' },
  { label: 'Sell With an Agent', path: AGENT_PATH },
  { label: 'Locations', path: '/locations/', menu: 'locations' },
  { label: 'About', path: '/about/' },
  { label: 'FAQ', path: '/faq/' },
];

export const LEGAL_ITEMS = [
  { label: 'Privacy Policy', path: '/privacy-policy/' },
  { label: 'Terms & Conditions', path: '/terms/' },
] as const;
