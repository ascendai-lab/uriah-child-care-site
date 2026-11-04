/**
 * A tiny stand-in for the Sanity API, for previewing the seeded site without a Sanity project.
 * It answers GROQ queries from seed/.mock/dataset.json (built by seed/build.mjs) and serves
 * the seed images at the CDN-style URLs the image builder produces.
 *
 *   node seed/build.mjs && node seed/mock-api.mjs        # listens on :9999
 *   SANITY_API_HOST=http://localhost:9999 PUBLIC_SANITY_IMAGE_BASE_URL=http://localhost:9999 \
 *   PUBLIC_SANITY_PROJECT_ID=preview npm run dev
 *
 * Preview only. Never deploy this.
 */
import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { evaluate, parse } from 'groq-js'

const here = dirname(fileURLToPath(import.meta.url))
const dataset = JSON.parse(readFileSync(join(here, '.mock/dataset.json'), 'utf8'))
const images = JSON.parse(readFileSync(join(here, '.mock/images.json'), 'utf8'))
const PORT = Number(process.env.MOCK_PORT || 9999)

async function runQuery(query, params) {
  const tree = parse(query, { params })
  const value = await evaluate(tree, { dataset, params })
  return value.get()
}

function readParams(searchParams) {
  const params = {}
  for (const [k, v] of searchParams) if (k.startsWith('$')) params[k.slice(1)] = JSON.parse(v)
  return params
}

createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)
  try {
    const img = url.pathname.match(/^\/images\/[^/]+\/[^/]+\/([a-f0-9]+)-\d+x\d+\.\w+$/)
    if (img) {
      const file = images[img[1]]
      if (!file) throw Object.assign(new Error('image not found'), { status: 404 })
      res.writeHead(200, { 'content-type': 'image/webp', 'cache-control': 'max-age=3600' })
      return res.end(readFileSync(join(here, 'images', file)))
    }
    if (/\/data\/query\//.test(url.pathname)) {
      let query = url.searchParams.get('query')
      let params = readParams(url.searchParams)
      if (req.method === 'POST') {
        const chunks = []
        for await (const c of req) chunks.push(c)
        const body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
        query = body.query ?? query
        params = { ...params, ...(body.params ?? {}) }
      }
      const started = Date.now()
      const result = await runQuery(query, params)
      res.writeHead(200, { 'content-type': 'application/json' })
      return res.end(JSON.stringify({ result, ms: Date.now() - started, query }))
    }
    throw Object.assign(new Error(`not mocked: ${req.method} ${url.pathname}`), { status: 404 })
  } catch (error) {
    console.error(error.message)
    res.writeHead(error.status || 400, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ error: { description: error.message } }))
  }
}).listen(PORT, () => console.log(`Mock Sanity API on http://localhost:${PORT} (${dataset.length} documents)`))
