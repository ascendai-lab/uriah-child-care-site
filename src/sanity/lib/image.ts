import { createImageUrlBuilder } from '@sanity/image-url'
import { dataset, projectId } from '../env'

/** PUBLIC_SANITY_IMAGE_BASE_URL is only set for the local seed preview (seed/mock-api.mjs). */
const baseUrl = (import.meta.env as Record<string, string | undefined>).PUBLIC_SANITY_IMAGE_BASE_URL
const builder = createImageUrlBuilder({ projectId, dataset, ...(baseUrl ? { baseUrl } : {}) })

export type ImageSource = Parameters<typeof builder.image>[0]

/** Build a Sanity CDN image URL. Respects the editor's crop + hotspot. */
export function urlFor(source: ImageSource) {
  return builder.image(source).auto('format').fit('max')
}
