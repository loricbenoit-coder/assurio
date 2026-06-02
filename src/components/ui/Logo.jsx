import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Logo Assur-Emprunt v5
 * Reproduction fidèle : "A" en forme de goutte navy + checkmark dégradé teal
 * Deux jambes épaisses qui se rejoignent en bas (forme pointée/arrondie)
 * Checkmark teal qui traverse la partie basse
 */

export const LogoIcon = ({ size = 44, className }) => (
  <svg
    width={size}
    height={Math.round(size * 1.1)}
    viewBox="0 0 100 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="tealGrad" x1="20" y1="95" x2="85" y2="30" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#0CB8B8" />
        <stop offset="100%" stopColor="#3DD9C5" />
      </linearGradient>
    </defs>

    {/* Jambe gauche — épaisse, arrondie au bout */}
    <path
      d="M16 5 L52 98"
      stroke="#0D1F5C"
      strokeWidth="20"
      strokeLinecap="round"
    />

    {/* Jambe droite — miroir */}
    <path
      d="M84 5 L48 98"
      stroke="#0D1F5C"
      strokeWidth="20"
      strokeLinecap="round"
    />

    {/* Checkmark teal — traverse la partie basse */}
    <path
      d="M24 64 L48 90 L83 44"
      stroke="url(#tealGrad)"
      strokeWidth="11"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
)

export const LogoWordmark = ({ dark = false, withTagline = false, className }) => (
  <div className={cn('inline-flex items-center gap-3 select-none', className)}>
    <LogoIcon size={42} />
    <div className="flex flex-col justify-center leading-none gap-1">
      <div className="font-extrabold text-[18px] tracking-[-0.02em]">
        <span style={{ color: dark ? '#0D1F5C' : '#ffffff' }}>assur</span>
        <span
          style={{
            background: 'linear-gradient(135deg, #0CB8B8, #3DD9C5)',
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
          className="text-[9px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: dark ? '#94a3b8' : 'rgba(255,255,255,0.4)' }}
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
