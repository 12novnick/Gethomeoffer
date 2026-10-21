export type ImageTone = 'dusk' | 'stone' | 'earth' | 'olive' | 'sand';

export interface ImageAsset {
  /** Leave undefined to render a placeholder. Set to a URL (e.g. '/images/hero.avif') when the photo is supplied. */
  src?: string;
  alt: string;
  /** Art direction for the photo this slot needs. Shown on the placeholder. */
  label: string;
  tone: ImageTone;
}

export const IMAGES = {
  heroHome: {
    src: '/images/hero-home.avif',
    alt: 'We buy houses like this family home on a quiet residential street.',
    label: 'Hero · Residential exterior at golden hour, wide, calm street',
    tone: 'dusk',
  },
  situationInherited: {
    src: '/images/situation-relocation.avif',
    alt: 'Blue and red doors.',
    label: 'Inherited · Blue and red doors',
    tone: 'sand',
  },
  situationRelocation: {
    src: '/images/situation-relocation.avif',
    alt: 'A moving box resting on the floor of a bright, empty room.',
    label: 'Relocation · Empty room, single moving box',
    tone: 'stone',
  },
  situationVacant: {
    alt: 'The front porch of a quiet, vacant house.',
    label: 'Vacant · Quiet porch or entry, no people',
    tone: 'olive',
  },
  situationRepairs: {
    alt: 'Weathered siding and an older window frame in need of repair.',
    label: 'Repairs · Architectural detail showing age',
    tone: 'earth',
  },
  situationLandlord: {
    alt: 'A row of rental homes along a tree-lined street.',
    label: 'Landlord · Duplex or row of rentals, street level',
    tone: 'stone',
  },
  situationDownsizing: {
    alt: 'A spacious family home with a large yard in late afternoon.',
    label: 'Downsizing · Large family home, generous yard',
    tone: 'olive',
  },
  situationExploring: {
    alt: 'A neighborhood seen from above, rooftops among the trees.',
    label: 'Exploring · Neighborhood rooftops, elevated view',
    tone: 'sand',
  },
  programCash: {
    src: '/images/program-cash.jpg',
    alt: 'Closing at the title company.',
    label: 'Cash Program · Closing at the title company',
    tone: 'earth',
  },
  programAgent: {
    src: '/images/program-agent.avif',
    alt: 'A realtor.',
    label: 'Real Estate Agent Program · Realtor',
    tone: 'olive',
  },
  servicesHero: {
    alt: 'A residential street of varied homes in soft morning light.',
    label: 'Services · Street of varied homes, morning light, wide',
    tone: 'stone',
  },
  howItWorksHero: {
    alt: 'A front walkway leading up to the door of a home.',
    label: 'How it works · Path or walkway leading to a front door, vertical',
    tone: 'sand',
  },
  aboutHero: {
    src: '/images/founder-portrait.jpg',
    alt: 'Portrait of the founder of Get Home Offer',
    label: 'About · Founder portrait',
    tone: 'olive',
  },
  cashHero: {
    alt: 'The front of a single-family home with a simple, well-kept yard.',
    label: 'Cash hero · Single-family facade, vertical crop, overcast light',
    tone: 'earth',
  },
  cashDetail: {
    alt: 'An empty, sunlit room with wood floors.',
    label: 'Cash · Empty room, natural light, floor detail',
    tone: 'sand',
  },
  agentHero: {
    alt: 'A bright living room prepared for showings.',
    label: 'Agent hero · Staged living room, vertical crop, bright',
    tone: 'olive',
  },
  agentDetail: {
    alt: 'A neighborhood sidewalk lined with homes and mature trees.',
    label: 'Agent · Tree-lined sidewalk, homes in view',
    tone: 'stone',
  },
  approach: {
    alt: 'An architectural detail of a doorway and entry steps.',
    label: 'Approach · Doorway or threshold detail, vertical',
    tone: 'stone',
  },
  nextChapter: {
    alt: 'A home lit warmly from within at dusk.',
    label: 'Next chapter · Same home as hero or similar, at dusk, lights on',
    tone: 'dusk',
  },
  milwaukeeHero: {
    src: '/images/we-buy-houses-milwaukee.avif',
    alt: 'bridge on water',
    label: 'Milwaukee · Historic neighborhoods, vertical',
    tone: 'stone',
  },
  founderPortrait: {
    src: '/images/founder-portrait.jpg',
    alt: 'Founder portrait',
    label: 'Founder portrait',
    tone: 'stone',
  },
  // Example photos for the contact form's kitchen-condition question. Pexels (free license, no attribution required),
  // photo IDs: fixer upper 17139803, dated 38744250, standard 8031933, high end 5353945, luxury 18039822.
  kitchenFixerUpper: {
    src: '/images/kitchen-fixer-upper.jpg',
    alt: 'Example of a fixer-upper kitchen needing significant repairs',
    label: 'Kitchen · Fixer upper: damaged cabinets, missing fixtures, worn floors',
    tone: 'earth',
  },
  kitchenDated: {
    src: '/images/kitchen-dated.jpg',
    alt: 'Example of a dated kitchen that has not been updated recently',
    label: 'Kitchen · Dated: older laminate counters and cabinets, original fixtures',
    tone: 'sand',
  },
  kitchenStandard: {
    src: '/images/kitchen-standard.jpg',
    alt: 'Example of a standard kitchen updated with common finishes',
    label: 'Kitchen · Standard: wood cabinets, stainless appliances, simple counters',
    tone: 'stone',
  },
  kitchenHighEnd: {
    src: '/images/kitchen-high-end.jpg',
    alt: 'Example of a high-end kitchen with high-quality upgrades',
    label: 'Kitchen · High end: shaker cabinets, granite or quartz, stainless appliances',
    tone: 'olive',
  },
  kitchenLuxury: {
    src: '/images/kitchen-luxury.jpg',
    alt: 'Example of a luxury kitchen with elegant, top-tier finishes',
    label: 'Kitchen · Luxury: large island, designer lighting, premium stone and appliances',
    tone: 'dusk',
  },
  // Example photos for the contact form's bathroom-condition question. Pexels (free license, no attribution required),
  // photo IDs: fixer upper 30547083, dated 19776970, standard 35527001, high end 8031880, luxury 105934.
  bathroomFixerUpper: {
    src: '/images/bathroom-fixer-upper.jpg',
    alt: 'Example of a fixer-upper bathroom needing significant repairs',
    label: 'Bathroom · Fixer upper',
    tone: 'earth',
  },
  bathroomDated: {
    src: '/images/bathroom-dated.jpg',
    alt: 'Example of a dated bathroom that has not been updated recently',
    label: 'Bathroom · Dated',
    tone: 'sand',
  },
  bathroomStandard: {
    src: '/images/bathroom-standard.jpg',
    alt: 'Example of a standard bathroom updated with common finishes',
    label: 'Bathroom · Standard',
    tone: 'stone',
  },
  bathroomHighEnd: {
    src: '/images/bathroom-high-end.jpg',
    alt: 'Example of a high-end bathroom with high-quality upgrades',
    label: 'Bathroom · High end',
    tone: 'olive',
  },
  bathroomLuxury: {
    src: '/images/bathroom-luxury.jpg',
    alt: 'Example of a luxury bathroom with elegant, top-tier finishes',
    label: 'Bathroom · Luxury',
    tone: 'dusk',
  },
} satisfies Record<string, ImageAsset>;
