import React from 'react'
import { Star, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Thomas D.',
    role: 'Propriétaire à Lyon',
    initials: 'TD',
    color: 'from-blue-500 to-indigo-600',
    savings: '11 200€',
    rating: 5,
    text: "J'étais sceptique au début, mais Assur-Emprunteur m'a permis d'économiser plus de 11 000€ sur mon prêt de 280 000€. Le processus était incroyablement simple.",
  },
  {
    name: 'Sophie M.',
    role: 'Cadre à Paris',
    initials: 'SM',
    color: 'from-emerald-500 to-teal-600',
    savings: '7 800€',
    rating: 5,
    text: "En 20 minutes chrono, j'avais un devis moins cher que ma banque avec les mêmes garanties. Je recommande à 100% à tous mes amis propriétaires.",
  },
  {
    name: 'Laurent B.',
    role: 'Entrepreneur à Bordeaux',
    initials: 'LB',
    color: 'from-violet-500 to-purple-600',
    savings: '9 400€',
    rating: 5,
    text: "Le conseiller m'a accompagné de A à Z. Ils ont géré toutes les démarches avec ma banque. Je n'ai rien eu à faire, et j'économise 130€ par mois !",
  },
]

const StarRating = ({ count }) => (
  <div className="flex gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-[#10b981] text-[#10b981]" />
    ))}
  </div>
)

export const Testimonials = () => (
  <section id="avis" className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="inline-block text-sm font-semibold text-[#10b981] uppercase tracking-widest mb-4">
          Avis vérifiés
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a1340] mb-4 tracking-tight">
          Ils ont fait confiance à Assur-Emprunteur
        </h2>
        <div className="flex items-center justify-center gap-3 mt-4">
          <StarRating count={5} />
          <span className="text-slate-500 text-sm font-medium">4.9/5 · 2 318 avis</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map(({ name, role, initials, color, savings, rating, text }) => (
          <div key={name} className="relative bg-slate-50 rounded-2xl p-7 border border-slate-100 hover:shadow-lg transition-shadow duration-300">
            <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-200" />
            <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5 mb-5">
              <span className="text-xs font-semibold text-emerald-700">Économies : {savings}</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">"{text}"</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white text-sm font-bold`}>
                  {initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#0a1340]">{name}</div>
                  <div className="text-xs text-slate-400">{role}</div>
                </div>
              </div>
              <StarRating count={rating} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)
