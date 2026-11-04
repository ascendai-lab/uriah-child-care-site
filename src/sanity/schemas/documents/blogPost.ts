import { defineField, defineType } from 'sanity'
import { EditIcon } from '@sanity/icons/Edit'
import { pageGroups, seoField, slugField, titleField } from '../shared'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog post',
  type: 'document',
  icon: EditIcon,
  groups: pageGroups,
  orderings: [
    { title: 'Newest first', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  fields: [
    titleField(),
    defineField({
      name: 'excerpt',
      title: 'Summary',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Shown on the blog listing and used as the meta description if none is set.',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({ name: 'image', title: 'Featured image', type: 'imageWithAlt', group: 'content' }),
    defineField({ name: 'body', title: 'Post', type: 'richText', group: 'content' }),
    slugField('/blog'),
    defineField({
      name: 'publishedAt',
      title: 'Publish date',
      type: 'datetime',
      group: 'settings',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'teamMember' }],
      group: 'settings',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'settings',
    }),
    seoField,
  ],
  preview: {
    select: { title: 'title', date: 'publishedAt', media: 'image' },
    prepare({ title, date, media }) {
      return { title, subtitle: date ? new Date(date).toLocaleDateString() : 'Draft', media }
    },
  },
})
