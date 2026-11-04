import { defineField, defineType } from 'sanity'
import { SearchIcon } from '@sanity/icons/Search'

export const seoFields = defineType({
  name: 'seoFields',
  title: 'SEO',
  type: 'object',
  icon: SearchIcon,
  options: { collapsible: false },
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description: 'The blue link in Google. Falls back to the page title. Aim for 50–60 characters.',
      validation: (Rule) => Rule.max(60).warning('Over 60 characters may be cut off in search results'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'The summary under the link in Google. Aim for 140–160 characters.',
      validation: (Rule) => Rule.max(160).warning('Over 160 characters may be cut off'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      type: 'imageWithAlt',
      description: 'Shown when the page is shared on Facebook, LinkedIn, texts, etc. 1200×630px works best.',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL (advanced)',
      type: 'url',
      description: 'Only set this if the same content lives at another address that should rank instead.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      description: 'Keeps this page out of Google and the sitemap.',
      initialValue: false,
    }),
  ],
})
