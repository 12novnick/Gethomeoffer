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
    alt: 'A family home at golden hour, seen from across a quiet residential street.',
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
    alt: 'Afternoon light across the facade of a home and its front garden.',
    label: 'About · Home facade and garden, warm afternoon light, vertical',
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
    src: '/images/milwaukee-hero.avif',
    alt: 'Milwaukee neighborhood street view.',
    label: 'Milwaukee · Historic neighborhoods, vertical',
    tone: 'stone',
  },
} satisfies Record<string, ImageAsset>;
