import { stegaClean } from '@sanity/client/stega'

/** Card colors: the four logo colors plus lilac and peach, so a row of six cards never repeats a color. */
export const CARD_PALETTE = ['coral', 'sage', 'sunshine', 'sky', 'lilac', 'peach'] as const

/**
 * One accent per card in a row: keep each item's own accent unless an earlier card already uses it,
 * then take the next unused palette color. Colors only repeat once all six are used.
 */
export function rowAccents(items: { accent?: string | null }[], offset = 0): string[] {
  const used = new Set<string>()
  return items.map((item, i) => {
    if (used.size >= CARD_PALETTE.length) used.clear()
    const own = stegaClean(item.accent)
    let pick = own && (CARD_PALETTE as readonly string[]).includes(own) && !used.has(own) ? own : undefined
    for (let k = 0; !pick && k < CARD_PALETTE.length; k++) {
      const c = CARD_PALETTE[(i + offset + k) % CARD_PALETTE.length]
      if (!used.has(c)) pick = c
    }
    const accent = pick ?? CARD_PALETTE[(i + offset) % CARD_PALETTE.length]
    used.add(accent)
    return accent
  })
}
