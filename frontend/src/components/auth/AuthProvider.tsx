"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { getCurrentUser } from "@/lib/api/auth"
import { AuthenticationError } from "@/lib/api/errors"
import type { User } from "@/types/user"

type AuthContextValue = {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = await getCurrentUser()

        setUser(currentUser)
      } catch (error) {
        if (error instanceof AuthenticationError) {
          router.replace("/login")
          return
        }

        console.error("Failed to load current user:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [router])

  if (loading) {
    return <p>Loading...</p>
  }

  if (!user) {
    return null
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }

  return context
}
