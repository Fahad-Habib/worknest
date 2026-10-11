import { authFetch } from "./authFetch"


export async function getCurrentUser() {
  const response = await authFetch('/users/me/')

  if (!response.ok) {
    return null
  }

  return response.json()
}
