import React from 'react'
import { cn } from '@/lib/utils'

/* ─── Symbole L'Éclat ─────────────────────────────────────────────────
   dark=false → fond sombre  : facettes blanches (navbar transparente, hero)
   dark=true  → fond clair   : facettes navy   (navbar scrollée, footer)
──────────────────────────────────────────────────────────────────────── */
const EclatIcon = ({ size = 36, dark = false }) => {
  const c = dark
    ? { a: '#0f1f6b', b: 'rgba(15,31,107,0.4)', c2: 'rgba(15,31,107,0.55)', d: 'rgba(15,31,107,0.16)' }
    : { a: '#ffffff', b: 'rgba(255,255,255,0.42)', c2: 'rgba(255,255,255,0.58)', d: 'rgba(255,255,255,0.18)' }

  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true"
      style={{ flexShrink: 0 }}>
      <path d="M22 4 L10 22 L22 18 Z"  fill={c.a}/>
      <path d="M22 4 L34 22 L22 18 Z"  fill={c.b}/>
      <path d="M22 40 L10 22 L22 26 Z" fill={c.c2}/>
      <path d="M22 40 L34 22 L22 26 Z" fill={c.d}/>
      <circle cx="22" cy="22" r="2.5" fill="#10b981"/>
    </svg>
  )
}

/* ─── Wordmark ──────────────────────────────────────────────────────── */
export const LogoWordmark = ({ dark = false, withTagline = false, className }) => (
  <div className={cn('inline-flex items-center select-none', className)}
    style={{ gap: 16, cursor: 'default' }}>
    <EclatIcon size={36} dark={dark} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 2.5, height: 30, borderRadius: 2, flexShrink: 0,
        background: '#10b981',
      }} />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <div>
          <span style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontSize: 17, fontWeight: 900, letterSpacing: '-0.035em',
            color: dark ? '#0a1340' : '#ffffff',
          }}>ASSUR</span>
          <span style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontSize: 17, fontWeight: 300, letterSpacing: '0.01em',
            color: dark ? 'rgba(10,19,64,0.5)' : 'rgba(255,255,255,0.5)',
            marginLeft: 7,
          }}>EMPRUNTEUR</span>
        </div>
        {withTagline && (
          <span style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontSize: 7.5, fontWeight: 500, letterSpacing: '0.24em',
            textTransform: 'uppercase', display: 'block', marginTop: 5,
            color: dark ? 'rgba(10,19,64,0.3)' : 'rgba(255,255,255,0.25)',
          }}>Courtier en assurance</span>
        )}
      </div>
    </div>
  </div>
)

/* ─── Icône seule (ChatWidget etc.) ────────────────────────────────── */
export const LogoIcon = ({ size = 36, light = false, className }) => (
  <EclatIcon size={size} dark={!light} />
)

export const Logo = ({ dark = false, withTagline = false, className }) => (
  <LogoWordmark dark={dark} withTagline={withTagline} className={className} />
)
