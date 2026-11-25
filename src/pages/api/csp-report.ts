import type { APIRoute } from 'astro'

/**
 * Receives Content-Security-Policy violation reports from the Report-Only policy (see middleware.ts)
 * and writes a one-line summary to the Netlify function log (Netlify → Logs → Functions).
 * Nothing is stored. After a couple of weeks of reports, the strict policy can be enforced.
 */
export const prerender = false

const MAX_BYTES = 16_000

interface Summary {
  directive?: string
  blocked?: string
  page?: string
  sample?: string
}

function pick(body: Record<string, unknown>): Summary {
  const s = (v: unknown) => (typeof v === 'string' ? v.slice(0, 200) : undefined)
  return {
    directive: s(body.effectiveDirective ?? body['effective-directive'] ?? body['violated-directive']),
    blocked: s(body.blockedURL ?? body['blocked-uri']),
    page: s(body.documentURL ?? body['document-uri']),
    sample: s(body.sample ?? body['script-sample']),
  }
}

export const POST: APIRoute = async ({ request }) => {
  const length = Number(request.headers.get('content-length') ?? 0)
  if (length > MAX_BYTES) return new Response(null, { status: 413 })
  const text = (await request.text()).slice(0, MAX_BYTES)
  try {
    const data: unknown = JSON.parse(text)
    // Reporting API (Chrome): an array of { type, body }. Legacy report-uri: { "csp-report": {...} }.
    const reports = Array.isArray(data)
      ? data
          .filter((r): r is { type: string; body: Record<string, unknown> } => typeof r === 'object' && r !== null && 'body' in r)
          .filter((r) => r.type === 'csp-violation')
          .map((r) => r.body)
      : typeof data === 'object' && data !== null && 'csp-report' in data
        ? [(data as { 'csp-report': Record<string, unknown> })['csp-report']]
        : []
    for (const report of reports.slice(0, 20)) console.log('[csp-report]', JSON.stringify(pick(report)))
  } catch {
    // Not JSON: ignore.
  }
  return new Response(null, { status: 204 })
}
