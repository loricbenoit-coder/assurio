import React, { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'

// ⚠️ Remplace par ton vrai numéro avant la mise en ligne
const PHONE = '06 XX XX XX XX'

const NAV_LINKS = [
  { label: 'Comment ça marche', href: '/#comment-ca-marche' },
  { label: 'Avantages', href: '/#avantages' },
  { label: 'Avis clients', href: '/#avis' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Blog', href: '/blog', isRoute: true },
  { label: 'Contact', href: '/contact', isRoute: true },
]

export const Navbar = ({ scrolledOnly = false }) => {
  const [scrolled, setScrolled] = useState(scrolledOnly)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (scrolledOnly) return
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolledOnly])

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100' : 'bg-transparent'
    )}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" aria-label="Assur Emprunteur - Accueil">
          <Logo dark={scrolled} />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ label, href, isRoute }) => (
            isRoute
              ? <Link key={href} to={href}
                  className={cn('text-sm font-medium transition-colors', scrolled ? 'text-slate-600 hover:text-[#0a1340]' : 'text-white/70 hover:text-white')}>
                  {label}
                </Link>
              : <a key={href} href={href}
                  className={cn('text-sm font-medium transition-colors', scrolled ? 'text-slate-600 hover:text-[#0a1340]' : 'text-white/70 hover:text-white')}>
                  {label}
                </a>
          ))}
        </nav>

        {/* Téléphone + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href={`tel:${PHONE.replace(/\s/g, '')}`}
            className={cn('flex items-center gap-1.5 text-sm font-semibold transition-colors', scrolled ? 'text-[#0a1340]' : 'text-white/80 hover:text-white')}>
            <Phone className="w-4 h-4" />
            {PHONE}
          </a>
          <a href="/#simulateur">
            <Button size="sm">Obtenir un devis</Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button className={cn('md:hidden p-2', scrolled ? 'text-slate-600' : 'text-white')}
          onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, href, isRoute }) => (
            isRoute
              ? <Link key={href} to={href} className="text-sm font-medium text-slate-600 hover:text-[#0a1340]" onClick={() => setMenuOpen(false)}>{label}</Link>
              : <a key={href} href={href} className="text-sm font-medium text-slate-600 hover:text-[#0a1340]" onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm font-semibold text-[#0a1340]">
            <Phone className="w-4 h-4 text-[#10b981]" /> {PHONE}
          </a>
          <a href="/#simulateur" onClick={() => setMenuOpen(false)}>
            <Button size="sm" className="w-full mt-1">Obtenir un devis</Button>
          </a>
        </div>
      )}
    </header>
  )
}
