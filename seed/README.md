# Seed content

The site's first content, written by hand and loaded into Sanity in one go.

| File | What's in it |
|---|---|
| `content-core.mjs` | Settings documents (NAP, hours, license, GBP text), navigation, team, Google reviews, the global FAQ |
| `content-programs.mjs` | 3 program hubs (GBP categories), 18 service pages, 2 city pages |
| `content-pages.mjs` | Home page and the 6 page-builder pages (tour, about, our center, reviews, FAQ, tuition) |
| `lib.mjs` | Helpers. `md` turns a small Markdown subset into Portable Text; `[text](/slug/)` links become document references |
| `build.mjs` | Checks ids, URLs and references, then writes `dataset.ndjson` (for import) and `.mock/` (for the preview) |
| `mock-api.mjs` | A stand-in Sanity API for previewing the site without a Sanity project |
| `images/` | The 12 approved center photos (webp, max 1800px). No child is visible in any of them |

## Load it into Sanity

```sh
npm run seed:build                                   # writes seed/dataset.ndjson
npx sanity dataset import seed/dataset.ndjson production --replace
```

Images upload automatically from `seed/images/`. Re-running with `--replace` overwrites these documents, so only do it
before editors start changing content in the Studio.

## Preview without Sanity

```sh
npm run seed:build
npm run seed:mock            # terminal 1: mock API on :9999
npm run dev:seed             # terminal 2: the site on :4321, reading from the mock
```

## Content rules followed

- Ages 2.5 and up only. No infant care anywhere (copy, FAQs, schema).
- NAP matches the Google Business Profile exactly: Uriah Child Care, 30 W Chestnut Ave, Vineland, NJ 08360, (856) 455-6701.
- Hours: Monday to Sunday, 6 am to 11 pm. "Third shift" means care until 11 pm. No overnight care is offered, so the
  late page is `late-evening-child-care-vineland-nj`, not "overnight".
- No invented ratios, prices, credentials or star ratings. Review stars only show once a rating is entered.
- Reviews are copied word for word. Skipped: Tameca Burke's (staff/family, against Google policy), two that mention
  infant ages, and one with a typo in the name.
- Confirmed by Mark (2026-11-04): tuition is "call for pricing"; no center-run school pickup or drop-off, but school buses CAN pick up and drop off at the center (Mark, 18:05) (said on the before/after
  school pages and FAQ); summer care and school-closure care are offered and published.
- Any page marked **Waiting for confirmation** is hidden from Google, the sitemap and llms.txt.

## Open questions for Mark

1. **Shift times.** The site says first, second and third shift within 6 am to 11 pm. What are the exact times of each?
2. **Google reviews.** Star ratings and total review count to show, and is place ID `ChIJk-4vYVw3x4kRSX5zZYYtB10` the
   current listing (it came from the old site)?
3. **City pages.** Drive times (about 20 minutes from Millville, about 25 from Bridgeton) are estimates. Any local detail
   to add, like schools or employers families come from?
4. **Social profiles** for `sameAs` (Facebook, Instagram).
5. **The street sign** still says "Infants". It is small in the hero photo but readable up close.
6. **Environmental clearance letter.** OK to say the building was independently environmentally cleared?
7. **Women-owned** GBP attribute, if Ms. Paulette wants it shown.
8. **Email.** Please confirm `hello@uriahchildcare.com` is the address the site should show.
