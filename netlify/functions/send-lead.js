const OWNER_EMAIL = 'loricbenoit@gmail.com'

const PROFESSION_LABELS = {
  cadre: 'Cadre / Ingénieur', employe: 'Employé / Ouvrier',
  fonctionnaire: 'Fonctionnaire', liberal: 'Profession libérale',
  artisan: 'Artisan / Commerçant', autre: 'Autre',
}

const formatAmount = (n) =>
  Number(n).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

const buildOwnerEmail = ({ contact, quote, loanInfo, bankMonthly }) => `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><style>
  body { font-family: Inter, Arial, sans-serif; background: #f8fafc; margin: 0; padding: 20px; }
  .card { background: white; border-radius: 16px; padding: 32px; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; }
  .badge { display: inline-block; background: #dcfce7; color: #16a34a; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 999px; margin-bottom: 20px; }
  h1 { color: #0a1340; font-size: 22px; margin: 0 0 8px; }
  .subtitle { color: #64748b; font-size: 14px; margin: 0 0 28px; }
  .section { background: #f8fafc; border-radius: 12px; padding: 16px 20px; margin-bottom: 16px; }
  .section-title { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; }
  .row { display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid #f1f5f9; }
  .row:last-child { border-bottom: none; }
  .label { font-size: 13px; color: #64748b; }
  .value { font-size: 13px; font-weight: 600; color: #0a1340; }
  .highlight { background: #ecfdf5; border-radius: 12px; padding: 14px 18px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
  .saving { color: #16a34a; font-weight: 800; font-size: 18px; }
  .cta { background: #0f1f6b; color: white; display: block; text-align: center; padding: 14px; border-radius: 12px; font-weight: 700; font-size: 14px; text-decoration: none; margin-top: 24px; }
  .footer { text-align: center; color: #94a3b8; font-size: 11px; margin-top: 20px; }
</style></head>
<body>
<div class="card">
  <div class="badge">🔔 Nouveau lead</div>
  <h1>Nouvelle demande de devis</h1>
  <p class="subtitle">Reçue le ${new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} à ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>

  <div class="section">
    <div class="section-title">👤 Contact</div>
    <div class="row"><span class="label">Nom complet</span><span class="value">${contact.firstName} ${contact.lastName}</span></div>
    <div class="row"><span class="label">Email</span><span class="value">${contact.email}</span></div>
    <div class="row"><span class="label">Téléphone</span><span class="value">${contact.phone}</span></div>
  </div>

  <div class="section">
    <div class="section-title">🏠 Prêt immobilier</div>
    <div class="row"><span class="label">Montant emprunté</span><span class="value">${formatAmount(loanInfo.amount)}</span></div>
    <div class="row"><span class="label">Durée</span><span class="value">${loanInfo.duration} ans</span></div>
    <div class="row"><span class="label">Âge</span><span class="value">${loanInfo.age} ans</span></div>
    <div class="row"><span class="label">Profession</span><span class="value">${PROFESSION_LABELS[loanInfo.profession] || loanInfo.profession}</span></div>
    <div class="row"><span class="label">Tabac</span><span class="value">${loanInfo.smoker ? '🚬 Fumeur' : '🚭 Non-fumeur'}</span></div>
  </div>

  <div class="highlight">
    <div>
      <div style="font-size:12px;color:#64748b;margin-bottom:4px">Offre sélectionnée</div>
      <div style="font-weight:700;color:#0a1340;font-size:15px">${quote.insurer}</div>
    </div>
    <div style="text-align:right">
      <div style="font-size:22px;font-weight:800;color:#0a1340">${quote.monthly}€<span style="font-size:13px;font-weight:400;color:#94a3b8">/mois</span></div>
      <div class="saving">-${quote.savingsPct}% vs banque</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">💰 Comparatif</div>
    <div class="row"><span class="label">Assurance banque</span><span class="value">${bankMonthly}€/mois</span></div>
    <div class="row"><span class="label">Offre sélectionnée</span><span class="value">${quote.monthly}€/mois</span></div>
    <div class="row"><span class="label">Économies totales</span><span class="value" style="color:#16a34a">${Number(quote.savings).toLocaleString('fr-FR')}€ sur ${loanInfo.duration} ans</span></div>
  </div>

  <a href="mailto:${contact.email}" class="cta">📧 Répondre à ${contact.firstName}</a>
  <div class="footer">Assur-Emprunt · assur-emprunt.fr · Lead généré automatiquement</div>
</div>
</body>
</html>`

