import { defineMiddleware } from 'astro:middleware'
import { DRAFT_MODE_COOKIE, isValidDraftModeCookie } from '@cms/lib/draftMode'
import { loadQuery } from '@cms/lib/load'
import { resolveLink } from '@cms/lib/links'
import { redirectQuery } from '@cms/queries'

/**
 * Published pages are cached on Netlify's CDN for a minute, then refreshed in
 * the background, so the site stays fast without hammering the Sanity API.
 * Draft-mode responses are never cached.
 */
const CDN_CACHE = 'public, durable, s-maxage=60, stale-while-revalidate=604800'

const skipPrefixes = ['/studio', '/api/', '/_astro/', '/_image']
/** Error pages are reached through Astro.rewrite('/404'): never redirect those. */
const errorPages = new Set(['/404', '/500'])

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, search } = context.url
  const skip = skipPrefixes.some((prefix) => pathname.startsWith(prefix))

  // Every page URL ends in a slash (/preschool-vineland-nj/). Redirect the other form once,
  // so search engines only ever see one version. Files like /sitemap.xml are left alone.
  const method = context.request.method
  if (!skip && !errorPages.has(pathname) && (method === 'GET' || method === 'HEAD') && pathname !== '/' && !pathname.endsWith('/') && !/\.[a-z0-9]+$/i.test(pathname)) {
    return new Response(null, { status: 301, headers: { Location: `${pathname}/${search}`, 'Cache-Control': 'public, max-age=3600' } })
  }

  context.locals.draftMode = skip
    ? false
    : await isValidDraftModeCookie(context.cookies.get(DRAFT_MODE_COOKIE)?.value)

  const response = await next()
  if (skip) return response

  // Unknown URL? Check the CMS Redirects list before showing the 404.
  if (response.status === 404) {
    const trimmed = pathname.replace(/\/+$/, '') || '/'
    const found = await loadQuery(false, redirectQuery, { paths: [trimmed, `${trimmed}/`] }).catch(() => null)
    const target = resolveLink(found?.destination)
    if (found && target) {
      return new Response(null, {
        status: found.permanent === false ? 302 : 301,
        headers: { Location: target.href, 'Cache-Control': 'public, max-age=300' },
      })
    }
  }

  try {
    response.headers.set('Netlify-Vary', `cookie=${DRAFT_MODE_COOKIE}`)
    if (context.locals.draftMode) {
      response.headers.set('Cache-Control', 'private, no-store')
    } else if (response.status === 200 && response.headers.get('content-type')?.includes('text/html')) {
      response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate')
      response.headers.set('Netlify-CDN-Cache-Control', CDN_CACHE)
    }
  } catch {
    // Some responses (e.g. redirects) have immutable headers. Nothing to add there.
  }

  return response
})
