# CLAUDE.md — Uriah Child Care website

Built from the Ascend AI starter. Client: **Uriah Child Care**, 30 W Chestnut Ave, Vineland, NJ 08360, (856) 455-6701.
Licensed NJ DCF child care center (CCC128557), open Monday to Sunday 6 am to 11 pm, **ages 2.5 and up only (no infant care)**.
Owner Ms. Paulette (Paulette Senior), director Tameca Burke. Service areas: Vineland, Millville, Bridgeton.

Content rules that override everything below:
- Never mention infant care. NAP, hours and services must match the Google Business Profile word for word.
- No invented ratios, prices, credentials or star ratings.
- No photo of a child's face without written parent consent. Don't use the Experience Early Learning logo.
- Seed content, open questions and how to load it: [`seed/README.md`](./seed/README.md).


This file tells Claude Code everything it needs to build consistently in this project.
Read this before touching any file.

---

## Stack

| Layer | Tool | Notes |
|---|---|---|
| Framework | Astro 5 | `output: 'server'` — full SSR required for Sanity visual editing |
| Styling | Tailwind CSS 4 | No config file — all via `@import "tailwindcss"` in global.css |
| UI Components | Astro components + plain CSS tokens | React only for interactive islands (`.tsx`) |
| CMS | Sanity v6 | Studio embedded at `/studio` (can also be deployed with `npm run sanity:deploy`) |
| Visual Editing | Sanity Presentation Tool + Stega | Requires SSR — do NOT switch to static output |
| Hosting | Netlify | SSR via Netlify adapter. NOT Cloudflare Pages |
| Forms | Netlify Forms | `TourForm.tsx` posts to `/__forms.html` (see below) |
| Language | TypeScript strict | No `any` types. Use Zod for runtime validation |

---

## Design System

The DESIGN.md file in `.stitch/DESIGN.md` is the source of truth for ALL visual decisions.

- Colors, typography, spacing, and component styles come from DESIGN.md
- Never introduce colors, fonts, or spacing not defined there
- When building components, reference DESIGN.md first

CSS custom properties are defined in `src/styles/global.css`.
Tailwind utility classes map to those properties wherever possible.

---

## File Conventions

### Astro components (`.astro`)
- Used for layouts, pages, and non-interactive UI sections
- Fetch Sanity data at the top of a page with `loadQuery(Astro.locals.draftMode, query, params)` from `@cms/lib/load`
- Load `layoutQuery` alongside the page query (`Promise.all`) and pass it to `BaseLayout`
- Query results are typed automatically by Sanity TypeGen (`src/sanity/types.ts`). Run `npm run typegen` after changing a schema or a query
- Values that end up in classes, ids, hrefs or `<head>` must go through `stegaClean()` (or `resolveLink()` for links)

### React components (`.tsx`)
- Used for interactive UI only (forms, modals, carousels, portable text renderer)
- UI components live in `src/components/ui/`
- Portable text renderer is always a React component (`src/components/ui/PortableText.tsx`)

### Pages
- `src/pages/index.astro` — home page, renders the `homePage` singleton's page builder
- `src/pages/[...slug].astro` — every root URL: `category` (program hubs), `service`, `serviceArea` (city pages) and `page`.
  Core types render through `src/components/templates/CorePage.astro`; `page` documents render their page builder
- `src/pages/blog/` — blog listing + posts
- `src/pages/llms.txt.ts`, `llms-full.txt.ts` — AI-search summaries generated from the CMS
- `src/pages/sitemap.xml.ts`, `robots.txt.ts` — generated from the CMS on request
- `src/pages/api/draft-mode/{enable,disable}.ts` — visual editing preview on/off
- `src/middleware.ts` — draft-mode detection, CDN cache headers, CMS redirects on 404

### Routes
`src/sanity/routes.ts` is the single map from document type → URL. The site, sitemap, links
and the Presentation tool all use it. Add a new routable type there first.

