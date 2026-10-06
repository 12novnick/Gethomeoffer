// Forwards lead submissions to the gethomeoffer-leads Worker (worker/), which sends the email.
// LEADS is a service binding set in the Pages project settings.
interface Env {
  LEADS: { fetch(request: Request): Promise<Response> };
}

export const onRequestPost = ({ request, env }: { request: Request; env: Env }) => env.LEADS.fetch(request);
