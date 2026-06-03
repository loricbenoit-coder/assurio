import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-lg font-bold text-[#0a1340] mb-3 pb-2 border-b border-slate-100">{title}</h2>
    <div className="text-slate-600 text-sm leading-relaxed space-y-2">{children}</div>
  </div>
)

export const PolitiqueConfidentialite = () => (
  <div className="min-h-screen bg-slate-50">
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0a1340] mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
      </Link>

      <h1 className="text-3xl font-extrabold text-[#0a1340] mb-2">Politique de confidentialité</h1>
      <p className="text-slate-400 text-sm mb-10">Dernière mise à jour : juin 2025 — Conforme RGPD</p>

      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <Section title="1. Responsable du traitement">
          <p><strong>Assur-Emprunt</strong> — [Adresse professionnelle]</p>
          <p>Email DPO : contact@assur-emprunt.fr</p>
        </Section>

        <Section title="2. Données collectées">
          <p>Nous collectons les données suivantes :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Simulateur :</strong> montant du prêt, durée, âge, profession, statut tabagique</li>
            <li><strong>Formulaire de contact :</strong> prénom, nom, email, téléphone</li>
            <li><strong>Navigation :</strong> cookies analytiques (si consentement donné)</li>
          </ul>
        </Section>

        <Section title="3. Finalités et bases légales">
          <table className="w-full text-xs border-collapse mt-2">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-2 border border-slate-200 font-semibold">Finalité</th>
                <th className="text-left p-2 border border-slate-200 font-semibold">Base légale</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Traitement des demandes de devis', 'Exécution du contrat'],
                ['Envoi du comparatif et rappel conseiller', 'Intérêt légitime'],
                ['Relances commerciales', 'Consentement'],
                ['Mesure d\'audience', 'Consentement'],
                ['Obligations légales (ORIAS)', 'Obligation légale'],
              ].map(([f, b]) => (
                <tr key={f}>
                  <td className="p-2 border border-slate-200">{f}</td>
                  <td className="p-2 border border-slate-200">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="4. Durée de conservation">
          <ul className="list-disc pl-5 space-y-1">
            <li>Prospects non convertis : <strong>3 ans</strong> à compter du dernier contact</li>
            <li>Clients : <strong>5 ans</strong> après la fin du contrat d'assurance</li>
            <li>Données de navigation : <strong>13 mois</strong></li>
          </ul>
        </Section>

        <Section title="5. Destinataires des données">
          <p>Vos données peuvent être transmises à :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Les compagnies d'assurance partenaires (pour établir votre devis)</li>
            <li>Kereis Solutions (gestionnaire de devis d'assurance emprunteur)</li>
            <li>Nos prestataires techniques (hébergement, email)</li>
          </ul>
          <p className="mt-2 text-xs text-slate-400">Vos données ne sont jamais vendues à des tiers.</p>
        </Section>

        <Section title="6. Vos droits">
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Accès</strong> — obtenir une copie de vos données</li>
            <li><strong>Rectification</strong> — corriger des données inexactes</li>
            <li><strong>Effacement</strong> — demander la suppression de vos données</li>
            <li><strong>Opposition</strong> — vous opposer au traitement à des fins commerciales</li>
            <li><strong>Portabilité</strong> — recevoir vos données dans un format structuré</li>
          </ul>
          <p className="mt-3">Pour exercer vos droits : <strong>contact@assur-emprunt.fr</strong></p>
          <p>En cas de réclamation : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#10b981] hover:underline">www.cnil.fr</a></p>
        </Section>

        <Section title="7. Cookies">
          <p>Nous utilisons des cookies analytiques pour mesurer l'audience (avec votre consentement). Vous pouvez retirer votre consentement à tout moment en effaçant les cookies de votre navigateur.</p>
        </Section>
      </div>
    </div>
  </div>
)
