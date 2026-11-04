/**
 * Entrance animations: section content fades up as it scrolls into view.
 * Only runs when the visitor hasn't asked for reduced motion; content stays visible without JS.
 */
const SELECTOR = [
  '.section .section-header',
  '.section .section-heading',
  '.grid-cards > *',
  '.reviews-grid > *',
  '.checklist > li',
  '.day-plan > li',
  '.faq-list > *',
  '.image-text__media',
  '.image-text__content',
  '.trust-band__item',
  '.tour-block__card',
  '.cta-band',
  '.keep-exploring',
  '.core-facts',
].join(',')

function init() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
  const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
    (el) => el.getBoundingClientRect().top > window.innerHeight * 0.9,
  )
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-in')
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )
  for (const el of els) {
    const siblings = el.parentElement ? Array.from(el.parentElement.children) : []
    const index = Math.min(siblings.indexOf(el), 5)
    if (index > 0) el.style.setProperty('--reveal-delay', `${index * 70}ms`)
    el.classList.add('reveal')
    observer.observe(el)
  }
}

init()
