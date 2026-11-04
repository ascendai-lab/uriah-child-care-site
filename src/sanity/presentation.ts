import { defineDocuments, defineLocations, type PresentationPluginOptions } from 'sanity/presentation'
import { routes, rootTypes } from './routes'

type Doc = { title?: string; slug?: string }

const location = (title: string | undefined, href: string) => ({ title: title ?? 'Untitled', href })

const rootLocations = (type: 'page' | 'category' | 'service' | 'serviceArea') =>
  defineLocations({
    select: { title: 'title', slug: 'slug.current' },
    resolve: (doc: Doc | null) => ({ locations: doc?.slug ? [location(doc.title, routes[type](doc.slug))] : [] }),
  })

/**
 * Tells the Presentation tool which document a URL shows (mainDocuments)
 * and where a document appears on the site (locations).
 */
export const resolve: PresentationPluginOptions['resolve'] = {
  mainDocuments: defineDocuments([
    { route: '/', filter: `_type == "homePage" && _id == "homePage"` },
    { route: '/news/:slug/', filter: `_type == "blogPost" && slug.current == $slug` },
    { route: '/:slug/', filter: `_type in ${JSON.stringify(rootTypes)} && slug.current == $slug` },
  ]),
  locations: {
    homePage: defineLocations({
      message: 'This is the home page',
      locations: [location('Home', routes.homePage())],
    }),
    page: rootLocations('page'),
    category: rootLocations('category'),
    service: rootLocations('service'),
    serviceArea: rootLocations('serviceArea'),
    blogPost: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc: Doc | null) => ({
        locations: [...(doc?.slug ? [location(doc.title, routes.blogPost(doc.slug))] : []), location('News', '/news/')],
      }),
    }),
    siteSettings: defineLocations({ message: 'Used on every page', locations: [location('Home', '/')] }),
    navigation: defineLocations({ message: 'Used on every page', locations: [location('Home', '/')] }),
  },
}
