/**
 * Sanity env values, readable from both runtimes:
 * - Astro / Vite exposes `PUBLIC_*` vars (site + embedded Studio at /studio)
 * - The Sanity CLI exposes `SANITY_STUDIO_*` vars (`sanity deploy`, typegen)
 */
const env = import.meta.env as Record<string, string | undefined>

export const projectId =
  env.PUBLIC_SANITY_PROJECT_ID ?? env.SANITY_STUDIO_PROJECT_ID ?? 'missing-project-id'

export const dataset = env.PUBLIC_SANITY_DATASET ?? env.SANITY_STUDIO_DATASET ?? 'production'

/** Bump this when you need newer GROQ / API features. */
export const apiVersion = '2026-10-01'

/** Where the embedded Studio lives. Must match `studioBasePath` in astro.config.mjs. */
export const studioBasePath = '/studio'

/**
 * Origin of the website for the Presentation tool.
 * Leave unset when Studio is embedded at /studio (same origin).
 * Set it when Studio is deployed separately, e.g. https://client.sanity.studio.
 */
export const previewOrigin = env.PUBLIC_SANITY_PREVIEW_ORIGIN ?? env.SANITY_STUDIO_PREVIEW_ORIGIN
