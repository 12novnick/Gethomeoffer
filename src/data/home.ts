import { IMAGES, type ImageAsset } from './images';

export interface Situation {
  title: string;
  body: string;
  image: ImageAsset;
}

export const SITUATIONS: Situation[] = [
  {
    title: 'Inherited property',
    body: "A home that holds a family's history, and now a decision about what comes next.",
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
    title: 'Simply exploring',
    body: "No decision yet. You'd just like to understand your property's value and your options.",
    image: IMAGES.situationExploring,
  },
];

export const PILLARS = [
  {
    word: 'Simple',
    body: "A clear process with plain-language next steps, so you always know where things stand.",
  },
  {
    word: 'Transparent',
    body: 'We explain how each option works so you can compare them on your own terms.',
  },
  {
    word: 'Flexible',
    body: 'A direct sale or the traditional market. You choose the path that fits your situation.',
  },
];

export const STEPS = [
  {
    number: '01',
    title: 'Tell us about your property.',
    body: 'Share the address and a few details about the home.',
  },
  {
    number: '02',
    title: 'We understand your situation.',
    body: "We learn about your timeline, your goals and the property's condition.",
  },
  {
    number: '03',
    title: 'Explore your options.',
    body: 'Compare a direct sale with a path to the traditional market.',
  },
  {
    number: '04',
    title: 'Move forward.',
    body: 'You decide what comes next, on a timeline that works for you.',
  },
];
