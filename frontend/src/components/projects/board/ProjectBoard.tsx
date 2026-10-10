'use client'

import { useState } from 'react'

import type { Task } from '@/types/task'
import type { Project } from '@/types/project'

import Button from '@/components/ui/Button'
import TaskColumn from './TaskColumn'
import TaskModal from './TaskModal'

type ProjectBoardProps = {
  project: Project
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


async function createTask(projectId: number, taskData: Omit<Task, 'id' | 'projectId'>) {
  const response = await fetch(`/api/projects/${projectId}/tasks/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  })

  if (!response.ok) {
    throw new Error('Failed to create Task.')
  }

  const resData: Task = await response.json()

  return resData
}


export default function ProjectBoard({
  project,
  initialTasks,
}: ProjectBoardProps) {
  const [tasks, setTasks] = useState(initialTasks)
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function handleTaskSubmission(
    taskData: Omit<Task, 'id' | 'projectId'>
  ) {

    const createdTask: Task = await createTask(project.id, taskData)

    setTasks(currentTasks => [
      ...currentTasks,
      createdTask,
    ])

    setIsModalOpen(false)
  }

  async function handleClose() {
    setIsModalOpen(false)
  }


  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {project.name}
          </h1>

          <p className="mt-1 text-slate-500">
            {project.description}
          </p>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>
          Add Task
        </Button>
      </div>

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
      {isModalOpen && (
        <TaskModal
          onClose={handleClose}
          onSubmit={handleTaskSubmission} 
        />
      )}
    </div>
  )
}