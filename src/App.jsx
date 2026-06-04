import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { InsurersCarousel } from '@/components/sections/InsurersCarousel'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Advantages } from '@/components/sections/Advantages'
import { SavingsCalculator } from '@/components/sections/SavingsCalculator'
import { QuoteSimulator } from '@/components/sections/QuoteSimulator'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'
import { ChatWidget } from '@/components/chatbot/ChatWidget'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { MentionsLegales } from '@/pages/MentionsLegales'
import { CGU } from '@/pages/CGU'
import { PolitiqueConfidentialite } from '@/pages/PolitiqueConfidentialite'
import { Contact } from '@/pages/Contact'
import { Admin } from '@/pages/Admin'

// Scroll vers l'ancre après chaque navigation
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
      <SavingsCalculator />
      <QuoteSimulator />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
    <Footer />
  </>
)

const LegalPage = ({ children }) => (
  <>
    <Navbar scrolledOnly />
    {children}
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
    </Routes>
    <ChatWidget />
    <CookieBanner />
  </BrowserRouter>
)

export default App
