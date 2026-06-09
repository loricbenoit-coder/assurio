import React, { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { initReferral } from '@/hooks/useReferral'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { InsurersCarousel } from '@/components/sections/InsurersCarousel'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Advantages } from '@/components/sections/Advantages'
import { ChatWidget } from '@/components/chatbot/ChatWidget'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { LazySection } from '@/components/ui/LazySection'

// Sections lourdes — chargées uniquement en approchant du viewport
const SavingsCalculator   = lazy(() => import('@/components/sections/SavingsCalculator').then(m => ({ default: m.SavingsCalculator })))
const QuoteSimulator      = lazy(() => import('@/components/sections/QuoteSimulator').then(m => ({ default: m.QuoteSimulator })))
const Testimonials        = lazy(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const FAQ                 = lazy(() => import('@/components/sections/FAQ').then(m => ({ default: m.FAQ })))
const CTA                 = lazy(() => import('@/components/sections/CTA').then(m => ({ default: m.CTA })))

// Pages — lazy aussi pour réduire le bundle initial
const MentionsLegales         = lazy(() => import('@/pages/MentionsLegales').then(m => ({ default: m.MentionsLegales })))
const CGU                     = lazy(() => import('@/pages/CGU').then(m => ({ default: m.CGU })))
const PolitiqueConfidentialite = lazy(() => import('@/pages/PolitiqueConfidentialite').then(m => ({ default: m.PolitiqueConfidentialite })))
const Contact                 = lazy(() => import('@/pages/Contact').then(m => ({ default: m.Contact })))
const Admin                   = lazy(() => import('@/pages/Admin').then(m => ({ default: m.Admin })))
const APropos                 = lazy(() => import('@/pages/APropos').then(m => ({ default: m.APropos })))
const Blog                    = lazy(() => import('@/pages/Blog').then(m => ({ default: m.Blog })))
const Article                 = lazy(() => import('@/pages/Article').then(m => ({ default: m.Article })))

// Scroll vers l'ancre après chaque navigation
// Initialise le tracking affilié dès l'arrivée sur le site
const ReferralTracker = () => {
  useEffect(() => { initReferral() }, [])
  return null
}

const ScrollToHash = () => {
  const { hash } = useLocation()
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return }
    // Attend que les sections soient montées dans le DOM
    const id = hash.replace('#', '')
    const attempt = (tries = 0) => {
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
      } else if (tries < 15) {
        setTimeout(() => attempt(tries + 1), 80)
      }
    }
    attempt()
  }, [hash])
  return null
}

const LandingPage = () => (
  <>
    <ScrollToHash />
    <Navbar />
    <main>
      <Hero />
      <InsurersCarousel />
      <HowItWorks />
      <Advantages />
      <LazySection minHeight={600}>
        <SavingsCalculator />
      </LazySection>
      <LazySection id="simulateur" minHeight={700}>
        <QuoteSimulator />
      </LazySection>
      <LazySection minHeight={500}>
        <Testimonials />
      </LazySection>
      <LazySection minHeight={400}>
        <FAQ />
      </LazySection>
      <LazySection minHeight={300}>
        <CTA />
      </LazySection>
    </main>
    <Footer />
  </>
)

const LegalPage = ({ children }) => (
  <>
    <Navbar scrolledOnly />
    <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
      {children}
    </Suspense>
    <Footer />
  </>
)

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/mentions-legales" element={<LegalPage><MentionsLegales /></LegalPage>} />
      <Route path="/cgu" element={<LegalPage><CGU /></LegalPage>} />
      <Route path="/politique-confidentialite" element={<LegalPage><PolitiqueConfidentialite /></LegalPage>} />
      <Route path="/contact" element={<LegalPage><Contact /></LegalPage>} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/a-propos" element={<LegalPage><APropos /></LegalPage>} />
      <Route path="/blog" element={<LegalPage><Blog /></LegalPage>} />
      <Route path="/blog/:slug" element={<LegalPage><Article /></LegalPage>} />
    </Routes>
    <ReferralTracker />
    <ChatWidget />
    <CookieBanner />
  </BrowserRouter>
)

export default App
