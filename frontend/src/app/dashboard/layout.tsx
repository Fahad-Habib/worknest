import AuthProvider from "@/components/auth/AuthProvider"
import Sidebar from "@/components/dashboard/Sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="grid min-h-screen grid-cols-[260px_1fr] bg-slate-100">
        <Sidebar />
        <main className="p-8">{children}</main>
      </div>
    </AuthProvider>
  )
}
