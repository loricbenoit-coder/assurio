import React from 'react'

const EclatSymbol = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" aria-hidden="true">
    <path d="M22 4 L10 22 L22 18 Z" fill="white"/>
    <path d="M22 4 L34 22 L22 18 Z" fill="rgba(255,255,255,0.42)"/>
    <path d="M22 40 L10 22 L22 26 Z" fill="rgba(255,255,255,0.58)"/>
    <path d="M22 40 L34 22 L22 26 Z" fill="rgba(255,255,255,0.18)"/>
    <circle cx="22" cy="22" r="2.5" fill="#10b981"/>
  </svg>
)

export const LogoV2 = ({ size = 44 }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 18, userSelect: 'none' }}>
    <EclatSymbol size={size} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 2.5, height: 34, background: '#10b981', borderRadius: 2, flexShrink: 0 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, lineHeight: 1 }}>
        <div>
          <span style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontSize: 20, fontWeight: 900, letterSpacing: '-0.04em', color: '#ffffff',
          }}>ASSUR</span>
          <span style={{
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontSize: 20, fontWeight: 300, letterSpacing: '0.02em', color: 'rgba(255,255,255,0.5)',
            marginLeft: 8,
          }}>EMPRUNTEUR</span>
        </div>
        <span style={{
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          fontSize: 7.5, fontWeight: 500, letterSpacing: '0.26em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)',
          marginTop: 5, display: 'block',
        }}>Courtier en assurance</span>
      </div>
    </div>
  </div>
)
