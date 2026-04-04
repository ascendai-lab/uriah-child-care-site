// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sanity from '@sanity/astro'
import react from '@astrojs/react'
import netlify from '@astrojs/netlify'

export default defineConfig({
  site: import.meta.env.SITE_URL ?? 'http://localhost:4321',
  output: 'server',
  adapter: netlify(),

  integrations: [
    sanity({
      projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
      dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? 'production',
      useCdn: false,  // always false — we need live data for SSR + visual editing
      stega: {
        // Points back to the client's hosted Sanity Studio
        studioUrl: import.meta.env.SANITY_STUDIO_URL,
      },
    }),
    react(),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
})
