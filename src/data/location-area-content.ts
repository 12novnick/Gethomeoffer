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

const emke = (entry: string) => ({
  label: 'Source: Encyclopedia of Milwaukee, University of Wisconsin–Milwaukee',
  url: `https://emke.uwm.edu/entry/${entry}/`,
});

const CLOSE_FAQ: Faq = { question: 'How quickly can you close?', answer: 'Typically 14 to 30 days. We can often work around the date you need.' };
const NO_OBLIGATION_FAQ: Faq = { question: 'Do I have to accept your offer?', answer: 'No. The offer comes with no obligation. You decide.' };

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

  // Milwaukee County suburbs. Facts from each community's Encyclopedia of Milwaukee entry.
  'wisconsin/milwaukee/bayside': {
    metaTitle: 'We Buy Houses in Bayside, WI | Get Home Offer',
    metaDescription: 'Sell your Bayside house as-is for cash. No repairs, no showings, no fees and no commissions. Get a no-obligation offer on your North Shore home.',
    heading: 'We Buy Houses in Bayside, WI',
    summary: 'Sell your Bayside home as-is, privately and on your schedule.',
    intro: [
      'Bayside sits on Lake Michigan at the northern end of Milwaukee County\'s lakeshore. If you own a home here and want to sell without listing it, we can make you a straightforward cash offer.',
      'There are no showings, no repairs and no commissions. You pick the closing date.',
    ],
    homes: [
      'Bayside began as an entirely residential community and incorporated in 1953 to keep its natural, residential character. The village also extends into Ozaukee County.',
      'Many homes here have been owned by the same family for decades. If yours needs updates, we factor them into the offer so you do not have to take them on.',
    ],
    source: emke('village-of-bayside'),
    situations: [
      { slug: 'sell-house-downsizing', reason: 'Moving to a smaller place' },
      { slug: 'sell-inherited-house', reason: 'Family homes passed down to heirs' },
      { slug: 'sell-outdated-house', reason: 'Homes that have not been updated' },
      { slug: 'sell-house-relocating', reason: 'Moving out of the area' },
    ],
    faqs: [
      { question: 'Do you buy homes on the Ozaukee County side of Bayside?', answer: 'Yes. We buy houses anywhere in the village.' },
      { question: 'Can I sell without people walking through my home?', answer: 'Yes. There are no open houses or public showings.' },
      CLOSE_FAQ,
    ],
  },

  'wisconsin/milwaukee/brown-deer': {
    metaTitle: 'We Buy Houses in Brown Deer, WI | Get Home Offer',
    metaDescription: 'Sell your Brown Deer house as-is for cash. Homes that need work, inherited houses and rentals. No repairs, no fees and no commissions.',
    heading: 'We Buy Houses in Brown Deer, WI',
    summary: 'Sell your Brown Deer house as-is, with no repairs and no commissions.',
    intro: [
      'Brown Deer is a village in northern Milwaukee County, bordered on the west and south by the City of Milwaukee. If you own a house here and want a simple sale, we can make a straightforward cash offer on it as it stands.',
      'Tell us about the property, get your offer and decide if it works for you.',
    ],
    homes: [
      'Brown Deer grew out of the former Town of Granville. Once a farming area, it filled with suburban commuters after World War II and incorporated in 1955.',
      'Many homes date from that postwar growth and may need updated systems or finishes. We buy them in their current condition.',
    ],
    source: emke('village-of-brown-deer'),
    situations: [
      { slug: 'sell-outdated-house', reason: 'Postwar homes that need updating' },
      { slug: 'sell-inherited-house', reason: 'Family homes passed down to heirs' },
      { slug: 'sell-rental-property', reason: 'Rentals you are ready to stop managing' },
      { slug: 'sell-house-needs-repairs', reason: 'Repairs you would rather skip' },
    ],
    faqs: [
      { question: 'Do I need to update my Brown Deer home before selling?', answer: 'No. We buy it as-is and factor the updates into the offer.' },
      NO_OBLIGATION_FAQ,
      CLOSE_FAQ,
    ],
  },

  'wisconsin/milwaukee/cudahy': {
    metaTitle: 'We Buy Houses in Cudahy, WI | Get Home Offer',
    metaDescription: 'Sell your Cudahy house as-is for cash. Older homes, duplexes and rentals welcome. No repairs, no fees and no commissions.',
    heading: 'We Buy Houses in Cudahy, WI',
    summary: 'Sell your Cudahy house, duplex or rental as-is, on your timeline.',
    intro: [
      'Cudahy is a lakefront city just south of Milwaukee, between St. Francis, Mitchell Airport, Oak Creek and South Milwaukee. If you own a home or rental here, we can make a straightforward cash offer on it as it is.',
      'You skip the repairs, the showings and the commissions.',
    ],
    homes: [
      'The city grew around a railroad stop once called Buckhorn and is named for meatpacker Patrick Cudahy, who founded it. Packard Avenue has long been its main business street.',
      'Older homes here often come with dated systems and finishes. We price that into our offer so you can sell without fixing anything.',
    ],
    source: emke('cudahy'),
    situations: [
      { slug: 'sell-outdated-house', reason: 'Older homes that need updating' },
      { slug: 'sell-duplex-multi-family', reason: 'Duplexes, occupied or vacant' },
      { slug: 'sell-inherited-house', reason: 'Family homes passed down to heirs' },
      { slug: 'sell-house-needs-repairs', reason: 'Repairs you would rather skip' },
    ],
    faqs: [
      { question: 'Do you buy duplexes in Cudahy?', answer: 'Yes, with tenants in place or empty.' },
      { question: 'Do I need to clean out the house first?', answer: 'No. Leave what you do not want and we handle it.' },
      CLOSE_FAQ,
    ],
  },

  'wisconsin/milwaukee/fox-point': {
    metaTitle: 'We Buy Houses in Fox Point, WI | Get Home Offer',
    metaDescription: 'Sell your Fox Point house as-is for cash. No showings, no repairs and no commissions. Get a no-obligation offer on your North Shore home.',
    heading: 'We Buy Houses in Fox Point, WI',
    summary: 'Sell your Fox Point home privately, as-is, with no commissions.',
    intro: [
      'Fox Point is a North Shore village along Lake Michigan. If you are ready to sell your home here and want to skip listing it, we can make a straightforward cash offer.',
      'You choose the closing date, and there are no showings or repairs.',
    ],
    homes: [
      'Fox Point incorporated as a village in 1926. Its early settlers were mostly Dutch farmers, and the name comes from a point of land on the lake, now in Doctors Park, that looked like a fox\'s head.',
      'Long-held homes often need updates before a traditional sale. We factor those into our offer instead.',
    ],
    source: emke('village-of-fox-point'),
    situations: [
      { slug: 'sell-house-downsizing', reason: 'Moving to a smaller place' },
      { slug: 'sell-inherited-house', reason: 'Family homes passed down to heirs' },
      { slug: 'sell-house-assisted-living', reason: 'Moving to assisted living' },
      { slug: 'sell-outdated-house', reason: 'Homes that have not been updated' },
    ],
    faqs: [
      { question: 'Can I sell my Fox Point home without listing it?', answer: 'Yes. We buy directly, with no listing, showings or open houses.' },
      { question: 'Can you work around a move to assisted living?', answer: 'Yes. We can set the closing date around the move.' },
      NO_OBLIGATION_FAQ,
    ],
  },

  'wisconsin/milwaukee/franklin': {
    metaTitle: 'We Buy Houses in Franklin, WI | Get Home Offer',
    metaDescription: 'Sell your Franklin house as-is for cash. No repairs, no showings, no fees and no commissions. Close on the date you choose.',
    heading: 'We Buy Houses in Franklin, WI',
    summary: 'Sell your Franklin house as-is and close on your schedule.',
    intro: [
      'Franklin covers the southwest corner of Milwaukee County, bordering Racine County. If you own a house here and want to sell without the usual work, we can make a straightforward cash offer on it as it stands.',
      'No repairs, no showings and no commissions taken out at closing.',
    ],
    homes: [
      'Franklin was a farming community for about a hundred years. Its first housing developments came in the early 1950s, and as late as 1962 most of the city was still farmland.',
      'Today it is mostly subdivisions of different ages. Whatever shape your home is in, we account for it in our offer.',
    ],
    source: emke('franklin'),
    situations: [
      { slug: 'sell-house-relocating', reason: 'Moving out of the area' },
      { slug: 'sell-house-divorce', reason: 'Splitting a home in a divorce' },
      { slug: 'sell-house-downsizing', reason: 'Moving to a smaller place' },
      { slug: 'sell-house-needs-repairs', reason: 'Repairs you would rather skip' },
    ],
    faqs: [
      { question: 'Do you buy newer homes in Franklin too?', answer: 'Yes. We buy houses of any age and condition.' },
      { question: 'Can you close quickly if I am relocating?', answer: 'Often yes. Typically 14 to 30 days, and we can work around your move.' },
      NO_OBLIGATION_FAQ,
    ],
  },

  'wisconsin/milwaukee/glendale': {
    metaTitle: 'We Buy Houses in Glendale, WI | Get Home Offer',
    metaDescription: 'Sell your Glendale house as-is for cash. Postwar homes and houses that need work. No repairs, no fees and no commissions.',
    heading: 'We Buy Houses in Glendale, WI',
    summary: 'Sell your Glendale home as-is, without repairs or showings.',
    intro: [
      'Glendale is an inner-ring suburb just north of Milwaukee. If you own a home here and want a simple sale, we can make a straightforward cash offer on it in its current condition.',
      'Tell us about the house, get an offer and decide on your own time.',
    ],
    homes: [
      'Glendale incorporated in December 1950, at the front of the postwar suburban wave, and reached its current size of about 5.8 square miles within five years. Its location between two county parks and the Milwaukee River drew new residents.',
      'Homes from that era often need updated systems and finishes. We factor that into our offer.',
    ],
    source: emke('city-of-glendale'),
    situations: [
      { slug: 'sell-outdated-house', reason: 'Postwar homes that need updating' },
      { slug: 'sell-inherited-house', reason: 'Family homes passed down to heirs' },
      { slug: 'sell-house-downsizing', reason: 'Moving to a smaller place' },
      { slug: 'sell-house-needs-repairs', reason: 'Repairs you would rather skip' },
    ],
    faqs: [
      { question: 'Do I need to update my 1950s Glendale home first?', answer: 'No. We buy it as-is and factor the updates into the offer.' },
      NO_OBLIGATION_FAQ,
      CLOSE_FAQ,
    ],
  },

  'wisconsin/milwaukee/greendale': {
    metaTitle: 'We Buy Houses in Greendale, WI | Get Home Offer',
    metaDescription: 'Sell your Greendale house as-is for cash. Original village homes, row houses and newer homes. No repairs, no fees and no commissions.',
    heading: 'We Buy Houses in Greendale, WI',
    summary: 'Sell your Greendale home as-is, including original village homes.',
    intro: [
      'Greendale is one of the country\'s three New Deal greenbelt towns. If you own a home here and want to sell without fixing it up, we can make you a straightforward cash offer.',
      'No showings, no repairs and no commissions.',
    ],
    homes: [
      'The federal government planned Greendale in 1936, and it opened to 572 families in 1938 with single-family homes, multi-family homes and row houses.',
      'Homes from the original village are now more than 85 years old and often need updates. We buy them as they are.',
    ],
    source: emke('greendale'),
    situations: [
      { slug: 'sell-outdated-house', reason: 'Original village homes that need updating' },
      { slug: 'sell-inherited-house', reason: 'Family homes passed down to heirs' },
      { slug: 'sell-house-downsizing', reason: 'Moving to a smaller place' },
      { slug: 'sell-duplex-multi-family', reason: 'Multi-family homes and row houses' },
    ],
    faqs: [
      { question: 'Do you buy the original 1930s Greendale homes?', answer: 'Yes. We buy them in their current condition.' },
      { question: 'Do I need to fix anything before selling?', answer: 'No. We factor repairs and updates into the offer.' },
      CLOSE_FAQ,
    ],
  },

  'wisconsin/milwaukee/greenfield': {
    metaTitle: 'We Buy Houses in Greenfield, WI | Get Home Offer',
    metaDescription: 'Sell your Greenfield house as-is for cash. No repairs, no showings, no fees and no commissions. Get a no-obligation offer.',
    heading: 'We Buy Houses in Greenfield, WI',
    summary: 'Sell your Greenfield house as-is, with no repairs and no commissions.',
    intro: [
      'Greenfield is a mostly residential city on Milwaukee\'s southwest side. If you own a house here and want a simpler sale, we can make a straightforward cash offer on it as it stands.',
      'You pick the closing date, and there are no showings to plan around.',
    ],
    homes: [
      'Greenfield was settled in the 1830s and 1840s by Yankees and immigrants from Ireland and Germany. It has no major industrial sites, and its larger shopping centers serve the surrounding neighborhoods.',
      'Its homes span many decades. Whatever condition yours is in, we factor it into the offer.',
    ],
    source: emke('greenfield'),
    situations: [
      { slug: 'sell-inherited-house', reason: 'Family homes passed down to heirs' },
      { slug: 'sell-house-downsizing', reason: 'Moving to a smaller place' },
      { slug: 'sell-house-behind-on-payments', reason: 'Behind on mortgage payments' },
      { slug: 'sell-house-needs-repairs', reason: 'Repairs you would rather skip' },
    ],
    faqs: [
      { question: 'Can you help if I am behind on my mortgage?', answer: 'Often yes. A quick cash sale can pay off the loan at closing. Call us early.' },
      NO_OBLIGATION_FAQ,
      CLOSE_FAQ,
    ],
  },

  'wisconsin/milwaukee/hales-corners': {
    metaTitle: 'We Buy Houses in Hales Corners, WI | Get Home Offer',
    metaDescription: 'Sell your Hales Corners house as-is for cash. Older homes and homes that need work. No repairs, no fees and no commissions.',
    heading: 'We Buy Houses in Hales Corners, WI',
    summary: 'Sell your Hales Corners home as-is, on your schedule.',
    intro: [
      'Hales Corners is a small village around the crossroads of Highway 100 and Janesville Road. If you own a home here and want to sell without the hassle, we can make a straightforward cash offer.',
      'No repairs, no showings and no commissions.',
    ],
    homes: [
      'The Hale family settled here in the 1830s, and the crossroads took their name when William Hale became postmaster in 1854. The village incorporated in 1952.',
      'Many homes here are well established and may need updates. We buy them in their current condition.',
    ],
    source: emke('hales-corners'),
    situations: [
      { slug: 'sell-outdated-house', reason: 'Older homes that need updating' },
      { slug: 'sell-inherited-house', reason: 'Family homes passed down to heirs' },
      { slug: 'sell-house-assisted-living', reason: 'Moving to assisted living' },
      { slug: 'sell-house-downsizing', reason: 'Moving to a smaller place' },
    ],
    faqs: [
      { question: 'Can you work around a move to assisted living?', answer: 'Yes. We can set the closing date around the move.' },
      { question: 'Do I need to clean out the house first?', answer: 'No. Leave what you do not want and we handle it.' },
      CLOSE_FAQ,
    ],
  },

  'wisconsin/milwaukee/oak-creek': {
    metaTitle: 'We Buy Houses in Oak Creek, WI | Get Home Offer',
    metaDescription: 'Sell your Oak Creek house as-is for cash. Older Carrollville homes, rentals and newer houses. No repairs, no fees and no commissions.',
    heading: 'We Buy Houses in Oak Creek, WI',
    summary: 'Sell your Oak Creek house as-is, from older Carrollville homes to newer builds.',
    intro: [
      'Oak Creek is a city in southern Milwaukee County along Lake Michigan. If you own a house or rental here, we can make a straightforward cash offer on it as it stands.',
      'You skip the repairs, the showings and the commissions.',
    ],
    homes: [
      'Oak Creek stayed largely agricultural into the 1950s. In the 1890s the Carrollville area grew around a distillery and the U.S. Glue Company, and many of the company\'s worker houses are still in use.',
      'Older homes like these often need updates. We factor that into our offer so you do not have to.',
    ],
    source: emke('city-of-oak-creek'),
    situations: [
      { slug: 'sell-outdated-house', reason: 'Older homes that need updating' },
      { slug: 'sell-rental-property', reason: 'Rentals you are ready to stop managing' },
      { slug: 'sell-house-relocating', reason: 'Moving out of the area' },
      { slug: 'sell-house-needs-repairs', reason: 'Repairs you would rather skip' },
    ],
    faqs: [
      { question: 'Do you buy older homes in Carrollville?', answer: 'Yes. We buy them in their current condition.' },
      NO_OBLIGATION_FAQ,
      CLOSE_FAQ,
    ],
  },

  'wisconsin/milwaukee/river-hills': {
    metaTitle: 'We Buy Houses in River Hills, WI | Get Home Offer',
    metaDescription: 'Sell your River Hills house as-is for cash. Private sale with no showings, no repairs and no commissions.',
    heading: 'We Buy Houses in River Hills, WI',
    summary: 'Sell your River Hills home privately, as-is, with no commissions.',
    intro: [
      'River Hills is a North Shore village named for the Milwaukee River and its rolling terrain. If you are ready to sell your home here and want to keep it private, we can make a straightforward cash offer.',
      'No listing, no showings and no repairs.',
    ],
    homes: [
      'River Hills incorporated as a village in 1930. Its early residents were mostly Dutch farmers, and for much of the 20th century the Milwaukee Hunt Club was the center of village life.',
      'Larger, older homes often need significant updates before a traditional sale. We account for that in our offer.',
    ],
    source: emke('village-of-river-hills'),
    situations: [
      { slug: 'sell-inherited-house', reason: 'Estates and family homes' },
      { slug: 'sell-probate-house', reason: 'Homes going through probate' },
      { slug: 'sell-house-downsizing', reason: 'Moving to a smaller place' },
      { slug: 'sell-outdated-house', reason: 'Homes that need updating' },
    ],
    faqs: [
      { question: 'Can I sell my River Hills home without listing it?', answer: 'Yes. We buy directly, with no listing or public showings.' },
      { question: 'Do you buy homes in probate?', answer: 'Yes. We work with personal representatives and close when the estate is ready.' },
      NO_OBLIGATION_FAQ,
    ],
  },

  'wisconsin/milwaukee/shorewood': {
    metaTitle: 'We Buy Houses in Shorewood, WI | Get Home Offer',
    metaDescription: 'Sell your Shorewood house, duplex or rental as-is for cash. Tenants in place are fine. No repairs, no fees and no commissions.',
    heading: 'We Buy Houses in Shorewood, WI',
    summary: 'Sell your Shorewood house, duplex or rental as-is.',
    intro: [
      'Shorewood is a compact village between Lake Michigan and the Milwaukee River, just north of Milwaukee. If you own a house, duplex or rental here, we can make a straightforward cash offer on it as it is.',
      'Tenants in place, older systems or a long repair list are all fine.',
    ],
    homes: [
      'Shorewood incorporated in 1900 as the Village of East Milwaukee and took its current name in 1917. It covers roughly 1.5 square miles.',
      'Older homes and rentals in a dense village like this often need updates. We price that in so you can sell without renovating.',
    ],
    source: emke('shorewood'),
    situations: [
      { slug: 'sell-duplex-multi-family', reason: 'Duplexes and flats' },
      { slug: 'sell-house-with-tenants', reason: 'Sell without waiting for leases to end' },
      { slug: 'sell-outdated-house', reason: 'Older homes that need updating' },
      { slug: 'sell-rental-property', reason: 'Rentals you are ready to stop managing' },
    ],
    faqs: [
      { question: 'Can you buy my Shorewood rental with tenants living there?', answer: 'Yes. We buy tenant-occupied properties, subject to the existing leases.' },
      NO_OBLIGATION_FAQ,
      CLOSE_FAQ,
    ],
  },

  'wisconsin/milwaukee/south-milwaukee': {
    metaTitle: 'We Buy Houses in South Milwaukee, WI | Get Home Offer',
    metaDescription: 'Sell your South Milwaukee house as-is for cash. Older homes, duplexes and rentals. No repairs, no fees and no commissions.',
    heading: 'We Buy Houses in South Milwaukee, WI',
    summary: 'Sell your South Milwaukee house or rental as-is, with no repairs.',
    intro: [
      'South Milwaukee sits on Lake Michigan along the Oak Creek. If you own a house or rental here and want a simple sale, we can make a straightforward cash offer on it as it stands.',
      'No showings, no repairs and no commissions.',
    ],
    homes: [
      'South Milwaukee incorporated as a village in 1892 and grew around industry, including the Bucyrus company, which located its headquarters here in 1893.',
      'Many homes date from the city\'s industrial growth and may need updates. We factor that into our offer.',
    ],
    source: emke('city-of-south-milwaukee'),
    situations: [
      { slug: 'sell-outdated-house', reason: 'Older homes that need updating' },
      { slug: 'sell-duplex-multi-family', reason: 'Duplexes, occupied or vacant' },
      { slug: 'sell-inherited-house', reason: 'Family homes passed down to heirs' },
      { slug: 'sell-house-code-violations', reason: 'Open orders that stall a traditional sale' },
    ],
    faqs: [
      { question: 'Do you buy houses with open code violations?', answer: 'Yes. We buy the house with the orders open and factor them into the offer.' },
      NO_OBLIGATION_FAQ,
      CLOSE_FAQ,
    ],
  },

  'wisconsin/milwaukee/st-francis': {
    metaTitle: 'We Buy Houses in St. Francis, WI | Get Home Offer',
    metaDescription: 'Sell your St. Francis house as-is for cash. Older homes, duplexes and rentals. No repairs, no fees and no commissions.',
    heading: 'We Buy Houses in St. Francis, WI',
    summary: 'Sell your St. Francis home as-is, on your timeline.',
    intro: [
      'St. Francis is a small lakefront city just south of Milwaukee. If you own a home or rental here, we can make a straightforward cash offer on it in its current condition.',
      'No repairs, no showings and no commissions.',
    ],
    homes: [
      'At about 2.55 square miles, St. Francis is one of the smallest suburbs by area in Milwaukee County. It grew around Roman Catholic institutions such as St. Francis de Sales Seminary, opened in 1856.',
      'Established homes here often need updates. We buy them as they are.',
    ],
    source: emke('city-of-st-francis'),
    situations: [
      { slug: 'sell-outdated-house', reason: 'Older homes that need updating' },
      { slug: 'sell-inherited-house', reason: 'Family homes passed down to heirs' },
      { slug: 'sell-duplex-multi-family', reason: 'Duplexes, occupied or vacant' },
      { slug: 'sell-house-downsizing', reason: 'Moving to a smaller place' },
    ],
    faqs: [
      { question: 'Do I need to update my St. Francis home first?', answer: 'No. We buy it as-is and factor the updates into the offer.' },
      NO_OBLIGATION_FAQ,
      CLOSE_FAQ,
    ],
  },

  'wisconsin/milwaukee/wauwatosa': {
    metaTitle: 'We Buy Houses in Wauwatosa, WI | Get Home Offer',
    metaDescription: 'Sell your Wauwatosa house as-is for cash. Older homes, duplexes and rentals in Tosa. No repairs, no fees and no commissions.',
    heading: 'We Buy Houses in Wauwatosa, WI',
    summary: 'Sell your Wauwatosa house, duplex or rental as-is.',
    intro: [
      'Wauwatosa is a city on Milwaukee County\'s west side, along the Menomonee River. If you own a home or rental in Tosa, we can make a straightforward cash offer on it as it stands.',
      'You skip the repairs, the showings and the commissions.',
    ],
    homes: [
      'Wauwatosa began as Hart\'s Mills, where Charles Hart built a house and mills on the Menomonee River in 1835. It is now one of the most populous municipalities in the metro area.',
      'Many Tosa homes are decades old and may need updates. We factor that into our offer so you can sell without renovating.',
    ],
    source: emke('city-of-wauwatosa'),
    situations: [
      { slug: 'sell-outdated-house', reason: 'Older homes that need updating' },
      { slug: 'sell-duplex-multi-family', reason: 'Duplexes, occupied or vacant' },
      { slug: 'sell-inherited-house', reason: 'Family homes passed down to heirs' },
      { slug: 'sell-house-relocating', reason: 'Moving out of the area' },
    ],
    faqs: [
      { question: 'Do you buy duplexes in Wauwatosa?', answer: 'Yes, with tenants in place or empty.' },
      NO_OBLIGATION_FAQ,
      CLOSE_FAQ,
    ],
  },

  'wisconsin/milwaukee/west-allis': {
    metaTitle: 'We Buy Houses in West Allis, WI | Get Home Offer',
    metaDescription: 'Sell your West Allis house as-is for cash. Older homes, duplexes and rentals. No repairs, no fees and no commissions.',
    heading: 'We Buy Houses in West Allis, WI',
    summary: 'Sell your West Allis house, duplex or rental as-is.',
    intro: [
      'West Allis sits along Milwaukee\'s western boundary and is home to State Fair Park. If you own a house or rental here, we can make a straightforward cash offer on it as it stands.',
      'Tenants in place, repairs or a full house of belongings are all fine.',
    ],
    homes: [
      'West Allis is one of the largest cities in the Milwaukee area, with a population of about 60,000 in the 2010 census.',
      'Its many older homes and duplexes often need updates. We price that into our offer so you can sell without fixing anything.',
    ],
    source: emke('city-of-west-allis'),
    situations: [
      { slug: 'sell-duplex-multi-family', reason: 'Duplexes and flats' },
      { slug: 'sell-rental-property', reason: 'Rentals you are ready to stop managing' },
      { slug: 'sell-outdated-house', reason: 'Older homes that need updating' },
      { slug: 'sell-inherited-house', reason: 'Family homes passed down to heirs' },
    ],
    faqs: [
      { question: 'Can you buy my West Allis rental with tenants?', answer: 'Yes. We buy tenant-occupied properties, subject to the existing leases.' },
      { question: 'Do I need to clean out the house first?', answer: 'No. Leave what you do not want and we handle it.' },
      CLOSE_FAQ,
    ],
  },

  'wisconsin/milwaukee/west-milwaukee': {
    metaTitle: 'We Buy Houses in West Milwaukee, WI | Get Home Offer',
    metaDescription: 'Sell your West Milwaukee house as-is for cash. Older homes, duplexes and rentals. No repairs, no fees and no commissions.',
    heading: 'We Buy Houses in West Milwaukee, WI',
    summary: 'Sell your West Milwaukee house or rental as-is.',
    intro: [
      'West Milwaukee is a one-square-mile village between Milwaukee and West Allis. If you own a house or rental here, we can make a straightforward cash offer on it in its current condition.',
      'No repairs, no showings and no commissions.',
    ],
    homes: [
      'The village incorporated in 1906, and by 1928 its farms had become paved residential streets. Industry has long occupied much of its land, and many residents walked to nearby factories.',
      'Homes from that era often need updated systems. We factor that into our offer.',
    ],
    source: emke('west-milwaukee'),
    situations: [
      { slug: 'sell-outdated-house', reason: 'Older homes that need updating' },
      { slug: 'sell-duplex-multi-family', reason: 'Duplexes, occupied or vacant' },
      { slug: 'sell-rental-property', reason: 'Rentals you are ready to stop managing' },
      { slug: 'sell-house-needs-repairs', reason: 'Repairs you would rather skip' },
    ],
    faqs: [
      { question: 'Do you buy older homes in West Milwaukee?', answer: 'Yes. We buy them in their current condition.' },
      NO_OBLIGATION_FAQ,
      CLOSE_FAQ,
    ],
  },

  'wisconsin/milwaukee/whitefish-bay': {
    metaTitle: 'We Buy Houses in Whitefish Bay, WI | Get Home Offer',
    metaDescription: 'Sell your Whitefish Bay house as-is for cash. Private sale with no showings, no repairs and no commissions.',
    heading: 'We Buy Houses in Whitefish Bay, WI',
    summary: 'Sell your Whitefish Bay home as-is, privately and on your schedule.',
    intro: [
      'Whitefish Bay is a residential village on the bluffs above Lake Michigan, about five miles north of downtown Milwaukee. If you are ready to sell your home here, we can make a straightforward cash offer.',
      'No showings, no repairs and no commissions.',
    ],
    homes: [
      'Whitefish Bay incorporated on May 10, 1892, as Milwaukee County\'s first village. It is primarily residential, with its shopping area along Silver Spring Drive.',
      'Many homes here are decades old and may need updates before a traditional sale. We factor that into our offer instead.',
    ],
    source: emke('whitefish-bay'),
    situations: [
      { slug: 'sell-house-downsizing', reason: 'Moving to a smaller place' },
      { slug: 'sell-inherited-house', reason: 'Family homes passed down to heirs' },
      { slug: 'sell-house-relocating', reason: 'Moving out of the area' },
      { slug: 'sell-outdated-house', reason: 'Homes that need updating' },
    ],
    faqs: [
      { question: 'Can I sell my Whitefish Bay home without showings?', answer: 'Yes. We buy directly, with no open houses or public showings.' },
      NO_OBLIGATION_FAQ,
      CLOSE_FAQ,
    ],
  },
};
