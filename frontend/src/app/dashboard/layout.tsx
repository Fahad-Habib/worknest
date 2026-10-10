import Sidebar from "@/components/dashboard/Sidebar"
import { authFetch } from "@/lib/server/authFetch"
import { notFound, redirect } from "next/navigation"


async function getCurrentUser() {
  const response = await authFetch('/users/me/')

  if (!response.ok) {
    return null
  }

  return response.json()
}


export default async function DashboardLayout({ children, }: {children: React.ReactNode}) {
  const user = await getCurrentUser()

  if (!user) {
    return redirect('/login')
  }

  return (
    <div className="grid min-h-screen grid-cols-[260px_1fr] bg-slate-100">
      <Sidebar />
      <main className="p-8">
        {children}
      </main>
    </div>
  )
}