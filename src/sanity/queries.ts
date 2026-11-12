import { defineQuery } from 'groq'

/* ── Fragments ────────────────────────────────────────────────────────────── */

const linkFields = /* groq */ `
  linkType,
  external,
  email,
  phone,
  anchor,
  openInNewTab,
  "internal": internal->{ _type, "slug": slug.current }
`

const imageFields = /* groq */ `
  asset,
  hotspot,
  crop,
  alt,
  decorative,
  caption,
  "dimensions": asset->metadata.dimensions { width, height },
  "lqip": asset->metadata.lqip
`

const buttonFields = /* groq */ `
  _key,
  label,
  variant,
  link { ${linkFields} }
`

const richTextFields = /* groq */ `
  ...,
  markDefs[] {
    ...,
    _type == "link" => { ${linkFields} }
  },
  _type == "imageWithAlt" => { _key, _type, ${imageFields} },
  _type == "ctaButton" => { _type, ${buttonFields} }
`

const seoFields = /* groq */ `
  seo {
    metaTitle,
    metaDescription,
    canonicalUrl,
    noIndex,
    ogImage { ${imageFields} }
  }
`

const serviceCardFields = /* groq */ `
  _id,
  _type,
  title,
  shortTitle,
  excerpt,
  ageRange,
  accent,
  "slug": slug.current,
  image { ${imageFields} }
`

/** Root-level pages that can be linked from "related" lists, breadcrumbs and menus. */
const pageLinkFields = /* groq */ `
  _id,
  _type,
  title,
  shortTitle,
  excerpt,
  "slug": slug.current
`

const testimonialFields = /* groq */ `
  _id,
  name,
  context,
  quote,
  rating,
  source,
  reviewUrl,
  date,
  photo { ${imageFields} }
`

const faqFields = /* groq */ `
  _id,
  question,
  answer[] { ${richTextFields} }
`

const teamFields = /* groq */ `
  _id,
  name,
  role,
  bio,
  credentials,
  photo { ${imageFields} }
`

const areaCardFields = /* groq */ `
  _id,
  _type,
  city,
  state,
  title,
  shortTitle,
  excerpt,
  driveTime,
  accent,
  "slug": slug.current,
  image { ${imageFields} }
`

const postCardFields = /* groq */ `
  _id,
  title,
  excerpt,
  publishedAt,
  "slug": slug.current,
  image { ${imageFields} }
`

/** Every page-builder section, with lists resolved ("all" or the picked items). */
const pageBuilderFields = /* groq */ `
  pageBuilder[] {
    _key,
    _type,
    "anchorId": anchorId.current,
    background,
    heading,
    _type == "hero" => {
      eyebrow, subheading, layout, accentWord, showRating, showPhone, accent,
      buttons[] { ${buttonFields} },
      image { ${imageFields} }
    },
    _type == "textBlock" => { width, body[] { ${richTextFields} } },
    _type == "imageText" => {
      eyebrow, imagePosition, imageShape, accent, showDoodles,
      body[] { ${richTextFields} },
      buttons[] { ${buttonFields} },
      image { ${imageFields} }
    },
    _type == "featureGrid" => {
      intro, columns, style, imageShape,
      buttons[] { ${buttonFields} },
      image { ${imageFields} },
      items[] { _key, title, description, image { ${imageFields} }, link { ${linkFields} } }
    },
    _type == "statsBlock" => { items[] { _key, value, label } },
    _type == "servicesBlock" => {
      intro,
      "items": select(
        mode == "selected" => services[]->{ ${serviceCardFields} },
        *[_type == "category" && defined(slug.current)] | order(order asc, title asc) { ${serviceCardFields} }
      )
    },
    _type == "serviceAreasBlock" => {
      intro,
      "items": select(
        mode == "selected" => areas[]->{ ${areaCardFields} },
        *[_type == "serviceArea" && defined(slug.current)] | order(order asc, city asc) { ${areaCardFields} }
      )
    },
    _type == "testimonialsBlock" => {
      intro,
      "items": select(
        mode == "selected" => testimonials[]->{ ${testimonialFields} },
        *[_type == "testimonial" && firstParty != false] | order(order asc, _createdAt desc) { ${testimonialFields} }
      )
    },
    _type == "faqBlock" => {
      intro,
      buttons[] { ${buttonFields} },
      "items": select(
        mode == "selected" => faqs[]->{ ${faqFields} },
        *[_type == "faq"] | order(order asc, _createdAt asc) { ${faqFields} }
      )
    },
    _type == "teamBlock" => {
      intro,
      "items": select(
        mode == "selected" => members[]->{ ${teamFields} },
        *[_type == "teamMember"] | order(order asc, name asc) { ${teamFields} }
      )
    },
    _type == "latestPostsBlock" => {
      intro,
      "items": *[_type == "blogPost" && defined(slug.current) && publishedAt <= now()]
        | order(publishedAt desc) [0...12] { ${postCardFields} },
      count
    },
    _type == "ctaBlock" => { body, buttons[] { ${buttonFields} } },
    _type == "contactFormBlock" => { intro, successMessage, showContactDetails },
    _type == "jobApplicationBlock" => { intro, positions, successMessage },
    _type == "videoBlock" => { intro, video { url, caption, autoplay } },
    _type == "mapBlock" => { intro, notes },
    _type == "factTableBlock" => { intro, extraRows[] { _key, label, value } },
    _type == "galleryBlock" => { intro, images[] { _key, ${imageFields} } }
  }
`

