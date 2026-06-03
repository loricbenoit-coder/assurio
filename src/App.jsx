import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { InsurersCarousel } from '@/components/sections/InsurersCarousel'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Advantages } from '@/components/sections/Advantages'
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

const LandingPage = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <InsurersCarousel />
      <HowItWorks />
      <Advantages />
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
    </Routes>
    <ChatWidget />
    <CookieBanner />
  </BrowserRouter>
)

export default App
