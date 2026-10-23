export interface PageInfo {
  title: string;
  description: string;
  heading: string;
  /** ISO dates for WebPage schema. Change `modified` only when the page's content changes. */
  published?: string;
  modified?: string;
}

// Keys are canonical paths (always with a trailing slash). Every entry is prerendered and listed in the sitemap.
export const PAGES: Record<string, PageInfo> = {
  '/': {
    title: 'Get Home Offer | We Buy Houses',
    description:
      'We buy houses for cash, as-is, or help you sell on the open market with a real estate professional. Explore your options with Get Home Offer.',
    heading: 'Every property has a story.',
    published: '2026-09-29',
    modified: '2026-10-13',
  },
  '/services/': {
    title: 'Services: Cash Program & Real Estate Agent Program | Get Home Offer',
    description:
      'Your property, your options. Compare a direct cash sale with a traditional sale through a real estate professional.',
    heading: 'Your Property. Your Options.',
    published: '2026-09-29',
    modified: '2026-09-30',
  },
  '/we-buy-houses-cash/': {
    title: 'We Buy Houses | Get Your Free Offer',
    description:
      'We buy houses as-is for cash. Get your free, no-obligation offer with no repairs, no fees and no commissions. See how it works and where we buy.',
    heading: 'Discover What a Cash Sale Could Look Like In Our We Buy Houses Program',
    published: '2026-09-29',
    modified: '2026-10-15',
  },
  '/locations/': {
    title: 'Locations: Where We Buy Houses | Get Home Offer',
    description:
      'See where we buy houses for cash, including Milwaukee, Madison, San Diego and Cincinnati. Choose your city to learn more.',
    heading: 'Where We Buy Houses',
    published: '2026-10-06',
    modified: '2026-10-19',
  },
  '/real-estate-agent-program/': {
    title: 'Real Estate Agent Program: Sell on the Traditional Market | Get Home Offer',
    description:
      'Prefer the traditional market? Learn how the Real Estate Agent Program helps you explore connecting with a real estate professional.',
    heading: 'Explore a Different Way to Sell.',
    published: '2026-09-29',
    modified: '2026-09-30',
  },
  '/about/': {
    title: 'About Us | Get Home Offer',
    description: 'Why Get Home Offer exists, what we believe, and how we work with property owners.',
    heading: 'About Us',
    published: '2026-09-29',
    modified: '2026-10-23',
  },
  '/faq/': {
    title: 'Frequently Asked Questions | Get Home Offer',
    description: 'Answers to common questions about Get Home Offer, the Cash Program, the Real Estate Agent Program and where we operate.',
    heading: 'Frequently Asked Questions',
    published: '2026-09-29',
    modified: '2026-10-12',
  },
  '/contact/': {
    title: 'Contact Us | Get Home Offer',
    description: "Let's talk about your property. Ask about a cash offer or about exploring the Real Estate Agent Program.",
    heading: 'Get your free cash offer!',
    published: '2026-09-29',
    modified: '2026-10-12',
  },
  '/sitemap/': {
    title: 'Sitemap | Get Home Offer',
    description: 'Every page on Get Home Offer in one place: our programs, the cities where we buy houses, company information and legal pages.',
    heading: 'Sitemap',
    published: '2026-10-06',
    modified: '2026-10-12',
  },
  '/privacy-policy/': {
    title: 'Privacy Policy | Get Home Offer',
    description:
      'Read how Get Home Offer collects, uses, shares and protects the information you provide through Get Home Offer.',
    heading: 'Privacy Policy',
    published: '2026-09-29',
    modified: '2026-10-21',
  },
  '/terms/': {
    title: 'Terms & Conditions | Get Home Offer',
    description:
      'The terms and conditions that apply to using Get Home Offer, the Cash Program and the Real Estate Agent Program.',
    heading: 'Terms & Conditions',
    published: '2026-09-29',
    modified: '2026-10-21',
  },
};

export function normalizePath(pathname: string) {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function getPage(pathname: string): PageInfo | undefined {
  return PAGES[normalizePath(pathname)];
}
