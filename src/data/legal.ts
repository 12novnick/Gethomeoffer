export interface LegalSection {
  id: string;
  title: string;
  /** What this section needs to cover. Shown in a content slot until `body` is supplied. */
  guidance: string;
  /** Final, attorney-reviewed paragraphs. */
  body?: string[];
}

export interface LegalDocument {
  path: string;
  title: string;
  lede: string;
  /** Set when the final text is published, e.g. 'January 5, 2027'. */
  lastUpdated?: string;
  sections: LegalSection[];
}

// Section outlines only. No legal language has been written or reviewed; final text must come from an attorney.
export const PRIVACY_POLICY: LegalDocument = {
  path: '/privacy-policy/',
  title: 'Privacy Policy',
  lede: 'How GetHomeOffer collects, uses and protects your information.',
  sections: [
    {
      id: 'who-we-are',
      title: 'Who we are',
      guidance: 'The legal entity operating GetHomeOffer.com, its mailing address and how to reach it about privacy.',
    },
    {
      id: 'information-we-collect',
      title: 'Information we collect',
      guidance:
        'What visitors provide (contact form: name, email, phone, property address, message) and what is collected automatically (analytics, device and log data, cookies).',
    },
    {
      id: 'how-we-use-information',
      title: 'How we use information',
      guidance: 'Responding to inquiries, preparing offers, connecting owners with agents, operating and improving the site.',
    },
    {
      id: 'how-we-share-information',
      title: 'How we share information',
      guidance:
        'Whether details are shared with real estate professionals through the Agent Program, service providers (hosting, email, CRM) and when required by law. State whether information is sold or shared for advertising.',
    },
    {
      id: 'communications',
      title: 'Calls, texts and emails',
      guidance:
        'How and when you contact people who submit the form, how they consent and how they opt out. Attorney review needed for telemarketing and texting rules.',
    },
    {
      id: 'cookies',
      title: 'Cookies and similar technologies',
      guidance: 'Which cookies, analytics or tracking tools the site uses and how visitors can control them.',
    },
    {
      id: 'retention',
      title: 'Data retention',
      guidance: 'How long submitted information is kept and how it is deleted.',
    },
    {
      id: 'your-rights',
      title: 'Your rights and choices',
      guidance:
        'Access, correction and deletion requests, and any state-specific rights that apply (for example, California and other states with privacy laws).',
    },
    {
      id: 'security',
      title: 'Security',
      guidance: 'The general measures used to protect information, without overstating guarantees.',
    },
    {
      id: 'children',
      title: "Children's privacy",
      guidance: 'That the site is not directed to children and how any inadvertently collected data is handled.',
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      guidance: 'How updates are made and communicated, and the effective date.',
    },
    {
      id: 'contact',
      title: 'Contact us',
      guidance: 'How to reach GetHomeOffer with privacy questions or requests.',
    },
  ],
};

export const TERMS: LegalDocument = {
  path: '/terms/',
  title: 'Terms & Conditions',
  lede: 'The terms that apply to your use of GetHomeOffer.com.',
  sections: [
    {
      id: 'acceptance',
      title: 'Acceptance of these terms',
      guidance: 'That using the site means agreeing to these terms, and who the agreement is with.',
    },
    {
      id: 'our-services',
      title: 'About our services',
      guidance:
        'What the Cash Program and Agent Program are, that information on the site is general, and that submitting a form does not create an obligation or guarantee an offer.',
    },
    {
      id: 'cash-offers',
      title: 'Cash offers',
      guidance: 'How offers are made and what conditions apply before a purchase agreement is signed.',
    },
    {
      id: 'agent-program',
      title: 'Agent Program',
      guidance:
        'The relationship between GetHomeOffer and any real estate professionals, including any referral arrangements, compensation and licensing disclosures required in each state. Attorney review required.',
    },
    {
      id: 'use-of-site',
      title: 'Using the website',
      guidance: 'Acceptable use and prohibited conduct.',
    },
    {
      id: 'your-information',
      title: 'Information you provide',
      guidance: 'That submitted information must be accurate, and a reference to the Privacy Policy.',
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual property',
      guidance: 'Ownership of site content, branding and design.',
    },
    {
      id: 'third-party-links',
      title: 'Third-party links',
      guidance: 'Responsibility for external sites linked from GetHomeOffer.com.',
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers',
      guidance: 'That site content is not legal, tax or financial advice, and any warranty disclaimers.',
    },
    {
      id: 'liability',
      title: 'Limitation of liability',
      guidance: 'Limits on liability as permitted by law.',
    },
    {
      id: 'governing-law',
      title: 'Governing law',
      guidance: 'Which state’s laws govern and where disputes are resolved.',
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      guidance: 'How the terms can change and the effective date.',
    },
    {
      id: 'contact',
      title: 'Contact us',
      guidance: 'How to reach GetHomeOffer with questions about these terms.',
    },
  ],
};

export const LEGAL_DOCUMENTS = [PRIVACY_POLICY, TERMS];

export function isFinal(document: LegalDocument) {
  return document.sections.every((section) => section.body?.length);
}

export function isDraftLegalPath(path: string) {
  return LEGAL_DOCUMENTS.some((document) => document.path === path && !isFinal(document));
}
