import { defineField, defineType } from 'sanity'
import { PinIcon } from '@sanity/icons/Pin'
import { pageBuilderField } from '../objects/blocks'
import { corePageFields, corePageGroups, orderByDisplayOrder } from '../shared'

/**
 * City pages for the GBP service areas (Millville, Bridgeton).
 * Write each one around the real drive to the center and the schools families there use.
 * Never swap facts from one city to another.
 */
export const serviceArea = defineType({
  name: 'serviceArea',
  title: 'City page',
  type: 'document',
  icon: PinIcon,
  groups: corePageGroups,
  orderings: [orderByDisplayOrder],
  fields: [
    defineField({
      name: 'city',
      title: 'City / town',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'state', title: 'State', type: 'string', group: 'content', initialValue: 'NJ' }),
    defineField({
      name: 'driveTime',
      title: 'Drive to the center',
      type: 'string',
      group: 'content',
      description: 'e.g. "About 15 minutes up Route 47". Check it on a map before publishing.',
    }),
    ...corePageFields(),
    pageBuilderField('content'),
  ],
  preview: {
    select: { city: 'city', state: 'state', title: 'title', media: 'image' },
    prepare({ city, state, title, media }) {
      return { title: [city, state].filter(Boolean).join(', '), subtitle: title, media }
    },
  },
})
