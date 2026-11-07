import { defineField, defineType } from 'sanity'
import { BellIcon } from '@sanity/icons/Bell'

/** The thin bar at the top of every page, e.g. holiday closures or "Now enrolling". */
export const announcementBar = defineType({
  name: 'announcementBar',
  title: 'Announcement bar',
  type: 'document',
  icon: BellIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Show announcement bar',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({ name: 'text', title: 'Text', type: 'string' }),
    defineField({ name: 'link', title: 'Link (optional)', type: 'link' }),
  ],
  preview: {
    prepare() {
      return { title: 'Announcement bar' }
    },
  },
})
