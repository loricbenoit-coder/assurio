import React, { useState, useEffect } from 'react'
import { Shield, LogOut, TrendingDown, Phone, Mail, Euro, Calendar, RefreshCw, Download, Link, Users } from 'lucide-react'

const AFFILIES = [
  { id: 'kevin-immo', name: 'Kevin Immo', platform: 'YouTube', link: 'https://assur-emprunteur.fr?ref=kevin-immo' },
  { id: 'sarah-finance', name: 'Sarah Finance', platform: 'Instagram', link: 'https://assur-emprunteur.fr?ref=sarah-finance' },
  { id: 'marc-invest', name: 'Marc Invest', platform: 'TikTok', link: 'https://assur-emprunteur.fr?ref=marc-invest' },
]

const STATUS_CONFIG = {
  nouveau:  { label: 'Nouveau',   color: 'bg-blue-100 text-blue-700' },
  contacte: { label: 'Contacté',  color: 'bg-yellow-100 text-yellow-700' },
  en_cours: { label: 'En cours',  color: 'bg-orange-100 text-orange-700' },
  signe:    { label: 'Signé ✅',  color: 'bg-green-100 text-green-700' },
  perdu:    { label: 'Perdu',     color: 'bg-red-100 text-red-700' },
}

const fmt = (n) => Number(n).toLocaleString('fr-FR') + '€'
const fmtDate = (d) => new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

