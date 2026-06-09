import Anthropic from '@anthropic-ai/sdk'

const PROMPTS = {
  cni: `Tu es un système d'extraction de données. Analyse cette carte nationale d'identité française et extrait uniquement les informations suivantes.
Réponds UNIQUEMENT avec un objet JSON valide, sans texte avant ou après.
Format attendu: {"date_naissance":"YYYY-MM-DD","prenom":"string","nom":"string"}
Si une information est illisible ou absente, mets null pour ce champ.`,

  pret: `Tu es un système d'extraction de données. Analyse ce document de prêt immobilier (offre de prêt, tableau d'amortissement, ou contrat) et extrait uniquement les informations suivantes.
Réponds UNIQUEMENT avec un objet JSON valide, sans texte avant ou après.
Format attendu: {"montant":number,"duree_annees":number,"taux_nominal":number}
- montant: capital emprunté total en euros (entier)
- duree_annees: durée totale du prêt en années (entier)
- taux_nominal: taux d'intérêt nominal en % (décimal, ex: 3.75)
Si une information est illisible ou absente, mets null pour ce champ.`,
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { imageBase64, mediaType, docType } = JSON.parse(event.body)

    if (!imageBase64 || !mediaType || !docType) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Paramètres manquants' }) }
    }

    if (!PROMPTS[docType]) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Type de document invalide' }) }
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: mediaType, data: imageBase64 },
          },
          { type: 'text', text: PROMPTS[docType] },
        ],
      }],
    })

    const raw = response.content[0].text.trim()

    // Extraire le JSON même si Claude ajoute du texte parasite
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Réponse Claude non parseable')

    const extracted = JSON.parse(jsonMatch[0])

    // Calculer l'âge à partir de la date de naissance (CNI)
    if (extracted.date_naissance) {
      const birth = new Date(extracted.date_naissance)
      if (!isNaN(birth)) {
        const today = new Date()
        let age = today.getFullYear() - birth.getFullYear()
        const m = today.getMonth() - birth.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
        extracted.age = age
      }
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, data: extracted }),
    }
  } catch (err) {
    console.error('extract-document error:', err)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Erreur lors de l\'analyse du document' }),
    }
  }
}
