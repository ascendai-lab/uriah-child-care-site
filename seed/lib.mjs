/**
 * Small helpers for writing seed content by hand.
 * `md()` turns a tiny Markdown subset into Portable Text:
 *   ## / ### / #### headings, blank-line paragraphs, "- " bullets, **bold**, *italic*,
 *   [text](/slug/) internal links (resolved to document references), [text](https://…) external links,
 *   [text](tel:…) phone links.
 */

let keyCounter = 0
export const key = () => `k${(++keyCounter).toString(36).padStart(5, '0')}`

/** Image placeholder, resolved by build.mjs to an uploaded asset (import) or a mock asset (preview). */
export const img = (name, alt, extra = {}) => ({ _type: 'imageWithAlt', asset: { _ref: `@img:${name}` }, alt, ...extra })

export const ref = (id) => ({ _type: 'reference', _ref: id, _key: key() })
export const ref1 = (id) => ({ _type: 'reference', _ref: id })

export const link = {
  internal: (id) => ({ _type: 'link', linkType: 'internal', internal: ref1(id) }),
  external: (url) => ({ _type: 'link', linkType: 'external', external: url, openInNewTab: true }),
  phone: (phone) => ({ _type: 'link', linkType: 'phone', phone }),
}

export const button = (label, l, variant = 'primary') => ({ _type: 'ctaButton', _key: key(), label, variant, link: l })

/** Mark a path in md() links: resolved later against the slug registry. */
function parseInline(text, markDefs, resolveSlug) {
  const children = []
  // Tokenize links first, then bold/italic inside plain spans.
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let m
  const pushText = (t, marks = []) => {
    if (!t) return
    // bold / italic
    const re = /(\*\*([^*]+)\*\*|\*([^*]+)\*)/g
    let l = 0
    let mm
    while ((mm = re.exec(t))) {
      if (mm.index > l) children.push({ _type: 'span', _key: key(), text: t.slice(l, mm.index), marks: [...marks] })
      if (mm[2]) children.push({ _type: 'span', _key: key(), text: mm[2], marks: [...marks, 'strong'] })
      else children.push({ _type: 'span', _key: key(), text: mm[3], marks: [...marks, 'em'] })
      l = mm.index + mm[0].length
    }
    if (l < t.length) children.push({ _type: 'span', _key: key(), text: t.slice(l), marks: [...marks] })
  }
  while ((m = linkRe.exec(text))) {
    pushText(text.slice(last, m.index))
    const [, label, href] = m
    const defKey = key()
    let def
    if (href.startsWith('http')) def = { _key: defKey, _type: 'link', linkType: 'external', external: href, openInNewTab: true }
    else if (href.startsWith('tel:')) def = { _key: defKey, _type: 'link', linkType: 'phone', phone: href.slice(4) }
    else if (href.startsWith('mailto:')) def = { _key: defKey, _type: 'link', linkType: 'email', email: href.slice(7) }
    else {
      const [path, anchor] = href.split('#')
      const target = resolveSlug(path)
      def = { _key: defKey, _type: 'link', linkType: 'internal', internal: ref1(target), ...(anchor ? { anchor } : {}) }
    }
    markDefs.push(def)
    pushText(label, [defKey])
    last = m.index + m[0].length
  }
  pushText(text.slice(last))
  return children.length ? children : [{ _type: 'span', _key: key(), text: '', marks: [] }]
}

/** Deferred Markdown: converted once every document id is known. */
export const md = (strings, ...values) => ({ __md: String.raw({ raw: strings }, ...values) })

export function mdToPortableText(source, resolveSlug) {
  const blocks = []
  const paras = source
    .replace(/\r/g, '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
  for (const para of paras) {
    const lines = para.split('\n').map((l) => l.trim())
    if (lines.every((l) => l.startsWith('- '))) {
      for (const l of lines) {
        const markDefs = []
        blocks.push({ _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs, children: parseInline(l.slice(2), markDefs, resolveSlug) })
      }
      continue
    }
    const h = para.match(/^(#{2,4})\s+(.*)$/s)
    const markDefs = []
    if (h) {
      blocks.push({ _type: 'block', _key: key(), style: `h${h[1].length}`, markDefs, children: parseInline(h[2].replace(/\n/g, ' '), markDefs, resolveSlug) })
    } else {
      blocks.push({ _type: 'block', _key: key(), style: 'normal', markDefs, children: parseInline(para.replace(/\n/g, ' '), markDefs, resolveSlug) })
    }
  }
  return blocks
}

export const faq = (question, answer) => ({ _type: 'faqItem', _key: key(), question, answer })
export const step = (label, activity) => ({ _type: 'dayStep', _key: key(), label, activity })
