import { defineArrayMember, defineType } from 'sanity'

/**
 * The rich text (WYSIWYG) editor used everywhere on the site.
 * Headings, lists, bold/italic, links to pages/URLs/email/phone,
 * plus images, videos and buttons dropped in between paragraphs.
 */
export const richText = defineType({
  name: 'richText',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Heading 4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
        { title: 'Large text', value: 'lead' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
          { title: 'Highlight', value: 'highlight' },
        ],
        annotations: [{ name: 'link', type: 'link', title: 'Link' }],
      },
    }),
    defineArrayMember({ type: 'imageWithAlt' }),
    defineArrayMember({ type: 'videoEmbed' }),
    defineArrayMember({ type: 'ctaButton' }),
  ],
})
