import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons/Image'

/** Logo, tab icon, footer text and social profiles. */
export const brandSettings = defineType({
  name: 'brandSettings',
  title: 'Logo, footer & social',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'imageWithAlt',
      description: 'SVG or PNG.',
    }),
    defineField({
      name: 'logoInverse',
      title: 'Logo for dark backgrounds (optional)',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'favicon',
      title: 'Browser tab icon',
      type: 'image',
      description: 'Square PNG, at least 512×512px.',
    }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({
      name: 'footerText',
      title: 'Footer blurb',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'copyrightName',
      title: 'Copyright name',
      type: 'string',
      description: 'Defaults to the business name.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social profiles',
      type: 'array',
      of: [{ type: 'socialLink' }],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Logo, footer & social' }
    },
  },
})
