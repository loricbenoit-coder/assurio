import React from 'react'
import { cn } from '@/lib/utils'

/**
 * Logo Assur-Emprunt
 * Icône : bouclier géométrique avec toit de maison stylisé
 * Typo : "assur" bold navy + "-emprunt" vert
 */
export const LogoIcon = ({ className, size = 36 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="shieldGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#1a3fcc" />
        <stop offset="100%" stopColor="#0a1340" />
      </linearGradient>
      <linearGradient id="roofGrad" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>

    {/* Bouclier arrondi */}
    <path
      d="M20 2L4 8V20C4 29.5 11.2 37.2 20 39C28.8 37.2 36 29.5 36 20V8L20 2Z"
      fill="url(#shieldGrad)"
    />

    {/* Toit de maison (triangle) */}
    <path
      d="M20 10L10 19H13V28H27V19H30L20 10Z"
      fill="url(#roofGrad)"
    />

    {/* Porte */}
    <rect x="17" y="22" width="6" height="6" rx="1" fill="white" fillOpacity="0.9" />
  </svg>
)

export const LogoWordmark = ({ className, dark = false }) => (
  <span className={cn('inline-flex items-center gap-2.5 select-none', className)}>
    <LogoIcon />
    <span className="font-extrabold text-xl tracking-tight leading-none">
      <span className={dark ? 'text-[#0a1340]' : 'text-white'}>assur</span>
      <span className="text-[#10b981]">-emprunt</span>
    </span>
  </span>
)

export const Logo = ({ dark = false, className }) => (
  <LogoWordmark dark={dark} className={className} />
)
