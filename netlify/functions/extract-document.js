import Anthropic from '@anthropic-ai/sdk'

const PROMPTS = {
  cni: `Tu es un système d'extraction de données. Analyse cette/ces image(s) de carte nationale d'identité française (recto et/ou verso) et extrait uniquement les informations suivantes en combinant les informations des deux faces si fournies.
Réponds UNIQUEMENT avec un objet JSON valide, sans texte avant ou après.
Format attendu: {"date_naissance":"YYYY-MM-DD","prenom":"string","nom":"string","sexe":"M ou F"}
Si une information est illisible ou absente, mets null pour ce champ.`,

  pret: `Tu es un système d'extraction de données. Analyse ce(s) document(s) (offre de prêt immobilier et/ou tableaux d'amortissement, pouvant être répartis sur plusieurs fichiers) et extrait les informations suivantes en les combinant.
Réponds UNIQUEMENT avec un objet JSON valide, sans texte avant ou après.
Format attendu:
{"montant":number,"taux_nominal":number,"type_taux":"Fixe ou Variable","duree_mois":number,"differe_mois":number,"nature":"Amortissable, In fine, Relais ou Prêt à taux zéro (PTZ)","objet_financement":"principal, secondaire ou locatif","paliers":[{"duree_mois":number,"montant":number}],"organisme_preteur":"string","agence_nom":"string","agence_code":"string","agence_adresse":"string","agence_code_postal":"string","agence_ville":"string"}
- montant : capital emprunté total en euros (entier)
- duree_mois : durée totale du prêt en mois
- differe_mois : durée du différé d'amortissement en mois (0 si absent)
- paliers : si le prêt comporte plusieurs phases avec des mensualités différentes (visible sur le tableau d'amortissement ou l'offre), liste chaque palier avec sa durée en mois et le montant de la mensualité correspondante. Tableau vide [] si un seul palier.
- objet_financement : déduis "principal", "secondaire" ou "locatif" si mentionné, sinon "principal" par défaut.
Si une information est illisible ou absente, mets null pour ce champ (sauf paliers : tableau vide []).`,
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const { imageBase64, mediaType, docType, images } = JSON.parse(event.body)

    // Accepte soit un tableau d'images (recto/verso), soit une seule image (compatibilité)
    const imageList = Array.isArray(images) && images.length > 0
      ? images
      : (imageBase64 && mediaType ? [{ imageBase64, mediaType }] : [])

    if (imageList.length === 0 || !docType) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Paramètres manquants' }) }
    }

    if (!PROMPTS[docType]) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Type de document invalide' }) }
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      messages: [{
        role: 'user',
        content: [
          ...imageList.map(img => img.mediaType === 'application/pdf'
            ? { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: img.imageBase64 } }
            : { type: 'image', source: { type: 'base64', media_type: img.mediaType, data: img.imageBase64 } }
          ),
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
