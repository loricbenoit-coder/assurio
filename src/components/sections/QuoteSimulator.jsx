import React, { useState, useRef } from 'react'
import {
  ArrowRight, ArrowLeft, CheckCircle2, TrendingDown, Star, Phone, Shield,
  Info, Mail, Loader2, Upload, FileText, CreditCard, X, Sparkles, AlertCircle,
  Home, Building2, Key, Users, User, Zap, HardHat,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { computeQuotes } from '@/lib/quoteEngine'
import { cn } from '@/lib/utils'
import { getReferral } from '@/hooks/useReferral'

const STEPS = ['Votre prêt', 'Votre profil', 'Vos garanties', 'Vos offres', 'Contact']

const PROFESSIONS = [
  { value: 'cadre',         label: 'Cadre / Ingénieur' },
  { value: 'employe',       label: 'Employé / Ouvrier' },
  { value: 'fonctionnaire', label: 'Fonctionnaire' },
  { value: 'liberal',       label: 'Profession libérale' },
  { value: 'artisan',       label: 'Artisan / Commerçant' },
  { value: 'autre',         label: 'Autre' },
]

const GUARANTEE_INFO = {
  DC:   { label: 'Décès',                      desc: 'Rembourse le capital restant dû en cas de décès',                  required: true  },
  PTIA: { label: 'Invalidité totale (PTIA)',    desc: 'Prise en charge si vous ne pouvez plus travailler du tout',        required: true  },
  ITT:  { label: 'Incapacité temporaire (ITT)', desc: 'Couvre vos mensualités en cas d\'arrêt de travail',               required: false },
  IPT:  { label: 'Invalidité permanente (IPT)', desc: 'Protection si votre taux d\'invalidité dépasse 66%',              required: false },
  IPP:  { label: 'Invalidité partielle (IPP)',  desc: 'Couvre une invalidité entre 33% et 66%',                          required: false },
  PE:   { label: 'Perte d\'emploi (PE)',        desc: 'Prend en charge vos mensualités en cas de licenciement',           required: false },
}

const ALL_GUARANTEES = ['DC', 'PTIA', 'ITT', 'IPT', 'IPP', 'PE']

/* ─── Step indicator ─────────────────────────────────────────── */
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
          <div className={cn('flex-1 h-px max-w-[32px]', i < current ? 'bg-[#10b981]' : 'bg-slate-200')} />
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

/* ─── QuoteCard ──────────────────────────────────────────────── */
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
    <div className="flex flex-wrap gap-1.5 mb-2">
      {quote.guarantees.map((g) => (
        <span key={g} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg font-medium">
          {GUARANTEE_INFO[g]?.label || g}
        </span>
      ))}
    </div>
    {quote.missingGuarantees?.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mb-2">
        {quote.missingGuarantees.map((g) => (
          <span key={g} className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-lg font-medium flex items-center gap-1">
            <AlertCircle className="w-2.5 h-2.5" /> {GUARANTEE_INFO[g]?.label || g} non disponible
          </span>
        ))}
      </div>
    )}
    <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
      <span>TAEA : {quote.taea}%</span>
      <span>Délai de carence : {quote.delay}j</span>
    </div>
  </div>
)

