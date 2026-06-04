import React, { useState, useEffect } from 'react'
import { Cookie, X, Check } from 'lucide-react'

const COOKIE_KEY = 'ae_cookie_consent'

export const CookieBanner = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY)
    if (!consent) setTimeout(() => setVisible(true), 1200)
  }, [])

  const accept = () => { localStorage.setItem(COOKIE_KEY, 'accepted'); setVisible(false) }
  const refuse = () => { localStorage.setItem(COOKIE_KEY, 'refused'); setVisible(false) }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-[#0a1340] border border-white/10 rounded-2xl p-5 md:p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Icône */}
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <Cookie className="w-5 h-5 text-[#10b981]" />
          </div>

          {/* Texte */}
          <div className="flex-1">
            <p className="text-white font-semibold text-sm mb-1">
              Nous utilisons des cookies 🍪
            </p>
            <p className="text-white/50 text-xs leading-relaxed">
              Assur Emprunteur utilise des cookies pour mesurer l'audience et améliorer votre expérience.
              Vos données ne sont jamais revendues. Consultez notre{' '}
              <a href="/politique-confidentialite" className="text-[#10b981] hover:underline">
                politique de confidentialité
              </a>.
            </p>
          </div>

          {/* Boutons */}
          <div className="flex gap-2 flex-shrink-0 w-full md:w-auto">
            <button
              onClick={refuse}
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm font-medium transition-all"
            >
              <X className="w-3.5 h-3.5" /> Refuser
            </button>
            <button
              onClick={accept}
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white text-sm font-semibold transition-all"
            >
              <Check className="w-3.5 h-3.5" /> Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
