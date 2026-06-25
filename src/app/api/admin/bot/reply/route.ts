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

  const { session_id, message } = await req.json()
  if (!session_id || !message) {
    return NextResponse.json({ error: 'session_id and message are required' }, { status: 400 })
  }

  try {
    const res = await fetch(`${apiUrl}/admin/reply`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id, message }),
    })
    if (!res.ok) return NextResponse.json({ error: 'nexobot_error' }, { status: 502 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'network' }, { status: 502 })
  }
}