/* ─── Composant upload document ──────────────────────────────── */
const DocUpload = ({ icon: Icon, title, subtitle, status, onFile, onClear, autoFilled }) => {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) onFile(file)
  }

  return (
    <div
      className={cn(
        'relative rounded-2xl border-2 border-dashed p-5 transition-all',
        dragging        ? 'border-[#0f1f6b] bg-blue-50' :
        status === 'done'    ? 'border-[#10b981] bg-emerald-50' :
        status === 'error'   ? 'border-red-300 bg-red-50' :
        status === 'loading' ? 'border-[#0f1f6b]/40 bg-blue-50/40' :
        'border-slate-200 hover:border-[#0f1f6b]/40 cursor-pointer bg-slate-50'
      )}
      onClick={() => !status && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input ref={inputRef} type="file" className="hidden"
        accept="image/jpeg,image/png,image/webp,image/heic,application/pdf"
        onChange={(e) => e.target.files[0] && onFile(e.target.files[0])} />
      <div className="flex items-center gap-4">
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
          status === 'done'  ? 'bg-emerald-100' : status === 'error' ? 'bg-red-100' : 'bg-white border border-slate-200'
        )}>
          {status === 'loading' ? <Loader2 className="w-5 h-5 text-[#0f1f6b] animate-spin" /> :
           status === 'done'    ? <CheckCircle2 className="w-5 h-5 text-[#10b981]" /> :
           status === 'error'   ? <AlertCircle className="w-5 h-5 text-red-500" /> :
           <Icon className="w-5 h-5 text-slate-400" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-[#0a1340]">{title}</p>
          <p className="text-xs text-slate-400 mt-0.5">
            {status === 'loading' ? 'Analyse en cours par IA…' :
             status === 'done'    ? subtitle :
             status === 'error'   ? 'Impossible de lire le document. Réessayez.' :
             'Cliquez ou déposez votre fichier'}
          </p>
          {status === 'done' && autoFilled?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {autoFilled.map(f => (
                <span key={f} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> {f}
                </span>
              ))}
            </div>
          )}
        </div>
        {(status === 'done' || status === 'error') && (
          <button onClick={(e) => { e.stopPropagation(); onClear() }}
            className="w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center flex-shrink-0 transition-colors">
            <X className="w-3 h-3 text-slate-600" />
          </button>
        )}
        {!status && <Upload className="w-4 h-4 text-slate-300 flex-shrink-0" />}
      </div>
    </div>
  )
}

