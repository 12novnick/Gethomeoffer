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
  /** Omit to hide the intro block (the intro text still publishes the page). */
  introTitle?: string;
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
  /** ISO dates for WebPage schema. Change `modified` only when this page's content changes. */
  published?: string;
  modified?: string;
  /** Custom H1; defaults to the program's location title. */
  heading?: string;
  /** Full <title> when it should differ from the program default. */
  metaTitle?: string;
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
    'wisconsin/milwaukee': {
      published: '2026-10-02',
      modified: '2026-10-12',
      image: IMAGES.milwaukeeHero,
      // Suburbs served; shown in the "Areas we serve" strip under the hero.
      areas: ['Wauwatosa', 'West Allis', 'Greenfield', 'Oak Creek', 'Franklin', 'Cudahy', 'South Milwaukee', 'St. Francis', 'Shorewood', 'Whitefish Bay', 'Glendale', 'Brown Deer'],
      heading: 'We Buy Houses Milwaukee, WI. Sell Fast. Get Cash.',
      metaTitle: 'We Buy Houses Milwaukee, WI | Fast Cash Offers | Get Home Offer',
      summary:
        'Sell your Milwaukee house as-is, with no repairs, no showings and no commissions. Get a cash offer and close in as little as 14 days.',
      metaDescription:
        'We buy houses Milwaukee-wide in any condition. No repairs, no fees or commissions, and closing in 14 to 30 days. Get your cash offer.',
      intro: [
        'Whether your house needs work, sits empty, came to you through an estate or has tenants you are tired of managing, we can make you a cash offer on it as it stands today.',
        'There are no repairs to make, no open houses to host and no commissions taken out at closing. You get a clear number, and you decide.',
      ],
      guide: {
        sections: [
          {
            id: 'why-us',
            title: 'Why work with us?',
            body: [
              'I created Get Home Offer because Milwaukee homeowners deserve better options. I grew up in Wisconsin and studied real estate and risk management at UW-Madison (both top-ranked programs). I understand both the market and the people in it.',
              'What I offer: straightforward cash offers based on real numbers, not guesswork. I buy as-is, close fast with proof of funds, and listen to your timeline and concerns. You get certainty and speed, with no inspections, appraisals, or commission fees. And often, our offer is more than what competing buyers propose.',
            ],
            badgeImage: '/images/number1-badge.png',
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
          secondaryLabel: 'See all locations',
          secondaryPath: '/locations/',
        },
      },
      faqs: [],
    },
    'wisconsin/madison': {
      published: '2026-10-13',
      modified: '2026-10-13',
      heading: 'We Buy Houses Madison, WI. Sell Fast. Get Cash.',
      metaTitle: 'We Buy Houses Madison, WI | Fast Cash Offers | Get Home Offer',
      summary:
        'Sell your Madison house as-is, with no repairs, no showings and no commissions. Get a cash offer from a local Madison team and close in as little as 14 days.',
      metaDescription:
        'We buy houses in Madison, WI in any condition. Local Madison office, no repairs, no fees or commissions, and closing in 14 to 30 days. Get your cash offer.',
      intro: [
        'Get Home Offer is based right here in Madison. Whether your house needs work, sits empty, came to you through an estate or has tenants you are tired of managing, we can make you a cash offer on it as it stands today.',
        'There are no repairs to make, no open houses to host and no commissions taken out at closing. You get a clear number, and you decide.',
      ],
      guide: {
        introTitle: 'Sell your Madison house As-Is',
        introCta: true,
        sections: [
          {
            id: 'houses-we-buy',
            title: "You Don't Need a Perfect House or Situation to Sell It.",
            body: ['If you own it in Madison and want to move on from it, tell us about it.'],
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
            id: 'madison-homes',
            title: 'We know Madison properties.',
            body: [
              'Getting a house ready for the open market can mean months of contractors, inspections and surprise costs before a buyer even walks through.',
              'We buy houses exactly as they are. We factor the work into our offer and handle every repair after closing, so you never spend a dollar or a weekend on the house again.',
              'An as-is offer will usually be lower than what a fully renovated house might list for. What you get in return is certainty, speed and no out-of-pocket costs.',
            ],
            items: [
              {
                title: 'Older homes',
                body: 'Aging systems, deferred maintenance or dated interiors. We price the work in, not against you.',
              },
              {
                title: 'Rentals and student housing',
                body: 'Tired of being a landlord? We buy rentals owner-occupied, tenant-occupied or empty.',
              },
              {
                title: 'Duplexes and multi-unit',
                body: 'Small multi-family properties of two to four units are welcome.',
              },
              {
                title: 'Vacant properties',
                body: 'An empty house keeps costing you every month. We can take it off your hands quickly.',
              },
              {
                title: 'Inherited and estate homes',
                body: "Sell without clearing out, cleaning or fixing up a loved one's house first.",
              },
              {
                title: 'Relocating',
                body: 'Moving for a new job or a new chapter? Sell on your schedule without carrying two homes.',
              },
            ],
          },
          {
            id: 'why-us',
            title: 'Why work with a local Madison buyer?',
            body: [
              'I created Get Home Offer because Wisconsin homeowners deserve better options. I grew up in Wisconsin and studied real estate and risk management at UW-Madison (both top-ranked programs). I understand both the market and the people in it.',
              'What I offer: straightforward cash offers based on real numbers, not guesswork. I buy as-is, close fast with proof of funds, and listen to your timeline and concerns. You get certainty and speed, with no inspections, appraisals, or commission fees.',
            ],
            badgeImage: '/images/number1-badge.png',
            cta: true,
          },
          {
            id: 'office',
            title: 'Visit our Madison office.',
            body: ['Get Home Offer, 1723 Waldorf Blvd, Suite 401, Madison, WI 53719.'],
            list: ['Phone: (608) 571-4547', 'Email: info@gethomeoffer.com', 'Open every day, 9am to 9pm'],
            note: 'Get directions on Google Maps',
            noteUrl: 'https://www.google.com/maps/search/?api=1&query=1723+Waldorf+Blvd+Suite+401+Madison+WI+53719',
          },
          {
            id: 'service-area',
            title: 'Madison and nearby communities.',
            body: ['We buy houses across Madison and the surrounding Dane County communities, including:'],
            list: [
              'Middleton',
              'Fitchburg',
              'Verona',
              'Sun Prairie',
              'Monona',
              'McFarland',
              'Waunakee',
              'Cottage Grove',
              'DeForest',
              'Oregon',
              'Stoughton',
              'Maple Bluff',
            ],
            after: ['Near Madison but not listed? Ask us anyway.'],
            cta: true,
          },
        ],
        stepsTitle: 'How selling your Madison house works.',
        steps: [
          { title: 'Tell us about it', body: 'Share the address and a few details. It takes a few minutes.' },
          { title: 'We review it', body: 'We look at the condition, location and your situation.' },
          { title: 'Get your offer', body: 'A straightforward cash offer, with no fees or commissions.' },
          { title: 'You decide', body: 'No pressure and no obligation to accept.' },
          { title: 'Close and get paid', body: 'Pick your date, typically 14 to 30 days out.' },
        ],
        citiesTitle: 'Other Wisconsin cities we serve',
        closing: {
          title: 'See what we could offer for your Madison house.',
          body: 'Tell us about your property and your situation. We will review it and get back to you with a straightforward cash offer.',
          secondaryLabel: 'See all locations',
          secondaryPath: '/locations/',
        },
        faqTitle: 'Questions Madison sellers ask.',
      },
      faqs: [
        {
          question: 'Do you buy houses as-is in Madison?',
          answer: 'Yes, in any condition. No repairs, cleaning or updates needed.',
        },
        {
          question: 'Are you a local Madison company?',
          answer:
            'Yes. Our office is at 1723 Waldorf Blvd, Suite 401, Madison, WI 53719, and we are open every day from 9am to 9pm.',
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
          question: 'Can you buy a rental with tenants, or a house I inherited?',
          answer: 'Yes. We buy tenant-occupied, vacant and inherited properties.',
        },
        {
          question: 'Do you buy houses outside Madison?',
          answer:
            'Yes. We buy throughout nearby Dane County communities, from Middleton and Fitchburg to Sun Prairie and Verona.',
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
