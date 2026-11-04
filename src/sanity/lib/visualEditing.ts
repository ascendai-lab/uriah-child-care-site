import { createDataAttribute } from '@sanity/visual-editing/create-data-attribute'
import { studioBasePath } from '../env'

export interface EditableDocument {
  _id: string
  _type: string
}

/**
 * `data-sanity` attribute that makes an element clickable (and page-builder
 * sections draggable) in the Presentation tool. Undefined outside draft mode.
 */
export function editAttr(draftMode: boolean, doc: EditableDocument | null | undefined, path: string) {
  if (!draftMode || !doc) return undefined
  return createDataAttribute({ id: doc._id, type: doc._type, path, baseUrl: studioBasePath }).toString()
}
