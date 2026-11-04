import { defineField, defineType } from 'sanity'
import { DocumentsIcon } from '@sanity/icons/Documents'
import { blockPreview, headingField, introField, sectionGroups, sectionSettingsFields } from './shared'

export const latestPostsBlock = defineType({
  name: 'latestPostsBlock',
  title: 'Latest blog posts',
  type: 'object',
  icon: DocumentsIcon,
  groups: sectionGroups,
  fields: [
    headingField(),
    introField,
    defineField({
      name: 'count',
      title: 'How many posts',
      type: 'number',
      group: 'content',
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(12).integer(),
    }),
    ...sectionSettingsFields,
  ],
  preview: blockPreview('Latest blog posts'),
})
