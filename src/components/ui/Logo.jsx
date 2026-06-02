import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Logo Assur-Emprunt
 * Style : forme géométrique en "A" navy + checkmark dégradé teal/cyan
 * Inspiré du style professionnel courtage assurance
 */

export const LogoIcon = ({ size = 44, className }) => (
  <svg
    width={size}
    height={Math.round(size * 0.92)}
    viewBox="0 0 100 92"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="tealCheck" x1="0" y1="92" x2="100" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="60%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0ea5e9" />
      </linearGradient>
      <linearGradient id="tealCheckDark" x1="0" y1="92" x2="100" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>
    </defs>

    {/* Jambe gauche du A — bleu marine */}
    <polygon points="4,3 19,3 48,84 33,84" fill="#162058" />

    {/* Jambe droite du A — bleu marine */}
    <polygon points="96,3 81,3 52,84 67,84" fill="#162058" />

    {/* Barre horizontale du A — bleu marine */}
    <polygon points="27,42 73,42 68,54 32,54" fill="#162058" />

    {/* Checkmark dégradé teal — superposé sur la partie basse */}
    <polyline
      points="18,56 40,76 82,30"
      stroke="url(#tealCheck)"
      strokeWidth="9"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
)

export const LogoWordmark = ({ dark = false, withTagline = false, className }) => (
  <div className={cn('inline-flex items-center gap-3 select-none', className)}>
    <LogoIcon size={44} />
    <div className="flex flex-col justify-center">
      <div className="leading-none">
        <span
          className="font-black text-xl tracking-tight uppercase"
          style={{ color: dark ? '#162058' : '#ffffff', letterSpacing: '-0.02em' }}
        >
          ASSUR
        </span>
        <span
          className="font-black text-xl tracking-tight uppercase"
          style={{
            background: 'linear-gradient(135deg, #10b981, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}
        >
          -EMPRUNT
        </span>
      </div>
      {withTagline && (
        <span
          className="text-[10px] font-bold uppercase tracking-[0.18em] mt-1"
          style={{ color: '#06b6d4' }}
        >
          MOINS CHER. PLUS SIMPLE.
        </span>
      )}
    </div>
  </div>
)

export const Logo = ({ dark = false, withTagline = false, className }) => (
  <LogoWordmark dark={dark} withTagline={withTagline} className={className} />
)
