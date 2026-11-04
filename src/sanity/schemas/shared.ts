import { defineArrayMember, defineField, type SlugIsUniqueValidator } from 'sanity'
import { rootTypes } from '../routes'

/** Standard field groups for anything that becomes a page on the site. */
export const pageGroups = [
  { name: 'content', title: 'Content', default: true },
  { name: 'seo', title: 'SEO & sharing' },
  { name: 'settings', title: 'Page settings' },
]

export const titleField = (title = 'Title') =>
  defineField({
    name: 'title',
    title,
    type: 'string',
    group: 'content',
    validation: (Rule) => Rule.required(),
  })

/**
 * Pages, categories, services and city pages all live at the root of the site,
 * so a slug must be unique across all of those types, not just its own.
 */
const isUniqueAcrossRootTypes: SlugIsUniqueValidator = async (slug, context) => {
  const { document, getClient } = context
  const id = document?._id.replace(/^drafts\./, '')
  const client = getClient({ apiVersion: '2026-10-01' })
  const count = await client.fetch<number>(
    `count(*[_type in $types && slug.current == $slug && !(_id in [$id, $draftId])])`,
    { types: [...rootTypes], slug, id, draftId: `drafts.${id}` },
  )
  return count === 0
}

export const slugField = (prefix = '') =>
  defineField({
    name: 'slug',
    title: 'URL',
    type: 'slug',
    group: 'settings',
    description: `Created from the title. Becomes ${prefix}/your-slug/. Changing it after launch breaks old links, so add a Redirect if you do.`,
    options: { source: 'title', maxLength: 96, isUnique: isUniqueAcrossRootTypes },
    validation: (Rule) => Rule.required(),
  })

export const seoField = defineField({
  name: 'seo',
  title: 'SEO & sharing',
  type: 'seoFields',
  group: 'seo',
})

export const orderField = defineField({
  name: 'order',
  title: 'Display order',
  type: 'number',
  description: 'Lower numbers show first.',
  group: 'settings',
})

export const orderByDisplayOrder = {
  title: 'Display order',
  name: 'displayOrder',
  by: [{ field: 'order', direction: 'asc' as const }],
}

/** Random key for arrays in initial values. */
export const randomKey = () => Math.random().toString(36).slice(2, 12)

/** Questions and answers shown on the page and sent to Google as FAQPage data. */
export const faqItemsField = (group = 'content') =>
  defineField({
    name: 'faqs',
    title: 'Questions parents ask (shown on the page)',
    description: 'Three to five People Also Ask questions. The answers must be visible on the page, and they are reused in GBP Q&A.',
    type: 'array',
    group,
    of: [
      defineArrayMember({
        type: 'object',
        name: 'faqItem',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: 'question', subtitle: 'answer' } },
      }),
    ],
  })

export const corePageGroups = [
  { name: 'content', title: 'Content', default: true },
  { name: 'proof', title: 'Reviews & FAQs' },
  { name: 'gbp', title: 'GBP match' },
  { name: 'seo', title: 'SEO & sharing' },
  { name: 'settings', title: 'Page settings' },
]

/**
 * Fields shared by the "Core 30" page types (categories, services and city pages).
 * They render through one template, so every page gets the same SEO structure:
 * an answer-first intro, quick facts, body copy with editorial links, reviews, FAQs and a tour block.
 */
export const corePageFields = (slugPrefix = '') => [
  defineField({
    name: 'title',
    title: 'Page heading (H1)',
    type: 'string',
    group: 'content',
    description: 'Includes the target keyword, e.g. "Pre-K in Vineland, NJ".',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'shortTitle',
    title: 'Short name',
    type: 'string',
    group: 'content',
    description: 'Used on cards, menus and breadcrumbs, e.g. "Pre-K".',
  }),
  defineField({
    name: 'intro',
    title: 'Answer-first intro',
    type: 'text',
    rows: 4,
    group: 'content',
    description: 'Two or three sentences that say who, what, where and for which ages. AI search engines quote this, so keep it plain and factual.',
    validation: (Rule) => Rule.required().max(420),
  }),
  defineField({
    name: 'excerpt',
    title: 'Card description',
    type: 'text',
    rows: 2,
    group: 'content',
    description: 'One sentence shown on program cards and in llms.txt.',
    validation: (Rule) => Rule.max(200),
  }),
  defineField({ name: 'image', title: 'Main photo', type: 'imageWithAlt', group: 'content' }),
  defineField({
    name: 'ageRange',
    title: 'Ages',
    type: 'string',
    group: 'content',
    description: 'e.g. "Ages 2.5–3". Uriah serves ages 2.5 and up.',
  }),
  defineField({
    name: 'schedule',
    title: 'Days and times',
    type: 'string',
    group: 'content',
    description: 'e.g. "Monday to Sunday, 6 am to 11 pm"',
  }),
  defineField({
    name: 'body',
    title: 'Page content',
    type: 'richText',
    group: 'content',
    description: 'Use H2s phrased as parent questions. Link to the category page, sibling services and /tour/ inside the copy.',
  }),
  defineField({
    name: 'highlights',
    title: 'What families get (checklist)',
    type: 'array',
    group: 'content',
    of: [{ type: 'string' }],
    validation: (Rule) => Rule.max(8),
  }),
  defineField({
    name: 'dayPlan',
    title: 'What the day looks like',
    type: 'array',
    group: 'content',
    of: [
      defineArrayMember({
        type: 'object',
        name: 'dayStep',
        fields: [
          defineField({ name: 'label', title: 'When', type: 'string', description: 'e.g. "Morning"' }),
          defineField({ name: 'activity', title: 'What happens', type: 'string' }),
        ],
        preview: { select: { title: 'label', subtitle: 'activity' } },
      }),
    ],
  }),
  defineField({
    name: 'reviews',
    title: 'Google reviews to quote',
    type: 'array',
    group: 'proof',
    description: 'Pick real reviews that mention this service.',
    of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
    validation: (Rule) => Rule.max(3),
  }),
  faqItemsField('proof'),
  defineField({
    name: 'related',
    title: 'Related pages (editorial links)',
    type: 'array',
    group: 'content',
    description: 'Sibling services and the CCAP page where it applies.',
    of: [{ type: 'reference', to: [{ type: 'category' }, { type: 'service' }, { type: 'page' }, { type: 'serviceArea' }] }],
    validation: (Rule) => Rule.max(4),
  }),
  defineField({
    name: 'keyword',
    title: 'Target keyword',
    type: 'string',
    group: 'gbp',
    description: 'One "service + Vineland" keyword per page. No two pages share a keyword.',
  }),
  defineField({
    name: 'gbpName',
    title: 'Name on the Google Business Profile',
    type: 'string',
    group: 'gbp',
    description: 'The GBP category or service this page mirrors, word for word.',
  }),
  defineField({
    name: 'needsConfirmation',
    title: 'Waiting for confirmation',
    type: 'boolean',
    group: 'gbp',
    description: 'On while Uriah has not confirmed it offers this service. Keeps the page out of search (noindex) and out of the sitemap and llms.txt.',
    initialValue: false,
  }),
  defineField({
    name: 'lastReviewed',
    title: 'Last updated (shown on the page)',
    type: 'date',
    group: 'settings',
  }),
  defineField({
    name: 'accent',
    title: 'Accent color',
    type: 'string',
    group: 'settings',
    initialValue: 'coral',
    options: { layout: 'radio', direction: 'horizontal', list: ['coral', 'sage', 'sunshine', 'sky'] },
  }),
  slugField(slugPrefix),
  orderField,
  seoField,
]
