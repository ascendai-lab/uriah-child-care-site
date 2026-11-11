import { z } from 'zod'

/** Options for the job application form, and the Zod schema that checks it before it is sent to Netlify Forms. */
export const availabilityOptions = [
  { value: 'early-morning', label: 'Early mornings (from 6 am)' },
  { value: 'daytime', label: 'Daytime' },
  { value: 'evenings', label: 'Evenings' },
  { value: 'late-evenings', label: 'Late evenings (until 11 pm)' },
  { value: 'saturdays', label: 'Saturdays' },
] as const

export const hoursOptions = [
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'either', label: 'Either' },
] as const

export const yesNoOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
] as const

/** Used when the page doesn't list its own positions in the CMS. */
export const defaultPositions = ['Teacher', 'Assistant teacher', 'Aide / floater', 'Cook', 'Other']

/** Résumé and cover letter files. Netlify takes up to 8 MB per submission, so each file is kept under 4 MB. */
export const FILE_TYPES = '.pdf,.doc,.docx,.rtf,.txt,.jpg,.jpeg,.png'
export const MAX_FILE_BYTES = 4 * 1024 * 1024
const allowedFile = /\.(pdf|docx?|rtf|txt|jpe?g|png)$/i

const values = <T extends readonly { value: string }[]>(list: T) =>
  list.map((o) => o.value) as unknown as [T[number]['value'], ...T[number]['value'][]]

const fileField = (label: string, required: boolean) =>
  z
    .custom<File | null>((v) => v === null || (typeof File !== 'undefined' && v instanceof File), `Please attach your ${label}.`)
    .refine((f) => !required || (f !== null && f.size > 0), `Please attach your ${label}.`)
    .refine((f) => !f || f.size === 0 || allowedFile.test(f.name), `Your ${label} should be a PDF, Word document or photo.`)
    .refine((f) => !f || f.size <= MAX_FILE_BYTES, `Your ${label} is too big. Please keep it under 4 MB.`)

export const JobApplicationSchema = z.object({
  name: z.string().trim().min(2, 'Please tell us your name.').max(120),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, '').length >= 10, 'Please enter a phone number with area code.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  city: z.string().trim().max(120).optional().default(''),
  position: z.string().trim().min(1, 'Please pick the job you are applying for.').max(120),
  hours: z.enum(values(hoursOptions), { errorMap: () => ({ message: 'Please pick full-time or part-time.' }) }),
  availability: z.array(z.enum(values(availabilityOptions))).min(1, 'Please pick at least one time you can work.'),
  startDate: z.string().trim().max(60).optional().default(''),
  experience: z.string().trim().max(1500).optional().default(''),
  credentials: z.string().trim().max(500).optional().default(''),
  over18: z.enum(values(yesNoOptions), { errorMap: () => ({ message: 'Please tell us if you are 18 or older.' }) }),
  backgroundCheck: z.enum(values(yesNoOptions), {
    errorMap: () => ({ message: 'Please answer the background check question.' }),
  }),
  message: z.string().trim().max(1500).optional().default(''),
  resume: fileField('résumé', true),
  coverLetter: fileField('cover letter', false),
  /** Milliseconds between the form appearing and being sent. Bots are much faster than people. */
  elapsedMs: z.number().int().nonnegative().optional(),
  /** Honeypot: real people never see or fill this field. */
  website: z.string().max(0).optional(),
})

export type JobApplication = z.infer<typeof JobApplicationSchema>

/** The form name in public/__forms.html. Netlify lists submissions under this name. */
export const NETLIFY_JOB_FORM_NAME = 'job-application'

const labelOf = (list: readonly { value: string; label: string }[], value: string) =>
  list.find((o) => o.value === value)?.label ?? value

/**
 * Builds the multipart body Netlify Forms expects, with readable labels so the notification email reads well.
 * Keep these field names in step with the job-application form in public/__forms.html.
 */
export function toNetlifyFormData(a: JobApplication): FormData {
  const data = new FormData()
  const fields: Record<string, string> = {
    'form-name': NETLIFY_JOB_FORM_NAME,
    name: a.name,
    phone: a.phone,
    email: a.email,
    city: a.city,
    position: a.position,
    hours: labelOf(hoursOptions, a.hours),
    availability: a.availability.map((v) => labelOf(availabilityOptions, v)).join(', '),
    start_date: a.startDate,
    experience: a.experience,
    credentials: a.credentials,
    over_18: labelOf(yesNoOptions, a.over18),
    background_check: labelOf(yesNoOptions, a.backgroundCheck),
    message: a.message,
  }
  for (const [k, v] of Object.entries(fields)) data.append(k, v)
  if (a.resume && a.resume.size > 0) data.append('resume', a.resume, a.resume.name)
  if (a.coverLetter && a.coverLetter.size > 0) data.append('cover_letter', a.coverLetter, a.coverLetter.name)
  return data
}
