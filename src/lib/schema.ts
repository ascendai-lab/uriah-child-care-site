import { stegaClean } from '@sanity/client/stega'
import type { SiteSettings } from '@cms/lib/types'
import { urlFor } from '@cms/lib/image'
import { toOpeningHoursSpec } from './hours'

/**
 * JSON-LD builders. Everything comes from Site settings, so the schema can't drift
 * from the footer, the fact table or the Google Business Profile.
 */
type Json = Record<string, unknown>

const clean = <T>(v: T) => stegaClean(v)
const compact = (obj: Json): Json =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && !v.length)))

export const businessId = (site: URL) => new URL('/#childcare', site).href
export const websiteId = (site: URL) => new URL('/#website', site).href
export const businessRef = (site: URL) => ({ '@id': businessId(site) })

export function postalAddress(settings: SiteSettings | null | undefined) {
  const a = settings?.address
  if (!a?.street) return undefined
  return {
    '@type': 'PostalAddress',
    streetAddress: clean(a.street),
    addressLocality: clean(a.city) || undefined,
    addressRegion: clean(a.state) || undefined,
    postalCode: clean(a.zip) || undefined,
    addressCountry: 'US',
  }
}

export interface AreaRef {
  city?: string | null
  state?: string | null
}

/** The one ChildCare entity, defined in full on the home page and referenced by @id everywhere else. */
export function childCareEntity(
  settings: SiteSettings,
  site: URL,
  opts: { areas?: AreaRef[]; reviews?: { rating?: number | null; name?: string | null; quote?: string | null; date?: string | null }[]; image?: string | null; owner?: { name?: string | null; role?: string | null; photo?: string | null } | null } = {},
): Json {
  const areas = [
    { '@type': 'City', name: `${clean(settings.address?.city) ?? 'Vineland'}, ${clean(settings.address?.state) ?? 'NJ'}` },
    ...(opts.areas ?? []).map((a) => ({ '@type': 'City', name: `${clean(a.city)}, ${clean(a.state) ?? 'NJ'}` })),
  ]
  const reviews = (opts.reviews ?? []).filter((r) => r.rating && r.quote)
  const sameAs = [
    clean(settings.gbpUrl),
    ...(settings.socialLinks ?? []).map((s) => clean(s.url)),
    ...(settings.sameAs ?? []).map((u) => clean(u)),
  ].filter(Boolean)
  const license = settings.license
  return compact({
    '@context': 'https://schema.org',
    '@type': ['ChildCare', 'LocalBusiness'],
    '@id': businessId(site),
    name: clean(settings.siteName),
    legalName: clean(settings.legalName) || undefined,
    url: site.href,
    description: clean(settings.gbpDescription) || clean(settings.defaultSeo?.metaDescription) || undefined,
    telephone: clean(settings.phone) || undefined,
    email: clean(settings.email) || undefined,
    priceRange: clean(settings.priceRange) || undefined,
    image: opts.image ?? undefined,
    logo: new URL('/brand/uriah-logo.svg', site).href,
    address: postalAddress(settings),
    hasMap: clean(settings.gbpUrl) || clean(settings.mapUrl) || undefined,
    openingHoursSpecification: settings.hours?.length ? toOpeningHoursSpec(settings.hours) : undefined,
    areaServed: areas,
    foundingDate: settings.foundingYear ? String(settings.foundingYear) : undefined,
    founder: opts.owner?.name
      ? compact({
          '@type': 'Person',
          name: clean(opts.owner.name),
          alternateName: clean(settings.ownerName) || undefined,
          jobTitle: clean(opts.owner.role) || 'Owner',
          image: opts.owner.photo ?? undefined,
        })
      : undefined,
    audience: compact({
      '@type': 'PeopleAudience',
      suggestedMinAge: settings.ageMin ?? undefined,
      suggestedMaxAge: settings.ageMax ?? undefined,
    }),
    hasCredential: license?.number
      ? compact({
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'license',
          name: clean(license.summary) || `Child care center license ${clean(license.number)}`,
          identifier: clean(license.number),
          recognizedBy: license.issuer ? { '@type': 'GovernmentOrganization', name: clean(license.issuer) } : undefined,
        })
      : undefined,
    // Only first-party reviews that are shown on the page, per Google's review snippet rules.
    aggregateRating: reviews.length
      ? {
          '@type': 'AggregateRating',
          ratingValue: (reviews.reduce((n, r) => n + (r.rating ?? 0), 0) / reviews.length).toFixed(1),
          reviewCount: reviews.length,
          bestRating: 5,
        }
      : undefined,
    review: reviews.slice(0, 6).map((r) =>
      compact({
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
        author: { '@type': 'Person', name: clean(r.name) },
        reviewBody: clean(r.quote),
        datePublished: clean(r.date) || undefined,
      }),
    ),
    sameAs,
  })
}

export function websiteEntity(settings: SiteSettings, site: URL): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId(site),
    url: site.href,
    name: clean(settings.siteName),
    publisher: businessRef(site),
  }
}

export function webPageEntity(opts: { site: URL; url: string; name: string; description?: string; type?: string; modified?: string | null; extra?: Json }): Json {
  return compact({
    '@context': 'https://schema.org',
    '@type': opts.type ?? 'WebPage',
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.name,
    description: opts.description || undefined,
    isPartOf: { '@id': websiteId(opts.site) },
    about: businessRef(opts.site),
    dateModified: opts.modified ? clean(opts.modified) : undefined,
    ...opts.extra,
  })
}

export function breadcrumbEntity(crumbs: { label: string; href: string }[], site: URL): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: clean(c.label),
      item: new URL(c.href, site).href,
    })),
  }
}

export function faqEntity(items: { question?: string | null; answer?: string | null }[]): Json | null {
  const list = items.filter((i) => i.question && i.answer)
  if (!list.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map((i) => ({
      '@type': 'Question',
      name: clean(i.question),
      acceptedAnswer: { '@type': 'Answer', text: clean(i.answer) },
    })),
  }
}

export function serviceEntity(opts: {
  site: URL
  url: string
  name: string
  serviceType?: string | null
  description?: string | null
  settings: SiteSettings | null
  areas?: AreaRef[]
}): Json {
  const s = opts.settings
  return compact({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${opts.url}#service`,
    name: clean(opts.name),
    serviceType: clean(opts.serviceType) || undefined,
    description: clean(opts.description) || undefined,
    url: opts.url,
    provider: businessRef(opts.site),
    audience: compact({ '@type': 'PeopleAudience', suggestedMinAge: s?.ageMin ?? undefined, suggestedMaxAge: s?.ageMax ?? undefined }),
    areaServed: [
      { '@type': 'City', name: `${clean(s?.address?.city) ?? 'Vineland'}, ${clean(s?.address?.state) ?? 'NJ'}` },
      ...(opts.areas ?? []).map((a) => ({ '@type': 'City', name: `${clean(a.city)}, ${clean(a.state) ?? 'NJ'}` })),
    ],
  })
}

export function personEntity(site: URL, p: { name?: string | null; role?: string | null; bio?: string | null; photo?: unknown; credentials?: string[] | null }): Json {
  const photo = (p.photo as { asset?: unknown } | null)?.asset ? urlFor(p.photo as Parameters<typeof urlFor>[0]).width(800).url() : undefined
  return compact({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: clean(p.name),
    jobTitle: clean(p.role) || undefined,
    description: clean(p.bio) || undefined,
    image: photo,
    worksFor: businessRef(site),
    hasCredential: (p.credentials ?? []).map((c) => ({ '@type': 'EducationalOccupationalCredential', name: clean(c) })),
  })
}
