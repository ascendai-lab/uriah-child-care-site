import type { APIRoute } from 'astro'
import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { sanityClient } from 'sanity:client'
import { DRAFT_MODE_COOKIE, draftModeCookieValue } from '@cms/lib/draftMode'

/**
 * Called by the Presentation tool when it opens the site in its iframe.
 * Validates the one-time secret, sets the draft-mode cookie and redirects to the page.
 */
export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const token = import.meta.env.SANITY_API_READ_TOKEN
  const cookieValue = await draftModeCookieValue()
  if (!token || !cookieValue) {
    return new Response('Visual editing needs SANITY_API_READ_TOKEN to be set.', { status: 500 })
  }

  const client = sanityClient.withConfig({ token, useCdn: false })
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(client, request.url)
  if (!isValid) {
    return new Response('Invalid preview secret.', { status: 401 })
  }

  cookies.set(DRAFT_MODE_COOKIE, cookieValue, {
    path: '/',
    httpOnly: true,
    // `none` lets the cookie work when the Studio is hosted on another domain.
    sameSite: 'none',
    secure: true,
  })

  return redirect(redirectTo, 307)
}
