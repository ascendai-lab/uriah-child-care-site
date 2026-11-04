import type { APIRoute } from 'astro'
import { DRAFT_MODE_COOKIE } from '@cms/lib/draftMode'

export const GET: APIRoute = ({ cookies, redirect, url }) => {
  cookies.delete(DRAFT_MODE_COOKIE, { path: '/', sameSite: 'none', secure: true })
  const to = url.searchParams.get('redirect')
  return redirect(to?.startsWith('/') && !to.startsWith('//') ? to : '/', 307)
}
