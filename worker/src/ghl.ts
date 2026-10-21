// Sends a website lead to GoHighLevel: upserts the contact, tags it and opens an opportunity.
// Mirrors the ChatGPT app's server (github.com/12novnick/Get-Home-Offer-MCP).

const BASE_URL = 'https://services.leadconnectorhq.com';

export interface GhlConfig {
  token: string;
  locationId: string;
  pipelineName: string;
  stageName: string;
}

export interface GhlLead {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  timeline: string;
  /** Room-by-room condition summary for the Property Condition field. */
  condition: string;
  notes: string;
  tags: string[];
}

type CustomField = { id: string; name: string; picklistOptions?: unknown[] };

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
  return phone;
}

const words = (value: string) => new Set(value.toLowerCase().match(/[a-z0-9]+/g) ?? []);

// Dropdown fields only accept their preset options, so map the form's answer onto the closest one.
function matchOption(value: string, field: CustomField | undefined): string | null {
  const options = (field?.picklistOptions ?? []).map((option) =>
    typeof option === 'string' ? option : String((option as { label?: string; value?: string }).label ?? (option as { value?: string }).value ?? ''),
  );
  if (!options.length) return value;
  const lowered = value.toLowerCase();
  const exact = options.find((option) => option.toLowerCase() === lowered);
  if (exact) return exact;
  const wanted = words(value);
  let best: string | null = null;
  let bestScore = 0;
  for (const option of options) {
    const score = [...words(option)].filter((word) => wanted.has(word)).length;
    if (score > bestScore) [best, bestScore] = [option, score];
  }
  return best;
}

async function ghl<T>(config: GhlConfig, method: string, path: string, body?: unknown): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${config.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Version: 'v3',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`HighLevel ${method} ${path} -> ${response.status}: ${text.slice(0, 500)}`);
  return (text ? JSON.parse(text) : {}) as T;
}

export async function sendToGhl(config: GhlConfig, lead: GhlLead) {
  const { customFields = [] } = await ghl<{ customFields?: CustomField[] }>(
    config,
    'GET',
    `/locations/${config.locationId}/customFields?model=contact`,
  );
  const byName = new Map(customFields.map((field) => [field.name.trim().toLowerCase(), field]));
  const fieldValues: { id: string; fieldValue: string }[] = [];
  const setField = (name: string, value: string) => {
    const field = byName.get(name.toLowerCase());
    if (field && value) fieldValues.push({ id: field.id, fieldValue: value });
  };
  setField('Property Street Address', lead.address);
  const timeline = lead.timeline ? matchOption(lead.timeline, byName.get('selling timeline')) : null;
  if (timeline) setField('Selling Timeline', timeline);
  setField('Property Condition', lead.condition);
  setField('Additional Notes', lead.notes);

  const { contact } = await ghl<{ contact?: { id?: string } }>(config, 'POST', '/contacts/upsert', {
    locationId: config.locationId,
    firstName: lead.firstName,
    lastName: lead.lastName,
    name: `${lead.firstName} ${lead.lastName}`,
    email: lead.email,
    phone: normalizePhone(lead.phone),
    address1: lead.address,
    country: 'US',
    source: 'Website',
    customFields: fieldValues,
  });
  const contactId = contact?.id;
  if (!contactId) throw new Error('HighLevel did not return a contact ID');

  await ghl(config, 'POST', `/contacts/${contactId}/tags`, { tags: lead.tags });

  const { pipelines = [] } = await ghl<{ pipelines?: { id: string; name: string; stages?: { id: string; name: string }[] }[] }>(
    config,
    'GET',
    `/opportunities/pipelines?locationId=${config.locationId}`,
  );
  const same = (a: string, b: string) => a.replace(/\s+/g, ' ').trim().toLowerCase() === b.replace(/\s+/g, ' ').trim().toLowerCase();
  const pipeline = pipelines.find((item) => same(item.name, config.pipelineName));
  const stage = pipeline?.stages?.find((item) => same(item.name, config.stageName));
  if (!pipeline || !stage) {
    throw new Error(
      `Pipeline "${config.pipelineName}" / stage "${config.stageName}" not found. Pipelines: ${pipelines.map((item) => item.name).join(', ')}`,
    );
  }

  try {
    await ghl(config, 'POST', '/opportunities/', {
      locationId: config.locationId,
      pipelineId: pipeline.id,
      pipelineStageId: stage.id,
      contactId,
      name: `${lead.firstName} ${lead.lastName} - ${lead.address}`,
      status: 'open',
      source: 'Website',
    });
  } catch (error) {
    // A repeat submission already has an open opportunity; the contact update above is enough.
    if (!String(error).includes('OPPORTUNITY_NO_DUPLICATE')) throw error;
  }
  return contactId;
}
