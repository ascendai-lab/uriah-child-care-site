import { stegaClean } from '@sanity/client/stega'

/** Turn a YouTube or Vimeo page URL into its embeddable player URL. */
export function getEmbedUrl(url: string | null | undefined, autoplay = false): string | null {
  if (!url) return null
  try {
    const parsed = new URL(stegaClean(url))
    const host = parsed.hostname.replace(/^www\./, '')
    let embed: string | null = null

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const id = parsed.searchParams.get('v') ?? parsed.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1]
      embed = id ? `https://www.youtube-nocookie.com/embed/${id}` : null
    } else if (host === 'youtu.be') {
      const id = parsed.pathname.slice(1)
      embed = id ? `https://www.youtube-nocookie.com/embed/${id}` : null
    } else if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const id = parsed.pathname.split('/').filter(Boolean).find((part) => /^\d+$/.test(part))
      embed = id ? `https://player.vimeo.com/video/${id}` : null
    }

    if (!embed) return null
    return autoplay ? `${embed}?autoplay=1&mute=1` : embed
  } catch {
    return null
  }
}

export interface VideoFacade {
  /** Player URL that starts playing once loaded (the visitor already pressed play). */
  playUrl: string
  /** Poster image (YouTube only; Vimeo needs an API call, so it gets a plain panel). */
  poster: string | null
  /** The video's own page, for visitors without JS. */
  pageUrl: string
}

/**
 * Data for a click-to-play video: a poster and a play button stand in for the player, which is
 * only loaded when the visitor presses play. Returns null when autoplay is on (it must load at once).
 */
export function getVideoFacade(url: string | null | undefined, autoplay = false): VideoFacade | null {
  const embed = getEmbedUrl(url, false)
  if (!embed || autoplay || !url) return null
  const youtubeId = embed.match(/youtube-nocookie\.com\/embed\/([^/?]+)/)?.[1]
  return {
    playUrl: `${embed}?autoplay=1`,
    poster: youtubeId ? `https://i.ytimg.com/vi/${encodeURIComponent(youtubeId)}/hqdefault.jpg` : null,
    pageUrl: stegaClean(url),
  }
}
