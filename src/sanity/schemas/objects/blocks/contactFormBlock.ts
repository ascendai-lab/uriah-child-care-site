import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons/Envelope'
import { blockPreview, headingField, introField, sectionGroups, sectionSettingsFields } from './shared'

export const contactFormBlock = defineType({
  name: 'contactFormBlock',
  title: 'Book a tour form',
  type: 'object',
  icon: EnvelopeIcon,
  groups: sectionGroups,
  fields: [
    headingField(),
    introField,
    defineField({
      name: 'successMessage',
      title: 'Message after sending',
      type: 'string',
      group: 'content',
      initialValue: 'Thank you. Ms. Paulette will call you within one business day to pick a time.',
    }),
    defineField({
      name: 'showContactDetails',
      title: 'Show phone, email, address and hours next to the form',
      type: 'boolean',
      group: 'content',
      initialValue: true,
    }),
    ...sectionSettingsFields,
  ],
  preview: blockPreview('Book a tour form'),
})
