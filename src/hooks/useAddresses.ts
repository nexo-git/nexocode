'use client'

import { useEffect, useState } from 'react'
import { getMyAddresses } from '@/lib/addresses'
import type { NexoAddress } from '@/types/casillero'

export function useAddresses() {
  const [addresses, setAddresses] = useState<NexoAddress[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getMyAddresses()
      .then(setAddresses)
      .catch(() => setError('No se pudieron cargar las direcciones.'))
      .finally(() => setLoading(false))
  }, [])

  return { addresses, loading, error, setAddresses }
}
