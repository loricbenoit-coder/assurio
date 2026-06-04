import { getStore } from '@netlify/blobs'

const OWNER_EMAIL = 'loricbenoit@gmail.com'

const PROFESSION_LABELS = {
  cadre: 'Cadre / Ingénieur', employe: 'Employé / Ouvrier',
  fonctionnaire: 'Fonctionnaire', liberal: 'Profession libérale',
  artisan: 'Artisan / Commerçant', autre: 'Autre',
}

const fmt = (n) => Number(n).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

/* ─── Templates emails ──────────────────────────────────────── */

const emailOwner = ({ contact, quote, loanInfo, bankMonthly }) => `
<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><style>
body{font-family:Inter,Arial,sans-serif;background:#f8fafc;margin:0;padding:20px}
.card{background:white;border-radius:16px;padding:32px;max-width:600px;margin:0 auto;border:1px solid #e2e8f0}
.badge{display:inline-block;background:#dcfce7;color:#16a34a;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;margin-bottom:20px}
h1{color:#0a1340;font-size:22px;margin:0 0 8px}
.section{background:#f8fafc;border-radius:12px;padding:16px 20px;margin-bottom:16px}
.st{font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px}
.row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9}
.row:last-child{border-bottom:none}
.label{font-size:13px;color:#64748b}.value{font-size:13px;font-weight:600;color:#0a1340}
.hl{background:#ecfdf5;border-radius:12px;padding:14px 18px;margin-bottom:16px;display:flex;justify-content:space-between}
.saving{color:#16a34a;font-weight:800;font-size:18px}
.cta{background:#0f1f6b;color:white;display:block;text-align:center;padding:14px;border-radius:12px;font-weight:700;font-size:14px;text-decoration:none;margin-top:24px}
</style></head><body><div class="card">
<div class="badge">🔔 Nouveau lead</div>
<h1>Nouvelle demande de devis</h1>
<p style="color:#64748b;font-size:14px;margin:0 0 24px">Reçue le ${new Date().toLocaleDateString('fr-FR', {weekday:'long',year:'numeric',month:'long',day:'numeric'})} à ${new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}</p>
<div class="section"><div class="st">👤 Contact</div>
<div class="row"><span class="label">Nom</span><span class="value">${contact.firstName} ${contact.lastName}</span></div>
<div class="row"><span class="label">Email</span><span class="value">${contact.email}</span></div>
<div class="row"><span class="label">Téléphone</span><span class="value">${contact.phone}</span></div></div>
<div class="section"><div class="st">🏠 Prêt</div>
<div class="row"><span class="label">Montant</span><span class="value">${fmt(loanInfo.amount)}</span></div>
<div class="row"><span class="label">Durée</span><span class="value">${loanInfo.duration} ans</span></div>
<div class="row"><span class="label">Âge</span><span class="value">${loanInfo.age} ans</span></div>
<div class="row"><span class="label">Profession</span><span class="value">${PROFESSION_LABELS[loanInfo.profession]||loanInfo.profession}</span></div>
<div class="row"><span class="label">Tabac</span><span class="value">${loanInfo.smoker?'🚬 Fumeur':'🚭 Non-fumeur'}</span></div></div>
<div class="hl">
<div><div style="font-size:12px;color:#64748b;margin-bottom:4px">Offre choisie</div><div style="font-weight:700;color:#0a1340">${quote.insurer}</div></div>
<div style="text-align:right"><div style="font-size:22px;font-weight:800;color:#0a1340">${quote.monthly}€<span style="font-size:13px;font-weight:400;color:#94a3b8">/mois</span></div>
<div class="saving">-${quote.savingsPct}% vs banque</div></div></div>
<div class="section"><div class="st">💰 Comparatif</div>
<div class="row"><span class="label">Assurance banque</span><span class="value">${bankMonthly}€/mois</span></div>
<div class="row"><span class="label">Offre sélectionnée</span><span class="value">${quote.monthly}€/mois</span></div>
<div class="row"><span class="label">Économies totales</span><span class="value" style="color:#16a34a">${Number(quote.savings).toLocaleString('fr-FR')}€ sur ${loanInfo.duration} ans</span></div></div>
<a href="mailto:${contact.email}" class="cta">📧 Répondre à ${contact.firstName}</a>
</div></body></html>`

