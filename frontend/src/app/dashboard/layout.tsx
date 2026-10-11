import Sidebar from "@/components/dashboard/Sidebar"
import { authFetch } from "@/lib/server/authFetch"
import { getCurrentUser } from "@/lib/server/users"
import { notFound, redirect } from "next/navigation"


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