import type { Project } from "@/types/project"
import { authFetch } from "./authFetch"

export async function getProjects(): Promise<Project[]> {
  const response = await authFetch("/projects/")

  if (!response.ok) {
    throw new Error("Failed to fetch projects")
  }

  return response.json()
}

export async function getProject(projectId: string): Promise<Project | null> {
  const response = await authFetch(`/projects/${projectId}`)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error("Failed to fetch project")
  }

  return response.json()
}
