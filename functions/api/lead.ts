// Forwards lead submissions to the gethomeoffer-leads Worker (worker/), which sends the email.
// LEADS is a service binding set in the Pages project settings.
// TURNSTILE_SECRET_KEY (Pages secret) turns on the Cloudflare Turnstile spam check; without it leads pass straight through.
interface Env {
  LEADS: { fetch(request: Request): Promise<Response> };
  TURNSTILE_SECRET_KEY?: string;
}

const ALLOWED_ORIGIN = /^https:\/\/(www\.)?gethomeoffer\.com$/;
const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const reject = (status: number, error: string) =>
  new Response(JSON.stringify({ ok: false, error }), { status, headers: { 'Content-Type': 'application/json' } });

async function passesTurnstile(token: unknown, secret: string, ip: string | null) {
  if (typeof token !== 'string' || !token) return false;
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  try {
    const result = (await (await fetch(VERIFY_URL, { method: 'POST', body: form })).json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  // Browsers always send Origin on this request; scripts posting directly usually do not.
  if (!ALLOWED_ORIGIN.test(request.headers.get('Origin') ?? '')) return reject(403, 'origin');

  const body = await request.text();

  if (env.TURNSTILE_SECRET_KEY) {
    let token: unknown;
    try {
      token = (JSON.parse(body) as { turnstileToken?: unknown }).turnstileToken;
    } catch {
      return reject(400, 'invalid');
    }
    if (!(await passesTurnstile(token, env.TURNSTILE_SECRET_KEY, request.headers.get('CF-Connecting-IP')))) {
      return reject(403, 'verification');
    }
  }

  return env.LEADS.fetch(new Request(request.url, { method: 'POST', headers: request.headers, body }));
};
