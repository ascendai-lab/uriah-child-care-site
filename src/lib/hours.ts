import { stegaClean } from '@sanity/client/stega'

export interface HoursRow {
  days?: string[] | null
  open24Hours?: boolean | null
  opens?: string | null
  closes?: string | null
}

function to12h(value: string | null | undefined) {
  if (!value) return ''
  const [h, m] = stegaClean(value).split(':').map(Number)
  if (Number.isNaN(h)) return value
  const suffix = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 || 12
  return m ? `${hour}:${String(m).padStart(2, '0')}${suffix}` : `${hour}${suffix}`
}

/** "Monday, Tuesday: 6am – 6pm" */
export function formatHours(row: HoursRow) {
  const days = (row.days ?? []).map((d) => stegaClean(d).slice(0, 3)).join(', ')
  const time = row.open24Hours ? 'Open 24 hours' : `${to12h(row.opens)} – ${to12h(row.closes)}`
  return days ? `${days}: ${time}` : time
}

/** schema.org openingHoursSpecification for LocalBusiness JSON-LD. */
export function toOpeningHoursSpec(rows: HoursRow[] | null | undefined) {
  return (rows ?? []).map((row) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: (row.days ?? []).map((d) => `https://schema.org/${stegaClean(d)}`),
    opens: row.open24Hours ? '00:00' : stegaClean(row.opens ?? undefined),
    closes: row.open24Hours ? '23:59' : stegaClean(row.closes ?? undefined),
  }))
}
