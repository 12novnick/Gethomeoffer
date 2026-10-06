export type Pathway = 'cash' | 'agent' | 'unsure';

export interface LeadSubmission {
  pathway: Pathway;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  smsConsent: boolean;
  /** Hidden honeypot; real visitors leave it empty. */
  company: string;
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
