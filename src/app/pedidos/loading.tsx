export default function PedidosLoading() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="h-3 w-24 bg-white/5 rounded-full mb-4 animate-pulse" />
        <div className="h-10 w-52 bg-white/5 rounded-xl mb-3 animate-pulse" />
        <div className="h-4 w-72 bg-white/5 rounded-full mb-10 animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-midnight rounded-2xl p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="h-5 w-32 bg-white/5 rounded-full" />
                <div className="h-6 w-20 bg-white/5 rounded-full" />
              </div>
              <div className="h-4 w-48 bg-white/5 rounded-full mb-2" />
              <div className="h-4 w-36 bg-white/5 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
