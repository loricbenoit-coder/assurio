import React from 'react'
import { Shield } from 'lucide-react'

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
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#0f1f6b] flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#10b981]" />
            </div>
            <span className="text-xl font-bold text-[#0a1340]">Assurio</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
            Le comparateur d'assurance emprunteur qui vous fait vraiment économiser.
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
        <span>© 2024 Assurio. Tous droits réservés.</span>
        <span>Courtier en assurance enregistré à l'ORIAS</span>
      </div>
    </div>
  </footer>
)
