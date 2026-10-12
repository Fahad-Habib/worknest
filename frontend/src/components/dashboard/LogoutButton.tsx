"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { logout } from "@/lib/api/auth"

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    try {
      await logout()
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-slate-300 transition hover:bg-red-500/10 hover:text-red-400"
    >
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  )
}
