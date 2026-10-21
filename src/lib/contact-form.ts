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
