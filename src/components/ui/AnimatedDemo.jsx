import React, { useState, useEffect } from 'react'
import { Shield, CheckCircle2, TrendingDown, ArrowRight, Star, MessageCircle, ChevronRight } from 'lucide-react'

const DURATION = 4000 // ms par écran

/* ─── Écran 1 : Hero ──────────────────────────────────────── */
const ScreenHero = () => (
  <div className="w-full h-full bg-[#0a1340] flex flex-col items-center justify-center px-8 relative overflow-hidden">
    <div className="absolute inset-0 opacity-10"
      style={{ background: 'radial-gradient(circle at 70% 30%, #10b981, transparent 60%)' }} />
    <div className="relative text-center max-w-lg">
      <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
        <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
        <span className="text-white/70 text-xs font-medium">N°1 de l'assurance emprunteur</span>
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-3 leading-tight">
        Votre assurance emprunteur à{' '}
        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg,#10b981,#34d399)' }}>
          -60%
        </span>
      </h2>
      <p className="text-white/50 text-sm mb-6">Comparez en 2 minutes · 100% en ligne · Sans engagement</p>
      <div className="flex justify-center gap-3">
        <div className="bg-[#10b981] text-white text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2">
          Comparer maintenant <ArrowRight className="w-4 h-4" />
        </div>
        <div className="border border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-xl">
          Voir une démo
        </div>
      </div>
    </div>
  </div>
)

