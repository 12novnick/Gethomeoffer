interface Env {
  EMAIL: { send(message: { to: string; from: string; subject: string; text: string; replyTo?: string }): Promise<unknown> };
  LEAD_TO: string;
  LEAD_FROM: string;
}

const PATHWAY_LABELS: Record<string, string> = {
  cash: 'Cash offer',
  agent: 'Real Estate Agent Program',
  unsure: 'Not sure yet',
};

const LIMITS = { firstName: 80, lastName: 80, phone: 30, email: 200, address: 300 } as const;
type Field = keyof typeof LIMITS;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: object, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

// Strips line breaks so submitted values can't add headers or fake lines in the email.
function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.replace(/[\r\n\t]+/g, ' ').trim().slice(0, max) : '';
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'POST') return json({ ok: false }, 405);

    const origin = request.headers.get('Origin');
    if (origin && !/^https:\/\/(www\.)?gethomeoffer\.com$/.test(origin)) return json({ ok: false }, 403);

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return json({ ok: false }, 400);
    }

    // Bots fill the hidden "company" field; pretend success so they don't retry.
    if (clean(body.company, 200)) return json({ ok: true });

    const lead = Object.fromEntries(
      (Object.keys(LIMITS) as Field[]).map((key) => [key, clean(body[key], LIMITS[key])]),
    ) as Record<Field, string>;
    const pathway = typeof body.pathway === 'string' && body.pathway in PATHWAY_LABELS ? body.pathway : 'cash';
    const smsConsent = body.smsConsent === true;

    const missing = (Object.keys(LIMITS) as Field[]).filter((key) => !lead[key]);
    if (missing.length || !EMAIL_PATTERN.test(lead.email) || !smsConsent) {
      return json({ ok: false, error: 'invalid' }, 422);
    }

    const name = `${lead.firstName} ${lead.lastName}`;
    const text = [
      `New lead from GetHomeOffer.com`,
      ``,
      `Name: ${name}`,
      `Phone: ${lead.phone}`,
      `Email: ${lead.email}`,
      `Property address: ${lead.address}`,
      `Interested in: ${PATHWAY_LABELS[pathway]}`,
      `SMS consent: Yes (agreed ${new Date().toISOString()})`,
    ].join('\n');

    try {
      await env.EMAIL.send({
        to: env.LEAD_TO,
        from: env.LEAD_FROM,
        replyTo: lead.email,
        subject: `New lead: ${name}, ${lead.address}`,
        text,
      });
    } catch (error) {
      console.error('Lead email failed', error);
      return json({ ok: false, error: 'send-failed' }, 502);
    }

    return json({ ok: true });
  },
};
