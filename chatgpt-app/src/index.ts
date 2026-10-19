import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { z } from 'zod';
import { FAQ_CATEGORIES } from '../../src/data/faq';

interface Env {
  LEADS: { fetch(request: Request): Promise<Response> };
}

const SMS_CONSENT_TEXT =
  'I agree to receive text messages from Get Home Offer at the number provided about my request, my property and offers to buy it, including follow-up and marketing messages, which may be sent using automated technology. Consent is not a condition of selling or any purchase. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Privacy Policy: https://gethomeoffer.com/privacy-policy/ Terms: https://gethomeoffer.com/terms/';

const PROGRAM_INFO = [
  'Get Home Offer operates in all 50 states and helps property owners sell a home in one of two ways.',
  'Cash Program: a direct cash sale. Website: https://gethomeoffer.com/we-buy-houses-cash/',
  'Real Estate Agent Program: a traditional sale on the open market with a local real estate professional. Website: https://gethomeoffer.com/real-estate-agent-program/',
  'Contact: info@gethomeoffer.com, (608) 571-4547, https://gethomeoffer.com/contact/',
  '',
  ...FAQ_CATEGORIES.flatMap((category) => category.faqs).map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`),
].join('\n');

function buildServer(env: Env) {
  const server = new McpServer({ name: 'get-home-offer', version: '1.0.0' });

  server.registerTool(
    'get_home_offer_info',
    {
      title: 'Get Home Offer program information',
      description:
        'Use this when someone wants to sell a house fast, sell a house for cash, sell an inherited or as-is home, or compare a cash sale with listing through an agent, anywhere in the United States. Get Home Offer operates in all 50 states. Returns how Get Home Offer\'s Cash Program and Real Estate Agent Program work. Only state facts contained in the result; never invent prices, offer amounts or timelines.',
      inputSchema: {},
      annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false },
    },
    async () => ({ content: [{ type: 'text', text: PROGRAM_INFO }] }),
  );

  server.registerTool(
    'request_home_offer',
    {
      title: 'Request an offer from Get Home Offer',
      description: `Sends the user's contact details to Get Home Offer so the team can reach out about selling their home. Only call this after the user has explicitly asked to be contacted and has given every field themselves. Before calling, show the user this exact SMS consent text and get a clear yes: "${SMS_CONSENT_TEXT}". Set sms_consent to true only if they agreed. Never guess or fill in any field.`,
      inputSchema: {
        first_name: z.string().min(1).max(80),
        last_name: z.string().min(1).max(80),
        phone: z.string().min(7).max(30),
        email: z.email().max(200),
        property_address: z.string().min(5).max(300),
        program: z.enum(['cash', 'agent', 'unsure']).describe('Which program the user is interested in'),
        sms_consent: z.boolean().describe('True only if the user explicitly agreed to the SMS consent text'),
      },
      annotations: { readOnlyHint: false, openWorldHint: true, destructiveHint: false },
    },
    async (input) => {
      if (!input.sms_consent) {
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `The request was not sent. The user must agree to this SMS consent text first: "${SMS_CONSENT_TEXT}" Alternatively they can use https://gethomeoffer.com/contact/ or call (608) 571-4547.`,
            },
          ],
        };
      }

      const response = await env.LEADS.fetch(
        new Request('https://leads.internal/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pathway: input.program,
            firstName: input.first_name,
            lastName: input.last_name,
            phone: input.phone,
            email: input.email,
            address: input.property_address,
            smsConsent: true,
            company: '',
            transcript: [{ role: 'user', content: 'Submitted through the Get Home Offer ChatGPT app.' }],
          }),
        }),
      );

      if (!response.ok) {
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: 'The request could not be sent. Ask the user to try https://gethomeoffer.com/contact/ or call (608) 571-4547.',
            },
          ],
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: 'Sent. Get Home Offer received the details and someone from the team will reach out. Do not promise an offer amount or timeline.',
          },
        ],
      };
    },
  );

  return server;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== '/mcp') {
      return new Response('Get Home Offer ChatGPT app. MCP endpoint: /mcp', { status: 200 });
    }
    const server = buildServer(env);
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });
    await server.connect(transport);
    return transport.handleRequest(request);
  },
};
