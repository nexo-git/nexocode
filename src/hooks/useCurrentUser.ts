'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { fetchAuthSession } from 'aws-amplify/auth'
import { getCurrentUser } from '@/lib/casillero'
import type { NexoUser } from '@/types/casillero'

interface Options {
  adminOnly?: boolean
}

export function useCurrentUser(options?: Options) {
  const [user, setUser] = useState<NexoUser | null>(null)
  const [ready, setReady] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    getCurrentUser().then(async (u) => {
      // `next` hace que el login vuelva a esta página (ej: la app de admin abre directo en /admin)
      if (!u) { router.replace(`/login?next=${encodeURIComponent(pathname)}`); return }
      if (options?.adminOnly) {
        const session = await fetchAuthSession()
        const groups = (session.tokens?.idToken?.payload['cognito:groups'] as string[]) ?? []
        if (!groups.includes('admin')) { router.replace('/casillero'); return }
      }
      setUser(u)
      setReady(true)
    })
  // router es estable entre renders — el efecto solo debe correr al montar
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { user, ready }
}
