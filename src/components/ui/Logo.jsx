import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Logo Assur Emprunteur — version grand groupe
 * Marque : carré navy + deux diagonales (dynamisme, précision, finance)
 * Style : AXA / Allianz / Magnolia — épuré, institutionnel, confiant
 */

export const LogoIcon = ({ size = 36, light = false, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Fond carré arrondi */}
    <rect
      width="40"
      height="40"
      rx="8"
      fill={light ? 'rgba(255,255,255,0.12)' : '#0f1f6b'}
    />

    {/* Ligne 1 — blanche (diagonale principale) */}
    <line
      x1="9" y1="31"
      x2="27" y2="9"
      stroke={light ? 'white' : 'white'}
      strokeWidth="3.8"
      strokeLinecap="round"
    />

    {/* Ligne 2 — teal (accent couleur) */}
    <line
      x1="19" y1="33"
      x2="37" y2="11"
      stroke="#10b981"
      strokeWidth="3.8"
      strokeLinecap="round"
    />
  </svg>
)

export const LogoWordmark = ({ dark = false, withTagline = false, className }) => (
  <div className={cn('inline-flex items-center gap-2.5 select-none', className)}>
    <LogoIcon size={34} light={!dark} />
    <div className="flex flex-col justify-center leading-none">
      <div
        className="font-black tracking-tight"
        style={{
          fontSize: '17px',
          letterSpacing: '-0.03em',
          color: dark ? '#0f1f6b' : '#ffffff',
          lineHeight: 1,
        }}
      >
        ASSUR{' '}
        <span style={{ color: '#10b981' }}>EMPRUNTEUR</span>
      </div>
      {withTagline && (
        <span
          className="font-medium uppercase mt-1.5"
          style={{
            fontSize: '8px',
            letterSpacing: '0.2em',
            color: dark ? '#94a3b8' : 'rgba(255,255,255,0.35)',
          }}
        >
          Courtier en assurance
        </span>
      )}
    </div>
  </div>
)

export const Logo = ({ dark = false, withTagline = false, className }) => (
  <LogoWordmark dark={dark} withTagline={withTagline} className={className} />
)
