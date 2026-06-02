import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Advantages } from '@/components/sections/Advantages'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'
import { ChatWidget } from '@/components/chatbot/ChatWidget'

const App = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <HowItWorks />
      <Advantages />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
    <Footer />
    <ChatWidget />
  </>
)

export default App
