export type Pathway = 'cash' | 'agent' | 'unsure';

// Values must match PROPERTY_TYPES in worker/src/index.ts.
export const PROPERTY_TYPES: { value: string; label: string; hint?: string }[] = [
  { value: 'single-family', label: 'Single-family home' },
  { value: 'townhouse', label: 'Townhouse or attached single-family home' },
  { value: 'condo', label: 'Apartment or condo' },
  { value: 'mobile', label: 'Mobile or manufactured home' },
  { value: 'multi-family', label: 'Multi-family', hint: '3+ units in a single structure' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'lot', label: 'Empty lot' },
];

// Values must match KITCHEN_CONDITIONS in worker/src/index.ts.
export const KITCHEN_CONDITIONS = [
  { value: 'Fixer upper', hint: 'Kitchen needs significant repairs', image: 'kitchenFixerUpper' },
  { value: 'Dated', hint: "Kitchen hasn't been updated recently", image: 'kitchenDated' },
  { value: 'Standard', hint: 'Kitchen is updated with common finishes', image: 'kitchenStandard' },
  { value: 'High end', hint: 'Kitchen has high-quality upgrades', image: 'kitchenHighEnd' },
  { value: 'Luxury', hint: 'Kitchen has elegant, top-tier finishes', image: 'kitchenLuxury' },
] as const;

// Values must match BATHROOM_CONDITIONS in worker/src/index.ts.
export const BATHROOM_CONDITIONS = [
  { value: 'Fixer upper', hint: 'Bathroom needs significant repairs', image: 'bathroomFixerUpper' },
  { value: 'Dated', hint: "Bathroom hasn't been updated recently", image: 'bathroomDated' },
  { value: 'Standard', hint: 'Bathroom is updated with common finishes', image: 'bathroomStandard' },
  { value: 'High end', hint: 'Bathroom has high-quality upgrades', image: 'bathroomHighEnd' },
  { value: 'Luxury', hint: 'Bathroom has elegant, top-tier finishes', image: 'bathroomLuxury' },
] as const;

// Values must match LIVING_ROOM_CONDITIONS in worker/src/index.ts.
export const LIVING_ROOM_CONDITIONS = [
  { value: 'Fixer upper', hint: 'Living room needs significant repairs', image: 'livingRoomFixerUpper' },
  { value: 'Dated', hint: "Living room hasn't been updated recently", image: 'livingRoomDated' },
  { value: 'Standard', hint: 'Living room is updated with common finishes', image: 'livingRoomStandard' },
  { value: 'High end', hint: 'Living room has high-quality upgrades', image: 'livingRoomHighEnd' },
  { value: 'Luxury', hint: 'Living room has elegant, top-tier finishes', image: 'livingRoomLuxury' },
] as const;

// Values must match EXTERIOR_CONDITIONS in worker/src/index.ts.
export const EXTERIOR_CONDITIONS = [
  { value: 'Fixer upper', hint: 'Exterior needs significant repairs', image: 'exteriorFixerUpper' },
  { value: 'Dated', hint: "Exterior hasn't been updated recently", image: 'exteriorDated' },
  { value: 'Standard', hint: 'Exterior is updated with common finishes', image: 'exteriorStandard' },
  { value: 'High end', hint: 'Exterior has high-quality upgrades', image: 'exteriorHighEnd' },
  { value: 'Luxury', hint: 'Exterior has elegant, top-tier finishes', image: 'exteriorLuxury' },
] as const;

// Values must match TIMELINES in worker/src/index.ts.
export const TIMELINES = ['ASAP', '7-30 days', '1-3 months', '3-6 months'];

// Answers from the contact form's home-details step. Keys must match DETAIL_LABELS in worker/src/index.ts.
export interface HomeDetails {
  bedrooms: string;
  fullBaths: string;
  partialBaths: string;
  sqft: string;
  lotSqft: string;
  floors: string;
  basement: string;
  finishedBasementSqft: string;
  unfinishedBasementSqft: string;
  pool: string;
}

export interface LeadSubmission {
  pathway: Pathway;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  /** One of PROPERTY_TYPES' values; the contact form asks for it, the chat form does not. */
  propertyType?: string;
  /** 'Yes' or 'No': whether the home is in a homeowners association. */
  hoa?: string;
  /** One of KITCHEN_CONDITIONS' values. */
  kitchen?: string;
  /** One of BATHROOM_CONDITIONS' values. */
  bathroom?: string;
  /** One of LIVING_ROOM_CONDITIONS' values. */
  livingRoom?: string;
  /** One of EXTERIOR_CONDITIONS' values. */
  exterior?: string;
  /** One of TIMELINES. */
  timeline?: string;
  /** 'owner' or 'other'; when 'other', ownershipOther says how they're related to the property. */
  ownership?: string;
  ownershipOther?: string;
  details?: HomeDetails;
  smsConsent: boolean;
  /** Hidden honeypot; real visitors leave it empty. */
  company: string;
  /** Cloudflare Turnstile token, checked by /api/lead when Turnstile is configured. */
  turnstileToken?: string;
  /** Chat conversation, when the lead comes from the chat widget. */
  transcript?: { role: 'user' | 'assistant'; content: string }[];
}

export type SubmitResult = 'sent' | 'error';

// Handled by the gethomeoffer-leads Worker (worker/), routed on the site's own domain.
export async function submitLead(submission: LeadSubmission): Promise<SubmitResult> {
  try {
    const response = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    });
    return response.ok ? 'sent' : 'error';
  } catch {
    return 'error';
  }
}
