import React from 'react'
import { cn } from '@/lib/utils'

export const LogoIcon = ({ size = 40, outline = false, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {outline ? (
      <rect width="48" height="48" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
    ) : (
      <rect width="48" height="48" rx="10" fill="#0f1f6b"/>
    )}

    {/* Colonne gauche */}
    <rect x="5"  y="22"  width="12" height="2"  rx="1"   fill="white" fillOpacity={outline ? 0.5 : 0.65}/>
    <rect x="7"  y="25"  width="8"  height="12" rx="1.5" fill="white" fillOpacity={outline ? 0.45 : 0.6}/>

    {/* Colonne centrale — la plus haute */}
    <rect x="17.5" y="14"  width="13" height="2.5" rx="1"   fill="white"/>
    <rect x="20"   y="17"  width="8"  height="20"  rx="1.5" fill="white"/>

    {/* Point vert — le cap */}
    <circle cx="24" cy="10" r="3" fill="#10b981"/>

    {/* Colonne droite */}
    <rect x="31" y="22" width="12" height="2"  rx="1"   fill="white" fillOpacity={outline ? 0.5 : 0.65}/>
    <rect x="33" y="25" width="8"  height="12" rx="1.5" fill="white" fillOpacity={outline ? 0.45 : 0.6}/>

    {/* Socle */}
    <rect x="4" y="38" width="40" height="2.5" rx="1.25" fill="white" fillOpacity={outline ? 0.18 : 0.18}/>
  </svg>
)

export const LogoWordmark = ({ dark = false, withTagline = false, className }) => (
  <div className={cn('inline-flex items-center select-none', className)} style={{ gap: 13 }}>
    <LogoIcon size={38} outline={dark} />
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
      <div>
        <span style={{
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          fontSize: 17,
          fontWeight: 900,
          letterSpacing: '-0.025em',
          color: dark ? '#ffffff' : '#0a1340',
        }}>ASSUR</span>
        <span style={{
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          fontSize: 17,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: '#10b981',
          marginLeft: 6,
        }}>EMPRUNTEUR</span>
      </div>
      {withTagline && (
        <>
          <div style={{
            height: '0.5px',
            background: dark ? 'rgba(255,255,255,0.12)' : 'rgba(10,19,64,0.1)',
            margin: '5px 0 4px',
          }} />
          <span style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontSize: 8,
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: dark ? 'rgba(255,255,255,0.3)' : '#94a3b8',
          }}>Courtier en assurance</span>
        </>
      )}
    </div>
  </div>
)

export const Logo = ({ dark = false, withTagline = false, className }) => (
  <LogoWordmark dark={dark} withTagline={withTagline} className={className} />
)
