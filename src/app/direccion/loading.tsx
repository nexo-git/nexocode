export default function DireccionLoading() {
  return (
    <div className="min-h-screen bg-space-black pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        <div className="h-3 w-20 bg-white/5 rounded-full mb-4 animate-pulse" />
        <div className="h-10 w-48 bg-white/5 rounded-xl mb-10 animate-pulse" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-midnight rounded-2xl p-6 animate-pulse">
              <div className="flex items-start justify-between">
                <div>
                  <div className="h-5 w-40 bg-white/5 rounded-full mb-2" />
                  <div className="h-4 w-56 bg-white/5 rounded-full" />
                </div>
                <div className="h-6 w-24 bg-white/5 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
