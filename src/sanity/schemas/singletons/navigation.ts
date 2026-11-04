import { defineArrayMember, defineField, defineType } from 'sanity'
import { MenuIcon } from '@sanity/icons/Menu'

const navItem = defineArrayMember({
  type: 'object',
  name: 'navItem',
  title: 'Menu item',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'link', title: 'Link', type: 'link' }),
    defineField({
      name: 'children',
      title: 'Dropdown items (optional)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navChild',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'link', title: 'Link', type: 'link', validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { title: 'label' } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'label', children: 'children' },
    prepare({ title, children }) {
      const count = Array.isArray(children) ? children.length : 0
      return { title, subtitle: count ? `${count} dropdown items` : undefined }
    },
  },
})

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  groups: [
    { name: 'header', title: 'Header', default: true },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    defineField({ name: 'headerLinks', title: 'Main menu', type: 'array', of: [navItem], group: 'header' }),
    defineField({
      name: 'headerCta',
      title: 'Header button',
      type: 'ctaButton',
      description: 'The highlighted button in the menu, e.g. "Book a tour".',
      group: 'header',
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer link columns',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerColumn',
          fields: [
            defineField({ name: 'heading', title: 'Column heading', type: 'string' }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'footerLink',
                  fields: [
                    defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
                    defineField({ name: 'link', title: 'Link', type: 'link', validation: (Rule) => Rule.required() }),
                  ],
                  preview: { select: { title: 'label' } },
                }),
              ],
            }),
          ],
          preview: { select: { title: 'heading' } },
        }),
      ],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Navigation' }
    },
  },
})
