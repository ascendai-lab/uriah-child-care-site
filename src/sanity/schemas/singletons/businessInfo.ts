import { defineField, defineType } from 'sanity'
import { PinIcon } from '@sanity/icons/Pin'

/** Name, contact details and hours. Shown in the header, footer, contact sections and Google data. */
export const businessInfo = defineType({
  name: 'businessInfo',
  title: 'Business info & hours',
  type: 'document',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Business name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'email' }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      options: { columns: 2 },
      fields: [
        defineField({ name: 'street', title: 'Street', type: 'string' }),
        defineField({ name: 'city', title: 'City', type: 'string' }),
        defineField({ name: 'state', title: 'State', type: 'string' }),
        defineField({ name: 'zip', title: 'ZIP', type: 'string' }),
      ],
    }),
    defineField({
      name: 'mapUrl',
      title: 'Google Maps link',
      type: 'url',
    }),
    defineField({
      name: 'hoursSummary',
      title: 'Hours in words',
      type: 'string',
      description: 'Exactly as on the GBP, e.g. "Monday to Saturday, 6 am to 11 pm".',
    }),
    defineField({
      name: 'hours',
      title: 'Opening hours',
      type: 'array',
      of: [{ type: 'openingHours' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Business info & hours' }
    },
  },
})
