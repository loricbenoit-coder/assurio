import React, { useState, useEffect } from 'react'
import { ArrowRight, CheckCircle2, Star, Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoModal } from '@/components/ui/VideoModal'
import { useHeroContent } from '@/hooks/useContent'

const openChatBot = () => window.dispatchEvent(new CustomEvent('openChat'))

const REVIEWS = [
  {
    initials: 'MR', color: 'from-emerald-400 to-teal-500',
    name: 'Marie R.', role: 'Propriétaire à Lyon',
    saving: '8 400€',
    text: 'Service impeccable et rapide ! Je recommande à tous.',
  },
  {
    initials: 'TD', color: 'from-blue-400 to-indigo-500',
    name: 'Thomas D.', role: 'Emprunteur à Paris',
    saving: '11 200€',
    text: 'Incroyablement simple. Tout a été géré pour moi.',
  },
  {
    initials: 'SM', color: 'from-violet-400 to-purple-500',
    name: 'Sophie M.', role: 'Cadre à Bordeaux',
    saving: '7 800€',
    text: 'En 20 min j\'avais un devis moins cher qu\'à ma banque.',
  },
  {
    initials: 'LB', color: 'from-orange-400 to-rose-500',
    name: 'Laurent B.', role: 'Entrepreneur à Nantes',
    saving: '9 400€',
    text: 'J\'économise 130€ par mois. Merci Assur Emprunteur !',
  },
  {
    initials: 'CA', color: 'from-cyan-400 to-blue-500',
    name: 'Claire A.', role: 'Enseignante à Toulouse',
    saving: '6 200€',
    text: 'Conseiller très professionnel, dossier monté en 2 jours.',
  },
]

const FloatingReviews = () => {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % REVIEWS.length)
        setVisible(true)
      }, 350)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const review = REVIEWS[index]

  return (
    <div className="hidden lg:block absolute right-12 bottom-20 max-w-[280px]">
      {/* Dots indicateurs */}
      <div className="flex justify-center gap-1.5 mb-3">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setVisible(false); setTimeout(() => { setIndex(i); setVisible(true) }, 200) }}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === index ? '20px' : '6px',
              height: '6px',
              background: i === index ? '#10b981' : 'rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </div>

      {/* Carte */}
      <div
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5"
        style={{
          transition: 'opacity 0.35s ease, transform 0.35s ease',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.98)',
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
            {review.initials}
          </div>
          <div>
            <div className="text-white font-semibold text-sm leading-tight">{review.name}</div>
            <div className="text-white/40 text-xs">{review.role}</div>
          </div>
          <div className="ml-auto flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-[#10b981] text-[#10b981]" />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-1.5 mb-3">
          <span className="text-xs text-white/60">Économies :</span>
          <span className="text-sm font-bold text-[#10b981]">{review.saving}</span>
        </div>

        <p className="text-white/70 text-sm leading-relaxed italic">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>
    </div>
  )
}

const TRUST_ITEMS = [
  'Tarifs minimum garantis',
  '100% en ligne',
  'Sans engagement',
]

const STATS = [
  { value: '15 000€', label: "d'économies maximum" },
  { value: '48h', label: 'délai de traitement' },
  { value: '4.9/5', label: 'satisfaction client' },
]

export const Hero = () => {
  const content = useHeroContent()
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0a1340]"
      data-sb-object-id="content/hero.json"
    >
      {/* Gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1f6b] via-[#0a1340] to-[#061029]" />
        <div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #527bf5 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
            <span
              className="text-sm text-white/80 font-medium"
              data-sb-field-path="badge"
            >
              {content.badge}
            </span>
          </div>

          {/* Headline fixe */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6">
            Comparez et économisez
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #10b981, #34d399)' }}
            >
              sur votre assurance de prêt immobilier
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl text-white/60 leading-relaxed mb-10 max-w-2xl"
            data-sb-field-path="subtitle"
          >
            {content.subtitle}
          </p>

          {/* Trust items */}
          <div className="flex flex-wrap gap-4 mb-10">
            {TRUST_ITEMS.map((item) => (
              <div key={item} className="flex items-center gap-2 text-white/70">
                <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10 sm:mb-16">
            <a href="#suivi-dossier" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto bg-[#10b981] hover:bg-[#059669] shadow-xl shadow-emerald-500/30">
                Démarrer mon dossier gratuit
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <a href="#simulateur" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10"
                data-sb-field-path="ctaPrimary"
              >
                {content.ctaPrimary}
              </Button>
            </a>
          </div>

          <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-white/10">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-sm text-white/50">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating reviews carousel */}
      <FloatingReviews />
    </section>
  )
}
