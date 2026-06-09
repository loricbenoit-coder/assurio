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

const getSmokerMultiplier    = (smoker)     => smoker ? 1.5 : 1.0
const getProfessionMultiplier = (profession) => ({
  cadre: 1.0, employe: 1.05, artisan: 1.15, liberal: 1.1, fonctionnaire: 0.95, autre: 1.1,
}[profession] || 1.0)

/* ─── Multiplicateurs garanties ──────────────────────────────── */

// Surcoût relatif de chaque garantie optionnelle
const GUARANTEE_RATE_ADDON = {
  DC:   0,      // obligatoire, inclus dans baseRate
  PTIA: 0,      // obligatoire, inclus dans baseRate
  ITT:  0.18,   // +18% du taux de base
  IPT:  0.10,
  IPP:  0.07,
  PE:   0.12,
}

// Multiplicateur selon le type de projet
const getProjectMultiplier = (projectType) => ({
  principal:  1.0,
  secondaire: 1.05,
  locatif:    0.88, // pas d'ITT requise généralement
}[projectType] || 1.0)

// Multiplicateur selon la quotité (pourcentage du capital assuré)
const getQuotiteMultiplier = (quotite) => ({
  100: 1.0,
  75:  0.75,
  50:  0.50,
  duo: 2.0,  // couple 100%+100% = 2× le capital
}[quotite] || 1.0)

// Risques supplémentaires
const getRiskMultiplier = (riskSport, riskProfession) => {
  let m = 1.0
  if (riskSport)       m *= 1.25
  if (riskProfession)  m *= 1.15
  return m
}

/* ─── Calcul de la prime mensuelle ───────────────────────────── */

const computeMonthlyPremium = (capital, duration, rate) =>
  Math.round((capital * (rate / 100) * duration) / (duration * 12) * 100) / 100

/* ─── Taux ajusté selon les garanties choisies ───────────────── */

const getGuaranteeAddon = (selectedGuarantees, baseRate) =>
  selectedGuarantees.reduce((acc, g) => acc + (GUARANTEE_RATE_ADDON[g] || 0) * baseRate, 0)

/* ─── Export principal ───────────────────────────────────────── */

export const computeQuotes = ({
  amount, duration, age, smoker, profession,
  projectType = 'principal',
  quotite = 100,
  selectedGuarantees = ['DC', 'PTIA', 'ITT', 'IPT'],
  riskSport = false,
  riskProfession = false,
}) => {
  const ageM      = getAgeMultiplier(age)
  const smokerM   = getSmokerMultiplier(smoker)
  const profM     = getProfessionMultiplier(profession)
  const projectM  = getProjectMultiplier(projectType)
  const quotiteM  = getQuotiteMultiplier(quotite)
  const riskM     = getRiskMultiplier(riskSport, riskProfession)

  const profileMultiplier = ageM * smokerM * profM * riskM

  // Coût assurance banque (référence — pas de personnalisation des garanties)
  const bankMonthly = computeMonthlyPremium(amount, duration, BANK_RATE * profileMultiplier * quotiteM * projectM)
  const bankTotal   = Math.round(bankMonthly * duration * 12)

  const quotes = BASE_RATES.map((offer) => {
    // Garanties réellement offertes = intersection de ce que l'assuré veut et ce que l'assureur propose
    const coveredGuarantees = selectedGuarantees.filter(g => offer.availableGuarantees.includes(g))
    const missingGuarantees = selectedGuarantees.filter(g => !offer.availableGuarantees.includes(g))

    const guaranteeAddon  = getGuaranteeAddon(coveredGuarantees, offer.baseRate)
    const adjustedRate    = (offer.baseRate + guaranteeAddon) * profileMultiplier * projectM
    const monthly         = computeMonthlyPremium(amount, duration, adjustedRate * quotiteM)
    const total           = Math.round(monthly * duration * 12)
    const savings         = bankTotal - total
    const savingsPct      = Math.round((savings / bankTotal) * 100)
    const taea            = (adjustedRate * quotiteM).toFixed(3)

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
