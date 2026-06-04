import { getStore } from '@netlify/blobs'

export const handler = async (event, context) => {
  const headers = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }

  // Vérification du mot de passe admin
  const password = event.headers['x-admin-password']
  if (password !== process.env.ADMIN_PASSWORD) {
    return { statusCode: 401, headers, body: JSON.stringify({ error: 'Non autorisé' }) }
  }

  try {
    const store = getStore({ name: 'leads', siteID: context.site?.id || process.env.SITE_ID, token: process.env.NETLIFY_BLOBS_TOKEN || context.token })
    const { blobs } = await store.list()

    const leads = await Promise.all(
      blobs.map(async ({ key }) => {
        const raw = await store.get(key)
        return raw ? JSON.parse(raw) : null
      })
    )

    const sorted = leads.filter(Boolean).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    return { statusCode: 200, headers, body: JSON.stringify({ leads: sorted }) }
  } catch (error) {
    console.error('Get leads error:', error)
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Erreur lecture leads' }) }
  }
}
