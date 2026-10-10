import ProjectCard from '@/components/projects/ProjectCard'
import Button from '@/components/ui/Button'
import { getProjects } from '@/lib/server/projects'


export default async function ProjectsPage() {
  const projects = await getProjects()

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

        <Button variant='primary'>
          New Project
        </Button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </div>
  )
}