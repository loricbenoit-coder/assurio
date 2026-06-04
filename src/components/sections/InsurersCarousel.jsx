import React, { useState } from 'react'

const INSURERS = [
  { name: 'AXA',               domain: 'axa.fr' },
  { name: 'Generali',          domain: 'generali.fr' },
  { name: 'APRIL',             domain: 'april.fr' },
  { name: 'Swiss Life',        domain: 'swisslife.fr' },
  { name: 'Allianz',           domain: 'allianz.fr' },
  { name: 'MMA',               domain: 'mma.fr' },
  { name: 'Macif',             domain: 'macif.fr' },
  { name: 'Malakoff Humanis',  domain: 'malakoffhumanis.com' },
  { name: 'CNP Assurances',    domain: 'cnp.fr' },
  { name: 'BNP Cardif',        domain: 'cardif.fr' },
  { name: 'Groupama',          domain: 'groupama.fr' },
  { name: 'Prévoir',           domain: 'prevoir.fr' },
  { name: 'MetLife',           domain: 'metlife.fr' },
  { name: 'Spirica',           domain: 'spirica.fr' },
]

/** Fallback texte si l'image ne charge pas */
const Fallback = ({ name }) => (
  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
    <span className="text-xs font-black text-slate-500 uppercase leading-none text-center px-1">
      {name.slice(0, 3)}
    </span>
  </div>
)

const LogoCard = ({ name, domain }) => {
  const [error, setError] = useState(false)
  const src = `https://logo.clearbit.com/${domain}?size=80`

  return (
    <div className="flex-shrink-0 mx-4 bg-white rounded-2xl px-6 py-4 shadow-sm border border-slate-100 flex items-center gap-3 min-w-[170px] hover:shadow-md transition-shadow">
      {error ? (
        <Fallback name={name} />
      ) : (
        <img
          src={src}
          alt={`Logo ${name}`}
          className="w-10 h-10 object-contain flex-shrink-0"
          onError={() => setError(true)}
          loading="lazy"
        />
      )}
      <div>
        <div className="font-semibold text-sm text-[#0a1340] leading-tight">{name}</div>
        <div className="text-[10px] text-slate-400 mt-0.5">Partenaire</div>
      </div>
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
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #f8fafc, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #f8fafc, transparent)' }} />

      <div style={{ overflow: 'hidden' }}>
        <div
          className="flex items-center py-2"
          style={{ animation: 'marquee 50s linear infinite', whiteSpace: 'nowrap' }}
        >
          {/* Double liste pour boucle infinie */}
          {[...INSURERS, ...INSURERS].map((insurer, i) => (
            <LogoCard key={i} {...insurer} />
          ))}
        </div>
      </div>
    </div>

    <style>{`
      @keyframes marquee {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
    `}</style>
  </section>
)
