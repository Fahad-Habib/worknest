import type { Project } from "@/types/project"
import { apiFetch } from "@/lib/api/client"

export async function getProjects(): Promise<Project[]> {
  const response = await apiFetch("/projects/")

  if (!response.ok) {
    throw new Error("Failed to fetch projects")
  }

  return response.json()
}

export async function createProject(
  projectData: Omit<Project, "id">
): Promise<Project> {
  const response = await apiFetch(`/projects/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectData),
  })

  if (!response.ok) {
    throw new Error("Failed to create project")
  }

  return response.json()
}

export async function getProject(projectId: string): Promise<Project | null> {
  const response = await apiFetch(`/projects/${projectId}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error("Failed to fetch project")
  }

  return response.json()
}
