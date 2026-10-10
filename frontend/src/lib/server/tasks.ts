import { authFetch } from './authFetch'
import type { Task, TaskApi } from '@/types/task'
import mapTask from '@/lib/mappers/task';


export async function getProjectTasks(projectId: string): Promise<Task[]> {
  const response = await authFetch(`/projects/${projectId}/tasks/`)

  if (!response.ok) {
    throw new Error('Failed to fetch tasks')
  }

  const responseData: TaskApi[] = await response.json()

  return responseData.map(mapTask)
}


export async function createTask(projectId: number, taskData: Omit<Task, 'id' | 'projectId'>): Promise<Task> {
  const response = await authFetch(
    `/projects/${projectId}/tasks/`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(taskData),
    }
  )

  if (!response.ok) {
    throw new Error('Failed to create task')
  }

  const responseData: TaskApi = await response.json()

  return mapTask(responseData)
}
