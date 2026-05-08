'use client'

import { useState } from 'react'

interface LegalSection {
  heading: string
  content: string | string[]
}

interface LegalPageProps {
  titleEs: string
  titleEn: string
  lastUpdated: string
  sectionsEs: LegalSection[]
  sectionsEn: LegalSection[]
}

export default function LegalPage({ titleEs, titleEn, lastUpdated, sectionsEs, sectionsEn }: LegalPageProps) {
  const [lang, setLang] = useState<'es' | 'en'>('es')
  const sections = lang === 'es' ? sectionsEs : sectionsEn
  const title = lang === 'es' ? titleEs : titleEn

  return (
    <div className="min-h-screen bg-space-black pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-ghost">{title}</h1>
            <div className="flex items-center gap-1 bg-midnight border border-white/10 rounded-lg p-1 shrink-0">
              <button
                onClick={() => setLang('es')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  lang === 'es' ? 'bg-cyan text-space-black' : 'text-slate hover:text-ghost'
                }`}
              >
                Español
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  lang === 'en' ? 'bg-cyan text-space-black' : 'text-slate hover:text-ghost'
                }`}
              >
                English
              </button>
            </div>
          </div>
          <p className="text-slate text-sm">
            {lang === 'es' ? 'Última actualización:' : 'Last updated:'} {lastUpdated}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i} className="border-b border-white/5 pb-8 last:border-0">
              <h2 className="text-ghost font-semibold text-lg mb-3">
                {i + 1}. {section.heading}
              </h2>
              {Array.isArray(section.content) ? (
                <ul className="space-y-2">
                  {section.content.map((item, j) => (
                    <li key={j} className="text-slate text-sm leading-relaxed flex gap-2">
                      <span className="text-cyan mt-1 shrink-0">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate text-sm leading-relaxed">{section.content}</p>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 p-5 bg-midnight border border-white/5 rounded-xl">
          <p className="text-slate text-xs leading-relaxed">
            {lang === 'es'
              ? 'Para consultas sobre estos documentos, contactanos a '
              : 'For questions about these documents, contact us at '}
            <a href="mailto:nexxo.courier@gmail.com" className="text-cyan hover:underline">nexxo.courier@gmail.com</a>
            {lang === 'es' ? ' o por ' : ' or via '}
            <a href="https://wa.me/50661132863" target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">WhatsApp</a>.
          </p>
        </div>
      </div>
    </div>
  )
}
