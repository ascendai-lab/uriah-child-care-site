import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons/Cog'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'brand', title: 'Brand', default: true },
    { name: 'contact', title: 'Contact & hours' },
    { name: 'facts', title: 'Business facts' },
    { name: 'gbp', title: 'Google Business Profile' },
    { name: 'social', title: 'Social media' },
    { name: 'seo', title: 'SEO defaults' },
    { name: 'tracking', title: 'Analytics & tracking' },
    { name: 'announcement', title: 'Announcement bar' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    // ─── Brand ─────────────────────────────────────────────────────
    defineField({
      name: 'siteName',
      title: 'Business name',
      type: 'string',
      group: 'brand',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'legalName',
      title: 'Legal name',
      type: 'string',
      description: 'The licensed operator, used in schema data, e.g. "Johnson and Senior Group LLC".',
      group: 'brand',
    }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', group: 'brand' }),
    defineField({ name: 'logo', title: 'Logo', type: 'imageWithAlt', description: 'SVG or PNG.', group: 'brand' }),
    defineField({
      name: 'logoInverse',
      title: 'Logo for dark backgrounds (optional)',
      type: 'imageWithAlt',
      group: 'brand',
    }),
    defineField({
      name: 'favicon',
      title: 'Browser tab icon',
      type: 'image',
      description: 'Square PNG, at least 512×512px.',
      group: 'brand',
    }),

    // ─── Contact ───────────────────────────────────────────────────
    defineField({ name: 'phone', title: 'Phone', type: 'string', group: 'contact' }),
    defineField({ name: 'email', title: 'Email', type: 'email', group: 'contact' }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      group: 'contact',
      options: { columns: 2 },
      fields: [
        defineField({ name: 'street', title: 'Street', type: 'string' }),
        defineField({ name: 'city', title: 'City', type: 'string' }),
        defineField({ name: 'state', title: 'State', type: 'string' }),
        defineField({ name: 'zip', title: 'ZIP', type: 'string' }),
      ],
    }),
    defineField({
      name: 'mapUrl',
      title: 'Google Maps link',
      type: 'url',
      group: 'contact',
    }),
    defineField({
      name: 'hours',
      title: 'Opening hours',
      type: 'array',
      of: [{ type: 'openingHours' }],
      group: 'contact',
    }),
    defineField({
      name: 'hoursSummary',
      title: 'Hours in words',
      type: 'string',
      description: 'Exactly as on the GBP, e.g. "Monday to Saturday, 6 am to 11 pm".',
      group: 'contact',
    }),
    defineField({
      name: 'businessType',
      title: 'Business type (for Google)',
      type: 'string',
      description: 'schema.org type used in search results, e.g. ChildCare, Dentist, LocalBusiness.',
      initialValue: 'LocalBusiness',
      group: 'contact',
    }),
    defineField({
      name: 'priceRange',
      title: 'Price range (for Google)',
      type: 'string',
      description: 'e.g. $$',
      group: 'contact',
    }),

    // ─── Business facts (one source of truth for footer, schema, fact table, llms.txt) ─
    defineField({
      name: 'agesServed',
      title: 'Ages served',
      type: 'string',
      description: 'e.g. "Ages 2.5 and up"',
      group: 'facts',
    }),
    defineField({ name: 'ageMin', title: 'Youngest age (years)', type: 'number', group: 'facts' }),
    defineField({ name: 'ageMax', title: 'Oldest age (years)', type: 'number', group: 'facts' }),
    defineField({
      name: 'shiftsLine',
      title: 'Shift care line',
      type: 'string',
      description: 'e.g. "Early morning to 11 pm, Monday to Saturday"',
      group: 'facts',
    }),
    defineField({
      name: 'programsLine',
      title: 'Programs line',
      type: 'string',
      description: 'For the fact table, e.g. "Toddler care, kindergarten readiness, before and after school care"',
      group: 'facts',
    }),
    defineField({ name: 'subsidyStatement', title: 'Subsidy wording', type: 'string', group: 'facts' }),
    defineField({ name: 'foodProgramStatement', title: 'Food program wording', type: 'string', group: 'facts' }),
    defineField({
      name: 'license',
      title: 'License',
      type: 'object',
      group: 'facts',
      fields: [
        defineField({ name: 'issuer', title: 'Issued by', type: 'string' }),
        defineField({ name: 'number', title: 'License ID', type: 'string' }),
        defineField({ name: 'summary', title: 'Line shown on the site', type: 'string' }),
        defineField({ name: 'expires', title: 'Expires', type: 'date', description: 'Internal reminder. Not shown.' }),
      ],
    }),
    defineField({ name: 'foundingYear', title: 'Caring for local children since', type: 'number', group: 'facts' }),
    defineField({ name: 'ownerName', title: 'Owner (as used on the site)', type: 'string', group: 'facts' }),
    defineField({
      name: 'serviceAreasLine',
      title: 'Service areas line',
      type: 'string',
      description: 'e.g. "Serving Vineland, Millville and Bridgeton (Cumberland County, NJ)"',
      group: 'facts',
    }),
    defineField({
      name: 'attributes',
      title: 'Attributes (badges)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Only ones that are true, matching the GBP attributes.',
      group: 'facts',
    }),

    // ─── Google Business Profile ───────────────────────────────────
    defineField({
      name: 'gbpDescription',
      title: 'GBP business description',
      type: 'text',
      rows: 6,
      description: 'Pasted into the GBP and reused as the About intro and the llms.txt summary. Max 750 characters.',
      validation: (Rule) => Rule.max(750),
      group: 'gbp',
    }),
    defineField({ name: 'gbpUrl', title: 'GBP / Google Maps listing link', type: 'url', group: 'gbp' }),
    defineField({ name: 'gbpReviewUrl', title: 'Google reviews link', type: 'url', group: 'gbp' }),
    defineField({ name: 'gbpWriteReviewUrl', title: '"Write a review" link', type: 'url', group: 'gbp' }),
    defineField({
      name: 'gbpMapEmbedUrl',
      title: 'Map embed URL',
      type: 'url',
      description: 'The embed URL of the listing itself (Google Maps → Share → Embed a map → the src="..." value).',
      group: 'gbp',
    }),
    defineField({
      name: 'googleRating',
      title: 'Google rating (optional)',
      type: 'number',
      description: 'Copy it from the GBP, e.g. 4.9. Leave empty to show stars without a number.',
      group: 'gbp',
    }),
    defineField({ name: 'googleReviewCount', title: 'Google review count (optional)', type: 'number', group: 'gbp' }),
    defineField({
      name: 'sameAs',
      title: 'Directory listings (sameAs)',
      type: 'array',
      of: [{ type: 'url' }],
      description: 'Yelp, Care.com, Winnie, NJ provider search, Bing Places, etc. Social profiles are added automatically.',
      group: 'gbp',
    }),

    // ─── Social ────────────────────────────────────────────────────
    defineField({
      name: 'socialLinks',
      title: 'Social profiles',
      type: 'array',
      of: [{ type: 'socialLink' }],
      group: 'social',
    }),

    // ─── SEO defaults ──────────────────────────────────────────────
    defineField({
      name: 'titleTemplate',
      title: 'Page title format',
      type: 'string',
      description: 'Use %s for the page title, e.g. "%s | Uriah Child Care".',
      initialValue: '%s',
      group: 'seo',
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Fallback SEO',
      type: 'seoFields',
      description: 'Used when a page has no SEO fields of its own.',
      group: 'seo',
    }),

    // ─── Tracking ──────────────────────────────────────────────────
    defineField({
      name: 'gaId',
      title: 'Google Analytics 4 ID',
      type: 'string',
      description: 'e.g. G-XXXXXXXXXX',
      group: 'tracking',
    }),
    defineField({
      name: 'gtmId',
      title: 'Google Tag Manager ID',
      type: 'string',
      description: 'e.g. GTM-XXXXXXX. If you use GTM, put GA4 inside it instead of above.',
      group: 'tracking',
    }),
    defineField({ name: 'metaPixelId', title: 'Meta (Facebook) Pixel ID', type: 'string', group: 'tracking' }),
    defineField({
      name: 'googleSiteVerification',
      title: 'Google Search Console verification code',
      type: 'string',
      description: 'Just the content="..." value from the HTML tag method.',
      group: 'tracking',
    }),

    // ─── Announcement ──────────────────────────────────────────────
    defineField({
      name: 'announcement',
      title: 'Announcement bar',
      type: 'object',
      group: 'announcement',
      fields: [
        defineField({ name: 'enabled', title: 'Show announcement bar', type: 'boolean', initialValue: false }),
        defineField({ name: 'text', title: 'Text', type: 'string' }),
        defineField({ name: 'link', title: 'Link (optional)', type: 'link' }),
      ],
    }),

    // ─── Footer ────────────────────────────────────────────────────
    defineField({ name: 'footerText', title: 'Footer blurb', type: 'text', rows: 3, group: 'footer' }),
    defineField({
      name: 'copyrightName',
      title: 'Copyright name',
      type: 'string',
      description: 'Defaults to the business name.',
      group: 'footer',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site settings' }
    },
  },
})
