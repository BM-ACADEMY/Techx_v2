import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { TrustFooter } from '@/components/TrustFooter';
import { QuoteModal } from '@/components/QuoteModal';
import { ScrollToTop } from '@/components/ScrollToTop';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';
import { SITE_CONFIG } from '@/data/siteData';

// Pages
import { HomePage } from '@/pages/HomePage';
import { ServicesPage } from '@/pages/ServicesPage';
import { WebsiteDevPage } from '@/pages/WebsiteDevPage';
import { EcommercePage } from '@/pages/EcommercePage';
import { SeoPage } from '@/pages/SeoPage';
import { MetaAdsPage } from '@/pages/MetaAdsPage';
import { SocialMediaPage } from '@/pages/SocialMediaPage';
import { WhatsAppAutomationPage } from '@/pages/WhatsAppAutomationPage';
import { PricingPage } from '@/pages/PricingPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { RealEstatePage } from '@/pages/RealEstatePage';
import { WorkPage } from '@/pages/WorkPage';
import { BlogPage } from '@/pages/BlogPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Multi-Page Website (₹4,999)');

  const handleOpenQuote = (service?: string) => {
    if (service) {
      setSelectedService(service);
    }
    setIsQuoteOpen(true);
  };

  const handleFloatingWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello BM TechX team! I'm on your website and would like an instant consultation.\n[src:floating-whatsapp-button]`
    );
    window.open(`https://wa.me/${SITE_CONFIG.phones.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#F7F5F1] text-[#14171F] flex flex-col selection:bg-bm-orange/20 selection:text-bm-navy font-body antialiased">
        {/* Sitewide Sticky Header */}
        <Navbar onOpenQuote={handleOpenQuote} />

        {/* Dynamic Route Content */}
        <main className="flex-1 pt-20">
          <Routes>
            <Route path="/" element={<HomePage onOpenQuote={handleOpenQuote} />} />
            <Route path="/services" element={<ServicesPage onOpenQuote={handleOpenQuote} />} />
            <Route path="/services/website-development" element={<WebsiteDevPage onOpenQuote={handleOpenQuote} />} />
            <Route path="/services/ecommerce-website" element={<EcommercePage />} />
            <Route path="/services/seo" element={<SeoPage />} />
            <Route path="/services/meta-ads" element={<MetaAdsPage />} />
            <Route path="/services/social-media-marketing" element={<SocialMediaPage />} />
            <Route path="/services/whatsapp-automation" element={<WhatsAppAutomationPage />} />
            <Route path="/pricing" element={<PricingPage onOpenQuote={handleOpenQuote} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/industries/real-estate" element={<RealEstatePage />} />
            <Route path="/work" element={<WorkPage onOpenQuote={handleOpenQuote} />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Sitewide Trust Footer */}
        <TrustFooter />

        {/* Global Interactive Quote Modal */}
        <QuoteModal
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
          initialService={selectedService}
        />

        {/* Floating WhatsApp Action Button */}
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

        {/* Sticky Bottom Action Bar for Mobile */}
        <StickyMobileCTA />
      </div>
    </BrowserRouter>
  );
}

export default App;
