import { stegaClean } from '@sanity/client/stega'

export function formatDate(value: string | null | undefined) {
  if (!value) return ''
  const raw = stegaClean(value)
  // Date-only values ("2026-11-04") are read at noon UTC so they never slip a day in US time zones.
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(raw) ? `${raw}T12:00:00Z` : raw)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/New_York' })
}

/** "%s | Brand" + "About" → "About | Brand" */
export function applyTitleTemplate(template: string | null | undefined, title: string) {
  const clean = stegaClean(template)
  if (!clean || !clean.includes('%s')) return title
  // A title that already carries the brand (e.g. the home page's "… | Uriah Child Care") is used as is.
  const brand = clean.replace('%s', '').replace(/^[\s|–-]+|[\s|–-]+$/g, '')
  return brand && title.includes(brand) ? title : clean.replace('%s', title)
}
