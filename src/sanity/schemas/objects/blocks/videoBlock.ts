import { defineField, defineType } from 'sanity'
import { PlayIcon } from '@sanity/icons/Play'
import { blockPreview, headingField, introField, sectionGroups, sectionSettingsFields } from './shared'

export const videoBlock = defineType({
  name: 'videoBlock',
  title: 'Video',
  type: 'object',
  icon: PlayIcon,
  groups: sectionGroups,
  fields: [
    headingField(),
    introField,
    defineField({
      name: 'video',
      title: 'Video',
      type: 'videoEmbed',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    ...sectionSettingsFields,
  ],
  preview: blockPreview('Video'),
})
