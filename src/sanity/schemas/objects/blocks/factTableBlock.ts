import { defineArrayMember, defineField, defineType } from 'sanity'
import { ThListIcon } from '@sanity/icons/ThList'
import { blockPreview, headingField, introField, sectionGroups, sectionSettingsFields } from './shared'

/**
 * A small visible fact table (address, hours, ages, programs, subsidy, license, founded, owner).
 * The standard rows come from Site settings so they always match the schema and the GBP.
 */
export const factTableBlock = defineType({
  name: 'factTableBlock',
  title: 'Fact table (from Site settings)',
  type: 'object',
  icon: ThListIcon,
  groups: sectionGroups,
  fields: [
    headingField(),
    introField,
    defineField({
      name: 'extraRows',
      title: 'Extra rows (optional)',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'factRow',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        }),
      ],
    }),
    ...sectionSettingsFields,
  ],
  preview: blockPreview('Fact table'),
})
