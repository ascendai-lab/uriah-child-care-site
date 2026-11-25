/**
 * Click-to-load embeds: any link with data-facade-src is swapped for an iframe of that URL when
 * clicked: the map (MapEmbed.astro) and video (VideoFacade.astro) façades. Delegated, so it also
 * covers videos inside rich text. data-facade-allow sets the iframe's allow list (videos only).
 */
document.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[data-facade-src]') : null
  if (!target?.dataset.facadeSrc || event.metaKey || event.ctrlKey || event.shiftKey) return
  event.preventDefault()
  const frame = document.createElement('iframe')
  frame.src = target.dataset.facadeSrc
  frame.title = target.dataset.facadeTitle ?? 'Video'
  if (target.dataset.facadeAllow) frame.allow = target.dataset.facadeAllow
  frame.allowFullscreen = true
  target.replaceWith(frame)
  frame.focus()
})
