# Get Home Offer

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
- Cash program city pages: Milwaukee and Madison, Wisconsin (Madison is the Google Business Profile landing page; SEO target "we buy houses Madison"; owner to confirm the Dane County communities listed). Milwaukee is ranking: never change its URL.
- San Diego, California cash city page added 2026-10-19 (no office there; owner to confirm the San Diego County communities listed). Served cities are set in `CASH_CITY_SLUGS` in `locations.ts`; only those get city pages. `/we-buy-houses-cash/california/` 301s to `/locations/`.
- Locations tab (`/locations/`, `pages/locations/LocationsPage`) lists served cities grouped under state headings.
- Milwaukee page (`location-content.ts` → `'wisconsin/milwaukee'`) uses the long-form `guide`. SEO target keyword "we buy houses Milwaukee" is in `metaTitle`, `metaDescription` and `heading`; keep it there. City pages honor `metaTitle`/`metaDescription`.
- Contact page is the lead form: first/last name, phone, email, property address, required SMS consent (TCPA disclosure linking Privacy/Terms). Pathway still read silently from `?path=`. `submitLead` posts to `/api/lead` (Pages Function → `gethomeoffer-leads` Worker via the LEADS service binding, which emails leads). The Worker must have no route on `gethomeoffer.com/api/lead*` or it bypasses the Pages Function. Spam protection: honeypot field, Origin check and Cloudflare Turnstile (widget "Lead Screener"; `VITE_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` set on the Pages project, Production) on both the contact form and the chat lead form.
- Contact page trust box: four checkmark points + U.S. News and BBB badges. Owner must confirm BBB accreditation before relying on that seal.
- Company contact (`src/data/company.ts`): phone (608) 571-4547 (tel link), email info@gethomeoffer.com.
- About page has the owner's founder story (Wisconsin roots, UW-Madison real estate + risk management programs) and founder portrait. Home page shows U.S. News + BBB badges.
- Security headers live in `public/_headers` (HSTS, CSP with 'unsafe-inline' required for hydration/JSON-LD, X-Frame-Options, Referrer-Policy). Cloudflare Email Address Obfuscation stays ON by owner's choice, so crawlers report a 404 on `/cdn-cgi/l/email-protection` and a missing referrer policy on Cloudflare's email-decode script; both are expected.
- SEO checklist pass (2026-10-13): every page emits one JSON-LD graph from `seo()` (LocalBusiness entity `#organization` with NAP, geo, sameAs from `SOCIAL_LINKS` in `company.ts`, plus a WebPage node). Page dates live in `PAGES` (`published`/`modified`) and `LocalContent`; bump `modified` only when that page's content changes. Default og:image `public/images/og-default.jpg`. `public/robots.txt` explicitly allows AI crawlers; `public/llms.txt` lists key pages (update when pages change). `/assets/*` cached 1 year in `_headers`. Image sizes for `ImageSlot` in `IMAGE_SIZES` (`src/lib/images.ts`); add an entry for every new image. `scripts/validate-build.mjs` runs at the end of `npm run build` and fails the deploy on broken links, orphans, missing/duplicate titles, missing canonicals or alt text, invalid JSON-LD and bad sitemap entries.
- Site architecture (rebuilt 2026-10-14): brand-level homepage → category page `/we-buy-houses-cash/` (GBP primary category: Property investment company) → 29 service pages at `/we-buy-houses-cash/<service>/` (one per GBP service). No state pages: `/locations/` links straight to city pages (`/we-buy-houses-cash/<state>/<city>/`, URLs unchanged); `/we-buy-houses-cash/wisconsin/` 301s to `/locations/` in `public/_redirects`. Breadcrumbs: Home › Locations › City and Home › Cash Program › Service.
  - Service list (slug, name, group, `inNav`) in `src/data/service-list.ts` (import-free: the router config loads it). Page copy in `src/data/service-content.ts`, read only by the route loader (`src/lib/service-pages.ts`) so it never ships in the JS bundle. Service copy never names a city.
  - City pages link to every service with local anchor text ("Sell an Inherited House in Madison") and to sibling cities; service pages link to every published city page, related services and the category page. Grouped links via `components/services/ServiceLinks`.
  - Nav (`Navigation.tsx`): plain links Home, Services (→ `/we-buy-houses-cash/`, which lists every service), About Us, Contact, plus the Get My Cash Offer button. Owner chose this exact set and no dropdowns. Locations and FAQ live in the footer (`FOOTER_EXTRA_ITEMS`). The nav never links to city-specific service pages.
  - Area pages (neighborhoods/landmarks) under a city: list in `src/data/location-areas.ts` (import-free), copy in `src/data/location-area-content.ts` (build-time only, verifiable facts with sources), route `routes/cash-area.tsx` at `/we-buy-houses-cash/<state>/<city>/<area>/`. Milwaukee has 5 (Bay View, Walker's Point, Washington Heights, East Side and UWM, Marquette University Area); the city page shows an "Areas we serve" strip and area cards. Milwaukee has no office, so no Milwaukee GBP; city+service pages only where rankings lag.
  - Every city page must carry content written about that city, not copy swapped between city names. The owner is writing unique content for each city (Madison still reuses some Milwaukee copy until then).
- Owner preferences: no em dashes in copy; short, transactional copy aimed at sellers.
- Open: www.gethomeoffer.com has no DNS record (add it + 301 to apex in Cloudflare); add openingHours to LocalBusiness once the owner confirms hours; owner to confirm which Milwaukee suburbs are served; Privacy Policy and Terms & Conditions text written 2026-10-12 at owner's request (published, not attorney-reviewed; recommend legal review); submit sitemap in Google Search Console.

## Commands
`npm run dev` · `npm run build` (typegen + typecheck + prerender) · `npm run preview` · `npm run lint`
