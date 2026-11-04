import { getSecret } from 'astro:env/server'
import type { QueryParams } from '@sanity/client'
import { sanityClient } from 'sanity:client'

/** Fields that end up in classes, ids or attributes, so they must never carry stega characters. */
const noStegaFields = new Set([
  'anchorId',
  'background',
  'layout',
  'width',
  'imagePosition',
  'variant',
  'linkType',
  'platform',
  'columns',
  'businessType',
  'gaId',
  'gtmId',
  'metaPixelId',
  'googleSiteVerification',
  'titleTemplate',
  'metaTitle',
  'metaDescription',
  'canonicalUrl',
  'alt',
  'opens',
  'closes',
  'days',
])

/**
 * Fetch from Sanity. In draft mode (inside the Presentation tool) this returns
 * draft content with stega-encoded strings so the overlays know what to edit.
 */
export async function loadQuery<const Query extends string>(
  draftMode: boolean,
  query: Query,
  params: QueryParams = {},
) {
  if (!draftMode) {
    return sanityClient.fetch(query, params, { perspective: 'published', stega: false })
  }

  const token = getSecret('SANITY_API_READ_TOKEN')
  if (!token) {
    throw new Error('SANITY_API_READ_TOKEN is required for visual editing / draft mode.')
  }

  return sanityClient.fetch(query, params, {
    perspective: 'drafts',
    token,
    useCdn: false,
    resultSourceMap: 'withKeyArraySelector',
    stega: {
      enabled: true,
      filter: (props) => {
        const last = props.sourcePath.at(-1)
        if (typeof last === 'string' && noStegaFields.has(last)) return false
        return props.filterDefault(props)
      },
    },
  })
}
