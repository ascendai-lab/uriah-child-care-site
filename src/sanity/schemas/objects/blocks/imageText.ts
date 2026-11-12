import { defineField, defineType } from 'sanity'
import { SplitHorizontalIcon } from '@sanity/icons/SplitHorizontal'
import { accentField, buttonsField, headingField, imageShapeField, sectionGroups, sectionSettingsFields } from './shared'

export const imageText = defineType({
  name: 'imageText',
  title: 'Image + text',
  type: 'object',
  icon: SplitHorizontalIcon,
  groups: sectionGroups,
  fields: [
    // Eyebrows (small text above headings) are off site-wide (Mark, 2026-11-12); hidden so old values stay harmless.
    defineField({ name: 'eyebrow', title: 'Small text above heading', type: 'string', group: 'content', hidden: true }),
    headingField(),
    defineField({ name: 'body', title: 'Content', type: 'richText', group: 'content' }),
    buttonsField,
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image position',
      type: 'string',
      group: 'content',
      initialValue: 'right',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
      },
    }),
    defineField({
      name: 'showDoodles',
      title: 'Add playful doodles around the photo',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
    }),
    imageShapeField,
    accentField,
    ...sectionSettingsFields,
  ],
  preview: {
    select: { heading: 'heading', media: 'image' },
    prepare({ heading, media }) {
      return { title: heading || 'Image + text', subtitle: 'Image + text', media }
    },
  },
})
