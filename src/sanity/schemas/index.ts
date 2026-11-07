// Objects (reusable field types)
import { link } from './objects/link'
import { imageWithAlt } from './objects/imageWithAlt'
import { seoFields } from './objects/seoFields'
import { ctaButton } from './objects/ctaButton'
import { socialLink } from './objects/socialLink'
import { openingHours } from './objects/openingHours'
import { videoEmbed } from './objects/videoEmbed'
import { richText } from './objects/richText'
import { blockTypes } from './objects/blocks'

// Singletons
import { homePage } from './singletons/homePage'
import { navigation } from './singletons/navigation'
import { businessInfo } from './singletons/businessInfo'
import { announcementBar } from './singletons/announcementBar'
import { brandSettings } from './singletons/brandSettings'
import { seoSettings } from './singletons/seoSettings'

// Documents (repeatable)
import { page } from './documents/page'
import { category } from './documents/category'
import { service } from './documents/service'
import { serviceArea } from './documents/serviceArea'
import { blogPost } from './documents/blogPost'
import { teamMember } from './documents/teamMember'
import { testimonial } from './documents/testimonial'
import { faq } from './documents/faq'
import { redirect } from './documents/redirect'

export const singletonTypes = new Set(['homePage', 'navigation', 'businessInfo', 'announcementBar', 'brandSettings', 'seoSettings'])

export const schemaTypes = [
  link,
  imageWithAlt,
  seoFields,
  ctaButton,
  socialLink,
  openingHours,
  videoEmbed,
  richText,
  ...blockTypes,

  homePage,
  navigation,
  businessInfo,
  announcementBar,
  brandSettings,
  seoSettings,

  page,
  category,
  service,
  serviceArea,
  blogPost,
  teamMember,
  testimonial,
  faq,
  redirect,
]
