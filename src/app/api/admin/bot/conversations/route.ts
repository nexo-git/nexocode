import { NextResponse } from 'next/server'
import { isAdminJwt } from '@/lib/adminAuth'

export async function GET(req: Request) {
  if (!isAdminJwt(req.headers.get('Authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiUrl = process.env.NEXOBOT_API_URL
  const token  = process.env.NEXOBOT_ADMIN_TOKEN
  if (!apiUrl || !token) {
    return NextResponse.json({ error: 'nexobot_not_configured' }, { status: 500 })
  }

  try {
    const res = await fetch(`${apiUrl}/admin/conversations?token=${token}`, { cache: 'no-store' })
    if (!res.ok) return NextResponse.json({ error: 'nexobot_error' }, { status: 502 })
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'network' }, { status: 502 })
  }
}
