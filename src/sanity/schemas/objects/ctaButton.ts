import { defineField, defineType } from 'sanity'
import { LaunchIcon } from '@sanity/icons/Launch'

export const ctaButton = defineType({
  name: 'ctaButton',
  title: 'Button',
  type: 'object',
  icon: LaunchIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Button text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Style',
      type: 'string',
      initialValue: 'primary',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Text link', value: 'ghost' },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'label', variant: 'variant' },
    prepare({ title, variant }) {
      return { title: title ?? 'Button', subtitle: variant }
    },
  },
})
