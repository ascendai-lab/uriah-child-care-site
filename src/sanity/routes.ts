/**
 * One place that maps document types to front-end URLs.
 * Used by the website (links, sitemap, schema) and by the Studio (Presentation tool),
 * so a new route only has to be added here.
 *
 * Uriah's "Core 30" pages all live at the root with a trailing slash
 * (e.g. /preschool-vineland-nj/), matching the GBP service names one to one.
 */
export const routes = {
  homePage: () => '/',
  page: (slug: string) => `/${slug}/`,
  category: (slug: string) => `/${slug}/`,
  service: (slug: string) => `/${slug}/`,
  serviceArea: (slug: string) => `/${slug}/`,
  blogPost: (slug: string) => `/blog/${slug}/`,
} as const

export type RoutableType = keyof typeof routes

/** Document types that share the root URL space, so their slugs must be unique across all of them. */
export const rootTypes = ['page', 'category', 'service', 'serviceArea'] as const

/** Listing pages that are not documents themselves. */
export const indexRoutes = {
  blog: '/blog/',
} as const

export function isRoutableType(type: string): type is RoutableType {
  return type in routes
}

export function hrefFor(type: string, slug?: string | null): string | null {
  if (!isRoutableType(type)) return null
  if (type === 'homePage') return routes.homePage()
  if (!slug) return null
  return routes[type](slug)
}

/** Document types that have their own URL — used for internal link references. */
export const linkableTypes: RoutableType[] = ['page', 'homePage', 'category', 'service', 'serviceArea', 'blogPost']
