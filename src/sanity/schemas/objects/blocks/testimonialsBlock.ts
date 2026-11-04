import { defineField, defineType } from 'sanity'
import { CommentIcon } from '@sanity/icons/Comment'
import { blockPreview, headingField, introField, sectionGroups, sectionSettingsFields } from './shared'

export const testimonialsBlock = defineType({
  name: 'testimonialsBlock',
  title: 'Testimonials',
  type: 'object',
  icon: CommentIcon,
  groups: sectionGroups,
  fields: [
    headingField(),
    introField,
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
      name: 'testimonials',
      title: 'Pick items',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      hidden: ({ parent }) => parent?.mode !== 'selected',
    }),
    ...sectionSettingsFields,
  ],
  preview: blockPreview('Testimonials'),
})
