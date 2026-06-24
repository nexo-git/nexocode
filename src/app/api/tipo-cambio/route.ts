import { NextResponse } from 'next/server'
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager'

const secretsClient = new SecretsManagerClient({ region: 'us-east-1' })

let cachedToken: string | null = null

async function getBccrToken(): Promise<string> {
  if (cachedToken) return cachedToken
  const cmd = new GetSecretValueCommand({ SecretId: 'BCCR_TOKEN' })
  const res = await secretsClient.send(cmd)
  cachedToken = res.SecretString ?? ''
  return cachedToken
}

function formatBccrDate(d: Date): string {
  const yyyy = d.getUTCFullYear()
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(d.getUTCDate()).padStart(2, '0')
  return `${yyyy}/${mm}/${dd}`
}

export async function GET() {
  let token: string
  try {
    token = process.env.BCCR_TOKEN ?? await getBccrToken()
  } catch {
    return NextResponse.json({ error: true, reason: 'secret_fetch_failed' }, { status: 500 })
  }

  if (!token) {
    return NextResponse.json({ error: true, reason: 'missing_token' }, { status: 500 })
  }

  // Consultamos los últimos 7 días para cubrir fines de semana y feriados
  const now = new Date()
  const crNow = new Date(now.getTime() - 6 * 60 * 60 * 1000) // UTC-6 Costa Rica
  const fin = formatBccrDate(crNow)
  const inicio = formatBccrDate(new Date(crNow.getTime() - 7 * 24 * 60 * 60 * 1000))

  const url = new URL(
    'https://apim.bccr.fi.cr/SDDE/api/Bccr.GE.SDDE.Publico.Indicadores.API/indicadoresEconomicos/318/series'
  )
  url.searchParams.set('fechaInicio', inicio)
  url.searchParams.set('fechaFin', fin)
  url.searchParams.set('idioma', 'ES')

  try {
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      next: { revalidate: 3600 }, // revalida cada hora
    })

    if (!res.ok) {
      return NextResponse.json({ error: true, reason: 'bccr_error' }, { status: 502 })
    }

    const json = await res.json()
    const series: { fecha: string; valorDatoPorPeriodo: number }[] = json?.datos?.[0]?.series ?? []

    // Tomamos el último dato disponible (el más reciente)
    const ultimo = series.filter(s => s.valorDatoPorPeriodo != null).at(-1)
    if (!ultimo) {
      return NextResponse.json({ error: true, reason: 'no_data' }, { status: 502 })
    }

    const venta = parseFloat(String(ultimo.valorDatoPorPeriodo))
    // Convertir fecha de BCCR (yyyy-mm-dd) a DD/MM/YYYY para mostrar
    const [y, m, d] = ultimo.fecha.split('-')
    return NextResponse.json({ venta, fecha: `${d}/${m}/${y}` })
  } catch {
    return NextResponse.json({ error: true, reason: 'network' }, { status: 502 })
  }
}
