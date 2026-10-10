import { NextResponse } from 'next/server'
import { authFetch } from '@/lib/server/authFetch'
import mapTask from '@/lib/mappers/task'


type RouteContext = {
  params: Promise<{
    projectId: string
  }>
}

export async function POST(request: Request, { params }: RouteContext) {
  const { projectId } = await params
  const body = await request.json()

  const response = await authFetch(
    `/projects/${projectId}/tasks/`,
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    }
  )

  const data = await response.json()

  return NextResponse.json(mapTask(data), {
    status: response.status,
  })
}
