import { NextResponse } from 'next/server'
import { isAdminJwt } from '@/lib/adminAuth'
import type { BotConversationDetail } from '@/types/bot'

const now = () => Math.floor(Date.now() / 1000)

function mockDetail(session_id: string): BotConversationDetail {
  const phone = session_id.replace('whatsapp_', '')
  const human_mode = session_id === 'whatsapp_50672334455'
  return {
    session_id,
    human_mode,
    messages: [
      { sk: `${now() - 900}#aaa`, role: 'user',      content: 'Hola, buenos días! Quería consultar sobre el servicio de casillero.',            timestamp: now() - 900 },
      { sk: `${now() - 840}#bbb`, role: 'assistant',  content: 'Hola! 👋 Soy el asistente de nexo courier. Con gusto te ayudo. ¿Qué necesitás saber?', timestamp: now() - 840 },
      { sk: `${now() - 780}#ccc`, role: 'user',       content: `Cuánto cuesta enviar un paquete de 2kg desde Miami? Es para el número ${phone}.`,  timestamp: now() - 780 },
      { sk: `${now() - 720}#ddd`, role: 'assistant',  content: 'Un paquete de 2kg tiene un costo aproximado de $14. El tiempo estimado de entrega es de 5-10 días hábiles una vez que llega a nuestra bodega en Miami.', timestamp: now() - 720 },
      { sk: `${now() - 120}#eee`, role: 'user',       content: 'Perfecto, muchas gracias por la ayuda!', timestamp: now() - 120 },
    ],
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ session_id: string }> }
) {
  if (!isAdminJwt(req.headers.get('Authorization'))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { session_id } = await params

  // MOCK — reemplazar cuando nexobot implemente GET /admin/conversations/{session_id}
  // const res = await fetch(`${process.env.NEXOBOT_API_URL}/admin/conversations/${session_id}?token=${process.env.NEXOBOT_ADMIN_TOKEN}`)
  // const data = await res.json()
  // return NextResponse.json(data)

  return NextResponse.json(mockDetail(session_id))
}
