import { getSecret } from 'astro:env/server'
/**
 * Draft mode = "show unpublished changes + visual editing overlays".
 * The Presentation tool turns it on through /api/draft-mode/enable, which sets
 * a cookie whose value is derived from the read token, so it cannot be forged.
 */
export const DRAFT_MODE_COOKIE = 'sanity-draft-mode'

export async function draftModeCookieValue(): Promise<string | null> {
  const token = getSecret('SANITY_API_READ_TOKEN')
  if (!token) return null
  const bytes = new TextEncoder().encode(`sanity-draft-mode:${token}`)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('')
}

export async function isValidDraftModeCookie(value: string | undefined): Promise<boolean> {
  if (!value) return false
  const expected = await draftModeCookieValue()
  return expected !== null && value === expected
}
