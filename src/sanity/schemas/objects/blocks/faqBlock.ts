import { defineField, defineType } from 'sanity'
import { HelpCircleIcon } from '@sanity/icons/HelpCircle'
import { blockPreview, buttonsField, headingField, introField, sectionGroups, sectionSettingsFields } from './shared'

export const faqBlock = defineType({
  name: 'faqBlock',
  title: 'FAQs',
  type: 'object',
  icon: HelpCircleIcon,
  groups: sectionGroups,
  fields: [
    headingField(),
    introField,
    buttonsField,
    defineField({
      name: 'mode',
      title: 'What to show',
      type: 'string',
      group: 'content',
      initialValue: 'all',
      options: {
        layout: 'radio',
        list: [
          { title: 'All (in display order)', value: 'all' },
          { title: 'Only the ones I pick', value: 'selected' },
        ],
      },
    }),
    defineField({
      name: 'faqs',
      title: 'Pick items',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'faq' }] }],
      hidden: ({ parent }) => parent?.mode !== 'selected',
    }),
    ...sectionSettingsFields,
  ],
  preview: blockPreview('FAQs'),
})
