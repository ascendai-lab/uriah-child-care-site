import type { SyntheticEvent } from 'react'

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

const isField = (el: EventTarget | null): el is Field =>
  el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement

/**
 * Keep aria-invalid in step with the browser's own checks, so screen readers hear "invalid" on the
 * same fields that get the red border (CSS :user-invalid). Spread onto a <form>:
 *   <form {...validityHandlers} ...>
 * The browser still shows its own message and focuses the first field that needs fixing.
 */
export const validityHandlers = {
  onInvalidCapture: (e: SyntheticEvent<HTMLFormElement>) => {
    if (isField(e.target)) e.target.setAttribute('aria-invalid', 'true')
  },
  onChangeCapture: (e: SyntheticEvent<HTMLFormElement>) => {
    const el = e.target
    if (!isField(el)) return
    // Radios share one validity: clear the whole group.
    const group = el instanceof HTMLInputElement && el.type === 'radio' && el.form
      ? Array.from(el.form.querySelectorAll<HTMLInputElement>(`input[type=radio][name="${CSS.escape(el.name)}"]`))
      : [el]
    for (const f of group) if (f.validity.valid) f.removeAttribute('aria-invalid')
  },
}
