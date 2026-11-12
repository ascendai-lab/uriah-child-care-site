import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons/Document'
import { pageBuilderField } from '../objects/blocks'
import { pageGroups, randomKey, seoField, slugField, titleField } from '../shared'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: pageGroups,
  // New pages start with a hero and a text section, ready to fill in.
  initialValue: () => ({
    pageBuilder: [
      { _type: 'hero', _key: randomKey(), layout: 'centered', background: 'muted' },
      { _type: 'textBlock', _key: randomKey(), width: 'narrow', background: 'default' },
    ],
  }),
  fields: [
    titleField('Page title'),
    pageBuilderField('content'),
    slugField(),
    defineField({
      name: 'showInFooter',
      title: 'List in footer',
      type: 'boolean',
      description: 'Adds this page to the footer links (handy for Privacy Policy, Terms, etc.).',
      group: 'settings',
      initialValue: false,
    }),
    defineField({
      name: 'hideTourBlock',
      title: 'Hide the "Book a tour" section at the bottom',
      type: 'boolean',
      description: 'Turn on for pages where a tour form does not fit, like the Privacy Policy or Terms.',
      group: 'settings',
      initialValue: false,
    }),
    seoField,
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare({ title, slug }) {
      return { title, subtitle: slug ? `/${slug}` : 'No URL yet' }
    },
  },
})
