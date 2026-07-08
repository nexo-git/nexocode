const stores = [
  { name: 'Amazon', src: '/logos/amazon.png', href: 'https://www.amazon.com' },
  { name: 'eBay', src: '/logos/ebay.png', href: 'https://www.ebay.com' },
  { name: 'adidas', src: '/logos/adidas.png', href: 'https://www.adidas.com' },
  { name: 'Shein', src: '/logos/shein.png', href: 'https://us.shein.com' },
  { name: 'Sephora', src: '/logos/sephora.png', href: 'https://www.sephora.com' },
  { name: 'Walmart', src: '/logos/walmart.png', href: 'https://www.walmart.com' },
  { name: 'Nike', src: '/logos/nike.png', href: 'https://www.nike.com' },
  { name: 'AliExpress', src: '/logos/aliexpress.png', href: 'https://www.aliexpress.com' },
  { name: 'Target', src: '/logos/target.png', href: 'https://www.target.com' },
]

export default function StoreLogosSection() {
  return (
    <section className="bg-black py-6 overflow-hidden">
      <h2 className="text-center text-white font-bold text-xl md:text-2xl mb-6">
        Todas tus tiendas favoritas, a un clic de distancia
      </h2>

      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-black to-transparent" />

        <div className="flex w-max animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
          {[...stores, ...stores].map((store, i) => (
            <a
              key={i}
              href={store.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`Comprar en ${store.name}`}
              className="flex shrink-0 items-center justify-center px-8"
            >
              <img
                src={store.src}
                alt={store.name}
                className="h-10 md:h-12 w-auto opacity-80 transition-opacity hover:opacity-100"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
