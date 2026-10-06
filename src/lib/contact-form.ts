export type Pathway = 'cash' | 'agent' | 'unsure';

export interface LeadSubmission {
  pathway: Pathway;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  smsConsent: boolean;
}

export type SubmitResult = 'sent' | 'error' | 'not-connected';

// Not wired to a backend yet. Replace with a POST to a Cloudflare Worker/Pages Function when it exists.
export async function submitLead(submission: LeadSubmission): Promise<SubmitResult> {
  void submission;
  return 'not-connected';
}
