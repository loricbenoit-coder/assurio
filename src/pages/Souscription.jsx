import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ArrowLeft, CheckCircle2, Circle, Clock, FileText, Home, Repeat, PlusCircle,
  UserPlus, Banknote, Building2, ShieldCheck, ClipboardList, Send, Download, Info,
} from 'lucide-react'
import { SEO } from '@/components/ui/SEO'
import { Button } from '@/components/ui/Button'
import { computeQuotes } from '@/lib/quoteEngine'
import { cn } from '@/lib/utils'

/* ─── Référentiels ───────────────────────────────────────────── */
const OFFER_TYPES = [
  {
    value: 'nouveau', icon: Home, title: 'Nouveaux prêts à assurer',
    desc: "Vous venez d'obtenir un (ou plusieurs) prêt et souhaitez l'assurer.",
  },
  {
    value: 'lemoine', icon: Repeat, title: "Changement d'assurance de prêt",
    desc: "Vous avez déjà une assurance (souvent via votre banque) et souhaitez la remplacer — loi Lemoine.",
  },
  {
    value: 'complement', icon: PlusCircle, title: "Complément de quotité (contrat ADE)",
    desc: "Un contrat d'assurance décès emprunteur existe déjà mais la quotité doit être complétée (ex : 50% → 100%).",
  },
]

const STATUTS_PRO = ['Salarié CDI', 'Salarié CDD', 'Fonctionnaire', 'Profession libérale', 'Indépendant / Commerçant', 'Retraité', 'Sans emploi']
const SPORTS_RISQUE = ['Moto / Sport mécanique', 'Plongée sous-marine', 'Sports aériens', 'Sports de combat', 'Alpinisme / Escalade']
const NATURES_PRET = ['Amortissable', 'In fine', 'Relais', 'Prêt à taux zéro (PTZ)']
const TYPES_TAUX = ['Fixe', 'Variable']
const ORGANISMES = ['BNP Paribas', 'Crédit Agricole', 'Société Générale', 'Crédit Mutuel', 'Banque Populaire', 'Caisse d\'Épargne', 'LCL', 'La Banque Postale', 'Autre']

const STEP_DEFS = [
  { key: 'offre',       label: 'Choix de l\'offre' },
  { key: 'coordonnees', label: 'Coordonnées' },
  { key: 'profil',      label: 'Informations personnelles' },
  { key: 'prets',       label: 'Prêts' },
  { key: 'preteur',     label: 'Prêteur' },
  { key: 'simulation',  label: 'Simulations' },
  { key: 'adhesion',    label: 'Informations adhésion' },
  { key: 'substitution', label: 'Substitution', onlyIf: 'lemoine' },
  { key: 'souscription', label: 'Souscription' },
  { key: 'suivi',       label: 'Analyse et décision' },
]

/* ─── Helpers ─────────────────────────────────────────────────── */
const emptyAssured = () => ({
  civilite: 'M', nom: '', prenom: '', dateNaissance: '', email: '', tel: '',
  qualite: 'Emprunteur', paysResidence: 'France', codePostal: '',
  statutPro: 'Salarié CDI', professionRisque: false, profession: '', professionManuelle: false,
  travauxHauteur: false, deplacements: '<20000', sportsRisque: [], fumeur: false,
  nomNaissance: '', nationalite: 'Française', paysNaissance: 'France', deptNaissance: '', villeNaissance: '',
  adresse: '', adresseChangement: false, iban: '',
  contratActuelType: 'Banque', contratActuelNom: '',
  supportAdhesion: 'Numérique',
})

const emptyPret = () => ({
  nature: 'Amortissable', montant: '', taux: '', typeTaux: 'Fixe', typeEcheances: 'Constantes',
  periodicite: 'Mensuelle', duree: '', differe: '0', paliers: [],
})

const ageFromBirthdate = (d) => {
  if (!d) return 35
  const birth = new Date(d)
  if (isNaN(birth)) return 35
  const diff = Date.now() - birth.getTime()
  return Math.max(18, Math.min(70, Math.floor(diff / (365.25 * 24 * 3600 * 1000))))
}

const inputClass = 'w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0f1f6b] focus:ring-1 focus:ring-[#0f1f6b]/20 bg-white'
const labelClass = 'block text-sm font-semibold text-[#0a1340] mb-1.5'

const Field = ({ label, children, hint }) => (
  <div className="mb-4">
    <label className={labelClass}>{label}</label>
    {hint && <p className="text-xs text-slate-400 mb-1.5">{hint}</p>}
    {children}
  </div>
)

