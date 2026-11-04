import { defineField, defineType } from 'sanity'
import { CommentIcon } from '@sanity/icons/Comment'
import { orderByDisplayOrder } from '../shared'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  orderings: [orderByDisplayOrder],
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'context',
      title: 'Who they are',
      type: 'string',
      description: 'e.g. "Parent of two, Millville"',
    }),
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 5, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'rating',
      title: 'Star rating',
      type: 'number',
      options: { list: [5, 4, 3, 2, 1], layout: 'radio', direction: 'horizontal' },
    }),
    defineField({
      name: 'source',
      title: 'Where the review is from',
      type: 'string',
      options: { list: ['Google', 'Facebook', 'Yelp', 'Email', 'In person'] },
    }),
    defineField({
      name: 'reviewUrl',
      title: 'Link to the original review',
      type: 'url',
      description: 'Review cards link to the original Google review.',
    }),
    defineField({ name: 'date', title: 'Review date', type: 'date' }),
    defineField({
      name: 'firstParty',
      title: 'Counts toward the star rating on the site',
      type: 'boolean',
      description: 'Only real reviews from families. Never reviews from staff or relatives (Google policy).',
      initialValue: true,
    }),
    defineField({ name: 'photo', title: 'Photo (optional)', type: 'imageWithAlt' }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'quote', media: 'photo' },
  },
})
