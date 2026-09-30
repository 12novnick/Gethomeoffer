export interface PageInfo {
  title: string;
  description: string;
  heading: string;
}

// Keys are canonical paths (always with a trailing slash). Every entry is prerendered and listed in the sitemap.
export const PAGES: Record<string, PageInfo> = {
  '/': {
    title: 'GetHomeOffer | Fast Solutions for Your Next Move',
    description:
      'Explore two ways to sell your property: a direct sale through our Cash Program, or the traditional market through our Real Estate Agent Program.',
    heading: 'Every property has a story.',
  },
  '/services/': {
    title: 'Services: Cash Program & Real Estate Agent Program | GetHomeOffer',
    description:
      'Your property, your options. Compare a direct cash sale with a traditional sale through a real estate professional.',
    heading: 'Your Property. Your Options.',
  },
  '/we-buy-houses-cash/': {
    title: 'We Buy Houses | A Simpler Way to Sell Your Home | GetHomeOffer',
    description:
      'Explore a direct sale and get a straightforward cash offer for your property. See how the Cash Program works and where we buy houses.',
    heading: 'Discover What a Cash Sale Could Look Like In Our We Buy Houses Program',
  },
  '/real-estate-agent-program/': {
    title: 'Real Estate Agent Program: Sell on the Traditional Market | GetHomeOffer',
    description:
      'Prefer the traditional market? Learn how the Real Estate Agent Program helps you explore connecting with a real estate professional.',
    heading: 'Explore a Different Way to Sell.',
  },
  '/about/': {
    title: 'About Us | GetHomeOffer',
    description: 'Why GetHomeOffer exists, what we believe, and how we work with property owners.',
    heading: 'About Us',
  },
  '/faq/': {
    title: 'Frequently Asked Questions | GetHomeOffer',
    description: 'Answers to common questions about GetHomeOffer, the Cash Program, the Real Estate Agent Program and where we operate.',
    heading: 'Frequently Asked Questions',
  },
  '/contact/': {
    title: 'Contact Us | GetHomeOffer',
    description: "Let's talk about your property. Ask about a cash offer or about exploring the Real Estate Agent Program.",
    heading: "Let's Talk About Your Property.",
  },
  '/privacy-policy/': {
    title: 'Privacy Policy | GetHomeOffer',
    description:
      'Read how GetHomeOffer collects, uses, shares and protects the information you provide through GetHomeOffer.com.',
    heading: 'Privacy Policy',
  },
  '/terms/': {
    title: 'Terms & Conditions | GetHomeOffer',
    description:
      'The terms and conditions that apply to using GetHomeOffer.com, the Cash Program and the Real Estate Agent Program.',
    heading: 'Terms & Conditions',
  },
};

export function normalizePath(pathname: string) {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function getPage(pathname: string): PageInfo | undefined {
  return PAGES[normalizePath(pathname)];
}
