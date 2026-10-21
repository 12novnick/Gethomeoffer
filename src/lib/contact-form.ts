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

export interface LeadSubmission {
  pathway: Pathway;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  /** One of PROPERTY_TYPES' values; the contact form asks for it, the chat form does not. */
  propertyType?: string;
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
