import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons/User'
import { orderByDisplayOrder } from '../shared'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team member',
  type: 'document',
  icon: UserIcon,
  orderings: [orderByDisplayOrder],
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'role', title: 'Role / title', type: 'string' }),
    defineField({ name: 'photo', title: 'Photo', type: 'imageWithAlt' }),
    defineField({ name: 'bio', title: 'Short bio', type: 'text', rows: 4 }),
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. "Pediatric First Aid and CPR/AED certified"',
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
})
