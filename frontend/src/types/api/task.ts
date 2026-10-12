import type { TaskPriority, TaskStatus } from "@/types/task"

export type TaskApi = {
  id: number
  project_id: number
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
}
