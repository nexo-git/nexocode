export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-space-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="h-3 w-20 bg-white/5 rounded-full mb-4 animate-pulse" />
        <div className="h-10 w-56 bg-white/5 rounded-xl mb-8 animate-pulse" />
        <div className="flex gap-3 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-9 w-24 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="bg-midnight rounded-2xl overflow-hidden animate-pulse">
          <div className="h-12 bg-white/5 border-b border-white/5" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-14 border-b border-white/5 flex items-center px-6 gap-4">
              <div className="h-4 w-32 bg-white/5 rounded-full" />
              <div className="h-4 w-48 bg-white/5 rounded-full" />
              <div className="h-4 w-20 bg-white/5 rounded-full ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
