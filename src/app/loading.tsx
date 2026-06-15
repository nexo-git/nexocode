export default function Loading() {
  return (
    <div className="min-h-screen bg-space-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-cyan/30 border-t-cyan animate-spin" />
        <p className="text-slate text-sm">Cargando...</p>
      </div>
    </div>
  )
}
