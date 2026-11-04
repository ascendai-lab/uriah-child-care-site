import {
  PortableText as BasePortableText,
  type PortableTextComponents,
  type PortableTextProps,
} from '@portabletext/react'
import { stegaClean } from '@sanity/client/stega'
import { urlFor, type ImageSource } from '@cms/lib/image'
import { resolveLink, type LinkValue } from '@cms/lib/links'
import { getEmbedUrl } from '@/lib/video'

interface ImageBlock {
  _type: 'imageWithAlt'
  asset?: unknown
  alt?: string | null
  decorative?: boolean | null
  caption?: string | null
  dimensions?: { width?: number | null; height?: number | null } | null
}

interface VideoBlock {
  _type: 'videoEmbed'
  url?: string | null
  caption?: string | null
  autoplay?: boolean | null
}

interface ButtonBlock {
  _type: 'ctaButton'
  label?: string | null
  variant?: string | null
  link?: LinkValue | null
}

const components: PortableTextComponents = {
  types: {
    imageWithAlt: ({ value }: { value: ImageBlock }) => {
      if (!value?.asset) return null
      const src = urlFor(value as ImageSource).width(1200)
      const { width = 1200, height = 800 } = value.dimensions ?? {}
      return (
        <figure>
          <img
            src={src.url()}
            srcSet={[480, 800, 1200, 1600].map((w) => `${urlFor(value as ImageSource).width(w).url()} ${w}w`).join(', ')}
            sizes="(min-width: 768px) 720px, 100vw"
            alt={value.decorative ? '' : stegaClean(value.alt ?? '')}
            width={1200}
            height={width && height ? Math.round((1200 * height) / width) : 800}
            loading="lazy"
            decoding="async"
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      )
    },

    videoEmbed: ({ value }: { value: VideoBlock }) => {
      const embedUrl = getEmbedUrl(value?.url, Boolean(value?.autoplay))
      if (!embedUrl) return null
      return (
        <figure>
          <div className="video-frame">
            <iframe
              src={embedUrl}
              title={stegaClean(value.caption) || 'Video'}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      )
    },

    ctaButton: ({ value }: { value: ButtonBlock }) => {
      const link = resolveLink(value?.link)
      if (!link || !value.label) return null
      const variant = stegaClean(value.variant) || 'primary'
      return (
        <p>
          <a href={link.href} target={link.target} rel={link.rel} className={`btn btn--${variant}`}>
            {value.label}
          </a>
        </p>
      )
    },
  },

  marks: {
    link: ({ children, value }) => {
      const link = resolveLink(value as LinkValue)
      if (!link) return <>{children}</>
      return (
        <a href={link.href} target={link.target} rel={link.rel}>
          {children}
        </a>
      )
    },
    highlight: ({ children }) => <mark>{children}</mark>,
  },

  block: {
    lead: ({ children }) => <p className="lead">{children}</p>,
  },
}

interface Props {
  value: PortableTextProps['value'] | null | undefined
  className?: string
}

/** Renders CMS rich text. Server-rendered — no client JavaScript. */
export default function PortableText({ value, className = 'prose' }: Props) {
  if (!value || !Array.isArray(value) || value.length === 0) return null
  return (
    <div className={className}>
      <BasePortableText value={value} components={components} />
    </div>
  )
}
