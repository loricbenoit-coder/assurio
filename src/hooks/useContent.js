/**
 * Hook simple pour charger le contenu JSON.
 * En production : lecture statique.
 * Le Netlify Visual Editor injecte ses propres annotations via data-sb-field-path.
 */
import heroData from '../../content/hero.json'
import settingsData from '../../content/settings.json'

export const useHeroContent = () => heroData
export const useSiteSettings = () => settingsData
