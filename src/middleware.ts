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

/**
 * Content Security Policy for public pages: the browser only loads scripts, frames and data from the
 * places listed here, so a script injected from anywhere else won't run. Studio (/studio) and draft
 * mode are left out because the Sanity editor needs far more. Inline scripts stay allowed: Astro's
 * islands, JSON-LD and the GA / pixel snippets are inline. If a new embed or tracker stops working,
 * add its domain here.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com https://connect.facebook.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://cdn.sanity.io https://*.google-analytics.com https://*.googletagmanager.com https://www.facebook.com https://*.googleapis.com https://*.gstatic.com https://*.googleusercontent.com https://i.ytimg.com https://*.vimeocdn.com",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://www.facebook.com https://connect.facebook.net",
  "frame-src https://www.google.com https://maps.google.com https://www.youtube-nocookie.com https://www.youtube.com https://player.vimeo.com https://www.googletagmanager.com",
  "media-src 'self' https://cdn.sanity.io",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // Keep in step with netlify.toml: lets Sanity's Presentation tool show the site in its iframe.
  "frame-ancestors 'self' https://*.sanity.studio https://sanity.studio",
  'upgrade-insecure-requests',
].join('; ')

const skipPrefixes = ['/studio', '/api/', '/_astro/', '/_image']
/** Error pages are reached through Astro.rewrite('/404'): never redirect those. */
const errorPages = new Set(['/404', '/500'])

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname, search } = context.url
  const skip = skipPrefixes.some((prefix) => pathname.startsWith(prefix))

  // Every page URL ends in a slash (/toddler-care-vineland-nj/). Redirect the other form once,
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
    const isHtml = response.headers.get('content-type')?.includes('text/html')
    if (isHtml && !context.locals.draftMode) response.headers.set('Content-Security-Policy', CSP)
    if (context.locals.draftMode) {
      response.headers.set('Cache-Control', 'private, no-store')
    } else if (response.status === 200 && isHtml) {
      response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate')
      response.headers.set('Netlify-CDN-Cache-Control', CDN_CACHE)
    }
  } catch {
    // Some responses (e.g. redirects) have immutable headers. Nothing to add there.
  }

  return response
})
