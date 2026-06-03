/**
 * Netlify Function — Intégration API Kereis Solutions
 *
 * État : MOCK actif (pas encore de credentials Kereis)
 * Pour activer la vraie API :
 *  1. Ajouter KEREIS_API_KEY et KEREIS_API_URL dans Netlify > Environment variables
 *  2. Remplacer la fonction getMockQuotes() par l'appel réel getKereisQuotes()
 *  3. Adapter le mapping de la réponse selon la doc Kereis
 */

// ─── Appel réel Kereis (à décommenter quand tu as les credentials) ────────────
/*
const getKereisQuotes = async (params) => {
  const res = await fetch(`${process.env.KEREIS_API_URL}/devis/emprunteur`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.KEREIS_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      montantPret: params.amount,
      dureePret: params.duration,
      dateNaissance: params.birthDate,
      fumeur: params.smoker,
      profession: params.profession,
    }),
  })
  if (!res.ok) throw new Error('Kereis API error')
  const data = await res.json()
  // Adapter le mapping selon la doc Kereis
  return data.produits.map(p => ({
    insurer: p.nomCompagnie,
    monthly: p.primeHT,
    total: p.coutTotal,
    guarantees: p.garanties,
    taea: p.taea,
    savings: null,
    savingsPct: null,
  }))
}
*/

// ─── Mock (données de marché réalistes en attendant Kereis) ──────────────────
const getMockQuotes = (params) => {
  const { amount, duration, age, smoker } = params
  const ageM = age < 35 ? 0.8 : age < 45 ? 1.0 : age < 55 ? 1.5 : 2.2
  const smokerM = smoker ? 1.5 : 1.0

  const offers = [
    { insurer: 'APRIL Santé Prévoyance', rate: 0.18, color: '#E3000F', guarantees: ['DC', 'PTIA', 'ITT', 'IPT'] },
    { insurer: 'SwissLife Assurance', rate: 0.21, color: '#003A5C', guarantees: ['DC', 'PTIA', 'ITT', 'IPT', 'IPP'] },
    { insurer: 'Malakoff Humanis', rate: 0.20, color: '#00205B', guarantees: ['DC', 'PTIA', 'ITT', 'IPT'] },
    { insurer: 'Generali Assurances', rate: 0.22, color: '#C4161C', guarantees: ['DC', 'PTIA', 'ITT', 'IPT', 'IPP', 'PE'] },
    { insurer: 'AXA Banque Prévoyance', rate: 0.24, color: '#00008F', guarantees: ['DC', 'PTIA', 'ITT', 'IPT'] },
  ]

  const bankTotal = Math.round(amount * 0.36 / 100 * ageM * smokerM * duration)

  return offers.map(o => {
    const monthly = Math.round(amount * o.rate / 100 * ageM * smokerM * duration / (duration * 12) * 100) / 100
    const total = Math.round(monthly * duration * 12)
    return { ...o, monthly: monthly.toFixed(2), total, savings: bankTotal - total, savingsPct: Math.round((bankTotal - total) / bankTotal * 100) }
  }).sort((a, b) => parseFloat(a.monthly) - parseFloat(b.monthly))
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }

  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }

  try {
    const params = JSON.parse(event.body)
    const isKereisReady = process.env.KEREIS_API_KEY && process.env.KEREIS_API_URL

    const quotes = isKereisReady
      ? await getKereisQuotes(params)   // vraie API Kereis
      : getMockQuotes(params)            // mock en attendant

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ quotes, source: isKereisReady ? 'kereis' : 'mock' }),
    }
  } catch (error) {
    console.error('Kereis quote error:', error)
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Erreur calcul devis' }) }
  }
}
