import React, { useState } from 'react'
import { ArrowRight, CheckCircle2, Star, Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { VideoModal } from '@/components/ui/VideoModal'
import { useHeroContent } from '@/hooks/useContent'

const openChatBot = () => window.dispatchEvent(new CustomEvent('openChat'))

const TRUST_ITEMS = [
  'Réponse en 2 minutes',
  '100% en ligne',
  'Sans engagement',
]

const STATS = [
  { value: '60%', label: "d'économies moyennes" },
  { value: '50 000+', label: 'clients assurés' },
  { value: '4.9/5', label: 'note moyenne' },
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
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6">
            Votre assurance emprunteur à
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #10b981, #34d399)' }}
            >
              -60%
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
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <a href="#simulateur">
              <Button size="lg" className="group" data-sb-field-path="ctaPrimary">
                {content.ctaPrimary}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 gap-2"
              onClick={() => setVideoOpen(true)}
              data-sb-field-path="ctaSecondary"
            >
              <Play className="w-4 h-4 fill-white" />
              {content.ctaSecondary}
            </Button>
          </div>

          <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-sm text-white/50">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating review card */}
      <div className="hidden lg:block absolute right-16 bottom-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 max-w-xs">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
            MR
          </div>
          <div>
            <div className="text-white font-semibold text-sm">Marie R.</div>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-[#10b981] text-[#10b981]" />
              ))}
            </div>
          </div>
        </div>
        <p className="text-white/70 text-sm leading-relaxed">
          &ldquo;Économisé <strong className="text-white">8 400€</strong> sur mon prêt. Service impeccable et rapide !&rdquo;
        </p>
      </div>
    </section>
  )
}
