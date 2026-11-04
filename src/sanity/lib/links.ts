import { stegaClean } from '@sanity/client/stega'
import { hrefFor } from '../routes'

export interface LinkValue {
  linkType?: string | null
  external?: string | null
  email?: string | null
  phone?: string | null
  anchor?: string | null
  openInNewTab?: boolean | null
  internal?: { _type: string; slug?: string | null } | null
}

export interface ResolvedLink {
  href: string
  target?: '_blank'
  rel?: string
}

/** Turn a CMS `link` object into an href. Returns null when the link is incomplete. */
export function resolveLink(link: LinkValue | null | undefined): ResolvedLink | null {
  if (!link) return null
  const value = stegaClean(link)
  let href: string | null = null

  switch (value.linkType) {
    case 'external':
      href = value.external ?? null
      break
    case 'email':
      href = value.email ? `mailto:${value.email}` : null
      break
    case 'phone':
      href = value.phone ? `tel:${value.phone.replace(/[^\d+]/g, '')}` : null
      break
    default: {
      const base = value.internal ? hrefFor(value.internal._type, value.internal.slug) : null
      const anchor = value.anchor?.replace(/^#/, '')
      href = base ? `${base}${anchor ? `#${anchor}` : ''}` : anchor ? `#${anchor}` : null
    }
  }

  if (!href) return null
  return value.openInNewTab ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href }
}

export function telHref(phone: string | null | undefined) {
  return phone ? `tel:${stegaClean(phone).replace(/[^\d+]/g, '')}` : undefined
}
