/**
 * Backs up the Sanity content (run by .github/workflows/sanity-backup.yml).
 *
 *   node scripts/backup-sanity.mjs <out-dir>          daily: one JSON file per document, so git only
 *                                                     stores the documents that changed
 *   node scripts/backup-sanity.mjs <out-dir> --full   weekly: data.ndjson + every image and file
 *
 * Needs SANITY_BACKUP_TOKEN (a Viewer token) and PUBLIC_SANITY_PROJECT_ID / PUBLIC_SANITY_DATASET.
 * No packages to install: it uses Sanity's export API directly.
 *
 * Restore: `npx sanity dataset import data.ndjson production --replace` (a full backup folder works
 * the same way: put data.ndjson next to its images/ and files/ folders).
 */
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const [outDir, flag] = process.argv.slice(2)
const full = flag === '--full'
const token = process.env.SANITY_BACKUP_TOKEN
const projectId = process.env.PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production'
if (!outDir || !token || !projectId) {
  console.error('Usage: node scripts/backup-sanity.mjs <out-dir> [--full], with SANITY_BACKUP_TOKEN and PUBLIC_SANITY_PROJECT_ID set')
  process.exit(1)
}

const res = await fetch(`https://${projectId}.api.sanity.io/v2021-06-07/data/export/${dataset}`, {
  headers: { Authorization: `Bearer ${token}` },
})
if (!res.ok) throw new Error(`Export failed: ${res.status} ${await res.text()}`)
const ndjson = await res.text()
const docs = ndjson.split('\n').filter(Boolean).map((line) => JSON.parse(line))
if (docs.length < 10) throw new Error(`Export returned only ${docs.length} documents; refusing to overwrite the backup.`)
docs.sort((a, b) => a._id.localeCompare(b._id))

/** Same key order every time, so unchanged documents give identical files. */
const stable = (value) =>
  Array.isArray(value)
    ? value.map(stable)
    : value && typeof value === 'object'
      ? Object.fromEntries(Object.keys(value).sort().map((k) => [k, stable(value[k])]))
      : value

if (!full) {
  const dir = join(outDir, 'documents')
  await mkdir(dir, { recursive: true })
  const keep = new Set()
  for (const doc of docs) {
    const name = `${doc._id.replace(/[^a-zA-Z0-9._-]/g, '_')}.json`
    keep.add(name)
    // _rev and _updatedAt change on every publish even when nothing else does; keep them, they date the change.
    await writeFile(join(dir, name), `${JSON.stringify(stable(doc), null, 2)}\n`)
  }
  for (const name of await readdir(dir)) if (!keep.has(name)) await rm(join(dir, name)) // deleted in Sanity
  console.log(`Wrote ${docs.length} documents to ${dir}`)
} else {
  await mkdir(join(outDir, 'images'), { recursive: true })
  await mkdir(join(outDir, 'files'), { recursive: true })
  const assets = docs.filter((d) => d._type === 'sanity.imageAsset' || d._type === 'sanity.fileAsset')
  const assetPath = new Map()
  for (const asset of assets) {
    const folder = asset._type === 'sanity.imageAsset' ? 'images' : 'files'
    const file = `${asset.sha1hash || asset._id}.${asset.extension}`
    const r = await fetch(asset.url)
    if (!r.ok) throw new Error(`Could not download ${asset.url}: ${r.status}`)
    await writeFile(join(outDir, folder, file), Buffer.from(await r.arrayBuffer()))
    assetPath.set(asset._id, `${folder}/${file}`)
  }
  // Point each image/file field at the downloaded copy, the format `sanity dataset import` expects.
  const relink = (value) => {
    if (Array.isArray(value)) return value.map(relink)
    if (!value || typeof value !== 'object') return value
    const out = Object.fromEntries(Object.entries(value).map(([k, v]) => [k, relink(v)]))
    const ref = value.asset?._ref
    if (ref && assetPath.has(ref)) {
      delete out.asset
      out._sanityAsset = `${ref.startsWith('image-') ? 'image' : 'file'}@file://./${assetPath.get(ref)}`
    }
    return out
  }
  const lines = docs.filter((d) => !assets.includes(d)).map((d) => JSON.stringify(relink(d)))
  await writeFile(join(outDir, 'data.ndjson'), `${lines.join('\n')}\n`)
  console.log(`Wrote ${lines.length} documents and ${assets.length} assets to ${outDir}`)
}
