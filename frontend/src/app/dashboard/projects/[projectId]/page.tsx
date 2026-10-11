import ProjectBoard from "@/components/projects/board/ProjectBoard"
import { notFound } from "next/navigation"
import { getProject } from "@/lib/server/projects"
import { getProjectTasks } from "@/lib/server/tasks"

type ProjectPageProps = {
  params: Promise<{ projectId: string }>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectId } = await params

  const project = await getProject(projectId)

  if (!project) {
    notFound()
  }

  const projectTasks = await getProjectTasks(projectId)

  return (
    <main>
      <ProjectBoard project={project} initialTasks={projectTasks} />
    </main>
  )
}
