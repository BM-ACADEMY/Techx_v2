import { useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MessageSquare, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { TrustFooter } from '@/components/TrustFooter';
import { QuoteModal } from '@/components/QuoteModal';
import { PrivacyPolicyModal } from '@/components/PrivacyPolicyModal';
import { ScrollToTop } from '@/components/ScrollToTop';
import { RouteSeo } from '@/components/RouteSeo';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';
import { DEFAULT_SERVICE } from '@/data/siteData';
import { openWhatsApp } from '@/lib/whatsapp';

// Direct import for HomePage to maximize initial LCP speed
import { HomePage } from '@/pages/HomePage';

// Lazy-loaded secondary pages for optimal code-splitting (T9.1 & T9.4)
const ServicesPage = lazy(() => import('@/pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const WebsiteDevPage = lazy(() => import('@/pages/WebsiteDevPage').then(m => ({ default: m.WebsiteDevPage })));
const EcommercePage = lazy(() => import('@/pages/EcommercePage').then(m => ({ default: m.EcommercePage })));
const SeoPage = lazy(() => import('@/pages/SeoPage').then(m => ({ default: m.SeoPage })));
const MetaAdsPage = lazy(() => import('@/pages/MetaAdsPage').then(m => ({ default: m.MetaAdsPage })));
const SocialMediaPage = lazy(() => import('@/pages/SocialMediaPage').then(m => ({ default: m.SocialMediaPage })));
const WhatsAppAutomationPage = lazy(() => import('@/pages/WhatsAppAutomationPage').then(m => ({ default: m.WhatsAppAutomationPage })));
const PricingPage = lazy(() => import('@/pages/PricingPage').then(m => ({ default: m.PricingPage })));
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('@/pages/ContactPage').then(m => ({ default: m.ContactPage })));
const RealEstatePage = lazy(() => import('@/pages/RealEstatePage').then(m => ({ default: m.RealEstatePage })));
const WorkPage = lazy(() => import('@/pages/WorkPage').then(m => ({ default: m.WorkPage })));
const BlogPage = lazy(() => import('@/pages/BlogPage').then(m => ({ default: m.BlogPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

function RouteFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center p-8 bg-[#F8F9FA]">
      <div className="flex items-center gap-3 text-[#0A0B0E] font-bold text-sm bg-white border border-[#E2E8F0] px-5 py-3 rounded-2xl shadow-xl">
        <Loader2 className="w-5 h-5 animate-spin text-[#FFE600]" />
        <span>Loading BM TechX Engine...</span>
      </div>
    </div>
  );
}

export function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(DEFAULT_SERVICE);

  const handleOpenQuote = (service?: string) => {
    // Always reset, so a card-specific label never sticks to later generic opens
    setSelectedService(service ?? DEFAULT_SERVICE);
    setIsQuoteOpen(true);
  };

  const handleFloatingWhatsApp = () => {
    openWhatsApp(
      `Hello BM TechX team! I'm on your website and would like an instant consultation.\n[src:floating-whatsapp-button]`
    );
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteSeo />
      <div className="min-h-screen bg-[#F8F9FA] text-[#0A0B0E] flex flex-col selection:bg-[#FFE600] selection:text-black font-body antialiased">
        {/* Sitewide Sticky Header */}
        <Navbar onOpenQuote={handleOpenQuote} />

        {/* Dynamic Route Content */}
        <main className="flex-1 pt-20">
          <Suspense fallback={<RouteFallback />}>
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

              {/* Legacy 301 Client-Side Single-Hop Redirects */}
              <Route path="/index.html" element={<Navigate to="/" replace />} />
              <Route path="/pricing.html" element={<Navigate to="/pricing" replace />} />
              <Route path="/services.html" element={<Navigate to="/services" replace />} />
              <Route path="/about.html" element={<Navigate to="/about" replace />} />
              <Route path="/contact.html" element={<Navigate to="/contact" replace />} />
              <Route path="/services/ecommerce" element={<Navigate to="/services/ecommerce-website" replace />} />
              <Route path="/blog/seo-services-pondicherry.html" element={<Navigate to="/services/seo" replace />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>

        {/* Sitewide Trust Footer */}
        <TrustFooter onOpenPrivacy={() => setIsPrivacyOpen(true)} />

        {/* Global Interactive Quote Modal */}
        <QuoteModal
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
          initialService={selectedService}
        />

        {/* Privacy policy */}
        <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />

        {/* Floating WhatsApp Action Button */}
        <button
          onClick={handleFloatingWhatsApp}
          className="fixed bottom-6 right-6 z-40 bg-[#10B981] hover:bg-[#059669] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-[0_0_25px_rgba(16,185,129,0.3)] flex items-center gap-2.5 transition-all duration-300 hover:scale-105 group active:scale-95"
          aria-label="Chat on WhatsApp" type="button"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <MessageSquare className="w-5 h-5 text-white" />
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
