import React, { useState, useEffect } from 'react'

const HEADLINES = [
  {
    static: 'Votre assurance emprunteur à',
    highlight: '-60%',
  },
  {
    static: '2 minutes pour économiser en moyenne',
    highlight: '15 000€',
  },
  {
    static: 'Résiliez et changez',
    highlight: "sans rien faire",
  },
  {
    static: 'Votre banque vous facture',
    highlight: '3× trop cher',
  },
  {
    static: "Rejoignez les 50 000 emprunteurs qui ont",
    highlight: 'déjà économisé',
  },
]

const INTERVAL = 3800 // ms entre chaque message

export const AnimatedHeadline = () => {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      // Fade out
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % HEADLINES.length)
        // Fade in
        setVisible(true)
      }, 400)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [])

  const { static: staticText, highlight } = HEADLINES[index]

  return (
    <h1
      className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6"
      style={{
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
      }}
    >
      {staticText}
      <br />
      <span
        className="text-transparent bg-clip-text"
        style={{
          backgroundImage: 'linear-gradient(135deg, #10b981, #34d399)',
        }}
      >
        {highlight}
      </span>
    </h1>
  )
}
