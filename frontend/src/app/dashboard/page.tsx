"use client"

import Link from "next/link"

import { getProjects } from "@/lib/api/projects"
import { useEffect, useState } from "react"
import { Project } from "@/types/project"
import { useAuth } from "@/components/auth/AuthProvider"

export default function DashboardPage() {
  const { user } = useAuth()

  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (error) {
        console.error("Failed to load projects", error)
      }
    }

    loadProjects()
  }, [])

  const recentProjects = projects.slice(0, 3)

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Welcome back, {user?.firstName}
        </h1>

        <p className="mt-1 text-slate-500">
          Here&apos;s what&apos;s happening across your workspace.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Projects</p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {projects.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Active Projects</p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {projects.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Completed Tasks</p>

          <p className="mt-2 text-3xl font-bold text-slate-900">0</p>
        </div>
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Recent Projects
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Jump back into your latest work.
            </p>
          </div>

          <Link
            href="/dashboard/projects"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all
          </Link>
        </div>

        {recentProjects.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h3 className="font-semibold text-slate-900">No projects yet</h3>

            <p className="mt-1 text-sm text-slate-500">
              Create your first project to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recentProjects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="font-semibold text-slate-900">{project.name}</h3>

                <p className="mt-2 text-sm text-slate-500">
                  {project.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
