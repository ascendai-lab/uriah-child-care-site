import { defineField } from 'sanity'
import { hero } from './hero'
import { textBlock } from './textBlock'
import { imageText } from './imageText'
import { featureGrid } from './featureGrid'
import { statsBlock } from './statsBlock'
import { servicesBlock } from './servicesBlock'
import { serviceAreasBlock } from './serviceAreasBlock'
import { testimonialsBlock } from './testimonialsBlock'
import { faqBlock } from './faqBlock'
import { teamBlock } from './teamBlock'
import { latestPostsBlock } from './latestPostsBlock'
import { ctaBlock } from './ctaBlock'
import { contactFormBlock } from './contactFormBlock'
import { jobApplicationBlock } from './jobApplicationBlock'
import { videoBlock } from './videoBlock'
import { mapBlock } from './mapBlock'
import { factTableBlock } from './factTableBlock'
import { galleryBlock } from './galleryBlock'

export const blockTypes = [
  hero,
  textBlock,
  imageText,
  featureGrid,
  statsBlock,
  servicesBlock,
  serviceAreasBlock,
  testimonialsBlock,
  faqBlock,
  teamBlock,
  latestPostsBlock,
  ctaBlock,
  contactFormBlock,
  jobApplicationBlock,
  videoBlock,
  mapBlock,
  factTableBlock,
  galleryBlock,
]

/**
 * The drag-and-drop section list used by pages, the home page, services and areas.
 * To add a new section type: create the schema here, add it to `blockTypes`,
 * add its projection in queries.ts and a component in src/components/blocks/.
 */
export const pageBuilderField = (group?: string) =>
  defineField({
    name: 'pageBuilder',
    title: 'Page sections',
    description: 'Add, reorder and remove sections. Click "Add item" to see every section type.',
    type: 'array',
    group,
    of: blockTypes.map((block) => ({ type: block.name })),
    options: {
      insertMenu: {
        filter: true,
        groups: [
          { name: 'intro', title: 'Intro', of: ['hero'] },
          { name: 'content', title: 'Content', of: ['textBlock', 'imageText', 'featureGrid', 'statsBlock', 'galleryBlock', 'videoBlock'] },
          {
            name: 'lists',
            title: 'From the CMS',
            of: ['servicesBlock', 'serviceAreasBlock', 'testimonialsBlock', 'faqBlock', 'teamBlock', 'latestPostsBlock', 'mapBlock', 'factTableBlock'],
          },
          { name: 'conversion', title: 'Conversion', of: ['ctaBlock', 'contactFormBlock', 'jobApplicationBlock'] },
        ],
        views: [{ name: 'list' }],
      },
    },
  })
