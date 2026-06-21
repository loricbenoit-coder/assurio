import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Logo Assur Emprunteur — 3 bandes corporate
 * Blanc · Teal · Cyan — rapprochées, dynamiques
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
    {/* 3 bandes rapprochées */}
    <line x1="12" y1="66" x2="43" y2="17" stroke="white"   strokeWidth="7" strokeLinecap="round"/>
    <line x1="29" y1="70" x2="60" y2="21" stroke="#10b981" strokeWidth="7" strokeLinecap="round"/>
    <line x1="46" y1="74" x2="77" y2="25" stroke="#38bdf8" strokeWidth="7" strokeLinecap="round"/>
  </svg>
)

export const LogoWordmark = ({ dark = false, withTagline = false, className }) => (
  <div className={cn('inline-flex items-center gap-3 select-none', className)}>
    <LogoIcon size={36} light={!dark} />
    <div className="flex flex-col justify-center leading-none">
      <div
        className="font-black tracking-tight"
        style={{ fontSize: '17px', letterSpacing: '-0.03em', lineHeight: 1 }}
      >
        <span style={{ color: dark ? '#0f1f6b' : '#ffffff' }}>ASSUR </span>
        <span style={{ color: '#10b981' }}>EMPRUNTEUR</span>
      </div>
      {withTagline && (
        <span
          className="font-medium uppercase mt-1.5"
          style={{ fontSize: '8px', letterSpacing: '0.2em', color: dark ? '#94a3b8' : 'rgba(255,255,255,0.35)' }}
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
