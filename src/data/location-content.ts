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
  cta?: boolean;
  tone?: 'default' | 'surface';
  /** Visually secondary section. */
  quiet?: boolean;
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
const ESRI_ALABAMA =
  'Source: Esri Housing Profile, Alabama. Esri forecasts for 2026 and 2031; U.S. Census Bureau 2020 Decennial Census data. © 2026 Esri.';

export const LOCATION_CONTENT: Record<ProgramId, Record<string, LocalContent>> = {
  cash: {
    alabama: {
      summary:
        'Looking to sell a property in Alabama? Explore a straightforward cash option and find a path that fits your situation.',
      metaDescription:
        "GetHomeOffer helps Alabama property owners explore a direct cash sale for qualifying homes and properties. Learn how it works and explore your options.",
      intro: [
        "Selling a property doesn't always follow the traditional path. Whether you've inherited a home, are relocating, own a vacant property, or simply want to explore your options, GetHomeOffer gives you another way to move forward.",
        "With GetHomeOffer, qualifying properties can be considered in their current condition. You don't necessarily have to make the property market-ready before you explore a direct sale.",
      ],
      guide: {
        introTitle: 'A different way to sell your Alabama property.',
        introCta: true,
        sections: [
          {
            id: 'alabama-market',
            title: "Alabama's housing market is diverse.",
            tone: 'surface',
            body: [
              'Alabama is home to more than 5.1 million people, with an estimated 2.4 million housing units in 2026. About 60% of those housing units are owner-occupied, while approximately 12% are vacant.',
            ],
            stats: [
              { value: '5.17M', label: 'Estimated population, 2026' },
              { value: '2.42M', label: 'Housing units, 2026' },
              { value: '60.3%', label: 'Owner-occupied housing' },
              { value: '12.2%', label: 'Vacant housing' },
            ],
            note: ESRI_ALABAMA,
          },
          {
            id: 'alabama-urban-rural',
            title: "Some properties aren't ready for the traditional market.",
            body: [
              "Across Alabama, the housing landscape includes both urban and rural properties. Census 2020 data in the Esri profile shows approximately 58% of Alabama's housing units were in urban areas and 42% were in rural areas.",
              "A property doesn't have to fit a particular mold for you to explore your options. Whether you're dealing with a vacant house, an inherited property, a home that needs repairs, or simply a property you're ready to move on from, GetHomeOffer gives you a way to start the conversation.",
            ],
            stats: [
              { value: '57.9%', label: 'Urban housing units, 2020' },
              { value: '42.1%', label: 'Rural housing units, 2020' },
            ],
            note: ESRI_ALABAMA,
          },
          {
            id: 'alabama-vacant',
            title: 'A vacant property can be a different kind of responsibility.',
            tone: 'surface',
            body: [
              "A vacant property can sit unused while still requiring attention, maintenance, insurance, taxes, and oversight. Alabama's 2020 Census data counted 276,383 vacant housing units statewide, with different reasons behind that vacancy.",
            ],
            table: {
              caption: 'Vacant housing units by status, Alabama, 2020',
              rows: [
                { label: 'For rent', count: '71,571', share: '25.9%' },
                { label: 'Rented, not occupied', count: '6,348', share: '2.3%' },
                { label: 'For sale only', count: '22,588', share: '8.2%' },
                { label: 'Sold, not occupied', count: '12,340', share: '4.5%' },
                { label: 'Seasonal, recreational or occasional use', count: '57,294', share: '20.7%' },
                { label: 'For migrant workers', count: '197', share: '0.1%' },
                { label: 'Other vacant', count: '106,045', share: '38.4%' },
              ],
            },
            after: [
              "If you own a vacant Alabama property and are considering selling, you don't necessarily have to bring it back to perfect condition before exploring your options.",
            ],
            note: ESRI_ALABAMA,
            cta: true,
          },
          {
            id: 'alabama-values',
            title: 'Every Alabama property is different.',
            body: [
              "Property values vary widely across Alabama. Esri's 2026 Housing Profile estimates the median value of owner-occupied housing units statewide at approximately $245,000, while the average value is approximately $299,000. Esri's 2031 forecast shows a projected median value of $308,747 and average value of $356,226.",
              "But statewide numbers don't determine what your individual property is worth. Location, condition, size, improvements, property characteristics, and the circumstances of the sale all matter.",
              "That's why we start with your property, rather than assuming every house fits the same formula.",
            ],
            stats: [
              { value: '$245K', label: '2026 median owner-occupied housing value' },
              { value: '$299K', label: '2026 average owner-occupied housing value' },
            ],
            note: `${ESRI_ALABAMA} Statewide figures are not an estimate of any individual property's value.`,
          },
          {
            id: 'alabama-as-is',
            title: 'What does selling as-is mean in Alabama?',
            tone: 'surface',
            body: [
              `If you're considering selling a house in Alabama, you may have heard the term "as-is." It can sound more complicated than it really is.`,
              "In simple terms, selling a property as-is means the property is being offered in its current condition. You don't have to make the house look perfect or complete every repair before you explore a sale.",
              "For homeowners who don't want to spend months making repairs, updating an older property, or preparing a house for showings, an as-is sale can provide another option.",
            ],
          },
          {
            id: 'alabama-caveat-emptor',
            title: 'What does "buyer beware" mean in Alabama?',
            body: [
              'Alabama generally follows the legal principle known as caveat emptor, or "let the buyer beware," when it comes to sales of existing residential property.',
              "In practical terms, buyers generally have responsibility for investigating the condition of a property before completing the purchase. That can include looking at the property's condition, asking questions, and conducting appropriate inspections.",
              '"As-is" does not mean that everything becomes negotiation-free or that a buyer cannot investigate the property. The buyer can still evaluate the property before closing and decide whether the proposed transaction makes sense.',
            ],
            note: "Alabama's caveat emptor framework and the legal effect of an as-is provision can depend on the specific transaction and contract. This page is intended for general information, not legal advice. Property owners with specific legal questions should consult their own Alabama real-estate attorney or other qualified professional.",
          },
          {
            id: 'alabama-seller',
            title: "What does that mean if you're selling your house?",
            tone: 'surface',
            body: [
              "If you're selling your Alabama property to an as-is buyer, you aren't necessarily expected to repair everything before the buyer considers purchasing it.",
              "You can tell the buyer about the property's current condition, and the buyer can evaluate the property based on that information. Property conditions may include:",
            ],
            list: [
              'Older roof',
              'Outdated kitchen or bathrooms',
              'Deferred maintenance',
              'Structural concerns',
              'Plumbing or electrical issues',
              'Water damage',
              'Vacant or neglected interior',
              'Significant cosmetic repairs',
            ],
            after: ["An as-is buyer can take the property's condition into account when evaluating the purchase."],
          },
          {
            id: 'alabama-options',
            title: 'You still have options.',
            body: [
              'One of the biggest misconceptions about an as-is sale is that the phrase means there can be no discussion about the property. That is not necessarily the case.',
              'Before closing, the parties can still discuss the property\'s condition and negotiate the terms of the transaction. Depending on the circumstances, discussions can involve the purchase price, repairs, closing terms, and other conditions of the transaction.',
              `"As-is" describes the property's condition; it doesn't mean you lose your ability to make decisions about the transaction. You can:`,
            ],
            list: [
              'Ask questions',
              'Have the property evaluated',
              'Discuss the terms',
              'Decide whether the offer and transaction are right for you',
            ],
          },
          {
            id: 'alabama-why',
            title: 'Why some Alabama homeowners choose to sell as-is.',
            tone: 'surface',
            items: [
              {
                title: 'Making repairs',
                body: 'Fixing a roof, updating a bathroom, replacing flooring, or addressing other issues can become expensive.',
              },
              {
                title: 'Preparing the property',
                body: 'Cleaning, painting, landscaping, decluttering, and staging can take time and effort.',
              },
              {
                title: 'Coordinating contractors',
                body: 'Major repairs can require finding contractors, getting estimates, managing schedules, and waiting for work to be completed.',
              },
              {
                title: 'The traditional-market process',
                body: 'A traditional sale may involve showings, negotiations, inspections, financing, and other steps before closing.',
              },
            ],
            after: [
              'An as-is sale can be an alternative for homeowners who would rather explore selling the property in its current condition. For owners who prefer the traditional route, our Real Estate Agent Program is another path.',
            ],
          },
          {
            id: 'alabama-approach',
            title: 'How GetHomeOffer approaches as-is properties.',
            body: [
              'At GetHomeOffer, we buy qualifying properties as-is. That means you can tell us about your property as it exists today, even if it needs work.',
              "We consider the property's current condition when evaluating whether we can purchase it. You don't need to make the property perfect just to start a conversation with us.",
              "If the property is something we're interested in purchasing, we'll evaluate the situation and determine whether we can make an offer. You can then decide whether that offer and the terms of the transaction are right for you.",
              "There is no need to assume that an as-is sale is automatically the right choice. It's simply another option to consider.",
            ],
            cta: true,
          },
          {
            id: 'alabama-questions',
            title: 'As-is doesn\'t mean "no questions asked."',
            quiet: true,
            body: [
              "Selling as-is doesn't mean you should avoid asking questions or skip appropriate due diligence. The time to investigate concerns and discuss the terms of a transaction is before closing.",
              "If you're considering selling your Alabama property, make sure you understand the purchase agreement and the terms you're agreeing to. If you have questions about your legal rights or obligations, consider speaking with an Alabama real-estate attorney.",
            ],
          },
        ],
        stepsTitle: 'How selling your Alabama property works.',
        steps: [
          { title: 'Tell us about the property.', body: 'Give us the address and some basic information about the house.' },
          {
            title: 'We evaluate the property.',
            body: "We'll learn more about the property, including its current condition and your situation.",
          },
          {
            title: 'Review the offer.',
            body: "If we're able to purchase the property, we'll present the terms for you to consider.",
          },
          {
            title: "Decide what's next.",
            body: 'You can review the offer and determine whether moving forward makes sense for you.',
          },
        ],
        citiesTitle: 'Where we buy houses in Alabama.',
        closing: {
          title: 'From Alabama property to your next move.',
          body: "Your property is part of your story. Whether you're ready to sell or simply exploring what's possible, we're here to help you understand your options.",
          secondaryLabel: 'Explore Your Options',
          secondaryPath: '/services/',
        },
        faqTitle: 'Questions about selling a house for cash in Alabama?',
      },
      faqs: [
        {
          question: 'How does selling a house for cash in Alabama work?',
          answer:
            "You tell us about the property, we evaluate it, including its current condition and your situation, and if we're able to purchase it we present the terms. You then decide whether moving forward makes sense for you.",
        },
        {
          question: 'What does "as-is" mean when selling a house?',
          answer:
            "It means the property is offered in its current condition. You don't have to complete every repair before exploring a sale. It describes the property's condition; it doesn't take away your ability to ask questions, discuss terms, or decide.",
        },
        {
          question: 'Do I need to make repairs before selling my Alabama house?',
          answer:
            "Not necessarily. We evaluate qualifying properties in their current condition, so you don't need to make the property perfect just to start a conversation with us.",
        },
        {
          question: 'Can I sell an inherited property for cash?',
          answer:
            "Inherited properties are one of the situations we're glad to hear about. Tell us about the property and your situation, and we'll let you know whether it's something we can evaluate.",
        },
        {
          question: 'Can I sell a vacant house in Alabama?',
          answer:
            "Yes, you can tell us about a vacant property. You don't necessarily have to bring it back to perfect condition before exploring your options.",
        },
        {
          question: 'What types of properties do you buy in Alabama?',
          answer:
            "We consider qualifying residential properties in a range of conditions. Tell us about yours and we'll let you know whether it's something we're able to purchase.",
        },
        {
          question: 'How quickly can I sell my Alabama property?',
          answer:
            "It depends on the property and the terms of the transaction. If we make an offer, the closing timeline is part of the terms you review before deciding.",
        },
        {
          question: 'What happens after I request an offer?',
          answer:
            "We'll learn more about the property and your situation. If we're able to purchase it, we'll present the terms for you to consider, and the decision is yours.",
        },
        {
          question: 'Can I sell my house if it needs major repairs?',
          answer:
            "You can tell us about it. We consider the property's current condition when evaluating whether we can purchase it. We can't promise an offer on every property, but repairs alone don't rule out a conversation.",
        },
        {
          question: 'Should I sell my Alabama house for cash or use a real estate agent?',
          answer:
            "It depends on what matters most to you. A cash sale can suit owners who want to sell in the property's current condition. If reaching the open market matters more, our Real Estate Agent Program is built for a traditional sale. Either way, the choice is yours.",
        },
      ],
    },
  },
  agent: {},
};
