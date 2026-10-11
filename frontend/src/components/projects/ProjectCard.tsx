import Link from "next/link"
import type { Project } from "@/types/project"

type ProjectCardProps = {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/dashboard/projects/${project.id}`}
      className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <h2 className="text-lg font-semibold text-slate-900">{project.name}</h2>

      <p className="mt-2 text-sm text-slate-600">{project.description}</p>
    </Link>
  )
}
