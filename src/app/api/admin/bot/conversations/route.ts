import { NextResponse } from 'next/server'
import { isAdminJwt } from '@/lib/adminAuth'
import type { BotConversation } from '@/types/bot'

const now = () => Math.floor(Date.now() / 1000)

const MOCK_CONVERSATIONS: BotConversation[] = [
  {
    session_id: 'whatsapp_50688112233',
    phone_number: '50688112233',
    human_mode: false,
    last_message: 'Cuánto cuesta enviar un paquete de 2kg desde Miami?',
    last_message_role: 'user',
    last_activity: now() - 120,
  },
  {
    session_id: 'whatsapp_50672334455',
    phone_number: '50672334455',
    human_mode: true,
    last_message: 'Perfecto, muchas gracias por la ayuda!',
    last_message_role: 'user',
    last_activity: now() - 3600,
  },
  {
    session_id: 'whatsapp_50683445566',
    phone_number: '50683445566',
    human_mode: false,
    last_message: 'Ya recibí la notificación, excelente servicio.',
    last_message_role: 'user',
    last_activity: now() - 7200,
  },
]

export async function GET(req: Request) {
  if (!isAdminJwt(req.headers.get('Authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // MOCK — reemplazar cuando nexobot implemente GET /admin/conversations
  // const res = await fetch(`${process.env.NEXOBOT_API_URL}/admin/conversations?token=${process.env.NEXOBOT_ADMIN_TOKEN}`)
  // const data = await res.json()
  // return NextResponse.json(data)

  return NextResponse.json({ conversations: MOCK_CONVERSATIONS })
}
