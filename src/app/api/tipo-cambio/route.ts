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

function costaRicaToday(): string {
  const now = new Date()
  const cr = new Date(now.getTime() - 6 * 60 * 60 * 1000)
  const yyyy = cr.getUTCFullYear()
  const mm = String(cr.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(cr.getUTCDate()).padStart(2, '0')
  return `${yyyy}/${mm}/${dd}`
}

export async function GET() {
  let token: string
  try {
    // En local usa env var, en producción lee de Secrets Manager
    token = process.env.BCCR_TOKEN ?? await getBccrToken()
  } catch {
    return NextResponse.json({ error: true, reason: 'secret_fetch_failed' }, { status: 500 })
  }

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
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      next: { revalidate: 43200 },
    })

    if (!res.ok) {
      return NextResponse.json({ error: true, reason: 'bccr_error' }, { status: 502 })
    }

    const json = await res.json()
    const valor = json?.datos?.[0]?.series?.[0]?.valorDatoPorPeriodo
    if (valor == null) {
      return NextResponse.json({ error: true, reason: 'no_data' }, { status: 502 })
    }

    const [y, m, d] = fecha.split('/')
    return NextResponse.json({ venta: parseFloat(valor), fecha: `${d}/${m}/${y}` })
  } catch {
    return NextResponse.json({ error: true, reason: 'network' }, { status: 502 })
  }
}
