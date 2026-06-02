import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Logo Assur-Emprunt v3
 * Style : carré arrondi navy avec monogramme "AE" géométrique + accent teal
 * Typographie : ASSUR en navy, -EMPRUNT en dégradé teal
 */

export const LogoIcon = ({ size = 40, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="lgTeal" x1="0" y1="48" x2="48" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>

    {/* Fond carré arrondi navy */}
    <rect width="48" height="48" rx="12" fill="#0f1f6b" />

    {/* Lettre A stylisée — blanc */}
    <path
      d="M11 34 L19 14 L24 26 L29 14 L37 34"
      stroke="white"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Barre du A */}
    <line x1="15.5" y1="27" x2="32.5" y2="27" stroke="white" strokeWidth="3.2" strokeLinecap="round" />

    {/* Trait accent teal en bas */}
    <line x1="11" y1="38" x2="37" y2="38" stroke="url(#lgTeal)" strokeWidth="3" strokeLinecap="round" />
  </svg>
)

export const LogoWordmark = ({ dark = false, withTagline = false, className }) => (
  <div className={cn('inline-flex items-center gap-2.5 select-none', className)}>
    <LogoIcon size={38} />
    <div className="flex flex-col justify-center leading-none">
      <div>
        <span
          className="font-extrabold text-[18px] tracking-tight"
          style={{ color: dark ? '#0f1f6b' : '#ffffff' }}
        >
          assur
        </span>
        <span
          className="font-extrabold text-[18px] tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #10b981, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          -emprunt
        </span>
      </div>
      {withTagline && (
        <span
          className="text-[9px] font-bold uppercase tracking-[0.2em] mt-1"
          style={{ color: '#06b6d4' }}
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
