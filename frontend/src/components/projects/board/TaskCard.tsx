import type { Task } from "@/types/task"

type TaskCardProps = {
  task: Task
  onEditTask: (task: Task) => void
  onDeleteTask: (task: Task) => void
}

function PriorityBadge({ priority }: { priority: Task["priority"] }) {
  const styles = {
    low: "bg-emerald-100 text-emerald-700",
    medium: "bg-amber-100 text-amber-700",
    high: "bg-red-100 text-red-700",
  }

  return (
    <span
      className={`rounded-md px-2.5 py-1 text-xs font-semibold uppercase ${styles[priority]}`}
    >
      {priority}
    </span>
  )
}

export default function TaskCard({
  task,
  onEditTask,
  onDeleteTask,
}: TaskCardProps) {
  return (
    <article
      draggable
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <h3 className="font-semibold text-slate-900">{task.title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {task.description}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <PriorityBadge priority={task.priority} />

        <div className="flex gap-2">
          <button
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            onClick={() => onEditTask(task)}
          >
            Edit
          </button>

          <button
            className="text-sm font-medium text-red-600 hover:text-red-500"
            onClick={() => onDeleteTask(task)}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}
