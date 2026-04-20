'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MessageCircle, Link2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { whatsappLink } from '@/lib/constants'

const schema = z.object({
  url: z.string().url('Ingresá una URL válida (ej: https://amazon.com/...)'),
  comentarios: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const inputClass = 'w-full bg-midnight border border-white/10 rounded-xl px-4 py-3 text-ghost placeholder-slate focus:outline-none focus:border-cyan/60 focus:ring-1 focus:ring-cyan/30 transition-colors text-sm'
const labelClass = 'text-sm font-medium text-ghost/80 mb-1.5 block'

export default function AsistenteForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    const mensaje =
      `Hola, quiero cotizar este producto:\n${data.url}\n\nComentarios: ${data.comentarios?.trim() || 'Ninguno'}`
    window.open(whatsappLink(mensaje), '_blank')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className={labelClass}>
          Link del producto <span className="text-status-red">*</span>
        </label>
        <div className="relative">
          <Link2 size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate pointer-events-none" />
          <input
            type="url"
            className={inputClass + ' pl-10'}
            placeholder="https://www.amazon.com/dp/..."
            {...register('url')}
          />
        </div>
        {errors.url && (
          <p className="text-xs text-status-red mt-1">{errors.url.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass}>
          Comentarios <span className="text-slate font-normal">(opcional)</span>
        </label>
        <textarea
          rows={3}
          className={inputClass + ' resize-none'}
          placeholder="Ej: quiero el color rojo, talla M, o cualquier detalle relevante..."
          {...register('comentarios')}
        />
      </div>

      <Button type="submit" size="lg" className="w-full" icon={<MessageCircle size={18} />}>
        Cotizar por WhatsApp
      </Button>
    </form>
  )
}
