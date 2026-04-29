'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Plus, X, Trash2, Star, Edit, Check } from 'lucide-react'
import { getCurrentUser } from '@/lib/casillero'
import { getMyAddresses, createAddress, updateAddress, deleteAddress } from '@/lib/addresses'
import { CR_GEO } from '@/lib/cr-geo'
import type { NexoAddress } from '@/types/casillero'

export default function DireccionPage() {
  const router = useRouter()
  const [addresses, setAddresses] = useState<NexoAddress[]>([])
  const [ready, setReady] = useState(false)
  const [showForm, setShowForm] = useState(false)

  // Form state
  const [province, setProvince] = useState('')
  const [canton, setCanton] = useState('')
  const [district, setDistrict] = useState('')
  const [senas, setSenas] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editProvince, setEditProvince] = useState('')
  const [editCanton, setEditCanton] = useState('')
  const [editDistrict, setEditDistrict] = useState('')
  const [editSenas, setEditSenas] = useState('')

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (!user) { router.replace('/login'); return }
      getMyAddresses().then((data) => { setAddresses(data); setReady(true) })
    })
  }, [router])

  const cantons = CR_GEO.find(p => p.province === province)?.cantons ?? []
  const districts = cantons.find(c => c.canton === canton)?.districts ?? []
  const editCantons = CR_GEO.find(p => p.province === editProvince)?.cantons ?? []
  const editDistricts = editCantons.find(c => c.canton === editCanton)?.districts ?? []

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!province || !canton || !district || !senas.trim()) {
      setFormError('Todos los campos son requeridos.')
      return
    }
    setSubmitting(true)
    setFormError('')
    const result = await createAddress({ province, canton, district, senas: senas.trim() })
    setSubmitting(false)
    if ('error' in result) { setFormError(result.error); return }
    setAddresses(prev => [...prev, result.address])
    setProvince(''); setCanton(''); setDistrict(''); setSenas('')
    setShowForm(false)
  }

  function startEdit(addr: NexoAddress) {
    setEditingId(addr.addressId)
    setEditProvince(addr.province)
    setEditCanton(addr.canton)
    setEditDistrict(addr.district)
    setEditSenas(addr.senas)
  }

  async function handleSaveEdit(addressId: string) {
    if (!editProvince || !editCanton || !editDistrict || !editSenas.trim()) return
    const ok = await updateAddress(addressId, {
      province: editProvince,
      canton: editCanton,
      district: editDistrict,
      senas: editSenas.trim(),
    })
    if (ok) {
      setAddresses(prev => prev.map(a =>
        a.addressId === addressId
          ? { ...a, province: editProvince, canton: editCanton, district: editDistrict, senas: editSenas.trim() }
          : a
      ))
    }
    setEditingId(null)
  }

  async function handleSetDefault(addressId: string) {
    const ok = await updateAddress(addressId, { isDefault: true })
    if (ok) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.addressId === addressId })))
    }
  }

  async function handleDelete(addressId: string) {
    if (!confirm('¿Eliminar esta dirección?')) return
    const ok = await deleteAddress(addressId)
    if (ok) {
      const remaining = addresses.filter(a => a.addressId !== addressId)
      // If deleted was default, mark first remaining as default locally
      const deletedWasDefault = addresses.find(a => a.addressId === addressId)?.isDefault
      setAddresses(
        deletedWasDefault && remaining.length > 0
          ? remaining.map((a, i) => ({ ...a, isDefault: i === 0 }))
          : remaining
      )
    } else {
      alert('No se puede eliminar la única dirección.')
    }
  }

  const inputCls = 'w-full bg-space-black border border-white/10 rounded-xl px-4 py-3 text-ghost placeholder-slate focus:outline-none focus:border-cyan/60 text-sm'
  const selectCls = inputCls + ' cursor-pointer'

  if (!ready) return null

  return (
    <div className="min-h-screen bg-space-black pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-cyan text-sm font-semibold tracking-widest uppercase mb-3">Perfil</p>
            <h1 className="text-4xl font-bold text-ghost mb-2">Dirección CR</h1>
            <p className="text-slate text-sm">Guardá hasta 2 direcciones de entrega en Costa Rica.</p>
          </div>
          {addresses.length < 2 && (
            <button
              onClick={() => { setShowForm(v => !v); setFormError('') }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan text-space-black font-semibold text-sm hover:bg-cyan/90 transition-colors mt-1 shrink-0"
            >
              {showForm ? <X size={16} /> : <Plus size={16} />}
              {showForm ? 'Cancelar' : 'Nueva dirección'}
            </button>
          )}
        </div>

        {/* Formulario nueva dirección */}
        {showForm && (
          <form onSubmit={handleCreate} className="bg-midnight border border-white/5 rounded-2xl p-6 mb-6 space-y-4">
            <h2 className="text-ghost font-semibold">Nueva dirección</h2>

            <div>
              <label className="text-xs font-medium text-ghost/80 mb-1.5 block">Provincia <span className="text-status-red">*</span></label>
              <select className={selectCls} value={province} onChange={e => { setProvince(e.target.value); setCanton(''); setDistrict('') }}>
                <option value="">Seleccioná una provincia...</option>
                {CR_GEO.map(p => <option key={p.province} value={p.province}>{p.province}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-ghost/80 mb-1.5 block">Cantón <span className="text-status-red">*</span></label>
              <select className={selectCls} value={canton} onChange={e => { setCanton(e.target.value); setDistrict('') }} disabled={!province}>
                <option value="">Seleccioná un cantón...</option>
                {cantons.map(c => <option key={c.canton} value={c.canton}>{c.canton}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-ghost/80 mb-1.5 block">Distrito <span className="text-status-red">*</span></label>
              <select className={selectCls} value={district} onChange={e => setDistrict(e.target.value)} disabled={!canton}>
                <option value="">Seleccioná un distrito...</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-ghost/80 mb-1.5 block">Señas <span className="text-status-red">*</span></label>
              <textarea
                className={inputCls + ' resize-none'}
                rows={3}
                placeholder="ej. Del supermercado 200m norte, casa blanca con portón azul"
                value={senas}
                onChange={e => setSenas(e.target.value)}
              />
            </div>

            {formError && (
              <p className="text-sm text-status-red bg-status-red/10 border border-status-red/20 rounded-xl px-4 py-3">{formError}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan text-space-black font-semibold text-sm hover:bg-cyan/90 disabled:opacity-50 transition-colors"
            >
              <MapPin size={15} />
              {submitting ? 'Guardando...' : 'Guardar dirección'}
            </button>
          </form>
        )}

        {/* Lista de direcciones */}
        {addresses.length === 0 ? (
          <div className="border border-dashed border-white/10 rounded-2xl p-14 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-5">
              <MapPin size={28} className="text-slate" />
            </div>
            <h3 className="text-ghost font-semibold text-lg mb-2">Sin direcciones</h3>
            <p className="text-slate text-sm max-w-xs">
              Agregá tu dirección de entrega para poder gestionar tus pedidos.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div key={addr.addressId} className={`bg-midnight border rounded-2xl p-5 ${addr.isDefault ? 'border-cyan/30' : 'border-white/5'}`}>

                {editingId === addr.addressId ? (
                  // Modo edición
                  <div className="space-y-3">
                    <select className={selectCls} value={editProvince} onChange={e => { setEditProvince(e.target.value); setEditCanton(''); setEditDistrict('') }}>
                      {CR_GEO.map(p => <option key={p.province} value={p.province}>{p.province}</option>)}
                    </select>
                    <select className={selectCls} value={editCanton} onChange={e => { setEditCanton(e.target.value); setEditDistrict('') }} disabled={!editProvince}>
                      <option value="">Seleccioná un cantón...</option>
                      {editCantons.map(c => <option key={c.canton} value={c.canton}>{c.canton}</option>)}
                    </select>
                    <select className={selectCls} value={editDistrict} onChange={e => setEditDistrict(e.target.value)} disabled={!editCanton}>
                      <option value="">Seleccioná un distrito...</option>
                      {editDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <textarea
                      className={inputCls + ' resize-none'}
                      rows={2}
                      value={editSenas}
                      onChange={e => setEditSenas(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(addr.addressId)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-status-green/10 text-status-green border border-status-green/20 text-xs font-semibold hover:bg-status-green/20 transition-colors"
                      >
                        <Check size={13} /> Guardar
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-slate border border-white/10 text-xs font-semibold hover:bg-white/10 transition-colors"
                      >
                        <X size={13} /> Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  // Modo vista
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin size={14} className="text-cyan shrink-0" />
                          <p className="text-ghost font-semibold text-sm">
                            {addr.district}, {addr.canton}, {addr.province}
                          </p>
                          {addr.isDefault && (
                            <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-cyan/10 text-cyan border border-cyan/20 shrink-0">
                              <Star size={9} fill="currentColor" /> Predeterminada
                            </span>
                          )}
                        </div>
                        <p className="text-slate text-xs ml-5">{addr.senas}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                      {!addr.isDefault && (
                        <button
                          onClick={() => handleSetDefault(addr.addressId)}
                          className="flex items-center gap-1 text-xs text-slate hover:text-cyan transition-colors"
                        >
                          <Star size={12} /> Usar como predeterminada
                        </button>
                      )}
                      <div className="ml-auto flex items-center gap-1">
                        <button
                          onClick={() => startEdit(addr)}
                          className="p-2 rounded-lg hover:bg-cyan/10 text-slate hover:text-cyan transition-colors"
                          title="Editar"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(addr.addressId)}
                          disabled={addresses.length === 1}
                          className="p-2 rounded-lg hover:bg-status-red/10 text-slate hover:text-status-red transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          title={addresses.length === 1 ? 'Debe mantener al menos una dirección' : 'Eliminar'}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
