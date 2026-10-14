export type ServiceGroup = 'core' | 'condition' | 'type' | 'situation';

export interface ServiceLink {
  slug: string;
  /** Short label used in menus and link lists. Never includes a city. */
  name: string;
  group: ServiceGroup;
  /** Featured in the homepage "Situations we buy in" list. */
  inNav?: boolean;
}

export const SERVICE_GROUPS: { id: ServiceGroup; label: string }[] = [
  { id: 'core', label: 'Selling for cash' },
  { id: 'condition', label: 'By property condition' },
  { id: 'type', label: 'By property type' },
  { id: 'situation', label: 'By situation' },
];

// One entry per Google Business Profile service. Page copy lives in service-content.ts (build-time only).
export const SERVICES: ServiceLink[] = [
  { slug: 'sell-house-fast', name: 'Sell Your House Fast', group: 'core' },
  { slug: 'sell-house-as-is', name: 'Sell Your House As-Is', group: 'core', inNav: true },
  { slug: 'sell-house-without-realtor', name: 'Sell Without a Realtor', group: 'core' },

  { slug: 'sell-house-needs-repairs', name: 'Sell a House That Needs Repairs', group: 'condition', inNav: true },
  { slug: 'sell-house-foundation-problems', name: 'Sell a House With Foundation Problems', group: 'condition' },
  { slug: 'sell-fire-damaged-house', name: 'Sell a Fire-Damaged House', group: 'condition', inNav: true },
  { slug: 'sell-water-damaged-house', name: 'Sell a Water-Damaged House', group: 'condition', inNav: true },
  { slug: 'sell-house-with-mold', name: 'Sell a House With Mold', group: 'condition' },
  { slug: 'sell-hoarder-house', name: 'Sell a Hoarder House', group: 'condition' },
  { slug: 'sell-house-code-violations', name: 'Sell a House With Code Violations', group: 'condition' },
  { slug: 'sell-outdated-house', name: 'Sell an Old or Outdated House', group: 'condition' },
  { slug: 'sell-house-unpermitted-additions', name: 'Sell a House With Unpermitted Additions', group: 'condition' },
  { slug: 'sell-house-roof-damage', name: 'Sell a House With Roof Damage', group: 'condition' },
  { slug: 'sell-house-termite-damage', name: 'Sell a House With Termite Damage', group: 'condition' },

  { slug: 'sell-vacant-house', name: 'Sell a Vacant House', group: 'type', inNav: true },
  { slug: 'sell-rental-property', name: 'Sell a Rental Property', group: 'type', inNav: true },
  { slug: 'sell-house-with-tenants', name: 'Sell a House With Tenants', group: 'type', inNav: true },
  { slug: 'sell-duplex-multi-family', name: 'Sell a Duplex or Multi-Family', group: 'type', inNav: true },
  { slug: 'sell-condo-townhome', name: 'Sell a Condo or Townhome', group: 'type' },
  { slug: 'sell-vacant-land', name: 'Sell Vacant Land', group: 'type' },

  { slug: 'sell-inherited-house', name: 'Sell an Inherited House', group: 'situation', inNav: true },
  { slug: 'sell-probate-house', name: 'Sell a Probate House', group: 'situation', inNav: true },
  { slug: 'sell-house-divorce', name: 'Sell Your House During Divorce', group: 'situation', inNav: true },
  { slug: 'sell-house-relocating', name: 'Sell Your House When Relocating', group: 'situation', inNav: true },
  { slug: 'sell-house-downsizing', name: 'Sell Your House When Downsizing', group: 'situation' },
  { slug: 'sell-house-assisted-living', name: 'Sell a House for a Move to Assisted Living', group: 'situation' },
  { slug: 'sell-house-behind-on-payments', name: 'Sell Your House When Behind on Payments', group: 'situation' },
  { slug: 'sell-house-liens-back-taxes', name: 'Sell a House With Liens or Back Taxes', group: 'situation' },
  { slug: 'sell-house-after-failed-sale', name: 'Sell a House After a Failed Sale', group: 'situation' },
];

// Kept import-free because react-router.config.ts loads this file. Matches CASH_PATH in lib/site.ts.
export const servicePath = (slug: string) => `/we-buy-houses-cash/${slug}/`;

export const getService = (slug: string) => SERVICES.find((service) => service.slug === slug);
