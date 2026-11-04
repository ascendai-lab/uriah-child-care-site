import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons/Home'
import { pageBuilderField } from '../objects/blocks'
import { seoField } from '../shared'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO & sharing' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      group: 'content',
      initialValue: 'Home',
      readOnly: true,
      hidden: true,
    }),
    pageBuilderField('content'),
    seoField,
  ],
  preview: {
    prepare() {
      return { title: 'Home page', subtitle: '/' }
    },
  },
})
