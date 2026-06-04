import React from 'react'
import { TrendingDown, Clock, HeartHandshake, ShieldCheck, Zap, Users } from 'lucide-react'

const ADVANTAGES = [
  {
    icon: TrendingDown,
    title: "Jusqu'à 60% d'économies",
    description: "En changeant d'assurance, vous pouvez économiser en moyenne 8 000€ sur la durée totale de votre prêt.",
    color: 'text-[#10b981]',
    bg: 'bg-emerald-50',
  },
  {
    icon: Clock,
    title: 'Rapide et sans contrainte',
    description: "Obtenez votre comparatif en 2 minutes, sans rendez-vous, 24h/24 et 7j/7.",
    color: 'text-[#2a55e8]',
    bg: 'bg-blue-50',
  },
  {
    icon: HeartHandshake,
    title: 'Accompagnement humain',
    description: "Nos conseillers experts sont disponibles par téléphone, chat ou email pour répondre à vos questions.",
    color: 'text-[#10b981]',
    bg: 'bg-emerald-50',
  },
  {
    icon: ShieldCheck,
    title: 'Garanties identiques ou meilleures',
    description: "Nous vérifions que les garanties de votre nouvelle assurance sont au moins équivalentes à celles de votre banque.",
    color: 'text-[#2a55e8]',
    bg: 'bg-blue-50',
  },
  {
    icon: Zap,
    title: 'Résiliation simplifiée',
    description: "Nous gérons toutes les démarches administratives avec votre banque. Vous n'avez rien à faire.",
    color: 'text-[#10b981]',
    bg: 'bg-emerald-50',
  },
  {
    icon: Users,
    title: '50 000 clients satisfaits',
    description: "Rejoignez les milliers de Français qui nous font confiance pour les aider à économiser sur leur prêt.",
    color: 'text-[#2a55e8]',
    bg: 'bg-blue-50',
  },
]

export const Advantages = () => (
  <section id="avantages" className="py-24 bg-slate-50">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="inline-block text-sm font-semibold text-[#10b981] uppercase tracking-widest mb-4">
          Pourquoi Assur-Emprunt
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a1340] mb-4 tracking-tight">
          Des avantages concrets
        </h2>
        <p className="text-lg text-slate-500 max-w-xl mx-auto">
          Nous mettons toute notre expertise au service de vos économies et de votre tranquillité d&apos;esprit.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ADVANTAGES.map(({ icon: Icon, title, description, color, bg }) => (
          <div key={title} className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-5`}>
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <h3 className="text-lg font-semibold text-[#0a1340] mb-2">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)
