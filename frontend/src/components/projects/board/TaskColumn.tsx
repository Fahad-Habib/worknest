import type { Task, TaskStatus } from "@/types/task"

import TaskCard from "./TaskCard"

type TaskColumnProps = {
  title: string
  status: TaskStatus
  tasks: Task[]
  onEditTask: (task: Task) => void
  onDeleteTask: (task: Task) => void
}

export default function TaskColumn({
  title,
  tasks,
  onEditTask,
  onDeleteTask,
}: TaskColumnProps) {
  return (
    <section className="min-h-[520px] rounded-xl border border-slate-200 bg-slate-100 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>

        <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700">
          {tasks.length}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {tasks.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">No tasks</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          ))
        )}
      </div>
    </section>
  )
}
