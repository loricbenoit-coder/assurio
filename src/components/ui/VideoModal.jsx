import React, { useEffect } from 'react'
import { X } from 'lucide-react'
import { AnimatedDemo } from './AnimatedDemo'

export const VideoModal = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Contenu */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h3 className="text-white font-bold text-lg">Démo Assur Emprunteur</h3>
            <p className="text-white/50 text-sm">Parcours complet en 6 étapes</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Démo animée */}
        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ height: '460px' }}>
          <AnimatedDemo />
        </div>

        <p className="text-center text-white/30 text-xs mt-3">
          Cliquez sur une étape pour naviguer · <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white/50">Échap</kbd> pour fermer
        </p>
      </div>
    </div>
  )
}
