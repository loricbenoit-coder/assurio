import React, { useState, useEffect } from 'react'
import { ArrowRight, CheckCircle2, Star, Zap, Shield, Upload, Lock } from 'lucide-react'
import { computeQuotes } from '@/lib/quoteEngine'
import { LogoWordmark } from '@/components/ui/Logo'

/* ─── Palette dark premium ──────────────────────────────────────────── */
// bg-base   : #08090e
// bg-card   : rgba(255,255,255,0.04)
// border    : rgba(255,255,255,0.08)
// accent    : #10b981 (green)
// accent2   : #6366f1 (indigo – highlights)
// text-1    : #ffffff
// text-2    : rgba(255,255,255,0.6)
// text-3    : rgba(255,255,255,0.35)

/* ─── Navbar ────────────────────────────────────────────────────────── */
const NavV2 = () => {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'background 0.3s, border-bottom 0.3s',
      background: scrolled ? 'rgba(8,9,14,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <LogoWordmark dark={false} />
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {[['Conseils', '/blog'], ['Contact', '/contact']].map(([label, href]) => (
            <a key={label} href={href} style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>
              {label}
            </a>
          ))}
          <a href="/souscription" style={{
            background: '#10b981', color: '#fff', padding: '8px 20px', borderRadius: 10,
            fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
            boxShadow: '0 0 24px rgba(16,185,129,0.25)', transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.target.style.background = '#059669'}
            onMouseLeave={e => e.target.style.background = '#10b981'}>
            Démarrer <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </nav>
  )
}

