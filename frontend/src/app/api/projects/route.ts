import { NextResponse } from "next/server"
import { createProject } from "@/lib/server/projects"

export async function POST(request: Request) {
  const body = await request.json()

  try {
    const task = await createProject(body)
    return NextResponse.json(task)
  } catch {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}
