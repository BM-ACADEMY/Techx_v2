import { useState } from 'react'
import { MessageSquare } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { ServicesSection } from '@/components/ServicesSection'
import { PricingSection } from '@/components/PricingSection'
import { ProjectCalculator } from '@/components/ProjectCalculator'
import { ComparisonSection } from '@/components/ComparisonSection'
import { ProofSection } from '@/components/ProofSection'
import { FaqSection } from '@/components/FaqSection'
import { Footer } from '@/components/Footer'
import { QuoteModal } from '@/components/QuoteModal'
import { SITE_CONFIG } from '@/data/siteData'

export function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('Multi-Page Website (₹4,999)')

  const handleOpenQuote = (service?: string) => {
    if (service) {
      setSelectedService(service)
    }
    setIsQuoteOpen(true)
  }

  const handleFloatingWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello BM TechX team! I'm on your website and would like an instant consultation.\n[src:floating-whatsapp-button]`
    )
    window.open(`https://wa.me/${SITE_CONFIG.phones.whatsapp}?text=${text}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[#F7F5F1] text-[#14171F] flex flex-col selection:bg-bm-orange/20 selection:text-bm-navy font-body antialiased">
      {/* Navigation */}
      <Navbar onOpenQuote={handleOpenQuote} />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero onOpenQuote={handleOpenQuote} />
        <ServicesSection onOpenQuote={handleOpenQuote} />
        <PricingSection onOpenQuote={handleOpenQuote} />
        <ProjectCalculator />
        <ComparisonSection />
        <ProofSection onOpenQuote={handleOpenQuote} />
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialService={selectedService}
      />

      {/* Floating Sticky WhatsApp Button */}
      <button
        onClick={handleFloatingWhatsApp}
        className="fixed bottom-6 right-6 z-40 bg-[#1E7A4D] hover:bg-[#17603C] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-300 hover:scale-105 group active:scale-95"
        aria-label="Direct WhatsApp Consultation"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <MessageSquare className="w-5 h-5" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  )
}

export default App
