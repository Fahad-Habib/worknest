"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import LoginForm from "@/components/auth/LoginForm"
import { getCurrentUser } from "@/lib/api/auth"
import { AuthenticationError } from "@/lib/api/errors"

export default function LoginPage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    async function checkAuth() {
      try {
        await getCurrentUser()

        router.replace("/dashboard")
      } catch (error) {
        if (!(error instanceof AuthenticationError)) {
          console.error("Failed to check authentication:", error)
        }

        setCheckingAuth(false)
      }
    }

    checkAuth()
  }, [router])

  if (checkingAuth) {
    return null
  }

  return <LoginForm />
}
