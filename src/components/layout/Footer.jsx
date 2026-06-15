import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'

const PHONE = '06 XX XX XX XX'

const LINKS = {
  Produit: [
    { label: 'Comparateur', href: '/#simulateur' },
    { label: "Délégation d'assurance", href: '/#comment-ca-marche' },
    { label: 'Comment ça marche', href: '/#comment-ca-marche' },
    { label: 'Nos avantages', href: '#avantages' },
  ],
  Contact: [
    { label: 'À propos', href: '/a-propos', isRoute: true },
    { label: 'Formulaire de contact', href: '/contact', isRoute: true },
    { label: 'Avis clients', href: '/#avis' },
    { label: 'Conseils', href: '/blog', isRoute: true },
    { label: 'Suivi de dossier', href: '/souscription', isRoute: true },
  ],
  Légal: [
    { label: 'Mentions légales', href: '/mentions-legales', isRoute: true },
    { label: 'CGU', href: '/cgu', isRoute: true },
    { label: 'Politique de confidentialité', href: '/politique-confidentialite', isRoute: true },
    { label: 'Cookies', href: '#' },
  ],
}

export const Footer = () => (
  <footer className="bg-white border-t border-slate-100 py-16">
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Logo dark withTagline className="mb-5" />
          <div className="space-y-2 mt-2">
            <a href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-sm font-semibold text-[#0a1340] hover:text-[#10b981] transition-colors">
              <Phone className="w-4 h-4 text-[#10b981]" /> {PHONE}
            </a>
            <a href="mailto:contact@assur-emprunteur.fr"
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-[#0a1340] transition-colors">
              <Mail className="w-4 h-4" /> contact@assur-emprunteur.fr
            </a>
          </div>
          <p className="text-xs text-slate-300 mt-4">ORIAS N° [À compléter]</p>
        </div>

        {/* Links */}
        {Object.entries(LINKS).map(([category, items]) => (
          <div key={category}>
            <h4 className="text-sm font-semibold text-[#0a1340] mb-4">{category}</h4>
            <ul className="space-y-3">
              {items.map(({ label, href, isRoute }) => (
                <li key={label}>
                  {isRoute
                    ? <Link to={href} className="text-sm text-slate-400 hover:text-[#0a1340] transition-colors">{label}</Link>
                    : <a href={href} className="text-sm text-slate-400 hover:text-[#0a1340] transition-colors">{label}</a>
                  }
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <span>© 2025 Assur Emprunteur. Tous droits réservés.</span>
        <span>Courtier en assurance enregistré à l'ORIAS — Lun–Ven 9h–18h</span>
      </div>
    </div>
  </footer>
)
