/**
 * Builds the seed dataset from the hand-written content files.
 *
 *   node seed/build.mjs
 *
 * Writes:
 *   seed/dataset.ndjson       → import into Sanity:  npx sanity dataset import seed/dataset.ndjson production
 *                               (images upload from seed/images/ automatically)
 *   seed/.mock/dataset.json   → used by seed/mock-api.mjs to preview the site without a Sanity project
 */
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mdToPortableText } from './lib.mjs'
import { faqs, navigation, reviews, settingsDocs, team } from './content-core.mjs'
import { categories, cities, services } from './content-programs.mjs'
import { homePage, pages } from './content-pages.mjs'
import { posts } from './content-news.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const meta = JSON.parse(readFileSync(join(here, 'images/meta.json'), 'utf8'))
const NOW = new Date().toISOString()

const docs = [...settingsDocs, navigation, homePage, ...team, ...reviews, ...faqs, ...categories, ...services, ...pages, ...cities, ...posts]

/* ── Checks ── */
const ids = new Set()
for (const d of docs) {
  if (ids.has(d._id)) throw new Error(`Duplicate _id ${d._id}`)
  ids.add(d._id)
}
const paths = new Map()
for (const d of docs) {
  const s = d.slug?.current
  if (!s) continue
  const path = d._type === 'blogPost' ? `/news/${s}/` : `/${s}/`
  if (paths.has(path)) throw new Error(`Duplicate URL ${path}`)
  paths.set(path, d._id)
}
paths.set('/', 'homePage')
const resolveSlug = (path) => {
  const p = path.endsWith('/') ? path : `${path}/`
  const id = paths.get(p)
  if (!id) throw new Error(`md link to unknown page: ${path}`)
  return id
}

/* ── Image assets ── */
const assetId = (name) => {
  const m = meta[name]
  if (!m) throw new Error(`Unknown image ${name}`)
  const hash = createHash('sha1').update(name).digest('hex')
  return { id: `image-${hash}-${m.w}x${m.h}-webp`, hash, ...m }
}
const usedImages = new Set()

/** Deep-transform a document. mode = 'import' | 'mock'. */
function transform(value, mode) {
  if (Array.isArray(value)) return value.map((v) => transform(v, mode))
  if (!value || typeof value !== 'object') return value
  if ('__md' in value) return mdToPortableText(value.__md, resolveSlug)
  if (value.asset?._ref?.startsWith('@img:')) {
    const name = value.asset._ref.slice(5)
    usedImages.add(name)
    const { asset, ...rest } = value
    if (mode === 'import') return { ...transform(rest, mode), _sanityAsset: `image@file://./images/${name}.webp` }
    return { ...transform(rest, mode), asset: { _type: 'reference', _ref: assetId(name).id } }
  }
  const out = {}
  for (const [k, v] of Object.entries(value)) out[k] = transform(v, mode)
  return out
}

/* Reference check */
const refsMissing = []
const walkRefs = (v, from) => {
  if (Array.isArray(v)) return v.forEach((x) => walkRefs(x, from))
  if (!v || typeof v !== 'object') return
  if (v._type === 'reference' && !v._ref.startsWith('image-') && !ids.has(v._ref)) refsMissing.push(`${from} → ${v._ref}`)
  Object.values(v).forEach((x) => walkRefs(x, from))
}

const importDocs = docs.map((d) => transform(d, 'import'))
const mockDocs = docs.map((d) => ({ _createdAt: NOW, _updatedAt: NOW, _rev: 'seed', ...transform(d, 'mock') }))
mockDocs.forEach((d) => walkRefs(d, d._id))
if (refsMissing.length) throw new Error(`Missing references:\n${refsMissing.join('\n')}`)

for (const name of usedImages) {
  const a = assetId(name)
  mockDocs.push({
    _id: a.id,
    _type: 'sanity.imageAsset',
    _createdAt: NOW,
    _updatedAt: NOW,
    originalFilename: `${name}.webp`,
    extension: 'webp',
    mimeType: 'image/webp',
    path: `images/preview/production/${a.hash}-${a.w}x${a.h}.webp`,
    metadata: { _type: 'sanity.imageMetadata', dimensions: { _type: 'sanity.imageDimensions', width: a.w, height: a.h, aspectRatio: a.w / a.h } },
  })
}

writeFileSync(join(here, 'dataset.ndjson'), importDocs.map((d) => JSON.stringify(d)).join('\n') + '\n')
mkdirSync(join(here, '.mock'), { recursive: true })
writeFileSync(join(here, '.mock/dataset.json'), JSON.stringify(mockDocs))
writeFileSync(
  join(here, '.mock/images.json'),
  JSON.stringify(Object.fromEntries([...usedImages].map((n) => [assetId(n).hash, `${n}.webp`]))),
)

const count = (t) => docs.filter((d) => d._type === t).length
console.log(
  `Seed built: ${docs.length} documents (${count('category')} program hubs, ${count('service')} services, ${count('serviceArea')} cities, ${count('page')} pages, home), ${usedImages.size} images.`,
)
console.log(`Pages with a URL: ${paths.size}`)