/* ─── Mini simulateur dans le hero ─────────────────────────────────── */
const HeroSimulator = () => {
  const [montant, setMontant] = useState(200000)
  const [duree, setDuree] = useState(20)
  const [age, setAge] = useState(35)
  const [fumeur, setFumeur] = useState(false)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const calculate = () => {
    setLoading(true)
    setTimeout(() => {
      const r = computeQuotes({
        amount: montant, duration: duree,
        borrowers: [{ age, smoker: fumeur, profession: 'cadre', riskSport: false, riskProfession: false, quotite: 100 }],
        projectType: 'principal', selectedGuarantees: ['DC', 'PTIA', 'ITT', 'IPT'],
      })
      setResult(r)
      setLoading(false)
    }, 600)
  }

  const fmt = (n) => Number(n).toLocaleString('fr-FR')

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 14, outline: 'none',
    boxSizing: 'border-box',
  }
  const labelStyle = { fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, display: 'block' }

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 20, padding: 28, backdropFilter: 'blur(20px)',
      boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
    }}>
      <div style={{ marginBottom: 20 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Simulation instantanée
        </span>
        <p style={{ color: '#fff', fontWeight: 700, fontSize: 18, margin: '6px 0 0' }}>Estimez vos économies</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div>
          <label style={labelStyle}>Capital emprunté</label>
          <input type="number" value={montant} onChange={e => setMontant(Number(e.target.value))}
            style={inputStyle} placeholder="200 000" min={50000} max={1000000} step={10000} />
        </div>
        <div>
          <label style={labelStyle}>Durée (ans)</label>
          <select value={duree} onChange={e => setDuree(Number(e.target.value))} style={inputStyle}>
            {[10,12,15,20,25,30].map(d => <option key={d} value={d}>{d} ans</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Votre âge</label>
          <input type="number" value={age} onChange={e => setAge(Number(e.target.value))}
            style={inputStyle} min={18} max={70} />
        </div>
        <div>
          <label style={labelStyle}>Fumeur ?</label>
          <div style={{ display: 'flex', gap: 8, marginTop: 2 }}>
            {[['Non', false], ['Oui', true]].map(([l, v]) => (
              <button key={l} onClick={() => setFumeur(v)} style={{
                flex: 1, padding: '10px 0', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: '1px solid',
                borderColor: fumeur === v ? '#10b981' : 'rgba(255,255,255,0.1)',
                background: fumeur === v ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.04)',
                color: fumeur === v ? '#10b981' : 'rgba(255,255,255,0.5)',
                transition: 'all 0.2s',
              }}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={calculate} disabled={loading} style={{
        width: '100%', padding: '14px 0', borderRadius: 12, background: loading ? 'rgba(16,185,129,0.4)' : '#10b981',
        color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer',
        boxShadow: '0 0 32px rgba(16,185,129,0.3)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      }}>
        {loading ? (
          <><span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Calcul en cours…</>
        ) : (
          <><Zap size={16} /> Voir mes économies</>
        )}
      </button>

      {result && !loading && (
        <div style={{ marginTop: 20, padding: 18, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Meilleure offre</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: 0 }}>{result.quotes[0]?.insurer}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 28, fontWeight: 900, color: '#10b981', margin: 0, lineHeight: 1 }}>{result.quotes[0]?.monthly}€<span style={{ fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.4)' }}>/mois</span></p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>vs {result.bankMonthly}€ en banque</p>
            </div>
          </div>
          <div style={{ background: 'rgba(16,185,129,0.12)', borderRadius: 10, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>Économies estimées</span>
            <span style={{ fontSize: 22, fontWeight: 900, color: '#10b981' }}>{fmt(result.quotes[0]?.savings)}€</span>
          </div>
          <a href="/souscription" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            marginTop: 12, padding: '12px 0', background: '#10b981', borderRadius: 10,
            color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none',
            boxShadow: '0 0 24px rgba(16,185,129,0.3)',
          }}>
            Démarrer mon dossier <ArrowRight size={14} />
          </a>
        </div>
      )}

      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 14, textAlign: 'center', marginBottom: 0 }}>
        Simulation à titre indicatif · Résultat définitif après souscription
      </p>
    </div>
  )
}

/* ─── Hero ──────────────────────────────────────────────────────────── */
const HeroV2 = () => {
  const TRUST = ['Tarifs minimum garantis', '100% gratuit', 'Sans engagement']

  return (
    <section style={{
      minHeight: '100vh', background: '#08090e', display: 'flex', alignItems: 'center',
      padding: '80px 0 60px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Lueurs d'arrière-plan */}
      <div style={{ position: 'absolute', top: -200, right: -200, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -100, left: -150, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 480px', gap: 60, alignItems: 'center' }}>

          {/* Texte gauche */}
          <div>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 999, padding: '6px 16px', marginBottom: 32 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', display: 'block', boxShadow: '0 0 8px #10b981' }} />
              <span style={{ fontSize: 13, color: '#10b981', fontWeight: 600 }}>Courtier en assurance emprunteur</span>
            </div>

            <h1 style={{ fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 900, color: '#fff', lineHeight: 1.05, letterSpacing: '-2px', margin: '0 0 24px' }}>
              Économisez{' '}
              <span style={{ color: '#10b981', display: 'block' }}>jusqu'à 15 000€</span>
              sur votre assurance prêt
            </h1>

            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, maxWidth: 480, margin: '0 0 32px' }}>
              Téléversez votre CNI et votre offre de prêt — le dossier se complète seul. Accès direct aux tarifs minimum, sans intermédiaire.
            </p>

            {/* Points de confiance */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
              {TRUST.map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 size={12} color="#10b981" />
                  </div>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </div>

            {/* Feature IA mise en avant */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: 14, padding: '12px 18px',
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Zap size={16} color="#818cf8" />
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#a5b4fc', margin: 0 }}>Pré-remplissage automatique</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: '2px 0 0' }}>CNI + offre de prêt analysées instantanément</p>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 40, marginTop: 40, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {[['15 000€', "d'économies max"], ['48h', 'traitement'], ['4.9/5', 'satisfaction']].map(([v, l]) => (
                <div key={l}>
                  <p style={{ fontSize: 26, fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-1px' }}>{v}</p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: '3px 0 0' }}>{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Simulateur droite */}
          <HeroSimulator />
        </div>
      </div>
    </section>
  )
}

/* ─── Logos assureurs ────────────────────────────────────────────────── */
const InsurersV2 = () => (
  <section style={{ background: '#08090e', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '32px 0' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.25)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 24 }}>
        Assureurs partenaires
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
        {['APRIL', 'SwissLife', 'Malakoff Humanis', 'Generali', 'Allianz'].map(name => (
          <span key={name} style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.2)', letterSpacing: '-0.5px' }}>{name}</span>
        ))}
      </div>
    </div>
  </section>
)

/* ─── Comment ça marche ──────────────────────────────────────────────── */
const HowItWorksV2 = () => {
  const steps = [
    {
      icon: Upload,
      color: '#10b981',
      glow: 'rgba(16,185,129,0.15)',
      num: '01',
      title: 'Téléversez vos documents',
      desc: 'CNI et offre de prêt analysées automatiquement. Le dossier se pré-remplit en quelques secondes.',
    },
    {
      icon: Zap,
      color: '#818cf8',
      glow: 'rgba(99,102,241,0.15)',
      num: '02',
      title: 'Recevez les tarifs minimum',
      desc: 'Accès direct aux tarifs minimum garantis sur tous les contrats. Pas de négociation — le prix le plus bas d'emblée.',
    },
    {
      icon: Shield,
      color: '#f59e0b',
      glow: 'rgba(245,158,11,0.12)',
      num: '03',
      title: 'Dossier traité en 48h',
      desc: 'Nous gérons tout avec votre banque. Signature électronique, résiliation de l\'ancien contrat, mise en place.',
    },
  ]

  return (
    <section style={{ background: '#0a0b12', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: 16 }}>
            Processus
          </span>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', margin: '0 0 16px' }}>
            15 minutes. Dossier complet.
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)', maxWidth: 500, margin: '0 auto' }}>
            Le processus le plus rapide du marché, de la simulation à la prise en charge.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {steps.map(({ icon: Icon, color, glow, num, title, desc }) => (
            <div key={num} style={{
              background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20, padding: 32, position: 'relative', overflow: 'hidden',
              transition: 'border-color 0.3s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = color + '40'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
            >
              <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`, pointerEvents: 'none' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: glow, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} color={color} />
                </div>
                <span style={{ fontSize: 48, fontWeight: 900, color: 'rgba(255,255,255,0.04)', letterSpacing: '-2px', lineHeight: 1 }}>{num}</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.3px' }}>{title}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Preuve sociale ──────────────────────────────────────────────────── */
const SocialProofV2 = () => {
  const reviews = [
    { initials: 'MR', name: 'Marie R.', role: 'Lyon', text: 'Dossier monté en 12 minutes, tout s\'est rempli automatiquement. J\'économise 142€/mois.', saving: '8 400€' },
    { initials: 'TD', name: 'Thomas D.', role: 'Paris', text: 'Impressionné par la vitesse. Le dossier était prêt avant même que je finisse mon café.', saving: '11 200€' },
    { initials: 'SM', name: 'Sophie M.', role: 'Bordeaux', text: 'En 20 minutes j\'avais un contrat moins cher que celui de ma banque. Incroyable.', saving: '7 800€' },
  ]

  return (
    <section style={{ background: '#08090e', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 16 }}>
            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#f59e0b" color="#f59e0b" />)}
            <span style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginLeft: 8 }}>4.9 · 2 318 avis</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 900, color: '#fff', letterSpacing: '-1px', margin: 0 }}>
            Ils ont économisé. Vraiment.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {reviews.map(({ initials, name, role, text, saving }) => (
            <div key={name} style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 18, padding: 28,
            }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
              </div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: '0 0 20px', fontStyle: 'italic' }}>
                "{text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#10b981' }}>{initials}</div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>{name}</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', margin: 0 }}>{role}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 18, fontWeight: 900, color: '#10b981', margin: 0 }}>{saving}</p>
                  <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', margin: 0 }}>économisés</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Feature : extraction IA mise en avant ─────────────────────────── */
const FeatureAIV2 = () => (
  <section style={{ background: '#0a0b12', padding: '100px 0' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: 16 }}>
            Technologie
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 900, color: '#fff', letterSpacing: '-1.5px', margin: '0 0 20px' }}>
            Vos documents.<br />
            <span style={{ color: '#818cf8' }}>Dossier complété.</span>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, margin: '0 0 32px', maxWidth: 440 }}>
            Téléversez votre CNI et votre offre de prêt. En quelques secondes, le dossier se remplit automatiquement — nom, prénom, montant, taux, durée. Vous n'avez qu'à vérifier.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              ['CNI recto / verso', 'Extraction nom, prénom, date de naissance, sexe'],
              ['Offre de prêt ou tableau d\'amortissement', 'Montant, taux, durée, paliers — même sur plusieurs prêts'],
              ['PDF, photo, scan', 'Tous les formats acceptés'],
            ].map(([title, sub]) => (
              <div key={title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(129,140,248,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <CheckCircle2 size={12} color="#818cf8" />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: 0 }}>{title}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', margin: '2px 0 0' }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mockup document upload */}
        <div style={{
          background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 24, padding: 32, position: 'relative',
        }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 24, background: 'radial-gradient(ellipse at 80% 10%, rgba(99,102,241,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />

          {/* Upload zone */}
          <div style={{ border: '1.5px dashed rgba(99,102,241,0.3)', borderRadius: 16, padding: 28, textAlign: 'center', marginBottom: 20, background: 'rgba(99,102,241,0.04)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(99,102,241,0.15)', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Upload size={20} color="#818cf8" />
            </div>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.6)', margin: '0 0 4px' }}>Glissez vos documents ici</p>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', margin: 0 }}>CNI · Offre de prêt · PDF, JPG, PNG</p>
          </div>

          {/* Champs pré-remplis */}
          {[
            ['Prénom', 'Marie', true],
            ['Nom', 'Dupont', true],
            ['Montant du prêt', '220 000 €', true],
            ['Durée', '240 mois', true],
            ['Taux nominal', '3.20 %', true],
          ].map(([label, value, filled]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 14px', background: filled ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.03)', borderRadius: 10, marginBottom: 8, border: `1px solid ${filled ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.06)'}` }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: filled ? '#10b981' : 'rgba(255,255,255,0.2)' }}>{value}</span>
                {filled && <CheckCircle2 size={12} color="#10b981" />}
              </div>
            </div>
          ))}
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 12, marginBottom: 0 }}>✓ Dossier pré-rempli automatiquement</p>
        </div>
      </div>
    </div>
  </section>
)

/* ─── CTA final ──────────────────────────────────────────────────────── */
const CTAV2 = () => (
  <section style={{ background: '#08090e', padding: '100px 0' }}>
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 999, padding: '6px 14px', marginBottom: 32 }}>
        <Lock size={12} color="#10b981" />
        <span style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>Service 100% gratuit · Sans engagement</span>
      </div>
      <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 58px)', fontWeight: 900, color: '#fff', letterSpacing: '-2px', margin: '0 0 20px', lineHeight: 1.05 }}>
        Prêt à économiser ?
      </h2>
      <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)', margin: '0 0 40px' }}>
        Déposez vos documents maintenant. Résultat en moins de 15 minutes.
      </p>
      <a href="/souscription" style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        background: '#10b981', color: '#fff', padding: '18px 40px', borderRadius: 14,
        fontSize: 17, fontWeight: 700, textDecoration: 'none',
        boxShadow: '0 0 60px rgba(16,185,129,0.3)',
      }}>
        Démarrer mon dossier gratuitement <ArrowRight size={18} />
      </a>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.2)', marginTop: 20 }}>
        Dossier traité en 48h · Signature électronique · Suivi en ligne
      </p>
    </div>
  </section>
)

/* ─── Footer minimal ─────────────────────────────────────────────────── */
const FooterV2 = () => (
  <footer style={{ background: '#08090e', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '32px 24px' }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
      <LogoWordmark dark={false} />
      <div style={{ display: 'flex', gap: 24 }}>
        {[['Mentions légales', '/mentions-legales'], ['CGU', '/cgu'], ['Confidentialité', '/politique-confidentialite']].map(([l, h]) => (
          <a key={l} href={h} style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>{l}</a>
        ))}
      </div>
      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', margin: 0 }}>© 2025 Assur Emprunteur</p>
    </div>
  </footer>
)

/* ─── Page complète ──────────────────────────────────────────────────── */
export const LandingV2 = () => (
  <div style={{ background: '#08090e', minHeight: '100vh' }}>
    <style>{`
      @keyframes spin { to { transform: rotate(360deg) } }
      * { box-sizing: border-box }
      select option { background: #1a1b2e; color: #fff }
    `}</style>
    <NavV2 />
    <HeroV2 />
    <InsurersV2 />
    <HowItWorksV2 />
    <FeatureAIV2 />
    <SocialProofV2 />
    <CTAV2 />
    <FooterV2 />
  </div>
)
