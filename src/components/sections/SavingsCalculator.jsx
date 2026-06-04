import React, { useState, useMemo } from 'react'
import { TrendingDown, ArrowRight, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/Button'

/* ─── Constantes marché ─────────────────────────────────────── */
const BANK_RATE   = 0.36   // Taux moyen assurance bancaire groupe (%)
const MARKET_RATE = 0.18   // Taux moyen meilleur courtier (%)

const formatEuro = (n) =>
  Math.round(n).toLocaleString('fr-FR') + '€'

/* ─── Calcul principal ──────────────────────────────────────── */
const compute = (amount, years, age) => {
  const ageM = age < 35 ? 0.8 : age < 45 ? 1.0 : age < 55 ? 1.5 : 2.1

  const bankMonthly   = (amount * BANK_RATE   / 100 * ageM * years) / (years * 12)
  const marketMonthly = (amount * MARKET_RATE / 100 * ageM * years) / (years * 12)
  const savingMonthly = bankMonthly - marketMonthly

  const milestones = [1, 2, 5, 10, years].filter((y, i, a) => y <= years && a.indexOf(y) === i)

  return {
    bankMonthly:   Math.round(bankMonthly   * 100) / 100,
    marketMonthly: Math.round(marketMonthly * 100) / 100,
    savingMonthly: Math.round(savingMonthly * 100) / 100,
    totalBank:     Math.round(bankMonthly   * years * 12),
    totalMarket:   Math.round(marketMonthly * years * 12),
    totalSaving:   Math.round(savingMonthly * years * 12),
    savingPct:     Math.round((savingMonthly / bankMonthly) * 100),
    milestones: milestones.map((y) => ({
      years: y,
      label: y === 1 ? '1 an' : `${y} ans`,
      saving: Math.round(savingMonthly * y * 12),
    })),
  }
}

/* ─── Slider personnalisé ───────────────────────────────────── */
const Slider = ({ label, value, min, max, step = 1, format, onChange }) => {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-semibold text-[#0a1340]">{label}</label>
        <span className="text-base font-extrabold text-[#0f1f6b]">{format(value)}</span>
      </div>
      <div className="relative h-2 bg-slate-200 rounded-full">
        <div
          className="absolute top-0 left-0 h-2 rounded-full"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(to right, #0f1f6b, #10b981)',
          }}
        />
        <input
          type="range"
          min={min} max={max} step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
          style={{ zIndex: 2 }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-[#0f1f6b] rounded-full shadow-md pointer-events-none"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-400 mt-1.5">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  )
}

/* ─── Barre de comparaison ──────────────────────────────────── */
const CompareBar = ({ label, value, max, color, bg }) => {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-slate-500 font-medium">{label}</span>
        <span className="font-bold text-[#0a1340]">{formatEuro(value)}</span>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ background: bg }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  )
}

/* ─── Composant principal ───────────────────────────────────── */
export const SavingsCalculator = () => {
  const [amount, setAmount] = useState(250000)
  const [years,  setYears]  = useState(20)
  const [age,    setAge]    = useState(35)

  const result = useMemo(() => compute(amount, years, age), [amount, years, age])

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold text-[#10b981] uppercase tracking-widest mb-4">
            Calculateur d'économies
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a1340] mb-4 tracking-tight">
            Combien allez-vous économiser ?
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Ajustez les curseurs et découvrez vos économies potentielles en temps réel.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* ── Sliders ── */}
          <div className="bg-slate-50 rounded-3xl p-7 border border-slate-200">
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-[#0f1f6b]" />
              <span className="font-bold text-[#0a1340]">Votre situation</span>
            </div>

            <Slider
              label="Montant emprunté"
              value={amount}
              min={50000}
              max={800000}
              step={10000}
              format={(v) => `${(v / 1000).toFixed(0)} 000€`}
              onChange={setAmount}
            />
            <Slider
              label="Durée du prêt"
              value={years}
              min={5}
              max={30}
              step={1}
              format={(v) => `${v} ans`}
              onChange={setYears}
            />
            <Slider
              label="Votre âge"
              value={age}
              min={20}
              max={65}
              step={1}
              format={(v) => `${v} ans`}
              onChange={setAge}
            />

            {/* Résumé mensuel */}
            <div className="mt-2 pt-5 border-t border-slate-200 grid grid-cols-2 gap-4">
              <div className="bg-red-50 rounded-2xl p-4 text-center">
                <div className="text-xs text-slate-500 mb-1">Assurance banque</div>
                <div className="text-xl font-extrabold text-slate-700">{result.bankMonthly}€</div>
                <div className="text-xs text-slate-400">par mois</div>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-4 text-center">
                <div className="text-xs text-slate-500 mb-1">Avec Assur-Emprunt</div>
                <div className="text-xl font-extrabold text-[#10b981]">{result.marketMonthly}€</div>
                <div className="text-xs text-slate-400">par mois</div>
              </div>
            </div>
          </div>

          {/* ── Résultats ── */}
          <div className="flex flex-col gap-5">

            {/* Économie totale — hero number */}
            <div
              className="rounded-3xl p-7 text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0f1f6b, #0a1340)' }}
            >
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10"
                style={{ background: 'radial-gradient(circle, #10b981, transparent)' }}
              />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingDown className="w-5 h-5 text-[#10b981]" />
                  <span className="text-white/70 text-sm font-medium">Économie totale sur {years} ans</span>
                </div>
                <div className="text-5xl font-extrabold text-white mb-1">
                  {formatEuro(result.totalSaving)}
                </div>
                <div className="text-[#10b981] font-semibold">
                  soit -{result.savingPct}% par rapport à votre banque
                </div>
                <div className="mt-4 text-white/50 text-sm">
                  {formatEuro(result.savingMonthly)} économisés chaque mois
                </div>
              </div>
            </div>

            {/* Jalons temporels */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
              <p className="text-sm font-bold text-[#0a1340] mb-4">Économies cumulées dans le temps</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {result.milestones.map(({ label, saving }) => (
                  <div key={label} className="bg-white rounded-2xl p-3 text-center border border-slate-100 shadow-sm">
                    <div className="text-xs text-slate-400 mb-1">Dans {label}</div>
                    <div className="font-extrabold text-[#0a1340] text-sm">{formatEuro(saving)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparatif barres */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
              <p className="text-sm font-bold text-[#0a1340] mb-5">Coût total sur {years} ans</p>
              <CompareBar
                label="🏦 Assurance de votre banque"
                value={result.totalBank}
                max={result.totalBank}
                color="#ef4444"
                bg="#fee2e2"
              />
              <CompareBar
                label="✅ Avec Assur-Emprunt"
                value={result.totalMarket}
                max={result.totalBank}
                color="#10b981"
                bg="#d1fae5"
              />
              <div className="mt-4 flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3">
                <span className="text-sm font-semibold text-emerald-700">Vous économisez</span>
                <span className="text-lg font-extrabold text-emerald-700">{formatEuro(result.totalSaving)}</span>
              </div>
            </div>

            {/* CTA */}
            <a href="#simulateur">
              <Button size="lg" className="w-full group">
                Obtenir mon vrai devis personnalisé
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
