import { defineField, defineType } from 'sanity'
import { PinIcon } from '@sanity/icons/Pin'
import { blockPreview, headingField, introField, sectionGroups, sectionSettingsFields } from './shared'

/** The embedded Google Business Profile map with the exact name, address, phone and hours. */
export const mapBlock = defineType({
  name: 'mapBlock',
  title: 'Map + address (from Site settings)',
  type: 'object',
  icon: PinIcon,
  groups: sectionGroups,
  fields: [
    headingField(),
    introField,
    defineField({
      name: 'notes',
      title: 'Parking and arrival notes',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    ...sectionSettingsFields,
  ],
  preview: blockPreview('Map + address'),
})
