import 'server-only'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const API_URL = process.env.BACKEND_API_URL


export async function authFetch(
  path: string,
  options: RequestInit = {}
) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value

  if (!accessToken) {
    return new Response(null, {
      status: 401,
    })
  }

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
