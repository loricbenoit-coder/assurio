import React, { useState } from 'react'

const INSURERS = [
  { name: 'AXA',              logo: '/logos/axa.png' },
  { name: 'Generali',         logo: '/logos/generali.png' },
  { name: 'APRIL',            logo: '/logos/april.jpg' },
  { name: 'Swiss Life',       logo: '/logos/swisslife.png' },
  { name: 'Allianz',          logo: '/logos/allianz.jpg' },
  { name: 'MMA',              logo: '/logos/mma.jpg' },
  { name: 'Macif',            logo: '/logos/macif.png' },
  { name: 'Groupama',         logo: '/logos/groupama.png' },
  { name: 'Malakoff Humanis', logo: '/logos/malakoffhumanis.jpg' },
  { name: 'CNP Assurances',   logo: '/logos/cnpassurance.jpg' },
  { name: 'BNP Cardif',       logo: '/logos/bnpcardif.jpg' },
  { name: 'Prévoir',          logo: '/logos/prevoir.jpg' },
]

const LogoCard = ({ name, logo }) => {
  const [error, setError] = useState(false)
  return (
    <div className="flex-shrink-0 mx-5 bg-white rounded-2xl px-6 py-4 shadow-sm border border-slate-100 flex items-center justify-center min-w-[150px] h-20">
      {logo && !error ? (
        <img
          src={logo}
          alt={`Logo ${name}`}
          className="h-10 max-w-[120px] object-contain"
          onError={() => setError(true)}
          loading="lazy"
        />
      ) : (
        <span className="font-bold text-sm text-slate-600 text-center">{name}</span>
      )}
    </div>
  )
}

export const InsurersCarousel = () => (
  <section className="py-10 bg-slate-50 border-y border-slate-100 overflow-hidden">
    <div className="max-w-6xl mx-auto px-6 mb-6 text-center">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
        Nous comparons pour vous les meilleures compagnies
      </p>
    </div>

    <div className="relative">
      {/* Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #f8fafc, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #f8fafc, transparent)' }} />

      {/* Track — 4 copies pour une boucle parfaitement fluide */}
      <div className="overflow-hidden">
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'carousel-scroll 45s linear infinite',
            willChange: 'transform',
          }}
        >
          {[...INSURERS, ...INSURERS, ...INSURERS, ...INSURERS].map((insurer, i) => (
            <LogoCard key={i} {...insurer} />
          ))}
        </div>
      </div>
    </div>

    <style>{`
      @keyframes carousel-scroll {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-25%); }
      }
    `}</style>
  </section>
)
