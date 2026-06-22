import { NextResponse } from 'next/server'

function costaRicaToday(): string {
  const now = new Date()
  // UTC-6 (Costa Rica no usa horario de verano)
  const cr = new Date(now.getTime() - 6 * 60 * 60 * 1000)
  const dd = String(cr.getUTCDate()).padStart(2, '0')
  const mm = String(cr.getUTCMonth() + 1).padStart(2, '0')
  const yyyy = cr.getUTCFullYear()
  return `${dd}/${mm}/${yyyy}`
}

export async function GET() {
  const email = process.env.BCCR_EMAIL
  const token = process.env.BCCR_TOKEN

  if (!email || !token) {
    return NextResponse.json({ error: true, reason: 'missing_credentials' }, { status: 500 })
  }

  const fecha = costaRicaToday()
  const url = new URL('https://gee.bccr.fi.cr/Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx/ObtenerIndicadoresEconomicos')
  url.searchParams.set('Indicador', '318')
  url.searchParams.set('FechaInicio', fecha)
  url.searchParams.set('FechaFinal', fecha)
  url.searchParams.set('Nombre', 'nexocourier')
  url.searchParams.set('SubNiveles', 'N')
  url.searchParams.set('CorreoElectronico', email)
  url.searchParams.set('Token', token)

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 43200 }, // cachea 12h — BCCR actualiza una vez al día
    })

    if (!res.ok) {
      return NextResponse.json({ error: true, reason: 'bccr_error' }, { status: 502 })
    }

    const xml = await res.text()

    const match = xml.match(/<NUM_VALOR>([\d.]+)<\/NUM_VALOR>/)
    if (!match) {
      return NextResponse.json({ error: true, reason: 'no_data' }, { status: 502 })
    }

    const venta = parseFloat(match[1])
    return NextResponse.json({ venta, fecha })
  } catch {
    return NextResponse.json({ error: true, reason: 'network' }, { status: 502 })
  }
}
