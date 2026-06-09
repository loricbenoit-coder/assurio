import { getStore, connectLambda } from '@netlify/blobs'

export const handler = async (event) => {
  connectLambda(event)
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }

  // 1. Vérification mot de passe
  const password = event.headers['x-admin-password']
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Non autorisé' }) }
  }

  // 2. Lecture des leads (avec gestion d'erreur si Blobs pas encore initialisé)
  try {
    const store = getStore('leads', { consistency: 'strong' })
    const { blobs } = await store.list()

    const leads = await Promise.all(
      blobs.map(async ({ key }) => {
        try {
          const raw = await store.get(key)
          return raw ? JSON.parse(raw) : null
        } catch { return null }
      })
    )

    const sorted = leads
      .filter(Boolean)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ leads: sorted }),
    }
  } catch (error) {
    // Blobs pas encore disponible — retourne tableau vide
    console.error('Blobs error:', error.message)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ leads: [], info: 'Aucun lead pour le moment' }),
    }
  }
}
