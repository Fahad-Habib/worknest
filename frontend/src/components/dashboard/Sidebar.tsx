import Link from 'next/link'
import SidebarNav from './SidebarNav'
import LogoutButton from './LogoutButton'


export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen flex-col bg-slate-900 px-6 py-8 text-white">
      <h2 className="mb-12 text-2xl font-bold">
        WorkNest
      </h2>

      <SidebarNav />

      <div className="mt-auto">
        <LogoutButton />
      </div>
    </aside>
  )
}