Every page URL sits at the root and ends in a slash (`/preschool-vineland-nj/`). The middleware 301s the no-slash form.
Old WordPress URLs are 301'd in `netlify.toml`. Documents marked **Waiting for confirmation** (`needsConfirmation`) are
noindexed and left out of the sitemap and llms.txt.

---

## Sanity Schema Rules

- **Singletons** go in `src/sanity/schemas/singletons/` — one document, no list (add the name to `singletonTypes` in `schemas/index.ts`)
- **Repeatable documents** go in `src/sanity/schemas/documents/`
- **Reusable field objects** go in `src/sanity/schemas/objects/`
- **Page-builder sections** go in `src/sanity/schemas/objects/blocks/` — register in `blockTypes`, add a projection in `pageBuilderFields` (queries.ts) and a component in `src/components/blocks/` + `PageBuilder.astro`
- Every page schema MUST include `seoField` (from `schemas/shared.ts`) and be listed in `routes.ts` + `src/sanity/presentation.ts` for visual editing
- Every image uses the `imageWithAlt` type (alt text is required unless marked decorative)
- Every link uses the `link` type (internal reference / URL / email / phone) — never a free-text href
- Rich text uses the `richText` type
- Video embeds use the `videoEmbed` object schema — supports YouTube + Vimeo
- Icons: import from subpaths, e.g. `import { HomeIcon } from '@sanity/icons/Home'` (the root export is removed in @sanity/icons v5)

### Singleton pattern (always use this for fixed pages)
See `src/sanity/structure.ts` (`singletonListItem`). Singletons are also hidden from
"Create new" and can't be duplicated or deleted (see `sanity.config.ts`).

### Visual editing
- Studio is embedded at `/studio`; the Presentation tool opens the site via `/api/draft-mode/enable`
- Draft mode needs `SANITY_API_READ_TOKEN` (Viewer). The cookie value is derived from the token, so it can't be forged
- Page-builder sections get `data-sanity` attributes (`editAttr`) so editors can click and drag-reorder them

---

## Environment Variables

Never hardcode project IDs, tokens, or webhook URLs.
All env vars are documented in `.env.example`.

| Variable | Used in |
|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | astro.config.mjs, sanity.config.ts |
| `PUBLIC_SANITY_DATASET` | astro.config.mjs, sanity.config.ts |
| `SANITY_STUDIO_URL` | astro.config.mjs (stega) — optional, defaults to `/studio` |
| `SANITY_API_READ_TOKEN` | src/sanity/lib/load.ts, api/draft-mode (server only) |
| `SITE_URL` | astro.config.mjs |

---

## Forms → Netlify Forms

The tour form (`src/components/ui/TourForm.tsx`) checks the answers with `TourRequestSchema` (Zod, `src/lib/tour.ts`),
drops obvious spam (honeypot + time-to-submit), then POSTs URL-encoded fields to `/__forms.html` with
`form-name=tour-request`. Netlify stores each submission and emails it (set up under Forms → Notifications).

`public/__forms.html` declares the fields so Netlify can detect the form at deploy time: the pages are server-rendered,
so Netlify never sees the real form. Keep its fields in step with `toNetlifyFields()` in `src/lib/tour.ts`.
Mark does not use n8n. Don't add a webhook or third-party form service unless asked.

---

## Netlify Visual Editing Fix

The `netlify.toml` sets `Content-Security-Policy: frame-ancestors` to allow
Sanity Studio to embed the site in an iframe. Do NOT remove this header.
If visual editing breaks, this header is the first thing to check.

---

## What NOT to Do

- Do NOT switch `output` to `static` — visual editing breaks
- Do NOT use `useCdn: true` in the Sanity client — drafts won't load (published pages are cached at Netlify's CDN instead, see middleware.ts)
- Do NOT add `X-Frame-Options: DENY` — it overrides the CSP and breaks visual editing
- Do NOT store API tokens in the frontend — use server-side routes
- Do NOT create Tailwind config files — Tailwind 4 is config-free
- Do NOT use `<form>` action attributes — forms post via fetch to Netlify Forms (`/__forms.html`)
