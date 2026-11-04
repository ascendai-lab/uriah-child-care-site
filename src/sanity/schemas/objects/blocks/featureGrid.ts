import { defineArrayMember, defineField, defineType } from 'sanity'
import { ThLargeIcon } from '@sanity/icons/ThLarge'
import { blockPreview, buttonsField, headingField, imageShapeField, introField, sectionGroups, sectionSettingsFields } from './shared'

export const featureGrid = defineType({
  name: 'featureGrid',
  title: 'Feature cards',
  type: 'object',
  icon: ThLargeIcon,
  groups: sectionGroups,
  fields: [
    headingField(),
    introField,
    buttonsField,
    defineField({
      name: 'items',
      title: 'Cards',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'feature',
          fields: [
            defineField({ name: 'image', title: 'Icon or image', type: 'imageWithAlt' }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'link', title: 'Link (optional)', type: 'link' }),
          ],
          preview: { select: { title: 'title', subtitle: 'description', media: 'image' } },
        }),
      ],
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      group: 'content',
      initialValue: 'cards',
      options: {
        layout: 'radio',
        list: [
          { title: 'Colorful cards', value: 'cards' },
          { title: 'Checklist next to a photo ("Why families choose us")', value: 'checklist' },
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Photo (checklist style)',
      type: 'imageWithAlt',
      group: 'content',
      hidden: ({ parent }) => parent?.style !== 'checklist',
    }),
    imageShapeField,
    defineField({
      name: 'columns',
      title: 'Cards per row',
      type: 'number',
      group: 'settings',
      initialValue: 3,
      options: { list: [2, 3, 4], layout: 'radio', direction: 'horizontal' },
    }),
    ...sectionSettingsFields,
  ],
  preview: blockPreview('Feature cards'),
})
