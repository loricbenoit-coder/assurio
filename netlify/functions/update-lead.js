import { getStore, connectLambda } from '@netlify/blobs'

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }
  connectLambda(event)

  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }

  // Vérification mot de passe admin
  const password = event.headers['x-admin-password']
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Non autorisé' }) }
  }

  try {
    const { leadId, status, notes } = JSON.parse(event.body)
    const store = getStore('leads', { consistency: 'strong' })
    const raw = await store.get(leadId)
    if (!raw) return { statusCode: 404, headers, body: JSON.stringify({ error: 'Lead introuvable' }) }

    const lead = JSON.parse(raw)
    if (status) lead.status = status
    if (notes !== undefined) lead.notes = notes
    lead.updatedAt = new Date().toISOString()

    await store.set(leadId, JSON.stringify(lead))
    return { statusCode: 200, headers, body: JSON.stringify({ success: true, lead }) }
  } catch (error) {
    console.error('Update lead error:', error)
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Erreur mise à jour' }) }
  }
}