/* ─── Login ─────────────────────────────────────────────── */
const LoginScreen = ({ onLogin }) => {
  const [pwd, setPwd] = useState('')
  const [error, setError] = useState(false)
  const handleSubmit = (e) => { e.preventDefault(); onLogin(pwd, setError) }

  return (
    <div className="min-h-screen bg-[#0a1340] flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0f1f6b] flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#10b981]" />
          </div>
          <div>
            <h1 className="font-extrabold text-[#0a1340] text-lg leading-tight">Admin</h1>
            <p className="text-slate-400 text-xs">Assur Emprunteur</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label className="block text-xs font-semibold text-slate-500 mb-2">Mot de passe</label>
          <input type="password" value={pwd} onChange={(e) => { setPwd(e.target.value); setError(false) }}
            className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 mb-4 ${error ? 'border-red-400 focus:ring-red-200' : 'border-slate-200 focus:ring-[#0f1f6b]/20 focus:border-[#0f1f6b]'}`}
            placeholder="••••••••••••" autoFocus />
          {error && <p className="text-red-500 text-xs mb-3">Mot de passe incorrect</p>}
          <button type="submit" className="w-full bg-[#0f1f6b] hover:bg-[#172b88] text-white font-semibold py-3 rounded-xl transition-colors text-sm">
            Accéder au tableau de bord
          </button>
        </form>
      </div>
    </div>
  )
}

/* ─── Onglet Affiliés ────────────────────────────────────── */
const TabAffilies = ({ leads }) => (
  <div>
    <div className="mb-6">
      <h2 className="text-xl font-bold text-[#0a1340]">Vos affiliés</h2>
      <p className="text-sm text-slate-400 mt-1">Partagez ces liens avec vos partenaires influenceurs</p>
    </div>
    <div className="grid md:grid-cols-3 gap-4 mb-8">
      {AFFILIES.map(({ id, name, platform, link }) => {
        const affLeads = leads.filter(l => l.referral === id)
        const affSignes = affLeads.filter(l => l.status === 'signe')
        const affCA = affSignes.reduce((acc, l) => acc + (l.quote?.savings > 5000 ? 700 : 350), 0)
        return (
          <div key={id} className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-bold text-[#0a1340]">{name}</div>
                <div className="text-xs text-slate-400">{platform}</div>
              </div>
              <span className="text-xs bg-[#f0f4ff] text-[#0f1f6b] font-semibold px-2.5 py-1 rounded-full">
                {affLeads.length} leads
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4 text-center">
              <div className="bg-slate-50 rounded-xl p-2">
                <div className="font-bold text-[#0a1340]">{affSignes.length}</div>
                <div className="text-xs text-slate-400">Signés</div>
              </div>
              <div className="bg-emerald-50 rounded-xl p-2">
                <div className="font-bold text-emerald-700">{affCA}€</div>
                <div className="text-xs text-slate-400">CA généré</div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-500 truncate">{link}</span>
              <button onClick={() => navigator.clipboard.writeText(link)}
                className="text-xs bg-[#0f1f6b] text-white px-2.5 py-1 rounded-lg font-medium flex-shrink-0 hover:bg-[#172b88] transition-colors">
                Copier
              </button>
            </div>
          </div>
        )
      })}
      <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-5 flex flex-col items-center justify-center text-center gap-2">
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
          <Link className="w-5 h-5 text-slate-400" />
        </div>
        <div className="text-sm font-semibold text-slate-500">Ajouter un affilié</div>
        <div className="text-xs text-slate-400">Modifiez Admin.jsx → tableau AFFILIES</div>
      </div>
    </div>
    <div className="bg-[#f0f4ff] rounded-2xl p-6 border border-[#0f1f6b]/10">
      <h3 className="font-bold text-[#0a1340] mb-3">💡 Comment ça marche</h3>
      <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-600">
        <div><strong className="text-[#0f1f6b]">1.</strong> Chaque affilié reçoit son lien unique</div>
        <div><strong className="text-[#0f1f6b]">2.</strong> Chaque lead arrivé via ce lien est tracké automatiquement</div>
        <div><strong className="text-[#0f1f6b]">3.</strong> Tu vois ici les leads et CA par affilié</div>
      </div>
    </div>
  </div>
)

/* ─── Onglet Leads ───────────────────────────────────────── */
const TabLeads = ({ leads, loading, filter, setFilter, exportCSV, setSelected }) => {
  const total = leads.length
  const signes = leads.filter(l => l.status === 'signe').length
  const ca = leads.filter(l => l.status === 'signe').reduce((acc, l) => acc + (l.quote?.savings > 5000 ? 700 : 350), 0)
  const nouveaux = leads.filter(l => l.status === 'nouveau').length
  const filtered = filter === 'tous' ? leads : leads.filter(l => l.status === filter)

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total leads', value: total, icon: TrendingDown, color: 'text-[#0f1f6b]', bg: 'bg-[#f0f4ff]' },
          { label: 'Nouveaux', value: nouveaux, icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Signés', value: signes, icon: Shield, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'CA estimé', value: ca > 0 ? fmt(ca) : '0€', icon: Euro, color: 'text-green-600', bg: 'bg-green-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className="text-2xl font-extrabold text-[#0a1340]">{value}</div>
            <div className="text-sm text-slate-400">{label}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {['tous', ...Object.keys(STATUS_CONFIG)].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === s ? 'bg-[#0f1f6b] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#0f1f6b]/40'}`}>
              {s === 'tous' ? `Tous (${total})` : STATUS_CONFIG[s].label}
            </button>
          ))}
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 hover:text-[#0f1f6b] px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <Download className="w-4 h-4" /> Exporter CSV
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3" />
            Chargement des leads...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Shield className="w-8 h-8 mx-auto mb-3 opacity-30" />
            {leads.length === 0 ? 'Aucun lead pour le moment — partagez votre site !' : 'Aucun lead pour ce filtre'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {['Date', 'Contact', 'Prêt', 'Offre', 'Économies', 'Source', 'Statut', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <tr key={lead.id || i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setSelected(lead)}>
                    <td className="px-4 py-4 text-xs text-slate-500 whitespace-nowrap">{fmtDate(lead.createdAt)}</td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-[#0a1340] text-sm">{lead.contact.firstName} {lead.contact.lastName}</div>
                      <div className="text-xs text-slate-400">{lead.contact.email}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm font-semibold text-[#0a1340]">{Number(lead.loanInfo.amount).toLocaleString('fr-FR')}€</div>
                      <div className="text-xs text-slate-400">{lead.loanInfo.duration} ans · {lead.loanInfo.age} ans</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lead.quote.color }} />
                        <span className="text-sm text-[#0a1340] font-medium">{lead.quote.insurer}</span>
                      </div>
                      <div className="text-xs text-slate-400">{lead.quote.monthly}€/mois</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-bold text-emerald-600">{Number(lead.quote.savings).toLocaleString('fr-FR')}€</span>
                      <div className="text-xs text-slate-400">-{lead.quote.savingsPct}%</div>
                    </td>
                    <td className="px-4 py-4">
                      {lead.referral ? (
                        <span className="text-xs bg-purple-50 text-purple-700 font-semibold px-2.5 py-1 rounded-full">
                          🔗 {lead.referral}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">Direct</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_CONFIG[lead.status]?.color || 'bg-slate-100 text-slate-600'}`}>
                        {STATUS_CONFIG[lead.status]?.label || lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <a href={`tel:${lead.contact.phone}`} onClick={e => e.stopPropagation()} className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#0f1f6b] hover:text-white text-slate-600 transition-colors"><Phone className="w-3.5 h-3.5" /></a>
                        <a href={`mailto:${lead.contact.email}`} onClick={e => e.stopPropagation()} className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#10b981] hover:text-white text-slate-600 transition-colors"><Mail className="w-3.5 h-3.5" /></a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Dashboard principal ────────────────────────────────── */
const Dashboard = ({ password, onLogout }) => {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('tous')
  const [tab, setTab] = useState('leads')

  const loadLeads = async () => {
    setLoading(true)
    try {
      const res = await fetch('/.netlify/functions/get-leads', { headers: { 'x-admin-password': password } })
      const data = await res.json()
      setLeads(data.leads || [])
    } catch { setLeads([]) }
    finally { setLoading(false) }
  }

  useEffect(() => { loadLeads() }, [])

  const exportCSV = () => {
    const rows = [['Date', 'Prénom', 'Nom', 'Email', 'Téléphone', 'Montant', 'Durée', 'Offre', 'Économies', 'Source', 'Statut']]
    leads.forEach(l => {
      rows.push([fmtDate(l.createdAt), l.contact.firstName, l.contact.lastName, l.contact.email, l.contact.phone,
        l.loanInfo.amount, l.loanInfo.duration + ' ans', l.quote.insurer, l.quote.savings + '€', l.referral || 'Direct', l.status])
    })
    const csv = rows.map(r => r.join(';')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-assur-emprunteur-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-[#0a1340] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <Shield className="w-4 h-4 text-[#10b981]" />
          </div>
          <span className="text-white font-bold">Tableau de bord — Assur Emprunteur</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={loadLeads} className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors">
            <RefreshCw className="w-4 h-4" /> Actualiser
          </button>
          <button onClick={onLogout} className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors">
            <LogOut className="w-4 h-4" /> Déconnexion
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-8">
          {[
            { id: 'leads', label: 'Mes leads', icon: Users },
            { id: 'affilies', label: 'Affiliés & liens', icon: Link },
          ].map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === id ? 'bg-[#0f1f6b] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-[#0f1f6b]/40'}`}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {tab === 'affilies' && <TabAffilies leads={leads} />}
        {tab === 'leads' && (
          <TabLeads
            leads={leads}
            loading={loading}
            filter={filter}
            setFilter={setFilter}
            exportCSV={exportCSV}
            setSelected={setSelected}
          />
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-[#0a1340] text-lg">{selected.contact.firstName} {selected.contact.lastName}</h3>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-700 text-xl">×</button>
            </div>
            {[
              ['📅 Date', fmtDate(selected.createdAt)],
              ['📧 Email', selected.contact.email],
              ['📞 Téléphone', selected.contact.phone],
              ['💰 Montant prêt', fmt(selected.loanInfo.amount)],
              ['⏱ Durée', `${selected.loanInfo.duration} ans`],
              ['👤 Âge', `${selected.loanInfo.age} ans`],
              ['🏆 Offre choisie', selected.quote.insurer],
              ['💵 Prime mensuelle', `${selected.quote.monthly}€/mois`],
              ['💚 Économies', `${Number(selected.quote.savings).toLocaleString('fr-FR')}€ (-${selected.quote.savingsPct}%)`],
              ['🔗 Source', selected.referral || 'Direct'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2.5 border-b border-slate-100 text-sm last:border-0">
                <span className="text-slate-500">{k}</span>
                <span className="font-semibold text-[#0a1340]">{v}</span>
              </div>
            ))}
            <div className="flex gap-3 mt-5">
              <a href={`tel:${selected.contact.phone}`} className="flex-1 flex items-center justify-center gap-2 bg-[#0f1f6b] text-white py-3 rounded-xl text-sm font-semibold"><Phone className="w-4 h-4" /> Appeler</a>
              <a href={`mailto:${selected.contact.email}`} className="flex-1 flex items-center justify-center gap-2 bg-[#10b981] text-white py-3 rounded-xl text-sm font-semibold"><Mail className="w-4 h-4" /> Email</a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Page principale ────────────────────────────────────── */
export const Admin = () => {
  const [password, setPassword] = useState(sessionStorage.getItem('ae_admin') || '')
  const [authed, setAuthed] = useState(!!sessionStorage.getItem('ae_admin'))

  const handleLogin = async (pwd, setError) => {
    const res = await fetch('/.netlify/functions/get-leads', { headers: { 'x-admin-password': pwd } })
    if (res.ok) { setPassword(pwd); setAuthed(true); sessionStorage.setItem('ae_admin', pwd) }
    else setError(true)
  }

  const handleLogout = () => { sessionStorage.removeItem('ae_admin'); setAuthed(false); setPassword('') }

  if (!authed) return <LoginScreen onLogin={handleLogin} />
  return <Dashboard password={password} onLogout={handleLogout} />
}
