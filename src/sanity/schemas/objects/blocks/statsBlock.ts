import { defineArrayMember, defineField, defineType } from 'sanity'
import { BarChartIcon } from '@sanity/icons/BarChart'
import { blockPreview, headingField, sectionGroups, sectionSettingsFields } from './shared'

export const statsBlock = defineType({
  name: 'statsBlock',
  title: 'Stats / trust numbers',
  type: 'object',
  icon: BarChartIcon,
  groups: sectionGroups,
  fields: [
    headingField(),
    defineField({
      name: 'items',
      title: 'Stats',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'value', title: 'Number', type: 'string', description: 'e.g. 20+' }),
            defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g. Years caring for families' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
      validation: (Rule) => Rule.max(6),
    }),
    ...sectionSettingsFields,
  ],
  preview: blockPreview('Stats'),
})
