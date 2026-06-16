import { getStore, connectLambda } from '@netlify/blobs'

const OWNER_EMAIL = 'loricbenoit@gmail.com'

const fmt = (n) =>
  n != null
    ? Number(n).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
    : '—'

const fmtDate = (iso) => {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

const OBJET_LABELS = { principal: 'Résidence principale', secondaire: 'Résidence secondaire', locatif: 'Investissement locatif' }

const sendEmail = async (key, { to, subject, html }) => {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Assur Emprunteur <onboarding@resend.dev>',
      to,
      subject,
      html,
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Resend error ${res.status}: ${text}`)
  }
}

const buildOwnerEmail = ({ assureds, prets, loanInfo, preteur, selectedQuote }) => {
  const now = new Date()
  const dateStr = now.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  const primary = assureds[0] || {}
  const totalCapital = prets.reduce((s, p) => s + (Number(p.montant) || 0), 0)

  const assuredRows = assureds.map((a, i) => `
    <div class="section">
      <div class="st">${i === 0 ? '👤 Emprunteur' : '👥 Co-emprunteur'}</div>
      <div class="row"><span class="label">Identité</span><span class="value">${a.civilite || ''} ${a.prenom || ''} ${a.nom || ''}</span></div>
      <div class="row"><span class="label">Naissance</span><span class="value">${fmtDate(a.dateNaissance)}</span></div>
      <div class="row"><span class="label">Email</span><span class="value">${a.email || '—'}</span></div>
      <div class="row"><span class="label">Téléphone</span><span class="value">${a.tel || '—'}</span></div>
      <div class="row"><span class="label">Profession</span><span class="value">${a.profession || '—'} · ${a.statutPro || '—'}</span></div>
      <div class="row"><span class="label">Tabac</span><span class="value">${a.fumeur ? '🚬 Fumeur' : '🚭 Non-fumeur'}</span></div>
      ${a.professionRisque ? '<div class="row"><span class="label">Profession à risque</span><span class="value">⚠️ Oui</span></div>' : ''}
      ${a.sportRisque ? '<div class="row"><span class="label">Sport à risque</span><span class="value">⚠️ Oui</span></div>' : ''}
      <div class="row"><span class="label">Quotité</span><span class="value">${a.quotite || 100}%</span></div>
      <div class="row"><span class="label">Code postal</span><span class="value">${a.codePostal || '—'}</span></div>
    </div>`).join('')

  const pretRows = prets.map((p, i) => `
    <div class="section">
      <div class="st">💳 Prêt ${prets.length > 1 ? i + 1 : ''}</div>
      <div class="row"><span class="label">Montant</span><span class="value">${fmt(p.montant)}</span></div>
      <div class="row"><span class="label">Durée</span><span class="value">${p.dureeMois || '—'} mois</span></div>
      <div class="row"><span class="label">Taux nominal</span><span class="value">${p.tauxNominal != null ? p.tauxNominal + ' %' : '—'}</span></div>
      <div class="row"><span class="label">Nature</span><span class="value">${p.nature || 'Amortissable'}</span></div>
      ${p.differeMois ? `<div class="row"><span class="label">Différé</span><span class="value">${p.differeMois} mois</span></div>` : ''}
    </div>`).join('')

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><style>
body{font-family:Inter,Arial,sans-serif;background:#f8fafc;margin:0;padding:20px}
.card{background:white;border-radius:16px;padding:32px;max-width:640px;margin:0 auto;border:1px solid #e2e8f0}
.badge{display:inline-block;background:#dcfce7;color:#16a34a;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;margin-bottom:20px}
h1{color:#0a1340;font-size:22px;margin:0 0 8px}
.section{background:#f8fafc;border-radius:12px;padding:16px 20px;margin-bottom:16px}
.st{font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px}
.row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9;gap:8px}
.row:last-child{border-bottom:none}
.label{font-size:13px;color:#64748b;flex-shrink:0}.value{font-size:13px;font-weight:600;color:#0a1340;text-align:right}
.hl{background:#ecfdf5;border:1px solid #bbf7d0;border-radius:12px;padding:14px 18px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center}
.cta{background:#0f1f6b;color:white;display:block;text-align:center;padding:14px;border-radius:12px;font-weight:700;font-size:14px;text-decoration:none;margin-top:24px}
</style></head><body><div class="card">
<div class="badge">📋 Dossier complet</div>
<h1>Nouveau dossier de souscription</h1>
<p style="color:#64748b;font-size:14px;margin:0 0 24px">Reçu le ${dateStr} à ${timeStr}</p>
${assuredRows}
<div class="section"><div class="st">🏦 Prêteur</div>
<div class="row"><span class="label">Organisme</span><span class="value">${preteur.organisme || '—'}</span></div>
<div class="row"><span class="label">Agence</span><span class="value">${preteur.agenceNom || '—'}</span></div>
${preteur.codeAgence ? `<div class="row"><span class="label">Code agence</span><span class="value">${preteur.codeAgence}</span></div>` : ''}
</div>
${pretRows}
<div class="section"><div class="st">📁 Projet</div>
<div class="row"><span class="label">Type de bien</span><span class="value">${OBJET_LABELS[loanInfo.objet] || loanInfo.objet || '—'}</span></div>
<div class="row"><span class="label">Date d'effet</span><span class="value">${fmtDate(loanInfo.dateEffet)}</span></div>
<div class="row"><span class="label">Capital total</span><span class="value">${fmt(totalCapital)}</span></div>
</div>
<div class="hl">
<div><div style="font-size:12px;color:#64748b;margin-bottom:4px">Offre retenue</div>
<div style="font-weight:700;color:#0a1340;font-size:15px">${selectedQuote?.insurer || '—'}</div></div>
<div style="text-align:right">
<div style="font-size:24px;font-weight:800;color:#0a1340">${selectedQuote?.monthly || '—'}€<span style="font-size:13px;font-weight:400;color:#94a3b8">/mois</span></div>
${selectedQuote?.savingsPct ? `<div style="color:#16a34a;font-weight:700">-${selectedQuote.savingsPct}% vs banque</div>` : ''}
</div></div>
<a href="mailto:${primary.email}" class="cta">📧 Contacter ${primary.prenom || 'le client'}</a>
</div></body></html>`
}

const buildClientEmail = ({ assureds, prets, loanInfo, selectedQuote }) => {
  const primary = assureds[0] || {}
  const totalCapital = prets.reduce((s, p) => s + (Number(p.montant) || 0), 0)

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><style>
body{font-family:Inter,Arial,sans-serif;background:#f8fafc;margin:0;padding:20px}
.card{background:white;border-radius:16px;padding:32px;max-width:600px;margin:0 auto;border:1px solid #e2e8f0}
.header{background:linear-gradient(135deg,#0f1f6b,#0a1340);border-radius:12px;padding:24px;margin-bottom:24px;text-align:center}
.section{background:#f8fafc;border-radius:12px;padding:16px 20px;margin-bottom:16px}
.row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9}
.row:last-child{border-bottom:none}
.saving-box{background:#ecfdf5;border:1px solid #bbf7d0;border-radius:12px;padding:16px 20px;margin-bottom:16px;text-align:center}
.footer{text-align:center;color:#94a3b8;font-size:11px;margin-top:20px;padding-top:20px;border-top:1px solid #f1f5f9}
.step{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9}
.step:last-child{border-bottom:none}
.num{width:28px;height:28px;border-radius:50%;background:#0f1f6b;color:white;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0}
</style></head><body><div class="card">
<div class="header">
  <h1 style="color:white;margin:0;font-size:20px">Bonjour ${primary.prenom || ''} 👋</h1>
  <p style="color:rgba(255,255,255,0.6);margin:8px 0 0;font-size:13px">Votre dossier a bien été reçu</p>
</div>
<p style="color:#475569;font-size:14px;margin-bottom:24px">
  Nous avons bien reçu votre dossier de souscription. Vous serez recontacté(e) sous <strong>48 heures</strong> pour valider les dernières étapes.
</p>
${selectedQuote?.savings ? `<div class="saving-box">
  <div style="font-size:13px;color:#16a34a;font-weight:600;margin-bottom:4px">Économies estimées</div>
  <div style="font-size:32px;font-weight:800;color:#0a1340">${Number(selectedQuote.savings).toLocaleString('fr-FR')}€</div>
  <div style="font-size:12px;color:#64748b">sur la durée du prêt avec ${selectedQuote.insurer}</div>
</div>` : ''}
<div class="section">
  <div class="row"><span style="font-size:13px;color:#64748b">Capital assuré</span><span style="font-size:13px;font-weight:600;color:#0a1340">${fmt(totalCapital)}</span></div>
  <div class="row"><span style="font-size:13px;color:#64748b">Date d'effet souhaitée</span><span style="font-size:13px;font-weight:600;color:#0a1340">${fmtDate(loanInfo.dateEffet)}</span></div>
  <div class="row"><span style="font-size:13px;color:#64748b">Offre retenue</span><span style="font-size:13px;font-weight:600;color:#0a1340">${selectedQuote?.insurer || '—'}</span></div>
  <div class="row"><span style="font-size:13px;color:#64748b">Prime mensuelle</span><span style="font-size:13px;font-weight:600;color:#0a1340">${selectedQuote?.monthly || '—'}€/mois</span></div>
</div>
<div class="section">
  <p style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px">📋 Prochaines étapes</p>
  <div class="step"><div class="num">1</div><span style="font-size:13px;color:#475569">Vérification de votre dossier par notre équipe</span></div>
  <div class="step"><div class="num">2</div><span style="font-size:13px;color:#475569">Validation médicale si nécessaire</span></div>
  <div class="step"><div class="num">3</div><span style="font-size:13px;color:#475569">Signature électronique du contrat</span></div>
  <div class="step"><div class="num">4</div><span style="font-size:13px;color:#475569">Mise en place de la garantie à la date d'effet</span></div>
</div>
<div class="footer">
  <strong>Assur Emprunteur</strong> · Courtier en assurance emprunteur<br/>
  assur-emprunteur.fr · <a href="mailto:contact@assur-emprunteur.fr" style="color:#94a3b8">contact@assur-emprunteur.fr</a>
</div>
</div></body></html>`
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }
  connectLambda(event)

  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }

  try {
    const { assureds, prets, loanInfo, preteur, selectedQuote } = JSON.parse(event.body)
    const RESEND_KEY = process.env.RESEND_API_KEY

    if (!RESEND_KEY) throw new Error('RESEND_API_KEY manquant')

    const now = new Date()
    const dossierId = `dossier_${now.getTime()}`
    const primary = assureds?.[0] || {}
    const totalCapital = prets.reduce((s, p) => s + (Number(p.montant) || 0), 0)
    const maxDureeMois = Math.max(...prets.map(p => Number(p.dureeMois) || 0), 0)

    // Sauvegarde dans Netlify Blobs (visible dans la page admin)
    try {
      const store = getStore('leads')
      await store.set(dossierId, JSON.stringify({
        id: dossierId,
        contact: {
          firstName: primary.prenom || '',
          lastName: primary.nom || '',
          email: primary.email || '',
          phone: primary.tel || '',
        },
        loanInfo: {
          amount: totalCapital,
          duration: Math.round(maxDureeMois / 12),
          objet: loanInfo.objet,
          dateEffet: loanInfo.dateEffet,
        },
        quote: selectedQuote || null,
        assureds,
        prets,
        preteur,
        createdAt: now.toISOString(),
        status: 'nouveau',
        type: 'dossier',
      }))
    } catch (e) {
      console.error('Blob save error:', e)
    }

    await sendEmail(RESEND_KEY, {
      to: [OWNER_EMAIL],
      subject: `📋 Dossier ${primary.prenom || ''} ${primary.nom || ''} — ${prets.reduce((s, p) => s + (Number(p.montant) || 0), 0).toLocaleString('fr-FR')}€`,
      html: buildOwnerEmail({ assureds, prets, loanInfo, preteur, selectedQuote }),
    })

    if (primary.email) {
      await sendEmail(RESEND_KEY, {
        to: [primary.email],
        subject: `Votre dossier Assur Emprunteur a été transmis`,
        html: buildClientEmail({ assureds, prets, loanInfo, selectedQuote }),
      })
    }

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) }
  } catch (err) {
    console.error('submit-dossier error:', err)
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Erreur lors de l\'envoi du dossier' }) }
  }
}
