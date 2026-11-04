/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly SITE_URL?: string
  readonly PUBLIC_SANITY_PROJECT_ID: string
  readonly PUBLIC_SANITY_DATASET?: string
  readonly PUBLIC_SANITY_PREVIEW_ORIGIN?: string
  readonly SANITY_API_READ_TOKEN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace App {
  interface Locals {
    /** True when an editor is previewing drafts through Sanity's Presentation tool. */
    draftMode: boolean
  }
}
