import React from 'react'
import { CheckCircle2, Clock, Phone } from 'lucide-react'
import { SouscriptionWizard } from '@/pages/Souscription'

const STATS = [
  { value: '8 400€', label: 'économies moyennes' },
  { value: '48h', label: 'délai de réponse' },
  { value: '4.9/5', label: 'satisfaction client' },
]

const BENEFITS = [
  { icon: Clock,        title: '15 min',          sub: 'Durée estimée' },
  { icon: CheckCircle2, title: 'Sans engagement',  sub: '100% gratuit' },
  { icon: Phone,        title: 'Tarifs minimum', sub: 'Appliqués sur tous les dossiers' },
]

export const SuiviDossier = () => (
  <section id="suivi-dossier" className="py-20 bg-gradient-to-b from-white to-slate-50">

    {/* ── En-tête de section ── */}
    <div className="max-w-3xl mx-auto px-6 text-center mb-12">
      <span className="inline-flex items-center gap-2 text-xs font-bold text-[#0f1f6b] uppercase tracking-widest mb-5 bg-[#f0f4ff] px-4 py-2 rounded-full border border-[#0f1f6b]/15">
        <span className="w-2 h-2 rounded-full bg-[#0f1f6b]" />
        Dossier guidé étape par étape
      </span>
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1340] mb-4 tracking-tight">
        Déposez vos documents,<br />
        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg,#0f1f6b,#3b5bdb)' }}>
          on s'occupe du reste
        </span>
      </h2>
      <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
        Téléversez vos documents — le dossier se pré-remplit automatiquement. Vous accédez directement aux tarifs les plus bas du marché, sans négociation.
      </p>

      {/* Bénéfices */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {BENEFITS.map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0f1f6b] to-[#3b5bdb] flex items-center justify-center shadow-md shadow-[#0f1f6b]/20">
              <Icon className="w-5 h-5 text-white" />
            </div>
            <p className="font-bold text-sm text-[#0a1340]">{title}</p>
            <p className="text-xs text-slate-400">{sub}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-px bg-slate-200 rounded-2xl overflow-hidden">
        {STATS.map(({ value, label }) => (
          <div key={label} className="bg-white py-4 px-3 text-center">
            <p className="text-2xl font-extrabold text-[#0a1340]">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </div>

    <SouscriptionWizard embedded />
  </section>
)
