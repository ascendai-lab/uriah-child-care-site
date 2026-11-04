import type { SiteSettings } from '@cms/lib/types'

/**
 * The visible fact table rows (address, hours, ages, programs, subsidy, license, founded, owner).
 * Built from Site settings so the table, the schema and llms.txt always say the same thing.
 */
export function factRows(settings: SiteSettings | null | undefined): { label: string; value: string }[] {
  if (!settings) return []
  const a = settings.address
  const rows: [string, string | null | undefined][] = [
    ['Name', settings.siteName],
    ['Address', a?.street ? `${a.street}, ${a.city}, ${a.state} ${a.zip}` : null],
    ['Phone', settings.phone],
    ['Hours', settings.hoursSummary],
    ['Shifts', settings.shiftsLine],
    ['Ages', settings.agesServed],
    ['Programs', settings.programsLine],
    ['Subsidy', settings.subsidyStatement],
    ['Meals', settings.foodProgramStatement],
    ['License', settings.license?.summary],
    ['Caring for local children since', settings.foundingYear ? String(settings.foundingYear) : null],
    ['Owner', settings.ownerName],
    ['Families we serve', settings.serviceAreasLine],
  ]
  return rows.filter((r): r is [string, string] => Boolean(r[1])).map(([label, value]) => ({ label, value }))
}
