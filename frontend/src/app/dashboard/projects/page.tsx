import ProjectsPage from "@/components/projects/ProjectsPage"
import { getProjects } from "@/lib/server/projects"

export default async function ClientProjectsPage() {
  const projects = await getProjects()

  return (
    <main>
      <ProjectsPage initialProjects={projects} />
    </main>
  )
}
