import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Clock, Tag, ArrowRight } from 'lucide-react'
import { ARTICLES } from '@/data/articles'

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
          <div className="bg-gradient-to-br from-[#0f1f6b] to-[#0a1340] p-10 md:p-14">
            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${CATEGORY_COLORS[ARTICLES[0].category]}`}>
              {ARTICLES[0].category}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 group-hover:text-[#10b981] transition-colors">
              {ARTICLES[0].title}
            </h2>
            <p className="text-white/60 mb-6 max-w-2xl">{ARTICLES[0].description}</p>
            <div className="flex items-center gap-4 text-white/40 text-sm">
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
            className="group bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-4 ${CATEGORY_COLORS[article.category] || 'bg-slate-100 text-slate-600'}`}>
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
          </Link>
        ))}
      </div>
    </div>
  </div>
)
