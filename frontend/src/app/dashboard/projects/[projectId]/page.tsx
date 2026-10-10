import ProjectBoard from '@/components/projects/board/ProjectBoard'
import Button from '@/components/ui/Button'
import { notFound } from 'next/navigation'
import { getProject } from '@/lib/server/projects'
import { getProjectTasks } from '@/lib/server/tasks'


type ProjectPageProps = {
  params: Promise<{projectId: string}>
}


export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { projectId } = await params

  const project = await getProject(projectId)

  if (!project) {
    notFound()
  }

  const projectTasks = await getProjectTasks(projectId)

  return (
    <main>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {project.name}
          </h1>

          <p className="mt-1 text-slate-500">
            {project.description}
          </p>
        </div>

        <Button>
          Add Task
        </Button>
      </div>
      <ProjectBoard projectId={project.id} initialTasks={projectTasks} />
    </main>
  )
}
