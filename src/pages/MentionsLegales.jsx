import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-lg font-bold text-[#0a1340] mb-3 pb-2 border-b border-slate-100">{title}</h2>
    <div className="text-slate-600 text-sm leading-relaxed space-y-2">{children}</div>
  </div>
)

export const MentionsLegales = () => (
  <div className="min-h-screen bg-slate-50">
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0a1340] mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
      </Link>

      <h1 className="text-3xl font-extrabold text-[#0a1340] mb-2">Mentions légales</h1>
      <p className="text-slate-400 text-sm mb-10">Dernière mise à jour : juin 2025</p>

      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <Section title="1. Éditeur du site">
          <p><strong>Dénomination :</strong> Assur-Emprunteur</p>
          <p><strong>Forme juridique :</strong> [À compléter — EIRL / SASU / Auto-entrepreneur]</p>
          <p><strong>Adresse :</strong> [Votre adresse professionnelle]</p>
          <p><strong>Email :</strong> contact@assur-emprunteur.fr</p>
          <p><strong>Téléphone :</strong> [Votre numéro professionnel]</p>
          <p><strong>Numéro SIRET :</strong> [À compléter]</p>
          <p><strong>Numéro ORIAS :</strong> [À compléter après inscription]</p>
          <p><strong>Registre :</strong> Courtier en assurance enregistré à l'ORIAS (www.orias.fr)</p>
        </Section>

        <Section title="2. Activité réglementée">
          <p>Assur-Emprunteur exerce l'activité de courtier en assurance, soumise à la réglementation française et européenne en matière d'intermédiation en assurance.</p>
          <p>Immatriculé à l'ORIAS sous le numéro [À compléter], vérifiable sur <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" className="text-[#10b981] hover:underline">www.orias.fr</a>.</p>
          <p><strong>Autorité de contrôle :</strong> Autorité de Contrôle Prudentiel et de Résolution (ACPR) — 4 place de Budapest, CS 92459, 75436 Paris Cedex 09.</p>
        </Section>

        <Section title="3. Hébergement">
          <p><strong>Hébergeur :</strong> Netlify, Inc.</p>
          <p><strong>Adresse :</strong> 512 2nd Street, Suite 200 San Francisco, CA 94107</p>
          <p><strong>Site :</strong> www.netlify.com</p>
        </Section>

        <Section title="4. Propriété intellectuelle">
          <p>L'ensemble du contenu du site Assur-Emprunteur.fr (textes, images, logos, graphismes) est protégé par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable écrite.</p>
        </Section>

        <Section title="5. Responsabilité">
          <p>Les informations présentes sur ce site sont fournies à titre indicatif. Assur-Emprunteur ne saurait être tenu responsable des erreurs ou omissions dans ces informations, ni de l'utilisation qui pourrait en être faite.</p>
          <p>Les tarifs présentés dans le simulateur sont des estimations basées sur les données du marché et n'ont pas valeur contractuelle.</p>
        </Section>

        <Section title="6. Médiation">
          <p>En cas de litige, vous pouvez recourir gratuitement au Médiateur de l'Assurance :</p>
          <p><strong>La Médiation de l'Assurance</strong> — TSA 50110 — 75441 Paris Cedex 09</p>
          <p>Site : <a href="https://www.mediation-assurance.org" target="_blank" rel="noopener noreferrer" className="text-[#10b981] hover:underline">www.mediation-assurance.org</a></p>
        </Section>

        <Section title="7. Données personnelles">
          <p>Pour toute information sur le traitement de vos données personnelles, consultez notre <Link to="/politique-confidentialite" className="text-[#10b981] hover:underline">Politique de confidentialité</Link>.</p>
        </Section>
      </div>
    </div>
  </div>
)
