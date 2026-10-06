# GetHomeOffer.com

Premium real estate site. Two programs: We Buy Houses Cash, Agent Program. Full brief: `GetHomeOffer_Claude_Code_Build_Spec` (provided by the owner).

## Stack
React 19 + TypeScript + Vite + React Router 8 in framework mode (`appDirectory: 'src'`). Plain CSS with design tokens (no Tailwind). Fonts self-hosted via @fontsource (Fraunces display, Inter body). Target: Cloudflare, static prerendered HTML + Workers/edge functions later for forms.

## Rendering & SEO
- `ssr: false` + `prerender` in `react-router.config.ts`: every path in `src/data/pages.ts` is prerendered to `build/client/<path>/index.html`. Deploy `build/client`.
- Routes live in `src/routes.ts`; route modules in `src/routes/`. Each exports `meta` built with `seo()` from `src/lib/seo.ts` (title, description, canonical, OG, Twitter). Canonical origin is `SITE_URL`.
- Adding a page: add its entry to `PAGES` (title/description/heading), add the route in `routes.ts`. It is then prerendered and listed in the sitemap automatically.
- `sitemap.xml` is a prerendered resource route (`src/routes/sitemap.ts`); `public/robots.txt` points to it.
- `/404` is prerendered and copied to `build/client/404.html` in `buildEnd` for the host's not-found handling.
- Only `window`/`document` access inside effects; everything renders at build time in Node.

## Structure
- `src/styles/tokens.css` — all colors, type scale, spacing, motion. Never hardcode colors; sky blue (`--color-cta`) is for CTAs only. Links use `--color-link` (sky blue fails contrast as text on ivory).
- `src/styles/globals.css` — reset, base type, `.btn--primary/ghost/ghost-inverse`, `.eyebrow`, `.lede`, `.container`, `.section`, `.on-dark`.
- `src/lib/site.ts` — nav items (Services, Locations, About Us, FAQ, Contact) and paths. `OFFER_PATH` is /contact/, which holds the lead form.
- `src/data/` — content separate from components: `images.ts` (image registry), `home.ts`, `locations.ts` (all 50 states; only Wisconsin → Milwaukee is built for the cash program via `CASH_STATE_SLUGS`).
- `src/components/{navigation,footer,home,ui}` — each component has a co-located CSS file.
- `src/pages/` — page components used by route modules; unbuilt routes share `routes/placeholder.tsx`.

## Images
Every image goes through `ImageSlot` + an entry in `src/data/images.ts`. Without `src` it renders a labeled placeholder describing the photo needed. To add a real photo, set `src` on the entry.
- Responsive sizes come from Cloudflare Image Transformations (`src/lib/images.ts`): build with `VITE_IMAGE_CDN=cloudflare` to emit `/cdn-cgi/image/...` srcsets. Only enable once Transformations is turned on for the zone; off by default so dev and other hosts serve originals. Pass `sizes` to `ImageSlot` when an image renders narrower than the viewport.

## Rules
- NO text reveal or scroll-triggered text animations. Motion is for images only (parallax via `useParallax`, subtle scale, crossfades) and hover states.
- Respect `prefers-reduced-motion`.
- No invented facts: no phone numbers, addresses, stats, reviews or licensing claims.
- Location pages are templates; the owner supplies localized content.
- URLs use trailing slashes.

## Status
- Phase 1–2: design system, navigation (working mobile menu, Escape, focus return), footer, sticky mobile CTA.
- Phase 3: homepage complete with image placeholders.
- Prerendering + per-page SEO, sitemap, robots, 404 in place.
- Phase 4: Services, Cash Program, Agent Program pages. Program content lives in `src/data/programs.ts` (draft copy; owner must confirm process/property-type statements). Shared page blocks in `src/components/ui/` (PageHero, Breadcrumbs, SplitSection, SectionHeader, DetailGrid, StepSequence, CtaBand) and `components/locations/StateDirectory`. Breadcrumb trails in `src/data/breadcrumbs.ts`; BreadcrumbList + Service JSON-LD via `src/lib/schema.ts`.
- Phase 5: state + city templates for both programs (50 states × 5 cities × 2 programs = 600 pages, all prerendered).
  - Routes `routes/{cash,agent}-{state,city}.tsx` use build-time `loader`s (`src/lib/location-pages.ts`), so location copy is baked into each page's HTML and never shipped in the JS bundle.
  - Local copy goes in `src/data/location-content.ts` under `cash`/`agent`, keyed `'wisconsin'` or `'wisconsin/madison'` (see the `LocalContent` type).
  - A location page is published (indexable, canonical, in sitemap) only when its `intro` is set. Otherwise it's `noindex` and shows labeled "Content needed" slots.
  - Generic program copy (steps, property types, agent role) comes from `programs.ts`; page labels/titles from `location-labels.ts`.
