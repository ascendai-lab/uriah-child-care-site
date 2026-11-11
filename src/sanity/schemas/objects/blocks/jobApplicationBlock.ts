import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons/Users'
import { blockPreview, headingField, introField, sectionGroups, sectionSettingsFields } from './shared'

/** The job application form (Careers page). Submissions, résumés included, go to Netlify Forms as "job-application". */
export const jobApplicationBlock = defineType({
  name: 'jobApplicationBlock',
  title: 'Job application form',
  type: 'object',
  icon: UsersIcon,
  groups: sectionGroups,
  fields: [
    headingField(),
    introField,
    defineField({
      name: 'positions',
      title: 'Jobs to apply for',
      description: 'The choices in the "Job you\'re applying for" list. Keep "Other" last.',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'content',
      initialValue: ['Teacher', 'Assistant teacher', 'Aide / floater', 'Cook', 'Other'],
    }),
    defineField({
      name: 'successMessage',
      title: 'Message after sending',
      type: 'string',
      group: 'content',
      initialValue: 'We received your application. If your experience is a good fit, Tameca will call you to set up an interview.',
    }),
    ...sectionSettingsFields,
  ],
  preview: blockPreview('Job application form'),
})
