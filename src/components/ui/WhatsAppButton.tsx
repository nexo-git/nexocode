import { WHATSAPP_NUMBER } from '@/lib/constants'

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola nexo, tengo una consulta.')}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
      style={{ backgroundColor: '#25D366' }}
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.468 2.027 7.77L0 32l8.468-2.003A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.267 13.267 0 0 1-6.758-1.843l-.484-.287-5.027 1.188 1.22-4.896-.317-.503A13.234 13.234 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.874c-.398-.199-2.354-1.162-2.72-1.294-.365-.133-.631-.199-.897.199-.266.398-1.03 1.294-1.263 1.56-.232.266-.465.299-.863.1-.398-.2-1.682-.62-3.204-1.98-1.184-1.057-1.983-2.363-2.215-2.761-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.698.2-.232.266-.398.398-.664.133-.266.067-.498-.033-.697-.1-.2-.897-2.163-1.23-2.96-.323-.777-.652-.672-.897-.684l-.764-.013c-.266 0-.697.1-1.063.498-.365.398-1.395 1.362-1.395 3.32 0 1.96 1.428 3.853 1.627 4.12.2.265 2.81 4.29 6.81 6.017.952.411 1.695.656 2.274.84.955.304 1.825.261 2.512.158.767-.114 2.354-.963 2.686-1.893.332-.93.332-1.727.232-1.893-.099-.166-.365-.266-.763-.465z" />
      </svg>
    </a>
  )
}
