import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X, Sparkles } from 'lucide-react';
import { WhatsAppCTA } from './WhatsAppCTA';

export interface StickyMobileCTAProps {
  pageSrc?: string;
  defaultIntent?: string;
}

export function StickyMobileCTA({ pageSrc, defaultIntent }: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const location = useLocation();

  // Reset dismissal state on route change
  useEffect(() => {
    setIsDismissed(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero (350px)
      if (window.scrollY > 350 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) {
    return null;
  }

  // Determine tag from current pathname if not explicitly passed
  const getTagFromPath = (path: string): string => {
    if (path === '/') return 'sticky-home';
    if (path.includes('website-development')) return 'sticky-web-dev';
    if (path.includes('ecommerce')) return 'sticky-ecom';
    if (path.includes('seo')) return 'sticky-seo';
    if (path.includes('meta-ads')) return 'sticky-meta-ads';
    if (path.includes('pricing')) return 'sticky-pricing';
    if (path.includes('contact')) return 'sticky-contact';
    return `sticky-${path.replace(/[^a-zA-Z0-9]/g, '-')}`;
  };

  const activeSrc = pageSrc || getTagFromPath(location.pathname);
  const activeIntent = defaultIntent || 'Hi BM TechX — I am browsing on mobile and would like quick consultation';

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#08090D]/95 backdrop-blur-md border-t border-[#232636] shadow-[0_-5px_25px_rgba(0,0,0,0.8)] px-4 py-2.5 animate-in slide-in-from-bottom duration-300"
      role="complementary"
      aria-label="Quick WhatsApp Action Bar"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <div className="text-left">
            <p className="text-xs font-bold text-white flex items-center gap-1 font-display">
              <Sparkles className="w-3 h-3 text-[#FFE600]" />
              Need pricing details?
            </p>
            <p className="text-[10px] text-[#94A3B8]">Direct WhatsApp reply &lt; 15 mins</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <WhatsAppCTA
            src={activeSrc}
            intent={activeIntent}
            label="Chat"
            size="sm"
            variant="sticky"
            className="py-2 px-3 text-xs font-extrabold shadow-md bg-[#10B981] hover:bg-[#059669] text-white rounded-xl"
          />

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1.5 rounded-full text-[#94A3B8] hover:text-white hover:bg-[#1A1D2B]"
            aria-label="Dismiss sticky bar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default StickyMobileCTA;
