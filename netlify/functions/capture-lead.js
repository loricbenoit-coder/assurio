const OWNER_EMAIL = 'loricbenoit@gmail.com'

const sendEmail = async (key, { to, subject, html }) => {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'Assur Emprunteur <onboarding@resend.dev>', to, subject, html }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Resend error ${res.status}: ${text}`)
  }
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }

  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }

  try {
    const { prenom, nom, email, tel, dateNaissance } = JSON.parse(event.body)
    const RESEND_KEY = process.env.RESEND_API_KEY

    if (!RESEND_KEY) throw new Error('RESEND_API_KEY manquant')
    if (!email) return { statusCode: 400, headers, body: JSON.stringify({ error: 'Email requis' }) }

    const now = new Date()
    const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

    const html = `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><style>
body{font-family:Inter,Arial,sans-serif;background:#f8fafc;margin:0;padding:20px}
.card{background:white;border-radius:16px;padding:28px;max-width:480px;margin:0 auto;border:1px solid #e2e8f0}
.badge{display:inline-block;background:#fef9c3;color:#ca8a04;font-size:12px;font-weight:700;padding:4px 12px;border-radius:999px;margin-bottom:16px}
h2{color:#0a1340;font-size:18px;margin:0 0 16px}
.row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f1f5f9}
.row:last-child{border-bottom:none}
.label{font-size:13px;color:#64748b}.value{font-size:13px;font-weight:600;color:#0a1340}
.cta{background:#10b981;color:white;display:block;text-align:center;padding:12px;border-radius:10px;font-weight:700;font-size:14px;text-decoration:none;margin-top:20px}
</style></head><body><div class="card">
<div class="badge">🎯 Nouveau prospect</div>
<h2>Un visiteur a renseigné ses coordonnées</h2>
<p style="color:#64748b;font-size:13px;margin:0 0 20px">Aujourd'hui à ${timeStr} — dossier en cours de remplissage</p>
<div class="row"><span class="label">Nom</span><span class="value">${prenom || ''} ${nom || ''}</span></div>
<div class="row"><span class="label">Email</span><span class="value">${email}</span></div>
<div class="row"><span class="label">Téléphone</span><span class="value">${tel || '—'}</span></div>
${dateNaissance ? `<div class="row"><span class="label">Naissance</span><span class="value">${dateNaissance.split('-').reverse().join('/')}</span></div>` : ''}
<a href="mailto:${email}" class="cta">📧 Contacter ${prenom || 'le prospect'}</a>
</div></body></html>`

    await sendEmail(RESEND_KEY, {
      to: [OWNER_EMAIL],
      subject: `🎯 Nouveau prospect — ${prenom || ''} ${nom || ''} (${email})`,
      html,
    })

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) }
  } catch (err) {
    console.error('capture-lead error:', err)
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Erreur capture lead' }) }
  }
}
