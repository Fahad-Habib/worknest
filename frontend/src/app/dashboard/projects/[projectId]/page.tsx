"use client"

import { notFound, useParams } from "next/navigation"

import { useEffect, useState } from "react"

import type { Task } from "@/types/task"
import type { Project } from "@/types/project"

import Button from "@/components/ui/Button"
import ConfirmModal from "@/components/ui/ConfirmModal"
import TaskColumn from "@/components/projects/board/TaskColumn"
import TaskModal from "@/components/projects/board/TaskModal"
import { getProject } from "@/lib/api/projects"
import { createTask, deleteTask, getTasks, updateTask } from "@/lib/api/tasks"

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

export default function ProjectPage() {
  const params = useParams<{ projectId: string }>()
  const projectId = params.projectId

  const [project, setProject] = useState<Project | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [editTask, setEditTask] = useState<Task | null>(null)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)

  useEffect(() => {
    async function loadProjects() {
      try {
        const project = await getProject(projectId)
        if (!project) {
          notFound()
        }
        setProject(project)
        const projectTasks = await getTasks(projectId)
        setTasks(projectTasks)
      } catch (error) {
        console.error("Failed to load project details", error)
      }
    }

    loadProjects()
  }, [projectId])

  async function handleTaskSubmission(
    taskId: number | null,
    taskData: Omit<Task, "id" | "projectId">
  ) {
    if (taskId === null) {
      const createdTask: Task = await createTask(Number(projectId), taskData)

      setTasks((currentTasks) => [...currentTasks, createdTask])
    } else {
      const updatedTask: Task = await updateTask(
        taskId,
        Number(projectId),
        taskData
      )
      setTasks(
        tasks.map((existingTask) =>
          existingTask.id === taskId ? updatedTask : existingTask
        )
      )
    }

    setEditTask(null)
    setIsModalOpen(false)
  }

  function handleModalClose() {
    setEditTask(null)
    setIsModalOpen(false)
  }

  function handleEditTask(task: Task) {
    setEditTask(task)
    setIsModalOpen(true)
  }

  function handleDeleteTask(task: Task) {
    setTaskToDelete(task)
  }

  async function handleTaskDeletion(taskId: number) {
    await deleteTask(taskId, Number(projectId))
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    )
    setTaskToDelete(null)
  }

  if (!project) {
    return <p>Project not found.</p>
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
