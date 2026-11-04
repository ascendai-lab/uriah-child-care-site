import { defineField, defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons/Package'
import { blockPreview, headingField, introField, sectionGroups, sectionSettingsFields } from './shared'

export const servicesBlock = defineType({
  name: 'servicesBlock',
  title: 'Program cards',
  type: 'object',
  icon: PackageIcon,
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
          { title: 'All program hubs (categories)', value: 'all' },
          { title: 'Only the ones I pick', value: 'selected' },
        ],
      },
    }),
    defineField({
      name: 'services',
      title: 'Pick items',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'category' }, { type: 'service' }] }],
      hidden: ({ parent }) => parent?.mode !== 'selected',
    }),
    ...sectionSettingsFields,
  ],
  preview: blockPreview('Program cards'),
})