- Phase 7: About, FAQ, Contact.
  - Phone/email live in `src/data/company.ts`; undefined values render `[Placeholder]` markers.
  - Contact form (`components/forms/ContactForm`) pre-selects pathway from `?path=cash|agent`. `submitContact` in `src/lib/contact-form.ts` is a stub returning 'not-connected'; wire it to a Cloudflare function later.
  - FAQ content in `src/data/faq.ts` (FAQPage JSON-LD); About values in `src/data/about.ts`; About "Our story" is a ContentSlot awaiting verified facts.
- Phase 10 audit: all 611 pages crawled (no broken links, unique titles/descriptions, one H1, no heading skips). Lighthouse mobile on 10 pages: perf 92–95, a11y 100, best practices 100, SEO 100 on indexable pages (noindex pages score 63 by design). Decisions from the audit:
  - `build.cssCodeSplit: false` (one ~9KB gz stylesheet). Because bundle order is no longer per-route, `globals.css` is wrapped in `@layer base` so component CSS always wins; keep new global rules inside that layer.
  - Fraunces loads the `opsz` variant (no SOFT axis) and both latin fonts are preloaded in `root.tsx` to prevent heading re-wrap layout shift.
  - `--color-earth` darkened to #8c5230 so small terracotta text passes 4.5:1.
- Phase 11 responsive QA (Puppeteer + Edge, 9 widths 320–1920 × 12 templates): no horizontal scroll, off-screen elements, text overflow, <24px targets or <12px text; 25 interaction tests pass. Rules learned:
  - Never put `backdrop-filter`/`transform`/`filter` on an ancestor of a `position: fixed` element (it becomes the containing block). The header blur lives on `.site-header::before` for this reason.
  - No global `scroll-behavior: smooth` (it animates router scroll-to-top on navigation).
  - Sticky mobile CTA is hidden on the offer/contact page; `scroll-padding-bottom` keeps focused elements above it.
- Phase 8: Privacy Policy + Terms via `pages/legal/LegalPage`. Section outlines in `src/data/legal.ts`; no legal text written. A document is noindex, excluded from the sitemap and shows a draft notice until every section has `body` (attorney-approved text).
- Phase 6: How It Works page (`pages/how-it-works/`). Journey stages in `src/data/how-it-works.ts`; both pathways reuse `programs.ts` steps. Comparison table is shared (`components/programs/ComparisonTable`).
- Production domain confirmed: https://gethomeoffer.com (`SITE_URL`).

## Current state (supersedes older phase notes above where they conflict)
- Deployment: Cloudflare Pages project `gethomeoffer`, auto-deploys on every push to `main` (build `npm run build`, output `build/client`). Custom domains: gethomeoffer.com (+ www). Pushing = publishing; ask before pushing.
- Cash program is Wisconsin only, and Milwaukee is the only city page. Other cities (Madison etc.) were removed at the owner's request. Sitemap has 10 URLs.
- Locations tab (`/locations/`, `pages/locations/LocationsPage`) lists served cities; location breadcrumbs go Home › Locations › State › City.
- Milwaukee page (`location-content.ts` → `'wisconsin/milwaukee'`) uses the long-form `guide`. SEO target keyword "we buy houses Milwaukee" is in `metaTitle`, `metaDescription` and `heading`; keep it there. City pages honor `metaTitle`/`metaDescription`.
- Contact page is the lead form: first/last name, phone, email, property address, required SMS consent (TCPA disclosure linking Privacy/Terms). Pathway still read silently from `?path=`. `submitLead` in `src/lib/contact-form.ts` is still a stub returning 'not-connected'; next step is a Cloudflare function that emails leads.
- Contact page trust box: four checkmark points + U.S. News and BBB badges. Owner must confirm BBB accreditation before relying on that seal.
- Company contact (`src/data/company.ts`): phone (608) 571-4547 (tel link), email info@gethomeoffer.com.
- About page has the owner's founder story (Wisconsin roots, UW-Madison real estate + risk management programs) and founder portrait. Home page shows U.S. News + BBB badges.
- Owner preferences: no em dashes in copy; short, transactional copy aimed at sellers.
- Open: wire `submitLead`; add default og:image; owner to confirm which Milwaukee suburbs are served; Privacy/Terms still need attorney text; submit sitemap in Google Search Console.

## Commands
`npm run dev` · `npm run build` (typegen + typecheck + prerender) · `npm run preview` · `npm run lint`
