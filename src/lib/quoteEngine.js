/**
 * Moteur de calcul de devis assurance emprunteur
 * Données mock réalistes — à remplacer par l'API Kereis
 */

const BASE_RATES = [
  {
    insurer: 'APRIL Santé Prévoyance',
    color: '#E3000F',
    baseRate: 0.18,
    availableGuarantees: ['DC', 'PTIA', 'ITT', 'IPT', 'IPP'],
    delay: 90,
    badge: 'Meilleur rapport qualité/prix',
    badgeColor: 'emerald',
  },
  {
    insurer: 'SwissLife Assurance',
    color: '#003A5C',
    baseRate: 0.21,
    availableGuarantees: ['DC', 'PTIA', 'ITT', 'IPT', 'IPP', 'PE'],
    delay: 90,
    badge: 'Couverture maximale',
    badgeColor: 'blue',
  },
  {
    insurer: 'Malakoff Humanis',
    color: '#00205B',
    baseRate: 0.20,
    availableGuarantees: ['DC', 'PTIA', 'ITT', 'IPT'],
    delay: 60,
    badge: null,
    badgeColor: null,
  },
  {
    insurer: 'Generali Assurances',
    color: '#C4161C',
    baseRate: 0.22,
    availableGuarantees: ['DC', 'PTIA', 'ITT', 'IPT', 'IPP', 'PE'],
    delay: 180,
    badge: null,
    badgeColor: null,
  },
  {
    insurer: 'AXA Banque Prévoyance',
    color: '#00008F',
    baseRate: 0.24,
    availableGuarantees: ['DC', 'PTIA', 'ITT', 'IPT'],
    delay: 90,
    badge: null,
    badgeColor: null,
  },
]

const BANK_RATE = 0.36

/* ─── Multiplicateurs profil ──────────────────────────────────── */

const getAgeMultiplier = (age) => {
  if (age < 30) return 0.75
  if (age < 35) return 0.85
  if (age < 40) return 1.0
  if (age < 45) return 1.25
  if (age < 50) return 1.55
  if (age < 55) return 2.0
  return 2.6
}

const getSmokerMultiplier     = (smoker)     => smoker ? 1.5 : 1.0
const getProfessionMultiplier = (profession) => ({
  cadre: 1.0, employe: 1.05, artisan: 1.15, liberal: 1.1, fonctionnaire: 0.95, autre: 1.1,
}[profession] || 1.0)

const getRiskMultiplier = (riskSport, riskProfession) => {
  let m = 1.0
  if (riskSport)      m *= 1.25
  if (riskProfession) m *= 1.15
  return m
}

/** Multiplicateur global de profil pour un emprunteur donné */
const getBorrowerMultiplier = (b) =>
  getAgeMultiplier(Number(b.age)) * getSmokerMultiplier(b.smoker) * getProfessionMultiplier(b.profession) * getRiskMultiplier(b.riskSport, b.riskProfession)

/* ─── Multiplicateurs garanties / projet ─────────────────────── */

// Surcoût relatif de chaque garantie optionnelle
const GUARANTEE_RATE_ADDON = {
  DC:   0,    // obligatoire, inclus dans baseRate
  PTIA: 0,    // obligatoire, inclus dans baseRate
  ITT:  0.18,
  IPT:  0.10,
  IPP:  0.07,
  PE:   0.12,
}

const getProjectMultiplier = (projectType) => ({
  principal:  1.0,
  secondaire: 1.05,
  locatif:    0.88, // ITT généralement non requise
}[projectType] || 1.0)

const getGuaranteeAddon = (selectedGuarantees, baseRate) =>
  selectedGuarantees.reduce((acc, g) => acc + (GUARANTEE_RATE_ADDON[g] || 0) * baseRate, 0)

/* ─── Calcul de la prime mensuelle ───────────────────────────── */

const computeMonthlyPremium = (capital, duration, rate) =>
  (capital * (rate / 100) * duration) / (duration * 12)

/* ─── Export principal ───────────────────────────────────────── */

/**
 * @param {number} amount - capital emprunté total
 * @param {number} duration - durée en années
 * @param {Array} borrowers - [{age, smoker, profession, riskSport, riskProfession, quotite}]
 * @param {string} projectType - 'principal' | 'secondaire' | 'locatif'
 * @param {Array} selectedGuarantees - garanties souhaitées
 */
export const computeQuotes = ({
  amount, duration,
  borrowers = [{ age: 35, smoker: false, profession: 'cadre', riskSport: false, riskProfession: false, quotite: 100 }],
  projectType = 'principal',
  selectedGuarantees = ['DC', 'PTIA', 'ITT', 'IPT'],
}) => {
  const projectM = getProjectMultiplier(projectType)
  const totalQuotite = borrowers.reduce((s, b) => s + Number(b.quotite || 0), 0) || 100

  // Coût assurance banque (référence — pas de personnalisation des garanties)
  let bankMonthly = 0
  borrowers.forEach((b) => {
    const capitalShare = amount * (Number(b.quotite) / 100)
    bankMonthly += computeMonthlyPremium(capitalShare, duration, BANK_RATE * getBorrowerMultiplier(b) * projectM)
  })
  const bankTotal = Math.round(bankMonthly * duration * 12)

  const quotes = BASE_RATES.map((offer) => {
    const coveredGuarantees = selectedGuarantees.filter(g => offer.availableGuarantees.includes(g))
    const missingGuarantees = selectedGuarantees.filter(g => !offer.availableGuarantees.includes(g))
    const guaranteeAddon = getGuaranteeAddon(coveredGuarantees, offer.baseRate)

    let monthly = 0
    let weightedMultiplier = 0
    borrowers.forEach((b) => {
      const capitalShare = amount * (Number(b.quotite) / 100)
      const borrowerM = getBorrowerMultiplier(b)
      const adjustedRate = (offer.baseRate + guaranteeAddon) * borrowerM * projectM
      monthly += computeMonthlyPremium(capitalShare, duration, adjustedRate)
      weightedMultiplier += borrowerM * (Number(b.quotite) / totalQuotite)
    })
    monthly = Math.round(monthly * 100) / 100

    const total      = Math.round(monthly * duration * 12)
    const savings    = bankTotal - total
    const savingsPct = Math.round((savings / bankTotal) * 100)
    const taea       = ((offer.baseRate + guaranteeAddon) * weightedMultiplier * projectM).toFixed(3)

    return {
      ...offer,
      guarantees: coveredGuarantees,
      missingGuarantees,
      monthly: monthly.toFixed(2),
      total,
      savings,
      savingsPct,
      taea,
    }
  })
  // Trier par prix croissant, pénaliser les offres avec garanties manquantes
  .sort((a, b) => {
    const penaltyA = a.missingGuarantees.length * 1000
    const penaltyB = b.missingGuarantees.length * 1000
    return (parseFloat(a.monthly) + penaltyA) - (parseFloat(b.monthly) + penaltyB)
  })

  return { quotes, bankMonthly: bankMonthly.toFixed(2), bankTotal }
}
