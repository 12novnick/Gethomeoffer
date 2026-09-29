export type Pathway = 'cash' | 'agent' | 'unsure';

export interface ContactSubmission {
  pathway: Pathway;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  message?: string;
}

export type SubmitResult = 'sent' | 'error' | 'not-connected';

// Not wired to a backend yet. Replace with a POST to a Cloudflare Worker/Pages Function when it exists.
export async function submitContact(submission: ContactSubmission): Promise<SubmitResult> {
  void submission;
  return 'not-connected';
}
