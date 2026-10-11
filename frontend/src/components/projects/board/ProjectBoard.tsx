"use client"

import { useState } from "react"

import type { Task } from "@/types/task"
import type { Project } from "@/types/project"

import Button from "@/components/ui/Button"
import TaskColumn from "./TaskColumn"
import TaskModal from "./TaskModal"
import ConfirmModal from "@/components/ui/ConfirmModal"

type ProjectBoardProps = {
  project: Project
  initialTasks: Task[]
}

const columns = [
  {
    title: "Todo",
    status: "todo",
  },
  {
    title: "In Progress",
    status: "in-progress",
  },
  {
    title: "Done",
    status: "done",
  },
] as const

async function createTask(
  projectId: number,
  taskData: Omit<Task, "id" | "projectId">
) {
  const response = await fetch(`/api/projects/${projectId}/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  })

  if (!response.ok) {
    throw new Error("Failed to create Task.")
  }

  const resData: Task = await response.json()

  return resData
}

async function updateTask(
  taskId: number,
  projectId: number,
  taskData: Omit<Task, "id" | "projectId">
) {
  const response = await fetch(`/api/projects/${projectId}/tasks/${taskId}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  })

  if (!response.ok) {
    throw new Error("Failed to update Task.")
  }

  const resData: Task = await response.json()

  return resData
}

async function deleteTask(taskId: number, projectId: number) {
  const response = await fetch(`/api/projects/${projectId}/tasks/${taskId}/`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete Task.")
  }
}

export default function ProjectBoard({
  project,
  initialTasks,
}: ProjectBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [editTask, setEditTask] = useState<Task | null>(null)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)

  async function handleTaskSubmission(
    taskId: number | null,
    taskData: Omit<Task, "id" | "projectId">
  ) {
    if (taskId === null) {
      const createdTask: Task = await createTask(project.id, taskData)

      setTasks((currentTasks) => [...currentTasks, createdTask])
    } else {
      const updatedTask: Task = await updateTask(taskId, project.id, taskData)
      setTasks(
        tasks.map((existingTask) =>
          existingTask.id === taskId ? updatedTask : existingTask
        )
      )
    }

    setEditTask(null)
    setIsModalOpen(false)
  }

  async function handleModalClose() {
    setEditTask(null)
    setIsModalOpen(false)
  }

  async function handleEditTask(task: Task) {
    setEditTask(task)
    setIsModalOpen(true)
  }

  async function handleDeleteTask(task: Task) {
    setTaskToDelete(task)
  }

  async function handleTaskDeletion(taskId: number) {
    deleteTask(taskId, project.id)
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    )
    setTaskToDelete(null)
  }

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {project.name}
          </h1>

          <p className="mt-1 text-slate-500">{project.description}</p>
        </div>

        <Button onClick={() => setIsModalOpen(true)}>Add Task</Button>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {columns.map((column) => {
          const columnTasks = tasks.filter(
            (task) => task.status === column.status
          )

          return (
            <TaskColumn
              key={column.status}
              title={column.title}
              status={column.status}
              tasks={columnTasks}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          )
        })}
      </div>
      {isModalOpen && (
        <TaskModal
          task={editTask}
          onClose={handleModalClose}
          onSubmit={handleTaskSubmission}
        />
      )}
      {taskToDelete && (
        <ConfirmModal
          title="Delete task?"
          message={`Are you sure you want to delete "${taskToDelete.title}"? This action cannot be undone.`}
          onCancel={() => setTaskToDelete(null)}
          onConfirm={() => handleTaskDeletion(taskToDelete.id)}
        />
      )}
    </div>
  )
}
