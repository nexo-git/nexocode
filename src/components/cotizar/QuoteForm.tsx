'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import { CR_PROVINCES } from '@/lib/constants'
import { calculateQuote } from '@/lib/pricing'
import type { QuoteResult } from '@/types/quote'
import { Calculator, Info } from 'lucide-react'

const schema = z.object({
  destinationProvince: z.string().min(1, 'Seleccioná una provincia'),
  weightKg:            z.coerce.number().positive('El peso debe ser mayor a 0').max(200, 'Máximo 200 kg'),
  packageType:         z.enum(['envelope', 'small_box', 'medium_box', 'large_box']),
})

type FormData = z.infer<typeof schema>

interface QuoteFormProps {
  onResult: (result: QuoteResult) => void
}

const packageTypeOptions = [
  { value: 'envelope',   label: 'Sobre / Documento' },
  { value: 'small_box',  label: 'Paquete pequeño (hasta 5 kg)' },
  { value: 'medium_box', label: 'Paquete mediano (5–20 kg)' },
  { value: 'large_box',  label: 'Paquete grande (20+ kg)' },
]

export default function QuoteForm({ onResult }: QuoteFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      destinationProvince: '',
      weightKg: 1,
      packageType: 'small_box',
    },
  })

  const onSubmit = (data: FormData) => {
    const result = calculateQuote(data)
    onResult(result)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Select
        label="Provincia de destino (CR)"
        options={CR_PROVINCES.map(p => ({ value: p, label: p }))}
        placeholder="Seleccioná provincia"
        error={errors.destinationProvince?.message}
        {...register('destinationProvince')}
      />

      {/* Nota de zonas */}
      <div className="flex gap-2.5 bg-cyan/5 border border-cyan/20 rounded-xl px-4 py-3">
        <Info size={14} className="text-cyan shrink-0 mt-0.5" />
        <p className="text-xs text-slate leading-relaxed">
          <span className="text-ghost font-medium">Guápiles Centro:</span> entrega local gratis. Para otras zonas del país, el costo de entrega local está sujeto a las tarifas de la mensajería seleccionada por el cliente. Aplican restricciones.
        </p>
      </div>

      <Select
        label="Tipo de paquete"
        options={packageTypeOptions}
        error={errors.packageType?.message}
        {...register('packageType')}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-ghost/80">
          Peso estimado (kg)
        </label>
        <input
          type="number"
          step="0.1"
          min="0.1"
          placeholder="Ej: 2.5"
          className="w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 text-ghost placeholder-slate focus:outline-none focus:border-cyan/60 focus:ring-1 focus:ring-cyan/30 transition-colors"
          {...register('weightKg')}
        />
        {errors.weightKg && <p className="text-xs text-status-red">{errors.weightKg.message}</p>}
      </div>

      <Button type="submit" size="lg" className="w-full" icon={<Calculator size={18} />}>
        Calcular precio
      </Button>
    </form>
  )
}
