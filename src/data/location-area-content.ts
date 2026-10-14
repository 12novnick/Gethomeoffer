import type { Faq } from './location-content';

export interface AreaContent {
  metaTitle: string;
  metaDescription: string;
  heading: string;
  summary: string;
  intro: string[];
  /** Verifiable local housing context. */
  homes: string[];
  source?: { label: string; url: string };
  /** Service slugs most relevant to this area, with a local reason. */
  situations: { slug: string; reason: string }[];
  faqs: Faq[];
}

// Build-time only: read by the area route loader, never shipped in the JS bundle.
// Only verifiable facts about each area. Owner may add real local purchase stories later.
export const AREA_CONTENT: Record<string, AreaContent> = {
  'wisconsin/milwaukee/bay-view': {
    metaTitle: 'We Buy Houses in Bay View, Milwaukee | Get Home Offer',
    metaDescription:
      'Sell your Bay View house as-is for cash. Single-family homes, upper and lower flats and rentals. No repairs, no fees and no commissions.',
    heading: 'We Buy Houses in Bay View, Milwaukee',
    summary: 'Sell your Bay View house or flat as-is, with no repairs, no showings and no commissions.',
    intro: [
      'Bay View sits on Milwaukee\'s south side along Lake Michigan. Whether you own a single-family home, an upper and lower flat or a small rental building here, we can make you a straightforward cash offer on it as it stands today.',
      'You do not need to update an older kitchen, fix up a rental unit or wait for a lease to end. Tell us about the property and decide whether the offer works for you.',
    ],
    homes: [
      'Bay View\'s housing is a mix of older single-family homes, upper and lower flats and small apartment buildings.',
      'Many of these homes have been lived in and rented out for generations. Updates to older systems, finishes and rental units are common needs, and we factor them into the offer so you do not have to take them on.',
    ],
    situations: [
      { slug: 'sell-duplex-multi-family', reason: 'Upper and lower flats, occupied or vacant' },
      { slug: 'sell-outdated-house', reason: 'Older homes that have not been updated' },
      { slug: 'sell-inherited-house', reason: 'Family homes passed down to heirs' },
      { slug: 'sell-house-needs-repairs', reason: 'Houses with a repair list you would rather skip' },
    ],
    faqs: [
      { question: 'Do you buy upper and lower flats in Bay View?', answer: 'Yes. We buy flats and duplexes with tenants in place or empty.' },
      { question: 'Do I need to update my older Bay View home first?', answer: 'No. We buy it as-is and factor the updates into the offer.' },
      { question: 'How quickly can you close?', answer: 'Typically 14 to 30 days. We can often work around the date you need.' },
    ],
  },

  'wisconsin/milwaukee/walkers-point': {
    metaTitle: "We Buy Houses in Walker's Point, Milwaukee | Get Home Offer",
    metaDescription:
      "Sell your Walker's Point house as-is for cash. Historic worker cottages, older homes and rentals. No repairs, no fees and no commissions.",
    heading: "We Buy Houses in Walker's Point, Milwaukee",
    summary: "Own a historic cottage or older home in Walker's Point? Sell it as-is, without renovating first.",
    intro: [
      "Walker's Point, just south of downtown, is one of Milwaukee's oldest neighborhoods. If you own a house or rental here and want to move on from it, we can make a straightforward cash offer on it in its current condition.",
      'There are no repairs to make, no open houses and no commissions taken out at closing.',
    ],
    homes: [
      "The neighborhood grew from a land claim George Walker filed in the 1830s and 1840s, and it drew immigrants who worked in nearby factories along the rivers and later the railroads.",
      'Many worker cottages from that era still stand, in Greek Revival, Gothic and Italianate styles, alongside larger Italianate and Queen Anne homes. Older houses like these often need updates to systems and finishes, which we price into our offer.',
    ],
    source: {
      label: "Source: Wisconsin Historical Society, National Register records for Walker's Point",
      url: 'https://legacy.wisconsinhistory.org/Records/NationalRegister/NR225',
    },
    situations: [
      { slug: 'sell-outdated-house', reason: 'Historic cottages that need updating' },
      { slug: 'sell-house-needs-repairs', reason: 'Older homes with deferred maintenance' },
      { slug: 'sell-rental-property', reason: 'Rentals you are ready to stop managing' },
      { slug: 'sell-house-code-violations', reason: 'Open orders that stall a traditional sale' },
    ],
    faqs: [
      { question: 'Do you buy historic homes in Walker\'s Point?', answer: 'Yes. Tell us about the house and we will make an offer on it as it stands.' },
      {
        question: 'Does a historic designation change how I sell?',
        answer: 'It can affect future renovations. Ask the city\'s historic preservation staff what applies to your property, and share it with us.',
      },
      { question: 'Do I have to accept your offer?', answer: 'No. The offer comes with no obligation. You decide.' },
    ],
  },

  'wisconsin/milwaukee/washington-heights': {
    metaTitle: 'We Buy Houses in Washington Heights, Milwaukee | Get Home Offer',
    metaDescription:
      'Sell your Washington Heights house as-is for cash. Long-established homes on Milwaukee\'s west side. No repairs, no fees and no commissions.',
    heading: 'We Buy Houses in Washington Heights, Milwaukee',
    summary: 'Sell your Washington Heights home as-is, on your timeline, without repairs or showings.',
    intro: [
      'Washington Heights is a compact neighborhood on Milwaukee\'s west side, bordered by Sherman Park and Washington Park. If you own a home here, we can make you a straightforward cash offer on it as it is.',
      'Whether the house came through an estate, needs work or simply no longer fits, you can sell without fixing it up or hosting showings.',
    ],
    homes: [
      'The area has a long history: much of it was farmland owned by the Dousman family in the 1830s before it developed into the residential neighborhood it is today.',
      'Long-established homes like those here often come with older systems and decades of wear. We account for that in our offer, so you do not need to update anything first.',
    ],
    source: {
      label: 'Source: Encyclopedia of Milwaukee, University of Wisconsin–Milwaukee',
      url: 'https://emke.uwm.edu/entry/washington-heights/',
    },
    situations: [
      { slug: 'sell-inherited-house', reason: 'Family homes passed down to heirs' },
      { slug: 'sell-outdated-house', reason: 'Long-established homes that need updates' },
      { slug: 'sell-house-downsizing', reason: 'Moving to a smaller place' },
      { slug: 'sell-house-needs-repairs', reason: 'Repairs you would rather not take on' },
    ],
    faqs: [
      { question: 'Do you buy older homes in Washington Heights?', answer: 'Yes, in their current condition. No repairs or updates needed.' },
      { question: 'Can I sell an inherited house here?', answer: 'Yes. We work with heirs and estate representatives on a timeline that fits.' },
      { question: 'How quickly can you close?', answer: 'Typically 14 to 30 days. We can often work around the date you need.' },
    ],
  },

  'wisconsin/milwaukee/east-side-near-uwm': {
    metaTitle: 'We Buy Houses on the East Side near UWM | Get Home Offer',
    metaDescription:
      'Sell your East Side Milwaukee duplex, flat or rental near UWM as-is for cash. Tenants in place are fine. No repairs, no fees and no commissions.',
    heading: 'We Buy Houses on Milwaukee\'s East Side near UWM',
    summary: 'Duplexes, walk-up flats and rentals near the University of Wisconsin–Milwaukee, occupied or empty.',
    intro: [
      'The East Side around the University of Wisconsin–Milwaukee has a large share of rental housing. If you own a duplex, flat or house here and are ready to sell, we can make a straightforward cash offer.',
      'You do not need to wait for leases to end or turn units over between tenants. We buy tenant-occupied properties as they are.',
    ],
    homes: [
      'Housing on the East Side ranges from workers\' cottages to some of the city\'s largest historic homes, with many historic duplexes and walk-up flats near campus.',
      'Rentals near a university see steady turnover and wear. We factor unit condition into our offer, so there is no need to renovate between leases.',
    ],
    situations: [
      { slug: 'sell-rental-property', reason: 'Rentals you are ready to stop managing' },
      { slug: 'sell-house-with-tenants', reason: 'Sell without waiting for leases to end' },
      { slug: 'sell-duplex-multi-family', reason: 'Duplexes and walk-up flats' },
      { slug: 'sell-house-relocating', reason: 'Moving away from Milwaukee' },
    ],
    faqs: [
      { question: 'Can you buy my rental near UWM with students living there?', answer: 'Yes. We buy tenant-occupied properties, subject to the existing leases.' },
      { question: 'Do I need to fix up units between tenants?', answer: 'No. We buy the property in its current condition.' },
      { question: 'Do I have to accept your offer?', answer: 'No. The offer comes with no obligation. You decide.' },
    ],
  },

  'wisconsin/milwaukee/near-marquette-university': {
    metaTitle: 'We Buy Houses near Marquette University | Get Home Offer',
    metaDescription:
      'Sell your Near West Side Milwaukee house or rental near Marquette University as-is for cash. Divided homes and flats welcome. No fees or commissions.',
    heading: 'We Buy Houses near Marquette University',
    summary: 'Rentals, flats and divided homes on Milwaukee\'s Near West Side, close to the Marquette campus.',
    intro: [
      'The Near West Side around Marquette University has many rentals, flats and older homes divided into units. If you own one and want to sell, we can make a straightforward cash offer on it as it stands.',
      'Tenants in place, units that need work or a building you are tired of managing are all fine.',
    ],
    homes: [
      'Housing near campus mixes student-oriented buildings with classic Milwaukee flats, and many large early-20th-century homes have been divided into multiple units.',
      'Divided homes and student rentals often need updates and see regular turnover. We factor that into our offer so you can sell without renovating.',
    ],
    situations: [
      { slug: 'sell-rental-property', reason: 'Student and long-term rentals' },
      { slug: 'sell-duplex-multi-family', reason: 'Flats and homes divided into units' },
      { slug: 'sell-house-with-tenants', reason: 'Sell with leases in place' },
      { slug: 'sell-vacant-house', reason: 'Empty units or buildings costing you money' },
    ],
    faqs: [
      { question: 'Do you buy houses that have been divided into units?', answer: 'Yes. Tell us how the property is set up and how many units are rented.' },
      { question: 'Can I sell during the school year with tenants?', answer: 'Yes. We buy tenant-occupied properties, subject to the existing leases.' },
      { question: 'How quickly can you close?', answer: 'Typically 14 to 30 days. We can often work around the date you need.' },
    ],
  },
};
