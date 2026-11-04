import { defineCliConfig } from 'sanity/cli'

/** Used by the Sanity CLI (`npm run typegen`, `sanity deploy`). Reads the same .env as Astro. */
export default defineCliConfig({
  api: {
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.PUBLIC_SANITY_DATASET ?? process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
  typegen: {
    path: './src/**/*.{ts,tsx}',
    schema: './src/sanity/schema.json',
    generates: './src/sanity/types.ts',
    overloadClientMethods: true,
  },
})
