import type { APIRoute } from 'astro'
import { MIN_FILL_MS, TourRequestSchema } from '@/lib/tour'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

/* ── Rate limit (simple, per server instance) ──────────────────────────────── */
// For heavier traffic, move this to Netlify rate limiting or Upstash Redis.
const submissions = new Map<string, number>()
const RATE_LIMIT_MS = 30_000

function isRateLimited(ip: string): boolean {
  const last = submissions.get(ip)
  if (last && Date.now() - last < RATE_LIMIT_MS) return true
  submissions.set(ip, Date.now())
  return false
}

/**
 * Book-a-tour requests. Validates with Zod, drops obvious spam (honeypot + time-to-submit),
 * then forwards the lead to n8n, which texts and emails the center and logs it in the CRM.
 */
export const POST: APIRoute = async ({ request, site }) => {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid request.' }, 400)
  }

  const result = TourRequestSchema.safeParse(body)
  if (!result.success) {
    const fields = result.error.flatten().fieldErrors
    return json({ error: Object.values(fields).flat()[0] ?? 'Please check the form and try again.', fields }, 422)
  }
  const data = result.data

  // Spam: pretend it worked, so bots learn nothing.
  if (data.website || (data.elapsedMs !== undefined && data.elapsedMs < MIN_FILL_MS)) {
    return json({ success: true })
  }

  const ip = request.headers.get('x-nf-client-connection-ip') ?? request.headers.get('x-forwarded-for') ?? 'unknown'
  if (isRateLimited(ip)) {
    return json({ error: 'We just got a request from you. Please wait a moment, or give us a call.' }, 429)
  }

  // Payload sent to n8n (documented in CLAUDE.md).
  const payload = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    message: data.message,
    childAge: data.childAge,
    careNeeded: data.careNeeded,
    tourPreference: data.tourPreference,
    subsidy: data.subsidy ?? '',
    source: 'website-tour-form',
    timestamp: new Date().toISOString(),
    siteUrl: site?.href ?? request.headers.get('origin') ?? '',
    page: data.pagePath,
    pagePath: data.pagePath,
    utm: data.utm,
    gaClientId: data.gaClientId ?? '',
  }

  // Awaited: serverless functions can stop as soon as we respond, which would drop the lead.
  const webhookUrl = import.meta.env.N8N_CONTACT_WEBHOOK_URL
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      })
      if (!res.ok) throw new Error(`n8n webhook returned ${res.status}`)
    } catch (err) {
      console.error('[contact] n8n webhook error:', err)
      return json({ error: 'We could not send your request.' }, 502)
    }
  } else {
    console.warn('[contact] N8N_CONTACT_WEBHOOK_URL is not set; the tour request was not forwarded.', payload)
  }

  return json({ success: true })
}

export const GET: APIRoute = () => new Response('Method Not Allowed', { status: 405 })
