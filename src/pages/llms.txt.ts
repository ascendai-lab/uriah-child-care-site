import type { APIRoute } from 'astro'
import { loadQuery } from '@cms/lib/load'
import { llmsQuery } from '@cms/queries'
import { buildLlmsTxt } from '@/lib/llms'

/** Generated from Sanity on request, so it never drifts from the site. */
export const GET: APIRoute = async ({ site, url }) => {
  const data = await loadQuery(false, llmsQuery)
  return new Response(buildLlmsTxt(data, site ?? new URL(url.origin)), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
