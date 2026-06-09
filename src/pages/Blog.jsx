import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react'
import { ARTICLES } from '@/data/articles'
import { SEO } from '@/components/ui/SEO'
import { ArticleImage } from '@/components/ui/ArticleImage'

const CATEGORY_COLORS = {
  'Législation':    'bg-blue-50 text-blue-700',
  'Guide pratique': 'bg-emerald-50 text-emerald-700',
  'Conseils':       'bg-orange-50 text-orange-700',
  'Comprendre':     'bg-purple-50 text-purple-700',
  'Comparatif':     'bg-teal-50 text-teal-700',
  'Cas particuliers': 'bg-pink-50 text-pink-700',
}

const formatDate = (d) =>
  new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export const Blog = () => (
  <div className="min-h-screen bg-slate-50">
    <SEO
      title="Conseils & guides assurance emprunteur"
      description="Tous nos conseils d'experts sur l'assurance emprunteur : loi Lemoine, délégation, garanties, économies... Guides pratiques gratuits pour payer moins cher."
      canonical="https://assur-emprunteur.fr/conseils"
      breadcrumbs={[
        { name: 'Accueil', url: 'https://assur-emprunteur.fr/' },
        { name: 'Conseils', url: 'https://assur-emprunteur.fr/conseils' },
      ]}
    />
    <div className="max-w-5xl mx-auto px-6 py-16">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0a1340] mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
      </Link>

      {/* Header */}
      <div className="mb-12">
        <span className="inline-block text-sm font-semibold text-[#10b981] uppercase tracking-widest mb-3">
          Blog & Conseils
        </span>
        <h1 className="text-4xl font-extrabold text-[#0a1340] mb-4">
          Tout savoir sur l'assurance emprunteur
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Guides pratiques, actualités législatives et conseils d'experts pour optimiser votre assurance prêt immobilier.
        </p>
      </div>

      {/* Article en vedette */}
      <div className="mb-8">
        <Link to={`/blog/${ARTICLES[0].slug}`} className="group block bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
          {/* Image hero */}
          {ARTICLES[0].image && (
            <div className="relative h-56 md:h-72 overflow-hidden">
              <ArticleImage
                src={ARTICLES[0].image}
                alt={ARTICLES[0].imageAlt}
                eager
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-8">
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${CATEGORY_COLORS[ARTICLES[0].category]}`}>
                  {ARTICLES[0].category}
                </span>
              </div>
            </div>
          )}
          <div className="p-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0a1340] mb-3 group-hover:text-[#0f1f6b] transition-colors">
              {ARTICLES[0].title}
            </h2>
            <p className="text-slate-500 mb-4 max-w-2xl">{ARTICLES[0].description}</p>
            <div className="flex items-center gap-4 text-slate-400 text-sm">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{ARTICLES[0].readTime}</span>
              <span>{formatDate(ARTICLES[0].date)}</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Grille articles */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTICLES.slice(1).map((article) => (
          <Link
            key={article.slug}
            to={`/blog/${article.slug}`}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {/* Miniature */}
            {article.image && (
              <div className="h-40 overflow-hidden">
                <ArticleImage
                  src={article.image}
                  alt={article.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-5">
              <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${CATEGORY_COLORS[article.category] || 'bg-slate-100 text-slate-600'}`}>
                {article.category}
              </span>
              <h2 className="text-base font-bold text-[#0a1340] mb-2 group-hover:text-[#0f1f6b] transition-colors leading-snug">
                {article.title}
              </h2>
              <p className="text-slate-500 text-sm mb-4 line-clamp-2">{article.description}</p>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </div>
                <span className="flex items-center gap-1 text-[#0f1f6b] font-medium group-hover:gap-2 transition-all">
                  Lire <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
)
