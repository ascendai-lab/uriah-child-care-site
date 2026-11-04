import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons/Image'

/**
 * Every image on the site goes through this type, so alt text is never forgotten.
 */
export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  icon: ImageIcon,
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description:
        'Describe the image for screen readers and Google, e.g. "Toddlers painting at a classroom table". Leave empty only if the image is purely decorative.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { asset?: unknown; decorative?: boolean } | undefined
          if (!parent?.asset || parent.decorative) return true
          return value ? true : 'Alt text is required (or mark the image as decorative)'
        }),
    }),
    defineField({
      name: 'decorative',
      title: 'Decorative image (no alt text needed)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'caption',
      title: 'Caption (optional)',
      type: 'string',
    }),
  ],
})
