import React from 'react'
import { Logo } from '@/components/ui/Logo'

const LINKS = {
  Produit: ['Comparateur', "Délégation d'assurance", "Rachat de prêt", 'Simulation'],
  Entreprise: ['À propos', 'Blog', 'Presse', 'Carrières'],
  Légal: ['Mentions légales', 'CGU', 'Politique de confidentialité', 'Cookies'],
}

export const Footer = () => (
  <footer className="bg-white border-t border-slate-100 py-16">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Logo dark className="mb-4" />
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs mt-4">
            Le comparateur d&apos;assurance emprunteur qui vous fait vraiment économiser.
          </p>
          <div className="mt-4 text-xs text-slate-300">
            ORIAS N° 24001234
          </div>
        </div>

        {/* Links */}
        {Object.entries(LINKS).map(([category, items]) => (
          <div key={category}>
            <h4 className="text-sm font-semibold text-[#0a1340] mb-4">{category}</h4>
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-400 hover:text-[#0a1340] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
        <span>© 2024 Assur-Emprunt. Tous droits réservés.</span>
        <span>Courtier en assurance enregistré à l&apos;ORIAS</span>
      </div>
    </div>
  </footer>
)
