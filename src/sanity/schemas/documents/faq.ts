import { defineField, defineType } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons/HelpCircle'
import { orderByDisplayOrder } from '../shared'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  orderings: [orderByDisplayOrder],
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'richText', validation: (Rule) => Rule.required() }),
    defineField({ name: 'category', title: 'Category (optional)', type: 'string' }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  preview: { select: { title: 'question', subtitle: 'category' } },
})
