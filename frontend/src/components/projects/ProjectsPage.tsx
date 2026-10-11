"use client"

import ProjectCard from "@/components/projects/ProjectCard"
import Button from "@/components/ui/Button"
import { Project } from "@/types/project"
import { useState } from "react"
import ProjectModal from "./ProjectModal"

type ProjectsPageProps = {
  initialProjects: Project[]
}

async function createProject(
  projectData: Omit<Project, "id">
): Promise<Project> {
  const response = await fetch(`/api/projects/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  })

  if (!response.ok) {
    throw new Error("Failed to create Project.")
  }

  const resData: Project = await response.json()

  return resData
}

export default function ProjectsPage({ initialProjects }: ProjectsPageProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  async function handleCreateProject(projectData: Omit<Project, "id">) {
    const newProject: Project = await createProject(projectData)

    setProjects((currentProjects) => [...currentProjects, newProject])

    setIsModalOpen(false)
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Projects
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your projects and tasks.
          </p>
        </div>

        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          New Project
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {isModalOpen && (
        <ProjectModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateProject}
        />
      )}
    </div>
  )
}
