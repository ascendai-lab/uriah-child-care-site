import type { APIRoute } from 'astro'

/** Search and AI crawlers are welcome: being quotable in AI answers is part of the plan. */
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended',
  'Bingbot',
  'Applebot',
  'Applebot-Extended',
]

export const GET: APIRoute = ({ site, url }) => {
  const origin = site ?? new URL(url.origin)
  const body = `User-agent: *
Allow: /
Disallow: /studio
Disallow: /api/
Disallow: /tour/thanks/

${aiCrawlers.map((bot) => `User-agent: ${bot}\nAllow: /\nDisallow: /studio\nDisallow: /api/\nDisallow: /tour/thanks/`).join('\n\n')}

Sitemap: ${new URL('/sitemap.xml', origin).href}
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