/* ── Layout ───────────────────────────────────────────────────────────────── */

export const layoutQuery = defineQuery(`{
  "settings": {
    "siteName": *[_id == "businessInfo"][0].siteName,
    "legalName": *[_id == "seoSettings"][0].legalName,
    "tagline": *[_id == "brandSettings"][0].tagline,
    "logo": *[_id == "brandSettings"][0].logo { ${imageFields} },
    "logoInverse": *[_id == "brandSettings"][0].logoInverse { ${imageFields} },
    "faviconUrl": *[_id == "brandSettings"][0].favicon.asset->url,
    "phone": *[_id == "businessInfo"][0].phone,
    "email": *[_id == "businessInfo"][0].email,
    "address": *[_id == "businessInfo"][0].address { street, city, state, zip },
    "mapUrl": *[_id == "businessInfo"][0].mapUrl,
    "hours": *[_id == "businessInfo"][0].hours[] { _key, days, open24Hours, opens, closes },
    "hoursSummary": *[_id == "businessInfo"][0].hoursSummary,
    "agesServed": *[_id == "seoSettings"][0].agesServed,
    "ageMin": *[_id == "seoSettings"][0].ageMin,
    "ageMax": *[_id == "seoSettings"][0].ageMax,
    "shiftsLine": *[_id == "seoSettings"][0].shiftsLine,
    "programsLine": *[_id == "seoSettings"][0].programsLine,
    "subsidyStatement": *[_id == "seoSettings"][0].subsidyStatement,
    "foodProgramStatement": *[_id == "seoSettings"][0].foodProgramStatement,
    "license": *[_id == "seoSettings"][0].license { issuer, number, summary },
    "foundingYear": *[_id == "seoSettings"][0].foundingYear,
    "ownerName": *[_id == "seoSettings"][0].ownerName,
    "serviceAreasLine": *[_id == "seoSettings"][0].serviceAreasLine,
    "attributes": *[_id == "seoSettings"][0].attributes,
    "gbpDescription": *[_id == "seoSettings"][0].gbpDescription,
    "gbpUrl": *[_id == "seoSettings"][0].gbpUrl,
    "gbpReviewUrl": *[_id == "seoSettings"][0].gbpReviewUrl,
    "gbpWriteReviewUrl": *[_id == "seoSettings"][0].gbpWriteReviewUrl,
    "gbpMapEmbedUrl": *[_id == "seoSettings"][0].gbpMapEmbedUrl,
    "googleRating": *[_id == "seoSettings"][0].googleRating,
    "googleReviewCount": *[_id == "seoSettings"][0].googleReviewCount,
    "sameAs": *[_id == "seoSettings"][0].sameAs,
    "businessType": *[_id == "seoSettings"][0].businessType,
    "priceRange": *[_id == "seoSettings"][0].priceRange,
    "socialLinks": *[_id == "brandSettings"][0].socialLinks[] { _key, platform, url },
    "titleTemplate": *[_id == "seoSettings"][0].titleTemplate,
    "defaultSeo": *[_id == "seoSettings"][0].defaultSeo {
      metaTitle,
      metaDescription,
      ogImage { ${imageFields} }
    },
    "gaId": *[_id == "seoSettings"][0].gaId,
    "gtmId": *[_id == "seoSettings"][0].gtmId,
    "metaPixelId": *[_id == "seoSettings"][0].metaPixelId,
    "googleSiteVerification": *[_id == "seoSettings"][0].googleSiteVerification,
    "announcement": *[_id == "announcementBar"][0] { enabled, text, link { ${linkFields} } },
    "footerText": *[_id == "brandSettings"][0].footerText,
    "copyrightName": *[_id == "brandSettings"][0].copyrightName
  },
  "navigation": *[_type == "navigation" && _id == "navigation"][0] {
    headerLinks[] {
      _key,
      label,
      link { ${linkFields} },
      children[] { _key, label, link { ${linkFields} } }
    },
    headerCta { ${buttonFields} },
    footerColumns[] {
      _key,
      heading,
      links[] { _key, label, link { ${linkFields} } }
    }
  },
  "footerPages": *[_type == "page" && showInFooter == true && defined(slug.current)] | order(title asc) {
    _id, title, "slug": slug.current
  },
  "programs": *[_type == "category" && defined(slug.current)] | order(order asc) {
    ${pageLinkFields},
    "services": *[_type == "service" && category._ref == ^._id && needsConfirmation != true && defined(slug.current)]
      | order(order asc) { ${pageLinkFields} }
  },
  "homeServices": *[_type == "service" && !defined(category) && defined(slug.current)] | order(order asc) { ${pageLinkFields} },
  "cities": *[_type == "serviceArea" && defined(slug.current)] | order(order asc) { ${pageLinkFields}, city },
  "owner": *[_type == "teamMember"] | order(order asc)[0] { name, role, photo { ${imageFields} } },
  "tourPage": *[_type == "page" && slug.current == "tour"][0] { "slug": slug.current },
  "reviews": *[_type == "testimonial" && firstParty != false] | order(order asc, _createdAt desc)[0...12] { ${testimonialFields} },
  "photoPool": *[_type in ["category", "service", "serviceArea"] && defined(image.asset)] | order(order asc).image { ${imageFields} },
  "generalFaqs": *[_type == "faq"] | order(order asc, _createdAt asc)[0...8] { ${faqFields} }
}`)

