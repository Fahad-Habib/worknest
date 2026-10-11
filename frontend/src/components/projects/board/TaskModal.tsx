'use client'

import { useState } from 'react'
import type { SubmitEvent } from 'react'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'

import type {
  Task,
  TaskPriority,
  TaskStatus,
} from '@/types/task'

type TaskModalProps = {
  onClose: () => void
  onSubmit: (
    task: Omit<Task, 'id' | 'projectId'>
  ) => void
}

export default function TaskModal({
  onClose,
  onSubmit,
}: TaskModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] =
    useState<TaskPriority>('medium')
  const [status, setStatus] =
    useState<TaskStatus>('todo')

  function handleSubmit(
    event: SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    const submittedTask: Omit<
      Task,
      'id' | 'projectId'
    > = {
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
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >
          <Input
            id="title"
            label="Title"
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={event =>
              setTitle(event.target.value)
            }
            required
            autoFocus
          />

          <Textarea
            id="description"
            label="Description"
            rows={4}
            placeholder="Enter task description"
            value={description}
            onChange={event =>
              setDescription(event.target.value)
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              id="priority"
              label="Priority"
              value={priority}
              onChange={event =>
                setPriority(
                  event.target.value as TaskPriority
                )
              }
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
              onChange={event =>
                setStatus(
                  event.target.value as TaskStatus
                )
              }
              options={[
                { label: 'Todo', value: 'todo' },
                {
                  label: 'In Progress',
                  value: 'in-progress',
                },
                { label: 'Done', value: 'done' },
              ]}
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
            >
              Add Task
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}