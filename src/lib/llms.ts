import type { LlmsQueryResult } from '@cms/types'
import { routes } from '@cms/routes'

type Data = LlmsQueryResult

const abs = (site: URL, path: string) => new URL(path, site).href
const line = (label: string, value: string | null | undefined) => (value ? `- ${label}: ${value}` : null)

function facts(data: Data) {
  const s = data.settings
  if (!s) return []
  const a = s.address
  return [
    line('Name', s.siteName),
    line('Address', a?.street ? `${a.street}, ${a.city}, ${a.state} ${a.zip}` : null),
    line('Phone', s.phone),
    line('Email', s.email),
    line('Hours', s.hoursSummary),
    line('Shifts', s.shiftsLine),
    line('Ages', s.agesServed),
    line('Programs', s.programsLine),
    line('Subsidy', s.subsidyStatement),
    line('Meals', s.foodProgramStatement),
    line('License', s.license?.summary),
    line('Caring for local children since', s.foundingYear ? String(s.foundingYear) : null),
    line('Owner', s.ownerName),
    line('Service areas', s.serviceAreasLine),
    line('Google Business Profile', s.gbpUrl),
  ].filter(Boolean) as string[]
}

/** /llms.txt: a short, link-rich summary for AI assistants (https://llmstxt.org). */
export function buildLlmsTxt(data: Data, site: URL) {
  const s = data.settings
  const out: string[] = [`# ${s?.siteName ?? 'Uriah Child Care'}`, '']
  if (s?.gbpDescription) out.push(`> ${s.gbpDescription.replace(/\s+/g, ' ').trim()}`, '')
  out.push('## Facts', ...facts(data), '')
  out.push('## Book a tour', `- [Book a tour](${abs(site, '/tour/')}): Tell us about your family and Ms. Paulette will call you within one business day.`, '')
  out.push('## Programs')
  for (const c of data.categories) {
    out.push(`- [${c.title}](${abs(site, routes.category(c.slug ?? ''))}): ${c.excerpt ?? ''}`.trim())
    for (const sv of c.services) out.push(`  - [${sv.title}](${abs(site, routes.service(sv.slug ?? ''))}): ${sv.excerpt ?? ''}`.trim())
  }
  for (const sv of data.homeServices) out.push(`- [${sv.title}](${abs(site, routes.service(sv.slug ?? ''))}): ${sv.excerpt ?? ''}`.trim())
  out.push('', '## Families we serve')
  out.push(`- [Day care center in Vineland, NJ](${abs(site, '/')})`)
  for (const c of data.cities) out.push(`- [${c.title}](${abs(site, routes.serviceArea(c.slug ?? ''))}): ${c.excerpt ?? ''}`.trim())
  out.push('', '## About us')
  for (const p of data.pages) {
    if (p.slug === 'tour') continue
    out.push(`- [${p.title}](${abs(site, routes.page(p.slug ?? ''))})${p.description ? `: ${p.description}` : ''}`)
  }
  out.push('', '## Optional', `- [Full text: programs and FAQ answers](${abs(site, '/llms-full.txt')})`, '')
  return out.join('\n')
}

/** /llms-full.txt: plain-text program summaries and FAQ answers. */
export function buildLlmsFullTxt(data: Data, site: URL) {
  const s = data.settings
  const out: string[] = [`# ${s?.siteName ?? 'Uriah Child Care'}: programs and answers`, '']
  if (s?.gbpDescription) out.push(s.gbpDescription.replace(/\s+/g, ' ').trim(), '')
  out.push('## Facts', ...facts(data), '')
  const section = (title: string, slug: string | null, path: (s: string) => string, intro?: string | null, extra?: (string | null | undefined)[], faqs?: { question: string | null; answer: string | null }[] | null) => {
    out.push(`## ${title}`, `URL: ${abs(site, path(slug ?? ''))}`)
    for (const e of extra ?? []) if (e) out.push(e)
    if (intro) out.push('', intro)
    for (const f of faqs ?? []) if (f.question && f.answer) out.push('', `Q: ${f.question}`, `A: ${f.answer}`)
    out.push('')
  }
  for (const c of data.categories) {
    section(c.title ?? '', c.slug, routes.category, c.intro, [line('Ages', c.ageRange), line('Days and times', c.schedule)], c.faqs)
    for (const sv of c.services) section(sv.title ?? '', sv.slug, routes.service, sv.intro, [line('Ages', sv.ageRange), line('Days and times', sv.schedule)], sv.faqs)
  }
  for (const sv of data.homeServices) section(sv.title ?? '', sv.slug, routes.service, sv.intro, [], sv.faqs)
  for (const c of data.cities) section(c.title ?? '', c.slug, routes.serviceArea, c.intro)
  if (data.faqs.length) {
    out.push('## Questions parents ask', `URL: ${abs(site, '/faq/')}`)
    for (const f of data.faqs) out.push('', `Q: ${f.question}`, `A: ${f.answer}`)
    out.push('')
  }
  return out.join('\n')
}
