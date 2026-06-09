import { getStore, connectLambda } from '@netlify/blobs'

// Permet au visiteur de mettre à jour l'offre choisie sur son lead déjà enregistré
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }
  connectLambda(event)
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }

  try {
    const { leadId, quote } = JSON.parse(event.body)
    if (!leadId || !quote) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Paramètres manquants' }) }
    }

    const store = getStore('leads')
    const raw = await store.get(leadId)
    if (!raw) return { statusCode: 404, headers, body: JSON.stringify({ error: 'Lead introuvable' }) }

    const lead = JSON.parse(raw)
    lead.quote = quote
    lead.updatedAt = new Date().toISOString()

    await store.set(leadId, JSON.stringify(lead))
    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) }
  } catch (error) {
    console.error('Select quote error:', error)
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Erreur mise à jour' }) }
  }
}
