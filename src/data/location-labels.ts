import type { ProgramId } from './location-content';
import { AGENT_PROGRAM, CASH_PROGRAM, type Program } from './programs';

interface LocationLabels {
  program: Program;
  stateTitle: (state: string) => string;
  cityTitle: (city: string, abbr: string) => string;
  citiesTitle: (state: string) => string;
  stateDescription: (state: string) => string;
  cityDescription: (city: string, abbr: string) => string;
}

export const LOCATION_LABELS: Record<ProgramId, LocationLabels> = {
  cash: {
    program: CASH_PROGRAM,
    stateTitle: (state) => `We Buy Houses for Cash in ${state}`,
    cityTitle: (city, abbr) => `We Buy Houses for Cash in ${city}, ${abbr}`,
    citiesTitle: (state) => `Cities We Serve in ${state}`,
    stateDescription: (state) =>
      `Explore a direct sale for your ${state} property. See how the Cash Program works, the properties we consider and the cities we serve.`,
    cityDescription: (city, abbr) =>
      `Explore a direct sale for your ${city}, ${abbr} property and get a straightforward cash offer. See how the Cash Program works locally.`,
  },
  agent: {
    program: AGENT_PROGRAM,
    stateTitle: (state) => `Find a Real Estate Agent in ${state}`,
    cityTitle: (city, abbr) => `Find a Real Estate Agent in ${city}, ${abbr}`,
    citiesTitle: (state) => `Where Our Agent Program Operates in ${state}`,
    stateDescription: (state) =>
      `Selling on the traditional market in ${state}? Learn how the Agent Program helps you explore connecting with a real estate professional.`,
    cityDescription: (city, abbr) =>
      `Selling a home in ${city}, ${abbr}? Learn about pricing, preparation, marketing, showings and closing, and how the Agent Program works.`,
  },
};
