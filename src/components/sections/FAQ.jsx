import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const FAQ_ITEMS = [
  {
    question: "Puis-je changer d'assurance emprunteur à tout moment ?",
    answer: "Oui. Depuis la loi Lemoine de 2022, vous pouvez résilier et changer d'assurance emprunteur à tout moment, sans frais ni pénalité, quelle que soit la date de signature de votre prêt.",
  },
  {
    question: 'Ma banque peut-elle refuser ma nouvelle assurance ?',
    answer: "Votre banque est obligée d'accepter votre nouvelle assurance si elle présente des garanties au moins équivalentes. Nous vérifions systématiquement l'équivalence des garanties avant toute souscription.",
  },
  {
    question: "Combien de temps prend le changement d'assurance ?",
    answer: "En moyenne, le délai total est de 10 à 20 jours. Nous nous occupons de tout : la constitution du dossier, la communication avec votre banque et le suivi jusqu'à la résiliation effective.",
  },
  {
    question: "Est-ce que je dois passer un questionnaire de santé ?",
    answer: "Depuis la loi Lemoine, les emprunteurs dont le crédit se termine avant leurs 60 ans et dont le capital assuré est inférieur à 200 000€ sont exonérés de questionnaire de santé.",
  },
  {
    question: "Le service Assur Emprunteur est-il payant ?",
    answer: "Non. Le service Assur Emprunteur de comparaison et d'accompagnement est totalement gratuit pour vous. Nous sommes rémunérés par les assureurs partenaires, sans que cela n'impacte le prix que vous payez.",
  },
]

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        className="w-full flex items-center justify-between py-5 text-left group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-[#0a1340] group-hover:text-[#0f1f6b] transition-colors pr-4 text-sm md:text-base">
          {question}
        </span>
        <ChevronDown className={cn(
          'w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300',
          open && 'rotate-180 text-[#10b981]'
        )} />
      </button>
      {open && (
        <div className="pb-5 text-slate-500 text-sm leading-relaxed">{answer}</div>
      )}
    </div>
  )
}

export const FAQ = () => (
  <section id="faq" className="py-24 bg-slate-50">
    <div className="max-w-3xl mx-auto px-6">
      <div className="text-center mb-14">
        <span className="inline-block text-sm font-semibold text-[#10b981] uppercase tracking-widest mb-4">
          Questions fréquentes
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a1340] tracking-tight">
          Tout ce que vous devez savoir
        </h2>
      </div>
      <div className="bg-white rounded-2xl p-2 border border-slate-100 shadow-sm">
        <div className="px-6">
          {FAQ_ITEMS.map((item) => (
            <FAQItem key={item.question} {...item} />
          ))}
        </div>
      </div>
    </div>
  </section>
)
