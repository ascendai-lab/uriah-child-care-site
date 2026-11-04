import { defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons/Link'
import { linkableTypes } from '../../routes'

/**
 * A link editors pick instead of typing URLs.
 * Internal links reference a document, so they never break when a slug changes.
 */
export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'linkType',
      title: 'Link to',
      type: 'string',
      initialValue: 'internal',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Page on this site', value: 'internal' },
          { title: 'Web address', value: 'external' },
          { title: 'Email', value: 'email' },
          { title: 'Phone', value: 'phone' },
        ],
      },
    }),
    defineField({
      name: 'internal',
      title: 'Page',
      type: 'reference',
      to: linkableTypes.map((type) => ({ type })),
      hidden: ({ parent }) => parent?.linkType !== 'internal',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined
          return parent?.linkType === 'internal' && !value ? 'Pick a page' : true
        }),
    }),
    defineField({
      name: 'anchor',
      title: 'Jump to section (optional)',
      type: 'string',
      description: 'The "Section ID" of a block on that page, e.g. "pricing".',
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'external',
      title: 'Web address',
      type: 'url',
      description: 'Full address, e.g. https://example.com, or a path like /contact.',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (Rule) =>
        Rule.uri({ allowRelative: true, scheme: ['http', 'https'] }).custom((value, context) => {
          const parent = context.parent as { linkType?: string } | undefined
          return parent?.linkType === 'external' && !value ? 'Add a web address' : true
        }),
    }),
    defineField({
      name: 'email',
      title: 'Email address',
      type: 'email',
      hidden: ({ parent }) => parent?.linkType !== 'email',
    }),
    defineField({
      name: 'phone',
      title: 'Phone number',
      type: 'string',
      description: 'e.g. (856) 555-0100',
      hidden: ({ parent }) => parent?.linkType !== 'phone',
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in a new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