const emailClient = ({ contact, quote, loanInfo }) => `
<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><style>
body{font-family:Inter,Arial,sans-serif;background:#f8fafc;margin:0;padding:20px}
.card{background:white;border-radius:16px;padding:32px;max-width:600px;margin:0 auto;border:1px solid #e2e8f0}
.header{background:linear-gradient(135deg,#0f1f6b,#0a1340);border-radius:12px;padding:24px;margin-bottom:24px;text-align:center}
.section{background:#f8fafc;border-radius:12px;padding:16px 20px;margin-bottom:16px}
.row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9}
.row:last-child{border-bottom:none}
.saving-box{background:#ecfdf5;border:1px solid #bbf7d0;border-radius:12px;padding:16px 20px;margin-bottom:16px;text-align:center}
.footer{text-align:center;color:#94a3b8;font-size:11px;margin-top:20px;padding-top:20px;border-top:1px solid #f1f5f9}
</style></head><body><div class="card">
<div class="header"><h1 style="color:white;margin:0;font-size:20px">Bonjour ${contact.firstName} 👋</h1>
<p style="color:rgba(255,255,255,0.6);margin:8px 0 0;font-size:13px">Votre demande a bien été reçue</p></div>
<p style="color:#475569;font-size:14px;margin-bottom:24px">Un conseiller Assur-Emprunt vous contactera dans les <strong>24 heures</strong>.</p>
<div class="saving-box">
<div style="font-size:13px;color:#16a34a;font-weight:600;margin-bottom:4px">Votre économie estimée</div>
<div style="font-size:32px;font-weight:800;color:#0a1340">${Number(quote.savings).toLocaleString('fr-FR')}€</div>
<div style="font-size:12px;color:#64748b">sur ${loanInfo.duration} ans avec ${quote.insurer}</div></div>
<div class="section">
<div class="row"><span style="font-size:13px;color:#64748b">Montant emprunté</span><span style="font-size:13px;font-weight:600;color:#0a1340">${Number(loanInfo.amount).toLocaleString('fr-FR')}€</span></div>
<div class="row"><span style="font-size:13px;color:#64748b">Durée</span><span style="font-size:13px;font-weight:600;color:#0a1340">${loanInfo.duration} ans</span></div>
<div class="row"><span style="font-size:13px;color:#64748b">Offre retenue</span><span style="font-size:13px;font-weight:600;color:#0a1340">${quote.insurer}</span></div>
<div class="row"><span style="font-size:13px;color:#64748b">Prime mensuelle</span><span style="font-size:13px;font-weight:600;color:#0a1340">${quote.monthly}€/mois</span></div></div>
<div class="footer"><strong>Assur-Emprunt</strong> · Courtier en assurance ORIAS<br/>assur-emprunt.netlify.app</div>
</div></body></html>`

