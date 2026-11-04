import { defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons/Star'
import { accentField, buttonsField, headingField, sectionGroups, sectionSettingsFields } from './shared'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: StarIcon,
  groups: sectionGroups,
  fields: [
    defineField({ name: 'eyebrow', title: 'Small text above heading', type: 'string', group: 'content' }),
    headingField(true),
    defineField({
      name: 'accentWord',
      title: 'Accent words',
      type: 'string',
      group: 'content',
      description: 'Words from the heading to show in coral, e.g. "Vineland, NJ". Must match the heading exactly.',
    }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 3, group: 'content' }),
    buttonsField,
    defineField({ name: 'image', title: 'Image', type: 'imageWithAlt', group: 'content' }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'content',
      initialValue: 'split',
      options: {
        layout: 'radio',
        list: [
          { title: 'Photo fading into a dark panel (home page)', value: 'photoFade' },
          { title: 'Rounded color card with photo', value: 'card' },
          { title: 'Text left, image right', value: 'split' },
          { title: 'Centered text', value: 'centered' },
          { title: 'Full background image', value: 'background' },
        ],
      },
    }),
    defineField({
      name: 'showRating',
      title: 'Show the Google rating badge',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),
    defineField({
      name: 'showPhone',
      title: 'Show the phone number next to the buttons',
      type: 'boolean',
      group: 'content',
      initialValue: true,
    }),
    accentField,
    ...sectionSettingsFields,
  ],
  preview: {
    select: { heading: 'heading', media: 'image' },
    prepare({ heading, media }) {
      return { title: heading || 'Hero', subtitle: 'Hero', media }
    },
  },
})
