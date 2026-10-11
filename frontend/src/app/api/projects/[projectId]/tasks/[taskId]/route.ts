import { NextResponse } from "next/server"

import { deleteTask, updateTask } from "@/lib/server/tasks"

type RouteContext = {
  params: Promise<{
    projectId: string
    taskId: string
  }>
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const { projectId, taskId } = await params
  const body = await request.json()

  try {
    const task = await updateTask(Number(taskId), Number(projectId), body)

    return NextResponse.json(task)
  } catch {
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  const { projectId, taskId } = await params

  try {
    await deleteTask(Number(taskId), Number(projectId))
    return NextResponse.json({ status: 204 })
  } catch {
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    )
  }
}
