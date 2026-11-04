import { defineField } from 'sanity'

/** Settings every page-builder section shares, kept in a collapsed "Section settings" group. */
export const sectionSettingsFields = [
  defineField({
    name: 'anchorId',
    title: 'Section ID',
    type: 'slug',
    description: 'Optional. Lets buttons and menus jump straight here, e.g. "pricing" → /page#pricing.',
    group: 'settings',
  }),
  defineField({
    name: 'background',
    title: 'Background',
    type: 'string',
    initialValue: 'default',
    group: 'settings',
    options: {
      layout: 'radio',
      list: [
        { title: 'Cream', value: 'default' },
        { title: 'White', value: 'white' },
        { title: 'Sky wash', value: 'sky' },
        { title: 'Sage wash', value: 'sage' },
        { title: 'Sunshine wash', value: 'sunshine' },
        { title: 'Coral wash', value: 'coral' },
        { title: 'Navy (dark)', value: 'dark' },
      ],
    },
  }),
]

export const sectionGroups = [
  { name: 'content', title: 'Content', default: true },
  { name: 'settings', title: 'Section settings' },
]

export const headingField = (required = false) =>
  defineField({
    name: 'heading',
    title: 'Heading',
    type: 'string',
    group: 'content',
    validation: required ? (Rule) => Rule.required() : undefined,
  })

export const introField = defineField({
  name: 'intro',
  title: 'Intro text',
  type: 'text',
  rows: 3,
  group: 'content',
})

export const buttonsField = defineField({
  name: 'buttons',
  title: 'Buttons',
  type: 'array',
  of: [{ type: 'ctaButton' }],
  group: 'content',
  validation: (Rule) => Rule.max(3),
})

export const blockPreview = (label: string) => ({
  select: { heading: 'heading' },
  prepare({ heading }: { heading?: string }) {
    return { title: heading || label, subtitle: label }
  },
})

/** Brand accent used for cards and shapes inside a section. */
export const accentField = defineField({
  name: 'accent',
  title: 'Accent color',
  type: 'string',
  group: 'settings',
  initialValue: 'coral',
  options: {
    layout: 'radio',
    direction: 'horizontal',
    list: [
      { title: 'Coral', value: 'coral' },
      { title: 'Sage', value: 'sage' },
      { title: 'Sunshine', value: 'sunshine' },
      { title: 'Sky', value: 'sky' },
    ],
  },
})

/** Playful photo masks borrowed from the design references. */
export const imageShapeField = defineField({
  name: 'imageShape',
  title: 'Photo shape',
  type: 'string',
  group: 'settings',
  initialValue: 'blob',
  options: {
    layout: 'radio',
    direction: 'horizontal',
    list: [
      { title: 'Blob', value: 'blob' },
      { title: 'Arch', value: 'arch' },
      { title: 'Circle', value: 'circle' },
      { title: 'Rounded', value: 'rounded' },
    ],
  },
})
