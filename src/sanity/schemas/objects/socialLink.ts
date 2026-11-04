import { defineField, defineType } from 'sanity'
import { ShareIcon } from '@sanity/icons/Share'

export const socialPlatforms = [
  { title: 'Facebook', value: 'facebook' },
  { title: 'Instagram', value: 'instagram' },
  { title: 'TikTok', value: 'tiktok' },
  { title: 'YouTube', value: 'youtube' },
  { title: 'LinkedIn', value: 'linkedin' },
  { title: 'X (Twitter)', value: 'x' },
  { title: 'Pinterest', value: 'pinterest' },
  { title: 'Google Business Profile', value: 'google' },
  { title: 'Yelp', value: 'yelp' },
  { title: 'Nextdoor', value: 'nextdoor' },
]

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social profile',
  type: 'object',
  icon: ShareIcon,
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: { list: socialPlatforms },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Profile URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { platform: 'platform', url: 'url' },
    prepare({ platform, url }) {
      const title = socialPlatforms.find((p) => p.value === platform)?.title ?? platform
      return { title, subtitle: url }
    },
  },
})
