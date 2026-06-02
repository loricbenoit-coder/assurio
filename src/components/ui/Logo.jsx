import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Logo Assur-Emprunt v4
 * Style ultra-minimal : pic géométrique navy + point teal + wordmark propre
 * Inspiré de Linear, Vercel, Stripe
 */

export const LogoIcon = ({ size = 36, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Jambe gauche */}
    <path
      d="M4 30 L18 6"
      stroke="#0f1f6b"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* Jambe droite */}
    <path
      d="M32 30 L18 6"
      stroke="#0f1f6b"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* Barre horizontale */}
    <path
      d="M10 21 L26 21"
      stroke="#0f1f6b"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* Point teal au sommet */}
    <circle cx="18" cy="6" r="3.5" fill="#10b981" />
  </svg>
)

export const LogoIconLight = ({ size = 36, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M4 30 L18 6" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M32 30 L18 6" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M10 21 L26 21" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="18" cy="6" r="3.5" fill="#10b981" />
  </svg>
)

export const LogoWordmark = ({ dark = false, withTagline = false, className }) => (
  <div className={cn('inline-flex items-center gap-2.5 select-none', className)}>
    {dark ? <LogoIcon size={34} /> : <LogoIconLight size={34} />}
    <div className="flex flex-col justify-center leading-none gap-0.5">
      <div className="font-bold text-[17px] tracking-[-0.03em]">
        <span style={{ color: dark ? '#0f1f6b' : '#ffffff' }}>assur</span>
        <span style={{ color: '#10b981' }}>-emprunt</span>
      </div>
      {withTagline && (
        <span
          className="text-[9px] font-semibold uppercase tracking-[0.15em]"
          style={{ color: dark ? '#94a3b8' : 'rgba(255,255,255,0.45)' }}
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
