"use client"

import { useState } from "react"
import type { SubmitEvent } from "react"

import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Textarea from "@/components/ui/Textarea"

type NewProjectModalProps = {
  onClose: () => void
  onSubmit: (project: { name: string; description: string }) => void
}

export default function ProjectModal({
  onClose,
  onSubmit,
}: NewProjectModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    onSubmit({
      name: name.trim(),
      description: description.trim(),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              New Project
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create a new project to organize your tasks.
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

        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input
            id="name"
            label="Name"
            type="text"
            placeholder="Enter project name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            autoFocus
          />

          <Textarea
            id="description"
            label="Description"
            rows={4}
            placeholder="Enter project description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" variant="primary">
              Create Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
