import { sendToGhl } from './ghl';

interface Env {
  EMAIL: { send(message: { to: string; from: string; subject: string; text: string; replyTo?: string }): Promise<unknown> };
  LEAD_TO: string;
  LEAD_FROM: string;
  /** GoHighLevel Private Integration Token (secret). Without it, leads are only emailed. */
  GHL_PRIVATE_INTEGRATION_TOKEN?: string;
  GHL_LOCATION_ID: string;
  GHL_PIPELINE_NAME: string;
  GHL_INITIAL_STAGE_NAME: string;
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

// Must match KITCHEN_CONDITIONS, BATHROOM_CONDITIONS, LIVING_ROOM_CONDITIONS and EXTERIOR_CONDITIONS in src/lib/contact-form.ts.
const CONDITION_LEVELS = ['Fixer upper', 'Dated', 'Standard', 'High end', 'Luxury'];

// Must match HOME_FEATURES in src/lib/contact-form.ts, plus the form's "None of the above".
const HOME_FEATURES = [
  'Leased or financed solar panels',
  'Known foundation issues',
  'Fire damage',
  'Well water',
  'Septic system',
  'Mobile or manufactured home',
  'None of the above',
];

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
    const livingRoom = condition(body.livingRoom);
    const exterior = condition(body.exterior);
    const hoa = body.hoa === 'Yes' || body.hoa === 'No' ? body.hoa : '';
    const features = Array.isArray(body.features)
      ? body.features.filter((item): item is string => typeof item === 'string' && HOME_FEATURES.includes(item))
      : [];
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
      ...(hoa ? [`Part of an HOA: ${hoa}`] : []),
      ...(features.length ? [`Applies to the home: ${features.join(', ')}`] : []),
      ...(timeline ? [`Needs to sell: ${timeline}`] : []),
      ...(details.length || kitchen || bathroom || livingRoom || exterior
        ? [``, `Home details:`, ...details, ...(kitchen ? [`Kitchen: ${kitchen}`] : []), ...(bathroom ? [`Main bathroom: ${bathroom}`] : []),
            ...(livingRoom ? [`Living room: ${livingRoom}`] : []),
            ...(exterior ? [`Exterior: ${exterior}`] : []), ``]
        : []),
      `Interested in: ${PATHWAY_LABELS[pathway]}`,
      `SMS consent: Yes (agreed ${new Date().toISOString()})`,
      ...(transcript.length ? [``, `Chat conversation:`, ...transcript] : []),
    ].join('\n');

    // Leads go to GoHighLevel. Email is only a fallback when GoHighLevel isn't configured or fails,
    // so a lead is never lost.
    let crmNote = '';
    if (env.GHL_PRIVATE_INTEGRATION_TOKEN) {
      try {
        await sendToGhl(
          {
            token: env.GHL_PRIVATE_INTEGRATION_TOKEN,
            locationId: env.GHL_LOCATION_ID,
            pipelineName: env.GHL_PIPELINE_NAME,
            stageName: env.GHL_INITIAL_STAGE_NAME,
          },
          {
            firstName: lead.firstName,
            lastName: lead.lastName,
            phone: lead.phone,
            email: lead.email,
            address: lead.address,
            timeline,
            notes: text,
            tags: ['source-website', transcript.length ? 'website-chat' : 'website-form', `interest-${pathway}`],
          },
        );
        return json({ ok: true });
      } catch (error) {
        console.error('GoHighLevel sync failed', error);
        crmNote = '\n\nNote: this lead could not be added to GoHighLevel automatically. Please add it by hand.';
      }
    }

    try {
      await env.EMAIL.send({
        to: env.LEAD_TO,
        from: env.LEAD_FROM,
        replyTo: lead.email,
        subject: `New ${transcript.length ? 'chat ' : ''}lead: ${name}, ${lead.address}`,
        text: text + crmNote,
      });
    } catch (error) {
      console.error('Lead email failed', error);
      return json({ ok: false, error: 'send-failed' }, 502);
    }

    return json({ ok: true });
  },
};
