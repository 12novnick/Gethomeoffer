import { IMAGES } from './images';
import type { ImageAsset } from './images';
import type { AgentTopic, ContentItem } from './programs';

export type ProgramId = 'cash' | 'agent';

export interface Faq {
  question: string;
  answer: string;
}

export interface GuideStat {
  value: string;
  label: string;
}

export interface GuideSection {
  id: string;
  title: string;
  body?: string[];
  list?: string[];
  /** Paragraphs after the list. */
  after?: string[];
  items?: ContentItem[];
  stats?: GuideStat[];
  table?: { caption: string; rows: { label: string; count: string; share: string }[] };
  /** Small print under the section: a data source or legal note. */
  note?: string;
  /** External page the note links to. */
  noteUrl?: string;
  cta?: boolean;
  tone?: 'default' | 'surface';
  /** Visually secondary section. */
  quiet?: boolean;
  /** Optional badge image path. */
  badgeImage?: string;
}

/** Long-form state page. When present it replaces the generic template sections. */
export interface StateGuide {
  introTitle: string;
  introCta?: boolean;
  sections: GuideSection[];
  stepsTitle: string;
  steps: ContentItem[];
  citiesTitle: string;
  closing: { title: string; body: string; secondaryLabel: string; secondaryPath: string };
  faqTitle: string;
}

/**
 * Localized copy for one state or city page. Every field is optional; missing fields render a
 * labeled content slot. A page is published (indexed + in the sitemap) once `intro` is provided.
 */
export interface LocalContent {
  /** Custom H1; defaults to the program's location title. */
  heading?: string;
  /** Hero paragraph under the H1. */
  summary?: string;
  /** Meta description when it should differ from `summary`. */
  metaDescription?: string;
  guide?: StateGuide;
  /** Local introduction. Required to publish. */
  intro?: string[];
  /** Local housing and market context. */
  marketContext?: string[];
  /** Selling situations common in this area. */
  situations?: ContentItem[];
  /** Neighborhoods or nearby communities served (city pages). */
  areas?: string[];
  /** Real Estate Agent Program only: local notes that replace the generic text for each part of the sale. */
  agentTopics?: Partial<Record<AgentTopic, string>>;
  faqs?: Faq[];
  image?: ImageAsset;
}

/**
 * Keys: state slug ('wisconsin') or state/city slug ('wisconsin/madison').
 * Content is only read by route loaders at build time, so it never ships in the client bundle.
 */
