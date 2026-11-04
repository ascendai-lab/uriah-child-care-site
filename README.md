# Uriah Child Care website

The new site for Uriah Child Care in Vineland, NJ, built on the Ascend AI starter: **Astro 5 + Sanity v6 + Tailwind 4 on Netlify**, with visual editing, a drag-and-drop page builder and local-SEO page types built in.

- 30 pages: home, 3 program hubs, 18 service pages, 2 city pages, tour, about, our center, reviews, FAQ, tuition
- Content, photos and open questions: [`seed/README.md`](./seed/README.md). Design: [`.stitch/DESIGN.md`](./.stitch/DESIGN.md)
- Try it without a Sanity project: `npm run seed:build`, then `npm run seed:mock` and `npm run dev:seed`

Read [`CLAUDE.md`](./CLAUDE.md) before building on it.

## What editors get in the CMS (`/studio`)

| Area | What's there |
|---|---|
| **Presentation** | Visual editing: click any text on the live page to edit it, drag sections to reorder, see drafts before publishing |
| **Home page / Pages** | Page builder with 14 section types (hero, text, image + text, feature cards, stats, services, areas, testimonials, FAQs, team, latest posts, call to action, contact form, video). New pages start with a hero and a text section |
| **Program hubs, Services, City pages** | Each gets a root URL (`/preschool-vineland-nj/`) with an answer-first hero, quick facts, highlights, day plan, reviews, FAQs and related links. Blog posts live under `/blog/` |
| **Testimonials, FAQs, Team** | Managed once, shown anywhere through page-builder sections |
| **Navigation** | Main menu with dropdowns, header button, footer link columns |
| **Site settings** | Logo, favicon, phone/email/address, hours (incl. 24-hour), social profiles, page title format, fallback SEO, GA4 / GTM / Meta Pixel / Search Console, announcement bar, footer text |
| **Redirects** | Old URL → new page (301/302), for moving from WordPress |

Every page has an **SEO & sharing** tab (meta title/description with length hints, social share image, canonical URL, hide from Google). Every image requires **alt text** unless marked decorative. The **rich text editor** has headings, lists, bold/italic/highlight, links to pages, URLs, email and phone, plus images, videos and buttons.

The site outputs LocalBusiness, Service, BlogPosting and FAQPage structured data, a sitemap at `/sitemap.xml` and `robots.txt`.

## Setup

Requires Node 22.12+.

```sh
npm install
cp .env.example .env   # fill in the Sanity project + token + n8n webhook
npm run dev            # site on http://localhost:4321, CMS on /studio
```

In [sanity.io/manage](https://sanity.io/manage) for the client's project:

1. **API → CORS origins**: add `http://localhost:4321` and the Netlify URL, with credentials allowed.
2. **API → Tokens**: create a **Viewer** token and set it as `SANITY_API_READ_TOKEN`. Visual editing doesn't work without it.

Then open `/studio`, fill in **Site settings** and **Navigation**, and add sections to the **Home page**.

## Scripts

| Command | Action |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run check` | Type-check Astro + TS |
| `npm run typegen` | Regenerate `src/sanity/types.ts` after schema or query changes |
| `npm run sanity:deploy` | Optional: also host the Studio on `*.sanity.studio` |

## Deploy on Netlify

`netlify.toml` sets the build (`npm run build`, publish `dist`, Node 22) and the `frame-ancestors` header that lets the Studio show the site in its preview iframe. Set the env vars from `.env.example` in Netlify's site settings.

Published pages are cached on Netlify's CDN for 60 seconds and refreshed in the background, so edits go live within about a minute. Draft previews are never cached.

## New client checklist

1. Create a repo from this template and a new Sanity project.
2. Fill in `.stitch/DESIGN.md` and copy its tokens into `src/styles/global.css`.
3. Change `title` in `sanity.config.ts`.
4. Set the env vars locally and in Netlify.
5. Add redirects for the client's old URLs in the CMS.
