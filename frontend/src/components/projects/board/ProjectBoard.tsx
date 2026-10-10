'use client'

import { useState } from 'react'

import type { Task } from '@/types/task'
import TaskColumn from './TaskColumn'

type ProjectBoardProps = {
  projectId: number
  initialTasks: Task[]
}

const columns = [
  {
    title: 'Todo',
    status: 'todo',
  },
  {
    title: 'In Progress',
    status: 'in-progress',
  },
  {
    title: 'Done',
    status: 'done',
  },
] as const


export default function ProjectBoard({
  projectId,
  initialTasks,
}: ProjectBoardProps) {
  const [tasks, setTasks] = useState(initialTasks)

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {columns.map(column => {
        const columnTasks = tasks.filter(
          task => task.status === column.status
        )

        return (
          <TaskColumn
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={columnTasks}
          />
        )
      })}
    </div>
  )
}