export const LOCATION_CONTENT: Record<ProgramId, Record<string, LocalContent>> = {
  cash: {
    wisconsin: {
      summary: 'Looking to sell a property in Wisconsin? Explore a straightforward cash option and find a path that fits your situation.',
      intro: ['Selling a property in Wisconsin can follow different paths. Whether you have inherited a home, are relocating, own a vacant property, or want to explore your options, GetHomeOffer provides a direct way to move forward.'],
      faqs: [
        {
          question: 'How fast can you close on a Wisconsin home?',
          answer: 'Most of our sales close in 14 to 30 days. We move quickly because we have the cash available and don\'t need to wait for financing or appraisals. If you need to close faster or have more time, we can often work with your timeline.',
        },
        {
          question: 'Do you buy as-is?',
          answer: 'Yes. We buy houses in any condition, whether they need cosmetic updates, major repairs, or structural work. You don\'t need to fix anything before selling to us. We handle all repairs after closing.',
        },
        {
          question: 'How do you calculate your cash offer?',
          answer: 'Every property is unique, so we evaluate each one individually. We consider the property\'s condition, location, market value, and what repairs or updates it may need. After our assessment, we\'ll make you a straightforward offer with no surprises.',
        },
        {
          question: 'Do I pay realtor fees or commissions?',
          answer: 'No. Since you\'re selling directly to us, there are no realtor commissions, no listing fees, and no hidden costs. You keep more of your proceeds.',
        },
        {
          question: 'What areas of Wisconsin do you serve?',
          answer: 'We primarily buy in Milwaukee and the surrounding Milwaukee County suburbs. Not sure if your property qualifies? Reach out and we\'ll let you know.',
        },
        {
          question: 'Can you help if I\'m facing foreclosure or need to sell quickly?',
          answer: 'Yes. We work with homeowners in all situations: foreclosure, inherited properties, estate sales, relocation, divorce, or just needing a fast sale. We understand urgency and can often close in weeks, not months.',
        },
      ],
    },
    'wisconsin/milwaukee': {
      image: IMAGES.milwaukeeHero,
      heading: 'We Buy Houses in Milwaukee, WI. Sell Fast. Get Cash.',
      summary:
        'Sell your Milwaukee house as-is, with no repairs, no showings and no commissions. Get a cash offer and close in as little as 14 days.',
      metaDescription:
        'We buy houses in Milwaukee, WI in any condition. No repairs, no fees or commissions, and closing in 14 to 30 days. Get your cash offer.',
      intro: [
        'Whether your house needs work, sits empty, came to you through an estate or has tenants you are tired of managing, we can make you a cash offer on it as it stands today.',
        'There are no repairs to make, no open houses to host and no commissions taken out at closing. You get a clear number, and you decide.',
      ],
      guide: {
        introTitle: 'Sell your house As-Is',
        introCta: true,
        sections: [
          {
            id: 'houses-we-buy',
            title: 'You Don\'t Need a Perfect House or Situation to Sell It.',
            body: ['If you own it in Milwaukee and want to move on from it, tell us about it.'],
            list: [
              'Houses needing repairs',
              'Inherited houses',
              'Vacant houses',
              'Duplexes and rentals',
              'Facing foreclosure',
              'Any other reason',
            ],
            after: ['Not sure your property fits? Ask us. It costs nothing.'],
            cta: true,
          },
          {
            id: 'milwaukee-homes',
            title: 'We know Milwaukee properties.',
            body: [
              'Many Milwaukee homes are decades old, and getting one ready for the open market can mean months of contractors, inspections and surprise costs before a buyer even walks through.',
              'We buy houses exactly as they are. We factor the work into our offer and handle every repair after closing, so you never spend a dollar or a weekend on the house again.',
              'An as-is offer will usually be lower than what a fully renovated house might list for. What you get in return is certainty, speed and no out-of-pocket costs.',
            ],
            items: [
              {
                title: 'Older homes',
                body: 'Aging systems, deferred maintenance or dated interiors. We price the work in, not against you.',
              },
              {
                title: 'Duplexes and multi-unit',
                body: 'Milwaukee has a deep stock of duplexes. We buy them owner-occupied, tenant-occupied or empty.',
              },
              {
                title: 'Vacant properties',
                body: 'An empty house keeps costing you every month. We can take it off your hands quickly.',
              },
              {
                title: 'Vacant building registration',
                body: 'A house left empty 30 days or more must be registered with the Department of Neighborhood Services. Longer vacancies bring inspections and fees.',
              },
              {
                title: 'Rental property registration',
                body: 'Non-owner-occupied homes must be registered with the city, and a new owner has 15 days after the sale to re-register.',
              },
              {
                title: 'Open code violations',
                body: 'Unresolved city orders transfer to the next owner and often scare off retail buyers.',
              },
            ],
            after: [
              'Selling as-is to us means you do not have to clear these up first. Tell us what is open and we will factor it into the offer.',
            ],
            note: 'Source: City of Milwaukee Department of Neighborhood Services.',
            noteUrl: 'https://city.milwaukee.gov/dns',
          },
          {
            id: 'why-us',
            title: 'Why work with us?',
            body: [
              'I created GetHomeOffer because Milwaukee homeowners deserve better options. I grew up in Wisconsin and studied real estate and risk management at UW-Madison (both top-ranked programs). I understand both the market and the people in it.',
              'What I offer: straightforward cash offers based on real numbers, not guesswork. I buy as-is, close fast with proof of funds, and listen to your timeline and concerns. You get certainty and speed, with no inspections, appraisals, or commission fees. And often, our offer is more than what competing buyers propose.',
            ],
            badgeImage: '/images/number1-badge.png',
            cta: true,
          },
          {
            id: 'service-area',
            title: 'Milwaukee and nearby suburbs.',
            body: ['We buy houses across the city and the surrounding Milwaukee County suburbs, including:'],
            list: [
              'Wauwatosa',
              'West Allis',
              'Greenfield',
              'Oak Creek',
              'Franklin',
              'Cudahy',
              'South Milwaukee',
              'St. Francis',
              'Shorewood',
              'Whitefish Bay',
              'Glendale',
              'Brown Deer',
            ],
            after: ['Near Milwaukee but not listed? Ask us anyway.'],
            cta: true,
          },
        ],
        stepsTitle: 'How selling your Milwaukee house works.',
        steps: [
          { title: 'Tell us about it', body: 'Share the address and a few details. It takes a few minutes.' },
          { title: 'We review it', body: 'We look at the condition, location and your situation.' },
          { title: 'Get your offer', body: 'A straightforward cash offer, with no fees or commissions.' },
          { title: 'You decide', body: 'No pressure and no obligation to accept.' },
          { title: 'Close and get paid', body: 'Pick your date, typically 14 to 30 days out.' },
        ],
        citiesTitle: 'Other Wisconsin cities we serve',
        closing: {
          title: 'See what we could offer for your Milwaukee house.',
          body: 'Tell us about your property and your situation. We will review it and get back to you with a straightforward cash offer.',
          secondaryLabel: 'See all Wisconsin cities',
          secondaryPath: '/we-buy-houses-cash/wisconsin/',
        },
        faqTitle: 'Questions Milwaukee sellers ask.',
      },
      faqs: [
        {
          question: 'Do you buy houses as-is in Milwaukee?',
          answer: 'Yes, in any condition. No repairs, cleaning or updates needed.',
        },
        {
          question: 'How much will you pay for my house?',
          answer:
            'Every offer is calculated for your specific property, based on its condition, location and value. Tell us about it and we will give you a straightforward number.',
        },
        {
          question: 'Are there any fees or commissions?',
          answer: 'No. There are no realtor commissions, listing fees or hidden costs.',
        },
        {
          question: 'How quickly can you close?',
          answer: 'Typically 14 to 30 days. We can often work around the date you need.',
        },
        {
          question: 'Can you buy a house with tenants, or one I inherited?',
          answer: 'Yes. We buy tenant-occupied, vacant and inherited properties.',
        },
        {
          question: 'Do you buy houses outside Milwaukee?',
          answer: 'Yes. We buy throughout the nearby suburbs, from Wauwatosa and West Allis to Oak Creek and Brown Deer.',
        },
        {
          question: 'Do I have to accept your offer?',
          answer: 'No. Our offer comes with no obligation. You decide whether it works for you.',
        },
      ],
    },
  },
  agent: {},
};
