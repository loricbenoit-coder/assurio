/**
 * Système de tracking affilié
 * Lit le paramètre ?ref= dans l'URL et le persiste en sessionStorage
 * Exemple : assur-emprunteur.fr?ref=kevin-immo
 */

const STORAGE_KEY = 'ae_referral'

export const initReferral = () => {
  const params = new URLSearchParams(window.location.search)
  const ref = params.get('ref')
  if (ref) {
    sessionStorage.setItem(STORAGE_KEY, ref.toLowerCase().trim())
  }
}

export const getReferral = () => sessionStorage.getItem(STORAGE_KEY) || null

export const clearReferral = () => sessionStorage.removeItem(STORAGE_KEY)
