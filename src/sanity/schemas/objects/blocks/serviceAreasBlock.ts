import { defineField, defineType } from 'sanity'
import { PinIcon } from '@sanity/icons/Pin'
import { blockPreview, headingField, introField, sectionGroups, sectionSettingsFields } from './shared'

export const serviceAreasBlock = defineType({
  name: 'serviceAreasBlock',
  title: 'Areas we serve',
  type: 'object',
  icon: PinIcon,
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
      name: 'areas',
      title: 'Pick items',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'serviceArea' }] }],
      hidden: ({ parent }) => parent?.mode !== 'selected',
    }),
    ...sectionSettingsFields,
  ],
  preview: blockPreview('Areas we serve'),
})
