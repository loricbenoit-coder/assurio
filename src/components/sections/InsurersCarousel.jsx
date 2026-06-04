import React from 'react'

const INSURERS = [
  {
    name: 'AXA',
    color: '#00008F',
    bg: '#EEF0FF',
    icon: (
      <svg width="32" height="18" viewBox="0 0 60 34" fill="none">
        <text x="0" y="26" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="30" fill="#00008F">AXA</text>
      </svg>
    ),
  },
  {
    name: 'Generali',
    color: '#C4161C',
    bg: '#FEF0F0',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="16" fill="#C4161C" />
        <text x="17" y="23" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="13" fill="white">G</text>
      </svg>
    ),
  },
  {
    name: 'APRIL',
    color: '#E3000F',
    bg: '#FEF0F0',
    icon: (
      <svg width="48" height="18" viewBox="0 0 80 30" fill="none">
        <text x="0" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="26" fill="#E3000F">APRIL</text>
      </svg>
    ),
  },
  {
    name: 'SwissLife',
    color: '#003A5C',
    bg: '#EEF5FF',
    icon: (
      <svg width="14" height="34" viewBox="0 0 14 34" fill="none">
        <rect width="14" height="34" rx="2" fill="#003A5C" />
        <rect x="3" y="14" width="8" height="3" rx="1" fill="white" />
        <rect x="5.5" y="8" width="3" height="14" rx="1" fill="white" />
      </svg>
    ),
  },
  {
    name: 'Allianz',
    color: '#003781',
    bg: '#EEF3FF',
    icon: (
      <svg width="30" height="34" viewBox="0 0 30 34" fill="none">
        <ellipse cx="15" cy="12" rx="12" ry="11" fill="#003781" />
        <ellipse cx="15" cy="12" rx="7" ry="6.5" fill="white" />
        <path d="M15 5 L18 12 L22 14 L18 16 L15 23 L12 16 L8 14 L12 12 Z" fill="#003781" />
      </svg>
    ),
  },
  {
    name: 'MMA',
    color: '#002F6C',
    bg: '#EEF3FF',
    icon: (
      <svg width="44" height="18" viewBox="0 0 70 30" fill="none">
        <text x="0" y="24" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="26" fill="#002F6C">MMA</text>
      </svg>
    ),
  },
  {
    name: 'Macif',
    color: '#C00000',
    bg: '#FEF0F0',
    icon: (
      <svg width="44" height="18" viewBox="0 0 72 30" fill="none">
        <text x="0" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="24" fill="#C00000">Macif</text>
      </svg>
    ),
  },
  {
    name: 'Malakoff\nHumanis',
    color: '#00205B',
    bg: '#EEF3FF',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <rect width="34" height="34" rx="6" fill="#00205B" />
        <text x="17" y="23" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="14" fill="white">MH</text>
      </svg>
    ),
  },
  {
    name: 'CNP\nAssurances',
    color: '#00529B',
    bg: '#EEF4FF',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="16" fill="#00529B" />
        <text x="17" y="22" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="12" fill="white">CNP</text>
      </svg>
    ),
  },
  {
    name: 'BNP\nCardif',
    color: '#009A44',
    bg: '#EDFAF4',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <rect width="34" height="34" rx="6" fill="#009A44" />
        <text x="17" y="22" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="11" fill="white">BNP</text>
      </svg>
    ),
  },
  {
    name: 'Groupama',
    color: '#009A44',
    bg: '#EDFAF4',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="16" fill="#009A44" />
        <text x="17" y="22" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="13" fill="white">G</text>
      </svg>
    ),
  },
  {
    name: 'Prévoir',
    color: '#E2001A',
    bg: '#FEF0F0',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <rect width="34" height="34" rx="6" fill="#E2001A" />
        <text x="17" y="22" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="13" fill="white">P</text>
      </svg>
    ),
  },
]

const LogoCard = ({ icon, name, color, bg }) => (
  <div className="flex-shrink-0 mx-4 bg-white rounded-2xl px-5 py-4 shadow-sm border border-slate-100 flex items-center gap-3.5 min-w-[160px]">
    <div className="flex-shrink-0 flex items-center justify-center" style={{ minWidth: 34 }}>
      {icon}
    </div>
    <div>
      {name.split('\n').map((line, i) => (
        <div key={i} className="font-bold text-sm leading-tight" style={{ color }}>
          {line}
        </div>
      ))}
      <div className="text-[10px] text-slate-400 mt-0.5">Assurance emprunteur</div>
    </div>
  </div>
)

export const InsurersCarousel = () => (
  <section className="py-10 bg-slate-50 border-y border-slate-100 overflow-hidden">
    <div className="max-w-6xl mx-auto px-6 mb-6 text-center">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
        Nous comparons pour vous les meilleures compagnies
      </p>
    </div>

    <div className="relative">
      {/* Fade gauche */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #f8fafc, transparent)' }} />
      {/* Fade droite */}
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #f8fafc, transparent)' }} />

      <div style={{ overflow: 'hidden' }}>
        <div
          className="flex items-center py-2"
          style={{ animation: 'marquee 45s linear infinite', whiteSpace: 'nowrap' }}
        >
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
