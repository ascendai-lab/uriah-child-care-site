import { defineField, defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons/Package'
import { pageBuilderField } from '../objects/blocks'
import { corePageFields, corePageGroups, orderByDisplayOrder } from '../shared'

/** One page per GBP service, targeting "service + Vineland". */
export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: PackageIcon,
  groups: corePageGroups,
  orderings: [orderByDisplayOrder],
  fields: [
    defineField({
      name: 'category',
      title: 'Program hub',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'content',
      description: 'Leave empty for services that sit directly under the home page (toddler care, CCAP, meals, safety).',
    }),
    ...corePageFields(),
    pageBuilderField('content'),
  ],
  preview: {
    select: { title: 'title', category: 'category.shortTitle', confirm: 'needsConfirmation', media: 'image' },
    prepare({ title, category, confirm, media }) {
      return {
        title,
        subtitle: [category ?? 'Home-level service', confirm ? 'waiting for confirmation' : null].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
