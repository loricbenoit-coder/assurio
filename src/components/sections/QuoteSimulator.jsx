import React, { useState } from 'react'
import { ArrowRight, ArrowLeft, CheckCircle2, TrendingDown, Star, Phone, Shield, Info } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { computeQuotes } from '@/lib/quoteEngine'
import { cn } from '@/lib/utils'

/* ─── Étapes du formulaire ─────────────────────────────────── */
const STEPS = ['Votre prêt', 'Votre profil', 'Vos résultats']

const PROFESSIONS = [
  { value: 'cadre', label: 'Cadre / Ingénieur' },
  { value: 'employe', label: 'Employé / Ouvrier' },
  { value: 'fonctionnaire', label: 'Fonctionnaire' },
  { value: 'liberal', label: 'Profession libérale' },
  { value: 'artisan', label: 'Artisan / Commerçant' },
  { value: 'autre', label: 'Autre' },
]

const GUARANTEE_LABELS = {
  DC: 'Décès',
  PTIA: 'Invalidité totale',
  ITT: 'Incapacité travail',
  IPT: 'Invalidité permanente',
  IPP: 'Invalidité partielle',
  PE: 'Perte emploi',
}

/* ─── Composants UI ─────────────────────────────────────────── */
const StepIndicator = ({ current }) => (
  <div className="flex items-center justify-center gap-2 mb-8">
    {STEPS.map((label, i) => (
      <React.Fragment key={label}>
        <div className="flex items-center gap-2">
          <div className={cn(
            'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all',
            i < current
              ? 'bg-[#10b981] text-white'
              : i === current
                ? 'bg-[#0f1f6b] text-white'
                : 'bg-slate-200 text-slate-400'
          )}>
            {i < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
          </div>
          <span className={cn(
            'text-xs font-medium hidden sm:block',
            i === current ? 'text-[#0f1f6b]' : 'text-slate-400'
          )}>
            {label}
          </span>
        </div>
        {i < STEPS.length - 1 && (
          <div className={cn('flex-1 h-px max-w-[60px]', i < current ? 'bg-[#10b981]' : 'bg-slate-200')} />
        )}
      </React.Fragment>
    ))}
  </div>
)

const InputField = ({ label, hint, children }) => (
  <div className="mb-5">
    <label className="block text-sm font-semibold text-[#0a1340] mb-1.5">{label}</label>
    {hint && <p className="text-xs text-slate-400 mb-2">{hint}</p>}
    {children}
  </div>
)

const inputClass = 'w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0f1f6b] focus:ring-1 focus:ring-[#0f1f6b]/20 bg-white'

/* ─── Carte de résultat ─────────────────────────────────────── */
const QuoteCard = ({ quote, rank, onContact }) => (
  <div className={cn(
    'relative bg-white rounded-2xl border p-5 transition-all hover:shadow-lg',
    rank === 0 ? 'border-[#10b981] shadow-md shadow-emerald-100' : 'border-slate-200'
  )}>
    {rank === 0 && (
      <div className="absolute -top-3 left-5 bg-[#10b981] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
        <Star className="w-3 h-3 fill-white" /> Meilleure offre
      </div>
    )}

    <div className="flex items-start justify-between mb-4">
      <div>
        {/* Logo texte coloré */}
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: quote.color }} />
          <span className="font-bold text-sm text-[#0a1340]">{quote.insurer}</span>
        </div>
        {quote.badge && (
          <span className={cn(
            'text-xs font-medium px-2 py-0.5 rounded-full',
            quote.badgeColor === 'emerald' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
          )}>
            {quote.badge}
          </span>
        )}
      </div>
      <div className="text-right">
        <div className="text-2xl font-extrabold text-[#0a1340]">{quote.monthly}€<span className="text-sm font-normal text-slate-400">/mois</span></div>
        <div className="text-xs text-slate-400">soit {quote.total.toLocaleString('fr-FR')}€ au total</div>
      </div>
    </div>

    {/* Économies */}
    <div className="flex items-center gap-2 bg-emerald-50 rounded-xl px-3 py-2 mb-4">
      <TrendingDown className="w-4 h-4 text-emerald-600 flex-shrink-0" />
      <span className="text-sm font-semibold text-emerald-700">
        Économisez <strong>{quote.savings.toLocaleString('fr-FR')}€</strong> ({quote.savingsPct}%) vs votre banque
      </span>
    </div>

    {/* Garanties */}
    <div className="flex flex-wrap gap-1.5 mb-4">
      {quote.guarantees.map((g) => (
        <span key={g} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg font-medium">
          {GUARANTEE_LABELS[g] || g}
        </span>
      ))}
    </div>

    <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
      <span>TAEA : {quote.taea}%</span>
      <span>Délai de carence : {quote.delay}j</span>
    </div>

    <Button
      size="sm"
      variant={rank === 0 ? 'primary' : 'outline'}
      className="w-full"
      onClick={() => onContact(quote.insurer)}
    >
      {rank === 0 ? 'Souscrire cette offre' : 'Choisir cette offre'}
      <ArrowRight className="w-4 h-4" />
    </Button>
  </div>
)

