import { NextResponse } from "next/server"
import { createTask } from "@/lib/server/tasks"

type RouteContext = {
  params: Promise<{
    projectId: string
  }>
}

export async function POST(request: Request, { params }: RouteContext) {
  const { projectId } = await params
  const body = await request.json()

  try {
    const task = await createTask(Number(projectId), body)
    return NextResponse.json(task)
  } catch {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    )
  }
}
