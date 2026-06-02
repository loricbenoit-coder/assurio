import React, { useState, useEffect } from 'react'

const HEADLINES = [
  {
    static: 'Votre assurance emprunteur à',
    highlight: '-60%',
  },
  {
    static: 'Résiliez et changez',
    highlight: 'sans rien faire',
  },
  {
    static: 'Rejoignez les 50 000 emprunteurs\nqui ont déjà économisé',
    highlight: '',
  },
]

const INTERVAL = 3800

export const AnimatedHeadline = () => {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % HEADLINES.length)
        setVisible(true)
      }, 400)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [])

  const { static: staticText, highlight } = HEADLINES[index]

  return (
    /*
     * Hauteur fixe = 2 lignes exactement à chaque breakpoint
     * → le layout ne bouge JAMAIS quel que soit le message
     */
    <div
      className="mb-6"
      style={{ height: 'clamp(130px, 18vw, 180px)' }}
    >
      <h1
        className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
        style={{
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(10px)',
        }}
      >
        {/* Première ligne */}
        {staticText.split('\n')[0]}
        <br />
        {/* Deuxième ligne : suite du texte ou highlight coloré */}
        {staticText.includes('\n') ? (
          <span className="text-white/90">{staticText.split('\n')[1]}</span>
        ) : (
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #10b981, #34d399)' }}
          >
            {highlight}
          </span>
        )}
      </h1>
    </div>
  )
}