/* ─── Écran 2 : Simulateur étape 1 ───────────────────────── */
const ScreenSimStep1 = () => (
  <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center px-6">
    <p className="text-xs font-bold text-[#10b981] uppercase tracking-widest mb-3">Simulateur gratuit</p>
    <h3 className="text-xl font-bold text-[#0a1340] mb-6">Votre prêt immobilier</h3>
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 w-full max-w-sm">
      <div className="mb-4">
        <label className="text-xs font-semibold text-slate-500 mb-1 block">Montant du prêt</label>
        <div className="flex items-center justify-between bg-[#f0f4ff] border border-[#0f1f6b]/20 rounded-xl px-4 py-3">
          <span className="font-bold text-[#0a1340]">250 000</span>
          <span className="text-slate-400 text-sm">€</span>
        </div>
      </div>
      <div className="mb-5">
        <label className="text-xs font-semibold text-slate-500 mb-1 block">Durée du prêt</label>
        <div className="flex gap-2">
          {[10, 15, 20, 25].map((y) => (
            <div key={y} className={`flex-1 py-2 text-sm rounded-xl text-center font-medium border ${y === 20 ? 'bg-[#0f1f6b] text-white border-[#0f1f6b]' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
              {y}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#10b981] text-white text-sm font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 w-full">
        Continuer <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  </div>
)

/* ─── Écran 3 : Résultats ─────────────────────────────────── */
const ScreenResults = () => (
  <div className="w-full h-full bg-white flex flex-col items-center justify-center px-6">
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-[#0a1340]">Vos meilleures offres</h3>
        <div className="flex items-center gap-1 text-xs font-bold text-[#10b981]">
          <TrendingDown className="w-3.5 h-3.5" /> Jusqu'à 58% d'économies
        </div>
      </div>

      {/* Carte 1 - meilleure offre */}
      <div className="bg-white rounded-2xl border-2 border-[#10b981] shadow-md p-4 mb-3 relative">
        <div className="absolute -top-2.5 left-4 bg-[#10b981] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <Star className="w-2.5 h-2.5 fill-white" /> Meilleure offre
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#E3000F]" />
            <span className="text-xs font-bold text-[#0a1340]">APRIL Santé Prévoyance</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-extrabold text-[#0a1340]">38€</span>
            <span className="text-xs text-slate-400">/mois</span>
          </div>
        </div>
        <div className="bg-emerald-50 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
          <TrendingDown className="w-3 h-3 text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-700">Économisez <strong>12 960€</strong> (58%)</span>
        </div>
      </div>

      {/* Carte 2 */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#003A5C]" />
            <span className="text-xs font-bold text-[#0a1340]">SwissLife Assurance</span>
          </div>
          <div>
            <span className="text-lg font-extrabold text-[#0a1340]">44€</span>
            <span className="text-xs text-slate-400">/mois</span>
          </div>
        </div>
        <div className="mt-1.5 text-xs text-emerald-600 font-semibold">Économisez 11 520€ (51%)</div>
      </div>

      <div className="bg-[#0f1f6b] text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 w-full">
        Choisir cette offre <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </div>
  </div>
)

/* ─── Écran 4 : Coordonnées ───────────────────────────────── */
const ScreenContact = () => (
  <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center px-6">
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 w-full max-w-sm">
      <h3 className="text-base font-bold text-[#0a1340] mb-4">Vos coordonnées</h3>
      <div className="bg-[#f0f4ff] rounded-xl p-3 mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-slate-400">Offre sélectionnée</p>
          <p className="text-xs font-bold text-[#0a1340]">APRIL Santé Prévoyance</p>
        </div>
        <div className="text-right">
          <p className="text-base font-extrabold text-[#0a1340]">38€<span className="text-xs font-normal text-slate-400">/mois</span></p>
          <p className="text-[10px] font-bold text-emerald-600">-58% vs banque</p>
        </div>
      </div>
      {[['Prénom', 'Jean'], ['Email', 'jean.dupont@gmail.com'], ['Téléphone', '06 12 34 56 78']].map(([label, val]) => (
        <div key={label} className="mb-3">
          <label className="text-[10px] font-semibold text-slate-400 block mb-1">{label}</label>
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600">{val}</div>
        </div>
      ))}
      <div className="bg-[#10b981] text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 mt-2 w-full">
        Recevoir mon devis <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </div>
  </div>
)

/* ─── Écran 5 : Chatbot ───────────────────────────────────── */
const ScreenChatbot = () => (
  <div className="w-full h-full bg-slate-100 flex items-end justify-end p-6">
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-72 overflow-hidden">
      <div className="bg-[#0f1f6b] px-4 py-3 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <Shield className="w-4 h-4 text-[#10b981]" />
        </div>
        <div>
          <p className="text-white font-semibold text-xs">Conseiller Assur-Emprunt</p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
            <span className="text-white/50 text-[10px]">En ligne</span>
          </div>
        </div>
      </div>
      <div className="p-3 space-y-2.5">
        <div className="flex gap-2">
          <div className="w-6 h-6 rounded-full bg-[#0f1f6b] flex-shrink-0 flex items-center justify-center">
            <Shield className="w-3 h-3 text-[#10b981]" />
          </div>
          <div className="bg-slate-100 rounded-xl rounded-tl-sm px-3 py-2 text-[11px] text-slate-700 max-w-[85%]">
            Bonjour 👋 Je suis là pour vous aider à économiser sur votre assurance emprunteur !
          </div>
        </div>
        <div className="flex gap-2 flex-row-reverse">
          <div className="w-6 h-6 rounded-full bg-[#10b981] flex-shrink-0" />
          <div className="bg-[#0f1f6b] rounded-xl rounded-tr-sm px-3 py-2 text-[11px] text-white max-w-[80%]">
            Comment changer d'assurance ?
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-6 h-6 rounded-full bg-[#0f1f6b] flex-shrink-0 flex items-center justify-center">
            <Shield className="w-3 h-3 text-[#10b981]" />
          </div>
          <div className="bg-slate-100 rounded-xl rounded-tl-sm px-3 py-2 text-[11px] text-slate-700 max-w-[85%]">
            Grâce à la loi Lemoine, vous pouvez changer à tout moment ! Nous gérons tout pour vous 😊
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 px-3 py-2.5 flex gap-2">
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-[11px] text-slate-400">
          Votre question...
        </div>
        <div className="w-7 h-7 rounded-xl bg-[#0f1f6b] flex items-center justify-center flex-shrink-0">
          <ArrowRight className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
    </div>
  </div>
)

/* ─── Écran 6 : Confirmation ──────────────────────────────── */
const ScreenConfirm = () => (
  <div className="w-full h-full bg-[#0a1340] flex flex-col items-center justify-center px-8 relative overflow-hidden">
    <div className="absolute inset-0 opacity-10"
      style={{ background: 'radial-gradient(circle at 50% 40%, #10b981, transparent 60%)' }} />
    <div className="relative text-center">
      <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-5">
        <CheckCircle2 className="w-9 h-9 text-[#10b981]" />
      </div>
      <h3 className="text-2xl font-extrabold text-white mb-2">Demande envoyée !</h3>
      <p className="text-white/50 text-sm mb-6 max-w-xs">
        Un conseiller vous rappelle dans les 24h pour finaliser votre dossier et économiser.
      </p>
      <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
        {[['12 960€', 'économisés'], ['20 ans', 'de sérénité'], ['24h', 'de rappel']].map(([val, label]) => (
          <div key={label}>
            <div className="text-xl font-bold text-white">{val}</div>
            <div className="text-xs text-white/40">{label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

/* ─── Composant principal ─────────────────────────────────── */
const SCREENS = [
  { id: 'hero', label: 'Accueil', Component: ScreenHero },
  { id: 'sim1', label: 'Simulateur', Component: ScreenSimStep1 },
  { id: 'results', label: 'Résultats', Component: ScreenResults },
  { id: 'contact', label: 'Contact', Component: ScreenContact },
  { id: 'chat', label: 'Chatbot', Component: ScreenChatbot },
  { id: 'confirm', label: 'Confirmation', Component: ScreenConfirm },
]

export const AnimatedDemo = () => {
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setProgress(0)
    const step = 50
    const increment = (step / DURATION) * 100
    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(p + increment, 100))
    }, step)

    const screenTimer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent((c) => (c + 1) % SCREENS.length)
        setVisible(true)
      }, 300)
    }, DURATION)

    return () => {
      clearInterval(progressTimer)
      clearTimeout(screenTimer)
    }
  }, [current])

  const { Component } = SCREENS[current]

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden rounded-2xl">
      {/* Barre de progression */}
      <div className="flex gap-1 p-3 bg-slate-900">
        {SCREENS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setVisible(false); setTimeout(() => { setCurrent(i); setVisible(true) }, 200) }}
            className="flex-1 h-1 rounded-full overflow-hidden cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          >
            <div
              className="h-full rounded-full transition-all"
              style={{
                background: '#10b981',
                width: i < current ? '100%' : i === current ? `${progress}%` : '0%',
              }}
            />
          </button>
        ))}
      </div>

      {/* Label de l'étape */}
      <div className="bg-slate-900 px-4 pb-2 flex items-center gap-2">
        {SCREENS.map((s, i) => (
          <span key={s.id} className={`text-[11px] font-medium ${i === current ? 'text-white' : 'text-white/30'}`}>
            {i === current && <span className="text-[#10b981] mr-1">›</span>}{s.label}
          </span>
        ))}
      </div>

      {/* Contenu animé */}
      <div
        className="flex-1"
        style={{
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(8px)',
        }}
      >
        <Component />
      </div>
    </div>
  )
}
