import React from 'react'

const INSURERS = [
  { name: 'AXA', color: '#00008F' },
  { name: 'Generali', color: '#C4161C' },
  { name: 'APRIL', color: '#E3000F' },
  { name: 'SwissLife', color: '#003A5C' },
  { name: 'Allianz', color: '#003781' },
  { name: 'MMA', color: '#E2001A' },
  { name: 'Macif', color: '#E2001A' },
  { name: 'Malakoff Humanis', color: '#00205B' },
  { name: 'CNP Assurances', color: '#00529B' },
  { name: 'BNP Paribas Cardif', color: '#00965E' },
  { name: 'Prévoir', color: '#E2001A' },
  { name: 'MetLife', color: '#0078D2' },
  { name: 'Spirica', color: '#6D2077' },
  { name: 'Ageas France', color: '#E84D10' },
  { name: 'Groupama', color: '#009A44' },
]

const InsurerLogo = ({ name, color }) => (
  <div className="flex items-center justify-center px-8 flex-shrink-0">
    <div className="flex items-center gap-2 group">
      {/* Dot coloré représentant la marque */}
      <div
        className="w-3 h-3 rounded-full flex-shrink-0"
        style={{ backgroundColor: color }}
      />
      <span
        className="text-sm font-bold tracking-tight text-slate-400 group-hover:text-slate-700 transition-colors whitespace-nowrap"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {name}
      </span>
    </div>
  </div>
)

export const InsurersCarousel = () => (
  <section className="py-10 bg-white border-y border-slate-100 overflow-hidden">
    <div className="max-w-6xl mx-auto px-6 mb-5 text-center">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
        Nous comparons pour vous les meilleures compagnies
      </p>
    </div>

    {/* Wrapper avec overflow caché */}
    <div className="relative">
      {/* Fade gauche */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, white, transparent)' }} />
      {/* Fade droite */}
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, white, transparent)' }} />

      {/* Track défilant */}
      <div className="flex items-center" style={{ overflow: 'hidden' }}>
        <div
          className="flex items-center"
          style={{
            animation: 'marquee 35s linear infinite',
            whiteSpace: 'nowrap',
          }}
        >
          {/* Double liste pour boucle infinie */}
          {[...INSURERS, ...INSURERS].map((insurer, i) => (
            <InsurerLogo key={i} {...insurer} />
          ))}
        </div>
      </div>
    </div>

    <style>{`
      @keyframes marquee {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @media (prefers-reduced-motion: reduce) {
        .marquee { animation: none; }
      }
    `}</style>
  </section>
)
