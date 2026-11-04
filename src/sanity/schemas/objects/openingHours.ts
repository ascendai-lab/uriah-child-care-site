import { defineField, defineType } from 'sanity'
import { ClockIcon } from '@sanity/icons/Clock'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

/** One row of business hours. Used in Site Settings and for Google's LocalBusiness data. */
export const openingHours = defineType({
  name: 'openingHours',
  title: 'Opening hours',
  type: 'object',
  icon: ClockIcon,
  fields: [
    defineField({
      name: 'days',
      title: 'Days',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: days, layout: 'grid' },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'open24Hours',
      title: 'Open 24 hours',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'opens',
      title: 'Opens',
      type: 'string',
      description: '24-hour time, e.g. 06:30',
      hidden: ({ parent }) => Boolean(parent?.open24Hours),
      validation: (Rule) => Rule.regex(/^([01]\d|2[0-3]):[0-5]\d$/, { name: 'HH:MM' }),
    }),
    defineField({
      name: 'closes',
      title: 'Closes',
      type: 'string',
      description: '24-hour time, e.g. 18:00',
      hidden: ({ parent }) => Boolean(parent?.open24Hours),
      validation: (Rule) => Rule.regex(/^([01]\d|2[0-3]):[0-5]\d$/, { name: 'HH:MM' }),
    }),
  ],
  preview: {
    select: { days: 'days', opens: 'opens', closes: 'closes', allDay: 'open24Hours' },
    prepare({ days: d, opens, closes, allDay }) {
      return {
        title: Array.isArray(d) ? d.join(', ') : 'Hours',
        subtitle: allDay ? 'Open 24 hours' : `${opens ?? '?'} – ${closes ?? '?'}`,
      }
    },
  },
})
