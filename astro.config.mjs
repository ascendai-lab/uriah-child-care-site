// @ts-check
import { defineConfig, envField } from 'astro/config'
import { loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import sanity from '@sanity/astro'
import react from '@astrojs/react'
import netlify from '@astrojs/netlify'

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '')

export default defineConfig({
  site: env.SITE_URL || 'http://localhost:4321',
  // SSR is required for visual editing and draft previews. Do NOT switch to static.
  output: 'server',
  adapter: netlify(),
  trailingSlash: 'ignore',

  // Server secrets are read when a request comes in, not baked into the build output.
  // (import.meta.env inlines values at build time, which Netlify's secret scan rightly blocks.)
  env: {
    schema: {
      SANITY_API_READ_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },

  integrations: [
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2026-10-01',
      useCdn: false, // always false — drafts and fresh content need the live API
      // Local preview only (npm run preview:seed): point the client at seed/mock-api.mjs instead of Sanity.
      ...(env.SANITY_API_HOST ? { apiHost: env.SANITY_API_HOST, useProjectHostname: false } : {}),
      studioBasePath: '/studio',
      stega: {
        // Overlays link back to the embedded Studio. Use the hosted Studio URL if you deploy it separately.
        studioUrl: env.SANITY_STUDIO_URL || '/studio',
      },
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
    // Sanity Studio v6 ships dependencies that use top-level await.
    optimizeDeps: { esbuildOptions: { target: 'esnext' } },
    build: {
      rollupOptions: {
        output: {
          // Keep Sanity Studio's stylesheets in their own chunk. Without this, Rollup merges them into
          // chunks the visual-editing island shares with the Studio, Astro links them on every public
          // page, and their global resets wipe out the site's spacing, buttons and fonts.
          // (sanity-ui.css is only scoped .u-* classes for the editing overlays, so it is harmless.)
          manualChunks: (id) => {
            if (!id.includes('.css')) return undefined
            if (id.includes('/node_modules/@sanity/ui/')) return 'sanity-ui'
            // Everything else from node_modules is the Studio's (the site's own CSS lives in src/).
            if (id.includes('/node_modules/')) return 'sanity-studio'
            return undefined
          },
        },
      },
    },
  },
})
