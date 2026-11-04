import { defineField, defineType } from 'sanity'
import { TextIcon } from '@sanity/icons/Text'
import { blockPreview, headingField, sectionGroups, sectionSettingsFields } from './shared'

export const textBlock = defineType({
  name: 'textBlock',
  title: 'Text',
  type: 'object',
  icon: TextIcon,
  groups: sectionGroups,
  fields: [
    headingField(),
    defineField({ name: 'body', title: 'Content', type: 'richText', group: 'content' }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'string',
      group: 'settings',
      initialValue: 'narrow',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Readable (narrow)', value: 'narrow' },
          { title: 'Wide', value: 'wide' },
        ],
      },
    }),
    ...sectionSettingsFields,
  ],
  preview: blockPreview('Text'),
})
