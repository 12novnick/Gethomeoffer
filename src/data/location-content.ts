import type { ImageAsset } from './images';
import type { AgentTopic, ContentItem } from './programs';

export type ProgramId = 'cash' | 'agent';

export interface Faq {
  question: string;
  answer: string;
}

/**
 * Localized copy for one state or city page. Every field is optional; missing fields render a
 * labeled content slot. A page is published (indexed + in the sitemap) once `intro` is provided.
 */
export interface LocalContent {
  /** Hero paragraph under the H1. */
  summary?: string;
  /** Local introduction. Required to publish. */
  intro?: string[];
  /** Local housing and market context. */
  marketContext?: string[];
  /** Selling situations common in this area. */
  situations?: ContentItem[];
  /** Neighborhoods or nearby communities served (city pages). */
  areas?: string[];
  /** Agent Program only: local notes that replace the generic text for each part of the sale. */
  agentTopics?: Partial<Record<AgentTopic, string>>;
  faqs?: Faq[];
  image?: ImageAsset;
}

/**
 * Keys: state slug ('wisconsin') or state/city slug ('wisconsin/madison').
 * Content is only read by route loaders at build time, so it never ships in the client bundle.
 */
export const LOCATION_CONTENT: Record<ProgramId, Record<string, LocalContent>> = {
  cash: {},
  agent: {},
};
