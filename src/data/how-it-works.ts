export interface JourneyStage {
  label: string;
  title: string;
  body: string;
  branch?: boolean;
}

export const JOURNEY: JourneyStage[] = [
  {
    label: 'Your property',
    title: 'It starts with your property.',
    body: 'Share the address and a few details about the home. That is all we need to begin.',
  },
  {
    label: 'Your situation',
    title: 'Then, your situation.',
    body: "Your timeline, your goals and the property's condition shape which path makes sense.",
  },
  {
    label: 'Your options',
    title: 'We walk through your options.',
    body: 'We explain what each path could look like for you, in plain language.',
  },
  {
    label: 'Two paths',
    title: 'Cash Program or Agent Program.',
    body: 'Choose the path that fits. Each is explained step by step below.',
    branch: true,
  },
  {
    label: 'Your next move',
    title: 'You decide what comes next.',
    body: 'There is no obligation to choose either path. When you are ready, you move forward on your terms.',
  },
];
