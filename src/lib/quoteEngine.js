/**
 * Moteur de calcul de devis assurance emprunteur
 * Données mock réalistes — à remplacer par l'API Kereis
 *
 * Taux de référence (TAEA annuel en ‰ du capital)
 * Source : moyennes marché 2024
 */

const BASE_RATES = [
  {
    insurer: 'APRIL Santé Prévoyance',
    logo: 'APRIL',
    color: '#E3000F',
    baseRate: 0.18,
    guarantees: ['DC', 'PTIA', 'ITT', 'IPT'],
    delay: 90,
    badge: 'Meilleur rapport qualité/prix',
    badgeColor: 'emerald',
  },
  {
    insurer: 'SwissLife Assurance',
    logo: 'SwissLife',
    color: '#003A5C',
    baseRate: 0.21,
    guarantees: ['DC', 'PTIA', 'ITT', 'IPT', 'IPP'],
    delay: 90,
    badge: 'Couverture maximale',
    badgeColor: 'blue',
  },
  {
    insurer: 'Malakoff Humanis',
    logo: 'Malakoff',
    color: '#00205B',
    baseRate: 0.20,
    guarantees: ['DC', 'PTIA', 'ITT', 'IPT'],
    delay: 60,
    badge: null,
    badgeColor: null,
  },
  {
    insurer: 'Generali Assurances',
    logo: 'Generali',
    color: '#C4161C',
    baseRate: 0.22,
    guarantees: ['DC', 'PTIA', 'ITT', 'IPT', 'IPP', 'PE'],
    delay: 180,
    badge: null,
    badgeColor: null,
  },
  {
    insurer: 'AXA Banque Prévoyance',
    logo: 'AXA',
    color: '#00008F',
    baseRate: 0.24,
    guarantees: ['DC', 'PTIA', 'ITT', 'IPT'],
    delay: 90,
    badge: null,
    badgeColor: null,
  },
]

const BANK_RATE = 0.36 // Taux moyen assurance bancaire groupe

const getAgeMultiplier = (age) => {
  if (age < 30) return 0.75
  if (age < 35) return 0.85
  if (age < 40) return 1.0
  if (age < 45) return 1.25
  if (age < 50) return 1.55
  if (age < 55) return 2.0
  return 2.6
}

const getSmokerMultiplier = (smoker) => (smoker ? 1.5 : 1.0)

const getProfessionMultiplier = (profession) => {
  const map = {
    cadre: 1.0,
    employe: 1.05,
    artisan: 1.15,
    liberal: 1.1,
    fonctionnaire: 0.95,
    autre: 1.1,
  }
  return map[profession] || 1.0
}

/**
 * Calcule le coût mensuel d'une assurance emprunteur
 * @param {number} capital - Montant emprunté en €
 * @param {number} duration - Durée en années
 * @param {number} rate - Taux annuel en ‰ du capital initial
 */
const computeMonthlyPremium = (capital, duration, rate) =>
  Math.round((capital * (rate / 100) * duration) / (duration * 12) * 100) / 100

export const computeQuotes = ({ amount, duration, age, smoker, profession }) => {
  const ageM = getAgeMultiplier(age)
  const smokerM = getSmokerMultiplier(smoker)
  const profM = getProfessionMultiplier(profession)
  const totalMultiplier = ageM * smokerM * profM

  // Coût assurance banque (référence)
  const bankMonthly = computeMonthlyPremium(amount, duration, BANK_RATE * totalMultiplier)
  const bankTotal = Math.round(bankMonthly * duration * 12)

  const quotes = BASE_RATES.map((offer) => {
    const adjustedRate = offer.baseRate * totalMultiplier
    const monthly = computeMonthlyPremium(amount, duration, adjustedRate)
    const total = Math.round(monthly * duration * 12)
    const savings = bankTotal - total
    const savingsPct = Math.round((savings / bankTotal) * 100)

    return {
      ...offer,
      monthly: monthly.toFixed(2),
      total,
      savings,
      savingsPct,
      taea: (adjustedRate * totalMultiplier).toFixed(3),
    }
  }).sort((a, b) => parseFloat(a.monthly) - parseFloat(b.monthly))

  return { quotes, bankMonthly: bankMonthly.toFixed(2), bankTotal }
}
