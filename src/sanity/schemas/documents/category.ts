import { defineField, defineType } from 'sanity'
import { FolderIcon } from '@sanity/icons/Folder'
import { pageBuilderField } from '../objects/blocks'
import { corePageFields, corePageGroups, orderByDisplayOrder } from '../shared'

/**
 * A program hub that mirrors one GBP secondary category
 * (Preschool, After school program, Child care agency → shift care).
 * Its services point back to it, and the page lists them as editorial links.
 */
export const category = defineType({
  name: 'category',
  title: 'Program hub (GBP category)',
  type: 'document',
  icon: FolderIcon,
  groups: corePageGroups,
  orderings: [orderByDisplayOrder],
  fields: [
    ...corePageFields(),
    defineField({
      name: 'homeHeading',
      title: 'H2 on the home page',
      type: 'string',
      group: 'gbp',
      description: 'The secondary category as a home page H2, e.g. "Preschool in Vineland".',
    }),
    pageBuilderField('content'),
  ],
  preview: {
    select: { title: 'title', subtitle: 'gbpName', media: 'image' },
  },
})
