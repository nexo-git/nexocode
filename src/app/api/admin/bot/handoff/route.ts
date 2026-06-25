import { NextResponse } from 'next/server'
import { isAdminJwt } from '@/lib/adminAuth'

export async function POST(req: Request) {
  if (!isAdminJwt(req.headers.get('Authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiUrl = process.env.NEXOBOT_API_URL
  const token  = process.env.NEXOBOT_ADMIN_TOKEN
  if (!apiUrl || !token) {
    return NextResponse.json({ error: 'nexobot_not_configured' }, { status: 500 })
  }

  const { session_id, action } = await req.json()
  if (!session_id || !['pause', 'resume'].includes(action)) {
    return NextResponse.json({ error: 'session_id and action (pause|resume) are required' }, { status: 400 })
  }

  const url = `${apiUrl}/admin/handoff?action=${action}&session=${encodeURIComponent(session_id)}&token=${encodeURIComponent(token)}`
  try {
    const res = await fetch(url)
    if (!res.ok) return NextResponse.json({ error: 'nexobot_error' }, { status: 502 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'network' }, { status: 502 })
  }
}
