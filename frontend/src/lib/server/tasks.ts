import { authFetch } from './authFetch'
import type { Task, TaskApi } from '@/types/task'


function mapTask(task: TaskApi): Task {
  return {
    id: task.id,
    projectId: task.project_id,
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
  }
}


export async function getProjectTasks(projectId: string): Promise<Task[]> {
  const response = await authFetch(`/projects/${projectId}/tasks/`)

  if (!response.ok) {
    throw new Error('Failed to fetch tasks')
  }

  const responseData: TaskApi[] = await response.json()

  return responseData.map(mapTask)
}
