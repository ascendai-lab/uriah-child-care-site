import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons/Users'
import { blockPreview, headingField, introField, sectionGroups, sectionSettingsFields } from './shared'

export const teamBlock = defineType({
  name: 'teamBlock',
  title: 'Team',
  type: 'object',
  icon: UsersIcon,
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
      name: 'members',
      title: 'Pick items',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
      hidden: ({ parent }) => parent?.mode !== 'selected',
    }),
    ...sectionSettingsFields,
  ],
  preview: blockPreview('Team'),
})
