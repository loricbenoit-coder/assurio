import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Shield, Award, Heart, Target, CheckCircle2, Star, Users, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const VALEURS = [
  {
    icon: Shield,
    title: 'Transparence totale',
    description: 'Pas de jargon, pas de surprise. Je vous explique clairement chaque garantie, chaque exclusion, chaque centime.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Heart,
    title: 'Votre intérêt avant tout',
    description: "Je suis rémunéré par les assureurs, pas par vous. Mon seul objectif : vous trouver la meilleure offre, même si ce n'est pas la plus rentable pour moi.",
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: Target,
    title: 'Expertise pointue',
    description: "Plus de 10 ans dans l'assurance emprunteur. Je connais les subtilités de chaque contrat, les pièges à éviter, les négociations qui font la différence.",
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Award,
    title: "Accompagnement jusqu'au bout",
    description: "Je ne disparais pas après la signature. Je reste disponible pendant toute la durée de votre prêt pour toute question ou modification.",
    color: 'bg-purple-50 text-purple-600',
  },
]

const STATS = [
  { value: '10+', label: "ans d'expérience", icon: Award },
  { value: '50 000+', label: 'dossiers traités', icon: Users },
  { value: '60%', label: "d'économies moyennes", icon: TrendingDown },
  { value: '4.9/5', label: 'note client', icon: Star },
]

const DIPLOMES = [
  "Licence en Économie et Gestion",
  "BTS Assurance",
  "Certification AMF (Autorité des Marchés Financiers)",
  "Formation continue ORIAS — Courtage en assurance",
  "Habilitation IAS niveau 2",
]

export const APropos = () => (
  <div className="min-h-screen bg-white">

    {/* Hero */}
    <div className="bg-gradient-to-br from-[#0f1f6b] to-[#0a1340] py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="max-w-4xl mx-auto px-6 relative">
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-10 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-8">
          L'équipe fondatrice
        </h1>

        {/* Les 2 fondateurs */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          {/* Benoit */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#10b981] to-[#06b6d4] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-2xl">B</span>
            </div>
            <div>
              <p className="text-white font-bold text-lg">Benoit</p>
              <p className="text-[#10b981] text-sm font-semibold">Co-fondateur</p>
              <p className="text-white/50 text-xs mt-0.5">Courtier · 10+ ans d'expérience</p>
            </div>
          </div>

          {/* Maxime */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2a55e8] to-[#0f1f6b] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-2xl">M</span>
            </div>
            <div>
              <p className="text-white font-bold text-lg">Maxime</p>
              <p className="text-[#10b981] text-sm font-semibold">Co-fondateur</p>
              <p className="text-white/50 text-xs mt-0.5">Développement & stratégie</p>
            </div>
          </div>
        </div>

        <p className="text-xl text-white/70 leading-relaxed max-w-2xl">
          Après 10 ans dans le courtage en assurance, nous avons créé{' '}
          <strong className="text-white">Assur Emprunteur</strong> avec une conviction commune :
          chaque emprunteur mérite de payer son assurance au juste prix.
        </p>
      </div>
    </div>

    <div className="max-w-4xl mx-auto px-6 py-16">

      {/* Notre histoire */}
      <div className="mb-16">
        <span className="inline-block text-sm font-semibold text-[#10b981] uppercase tracking-widest mb-4">Notre histoire</span>
        <h2 className="text-3xl font-extrabold text-[#0a1340] mb-6">Pourquoi nous avons créé Assur Emprunteur</h2>
        <div className="prose-custom space-y-4 text-slate-600 leading-relaxed text-lg">
          <p>
            Après plus de <strong className="text-[#0a1340]">10 ans passés au sein d'une grande société de courtage</strong>, Benoit a vu des milliers de dossiers d'assurance emprunteur défiler. Et à chaque fois, le même constat : la grande majorité des emprunteurs payaient leur assurance <strong className="text-[#0a1340]">2 à 3 fois trop cher</strong>, simplement parce qu'ils ne savaient pas qu'ils pouvaient faire autrement.
          </p>
          <p>
            Les banques ne font pas de publicité pour vous dire que vous pouvez changer d'assurance. C'est normal — ce n'est pas dans leur intérêt. Mais c'est dans le vôtre.
          </p>
          <p>
            C'est avec Maxime que nous avons décidé de construire <strong className="text-[#0a1340]">Assur Emprunteur</strong> : unir l'expertise terrain du courtage et la technologie pour rendre ce service accessible à tous, simplement, gratuitement et en toute transparence.
          </p>
          <p>
            Notre expérience combinée nous permet de connaître les subtilités de chaque contrat, les assureurs les plus réactifs, et les négociations qui font vraiment la différence. Ce savoir-faire, nous le mettons entièrement à votre service.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {STATS.map(({ value, label, icon: Icon }) => (
          <div key={label} className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-100">
            <Icon className="w-6 h-6 text-[#10b981] mx-auto mb-2" />
            <div className="text-2xl font-extrabold text-[#0a1340]">{value}</div>
            <div className="text-sm text-slate-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Mes valeurs */}
      <div className="mb-16">
        <span className="inline-block text-sm font-semibold text-[#10b981] uppercase tracking-widest mb-4">Mes valeurs</span>
        <h2 className="text-3xl font-extrabold text-[#0a1340] mb-8">Ce qui me guide au quotidien</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {VALEURS.map(({ icon: Icon, title, description, color }) => (
            <div key={title} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mb-4`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#0a1340] mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Diplômes & certifications */}
      <div className="mb-16">
        <span className="inline-block text-sm font-semibold text-[#10b981] uppercase tracking-widest mb-4">Expertise</span>
        <h2 className="text-3xl font-extrabold text-[#0a1340] mb-8">Formations & certifications</h2>
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-7">
          <ul className="space-y-3">
            {DIPLOMES.map((d) => (
              <li key={d} className="flex items-center gap-3 text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-[#10b981] flex-shrink-0" />
                <span className="font-medium">{d}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 pt-5 border-t border-slate-200 text-sm text-slate-400">
            Courtier en assurance enregistré à l'ORIAS — N° <strong>[À compléter]</strong> · Vérifiable sur{' '}
            <a href="https://www.orias.fr" target="_blank" rel="noopener noreferrer" className="text-[#10b981] hover:underline">www.orias.fr</a>
          </div>
        </div>
      </div>

      {/* Ma promesse */}
      <div className="bg-gradient-to-br from-[#0f1f6b] to-[#0a1340] rounded-3xl p-10 text-center relative overflow-hidden mb-16">
        <div className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(circle at 50% 50%, #10b981, transparent 70%)' }} />
        <div className="relative">
          <div className="text-4xl mb-4">🤝</div>
          <h2 className="text-2xl font-extrabold text-white mb-4">Ma promesse</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Je ne vous proposerai jamais une offre qui n'est pas dans votre intérêt.
            Si je ne peux pas vous faire économiser, je vous le dirai honnêtement.
            <strong className="text-white"> Mon objectif : votre satisfaction, pas ma commission.</strong>
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-[#0a1340] mb-3">Prêt à économiser ensemble ?</h2>
        <p className="text-slate-500 mb-6">Obtenez votre comparatif gratuit en 2 minutes.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/#simulateur">
            <Button size="lg" className="group">
              Simuler mes économies
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
          <Link to="/contact">
            <Button variant="outline" size="lg">Me contacter directement</Button>
          </Link>
        </div>
      </div>
    </div>
  </div>
)
