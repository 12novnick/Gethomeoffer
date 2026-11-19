// Receives Leadzolo's webhook when a lead is claimed and forwards it to the gethomeoffer-leads Worker,
// which adds the seller to GoHighLevel. Leadzolo sends the shared secret in the X-Leadzolo-Secret header
// (set under Webhooks > Headers in Leadzolo); LEADZOLO_WEBHOOK_SECRET is the matching Pages secret.
interface Env {
  LEADS: { fetch(request: Request): Promise<Response> };
  LEADZOLO_WEBHOOK_SECRET?: string;
}

const reply = (status: number, body: object) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

async function sameSecret(a: string, b: string) {
  const hash = async (value: string) => new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
  const [x, y] = await Promise.all([hash(a), hash(b)]);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

export const onRequestPost = async ({ request, env }: { request: Request; env: Env }) => {
  if (!env.LEADZOLO_WEBHOOK_SECRET) return reply(503, { ok: false, error: 'not-configured' });
  if (!(await sameSecret(request.headers.get('X-Leadzolo-Secret') ?? '', env.LEADZOLO_WEBHOOK_SECRET))) {
    return reply(401, { ok: false, error: 'unauthorized' });
  }

  let event: { type?: unknown; data?: unknown };
  try {
    event = await request.json();
  } catch {
    return reply(400, { ok: false, error: 'invalid' });
  }
  // Only leads assigned to us (claimed or bought); acknowledge anything else so Leadzolo doesn't retry.
  if (event.type !== 'lead.assigned' || !event.data || typeof event.data !== 'object') return reply(200, { ok: true, ignored: true });

  return env.LEADS.fetch(
    new Request(request.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'leadzolo', data: event.data }),
    }),
  );
};
