import React from 'react'
import { ArrowRight, ShieldCheck, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const openChatBot = () => window.dispatchEvent(new CustomEvent('openChat'))

export const CTA = () => (
  <section className="py-24 bg-[#0a1340] relative overflow-hidden">
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10 rounded-full"
      style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
    />

    <div className="relative max-w-4xl mx-auto px-6 text-center">
      <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
        <ShieldCheck className="w-4 h-4 text-[#10b981]" />
        <span className="text-sm text-white/80 font-medium">
          Gratuit · Sans engagement · 100% en ligne
        </span>
      </div>

      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
        Prêt à économiser sur
        <br />
        votre assurance emprunteur ?
      </h2>

      <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
        Rejoignez 50 000 emprunteurs qui ont déjà optimisé leur assurance avec
        <span className="text-white font-semibold"> Assur-Emprunteur</span>.
        Obtenez votre comparatif gratuit en 2 minutes.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#simulateur">
          <Button size="lg" className="group">
            Obtenir mon devis gratuit
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </a>
        <Button
          variant="outline"
          size="lg"
          className="border-white/20 text-white hover:bg-white/10"
          onClick={openChatBot}
        >
          <MessageCircle className="w-5 h-5" />
          Parler à un conseiller
        </Button>
      </div>

      <p className="mt-8 text-sm text-white/30">
        Aucune carte bancaire requise · Résultat immédiat
      </p>
    </div>
  </section>
)
