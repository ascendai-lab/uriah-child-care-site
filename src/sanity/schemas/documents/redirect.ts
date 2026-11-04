import { defineField, defineType } from 'sanity'
import { TransferIcon } from '@sanity/icons/Transfer'

/** Send old URLs (e.g. from the previous WordPress site) to their new home. */
export const redirect = defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  icon: TransferIcon,
  fields: [
    defineField({
      name: 'source',
      title: 'Old path',
      type: 'string',
      description: 'Starts with a slash, e.g. /daycare-vineland-nj/',
      validation: (Rule) =>
        Rule.required().custom((value) => (value?.startsWith('/') ? true : 'Must start with /')),
    }),
    defineField({
      name: 'destination',
      title: 'Send visitors to',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent (301)',
      type: 'boolean',
      description: 'Leave on unless the move is temporary.',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'source', permanent: 'permanent' },
    prepare({ title, permanent }) {
      return { title, subtitle: permanent ? '301 permanent' : '302 temporary' }
    },
  },
})
