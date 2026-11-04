import { useEffect, useRef, useState, type SubmitEvent } from 'react'
import {
  careOptions,
  childAgeOptions,
  MIN_FILL_MS,
  NETLIFY_FORM_NAME,
  subsidyOptions,
  toNetlifyFields,
  tourTimeOptions,
  TourRequestSchema,
} from '@/lib/tour'

type FormState = 'idle' | 'submitting' | 'error'

interface Props {
  /** Where to send parents after a successful request. */
  thanksPath?: string
  phone?: string | null
  /** Unique per form on the page, so ids don't clash. */
  idPrefix?: string
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const UTM_KEY = 'uriah-utm'
const utmFields = ['source', 'medium', 'campaign', 'term', 'content'] as const

/** Remember the first UTM tags a visitor arrived with, so a tour booked three pages later is still credited. */
function readUtm(): Record<string, string> {
  try {
    const params = new URLSearchParams(window.location.search)
    const fromUrl = Object.fromEntries(
      utmFields.map((f) => [f, params.get(`utm_${f}`) ?? '']).filter(([, v]) => v),
    ) as Record<string, string>
    if (Object.keys(fromUrl).length) {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(fromUrl))
      return fromUrl
    }
    return JSON.parse(sessionStorage.getItem(UTM_KEY) ?? '{}') as Record<string, string>
  } catch {
    return {}
  }
}

/** GA4 client id from the _ga cookie (GA1.1.123.456 → 123.456). */
function readGaClientId(): string | undefined {
  const match = document.cookie.match(/(?:^|;\s*)_ga=GA\d\.\d\.(\d+\.\d+)/)
  return match?.[1]
}

/**
 * The tour request form. Checks the answers with the shared Zod schema, then sends them to Netlify Forms
 * (Netlify emails each request to the center; see public/__forms.html).
 */
export default function TourForm({ thanksPath = '/tour/thanks/', phone, idPrefix = 'tour' }: Props) {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [childAge, setChildAge] = useState('')
  const startedAt = useRef<number>(Date.now())

  useEffect(() => {
    startedAt.current = Date.now()
    readUtm()
  }, [])

  const id = (name: string) => `${idPrefix}-${name}`

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const careNeeded = data.getAll('careNeeded').map(String)
    if (!careNeeded.length) {
      setErrorMsg('Please pick at least one kind of care.')
      setState('error')
      return
    }

    setState('submitting')
    setErrorMsg('')

    const result = TourRequestSchema.safeParse({
      name: String(data.get('name') ?? ''),
      phone: String(data.get('phone') ?? ''),
      email: String(data.get('email') ?? ''),
      childAge: String(data.get('childAge') ?? ''),
      careNeeded,
      tourPreference: data.getAll('tourPreference').map(String),
      subsidy: data.get('subsidy') ? String(data.get('subsidy')) : undefined,
      message: String(data.get('message') ?? ''),
      website: String(data.get('website') ?? ''),
      pagePath: window.location.pathname,
      utm: readUtm(),
      gaClientId: readGaClientId(),
      elapsedMs: Date.now() - startedAt.current,
    })
    if (!result.success) {
      setErrorMsg(Object.values(result.error.flatten().fieldErrors).flat()[0] ?? 'Please check the form and try again.')
      setState('error')
      return
    }
    const payload = result.data

    try {
      // Spam (honeypot filled, or sent faster than a person could): act as if it worked, send nothing.
      const isBot = Boolean(payload.website) || (payload.elapsedMs ?? MIN_FILL_MS) < MIN_FILL_MS
      if (!isBot) {
        const res = await fetch('/__forms.html', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ 'form-name': NETLIFY_FORM_NAME, ...toNetlifyFields(payload) }).toString(),
        })
        if (!res.ok) throw new Error('We could not send your request. Please try again.')
      }

      // GA4 key event: tour_request, with the program and shift the family picked.
      const eventParams = { child_age: payload.childAge, care_needed: careNeeded.join(','), page_path: payload.pagePath }
      if (typeof window.gtag === 'function') window.gtag('event', 'tour_request', eventParams)
      window.dataLayer?.push({ event: 'tour_request', ...eventParams })

      window.location.assign(thanksPath)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again, or give us a call.')
      setState('error')
    }
  }

  return (
    <form className="form tour-form" onSubmit={handleSubmit} noValidate={false}>
      <div className="form-row form-row--2">
        <div className="field">
          <label htmlFor={id('name')}>Your name</label>
          <input id={id('name')} name="name" type="text" autoComplete="name" required minLength={2} />
        </div>
        <div className="field">
          <label htmlFor={id('phone')}>Phone</label>
          <input id={id('phone')} name="phone" type="tel" inputMode="tel" autoComplete="tel" required />
        </div>
      </div>

      <div className="form-row form-row--2">
        <div className="field">
          <label htmlFor={id('email')}>Email</label>
          <input id={id('email')} name="email" type="email" autoComplete="email" required />
        </div>
        <div className="field">
          <label htmlFor={id('childAge')}>Your child's age</label>
          <select id={id('childAge')} name="childAge" required value={childAge} onChange={(e) => setChildAge(e.target.value)}>
            <option value="" disabled>
              Pick an age
            </option>
            {childAgeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {childAge === 'under-2.5' && (
        <p className="form-note" role="status">
          We care for children ages 2½ and up right now. Send the form anyway and we'll call you back, so we can talk about when your little one can
          start.
        </p>
      )}

      <fieldset className="field">
        <legend className="field__label">Care you need</legend>
        <span className="field__hint">Pick any that fit.</span>
        <div className="choice-group">
          {careOptions.map((o) => (
            <label key={o.value} className="choice">
              <input type="checkbox" name="careNeeded" value={o.value} />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="field">
        <legend className="field__label">
          Best days and times for a tour <span className="field__hint">(optional)</span>
        </legend>
        <div className="choice-group">
          {tourTimeOptions.map((o) => (
            <label key={o.value} className="choice">
              <input type="checkbox" name="tourPreference" value={o.value} />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="field">
        <legend className="field__label">
          Using NJ childcare subsidy (CCAP)? <span className="field__hint">(optional)</span>
        </legend>
        <div className="choice-group">
          {subsidyOptions.map((o) => (
            <label key={o.value} className="choice">
              <input type="radio" name="subsidy" value={o.value} />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor={id('message')}>
          Anything we should know? <span className="field__hint">(optional)</span>
        </label>
        <textarea id={id('message')} name="message" rows={3} maxLength={1500} placeholder="Allergies, start date, brothers or sisters…" />
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor={id('website')}>Leave this empty</label>
        <input id={id('website')} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state === 'error' && (
        <p className="form-error" role="alert">
          {errorMsg}
          {phone ? ` You can also call us at ${phone}.` : ''}
        </p>
      )}

      <div>
        <button type="submit" className="btn btn--primary btn--lg" disabled={state === 'submitting'}>
          {state === 'submitting' ? 'Sending…' : 'Book a tour'}
          <span className="btn__arrow" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </button>
      </div>
    </form>
  )
}
