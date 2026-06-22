import { NextResponse } from 'next/server'

function costaRicaToday(): string {
  const now = new Date()
  // UTC-6 (Costa Rica no usa horario de verano)
  const cr = new Date(now.getTime() - 6 * 60 * 60 * 1000)
  const yyyy = cr.getUTCFullYear()
  const mm = String(cr.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(cr.getUTCDate()).padStart(2, '0')
  return `${yyyy}/${mm}/${dd}` // formato requerido por BCCR SDDE
}

export async function GET() {
  const token = process.env.BCCR_TOKEN

  if (!token) {
    return NextResponse.json({ error: true, reason: 'missing_token' }, { status: 500 })
  }

  const fecha = costaRicaToday()
  const url = new URL(
    'https://apim.bccr.fi.cr/SDDE/api/Bccr.GE.SDDE.Publico.Indicadores.API/indicadoresEconomicos/318/series'
  )
  url.searchParams.set('fechaInicio', fecha)
  url.searchParams.set('fechaFin', fecha)
  url.searchParams.set('idioma', 'ES')

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 43200 }, // cachea 12h — BCCR actualiza una vez al día
    })

    if (!res.ok) {
      return NextResponse.json({ error: true, reason: 'bccr_error' }, { status: 502 })
    }

    const json = await res.json()

    const valor = json?.datos?.[0]?.series?.[0]?.valorDatoPorPeriodo
    if (valor == null) {
      return NextResponse.json({ error: true, reason: 'no_data' }, { status: 502 })
    }

    const venta = parseFloat(valor)
    // Devolvemos fecha en formato DD/MM/YYYY para mostrar en el modal
    const [y, m, d] = fecha.split('/')
    return NextResponse.json({ venta, fecha: `${d}/${m}/${y}` })
  } catch {
    return NextResponse.json({ error: true, reason: 'network' }, { status: 502 })
  }
}
