import { defineField, defineType } from 'sanity'
import { BulbOutlineIcon } from '@sanity/icons/BulbOutline'
import { blockPreview, buttonsField, headingField, sectionGroups, sectionSettingsFields } from './shared'

export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'Call to action',
  type: 'object',
  icon: BulbOutlineIcon,
  groups: sectionGroups,
  fields: [
    headingField(true),
    defineField({ name: 'body', title: 'Text', type: 'text', rows: 3, group: 'content' }),
    buttonsField,
    ...sectionSettingsFields.map((field) =>
      field.name === 'background' ? { ...field, initialValue: 'sage' } : field,
    ),
  ],
  preview: blockPreview('Call to action'),
})
