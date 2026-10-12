import { AuthenticationError } from "@/lib/api/errors"

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

let refreshPromise: Promise<boolean> | null = null

async function refreshAccessToken(): Promise<boolean> {
  const response = await fetch(`${API_URL}/users/token/refresh/`, {
    method: "POST",
    credentials: "include",
  })

  return response.ok
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  let response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  if (response.status !== 401) {
    return response
  }

  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null
    })
  }

  const refreshed = await refreshPromise

  if (!refreshed) {
    throw new AuthenticationError()
  }

  response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  if (response.status === 401) {
    throw new AuthenticationError()
  }

  return response
}