/* ─── Composant principal ───────────────────────────────────── */
export const QuoteSimulator = () => {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    amount: '', duration: '', age: '', smoker: false, profession: 'cadre',
  })
  const [results, setResults] = useState(null)
  const [contacted, setContacted] = useState(null)

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const canNextStep0 = form.amount >= 50000 && form.amount <= 1000000 && form.duration >= 5 && form.duration <= 30
  const canNextStep1 = form.age >= 18 && form.age <= 70

  const handleCompute = () => {
    const r = computeQuotes({
      amount: Number(form.amount),
      duration: Number(form.duration),
      age: Number(form.age),
      smoker: form.smoker,
      profession: form.profession,
    })
    setResults(r)
    setStep(2)
  }

  const handleContact = (insurer) => setContacted(insurer)

  return (
    <section id="simulateur" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-[#10b981] uppercase tracking-widest mb-4">
            Simulateur gratuit
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0a1340] mb-4 tracking-tight">
            Comparez les offres en 2 minutes
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Obtenez une estimation personnalisée et découvrez combien vous pouvez économiser.
          </p>
          <div className="inline-flex items-center gap-2 mt-3 text-xs text-slate-400">
            <Info className="w-3.5 h-3.5" />
            Simulation basée sur les tarifs du marché — résultats indicatifs
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
            <StepIndicator current={step} />

            {/* ── Étape 0 : Le prêt ── */}
            {step === 0 && (
              <div>
                <h3 className="text-xl font-bold text-[#0a1340] mb-6">Votre prêt immobilier</h3>

                <InputField label="Montant du prêt" hint="Entre 50 000€ et 1 000 000€">
                  <div className="relative">
                    <input
                      type="number"
                      className={inputClass}
                      placeholder="ex : 250 000"
                      value={form.amount}
                      onChange={(e) => set('amount', e.target.value)}
                      min={50000} max={1000000}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">€</span>
                  </div>
                </InputField>

                <InputField label="Durée du prêt" hint="Entre 5 et 30 ans">
                  <div className="relative">
                    <input
                      type="number"
                      className={inputClass}
                      placeholder="ex : 20"
                      value={form.duration}
                      onChange={(e) => set('duration', e.target.value)}
                      min={5} max={30}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">ans</span>
                  </div>
                </InputField>

                {/* Raccourcis durée */}
                <div className="flex gap-2 mt-1 mb-6">
                  {[10, 15, 20, 25].map((y) => (
                    <button
                      key={y}
                      onClick={() => set('duration', y)}
                      className={cn(
                        'flex-1 py-2 text-sm rounded-xl border font-medium transition-all',
                        Number(form.duration) === y
                          ? 'bg-[#0f1f6b] text-white border-[#0f1f6b]'
                          : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-[#0f1f6b]/40'
                      )}
                    >
                      {y} ans
                    </button>
                  ))}
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  disabled={!canNextStep0}
                  onClick={() => setStep(1)}
                >
                  Continuer <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* ── Étape 1 : Profil ── */}
            {step === 1 && (
              <div>
                <h3 className="text-xl font-bold text-[#0a1340] mb-6">Votre profil</h3>

                <InputField label="Votre âge">
                  <div className="relative">
                    <input
                      type="number"
                      className={inputClass}
                      placeholder="ex : 35"
                      value={form.age}
                      onChange={(e) => set('age', e.target.value)}
                      min={18} max={70}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">ans</span>
                  </div>
                </InputField>

                <InputField label="Profession">
                  <select
                    className={inputClass}
                    value={form.profession}
                    onChange={(e) => set('profession', e.target.value)}
                  >
                    {PROFESSIONS.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </InputField>

                <InputField label="Statut tabagique">
                  <div className="flex gap-3">
                    {[
                      { value: false, label: '🚭 Non-fumeur' },
                      { value: true, label: '🚬 Fumeur' },
                    ].map(({ value, label }) => (
                      <button
                        key={label}
                        onClick={() => set('smoker', value)}
                        className={cn(
                          'flex-1 py-3 rounded-xl border text-sm font-medium transition-all',
                          form.smoker === value
                            ? 'bg-[#0f1f6b] text-white border-[#0f1f6b]'
                            : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-[#0f1f6b]/40'
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </InputField>

                <div className="flex gap-3 mt-2">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(0)}>
                    <ArrowLeft className="w-4 h-4" /> Retour
                  </Button>
                  <Button
                    className="flex-1"
                    size="md"
                    disabled={!canNextStep1}
                    onClick={handleCompute}
                  >
                    Voir mes résultats <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ── Étape 2 : Résultats ── */}
            {step === 2 && results && !contacted && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#0a1340]">Vos meilleures offres</h3>
                  <button
                    onClick={() => { setStep(0); setResults(null) }}
                    className="text-xs text-slate-400 hover:text-[#0a1340] underline"
                  >
                    Modifier
                  </button>
                </div>

                {/* Résumé vs banque */}
                <div className="bg-slate-50 rounded-2xl p-4 mb-6 flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    Assurance bancaire : <strong className="text-slate-700">{results.bankMonthly}€/mois</strong>
                  </div>
                  <div className="text-sm font-bold text-[#10b981] flex items-center gap-1">
                    <TrendingDown className="w-4 h-4" />
                    Jusqu'à {results.quotes[0].savingsPct}% d'économies
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {results.quotes.slice(0, 3).map((quote, i) => (
                    <QuoteCard key={quote.insurer} quote={quote} rank={i} onContact={handleContact} />
                  ))}
                </div>

                <p className="text-xs text-slate-400 text-center mt-4">
                  Simulation indicative · Tarifs définitifs après étude personnalisée
                </p>
              </div>
            )}

            {/* ── Confirmation contact ── */}
            {contacted && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-[#10b981]" />
                </div>
                <h3 className="text-xl font-bold text-[#0a1340] mb-2">Demande enregistrée !</h3>
                <p className="text-slate-500 text-sm mb-6">
                  Un conseiller Assur-Emprunt va vous recontacter dans les <strong>24h</strong> pour finaliser votre dossier <strong>{contacted}</strong>.
                </p>
                <div className="flex flex-col gap-3">
                  <Button size="md" className="w-full">
                    <Phone className="w-4 h-4" /> Être rappelé maintenant
                  </Button>
                  <button
                    onClick={() => { setContacted(null); setStep(0); setResults(null) }}
                    className="text-sm text-slate-400 hover:text-slate-600 underline"
                  >
                    Faire une nouvelle simulation
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Garanties */}
          <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
            {[
              { icon: Shield, text: 'Données sécurisées' },
              { icon: CheckCircle2, text: 'Sans engagement' },
              { icon: Star, text: 'Service 100% gratuit' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-xs text-slate-400">
                <Icon className="w-3.5 h-3.5 text-[#10b981]" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
