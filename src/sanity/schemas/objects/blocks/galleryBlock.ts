import { defineField, defineType } from 'sanity'
import { ImagesIcon } from '@sanity/icons/Images'
import { blockPreview, headingField, introField, sectionGroups, sectionSettingsFields } from './shared'

/** A photo gallery. Only publish photos of children with written parent consent. */
export const galleryBlock = defineType({
  name: 'galleryBlock',
  title: 'Photo gallery',
  type: 'object',
  icon: ImagesIcon,
  groups: sectionGroups,
  fields: [
    headingField(),
    introField,
    defineField({
      name: 'images',
      title: 'Photos',
      type: 'array',
      group: 'content',
      description: 'Real photos of the center only. Photos of identifiable children need written parent consent first.',
      of: [{ type: 'imageWithAlt' }],
      options: { layout: 'grid' },
    }),
    ...sectionSettingsFields,
  ],
  preview: blockPreview('Photo gallery'),
})