/* ── Pages ────────────────────────────────────────────────────────────────── */

export const homePageQuery = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0] {
    _id,
    _type,
    ${pageBuilderFields},
    ${seoFields}
  }
`)

export const pageQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    "slug": slug.current,
    ${pageBuilderFields},
    ${seoFields}
  }
`)

/** Any root-level page: a plain page, a program hub, a service or a city page. */
export const routeQuery = defineQuery(`
  *[_type in ["page", "category", "service", "serviceArea"] && slug.current == $slug][0] {
    _id,
    _type,
    _updatedAt,
    title,
    shortTitle,
    "slug": slug.current,
    intro,
    excerpt,
    ageRange,
    schedule,
    accent,
    keyword,
    gbpName,
    needsConfirmation,
    hideTourBlock,
    lastReviewed,
    city,
    state,
    driveTime,
    highlights,
    dayPlan[] { _key, label, activity },
    image { ${imageFields} },
    body[] { ${richTextFields} },
    faqs[] { _key, question, answer },
    reviews[]-> { ${testimonialFields} },
    related[]-> { ${pageLinkFields} },
    "parent": category-> { ${pageLinkFields} },
    "services": select(
      _type == "category" => *[_type == "service" && category._ref == ^._id && defined(slug.current)]
        | order(order asc) { ${serviceCardFields}, needsConfirmation },
      null
    ),
    "siblings": select(
      _type == "service" && defined(category) => *[_type == "service" && category._ref == ^.category._ref
        && _id != ^._id && needsConfirmation != true && defined(slug.current)] | order(order asc)[0...3] { ${pageLinkFields} },
      null
    ),
    ${pageBuilderFields},
    ${seoFields}
  }
`)

