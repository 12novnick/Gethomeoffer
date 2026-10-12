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
  lede: 'How Get Home Offer collects, uses and protects your information.',
  lastUpdated: 'October 12, 2026',
  sections: [
    {
      id: 'who-we-are',
      title: 'Who we are',
      guidance: 'The legal entity operating Get Home Offer, its mailing address and how to reach it about privacy.',
      body: [
        "Get Home Offer, located at 1723 Waldorf Blvd, Suite 401, Madison, WI 53719, operates the website at gethomeoffer.com. We help property owners explore two ways to sell a home: a direct sale through our Cash Program, or a traditional sale through our Real Estate Agent Program.",
        "This Privacy Policy explains what information we collect when you use our website, how we use it, and the choices you have. If you have questions about this policy, you can reach us using the details in the \"Contact us\" section below.",
      ],
    },
    {
      id: 'information-we-collect',
      title: 'Information we collect',
      guidance:
        'What visitors provide (contact form: name, email, phone, property address, message) and what is collected automatically (analytics, device and log data, cookies).',
      body: [
        "Information you give us. When you request an offer or contact us, through our contact form or the chat window on our site, we collect your first and last name, phone number, email address and the address of your property. We also record whether you agreed to receive text messages from us.",
        "Chat conversations. Our website chat assistant, Amy, is an automated virtual assistant. The questions you type into the chat are processed to generate a reply. If you send us your contact details through the chat, a copy of your chat conversation is sent to us along with your details so we understand what you asked about.",
        "Information collected automatically. Like most websites, our hosting provider automatically receives basic technical information when you visit, such as your IP address, browser type, device type, the pages you view and the date and time of your visit. We use cookie-free website analytics to understand overall traffic to our site.",
        "Please do not share sensitive personal information, such as Social Security numbers or financial account numbers, through our forms or chat.",
      ],
    },
    {
      id: 'how-we-use-information',
      title: 'How we use information',
      guidance: 'Responding to inquiries, preparing offers, connecting owners with agents, operating and improving the site.',
      body: [
        "We use the information we collect to respond to your inquiry, review your property, prepare and discuss a cash offer, help you explore the Real Estate Agent Program, and communicate with you about your request.",
        "We also use information to operate, maintain, secure and improve our website, to prevent spam and abuse, and to comply with our legal obligations.",
      ],
    },
    {
      id: 'how-we-share-information',
      title: 'How we share information',
      guidance:
        'Whether details are shared with real estate professionals through the Real Estate Agent Program, service providers (hosting, email, CRM) and when required by law. State whether information is sold or shared for advertising.',
      body: [
        "We do not sell your personal information, and we do not share it with third parties for their own marketing purposes.",
        "Real estate professionals. If you are interested in selling through our Real Estate Agent Program, we may share your contact and property details with a real estate professional in your area so they can contact you about your sale.",
        "Service providers. We use trusted service providers to run our website and business, such as website hosting, security, email delivery and the technology that powers our chat assistant. These providers process information on our behalf only as needed to provide their services to us.",
        "Legal and business reasons. We may disclose information if required by law, to respond to legal process, to protect the rights, property or safety of Get Home Offer, our users or others, or in connection with a merger, sale or transfer of our business.",
      ],
    },
    {
      id: 'communications',
      title: 'Calls, texts and emails',
      guidance:
        'How and when you contact people who submit the form, how they consent and how they opt out. Attorney review needed for telemarketing and texting rules.',
      body: [
        "When you submit your details, we may contact you by phone, email or text message about your property and your request.",
        "Text messages. We only send text messages if you check the SMS consent box on our form. By giving consent, you agree to receive text messages from Get Home Offer about updates and inquiries. Message frequency varies. Message and data rates may apply. Consent to receive text messages is not a condition of any purchase.",
        "You can opt out of text messages at any time by replying STOP. Reply HELP for more information. You can also ask us to stop calling or emailing you by contacting us.",
        "No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text messaging originator opt-in data and consent will not be shared with any third parties.",
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies and similar technologies',
      guidance: 'Which cookies, analytics or tracking tools the site uses and how visitors can control them.',
      body: [
        "Our website does not use advertising or tracking cookies. We use Cloudflare Web Analytics, a privacy-focused analytics tool that does not use cookies or track you across other websites, to see overall visitor counts and page performance.",
        "Our hosting and security provider may use strictly necessary technologies to protect the site from abuse and keep it working properly. You can control cookies through your browser settings.",
      ],
    },
    {
      id: 'retention',
      title: 'Data retention',
      guidance: 'How long submitted information is kept and how it is deleted.',
      body: [
        "We keep the information you submit for as long as we need it to respond to your request, work with you on a potential sale, keep records of your communication preferences and meet our legal, accounting and business obligations. When we no longer need it, we delete it or make it anonymous.",
      ],
    },
    {
      id: 'your-rights',
      title: 'Your rights and choices',
      guidance:
        'Access, correction and deletion requests, and any state-specific rights that apply (for example, California and other states with privacy laws).',
      body: [
        "You can ask us to access, correct or delete the personal information we hold about you, or to stop contacting you. To make a request, contact us using the details below. We may need to verify your identity before completing your request.",
        "Depending on where you live, you may have additional rights under your state's privacy laws. We will honor requests as required by applicable law, and we will not treat you differently for exercising your privacy rights.",
      ],
    },
    {
      id: 'security',
      title: 'Security',
      guidance: 'The general measures used to protect information, without overstating guarantees.',
      body: [
        "We use reasonable safeguards to protect your information, including encrypted connections (HTTPS) across our website. However, no method of transmitting or storing information online is completely secure, so we cannot guarantee absolute security.",
      ],
    },
    {
      id: 'children',
      title: "Children's privacy",
      guidance: 'That the site is not directed to children and how any inadvertently collected data is handled.',
      body: [
        "Our website is intended for adults and is not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will delete it.",
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      guidance: 'How updates are made and communicated, and the effective date.',
      body: [
        "We may update this Privacy Policy from time to time. When we do, we will post the updated version on this page and change the \"Last updated\" date. We encourage you to review this policy periodically.",
      ],
    },
    {
      id: 'contact',
      title: 'Contact us',
      guidance: 'How to reach Get Home Offer with privacy questions or requests.',
      body: [
        "If you have questions about this Privacy Policy or want to make a privacy request, contact us by email at info@gethomeoffer.com, by phone at (608) 571-4547, or by mail at Get Home Offer, 1723 Waldorf Blvd, Suite 401, Madison, WI 53719.",
      ],
    },
  ],
};

export const TERMS: LegalDocument = {
  path: '/terms/',
  title: 'Terms & Conditions',
  lede: 'The terms that apply to your use of Get Home Offer.',
  sections: [
    {
      id: 'acceptance',
      title: 'Acceptance of these terms',
      guidance: 'That using the site means agreeing to these terms, and who the agreement is with.',
      body: [
        "By using the website gethomeoffer.com, you agree to these Terms & Conditions. These terms apply to your use of our website, the services we offer, and any interactions with Get Home Offer. If you do not agree to these terms, do not use the website.",
        "These terms are an agreement between you and Get Home Offer, located at 1723 Waldorf Blvd, Suite 401, Madison, WI 53719.",
      ],
    },
    {
      id: 'our-services',
      title: 'About our services',
      guidance:
        'What the Cash Program and Real Estate Agent Program are, that information on the site is general, and that submitting a form does not create an obligation or guarantee an offer.',
      body: [
        "Get Home Offer offers two programs to help you sell your property: the Cash Program, where we may offer to buy your property directly, and the Real Estate Agent Program, where we connect you with a real estate professional to list your property on the traditional market.",
        "Information on our website is general in nature and is not tailored to your specific situation. We provide it to help you understand your options. Submitting your information through our contact form or chat does not create an obligation for either party and does not guarantee an offer, a sale or any particular outcome.",
      ],
    },
    {
      id: 'cash-offers',
      title: 'Cash offers',
      guidance: 'How offers are made and what conditions apply before a purchase agreement is signed.',
      body: [
        "If we provide you with a cash offer, the offer is non-binding until you and Get Home Offer have signed a formal purchase agreement. An offer may be subject to inspection, appraisal, title review or other conditions we specify. No sale is final until closing.",
        "We reserve the right to withdraw or modify any offer at any time before a purchase agreement is signed.",
      ],
    },
    {
      id: 'agent-program',
      title: 'Real Estate Agent Program',
      guidance:
        'The relationship between Get Home Offer and any real estate professionals, including any referral arrangements, compensation and licensing disclosures required in each state. Attorney review required.',
      body: [
        "The Real Estate Agent Program connects you with a licensed real estate professional. Get Home Offer does not represent you in the sale; the real estate professional you work with represents you. The real estate professional is an independent contractor and not an employee or agent of Get Home Offer.",
        "Get Home Offer may receive a referral fee or commission from real estate professionals or brokers in connection with leads we provide. Any such arrangements comply with applicable state and federal laws, including fair housing laws.",
      ],
    },
    {
      id: 'use-of-site',
      title: 'Using the website',
      guidance: 'Acceptable use and prohibited conduct.',
      body: [
        "You agree to use the website only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of the website. Prohibited behavior includes harassment, causing damage or injury, posting obscene or offensive content, disrupting the flow of dialogue, or attempting to gain unauthorized access to our systems.",
        "We reserve the right to refuse service, terminate accounts or remove content that violates these terms.",
      ],
    },
    {
      id: 'your-information',
      title: 'Information you provide',
      guidance: 'That submitted information must be accurate, and a reference to the Privacy Policy.',
      body: [
        "Any information you provide to Get Home Offer through our website, contact form, chat or otherwise must be accurate, current and complete. You are responsible for the accuracy of information you submit.",
        "For how we handle, use and protect your personal information, please see our Privacy Policy.",
      ],
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual property',
      guidance: 'Ownership of site content, branding and design.',
      body: [
        "All content on the website, including text, graphics, logos, images, and software, is the property of Get Home Offer or its content suppliers and is protected by copyright and other intellectual property laws. You may not copy, modify, transmit or distribute any content without our written permission.",
        "The Get Home Offer name and logo are trademarks of Get Home Offer. Unauthorized use of our trademarks is prohibited.",
      ],
    },
    {
      id: 'third-party-links',
      title: 'Third-party links',
      guidance: 'Responsibility for external sites linked from Get Home Offer.',
      body: [
        "The website may contain links to third-party websites. We are not responsible for the content, accuracy, or practices of external websites. Your use of third-party websites is governed by their terms and privacy policies, not ours.",
        "We do not endorse any third-party website linked from our site, and we are not liable for any loss or damage caused by your use of third-party websites.",
      ],
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers',
      guidance: 'That site content is not legal, tax or financial advice, and any warranty disclaimers.',
      body: [
        "The information on our website is provided \"as is\" and without warranty of any kind. We make no representations or warranties, express or implied, regarding the accuracy, completeness, reliability or availability of the website or its content.",
        "Nothing on this website constitutes legal, tax, financial or real estate advice. We strongly encourage you to consult with qualified professionals, including a real estate attorney, before making any decisions about selling your property.",
      ],
    },
    {
      id: 'liability',
      title: 'Limitation of liability',
      guidance: 'Limits on liability as permitted by law.',
      body: [
        "To the extent permitted by law, Get Home Offer and its officers, employees and agents are not liable for any indirect, incidental, special, consequential or punitive damages, including lost profits, arising out of or related to your use of the website or these terms, even if we have been advised of the possibility of such damages.",
        "Our total liability to you under these terms is limited to the amount you have paid to Get Home Offer, if any.",
      ],
    },
    {
      id: 'governing-law',
      title: 'Governing law',
      guidance: 'Which state’s laws govern and where disputes are resolved.',
      body: [
        "These Terms & Conditions are governed by and construed in accordance with the laws of the State of Wisconsin, without regard to its conflict of laws principles.",
        "Any legal action or proceeding relating to these terms or your use of the website must be brought exclusively in the state or federal courts located in Dane County, Wisconsin, and you consent to the jurisdiction and venue of those courts.",
      ],
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      guidance: 'How the terms can change and the effective date.',
      body: [
        "We may update these Terms & Conditions at any time. When we do, we will post the updated version on this page and change the \"Last updated\" date. Your continued use of the website after changes become effective constitutes your acceptance of the updated terms.",
      ],
    },
    {
      id: 'contact',
      title: 'Contact us',
      guidance: 'How to reach Get Home Offer with questions about these terms.',
      body: [
        "If you have questions about these Terms & Conditions or any other aspect of our business, contact us by email at info@gethomeoffer.com, by phone at (608) 571-4547, or by mail at Get Home Offer, 1723 Waldorf Blvd, Suite 401, Madison, WI 53719.",
      ],
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
