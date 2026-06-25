import { NextResponse } from 'next/server'
import { isAdminJwt } from '@/lib/adminAuth'

export async function POST(req: Request) {
  if (!isAdminJwt(req.headers.get('Authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { session_id, message } = await req.json()
  if (!session_id || !message) {
    return NextResponse.json({ error: 'session_id and message are required' }, { status: 400 })
  }

  // MOCK — reemplazar cuando nexobot implemente POST /admin/reply
  // const res = await fetch(`${process.env.NEXOBOT_API_URL}/admin/reply`, {
  //   method: 'POST',
  //   headers: { Authorization: `Bearer ${process.env.NEXOBOT_ADMIN_TOKEN}`, 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ session_id, message }),
  // })
  // if (!res.ok) return NextResponse.json({ error: 'nexobot_error' }, { status: 502 })

  return NextResponse.json({ ok: true })
}
