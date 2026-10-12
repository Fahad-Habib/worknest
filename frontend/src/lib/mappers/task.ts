import type { TaskApi } from "@/types/api/task"
import type { Task } from "@/types/task"

export default function mapTask(task: TaskApi): Task {
  return {
    id: task.id,
    projectId: task.project_id,
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
  }
}