/* ─── Simulateur principal ───────────────────────────────────── */
export const QuoteSimulator = () => {
  const [step, setStep]           = useState(0)
  const [inputMode, setInputMode] = useState('manual')

  const [form, setForm] = useState({
    amount: '', duration: '', age: '', smoker: false, profession: 'cadre',
  })
  const [guaranteeForm, setGuaranteeForm] = useState({
    projectType:        'principal',
    quotite:            100,
    selectedGuarantees: ['DC', 'PTIA', 'ITT', 'IPT'],
    riskSport:          false,
    riskProfession:     false,
  })
  const [contact, setContact] = useState({ firstName: '', lastName: '', email: '', phone: '', rgpd: false })

  const [results, setResults]         = useState(null)
  const [selectedQuote, setSelectedQuote] = useState(null)
  const [sending, setSending]         = useState(false)
  const [sent, setSent]               = useState(false)
  const [error, setError]             = useState(null)

  const [cniStatus,  setCniStatus]  = useState(null)
  const [pretStatus, setPretStatus] = useState(null)
  const [cniFields,  setCniFields]  = useState([])
  const [pretFields, setPretFields] = useState([])

  const set  = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const setG = (k, v) => setGuaranteeForm(g => ({ ...g, [k]: v }))
  const setC = (k, v) => setContact(c => ({ ...c, [k]: v }))

  const toggleGuarantee = (g) => {
    if (GUARANTEE_INFO[g]?.required) return
    setG('selectedGuarantees',
      guaranteeForm.selectedGuarantees.includes(g)
        ? guaranteeForm.selectedGuarantees.filter(x => x !== g)
        : [...guaranteeForm.selectedGuarantees, g]
    )
  }

  const canNextStep0 = form.amount >= 50000 && form.amount <= 1000000 && form.duration >= 5 && form.duration <= 30
  const canNextStep1 = form.age >= 18 && form.age <= 70
  const canSubmit    = contact.firstName && contact.lastName && contact.email && contact.phone && contact.rgpd

  const toBase64   = (file) => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result.split(',')[1]); r.onerror = rej; r.readAsDataURL(file) })
  const getMediaType = (file) => ({ 'image/jpeg': 'image/jpeg', 'image/png': 'image/png', 'image/webp': 'image/webp', 'image/heic': 'image/jpeg', 'application/pdf': 'application/pdf' }[file.type] || 'image/jpeg')

  const extractDoc = async (file, docType, setStatus, setAutoFilled) => {
    setStatus('loading')
    try {
      const imageBase64 = await toBase64(file)
      const res = await fetch('/.netlify/functions/extract-document', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, mediaType: getMediaType(file), docType }),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error()
      const d = json.data; const filled = []
      if (docType === 'cni') {
        if (d.age)    { set('age', d.age);           filled.push(`Âge : ${d.age} ans`) }
        if (d.prenom) { setC('firstName', d.prenom); filled.push(`Prénom : ${d.prenom}`) }
        if (d.nom)    { setC('lastName', d.nom);     filled.push(`Nom : ${d.nom}`) }
      } else {
        if (d.montant)      { set('amount', d.montant);        filled.push(`Montant : ${d.montant.toLocaleString('fr-FR')}€`) }
        if (d.duree_annees) { set('duration', d.duree_annees); filled.push(`Durée : ${d.duree_annees} ans`) }
      }
      setAutoFilled(filled); setStatus(filled.length > 0 ? 'done' : 'error')
    } catch { setStatus('error') }
  }

  const handleCompute = () => {
    const r = computeQuotes({
      amount: Number(form.amount), duration: Number(form.duration),
      age: Number(form.age), smoker: form.smoker, profession: form.profession,
      ...guaranteeForm,
    })
    setResults(r); setSelectedQuote(r.quotes[0]); setStep(3)
  }

  const handleSubmitLead = async () => {
    if (!canSubmit) return
    setSending(true); setError(null)
    try {
      const res = await fetch('/.netlify/functions/send-lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact, quote: selectedQuote,
          loanInfo: { amount: form.amount, duration: form.duration, age: form.age, smoker: form.smoker, profession: form.profession, ...guaranteeForm },
          bankMonthly: results.bankMonthly,
          referral: getReferral(),
        }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch { setError('Une erreur est survenue. Veuillez réessayer ou nous appeler.') }
    finally { setSending(false) }
  }

  const switchMode = (mode) => {
    setInputMode(mode)
    if (mode === 'manual') { setCniStatus(null); setPretStatus(null); setCniFields([]); setPretFields([]) }
  }

  // ─── Rendu ────────────────────────────────────────────────────
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
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
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
            <StepIndicator current={step} />

            {/* ══ Toggle manuel / upload (étapes 0 et 1) ══ */}
            {(step === 0 || step === 1) && (
              <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-2xl">
                <button onClick={() => switchMode('manual')}
                  className={cn('flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2',
                    inputMode === 'manual' ? 'bg-white text-[#0a1340] shadow-sm' : 'text-slate-400 hover:text-slate-600')}>
                  <FileText className="w-4 h-4" /> Saisir manuellement
                </button>
                <button onClick={() => switchMode('upload')}
                  className={cn('flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2',
                    inputMode === 'upload' ? 'bg-white text-[#0a1340] shadow-sm' : 'text-slate-400 hover:text-slate-600')}>
                  <Sparkles className="w-4 h-4 text-[#10b981]" /> Analyser mes documents
                </button>
              </div>
            )}

            {/* ══ Mode upload ══ */}
            {(step === 0 || step === 1) && inputMode === 'upload' && (
              <div>
                <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-5 flex items-start gap-3">
                  <Shield className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 leading-relaxed">
                    <strong>Vos documents sont analysés en temps réel et ne sont jamais stockés.</strong> Seules les données extraites sont conservées pour la simulation.
                  </p>
                </div>
                <div className="space-y-4 mb-6">
                  <DocUpload icon={CreditCard} title="Carte nationale d'identité" subtitle="Prénom, nom et âge extraits"
                    status={cniStatus} autoFilled={cniFields}
                    onFile={f => extractDoc(f, 'cni', setCniStatus, setCniFields)}
                    onClear={() => { setCniStatus(null); setCniFields([]) }} />
                  <DocUpload icon={FileText} title="Offre de prêt immobilier" subtitle="Montant et durée extraits"
                    status={pretStatus} autoFilled={pretFields}
                    onFile={f => extractDoc(f, 'pret', setPretStatus, setPretFields)}
                    onClear={() => { setPretStatus(null); setPretFields([]) }} />
                </div>
                {(cniStatus === 'done' || pretStatus === 'done') && (
                  <div className="bg-[#f0f4ff] rounded-2xl p-4 mb-5">
                    <p className="text-xs font-semibold text-[#0f1f6b] mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Données extraites — vérifiez et complétez
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Montant (€)', key: 'amount', placeholder: '250000' },
                        { label: 'Durée (ans)', key: 'duration', placeholder: '20' },
                        { label: 'Âge', key: 'age', placeholder: '35' },
                      ].map(({ label, key, placeholder }) => (
                        <div key={key} className={key === 'amount' ? 'col-span-2' : ''}>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">{label}</label>
                          <input type="number" className={cn(inputClass, 'text-sm py-2')} placeholder={placeholder}
                            value={form[key]} onChange={e => set(key, e.target.value)} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <Button className="w-full" size="lg" disabled={!canNextStep0 || !canNextStep1}
                  onClick={() => setStep(2)}>
                  Choisir mes garanties <ArrowRight className="w-5 h-5" />
                </Button>
                <p className="text-xs text-slate-400 text-center mt-2">Formats : JPG, PNG, WebP, HEIC</p>
              </div>
            )}

            {/* ══ Étape 0 — Votre prêt ══ */}
            {step === 0 && inputMode === 'manual' && (
              <div>
                <h3 className="text-xl font-bold text-[#0a1340] mb-6">Votre prêt immobilier</h3>
                <InputField label="Montant du prêt" hint="Entre 50 000€ et 1 000 000€">
                  <div className="relative">
                    <input type="number" className={inputClass} placeholder="ex : 250 000"
                      value={form.amount} onChange={e => set('amount', e.target.value)} min={50000} max={1000000} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">€</span>
                  </div>
                </InputField>
                <InputField label="Durée du prêt" hint="Entre 5 et 30 ans">
                  <div className="relative">
                    <input type="number" className={inputClass} placeholder="ex : 20"
                      value={form.duration} onChange={e => set('duration', e.target.value)} min={5} max={30} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">ans</span>
                  </div>
                </InputField>
                <div className="flex gap-2 mt-1 mb-6">
                  {[10, 15, 20, 25].map(y => (
                    <button key={y} onClick={() => set('duration', y)}
                      className={cn('flex-1 py-2 text-sm rounded-xl border font-medium transition-all',
                        Number(form.duration) === y ? 'bg-[#0f1f6b] text-white border-[#0f1f6b]' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-[#0f1f6b]/40'
                      )}>{y} ans</button>
                  ))}
                </div>
                <Button className="w-full" size="lg" disabled={!canNextStep0} onClick={() => setStep(1)}>
                  Continuer <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* ══ Étape 1 — Votre profil ══ */}
            {step === 1 && inputMode === 'manual' && (
              <div>
                <h3 className="text-xl font-bold text-[#0a1340] mb-6">Votre profil</h3>
                <InputField label="Votre âge">
                  <div className="relative">
                    <input type="number" className={inputClass} placeholder="ex : 35"
                      value={form.age} onChange={e => set('age', e.target.value)} min={18} max={70} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">ans</span>
                  </div>
                </InputField>
                <InputField label="Profession">
                  <select className={inputClass} value={form.profession} onChange={e => set('profession', e.target.value)}>
                    {PROFESSIONS.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </InputField>
                <InputField label="Statut tabagique">
                  <div className="flex gap-3">
                    {[{ value: false, label: '🚭 Non-fumeur' }, { value: true, label: '🚬 Fumeur' }].map(({ value, label }) => (
                      <button key={label} onClick={() => set('smoker', value)}
                        className={cn('flex-1 py-3 rounded-xl border text-sm font-medium transition-all',
                          form.smoker === value ? 'bg-[#0f1f6b] text-white border-[#0f1f6b]' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-[#0f1f6b]/40'
                        )}>{label}</button>
                    ))}
                  </div>
                </InputField>
                <div className="flex gap-3 mt-2">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(0)}>
                    <ArrowLeft className="w-4 h-4" /> Retour
                  </Button>
                  <Button className="flex-1" disabled={!canNextStep1} onClick={() => setStep(2)}>
                    Continuer <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ══ Étape 2 — Vos garanties ══ */}
            {step === 2 && (
              <div>
                <h3 className="text-xl font-bold text-[#0a1340] mb-1">Vos garanties</h3>
                <p className="text-sm text-slate-400 mb-6">Personnalisez votre couverture pour une simulation au plus juste.</p>

                {/* Type de projet */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-[#0a1340] mb-3">Type de bien financé</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'principal',  icon: Home,      label: 'Résidence\nprincipale' },
                      { value: 'secondaire', icon: Key,       label: 'Résidence\nsecondaire' },
                      { value: 'locatif',    icon: Building2, label: 'Investissement\nlocatif' },
                    ].map(({ value, icon: Icon, label }) => (
                      <button key={value} onClick={() => setG('projectType', value)}
                        className={cn('flex flex-col items-center gap-2 py-4 px-2 rounded-2xl border text-xs font-semibold transition-all text-center',
                          guaranteeForm.projectType === value ? 'bg-[#0f1f6b] text-white border-[#0f1f6b]' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-[#0f1f6b]/40'
                        )}>
                        <Icon className="w-5 h-5" />
                        {label.split('\n').map((l, i) => <span key={i}>{l}</span>)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quotité */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-[#0a1340] mb-1.5">
                    Quotité assurée
                    <span className="ml-2 text-xs font-normal text-slate-400">— part du capital que vous assurez</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 100, icon: User,  label: '100%', sub: 'Seul(e)' },
                      { value: 50,  icon: User,  label: '50%',  sub: 'Couple — 50/50' },
                      { value: 75,  icon: User,  label: '75%',  sub: 'Couverture partielle' },
                      { value: 'duo', icon: Users, label: '200%', sub: 'Couple — 100%+100%' },
                    ].map(({ value, icon: Icon, label, sub }) => (
                      <button key={value} onClick={() => setG('quotite', value)}
                        className={cn('flex items-center gap-3 py-3 px-4 rounded-xl border text-sm font-semibold transition-all',
                          guaranteeForm.quotite === value ? 'bg-[#0f1f6b] text-white border-[#0f1f6b]' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-[#0f1f6b]/40'
                        )}>
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <div className="text-left">
                          <div>{label}</div>
                          <div className={cn('text-xs font-normal', guaranteeForm.quotite === value ? 'text-white/70' : 'text-slate-400')}>{sub}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Garanties souhaitées */}
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-[#0a1340] mb-3">
                    Garanties souhaitées
                    <span className="ml-2 text-xs font-normal text-slate-400">— DC et PTIA obligatoires</span>
                  </label>
                  <div className="space-y-2">
                    {ALL_GUARANTEES.map(g => {
                      const info = GUARANTEE_INFO[g]
                      const isSelected = guaranteeForm.selectedGuarantees.includes(g)
                      return (
                        <button key={g} onClick={() => toggleGuarantee(g)} disabled={info.required}
                          className={cn('w-full flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all',
                            info.required    ? 'bg-[#f0f4ff] border-[#0f1f6b]/20 cursor-default' :
                            isSelected       ? 'bg-emerald-50 border-[#10b981]' :
                            'bg-slate-50 border-slate-200 hover:border-slate-300'
                          )}>
                          <div className={cn('w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5',
                            info.required ? 'bg-[#0f1f6b] border-[#0f1f6b]' :
                            isSelected    ? 'bg-[#10b981] border-[#10b981]' :
                            'border-slate-300'
                          )}>
                            {(info.required || isSelected) && <CheckCircle2 className="w-3 h-3 text-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={cn('text-sm font-semibold',
                                info.required ? 'text-[#0f1f6b]' : isSelected ? 'text-[#0a1340]' : 'text-slate-500'
                              )}>{info.label}</span>
                              {info.required && <span className="text-xs bg-[#0f1f6b] text-white px-1.5 py-0.5 rounded-md font-medium">Obligatoire</span>}
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{info.desc}</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Risques particuliers */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-[#0a1340] mb-3">Risques particuliers</label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { key: 'riskSport', icon: Zap, label: 'Pratique d\'un sport à risque', desc: 'Sports mécaniques, sports de combat, alpinisme, plongée…' },
                      { key: 'riskProfession', icon: HardHat, label: 'Profession manuelle à risque', desc: 'Travaux en hauteur, manipulation de machines, BTP…' },
                    ].map(({ key, icon: Icon, label, desc }) => (
                      <button key={key} onClick={() => setG(key, !guaranteeForm[key])}
                        className={cn('flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all',
                          guaranteeForm[key] ? 'bg-orange-50 border-orange-300' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        )}>
                        <div className={cn('w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5',
                          guaranteeForm[key] ? 'bg-orange-400 border-orange-400' : 'border-slate-300'
                        )}>
                          {guaranteeForm[key] && <CheckCircle2 className="w-3 h-3 text-white" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-slate-400" />
                            <span className={cn('text-sm font-semibold', guaranteeForm[key] ? 'text-orange-700' : 'text-slate-600')}>{label}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setStep(inputMode === 'upload' ? 0 : 1)}>
                    <ArrowLeft className="w-4 h-4" /> Retour
                  </Button>
                  <Button className="flex-1" onClick={handleCompute}>
                    Voir mes résultats <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* ══ Étape 3 — Résultats ══ */}
            {step === 3 && results && (
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
                <Button className="w-full" size="lg" onClick={() => setStep(4)}>
                  Être recontacté pour cette offre <ArrowRight className="w-5 h-5" />
                </Button>
                <p className="text-xs text-slate-400 text-center mt-3">
                  Simulation indicative · Tarifs définitifs après étude personnalisée
                </p>
              </div>
            )}

            {/* ══ Étape 4 — Coordonnées ══ */}
            {step === 4 && !sent && (
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
                      <div className="text-xl font-extrabold text-[#0a1340]">{selectedQuote.monthly}€<span className="text-sm font-normal text-slate-400">/mois</span></div>
                      <div className="text-xs text-emerald-600 font-semibold">-{selectedQuote.savingsPct}% vs banque</div>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Prénom">
                    <input type="text" className={inputClass} placeholder="Jean"
                      value={contact.firstName} onChange={e => setC('firstName', e.target.value)} />
                  </InputField>
                  <InputField label="Nom">
                    <input type="text" className={inputClass} placeholder="Dupont"
                      value={contact.lastName} onChange={e => setC('lastName', e.target.value)} />
                  </InputField>
                </div>
                <InputField label="Email">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="email" className={cn(inputClass, 'pl-10')} placeholder="jean.dupont@email.fr"
                      value={contact.email} onChange={e => setC('email', e.target.value)} />
                  </div>
                </InputField>
                <InputField label="Téléphone">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="tel" className={cn(inputClass, 'pl-10')} placeholder="06 12 34 56 78"
                      value={contact.phone} onChange={e => setC('phone', e.target.value)} />
                  </div>
                </InputField>
                <label className="flex items-start gap-3 cursor-pointer mb-6">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 accent-[#0f1f6b]"
                    checked={contact.rgpd} onChange={e => setC('rgpd', e.target.checked)} />
                  <span className="text-xs text-slate-400 leading-relaxed">
                    J'accepte d'être recontacté(e) par Assur Emprunteur. Données jamais revendues. Conformément au RGPD, je peux exercer mes droits à tout moment.
                  </span>
                </label>
                {error && <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">{error}</div>}
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-shrink-0" onClick={() => setStep(3)}>
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <Button className="flex-1" disabled={!canSubmit || sending} onClick={handleSubmitLead}>
                    {sending ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi…</> : <>Recevoir mon devis <ArrowRight className="w-4 h-4" /></>}
                  </Button>
                </div>
              </div>
            )}

            {/* ══ Confirmation ══ */}
            {sent && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-[#10b981]" />
                </div>
                <h3 className="text-xl font-bold text-[#0a1340] mb-2">Demande envoyée, {contact.firstName} !</h3>
                <p className="text-slate-500 text-sm mb-2">Un conseiller vous contacte dans les <strong>24h</strong>.</p>
                <p className="text-slate-400 text-xs mb-6">Récapitulatif envoyé à <strong>{contact.email}</strong></p>
                <button onClick={() => { setSent(false); setStep(0); setResults(null); setContact({ firstName: '', lastName: '', email: '', phone: '', rgpd: false }) }}
                  className="text-sm text-slate-400 hover:text-slate-600 underline">
                  Nouvelle simulation
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 flex-wrap">
            {[
              { icon: Shield,        text: 'Données sécurisées RGPD' },
              { icon: CheckCircle2,  text: 'Sans engagement' },
              { icon: Star,          text: 'Service 100% gratuit' },
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
