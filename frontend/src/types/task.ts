export type TaskPriority = "low" | "medium" | "high"

export type TaskStatus = "todo" | "in-progress" | "done"

export type Task = {
  id: number
  projectId: number
  title: string
  description: string
  priority: TaskPriority
  status: TaskStatus
}
