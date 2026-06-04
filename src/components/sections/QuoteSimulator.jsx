import React, { useState } from 'react'
import { ArrowRight, ArrowLeft, CheckCircle2, TrendingDown, Star, Phone, Shield, Info, Mail, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { computeQuotes } from '@/lib/quoteEngine'
import { cn } from '@/lib/utils'

const STEPS = ['Votre prêt', 'Votre profil', 'Vos offres', 'Contact']

const PROFESSIONS = [
  { value: 'cadre', label: 'Cadre / Ingénieur' },
  { value: 'employe', label: 'Employé / Ouvrier' },
  { value: 'fonctionnaire', label: 'Fonctionnaire' },
  { value: 'liberal', label: 'Profession libérale' },
  { value: 'artisan', label: 'Artisan / Commerçant' },
  { value: 'autre', label: 'Autre' },
]

const GUARANTEE_LABELS = {
  DC: 'Décès', PTIA: 'Invalidité totale', ITT: 'Incapacité travail',
  IPT: 'Invalidité permanente', IPP: 'Invalidité partielle', PE: 'Perte emploi',
}

const StepIndicator = ({ current }) => (
  <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8">
    {STEPS.map((label, i) => (
      <React.Fragment key={label}>
        <div className="flex items-center gap-1 sm:gap-1.5">
          <div className={cn(
            'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all',
            i < current ? 'bg-[#10b981] text-white' : i === current ? 'bg-[#0f1f6b] text-white' : 'bg-slate-200 text-slate-400'
          )}>
            {i < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
          </div>
          <span className={cn('text-xs font-medium hidden sm:block', i === current ? 'text-[#0f1f6b]' : 'text-slate-400')}>
            {label}
          </span>
        </div>
        {i < STEPS.length - 1 && (
          <div className={cn('flex-1 h-px max-w-[40px]', i < current ? 'bg-[#10b981]' : 'bg-slate-200')} />
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

const QuoteCard = ({ quote, rank, selected, onSelect }) => (
  <div
    className={cn(
      'relative bg-white rounded-2xl border p-5 transition-all cursor-pointer',
      selected ? 'border-[#0f1f6b] shadow-lg ring-1 ring-[#0f1f6b]'
        : rank === 0 ? 'border-[#10b981] shadow-md hover:shadow-lg'
        : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
    )}
    onClick={() => onSelect(quote)}
  >
    {rank === 0 && !selected && (
      <div className="absolute -top-3 left-5 bg-[#10b981] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
        <Star className="w-3 h-3 fill-white" /> Meilleure offre
      </div>
    )}
    {selected && (
      <div className="absolute -top-3 left-5 bg-[#0f1f6b] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
        <CheckCircle2 className="w-3 h-3" /> Sélectionnée
      </div>
    )}
    <div className="flex items-start justify-between mb-3">
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: quote.color }} />
          <span className="font-bold text-sm text-[#0a1340]">{quote.insurer}</span>
        </div>
        {quote.badge && (
          <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full',
            quote.badgeColor === 'emerald' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
          )}>{quote.badge}</span>
        )}
      </div>
      <div className="text-right">
        <div className="text-2xl font-extrabold text-[#0a1340]">
          {quote.monthly}€<span className="text-sm font-normal text-slate-400">/mois</span>
        </div>
        <div className="text-xs text-slate-400">{quote.total.toLocaleString('fr-FR')}€ au total</div>
      </div>
    </div>
    <div className="flex items-center gap-2 bg-emerald-50 rounded-xl px-3 py-2 mb-3">
      <TrendingDown className="w-4 h-4 text-emerald-600 flex-shrink-0" />
      <span className="text-sm font-semibold text-emerald-700">
        Économisez <strong>{quote.savings.toLocaleString('fr-FR')}€</strong> ({quote.savingsPct}%)
      </span>
    </div>
    <div className="flex flex-wrap gap-1.5 mb-3">
      {quote.guarantees.map((g) => (
        <span key={g} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg font-medium">
          {GUARANTEE_LABELS[g] || g}
        </span>
      ))}
    </div>
    <div className="flex items-center justify-between text-xs text-slate-400">
      <span>TAEA : {quote.taea}%</span>
      <span>Délai de carence : {quote.delay}j</span>
    </div>
  </div>
)

export const QuoteSimulator = () => {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ amount: '', duration: '', age: '', smoker: false, profession: 'cadre' })
  const [contact, setContact] = useState({ firstName: '', lastName: '', email: '', phone: '', rgpd: false })
  const [results, setResults] = useState(null)
  const [selectedQuote, setSelectedQuote] = useState(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))
  const setC = (key, val) => setContact((c) => ({ ...c, [key]: val }))

  const canNextStep0 = form.amount >= 50000 && form.amount <= 1000000 && form.duration >= 5 && form.duration <= 30
  const canNextStep1 = form.age >= 18 && form.age <= 70
  const canSubmit = contact.firstName && contact.lastName && contact.email && contact.phone && contact.rgpd

  const handleCompute = () => {
    const r = computeQuotes({
      amount: Number(form.amount), duration: Number(form.duration),
      age: Number(form.age), smoker: form.smoker, profession: form.profession,
    })
    setResults(r)
    setSelectedQuote(r.quotes[0])
    setStep(2)
  }

  const handleSubmitLead = async () => {
    if (!canSubmit) return
    setSending(true)
    setError(null)
    try {
      const res = await fetch('/.netlify/functions/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact, quote: selectedQuote,
          loanInfo: { amount: form.amount, duration: form.duration, age: form.age, smoker: form.smoker, profession: form.profession },
          bankMonthly: results.bankMonthly,
        }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer ou nous appeler directement.")
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="simulateur" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-[#10b981] uppercase tracking-widest mb-4">
            Simulateur gratuit
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a1340] mb-4 tracking-tight">
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
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
            <StepIndicator current={step} />

            {/* Étape 0 : Prêt */}
            {step === 0 && (
              <div>
                <h3 className="text-xl font-bold text-[#0a1340] mb-6">Votre prêt immobilier</h3>
                <InputField label="Montant du prêt" hint="Entre 50 000€ et 1 000 000€">
                  <div className="relative">
                    <input type="number" className={inputClass} placeholder="ex : 250 000"
                      value={form.amount} onChange={(e) => set('amount', e.target.value)} min={50000} max={1000000} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">€</span>
                  </div>
                </InputField>
                <InputField label="Durée du prêt" hint="Entre 5 et 30 ans">
                  <div className="relative">
                    <input type="number" className={inputClass} placeholder="ex : 20"
                      value={form.duration} onChange={(e) => set('duration', e.target.value)} min={5} max={30} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">ans</span>
                  </div>
                </InputField>
                <div className="flex gap-2 mt-1 mb-6">
                  {[10, 15, 20, 25].map((y) => (
                    <button key={y} onClick={() => set('duration', y)}
                      className={cn('flex-1 py-2 text-sm rounded-xl border font-medium transition-all',
                        Number(form.duration) === y
                          ? 'bg-[#0f1f6b] text-white border-[#0f1f6b]'
                          : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-[#0f1f6b]/40'
                      )}>
                      {y} ans
                    </button>
                  ))}
                </div>
                <Button className="w-full" size="lg" disabled={!canNextStep0} onClick={() => setStep(1)}>
                  Continuer <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* Étape 1 : Profil */}
            {step === 1 && (
              <div>
                <h3 className="text-xl font-bold text-[#0a1340] mb-6">Votre profil</h3>
                <InputField label="Votre âge">
                  <div className="relative">
                    <input type="number" className={inputClass} placeholder="ex : 35"
                      value={form.age} onChange={(e) => set('age', e.target.value)} min={18} max={70} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">ans</span>
                  </div>
                </InputField>
                <InputField label="Profession">
                  <select className={inputClass} value={form.profession} onChange={(e) => set('profession', e.target.value)}>
                    {PROFESSIONS.map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </InputField>
                <InputField label="Statut tabagique">
                  <div className="flex gap-3">
                    {[{ value: false, label: '🚭 Non-fumeur' }, { value: true, label: '🚬 Fumeur' }].map(({ value, label }) => (
                      <button key={label} onClick={() => set('smoker', value)}
                        className={cn('flex-1 py-3 rounded-xl border text-sm font-medium transition-all',
                          form.smoker === value
                            ? 'bg-[#0f1f6b] text-white border-[#0f1f6b]'
                            : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-[#0f1f6b]/40'
                        )}>
                        {label}
                      </button>
                    ))}
                  </div>
                </InputField>
                <div className="flex gap-3 mt-2">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(0)}>
                    <ArrowLeft className="w-4 h-4" /> Retour
                  </Button>
                  <Button className="flex-1" disabled={!canNextStep1} onClick={handleCompute}>
                    Voir mes résultats <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Étape 2 : Résultats */}
            {step === 2 && results && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#0a1340]">Vos meilleures offres</h3>
                  <button onClick={() => { setStep(0); setResults(null) }}
                    className="text-xs text-slate-400 hover:text-[#0a1340] underline">Modifier</button>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="text-sm text-slate-500">
                    Assurance banque : <strong className="text-slate-700">{results.bankMonthly}€/mois</strong>
                  </div>
                  <div className="text-sm font-bold text-[#10b981] flex items-center gap-1">
                    <TrendingDown className="w-4 h-4" />
                    Jusqu'à {results.quotes[0].savingsPct}% d'économies
                  </div>
                </div>
                <p className="text-xs text-slate-400 mb-4 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" /> Cliquez sur une offre pour la sélectionner
                </p>
                <div className="flex flex-col gap-4 mb-6">
                  {results.quotes.slice(0, 3).map((quote, i) => (
                    <QuoteCard key={quote.insurer} quote={quote} rank={i}
                      selected={selectedQuote?.insurer === quote.insurer}
                      onSelect={setSelectedQuote} />
                  ))}
                </div>
                <Button className="w-full" size="lg" onClick={() => setStep(3)}>
                  Être recontacté pour cette offre <ArrowRight className="w-5 h-5" />
                </Button>
                <p className="text-xs text-slate-400 text-center mt-3">
                  Simulation indicative · Tarifs définitifs après étude personnalisée
                </p>
              </div>
            )}

            {/* Étape 3 : Coordonnées */}
            {step === 3 && !sent && (
              <div>
                <h3 className="text-xl font-bold text-[#0a1340] mb-4">Vos coordonnées</h3>
                {selectedQuote && (
                  <div className="bg-[#f0f4ff] rounded-2xl p-4 mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 mb-0.5">Offre sélectionnée</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedQuote.color }} />
                        <span className="font-bold text-sm text-[#0a1340]">{selectedQuote.insurer}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-extrabold text-[#0a1340]">
                        {selectedQuote.monthly}€<span className="text-sm font-normal text-slate-400">/mois</span>
                      </div>
                      <div className="text-xs text-emerald-600 font-semibold">-{selectedQuote.savingsPct}% vs banque</div>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-0">
                  <InputField label="Prénom">
                    <input type="text" className={inputClass} placeholder="Jean"
                      value={contact.firstName} onChange={(e) => setC('firstName', e.target.value)} />
                  </InputField>
                  <InputField label="Nom">
                    <input type="text" className={inputClass} placeholder="Dupont"
                      value={contact.lastName} onChange={(e) => setC('lastName', e.target.value)} />
                  </InputField>
                </div>
                <InputField label="Email">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="email" className={cn(inputClass, 'pl-10')} placeholder="jean.dupont@email.fr"
                      value={contact.email} onChange={(e) => setC('email', e.target.value)} />
                  </div>
                </InputField>
                <InputField label="Téléphone">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="tel" className={cn(inputClass, 'pl-10')} placeholder="06 12 34 56 78"
                      value={contact.phone} onChange={(e) => setC('phone', e.target.value)} />
                  </div>
                </InputField>
                <label className="flex items-start gap-3 cursor-pointer mb-6">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 accent-[#0f1f6b]"
                    checked={contact.rgpd} onChange={(e) => setC('rgpd', e.target.checked)} />
                  <span className="text-xs text-slate-400 leading-relaxed">
                    J'accepte d'être recontacté(e) par Assur Emprunteur. Données jamais revendues. Conformément au RGPD, je peux exercer mes droits à tout moment.
                  </span>
                </label>
                {error && <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">{error}</div>}
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-shrink-0" onClick={() => setStep(2)}>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <Button className="flex-1" disabled={!canSubmit || sending} onClick={handleSubmitLead}>
                    {sending
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi…</>
                      : <>Recevoir mon devis <ArrowRight className="w-4 h-4" /></>}
                  </Button>
                </div>
              </div>
            )}

            {/* Confirmation */}
            {sent && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-[#10b981]" />
                </div>
                <h3 className="text-xl font-bold text-[#0a1340] mb-2">Demande envoyée, {contact.firstName} !</h3>
                <p className="text-slate-500 text-sm mb-2">Un conseiller vous contacte dans les <strong>24h</strong>.</p>
                <p className="text-slate-400 text-xs mb-6">Récapitulatif envoyé à <strong>{contact.email}</strong></p>
                <button
                  onClick={() => { setSent(false); setStep(0); setResults(null); setContact({ firstName: '', lastName: '', email: '', phone: '', rgpd: false }) }}
                  className="text-sm text-slate-400 hover:text-slate-600 underline">
                  Nouvelle simulation
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 flex-wrap">
            {[
              { icon: Shield, text: 'Données sécurisées RGPD' },
              { icon: CheckCircle2, text: 'Sans engagement' },
              { icon: Star, text: 'Service 100% gratuit' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-xs text-slate-400">
                <Icon className="w-3.5 h-3.5 text-[#10b981]" /> {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
