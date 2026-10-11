import "server-only"

import { cookies } from "next/headers"
import { refreshAccessToken } from "./refreshAccessToken"

const API_URL = process.env.BACKEND_API_URL

async function fetchWithToken(
  path: string,
  accessToken: string,
  options: RequestInit
) {
  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export async function authFetch(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get("access_token")?.value

  if (!accessToken) {
    return new Response(null, {
      status: 401,
    })
  }

  let response = await fetchWithToken(path, accessToken, options)

  if (response.status !== 401) {
    return response
  }

  const newAccessToken = await refreshAccessToken()

  if (!newAccessToken) {
    return response
  }

  response = await fetchWithToken(path, newAccessToken, options)

  return response
}
