import { NextResponse } from "next/server"

const API_URL = process.env.BACKEND_API_URL

export async function POST(request: Request) {
  const body = await request.json()

  const response = await fetch(`${API_URL}/users/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    return NextResponse.json({ detail: "Invalid credentials" }, { status: 401 })
  }

  const data = await response.json()

  const nextResponse = NextResponse.json({ success: true })

  nextResponse.cookies.set("access_token", data.access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  })

  nextResponse.cookies.set("refresh_token", data.refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })

  return nextResponse
}
