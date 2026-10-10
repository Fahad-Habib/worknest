'use client'

import Select from "@/components/ui/Select"
import { Task, TaskPriority, TaskStatus } from "@/types/task"
import { SubmitEvent, useState } from "react"


type TaskModalProps = {
  onClose: () => void
  onSubmit: (task: Omit<Task, 'id' | 'projectId'>) => void
}


export default function TaskModal({ onClose, onSubmit }: TaskModalProps) {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const [status, setStatus] = useState<TaskStatus>('todo')

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const submittedTask: Omit<Task, 'id' | 'projectId'> = {
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
    }

    onSubmit(submittedTask)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Add Task
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create a new task for this project.
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg px-3 py-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Title
            </label>

            <input
              id="title"
              type="text"
              placeholder="Enter task title"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
              autoFocus
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Description
            </label>

            <textarea
              id="description"
              rows={4}
              placeholder="Enter task description"
              className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
              <Select
                id="priority"
                label="Priority"
                value={priority}
                onChange={event => setPriority(event.target.value as TaskPriority)}
                options={[
                  { label: 'Low', value: 'low' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'High', value: 'high' },
                ]}
              />

              <Select
                id="status"
                label="Status"
                value={status}
                onChange={event => setStatus(event.target.value as TaskStatus)}
                options={[
                  { label: 'Todo', value: 'todo' },
                  { label: 'In Progress', value: 'in-progress' },
                  { label: 'Done', value: 'done' },
                ]}
              />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}