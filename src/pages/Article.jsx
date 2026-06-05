import React, { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Tag, ArrowRight, Share2 } from 'lucide-react'
import { ARTICLES } from '@/data/articles'
import { Button } from '@/components/ui/Button'

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

/* Rendu Markdown simple */
const renderContent = (content) => {
  const lines = content.trim().split('\n')
  const elements = []
  let key = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) { elements.push(<div key={key++} className="mb-2" />); continue }

    if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className="text-lg font-bold text-[#0a1340] mt-6 mb-2">{line.slice(4)}</h3>)
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="text-2xl font-bold text-[#0a1340] mt-8 mb-3 pb-2 border-b border-slate-100">{line.slice(3)}</h2>)
    } else if (line.startsWith('- ')) {
      elements.push(<li key={key++} className="text-slate-600 mb-1 ml-4 list-disc">{parseBold(line.slice(2))}</li>)
    } else if (line.startsWith('| ') && line.endsWith(' |')) {
      // Table row
      const cells = line.split('|').filter(c => c.trim() && c.trim() !== '--' && !c.trim().match(/^-+$/))
      if (cells.length > 0) {
        const isHeader = lines[i+1]?.includes('--')
        elements.push(
          <div key={key++} className={`flex gap-2 py-2 px-3 text-sm ${isHeader ? 'bg-slate-100 font-semibold rounded-t-lg' : 'border-b border-slate-100'}`}>
            {cells.map((cell, ci) => <div key={ci} className="flex-1 text-slate-700">{parseBold(cell.trim())}</div>)}
          </div>
        )
      }
    } else if (line.match(/^\|[-|]+\|$/)) {
      // Skip separator rows
    } else {
      elements.push(<p key={key++} className="text-slate-600 leading-relaxed mb-3">{parseBold(line)}</p>)
    }
  }

  return elements
}

const parseBold = (text) => {
  const parts = text.split(/\*\*(.*?)\*\*/)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="font-semibold text-[#0a1340]">{part}</strong> : part
  )
}

export const Article = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const article = ARTICLES.find(a => a.slug === slug)
  const others = ARTICLES.filter(a => a.slug !== slug).slice(0, 3)

  useEffect(() => {
    if (!article) navigate('/blog')
    window.scrollTo(0, 0)
  }, [slug])

  if (!article) return null

  return (
    <div className="min-h-screen bg-white">
      {/* Header article */}
      <div className="bg-gradient-to-br from-[#0f1f6b] to-[#0a1340] py-16">
        <div className="max-w-3xl mx-auto px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au blog
          </Link>
          <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${CATEGORY_COLORS[article.category] || 'bg-slate-100 text-slate-600'}`}>
            {article.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            {article.title}
          </h1>
          <p className="text-white/60 text-lg mb-6">{article.description}</p>
          <div className="flex items-center gap-4 text-white/40 text-sm">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{article.readTime} de lecture</span>
            <span>{formatDate(article.date)}</span>
            <span className="text-white/30">Par l'équipe Assur Emprunteur</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Contenu */}
        <article className="prose-custom">
          {renderContent(article.content)}
        </article>

        {/* CTA dans l'article */}
        <div className="mt-12 bg-gradient-to-br from-[#0f1f6b] to-[#0a1340] rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-extrabold text-white mb-2">
            Calculez vos économies maintenant
          </h3>
          <p className="text-white/60 mb-6">
            Comparez les meilleures offres en 2 minutes. Gratuit, sans engagement.
          </p>
          <a href="/#simulateur">
            <Button size="lg" className="group">
              Obtenir mon devis gratuit
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
        </div>

        {/* Articles similaires */}
        {others.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-[#0a1340] mb-6">À lire aussi</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {others.map(a => (
                <Link key={a.slug} to={`/blog/${a.slug}`}
                  className="group bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:shadow-md transition-all">
                  <span className="text-xs text-slate-400 mb-2 block">{a.category}</span>
                  <h4 className="text-sm font-semibold text-[#0a1340] group-hover:text-[#0f1f6b] transition-colors leading-snug">
                    {a.title}
                  </h4>
                  <div className="flex items-center gap-1 mt-3 text-xs text-[#0f1f6b] font-medium">
                    Lire <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