export const blogIndexQuery = defineQuery(`
  *[_type == "blogPost" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc) {
    ${postCardFields}
  }
`)

export const blogPostQuery = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    excerpt,
    publishedAt,
    _updatedAt,
    categories,
    "slug": slug.current,
    image { ${imageFields} },
    body[] { ${richTextFields} },
    author->{ name, role, photo { ${imageFields} } },
    ${seoFields}
  }
`)

/* ── Utility ──────────────────────────────────────────────────────────────── */

export const redirectQuery = defineQuery(`
  *[_type == "redirect" && source in $paths][0] {
    permanent,
    destination { ${linkFields} }
  }
`)

export const sitemapQuery = defineQuery(`
  *[_type in ["homePage", "page", "category", "service", "serviceArea", "blogPost"] && seo.noIndex != true
    && needsConfirmation != true && (_type == "homePage" || defined(slug.current))] {
    _type,
    _updatedAt,
    "slug": slug.current
  }
`)

/** Everything /llms.txt and /llms-full.txt need, so they never drift from the site. */
export const llmsQuery = defineQuery(`{
  "settings": {
    "siteName": *[_id == "businessInfo"][0].siteName,
    "legalName": *[_id == "seoSettings"][0].legalName,
    "phone": *[_id == "businessInfo"][0].phone,
    "email": *[_id == "businessInfo"][0].email,
    "address": *[_id == "businessInfo"][0].address { street, city, state, zip },
    "hoursSummary": *[_id == "businessInfo"][0].hoursSummary,
    "agesServed": *[_id == "seoSettings"][0].agesServed,
    "shiftsLine": *[_id == "seoSettings"][0].shiftsLine,
    "programsLine": *[_id == "seoSettings"][0].programsLine,
    "subsidyStatement": *[_id == "seoSettings"][0].subsidyStatement,
    "foodProgramStatement": *[_id == "seoSettings"][0].foodProgramStatement,
    "license": *[_id == "seoSettings"][0].license { issuer, number, summary },
    "foundingYear": *[_id == "seoSettings"][0].foundingYear,
    "ownerName": *[_id == "seoSettings"][0].ownerName,
    "serviceAreasLine": *[_id == "seoSettings"][0].serviceAreasLine,
    "gbpDescription": *[_id == "seoSettings"][0].gbpDescription,
    "gbpUrl": *[_id == "seoSettings"][0].gbpUrl
  },
  "categories": *[_type == "category" && defined(slug.current) && seo.noIndex != true] | order(order asc) {
    title, "slug": slug.current, excerpt, intro, ageRange, schedule, faqs[] { question, answer },
    "services": *[_type == "service" && category._ref == ^._id && needsConfirmation != true && seo.noIndex != true
      && defined(slug.current)] | order(order asc) { title, "slug": slug.current, excerpt, intro, ageRange, schedule, faqs[] { question, answer } }
  },
  "homeServices": *[_type == "service" && !defined(category) && needsConfirmation != true && seo.noIndex != true
    && defined(slug.current)] | order(order asc) { title, "slug": slug.current, excerpt, intro, faqs[] { question, answer } },
  "cities": *[_type == "serviceArea" && defined(slug.current)] | order(order asc) { title, "slug": slug.current, excerpt, intro },
  "pages": *[_type == "page" && defined(slug.current) && seo.noIndex != true] | order(title asc) {
    title, "slug": slug.current, "description": seo.metaDescription
  },
  "faqs": *[_type == "faq"] | order(order asc) { question, "answer": pt::text(answer) }
}`)