const emailFollowup = ({ contact, quote, loanInfo, day }) => {
  const msgs = {
    1: { subject: `${contact.firstName}, avez-vous des questions sur votre devis ?`, intro: `Vous avez fait une simulation hier pour un prêt de ${fmt(loanInfo.amount)}. Notre conseiller est disponible pour répondre à toutes vos questions et finaliser votre dossier gratuitement.`, cta: 'Contacter un conseiller' },
    3: { subject: `Ne laissez pas filer ${Number(quote.savings).toLocaleString('fr-FR')}€ d'économies`, intro: `Il y a 3 jours, vous avez découvert que vous pouviez économiser <strong>${Number(quote.savings).toLocaleString('fr-FR')}€</strong> sur votre assurance emprunteur. Il suffit de quelques minutes pour finaliser votre dossier.`, cta: 'Finaliser mon dossier' },
    7: { subject: 'Dernière relance — votre simulation Assur-Emprunt', intro: `C'est notre dernière relance concernant votre demande de devis. Si vous avez changé d'avis ou trouvé une autre solution, pas de souci. Sinon, nous sommes toujours disponibles pour vous faire économiser <strong>${Number(quote.savings).toLocaleString('fr-FR')}€</strong>.`, cta: 'Reprendre ma simulation' },
  }
  const m = msgs[day]
  return {
    subject: m.subject,
    html: `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><style>body{font-family:Inter,Arial,sans-serif;background:#f8fafc;margin:0;padding:20px}.card{background:white;border-radius:16px;padding:32px;max-width:600px;margin:0 auto;border:1px solid #e2e8f0}.cta{background:#10b981;color:white;display:block;text-align:center;padding:14px;border-radius:12px;font-weight:700;font-size:14px;text-decoration:none;margin-top:24px}.footer{text-align:center;color:#94a3b8;font-size:11px;margin-top:20px}</style></head><body><div class="card">
<p style="color:#64748b;font-size:13px">Bonjour ${contact.firstName},</p>
<p style="color:#0a1340;font-size:15px;line-height:1.6">${m.intro}</p>
<div style="background:#f0f4ff;border-radius:12px;padding:16px;margin:20px 0;display:flex;justify-content:space-between">
<div><div style="font-size:12px;color:#64748b">Votre meilleure offre</div><div style="font-weight:700;color:#0a1340">${quote.insurer}</div></div>
<div style="text-align:right"><div style="font-size:20px;font-weight:800;color:#0a1340">${quote.monthly}€/mois</div><div style="font-size:12px;color:#16a34a;font-weight:600">-${quote.savingsPct}% vs banque</div></div></div>
<a href="https://assur-emprunt.netlify.app/#simulateur" class="cta">${m.cta} →</a>
<p style="color:#94a3b8;font-size:12px;margin-top:16px">Pour ne plus recevoir nos emails : <a href="mailto:contact@assur-emprunt.fr?subject=Désinscription" style="color:#94a3b8">se désinscrire</a></p>
<div class="footer"><strong>Assur-Emprunt</strong> · Courtier en assurance ORIAS</div>
</div></body></html>`,
  }
}

/* ─── Envoi email via Resend ──────────────────────────────── */
const sendEmail = async (key, { to, subject, html }) => {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'Assur-Emprunt <onboarding@resend.dev>', to, subject, html }),
  })
  return res.ok
}

const sendScheduled = async (key, { to, subject, html, scheduledAt }) => {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'Assur-Emprunt <onboarding@resend.dev>', to, subject, html, scheduled_at: scheduledAt }),
  })
  return res.ok
}

/* ─── Handler principal ───────────────────────────────────── */
export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }

  try {
    const payload = JSON.parse(event.body)
    const { contact, quote, loanInfo, bankMonthly } = payload
    const RESEND_KEY = process.env.RESEND_API_KEY
    const now = new Date()
    const leadId = `lead_${now.getTime()}`

    // 1. Sauvegarder le lead dans Netlify Blobs
    try {
      const store = getStore({ name: 'leads', siteID: context.site?.id || process.env.SITE_ID, token: process.env.NETLIFY_BLOBS_TOKEN || context.token })
      const leadData = { id: leadId, contact, quote, loanInfo, bankMonthly, createdAt: now.toISOString(), status: 'nouveau' }
      await store.set(leadId, JSON.stringify(leadData))
    } catch (e) { console.error('Blob save error:', e.message) }

    // 2. Email immédiat au courtier
    await sendEmail(RESEND_KEY, { to: [OWNER_EMAIL], subject: `🔔 Nouveau lead — ${contact.firstName} ${contact.lastName} · ${fmt(loanInfo.amount)}`, html: emailOwner({ contact, quote, loanInfo, bankMonthly }) })

    // 3. Email de confirmation au client
    await sendEmail(RESEND_KEY, { to: [OWNER_EMAIL], subject: `Confirmation devis — ${contact.firstName} ${contact.lastName}`, html: emailClient({ contact, quote, loanInfo }) })

    // 4. Tunnel de relance automatique (J+1, J+3, J+7)
    const delays = [
      { day: 1, hours: 24 },
      { day: 3, hours: 72 },
      { day: 7, hours: 168 },
    ]
    for (const { day, hours } of delays) {
      const scheduledAt = new Date(now.getTime() + hours * 60 * 60 * 1000).toISOString()
      const { subject, html } = emailFollowup({ contact, quote, loanInfo, day })
      await sendScheduled(RESEND_KEY, { to: [OWNER_EMAIL], subject: `[Relance J+${day}] ${subject}`, html, scheduledAt })
    }

    return { statusCode: 200, headers, body: JSON.stringify({ success: true, leadId }) }
  } catch (error) {
    console.error('Send lead error:', error)
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Erreur envoi' }) }
  }
}