const Toggle = ({ checked, onChange, label }) => (
  <button onClick={() => onChange(!checked)}
    className={cn('w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all',
      checked ? 'bg-emerald-50 border-[#10b981]' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
    )}>
    <div className={cn('w-4 h-4 rounded-md border-2 flex items-center justify-center flex-shrink-0',
      checked ? 'bg-[#10b981] border-[#10b981]' : 'border-slate-300'
    )}>
      {checked && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
    </div>
    <span className="text-sm font-medium text-slate-600">{label}</span>
  </button>
)

const SectionTitle = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-center gap-3 mb-5">
    <div className="w-10 h-10 rounded-xl bg-[#f0f4ff] flex items-center justify-center flex-shrink-0">
      <Icon className="w-5 h-5 text-[#0f1f6b]" />
    </div>
    <div>
      <h3 className="text-lg font-bold text-[#0a1340]">{title}</h3>
      {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
    </div>
  </div>
)

const NavButtons = ({ onBack, onNext, nextLabel = 'Continuer', nextDisabled }) => (
  <div className="flex gap-3 mt-6">
    {onBack && (
      <Button variant="outline" className="flex-shrink-0" onClick={onBack}>
        <ArrowLeft className="w-4 h-4" /> Retour
      </Button>
    )}
    <Button className="flex-1" disabled={nextDisabled} onClick={onNext}>
      {nextLabel} <ArrowRight className="w-4 h-4" />
    </Button>
  </div>
)

/* ─── Wizard (réutilisable, page ou section) ────────────────────── */
export const SouscriptionWizard = ({ embedded = false }) => {
  const [stepIndex, setStepIndex] = useState(0)
  const [offerType, setOfferType] = useState(null)
  const [coEmprunteur, setCoEmprunteur] = useState(false)
  const [assureds, setAssureds] = useState([emptyAssured()])

  const [loanInfo, setLoanInfo] = useState({ dateEffet: '', objet: 'principal' })
  const [prets, setPrets] = useState([emptyPret()])

  const [preteur, setPreteur] = useState({
    organisme: '', agenceNom: '', agenceDomiciliation: '', codeAgence: '',
    adresseNum: '', adresseRue: '', complement: '', localite: '', codePostalAgence: '',
  })

  const [results, setResults] = useState(null)
  const [selectedQuote, setSelectedQuote] = useState(null)

  const [substitution, setSubstitution] = useState({
    envoiCourrier: true, auNomDe: '', refPret: '',
    conseillerPrenom: '', conseillerNom: '', conseillerEmail: '', conseillerTel: '',
  })

  const [submitting, setSubmitting] = useState(false)

  const visibleSteps = STEP_DEFS.filter(s => !s.onlyIf || s.onlyIf === offerType)
  const currentKey = visibleSteps[stepIndex]?.key || 'offre'

  const goNext = () => setStepIndex(i => Math.min(i + 1, visibleSteps.length - 1))
  const goBack = () => setStepIndex(i => Math.max(i - 1, 0))

  const updateAssured = (i, key, val) =>
    setAssureds(as => as.map((a, idx) => idx === i ? { ...a, [key]: val } : a))

  const toggleSport = (i, sport) =>
    setAssureds(as => as.map((a, idx) => {
      if (idx !== i) return a
      const has = a.sportsRisque.includes(sport)
      return { ...a, sportsRisque: has ? a.sportsRisque.filter(s => s !== sport) : [...a.sportsRisque, sport] }
    }))

  const toggleCoEmprunteur = () => {
    if (coEmprunteur) setAssureds([assureds[0]])
    else setAssureds([{ ...assureds[0], qualite: 'Emprunteur' }, { ...emptyAssured(), qualite: 'Co-emprunteur' }])
    setCoEmprunteur(!coEmprunteur)
  }

  const updatePret = (i, key, val) =>
    setPrets(ps => ps.map((p, idx) => idx === i ? { ...p, [key]: val } : p))

  const addPret = () => setPrets(ps => [...ps, emptyPret()])
  const removePret = (i) => setPrets(ps => ps.filter((_, idx) => idx !== i))

  const addPalier = (i) => setPrets(ps => ps.map((p, idx) => idx === i ? { ...p, paliers: [...p.paliers, { duree: '', montant: '' }] } : p))
  const updatePalier = (i, j, key, val) => setPrets(ps => ps.map((p, idx) => idx === i
    ? { ...p, paliers: p.paliers.map((pal, k) => k === j ? { ...pal, [key]: val } : pal) } : p))
  const removePalier = (i, j) => setPrets(ps => ps.map((p, idx) => idx === i
    ? { ...p, paliers: p.paliers.filter((_, k) => k !== j) } : p))

  const runSimulation = () => {
    const amount = prets.reduce((sum, p) => sum + (Number(p.montant) || 0), 0)
    const durations = prets.map(p => Math.round((Number(p.duree) || 240) / 12)).filter(Boolean)
    const duration = durations.length ? Math.max(...durations) : 20
    const quotite = coEmprunteur ? 50 : 100
    const borrowers = assureds.map(a => ({
      age: ageFromBirthdate(a.dateNaissance),
      smoker: a.fumeur,
      profession: a.statutPro === 'Fonctionnaire' ? 'fonctionnaire'
        : a.statutPro === 'Profession libérale' ? 'liberal'
        : a.statutPro === 'Indépendant / Commerçant' ? 'artisan'
        : a.professionManuelle ? 'employe' : 'cadre',
      riskSport: a.sportsRisque.length > 0,
      riskProfession: a.professionManuelle || a.travauxHauteur,
      quotite,
    }))
    const r = computeQuotes({
      amount: amount || 250000, duration: duration || 20, borrowers,
      projectType: loanInfo.objet, selectedGuarantees: ['DC', 'PTIA', 'ITT', 'IPT'],
    })
    setResults(r)
    setSelectedQuote(r.quotes[0])
    goNext()
  }

  const handleSubscribe = () => {
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); goNext() }, 1200)
  }

  const restart = () => {
    setStepIndex(0); setOfferType(null); setCoEmprunteur(false); setAssureds([emptyAssured()])
    setLoanInfo({ dateEffet: '', objet: 'principal' }); setPrets([emptyPret()])
    setPreteur({ organisme: '', agenceNom: '', agenceDomiciliation: '', codeAgence: '', adresseNum: '', adresseRue: '', complement: '', localite: '', codePostalAgence: '' })
    setResults(null); setSelectedQuote(null)
    setSubstitution({ envoiCourrier: true, auNomDe: '', refPret: '', conseillerPrenom: '', conseillerNom: '', conseillerEmail: '', conseillerTel: '' })
  }

  /* ── Validations simples ── */
  const canCoordonnees = assureds.every(a => a.nom && a.prenom && a.dateNaissance && a.email && a.tel)
  const canProfil = assureds.every(a => a.profession && a.codePostal)
  const canPrets = prets.every(p => p.montant && p.taux && p.duree) && loanInfo.dateEffet
  const canPreteur = preteur.organisme

  return (
    <div className="max-w-3xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-block text-sm font-semibold text-[#10b981] uppercase tracking-widest mb-3">
              Espace souscription
            </span>
            {embedded ? (
              <h2 className="text-3xl md:text-4xl font-bold text-[#0a1340] mb-3 tracking-tight">
                Votre dossier d'assurance de prêt
              </h2>
            ) : (
              <h1 className="text-3xl md:text-4xl font-bold text-[#0a1340] mb-3 tracking-tight">
                Votre dossier d'assurance de prêt
              </h1>
            )}
            <p className="text-slate-500 max-w-xl mx-auto">
              Suivez votre dossier étape par étape, exactement comme votre conseiller le traite.
            </p>
          </div>

          {/* Demo banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-6 flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>Démonstration :</strong> ce parcours reproduit les étapes réelles de traitement de votre dossier.
              Aucune donnée n'est transmise à un assureur ici — pour démarrer un vrai dossier,{' '}
              <Link to="/contact" className="underline font-semibold">contactez-nous</Link> ou utilisez le{' '}
              <a href="/#simulateur" className="underline font-semibold">simulateur</a>.
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-2 -mx-1 px-1">
            {visibleSteps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-1 flex-shrink-0">
                <div className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0',
                  i < stepIndex ? 'bg-[#10b981] text-white' : i === stepIndex ? 'bg-[#0f1f6b] text-white' : 'bg-slate-200 text-slate-400'
                )}>
                  {i < stepIndex ? <CheckCircle2 className="w-4 h-4" /> : i}
                </div>
                {i < visibleSteps.length - 1 && (
                  <div className={cn('w-4 sm:w-6 h-px', i < stepIndex ? 'bg-[#10b981]' : 'bg-slate-200')} />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs font-semibold text-[#0f1f6b] uppercase tracking-wider mb-6">
            Étape {stepIndex} — {visibleSteps[stepIndex]?.label}
          </p>

          {/* Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">

            {/* ══ Étape 0 — Choix de l'offre ══ */}
            {currentKey === 'offre' && (
              <div>
                <SectionTitle icon={ClipboardList} title="Quel est votre besoin ?"
                  subtitle="Cette étape détermine le parcours adapté à votre situation." />
                <div className="space-y-3">
                  {OFFER_TYPES.map(({ value, icon: Icon, title, desc }) => (
                    <button key={value} onClick={() => { setOfferType(value); goNext() }}
                      className={cn('w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all',
                        offerType === value ? 'border-[#0f1f6b] bg-[#f0f4ff]' : 'border-slate-200 hover:border-[#0f1f6b]/40 bg-slate-50'
                      )}>
                      <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#0f1f6b]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm text-[#0a1340] mb-0.5">{title}</p>
                        <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0 mt-1" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ══ Étape 1 — Coordonnées ══ */}
            {currentKey === 'coordonnees' && (
              <div>
                <SectionTitle icon={UserPlus} title="Vos coordonnées"
                  subtitle="Informations extraites de votre carte d'identité." />

                <Toggle checked={coEmprunteur} onChange={toggleCoEmprunteur} label="Ajouter un co-emprunteur" />

                <div className="space-y-6 mt-5">
                  {assureds.map((a, i) => (
                    <div key={i} className={i > 0 ? 'pt-5 border-t border-slate-100' : ''}>
                      {coEmprunteur && <p className="text-sm font-bold text-[#0a1340] mb-3">{a.qualite}</p>}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {['M', 'Mme'].map(c => (
                          <button key={c} onClick={() => updateAssured(i, 'civilite', c)}
                            className={cn('py-2.5 rounded-xl border text-sm font-semibold transition-all col-span-1',
                              a.civilite === c ? 'bg-[#0f1f6b] text-white border-[#0f1f6b]' : 'bg-slate-50 text-slate-500 border-slate-200'
                            )}>{c === 'M' ? 'Monsieur' : 'Madame'}</button>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Prénom">
                          <input className={inputClass} value={a.prenom} onChange={e => updateAssured(i, 'prenom', e.target.value)} placeholder="Jean" />
                        </Field>
                        <Field label="Nom">
                          <input className={inputClass} value={a.nom} onChange={e => updateAssured(i, 'nom', e.target.value)} placeholder="Dupont" />
                        </Field>
                      </div>
                      <Field label="Date de naissance">
                        <input type="date" className={inputClass} value={a.dateNaissance} onChange={e => updateAssured(i, 'dateNaissance', e.target.value)} />
                      </Field>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Email">
                          <input type="email" className={inputClass} value={a.email} onChange={e => updateAssured(i, 'email', e.target.value)} placeholder="jean.dupont@email.fr" />
                        </Field>
                        <Field label="Téléphone">
                          <input type="tel" className={inputClass} value={a.tel} onChange={e => updateAssured(i, 'tel', e.target.value)} placeholder="06 12 34 56 78" />
                        </Field>
                      </div>
                    </div>
                  ))}
                </div>
                <NavButtons onBack={goBack} onNext={goNext} nextDisabled={!canCoordonnees} />
              </div>
            )}

            {/* ══ Étape 2 — Informations personnelles ══ */}
            {currentKey === 'profil' && (
              <div>
                <SectionTitle icon={ShieldCheck} title="Informations personnelles"
                  subtitle="Ces informations permettent d'évaluer le risque assurantiel." />
                <div className="space-y-6">
                  {assureds.map((a, i) => (
                    <div key={i} className={i > 0 ? 'pt-5 border-t border-slate-100' : ''}>
                      {coEmprunteur && <p className="text-sm font-bold text-[#0a1340] mb-3">{a.qualite} — {a.prenom || `Assuré ${i + 1}`}</p>}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Pays de résidence fiscale">
                          <input className={inputClass} value={a.paysResidence} onChange={e => updateAssured(i, 'paysResidence', e.target.value)} />
                        </Field>
                        <Field label="Code postal de résidence">
                          <input className={inputClass} value={a.codePostal} onChange={e => updateAssured(i, 'codePostal', e.target.value)} placeholder="75001" />
                        </Field>
                      </div>

                      <Field label="Statut professionnel">
                        <select className={inputClass} value={a.statutPro} onChange={e => updateAssured(i, 'statutPro', e.target.value)}>
                          {STATUTS_PRO.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </Field>

                      <Field label="Profession exercée">
                        <input className={inputClass} value={a.profession} onChange={e => updateAssured(i, 'profession', e.target.value)} placeholder="ex : Comptable" />
                      </Field>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                        <Toggle checked={a.professionRisque} onChange={v => updateAssured(i, 'professionRisque', v)} label="Profession à risque" />
                        <Toggle checked={a.professionManuelle} onChange={v => updateAssured(i, 'professionManuelle', v)} label="Profession manuelle" />
                        <Toggle checked={a.travauxHauteur} onChange={v => updateAssured(i, 'travauxHauteur', v)} label="Travaux en hauteur" />
                        <Toggle checked={a.fumeur} onChange={v => updateAssured(i, 'fumeur', v)} label="Fumeur" />
                      </div>

                      <Field label="Déplacements professionnels par an">
                        <div className="grid grid-cols-2 gap-2">
                          {[['<20000', 'Moins de 20 000 km'], ['>=20000', '20 000 km ou plus']].map(([v, l]) => (
                            <button key={v} onClick={() => updateAssured(i, 'deplacements', v)}
                              className={cn('py-2.5 rounded-xl border text-xs font-semibold transition-all',
                                a.deplacements === v ? 'bg-[#0f1f6b] text-white border-[#0f1f6b]' : 'bg-slate-50 text-slate-500 border-slate-200'
                              )}>{l}</button>
                          ))}
                        </div>
                      </Field>

                      <Field label="Sports à risque" hint="Sélectionnez le cas échéant">
                        <div className="flex flex-wrap gap-2">
                          {SPORTS_RISQUE.map(sport => (
                            <button key={sport} onClick={() => toggleSport(i, sport)}
                              className={cn('px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                                a.sportsRisque.includes(sport) ? 'bg-orange-50 border-orange-300 text-orange-700' : 'bg-slate-50 border-slate-200 text-slate-500'
                              )}>{sport}</button>
                          ))}
                        </div>
                      </Field>
                    </div>
                  ))}
                </div>
                <NavButtons onBack={goBack} onNext={goNext} nextDisabled={!canProfil} />
              </div>
            )}

            {/* ══ Étape 3 — Prêts ══ */}
            {currentKey === 'prets' && (
              <div>
                <SectionTitle icon={Banknote} title="Vos prêts"
                  subtitle="Informations extraites de votre offre de prêt." />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                  <Field label="Date d'effet des garanties">
                    <input type="date" className={inputClass} value={loanInfo.dateEffet} onChange={e => setLoanInfo(l => ({ ...l, dateEffet: e.target.value }))} />
                  </Field>
                  <Field label="Objet du financement">
                    <select className={inputClass} value={loanInfo.objet} onChange={e => setLoanInfo(l => ({ ...l, objet: e.target.value }))}>
                      <option value="principal">Résidence principale</option>
                      <option value="secondaire">Résidence secondaire</option>
                      <option value="locatif">Investissement locatif</option>
                    </select>
                  </Field>
                </div>

                {prets.map((p, i) => (
                  <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-bold text-[#0a1340]">Prêt {i + 1}</p>
                      {prets.length > 1 && (
                        <button onClick={() => removePret(i)} className="text-xs text-red-500 hover:underline">Supprimer</button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Nature du prêt">
                        <select className={cn(inputClass, 'py-2.5 text-sm')} value={p.nature} onChange={e => updatePret(i, 'nature', e.target.value)}>
                          {NATURES_PRET.map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                      </Field>
                      <Field label="Montant (€)">
                        <input type="number" className={cn(inputClass, 'py-2.5 text-sm')} value={p.montant} onChange={e => updatePret(i, 'montant', e.target.value)} placeholder="250000" />
                      </Field>
                      <Field label="Taux (%)">
                        <input type="number" step="0.01" className={cn(inputClass, 'py-2.5 text-sm')} value={p.taux} onChange={e => updatePret(i, 'taux', e.target.value)} placeholder="3.5" />
                      </Field>
                      <Field label="Type de taux">
                        <div className="grid grid-cols-2 gap-2">
                          {TYPES_TAUX.map(t => (
                            <button key={t} onClick={() => updatePret(i, 'typeTaux', t)}
                              className={cn('py-2 rounded-xl border text-xs font-semibold transition-all',
                                p.typeTaux === t ? 'bg-[#0f1f6b] text-white border-[#0f1f6b]' : 'bg-white text-slate-500 border-slate-200'
                              )}>{t}</button>
                          ))}
                        </div>
                      </Field>
                      <Field label="Durée du prêt (mois)">
                        <input type="number" className={cn(inputClass, 'py-2.5 text-sm')} value={p.duree} onChange={e => updatePret(i, 'duree', e.target.value)} placeholder="240" />
                      </Field>
                      <Field label="Différé d'amortissement (mois)">
                        <input type="number" className={cn(inputClass, 'py-2.5 text-sm')} value={p.differe} onChange={e => updatePret(i, 'differe', e.target.value)} placeholder="0" />
                      </Field>
                    </div>

                    {/* Paliers */}
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-slate-500 mb-2">Paliers (optionnel)</p>
                      {p.paliers.map((pal, j) => (
                        <div key={j} className="grid grid-cols-2 gap-2 mb-2">
                          <input type="number" className={cn(inputClass, 'py-2 text-sm')} placeholder="Durée (mois)"
                            value={pal.duree} onChange={e => updatePalier(i, j, 'duree', e.target.value)} />
                          <div className="flex gap-2">
                            <input type="number" className={cn(inputClass, 'py-2 text-sm')} placeholder="Montant (€)"
                              value={pal.montant} onChange={e => updatePalier(i, j, 'montant', e.target.value)} />
                            <button onClick={() => removePalier(i, j)} className="text-xs text-red-500 px-2">✕</button>
                          </div>
                        </div>
                      ))}
                      <button onClick={() => addPalier(i)} className="text-xs font-semibold text-[#0f1f6b] hover:underline flex items-center gap-1">
                        <PlusCircle className="w-3.5 h-3.5" /> Ajouter un palier
                      </button>
                    </div>
                  </div>
                ))}

                <button onClick={addPret} className="text-sm font-semibold text-[#0f1f6b] hover:underline flex items-center gap-1.5 mb-2">
                  <PlusCircle className="w-4 h-4" /> Ajouter un prêt
                </button>

                <NavButtons onBack={goBack} onNext={goNext} nextDisabled={!canPrets} />
              </div>
            )}

            {/* ══ Étape 4 — Prêteur ══ */}
            {currentKey === 'preteur' && (
              <div>
                <SectionTitle icon={Building2} title="Organisme prêteur"
                  subtitle="Informations extraites de l'en-tête de votre offre de prêt." />

                <Field label="Organisme prêteur">
                  <select className={inputClass} value={preteur.organisme} onChange={e => setPreteur(p => ({ ...p, organisme: e.target.value }))}>
                    <option value="">Sélectionner…</option>
                    {ORGANISMES.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nom de l'agence">
                    <input className={inputClass} value={preteur.agenceNom} onChange={e => setPreteur(p => ({ ...p, agenceNom: e.target.value }))} placeholder="Agence Paris Bastille" />
                  </Field>
                  <Field label="Code agence">
                    <input className={inputClass} value={preteur.codeAgence} onChange={e => setPreteur(p => ({ ...p, codeAgence: e.target.value }))} placeholder="01234" />
                  </Field>
                </div>

                <Field label="Domiciliation de l'agence">
                  <input className={inputClass} value={preteur.agenceDomiciliation} onChange={e => setPreteur(p => ({ ...p, agenceDomiciliation: e.target.value }))} placeholder="Paris" />
                </Field>

                <div className="grid grid-cols-3 gap-4">
                  <Field label="N° et rue">
                    <input className={cn(inputClass, 'col-span-2')} value={preteur.adresseRue} onChange={e => setPreteur(p => ({ ...p, adresseRue: e.target.value }))} placeholder="12 rue de la Paix" />
                  </Field>
                  <Field label="Code postal">
                    <input className={inputClass} value={preteur.codePostalAgence} onChange={e => setPreteur(p => ({ ...p, codePostalAgence: e.target.value }))} placeholder="75002" />
                  </Field>
                </div>
                <Field label="Localité">
                  <input className={inputClass} value={preteur.localite} onChange={e => setPreteur(p => ({ ...p, localite: e.target.value }))} placeholder="Paris" />
                </Field>
                <Field label="Complément d'adresse">
                  <input className={inputClass} value={preteur.complement} onChange={e => setPreteur(p => ({ ...p, complement: e.target.value }))} placeholder="Bâtiment B, 3e étage" />
                </Field>

                <NavButtons onBack={goBack} onNext={runSimulation} nextLabel="Lancer la simulation" nextDisabled={!canPreteur} />
              </div>
            )}

            {/* ══ Étape 5 — Simulations ══ */}
            {currentKey === 'simulation' && results && (
              <div>
                <SectionTitle icon={ClipboardList} title="Comparatif des offres"
                  subtitle="Résultat de la mise en concurrence sur le marché." />

                <div className="bg-slate-50 rounded-2xl p-4 mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="text-sm text-slate-500">
                    Assurance banque : <strong className="text-slate-700">{results.bankMonthly}€/mois</strong>
                  </div>
                  <div className="text-sm font-bold text-[#10b981]">
                    Jusqu'à {results.quotes[0].savingsPct}% d'économies
                  </div>
                </div>

                <div className="flex flex-col gap-3 mb-2">
                  {results.quotes.slice(0, 5).map((quote, rank) => (
                    <div key={quote.insurer}
                      onClick={() => setSelectedQuote(quote)}
                      className={cn('rounded-2xl border p-4 cursor-pointer transition-all',
                        selectedQuote?.insurer === quote.insurer ? 'border-[#0f1f6b] ring-1 ring-[#0f1f6b] bg-[#f0f4ff]' : 'border-slate-200 hover:border-slate-300'
                      )}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: quote.color }} />
                          <span className="font-bold text-sm text-[#0a1340]">{quote.insurer}</span>
                          {rank === 0 && <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Meilleure offre</span>}
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-extrabold text-[#0a1340]">{quote.monthly}€<span className="text-sm font-normal text-slate-400">/mois</span></div>
                          <div className="text-xs text-slate-400">TAEA {quote.taea}%</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
                        <span>Total : {quote.total.toLocaleString('fr-FR')}€</span>
                        <span>Délai de carence : {quote.delay}j</span>
                      </div>
                    </div>
                  ))}
                </div>

                <NavButtons onBack={goBack} onNext={goNext} nextLabel="Continuer avec cette offre" />
              </div>
            )}

            {/* ══ Étape 6 — Informations adhésion ══ */}
            {currentKey === 'adhesion' && (
              <div>
                <SectionTitle icon={FileText} title="Informations d'adhésion"
                  subtitle="Informations extraites de votre carte d'identité et RIB." />
                <div className="space-y-6">
                  {assureds.map((a, i) => (
                    <div key={i} className={i > 0 ? 'pt-5 border-t border-slate-100' : ''}>
                      {coEmprunteur && <p className="text-sm font-bold text-[#0a1340] mb-3">{a.qualite} — {a.prenom || `Assuré ${i + 1}`}</p>}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Nom de naissance">
                          <input className={inputClass} value={a.nomNaissance} onChange={e => updateAssured(i, 'nomNaissance', e.target.value)} placeholder={a.nom} />
                        </Field>
                        <Field label="Nationalité">
                          <input className={inputClass} value={a.nationalite} onChange={e => updateAssured(i, 'nationalite', e.target.value)} />
                        </Field>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Field label="Pays de naissance">
                          <input className={inputClass} value={a.paysNaissance} onChange={e => updateAssured(i, 'paysNaissance', e.target.value)} />
                        </Field>
                        <Field label="Département de naissance">
                          <input className={inputClass} value={a.deptNaissance} onChange={e => updateAssured(i, 'deptNaissance', e.target.value)} placeholder="75" />
                        </Field>
                        <Field label="Ville de naissance">
                          <input className={inputClass} value={a.villeNaissance} onChange={e => updateAssured(i, 'villeNaissance', e.target.value)} />
                        </Field>
                      </div>
                      <Field label="Adresse postale actuelle">
                        <input className={inputClass} value={a.adresse} onChange={e => updateAssured(i, 'adresse', e.target.value)} placeholder="12 rue Exemple, 75001 Paris" />
                      </Field>
                      <div className="mb-4">
                        <Toggle checked={a.adresseChangement} onChange={v => updateAssured(i, 'adresseChangement', v)} label="Mon adresse va bientôt changer" />
                      </div>
                      <Field label="IBAN" hint="Pour le prélèvement des cotisations">
                        <input className={inputClass} value={a.iban} onChange={e => updateAssured(i, 'iban', e.target.value.toUpperCase())} placeholder="FR76 XXXX XXXX XXXX XXXX XXXX XXX" />
                      </Field>
                    </div>
                  ))}
                </div>
                <NavButtons onBack={goBack} onNext={goNext} />
              </div>
            )}

            {/* ══ Étape 7 — Substitution ══ */}
            {currentKey === 'substitution' && (
              <div>
                <SectionTitle icon={Send} title="Substitution d'assurance"
                  subtitle="Le courrier de substitution sera envoyé à votre établissement prêteur." />

                <div className="mb-4">
                  <Toggle checked={substitution.envoiCourrier}
                    onChange={v => setSubstitution(s => ({ ...s, envoiCourrier: v }))}
                    label="Envoi automatique du courrier de substitution" />
                </div>

                <Field label="Au nom de">
                  <input className={inputClass} value={substitution.auNomDe} onChange={e => setSubstitution(s => ({ ...s, auNomDe: e.target.value }))}
                    placeholder={assureds.map(a => `${a.prenom} ${a.nom}`).join(' & ')} />
                </Field>
                <Field label="Référence du prêt">
                  <input className={inputClass} value={substitution.refPret} onChange={e => setSubstitution(s => ({ ...s, refPret: e.target.value }))} placeholder="REF-2026-XXXXXX" />
                </Field>

                <p className="text-sm font-semibold text-[#0a1340] mb-3 mt-5">Conseiller bancaire (facultatif)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Prénom">
                    <input className={inputClass} value={substitution.conseillerPrenom} onChange={e => setSubstitution(s => ({ ...s, conseillerPrenom: e.target.value }))} />
                  </Field>
                  <Field label="Nom">
                    <input className={inputClass} value={substitution.conseillerNom} onChange={e => setSubstitution(s => ({ ...s, conseillerNom: e.target.value }))} />
                  </Field>
                  <Field label="Email">
                    <input type="email" className={inputClass} value={substitution.conseillerEmail} onChange={e => setSubstitution(s => ({ ...s, conseillerEmail: e.target.value }))} />
                  </Field>
                  <Field label="Téléphone">
                    <input type="tel" className={inputClass} value={substitution.conseillerTel} onChange={e => setSubstitution(s => ({ ...s, conseillerTel: e.target.value }))} />
                  </Field>
                </div>

                <p className="text-sm font-semibold text-[#0a1340] mb-3 mt-5">Contrat actuel</p>
                <div className="space-y-3">
                  {assureds.map((a, i) => (
                    <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <Field label={coEmprunteur ? `${a.qualite} — souscrit auprès de` : 'Souscrit auprès de'}>
                        <div className="grid grid-cols-2 gap-2">
                          {['Banque', 'Assureur externe'].map(t => (
                            <button key={t} onClick={() => updateAssured(i, 'contratActuelType', t)}
                              className={cn('py-2 rounded-xl border text-xs font-semibold transition-all',
                                a.contratActuelType === t ? 'bg-[#0f1f6b] text-white border-[#0f1f6b]' : 'bg-white text-slate-500 border-slate-200'
                              )}>{t}</button>
                          ))}
                        </div>
                      </Field>
                      <Field label="Nom de l'organisme">
                        <input className={cn(inputClass, 'py-2.5 text-sm')} value={a.contratActuelNom} onChange={e => updateAssured(i, 'contratActuelNom', e.target.value)} />
                      </Field>
                    </div>
                  ))}
                </div>

                <NavButtons onBack={goBack} onNext={goNext} />
              </div>
            )}

            {/* ══ Étape 8 — Souscription ══ */}
            {currentKey === 'souscription' && (
              <div>
                <SectionTitle icon={ShieldCheck} title="Finalisation de la souscription"
                  subtitle="Dernière vérification avant l'envoi de votre dossier." />

                <div className="bg-slate-50 rounded-2xl p-4 mb-5 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-400">Offre sélectionnée</span><span className="font-semibold text-[#0a1340]">{selectedQuote?.insurer || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Cotisation</span><span className="font-semibold text-[#0a1340]">{selectedQuote?.monthly || '—'}€/mois</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Date d'effet</span><span className="font-semibold text-[#0a1340]">{loanInfo.dateEffet || '—'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Organisme prêteur</span><span className="font-semibold text-[#0a1340]">{preteur.organisme || '—'}</span></div>
                </div>

                <div className="space-y-4">
                  {assureds.map((a, i) => (
                    <div key={i} className={i > 0 ? 'pt-4 border-t border-slate-100' : ''}>
                      {coEmprunteur && <p className="text-sm font-bold text-[#0a1340] mb-2">{a.qualite} — {a.prenom || `Assuré ${i + 1}`}</p>}
                      <Field label="Support d'adhésion">
                        <div className="grid grid-cols-2 gap-2">
                          {['Numérique', 'Papier'].map(s => (
                            <button key={s} onClick={() => updateAssured(i, 'supportAdhesion', s)}
                              className={cn('py-2.5 rounded-xl border text-sm font-semibold transition-all',
                                a.supportAdhesion === s ? 'bg-[#0f1f6b] text-white border-[#0f1f6b]' : 'bg-slate-50 text-slate-500 border-slate-200'
                              )}>{s}</button>
                          ))}
                        </div>
                      </Field>
                    </div>
                  ))}
                </div>

                <NavButtons onBack={goBack} onNext={handleSubscribe} nextLabel={submitting ? 'Envoi…' : 'Envoyer mon dossier'} nextDisabled={submitting} />
              </div>
            )}

            {/* ══ Étape 9 — Analyse et décision ══ */}
            {currentKey === 'suivi' && (
              <div>
                <SectionTitle icon={Clock} title="Analyse et décision"
                  subtitle="Suivi de votre dossier après envoi." />

                <div className="bg-emerald-50 border border-[#10b981] rounded-2xl p-4 mb-6 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-[#10b981] flex-shrink-0" />
                  <div>
                    <p className="font-bold text-sm text-[#0a1340]">Dossier transmis avec succès</p>
                    <p className="text-xs text-slate-500">Décision : <strong>En attente</strong> — un conseiller vous recontacte sous 24h.</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 mb-6">
                  <p className="text-sm font-bold text-[#0a1340] mb-3">Récapitulatif de l'offre retenue</p>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between"><span className="text-slate-400">Assureur</span><span className="font-semibold text-[#0a1340]">{selectedQuote?.insurer}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Total des cotisations</span><span className="font-semibold text-[#0a1340]">{selectedQuote?.total?.toLocaleString('fr-FR')}€</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">TAEA</span><span className="font-semibold text-[#0a1340]">{selectedQuote?.taea}%</span></div>
                  </div>
                </div>

                <p className="text-sm font-bold text-[#0a1340] mb-3">Étapes du dossier</p>
                <div className="space-y-3 mb-6">
                  {[
                    { label: 'Initialisation du dossier', status: 'done' },
                    { label: 'Simulation et choix de l\'offre', status: 'done' },
                    { label: 'Signature de l\'adhésion', status: 'current' },
                    ...(offerType === 'lemoine' ? [{ label: 'Envoi du courrier de substitution', status: 'todo' }] : []),
                    { label: 'Examen médical / questionnaire de santé', status: 'todo' },
                    { label: 'Attestation Kereis', status: 'todo' },
                  ].map(({ label, status }) => (
                    <div key={label} className="flex items-center gap-3">
                      {status === 'done' ? <CheckCircle2 className="w-5 h-5 text-[#10b981] flex-shrink-0" />
                        : status === 'current' ? <Clock className="w-5 h-5 text-[#0f1f6b] flex-shrink-0" />
                        : <Circle className="w-5 h-5 text-slate-300 flex-shrink-0" />}
                      <span className={cn('text-sm', status === 'todo' ? 'text-slate-400' : 'font-semibold text-[#0a1340]')}>{label}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {['Synthèse devis', 'Devoir de conseil', 'Détail de l\'offre', 'Notice'].map(doc => (
                    <button key={doc} disabled className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-400 cursor-not-allowed">
                      <Download className="w-3.5 h-3.5" /> {doc}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button onClick={restart} className="text-sm text-slate-400 hover:text-slate-600 underline">
                    Nouveau dossier
                  </button>
                  <Link to="/contact" className="ml-auto">
                    <Button>Parler à un conseiller <ArrowRight className="w-4 h-4" /></Button>
                  </Link>
                </div>
              </div>
            )}

          </div>
    </div>
  )
}

/* ─── Page complète (route /souscription) ───────────────────────── */
export const Souscription = () => (
  <>
    <SEO
      title="Espace souscription — Assur Emprunteur"
      description="Parcours de souscription en ligne pour votre assurance de prêt immobilier (démonstration)."
    />
    <section className="pt-28 pb-24 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <SouscriptionWizard />
    </section>
  </>
)
