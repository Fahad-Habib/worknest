import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
            WorkNest
          </p>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Organize projects.
            <br />
            Move work forward.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            A simple project management workspace for organizing tasks,
            tracking progress, and keeping your work in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/dashboard"
              className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-500"
            >
              Open Dashboard
            </Link>

            <Link
              href="/login"
              className="rounded-lg border border-slate-700 px-5 py-3 font-medium text-slate-200 transition hover:bg-slate-800"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold">
              Projects
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Keep related work grouped into focused projects.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold">
              Kanban Boards
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Move tasks between Todo, In Progress, and Done.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-semibold">
              Priorities
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Keep important work visible with clear task priorities.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}