export default function CuentaLoading() {
  return (
    <div className="min-h-screen bg-space-black pt-24 pb-20">
      <div className="max-w-xl mx-auto px-4 md:px-8">
        <div className="h-3 w-20 bg-white/5 rounded-full mb-4 animate-pulse" />
        <div className="h-10 w-44 bg-white/5 rounded-xl mb-10 animate-pulse" />
        <div className="bg-midnight rounded-2xl p-8 space-y-6 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="h-4 w-28 bg-white/5 rounded-full mb-2" />
              <div className="h-11 w-full bg-white/5 rounded-xl" />
            </div>
          ))}
          <div className="h-11 w-32 bg-white/5 rounded-xl mt-2" />
        </div>
      </div>
    </div>
  )
}
