import React from 'react'
import { ClipboardList, Search, FileCheck, Smile } from 'lucide-react'

const STEPS = [
  {
    icon: ClipboardList,
    number: '01',
    title: 'Renseignez votre profil',
    description:
      'Répondez à quelques questions simples sur votre prêt et votre situation personnelle. Ça prend moins de 2 minutes.',
  },
  {
    icon: Search,
    number: '02',
    title: 'Comparez les offres',
    description:
      'Nous comparons pour vous les meilleures assurances emprunteur du marché en temps réel.',
  },
  {
    icon: FileCheck,
    number: '03',
    title: 'Souscrivez en ligne',
    description:
      'Choisissez votre offre et signez électroniquement. Nous gérons les formalités avec votre banque.',
  },
  {
    icon: Smile,
    number: '04',
    title: 'Économisez tout de suite',
    description:
      'Votre nouvelle assurance prend effet immédiatement. Vous économisez dès le premier mois.',
  },
]

export const HowItWorks = () => (
  <section id="comment-ca-marche" className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-block text-sm font-semibold text-[#10b981] uppercase tracking-widest mb-4">
          Processus simplifié
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-[#0a1340] mb-4 tracking-tight">
          Comment ça marche ?
        </h2>
        <p className="text-lg text-slate-500 max-w-xl mx-auto">
          En 4 étapes simples, trouvez et souscrivez à la meilleure assurance emprunteur.
        </p>
      </div>

      {/* Steps */}
      <div className="grid md:grid-cols-4 gap-8 relative">
        {/* Connector line */}
        <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-slate-200 via-[#10b981]/40 to-slate-200" />

        {STEPS.map(({ icon: Icon, number, title, description }) => (
          <div key={number} className="relative flex flex-col items-center text-center group">
            {/* Icon circle */}
            <div className="relative z-10 w-20 h-20 rounded-2xl bg-[#f0f4ff] border-2 border-white shadow-lg flex items-center justify-center mb-6 group-hover:bg-[#0f1f6b] transition-colors duration-300">
              <Icon className="w-7 h-7 text-[#0f1f6b] group-hover:text-white transition-colors duration-300" />
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#10b981] text-white text-xs font-bold flex items-center justify-center">
                {number.replace('0', '')}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[#0a1340] mb-2">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)
