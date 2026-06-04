import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-lg font-bold text-[#0a1340] mb-3 pb-2 border-b border-slate-100">{title}</h2>
    <div className="text-slate-600 text-sm leading-relaxed space-y-2">{children}</div>
  </div>
)

export const CGU = () => (
  <div className="min-h-screen bg-slate-50">
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0a1340] mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
      </Link>

      <h1 className="text-3xl font-extrabold text-[#0a1340] mb-2">Conditions Générales d'Utilisation</h1>
      <p className="text-slate-400 text-sm mb-10">Dernière mise à jour : juin 2025</p>

      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <Section title="1. Objet">
          <p>Les présentes CGU régissent l'accès et l'utilisation du site assur-emprunt.fr, exploité par Assur-Emprunt, courtier en assurance immatriculé à l'ORIAS.</p>
          <p>En accédant au site, vous acceptez sans réserve les présentes conditions.</p>
        </Section>

        <Section title="2. Services proposés">
          <p>Assur-Emprunt propose :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Un simulateur de comparaison d'assurance emprunteur (à titre indicatif)</li>
            <li>Un service de courtage en assurance emprunteur</li>
            <li>Un conseil personnalisé par téléphone ou email</li>
            <li>La gestion des démarches de délégation d'assurance auprès des banques</li>
          </ul>
          <p>Les simulations présentées sont indicatives et sans valeur contractuelle. Seul le contrat d'assurance signé fait foi.</p>
        </Section>

        <Section title="3. Gratuité du service">
          <p>L'utilisation du simulateur et le conseil initial sont entièrement gratuits pour l'utilisateur.</p>
          <p>Assur-Emprunt perçoit une rémunération de la part des compagnies d'assurance partenaires sous forme de commissions, sans impact sur le tarif proposé à l'assuré.</p>
          <p>Des frais de dossier peuvent être facturés pour la gestion complète du dossier de délégation. Ces frais vous seront communiqués avant toute souscription.</p>
        </Section>

        <Section title="4. Obligations de l'utilisateur">
          <p>L'utilisateur s'engage à :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Fournir des informations exactes lors du remplissage du simulateur</li>
            <li>Ne pas utiliser le site à des fins frauduleuses</li>
            <li>Ne pas tenter de perturber le fonctionnement du site</li>
          </ul>
        </Section>

        <Section title="5. Protection des données">
          <p>Les données personnelles collectées sont traitées conformément au RGPD. Consultez notre <Link to="/politique-confidentialite" className="text-[#10b981] hover:underline">Politique de confidentialité</Link> pour en savoir plus.</p>
        </Section>

        <Section title="6. Propriété intellectuelle">
          <p>Tout le contenu du site est protégé. Toute reproduction sans autorisation est interdite.</p>
        </Section>

        <Section title="7. Droit applicable">
          <p>Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
        </Section>

        <Section title="8. Modification des CGU">
          <p>Assur-Emprunt se réserve le droit de modifier les présentes CGU à tout moment. Les modifications prennent effet dès leur publication sur le site.</p>
        </Section>
      </div>
    </div>
  </div>
)
