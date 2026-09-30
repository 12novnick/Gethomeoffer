import { IMAGES, type ImageAsset } from './images';

export interface Situation {
  title: string;
  body: string;
  image: ImageAsset;
}

export const SITUATIONS: Situation[] = [
  {
    title: 'Inherited property',
    body: "A property with a history of its own. Maybe it's weighing you down.",
    image: IMAGES.situationInherited,
  },
  {
    title: 'Relocation',
    body: 'A new job or a new city, and a property that needs a plan that fits your timeline.',
    image: IMAGES.situationRelocation,
  },
  {
    title: 'Vacant property',
    body: "A house that's sitting empty while taxes, utilities and upkeep keep arriving.",
    image: IMAGES.situationVacant,
  },
  {
    title: 'Significant repairs',
    body: 'A property that needs more work than you want to take on before selling.',
    image: IMAGES.situationRepairs,
  },
  {
    title: 'Tired of being a landlord',
    body: "Years of tenants and maintenance, and you're ready to step back.",
    image: IMAGES.situationLandlord,
  },
  {
    title: 'Downsizing',
    body: 'More space than you need, and a simpler next chapter in mind.',
    image: IMAGES.situationDownsizing,
  },
  {
    title: 'Other',
    body: "Not seeing your situation? You're not alone, tell us about your property and what you're hoping to accomplish.",
    image: IMAGES.situationExploring,
  },
];

export const PILLARS = [
  {
    word: 'Consistency',
    body: 'We have a repeatable process that keeps things organized and moving forward.',
  },
  {
    word: 'Transparency',
    body: "You'll know what's happening and what comes next. You should never feel like you're guessing your way throughout the sales process.",
  },
  {
    word: 'Adaptability',
    body: "We work on your timeline and for the specific situation you're facing.",
  },
];

export const STEPS = [
  {
    number: '01',
    title: 'Tell us about your property.',
    body: 'Share a few details about the home.',
  },
  {
    number: '02',
    title: 'We listen to your situation.',
    body: "We learn about your timeline, your goals, and the property's condition.",
  },
  {
    number: '03',
    title: 'Explore your options.',
    body: 'Compare a cash sale with a path to the traditional market.',
  },
  {
    number: '04',
    title: 'Move forward.',
    body: 'You decide what comes next, on a timeline that works for you.',
  },
];
