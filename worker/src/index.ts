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

// Values must match PROPERTY_TYPES in src/lib/contact-form.ts.
const PROPERTY_TYPES: Record<string, string> = {
  'single-family': 'Single-family home',
  townhouse: 'Townhouse or attached single-family home',
  condo: 'Apartment or condo',
  mobile: 'Mobile or manufactured home',
  'multi-family': 'Multi-family (3+ units)',
  commercial: 'Commercial',
  lot: 'Empty lot',
};

// Must match KITCHEN_CONDITIONS and BATHROOM_CONDITIONS in src/lib/contact-form.ts.
const CONDITION_LEVELS = ['Fixer upper', 'Dated', 'Standard', 'High end', 'Luxury'];

// Must match TIMELINES in src/lib/contact-form.ts.
const TIMELINES = ['ASAP', '7-30 days', '1-3 months', '3-6 months'];

// Keys must match HomeDetails in src/lib/contact-form.ts.
const DETAIL_LABELS: Record<string, string> = {
  bedrooms: 'Bedrooms',
  fullBaths: 'Full bathrooms',
  partialBaths: 'Partial bathrooms',
  sqft: 'Square footage (above ground)',
  lotSqft: 'Lot square footage',
  floors: 'Floors (above ground)',
  basement: 'Basement',
  finishedBasementSqft: 'Finished basement sq. ft.',
  unfinishedBasementSqft: 'Unfinished basement sq. ft.',
  pool: 'Pool',
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
    const propertyType =
      typeof body.propertyType === 'string' && Object.hasOwn(PROPERTY_TYPES, body.propertyType)
        ? PROPERTY_TYPES[body.propertyType]
        : undefined;
    const condition = (value: unknown) => (typeof value === 'string' && CONDITION_LEVELS.includes(value) ? value : '');
    const kitchen = condition(body.kitchen);
    const bathroom = condition(body.bathroom);
    const timeline = typeof body.timeline === 'string' && TIMELINES.includes(body.timeline) ? body.timeline : '';
    const ownership =
      body.ownership === 'owner'
        ? 'Owner'
        : body.ownership === 'other'
          ? `Not the owner: ${clean(body.ownershipOther, 120) || 'not specified'}`
          : '';
    const rawDetails = body.details && typeof body.details === 'object' ? (body.details as Record<string, unknown>) : {};
    const details = Object.entries(DETAIL_LABELS)
      .map(([key, label]) => [label, clean(rawDetails[key], 20)])
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`);

    const missing = (Object.keys(LIMITS) as Field[]).filter((key) => !lead[key]);
    if (missing.length || !EMAIL_PATTERN.test(lead.email) || !smsConsent) {
      return json({ ok: false, error: 'invalid' }, 422);
    }

    const transcript = Array.isArray(body.transcript)
      ? body.transcript
          .slice(-20)
          .map((item) => {
            const entry = item as { role?: unknown; content?: unknown };
            const speaker = entry.role === 'user' ? 'Visitor' : 'Chatbot';
            return `${speaker}: ${clean(entry.content, 600)}`;
          })
      : [];

    const name = `${lead.firstName} ${lead.lastName}`;
    const text = [
      `New lead from Get Home Offer${transcript.length ? ' (chat)' : ''}`,
      ``,
      `Name: ${name}`,
      `Phone: ${lead.phone}`,
      `Email: ${lead.email}`,
      `Property address: ${lead.address}`,
      ...(ownership ? [`Relationship to property: ${ownership}`] : []),
      ...(propertyType ? [`Property type: ${propertyType}`] : []),
      ...(timeline ? [`Needs to sell: ${timeline}`] : []),
      ...(details.length || kitchen || bathroom
        ? [``, `Home details:`, ...details, ...(kitchen ? [`Kitchen: ${kitchen}`] : []), ...(bathroom ? [`Main bathroom: ${bathroom}`] : []), ``]
        : []),
      `Interested in: ${PATHWAY_LABELS[pathway]}`,
      `SMS consent: Yes (agreed ${new Date().toISOString()})`,
      ...(transcript.length ? [``, `Chat conversation:`, ...transcript] : []),
    ].join('\n');

    try {
      await env.EMAIL.send({
        to: env.LEAD_TO,
        from: env.LEAD_FROM,
        replyTo: lead.email,
        subject: `New ${transcript.length ? 'chat ' : ''}lead: ${name}, ${lead.address}`,
        text,
      });
    } catch (error) {
      console.error('Lead email failed', error);
      return json({ ok: false, error: 'send-failed' }, 502);
    }

    return json({ ok: true });
  },
};
