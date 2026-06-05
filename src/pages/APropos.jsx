import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Shield, Award, Heart, Target, CheckCircle2, TrendingDown, Users, Star, FileCheck, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const CHIFFRES = [
  { value: '10+', label: "ans d'expertise", icon: Award },
  { value: '50 000+', label: 'clients accompagnés', icon: Users },
  { value: '60%', label: "d'économies moyennes", icon: TrendingDown },
  { value: '4.9/5', label: 'satisfaction client', icon: Star },
]

const ENGAGEMENTS = [
  {
    icon: Shield,
    title: 'Indépendance totale',
    description: "Assur Emprunteur est un courtier indépendant, non lié à une banque ou un assureur. Nous comparons objectivement l'ensemble du marché pour vous proposer la meilleure offre.",
  },
  {
    icon: Heart,
    title: 'Gratuité du service',
    description: "Notre service de comparaison et d'accompagnement est entièrement gratuit pour vous. Nous sommes rémunérés par les compagnies d'assurance, sans impact sur votre tarif.",
  },
  {
    icon: Target,
    title: 'Expertise reconnue',
    description: "Courtier enregistré à l'ORIAS, nos conseillers sont formés et certifiés. Nous maîtrisons chaque subtilité du marché de l'assurance emprunteur.",
  },
  {
    icon: FileCheck,
    title: 'Accompagnement complet',
    description: "De la première simulation à la résiliation effective, nous gérons l'intégralité des démarches administratives auprès de votre banque.",
  },
]

const PROCESS = [
  { num: '01', title: 'Analyse de votre situation', desc: "Nos experts étudient votre profil, votre prêt et les garanties exigées par votre banque." },
  { num: '02', title: 'Comparaison du marché', desc: "Nous comparons les offres de nos partenaires assureurs pour identifier la solution optimale." },
  { num: '03', title: 'Vérification des garanties', desc: "Nous garantissons l'équivalence des garanties selon les exigences légales en vigueur." },
  { num: '04', title: 'Gestion administrative', desc: "Nous prenons en charge toutes les démarches de résiliation et de souscription à votre place." },
]

export const APropos = () => (
  <div className="min-h-screen bg-white">

    {/* Hero institutionnel */}
    <div className="bg-gradient-to-br from-[#0f1f6b] to-[#0a1340] py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10 rounded-full"
        style={{ background: 'radial-gradient(circle, #10b981, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto px-6 relative">
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>

        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
          <Building2 className="w-4 h-4 text-[#10b981]" />
          <span className="text-sm text-white/80 font-medium">Courtier en assurance — Enregistré ORIAS</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          Notre mission : vous faire<br />
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #10b981, #34d399)' }}>
            économiser sur votre prêt
          </span>
        </h1>

        <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
          Assur Emprunteur est un courtier en assurance emprunteur indépendant. Depuis plus de 10 ans,
          nous aidons les emprunteurs français à payer leur assurance prêt immobilier au juste prix.
        </p>
      </div>
    </div>

    {/* Chiffres clés */}
    <div className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CHIFFRES.map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="w-12 h-12 bg-[#f0f4ff] rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-[#0f1f6b]" />
              </div>
              <div className="text-3xl font-extrabold text-[#0a1340] mb-1">{value}</div>
              <div className="text-sm text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">

      {/* Notre positionnement */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block text-sm font-semibold text-[#10b981] uppercase tracking-widest mb-4">Qui sommes-nous</span>
          <h2 className="text-3xl font-extrabold text-[#0a1340] mb-5 leading-tight">
            Un courtier indépendant au service des emprunteurs
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Assur Emprunteur est une société de courtage en assurance emprunteur, enregistrée à l'ORIAS
            et soumise au contrôle de l'<strong className="text-[#0a1340]">Autorité de Contrôle Prudentiel et de Résolution (ACPR)</strong>.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Contrairement aux contrats groupe proposés par les banques, nous comparons en temps réel
            les offres de <strong className="text-[#0a1340]">plus de 15 compagnies d'assurance partenaires</strong> pour vous garantir
            la meilleure couverture au meilleur prix.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Grâce à la <strong className="text-[#0a1340]">loi Lemoine (2022)</strong>, chaque emprunteur peut changer
            d'assurance à tout moment. Nous gérons l'intégralité de ces démarches gratuitement.
          </p>
        </div>
        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
          <div className="space-y-4">
            {[
              "Courtier indépendant, non affilié à une banque",
              "Enregistré à l'ORIAS (vérifiable sur orias.fr)",
              "Soumis au contrôle de l'ACPR",
              "Adhérent à la convention AERAS",
              "Titulaire d'une assurance RCP professionnelle",
              "Respect du devoir de conseil et de transparence",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#10b981] flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nos engagements */}
      <div>
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-[#10b981] uppercase tracking-widest mb-4">Nos engagements</span>
          <h2 className="text-3xl font-extrabold text-[#0a1340]">Ce qui nous distingue</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {ENGAGEMENTS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white rounded-2xl border border-slate-200 p-7 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#f0f4ff] flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[#0f1f6b]" />
              </div>
              <h3 className="font-bold text-[#0a1340] mb-2 text-lg">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notre processus */}
      <div>
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-[#10b981] uppercase tracking-widest mb-4">Notre méthode</span>
          <h2 className="text-3xl font-extrabold text-[#0a1340]">Un accompagnement de A à Z</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-slate-200 via-[#10b981]/40 to-slate-200" />
          {PROCESS.map(({ num, title, desc }) => (
            <div key={num} className="relative text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#0f1f6b] text-white font-black text-xl flex items-center justify-center mx-auto mb-4 relative z-10">
                {num}
              </div>
              <h3 className="font-bold text-[#0a1340] mb-2 text-sm">{title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Encadrement réglementaire */}
      <div className="bg-[#f0f4ff] rounded-3xl p-8 border border-[#0f1f6b]/10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0f1f6b] flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-[#10b981]" />
          </div>
          <div>
            <h3 className="font-bold text-[#0a1340] text-lg mb-2">Encadrement réglementaire</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              Assur Emprunteur exerce son activité dans le strict respect de la réglementation française
              et européenne en matière d'intermédiation en assurance (directive DDA).
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <span><strong className="text-[#0a1340]">Autorité de tutelle :</strong> ACPR — 4 place de Budapest, 75436 Paris Cedex 09</span>
              <span><strong className="text-[#0a1340]">Registre :</strong> ORIAS N° <span className="text-[#10b981]">[À compléter]</span> — <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" className="text-[#10b981] hover:underline">www.orias.fr</a></span>
              <span><strong className="text-[#0a1340]">Médiation :</strong> La Médiation de l'Assurance — <a href="https://www.mediation-assurance.org" target="_blank" rel="noopener noreferrer" className="text-[#10b981] hover:underline">mediation-assurance.org</a></span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#0f1f6b] to-[#0a1340] rounded-3xl p-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 50% 0%, #10b981, transparent 60%)' }} />
        <div className="relative">
          <h2 className="text-3xl font-extrabold text-white mb-4">Comparez votre assurance emprunteur</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Service gratuit, sans engagement. Résultat en 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/#simulateur">
              <Button size="lg" className="group">
                Obtenir mon comparatif gratuit
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                Contacter un conseiller
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  </div>
)
