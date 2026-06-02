import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Comment ça marche', href: '#comment-ca-marche' },
  { label: 'Avantages', href: '#avantages' },
  { label: 'Avis clients', href: '#avis' },
  { label: 'FAQ', href: '#faq' },
]

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" aria-label="Assur-Emprunt - Accueil">
          {scrolled
            ? <Logo dark />
            : <Logo dark={false} />
          }
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={cn(
                'text-sm font-medium transition-colors',
                scrolled ? 'text-slate-600 hover:text-[#0a1340]' : 'text-white/70 hover:text-white'
              )}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant={scrolled ? 'outline' : 'ghost'}
            size="sm"
            className={!scrolled ? 'text-white/80 hover:text-white hover:bg-white/10' : ''}
          >
            Se connecter
          </Button>
          <Button size="sm">Obtenir un devis</Button>
        </div>

        {/* Mobile toggle */}
        <button
          className={cn('md:hidden p-2', scrolled ? 'text-slate-600' : 'text-white')}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-slate-600 hover:text-[#0a1340]"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <Button size="sm" className="w-full mt-2">Obtenir un devis</Button>
        </div>
      )}
    </header>
  )
}