const buildClientEmail = ({ contact, quote, loanInfo }) => `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><style>
  body { font-family: Inter, Arial, sans-serif; background: #f8fafc; margin: 0; padding: 20px; }
  .card { background: white; border-radius: 16px; padding: 32px; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; }
  .header { background: linear-gradient(135deg, #0f1f6b, #0a1340); border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center; }
  .header h1 { color: white; margin: 0; font-size: 20px; }
  .header p { color: rgba(255,255,255,0.6); margin: 8px 0 0; font-size: 13px; }
  .section { background: #f8fafc; border-radius: 12px; padding: 16px 20px; margin-bottom: 16px; }
  .row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f1f5f9; }
  .row:last-child { border-bottom: none; }
  .label { font-size: 13px; color: #64748b; }
  .value { font-size: 13px; font-weight: 600; color: #0a1340; }
  .saving-box { background: #ecfdf5; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px 20px; margin-bottom: 16px; text-align: center; }
  .footer { text-align: center; color: #94a3b8; font-size: 11px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #f1f5f9; }
</style></head>
<body>
<div class="card">
  <div class="header">
    <h1>Bonjour ${contact.firstName} 👋</h1>
    <p>Votre demande de devis a bien été reçue</p>
  </div>

  <p style="color:#475569;font-size:14px;margin-bottom:24px">
    Merci pour votre confiance ! Un conseiller Assur-Emprunt vous contactera dans les <strong>24 heures</strong> pour finaliser votre dossier.
  </p>

  <div class="saving-box">
    <div style="font-size:13px;color:#16a34a;font-weight:600;margin-bottom:4px">Votre économie estimée</div>
    <div style="font-size:32px;font-weight:800;color:#0a1340">${Number(quote.savings).toLocaleString('fr-FR')}€</div>
    <div style="font-size:12px;color:#64748b">sur ${loanInfo.duration} ans avec ${quote.insurer}</div>
  </div>

  <div class="section">
    <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px">Récapitulatif de votre simulation</div>
    <div class="row"><span class="label">Montant emprunté</span><span class="value">${Number(loanInfo.amount).toLocaleString('fr-FR')}€</span></div>
    <div class="row"><span class="label">Durée</span><span class="value">${loanInfo.duration} ans</span></div>
    <div class="row"><span class="label">Offre retenue</span><span class="value">${quote.insurer}</span></div>
    <div class="row"><span class="label">Prime mensuelle</span><span class="value">${quote.monthly}€/mois</span></div>
  </div>

  <div class="footer">
    <strong>Assur-Emprunt</strong> · Courtier en assurance ORIAS<br/>
    assur-emprunt.fr · Ce message est confidentiel et destiné uniquement à son destinataire.
  </div>
</div>
</body>
</html>`

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }

  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }

  try {
    const payload = JSON.parse(event.body)
    const { contact, quote, loanInfo, bankMonthly } = payload

    const RESEND_API_KEY = process.env.RESEND_API_KEY

    // Envoi email au courtier
    const ownerRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Assur-Emprunt <onboarding@resend.dev>',
        to: [OWNER_EMAIL],
        subject: `🔔 Nouveau lead — ${contact.firstName} ${contact.lastName} · ${Number(loanInfo.amount).toLocaleString('fr-FR')}€`,
        html: buildOwnerEmail({ contact, quote, loanInfo, bankMonthly }),
      }),
    })

    if (!ownerRes.ok) {
      const err = await ownerRes.json()
      throw new Error(JSON.stringify(err))
    }

    // Envoi email de confirmation au client (uniquement si domaine vérifié, sinon on skippe)
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Assur-Emprunt <onboarding@resend.dev>',
        to: [OWNER_EMAIL], // redirigé vers toi en attendant la vérification du domaine
        subject: `Confirmation devis — ${contact.firstName} ${contact.lastName} (${contact.email})`,
        html: buildClientEmail({ contact, quote, loanInfo }),
      }),
    })

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) }

  } catch (error) {
    console.error('Send lead error:', error)
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Erreur envoi email' }) }
  }
}
