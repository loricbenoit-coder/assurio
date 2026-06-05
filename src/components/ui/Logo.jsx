import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Logo Assur Emprunteur — grand groupe
 * Mark : carré navy + 2 diagonales (blanc + teal)
 * Wordmark : ASSUR EMPRUNTEUR en capitales
 */

export const LogoIcon = ({ size = 36, light = false, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 84 84"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="84" height="84" rx="14" fill={light ? 'rgba(255,255,255,0.12)' : '#0f1f6b'} />
    <line x1="18" y1="68" x2="52" y2="16"
          stroke="white" strokeWidth="7.5" strokeLinecap="round"/>
    <line x1="42" y1="72" x2="76" y2="20"
          stroke="#10b981" strokeWidth="7.5" strokeLinecap="round"/>
  </svg>
)

export const LogoWordmark = ({ dark = false, withTagline = false, className }) => (
  <div className={cn('inline-flex items-center gap-3 select-none', className)}>
    <LogoIcon size={36} light={!dark} />
    <div className="flex flex-col justify-center leading-none">
      <div
        className="font-black tracking-tight"
        style={{
          fontSize: '17px',
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}
      >
        <span style={{ color: dark ? '#0f1f6b' : '#ffffff' }}>ASSUR </span>
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
