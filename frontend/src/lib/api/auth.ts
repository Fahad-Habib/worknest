import { UserApi } from "@/types/api/user"
import { apiFetch } from "@/lib/api/client"
import mapUser from "@/lib/mappers/user"
import { User } from "@/types/user"

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

export type LoginPayload = {
  username: string
  password: string
}

export async function login(credentials: LoginPayload): Promise<void> {
  const response = await fetch(`${API_URL}/users/login/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error("Invalid username or password")
  }
}

export async function logout(): Promise<void> {
  const response = await fetch(`${API_URL}/users/logout/`, {
    method: "POST",
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error("Failed to logout")
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const response = await apiFetch("/users/me/")

  if (!response.ok) {
    return null
  }

  const responseData: UserApi = await response.json()

  return mapUser(responseData)
}
