import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Phone, Mail, MessageCircle, Clock, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const openChatBot = () => window.dispatchEvent(new CustomEvent('openChat'))

const SUBJECTS = [
  'Changer d\'assurance emprunteur',
  'Obtenir un devis personnalisé',
  'Question sur la loi Lemoine',
  'Suivi de mon dossier',
  'Autre demande',
]

export const Contact = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '', rgpd: false })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const canSend = form.firstName && form.lastName && form.email && form.phone && form.message && form.rgpd

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    try {
      await fetch('/.netlify/functions/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: { firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone },
          quote: { insurer: 'Contact direct', monthly: '—', savings: 0, savingsPct: 0, color: '#0f1f6b' },
          loanInfo: { amount: 0, duration: 0, age: 0, smoker: false, profession: form.subject || 'contact' },
          bankMonthly: '—',
          isContactForm: true,
          message: form.message,
          subject: form.subject,
        }),
      })
      setSent(true)
    } catch {
      setSent(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0a1340] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>

        <div className="mb-10">
          <span className="inline-block text-sm font-semibold text-[#10b981] uppercase tracking-widest mb-3">Contact</span>
          <h1 className="text-4xl font-extrabold text-[#0a1340] mb-3">Parlons de votre projet</h1>
          <p className="text-slate-500">Notre équipe vous répond sous 24h ouvrées.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Infos contact */}
          <div className="space-y-4">
            {[
              { icon: Phone, label: 'Téléphone', value: '06 XX XX XX XX', sub: 'Lun–Ven 9h–18h', action: null },
              { icon: Mail, label: 'Email', value: 'contact@assur-emprunteur.fr', sub: 'Réponse sous 24h', action: null },
              { icon: MessageCircle, label: 'Chat en ligne', value: 'Conseiller IA disponible', sub: '24h/24, 7j/7', action: openChatBot },
              { icon: Clock, label: 'Horaires', value: 'Lun–Ven : 9h–18h', sub: 'Sam : 9h–12h', action: null },
            ].map(({ icon: Icon, label, value, sub, action }) => (
              <div
                key={label}
                className={`bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4 ${action ? 'cursor-pointer hover:border-[#10b981] transition-colors' : ''}`}
                onClick={action || undefined}
              >
                <div className="w-10 h-10 rounded-xl bg-[#f0f4ff] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#0f1f6b]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{label}</p>
                  <p className="font-semibold text-[#0a1340] text-sm">{value}</p>
                  <p className="text-xs text-slate-400">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Formulaire */}
          <div className="md:col-span-2">
            {sent ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-[#10b981]" />
                </div>
                <h3 className="text-xl font-bold text-[#0a1340] mb-2">Message envoyé !</h3>
                <p className="text-slate-500 text-sm mb-6">Nous vous répondons sous 24h ouvrées à <strong>{form.email}</strong>.</p>
                <button onClick={() => setSent(false)} className="text-sm text-slate-400 hover:text-[#0a1340] underline">
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-8">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[['Prénom', 'firstName', 'Jean'], ['Nom', 'lastName', 'Dupont']].map(([label, key, ph]) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label} *</label>
                      <input type="text" placeholder={ph} value={form[key]}
                        onChange={e => set(key, e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0f1f6b] bg-slate-50" />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[['Email', 'email', 'jean@email.fr', 'email'], ['Téléphone', 'phone', '06 12 34 56 78', 'tel']].map(([label, key, ph, type]) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label} *</label>
                      <input type={type} placeholder={ph} value={form[key]}
                        onChange={e => set(key, e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0f1f6b] bg-slate-50" />
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Sujet</label>
                  <select value={form.subject} onChange={e => set('subject', e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0f1f6b] bg-slate-50">
                    <option value="">Sélectionnez un sujet</option>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="mb-5">
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Message *</label>
                  <textarea rows={4} placeholder="Décrivez votre situation..."
                    value={form.message} onChange={e => set('message', e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0f1f6b] bg-slate-50 resize-none" />
                </div>

                <label className="flex items-start gap-3 cursor-pointer mb-6">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 accent-[#0f1f6b]"
                    checked={form.rgpd} onChange={e => set('rgpd', e.target.checked)} />
                  <span className="text-xs text-slate-400 leading-relaxed">
                    J'accepte que mes données soient utilisées pour traiter ma demande. Conformément au RGPD, je peux exercer mes droits à tout moment. Voir notre{' '}
                    <Link to="/politique-confidentialite" className="text-[#10b981] hover:underline">politique de confidentialité</Link>.
                  </span>
                </label>

                <Button type="submit" className="w-full" size="lg" disabled={!canSend || sending}>
                  {sending ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi en cours…</> : <><Send className="w-4 h-4" /> Envoyer mon message</>}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
