import { defineArrayMember, defineField, defineType } from 'sanity'
import { MenuIcon } from '@sanity/icons/Menu'

/** Icons editors can pick for dropdown links (names from src/components/ui/Icon.astro). */
const menuIcons = [
  { title: 'Sparkle', value: 'sparkle' },
  { title: 'Sun (morning)', value: 'sun' },
  { title: 'Moon (evening)', value: 'moon' },
  { title: 'Clock', value: 'clock' },
  { title: 'Calendar', value: 'calendar' },
  { title: 'Book', value: 'book' },
  { title: 'School', value: 'school' },
  { title: 'Heart', value: 'heart' },
  { title: 'Shield', value: 'shield' },
  { title: 'Star', value: 'star' },
  { title: 'People', value: 'users' },
  { title: 'Home', value: 'home' },
  { title: 'Camera', value: 'camera' },
  { title: 'Message', value: 'message' },
  { title: 'Meals', value: 'utensils' },
  { title: 'Wallet', value: 'wallet' },
]

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
            defineField({
              name: 'description',
              title: 'Short description',
              type: 'string',
              description: 'One short line under the link in the desktop menu. Leave empty to use the page summary.',
              validation: (Rule) => Rule.max(80),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: { list: menuIcons },
              initialValue: 'sparkle',
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'description' } },
        }),
      ],
    }),
    defineField({
      name: 'menuPhoto',
      title: 'Photo in the dropdown',
      type: 'imageWithAlt',
      description: 'Shown on the right of the desktop dropdown. Leave empty to use the photo from the linked page.',
      hidden: ({ parent }) => !parent?.children?.length,
    }),
    defineField({
      name: 'menuNote',
      title: 'Text next to the photo',
      type: 'string',
      description: 'A short line above the "Book a tour" button in the dropdown.',
      validation: (Rule) => Rule.max(110),
      hidden: ({ parent }) => !parent?.children?.length,
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
