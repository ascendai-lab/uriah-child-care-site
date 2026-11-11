import { useEffect, useRef, useState, type SubmitEvent } from 'react'
import {
  availabilityOptions,
  defaultPositions,
  FILE_TYPES,
  hoursOptions,
  JobApplicationSchema,
  toNetlifyFormData,
  yesNoOptions,
} from '@/lib/careers'

type FormState = 'idle' | 'submitting' | 'error' | 'sent'

interface Props {
  /** Jobs to pick from. Comes from the CMS; falls back to a standard list. */
  positions?: string[] | null
  successMessage?: string | null
  phone?: string | null
  idPrefix?: string
}

/** Anything faster than this is almost certainly a bot. */
const MIN_FILL_MS = 4000

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const fileOrNull = (v: FormDataEntryValue | null) => (v instanceof File && v.size > 0 ? v : null)

/**
 * The job application form on the Careers page. Checks the answers and files with the shared Zod schema,
 * then sends them, résumé and cover letter included, to Netlify Forms (see public/__forms.html).
 */
export default function JobApplicationForm({ positions, successMessage, phone, idPrefix = 'job' }: Props) {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const startedAt = useRef<number>(Date.now())
  const formRef = useRef<HTMLFormElement>(null)
  const jobs = positions?.length ? positions : defaultPositions

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const id = (name: string) => `${idPrefix}-${name}`

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setState('submitting')
    setErrorMsg('')

    const result = JobApplicationSchema.safeParse({
      name: String(data.get('name') ?? ''),
      phone: String(data.get('phone') ?? ''),
      email: String(data.get('email') ?? ''),
      city: String(data.get('city') ?? ''),
      position: String(data.get('position') ?? ''),
      hours: String(data.get('hours') ?? ''),
      availability: data.getAll('availability').map(String),
      startDate: String(data.get('startDate') ?? ''),
      experience: String(data.get('experience') ?? ''),
      credentials: String(data.get('credentials') ?? ''),
      over18: String(data.get('over18') ?? ''),
      backgroundCheck: String(data.get('backgroundCheck') ?? ''),
      message: String(data.get('message') ?? ''),
      resume: fileOrNull(data.get('resume')),
      coverLetter: fileOrNull(data.get('coverLetter')),
      website: String(data.get('website') ?? ''),
      elapsedMs: Date.now() - startedAt.current,
    })
    if (!result.success) {
      setErrorMsg(Object.values(result.error.flatten().fieldErrors).flat()[0] ?? 'Please check the form and try again.')
      setState('error')
      return
    }
    const application = result.data

    try {
      // Spam (honeypot filled, or sent faster than a person could): act as if it worked, send nothing.
      const isBot = Boolean(application.website) || (application.elapsedMs ?? MIN_FILL_MS) < MIN_FILL_MS
      if (!isBot) {
        // Multipart, so the files go along. The browser sets the Content-Type with its boundary.
        const res = await fetch('/__forms.html', { method: 'POST', body: toNetlifyFormData(application) })
        if (!res.ok) throw new Error('We could not send your application. Please try again.')
      }
      const eventParams = { position: application.position }
      if (typeof window.gtag === 'function') window.gtag('event', 'job_application', eventParams)
      window.dataLayer?.push({ event: 'job_application', ...eventParams })
      setState('sent')
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again, or give us a call.')
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div className="form-success" role="status" ref={formRef as never}>
        <h3>Thank you for applying</h3>
        <p>{successMessage || 'We received your application. If your experience is a good fit, Tameca will call you to set up an interview.'}</p>
      </div>
    )
  }

  return (
    <form ref={formRef} className="form job-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-row form-row--2">
        <div className="field">
          <label htmlFor={id('name')}>Full name</label>
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
          <label htmlFor={id('city')}>
            Town you live in <span className="field__hint">(optional)</span>
          </label>
          <input id={id('city')} name="city" type="text" autoComplete="address-level2" />
        </div>
      </div>

      <div className="form-row form-row--2">
        <div className="field">
          <label htmlFor={id('position')}>Job you're applying for</label>
          <select id={id('position')} name="position" required defaultValue="">
            <option value="" disabled>
              Pick a job
            </option>
            {jobs.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor={id('startDate')}>
            When could you start? <span className="field__hint">(optional)</span>
          </label>
          <input id={id('startDate')} name="startDate" type="text" placeholder="Right away, in two weeks…" />
        </div>
      </div>

      <fieldset className="field">
        <legend className="field__label">Full-time or part-time?</legend>
        <div className="choice-group">
          {hoursOptions.map((o) => (
            <label key={o.value} className="choice">
              <input type="radio" name="hours" value={o.value} required />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="field">
        <legend className="field__label">When can you work?</legend>
        <span className="field__hint">We're open Monday to Saturday, 6 am to 11 pm. Pick any that fit.</span>
        <div className="choice-group">
          {availabilityOptions.map((o) => (
            <label key={o.value} className="choice">
              <input type="checkbox" name="availability" value={o.value} />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor={id('experience')}>
          Your experience with children <span className="field__hint">(optional)</span>
        </label>
        <textarea id={id('experience')} name="experience" rows={3} maxLength={1500} placeholder="Where you worked, the ages you cared for, how long…" />
      </div>

      <div className="field">
        <label htmlFor={id('credentials')}>
          Certificates or training <span className="field__hint">(optional)</span>
        </label>
        <input id={id('credentials')} name="credentials" type="text" maxLength={500} placeholder="CDA, CPR and First Aid, college courses…" />
      </div>

      <div className="form-row form-row--2">
        <fieldset className="field">
          <legend className="field__label">Are you 18 or older?</legend>
          <div className="choice-group">
            {yesNoOptions.map((o) => (
              <label key={o.value} className="choice">
                <input type="radio" name="over18" value={o.value} required />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="field">
          <legend className="field__label">Willing to complete NJ child care background checks?</legend>
          <div className="choice-group">
            {yesNoOptions.map((o) => (
              <label key={o.value} className="choice">
                <input type="radio" name="backgroundCheck" value={o.value} required />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="form-row form-row--2">
        <div className="field">
          <label htmlFor={id('resume')}>Résumé / CV</label>
          <input id={id('resume')} name="resume" type="file" accept={FILE_TYPES} required />
          <span className="field__hint">PDF, Word or a photo, under 4 MB.</span>
        </div>
        <div className="field">
          <label htmlFor={id('coverLetter')}>
            Cover letter <span className="field__hint">(optional)</span>
          </label>
          <input id={id('coverLetter')} name="coverLetter" type="file" accept={FILE_TYPES} />
          <span className="field__hint">PDF, Word or a photo, under 4 MB.</span>
        </div>
      </div>

      <div className="field">
        <label htmlFor={id('message')}>
          Anything else you'd like us to know? <span className="field__hint">(optional)</span>
        </label>
        <textarea id={id('message')} name="message" rows={3} maxLength={1500} />
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
          {state === 'submitting' ? 'Sending…' : 'Send my application'}
        </button>
      </div>
    </form>
  )
}
