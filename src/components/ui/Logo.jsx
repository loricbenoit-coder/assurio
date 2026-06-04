import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Logo Assur-Emprunteur — version finale
 * Concept : bouclier (protection/assurance) + maison (prêt immobilier)
 * Toit teal = l'assurance qui couvre votre bien
 * Corps navy = solidité, confiance financière
 */

export const LogoIcon = ({ size = 44, className }) => (
  <svg
    width={size}
    height={Math.round(size * 1.12)}
    viewBox="0 0 44 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="ae-bg" x1="0" y1="0" x2="44" y2="49" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1a40cc" />
        <stop offset="100%" stopColor="#0a1340" />
      </linearGradient>
      <linearGradient id="ae-roof" x1="8" y1="28" x2="36" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0cb8b8" />
        <stop offset="100%" stopColor="#3ddac5" />
      </linearGradient>
    </defs>

    {/* Bouclier — forme moderne arrondie */}
    <path
      d="M22 1L3 8.5V27C3 37.8 11.5 46 22 48.5C32.5 46 41 37.8 41 27V8.5L22 1Z"
      fill="url(#ae-bg)"
    />

    {/* Toit de maison — dégradé teal */}
    <path
      d="M9 27.5L22 14.5L35 27.5Z"
      fill="url(#ae-roof)"
    />

    {/* Corps de la maison — blanc */}
    <rect x="15.5" y="27" width="13" height="13.5" rx="1.5" fill="white" />

    {/* Porte — navy */}
    <rect x="19.5" y="32" width="5" height="8.5" rx="1" fill="#0a1340" />
  </svg>
)

/* Version claire pour fond sombre (navbar non scrollée, footer dark) */
const LogoIconDark = ({ size = 44, className }) => (
  <svg
    width={size}
    height={Math.round(size * 1.12)}
    viewBox="0 0 44 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="ae-bg-d" x1="0" y1="0" x2="44" y2="49" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
      </linearGradient>
      <linearGradient id="ae-roof-d" x1="8" y1="28" x2="36" y2="16" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0cb8b8" />
        <stop offset="100%" stopColor="#3ddac5" />
      </linearGradient>
    </defs>
    <path d="M22 1L3 8.5V27C3 37.8 11.5 46 22 48.5C32.5 46 41 37.8 41 27V8.5L22 1Z" fill="url(#ae-bg-d)" />
    <path d="M9 27.5L22 14.5L35 27.5Z" fill="url(#ae-roof-d)" />
    <rect x="15.5" y="27" width="13" height="13.5" rx="1.5" fill="white" opacity="0.95" />
    <rect x="19.5" y="32" width="5" height="8.5" rx="1" fill="#0a1340" />
  </svg>
)

export const LogoWordmark = ({ dark = false, withTagline = false, className }) => (
  <div className={cn('inline-flex items-center gap-2.5 select-none', className)}>

    {dark ? <LogoIcon size={40} /> : <LogoIconDark size={40} />}

    <div className="flex flex-col justify-center">
      {/* Nom principal */}
      <div className="leading-none flex items-baseline gap-0">
        <span
          className="font-black tracking-tight"
          style={{
            fontSize: '19px',
            color: dark ? '#0a1340' : '#ffffff',
            letterSpacing: '-0.025em',
          }}
        >
          Assur
        </span>
        <span
          className="font-black tracking-tight"
          style={{
            fontSize: '19px',
            letterSpacing: '-0.025em',
            background: 'linear-gradient(135deg, #0cb8b8, #3ddac5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          -Emprunteur
        </span>
      </div>

      {/* Tagline optionnelle */}
      {withTagline && (
        <span
          className="font-semibold uppercase mt-1"
          style={{
            fontSize: '9px',
            letterSpacing: '0.18em',
            color: dark ? '#94a3b8' : 'rgba(255,255,255,0.38)',
          }}
        >
          Moins cher · Plus simple
        </span>
      )}
    </div>
  </div>
)

export const Logo = ({ dark = false, withTagline = false, className }) => (
  <LogoWordmark dark={dark} withTagline={withTagline} className={className} />
)
