import React, { useEffect } from 'react'
import { X, Play } from 'lucide-react'

/**
 * Modale vidéo démo
 * Remplace VIDEO_URL par ton lien YouTube, Loom ou Vimeo quand tu auras la vidéo.
 */

// 👇 Remplace cette URL par ta vraie vidéo démo (YouTube, Loom, Vimeo…)
const VIDEO_URL = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1'

export const VideoModal = ({ open, onClose }) => {
  // Fermer avec Échap
  useEffect(() => {
    if (!open) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  // Bloquer le scroll quand la modale est ouverte
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Contenu */}
      <div className="relative z-10 w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h3 className="text-white font-bold text-lg">Démo Assur-Emprunt</h3>
            <p className="text-white/50 text-sm">Découvrez comment économiser en 2 minutes</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Vidéo */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black"
          style={{ paddingBottom: '56.25%' /* 16:9 */ }}>
          <iframe
            src={VIDEO_URL}
            title="Démo Assur-Emprunt"
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Sous-titre */}
        <p className="text-center text-white/40 text-xs mt-3">
          Appuyez sur <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/60">Échap</kbd> ou cliquez en dehors pour fermer
        </p>
      </div>
    </div>
  )
}
