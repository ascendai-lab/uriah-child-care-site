import { z } from 'zod'

/** Options for the tour form, and the Zod schema that checks it before it is sent to Netlify Forms. */
export const childAgeOptions = [
  { value: '2.5-3', label: '2½ to 3' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: 'school-age', label: 'School age (6–12)' },
  { value: 'under-2.5', label: 'Under 2½' },
] as const

export const careOptions = [
  { value: 'weekdays', label: 'Weekdays' },
  { value: 'evenings', label: 'Evenings' },
  { value: 'third-shift', label: 'Late evenings (third shift)' },
  { value: 'weekends', label: 'Weekends' },
  { value: 'before-after-school', label: 'Before / after school' },
] as const

export const tourTimeOptions = [
  { value: 'weekday-morning', label: 'Weekday morning' },
  { value: 'weekday-afternoon', label: 'Weekday afternoon' },
  { value: 'evening', label: 'Evening' },
  { value: 'weekend', label: 'Weekend' },
] as const

export const subsidyOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'not-sure', label: "Not sure, I'd like help" },
] as const

const values = <T extends readonly { value: string }[]>(list: T) =>
  list.map((o) => o.value) as unknown as [T[number]['value'], ...T[number]['value'][]]

export const TourRequestSchema = z.object({
  name: z.string().trim().min(2, 'Please tell us your name.').max(120),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, '').length >= 10, 'Please enter a phone number with area code.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  childAge: z.enum(values(childAgeOptions), { errorMap: () => ({ message: "Please pick your child's age." }) }),
  careNeeded: z.array(z.enum(values(careOptions))).min(1, 'Please pick at least one kind of care.'),
  tourPreference: z.array(z.enum(values(tourTimeOptions))).default([]),
  subsidy: z.enum(values(subsidyOptions)).optional(),
  message: z.string().trim().max(1500).optional().default(''),
  pagePath: z.string().max(300).optional().default(''),
  utm: z
    .object({
      source: z.string().max(120).optional(),
      medium: z.string().max(120).optional(),
      campaign: z.string().max(160).optional(),
      term: z.string().max(160).optional(),
      content: z.string().max(160).optional(),
    })
    .optional()
    .default({}),
  gaClientId: z.string().max(80).optional(),
  /** Milliseconds between the form appearing and being sent. Bots are much faster than people. */
  elapsedMs: z.number().int().nonnegative().optional(),
  /** Honeypot: real people never see or fill this field. */
  website: z.string().max(0).optional(),
})

export type TourRequest = z.infer<typeof TourRequestSchema>

/** Anything faster than this is almost certainly a bot. */
export const MIN_FILL_MS = 2500

/** The form name in public/__forms.html. Netlify lists submissions under this name. */
export const NETLIFY_FORM_NAME = 'tour-request'

const labelOf = (list: readonly { value: string; label: string }[], value: string) =>
  list.find((o) => o.value === value)?.label ?? value

/**
 * Flattens a tour request into the plain fields declared in public/__forms.html, with readable labels,
 * so the notification email Netlify sends reads well. Keep the two lists in step.
 */
export function toNetlifyFields(r: TourRequest): Record<string, string> {
  return {
    name: r.name,
    phone: r.phone,
    email: r.email,
    child_age: labelOf(childAgeOptions, r.childAge),
    care_needed: r.careNeeded.map((v) => labelOf(careOptions, v)).join(', '),
    tour_times: r.tourPreference.map((v) => labelOf(tourTimeOptions, v)).join(', '),
    subsidy: r.subsidy ? labelOf(subsidyOptions, r.subsidy) : '',
    message: r.message,
    page: r.pagePath,
    utm_source: r.utm.source ?? '',
    utm_medium: r.utm.medium ?? '',
    utm_campaign: r.utm.campaign ?? '',
    ga_client_id: r.gaClientId ?? '',
  }
}
