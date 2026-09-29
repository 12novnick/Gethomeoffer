import type { Faq } from './location-content';

export interface FaqCategory {
  id: string;
  title: string;
  faqs: Faq[];
}

// Draft answers that restate how the site describes each program. Confirm with the business before launch.
export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'general',
    title: 'General Questions',
    faqs: [
      {
        question: 'What is GetHomeOffer?',
        answer:
          'GetHomeOffer helps property owners explore two ways to sell: a direct sale through our Cash Program, or a traditional sale on the open market through our Agent Program.',
      },
      {
        question: 'How do I know which program is right for me?',
        answer:
          "It depends on your priorities. A direct sale tends to suit owners who value simplicity and certainty. The traditional market tends to suit owners who want to see what the open market will offer and have flexibility on timing. Tell us about your situation and we'll help you compare.",
      },
      {
        question: 'Am I committing to anything by reaching out?',
        answer:
          'No. Sharing details about your property does not commit you to either program. You decide whether and how to move forward.',
      },
      {
        question: 'What information do you need to get started?',
        answer: 'The property address and a few details about the home and your situation.',
      },
    ],
  },
  {
    id: 'cash',
    title: 'Cash Program',
    faqs: [
      {
        question: 'How does the Cash Program work?',
        answer:
          "You tell us about the property, we review its details, condition and local market, and we present a straightforward offer. You take the time you need to decide. If you move forward, we work toward a closing date that fits your plans.",
      },
      {
        question: 'What kinds of properties do you consider?',
        answer:
          'Single-family homes, condos and townhomes, small multi-family properties (2–4 units), inherited and estate properties, vacant properties, homes needing repairs and rental properties.',
      },
      {
        question: 'Do I need to make repairs before selling?',
        answer:
          'The Cash Program considers properties in their current condition, so you do not need to prepare the home the way you would for a traditional listing.',
      },
      {
        question: 'Will there be showings or open houses?',
        answer: 'No. A direct sale does not involve listing the property, so there are no public showings or open houses.',
      },
      {
        question: 'How is the offer determined?',
        answer:
          "We review the property's details, condition and local market, and we explain how we arrived at the offer.",
      },
    ],
  },
  {
    id: 'agent',
    title: 'Agent Program',
    faqs: [
      {
        question: 'How does the Agent Program work?',
        answer:
          'You tell us about your property and your goals, and we help you explore connecting with a real estate professional in your area. Your agent then guides pricing, preparation, marketing, showings, negotiation and closing.',
      },
      {
        question: 'What does a real estate agent help with?',
        answer:
          'Recommending a list price, advising on preparation, marketing the home, coordinating showings, negotiating offers and keeping the sale moving through closing.',
      },
      {
        question: 'How long does a traditional sale take?',
        answer:
          'Timelines vary with the local market, the property and the buyer. Your agent can give you a realistic picture for your area before you decide to list.',
      },
    ],
  },
  {
    id: 'locations',
    title: 'Locations',
    faqs: [
      {
        question: 'Where do you operate?',
        answer:
          'The Cash Program and Agent Program pages each list the states we serve. Choose your state to see the cities covered.',
      },
      {
        question: "My city isn't listed. Can you still help?",
        answer: "Possibly. Tell us where your property is and we'll let you know which options are available.",
      },
    ],
  },
];
