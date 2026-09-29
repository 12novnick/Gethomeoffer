// The offer form isn't built yet; every "Get Your Offer" CTA points here so it changes in one place.
export const OFFER_PATH = '/contact/';

export const CASH_PATH = '/we-buy-houses-cash/';
export const AGENT_PATH = '/agent-program/';

// Program-specific CTAs pre-select the matching pathway on the contact page.
export const CASH_OFFER_PATH = '/contact/?path=cash';
export const AGENT_CONNECT_PATH = '/contact/?path=agent';

export const NAV_ITEMS = [
  { label: 'How It Works', path: '/how-it-works/' },
  { label: 'Services', path: '/services/' },
  { label: 'About Us', path: '/about/' },
  { label: 'FAQ', path: '/faq/' },
  { label: 'Contact', path: '/contact/' },
] as const;

export const LEGAL_ITEMS = [
  { label: 'Privacy Policy', path: '/privacy-policy/' },
  { label: 'Terms & Conditions', path: '/terms/' },
] as const;
