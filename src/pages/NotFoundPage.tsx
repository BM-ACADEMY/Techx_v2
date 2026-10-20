import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  MessageSquare, 
  ArrowLeft, 
  Globe, 
  ShoppingBag, 
  Search, 
  Megaphone, 
  Bot, 
  CreditCard,
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/data/siteData';

export function NotFoundPage() {
  useEffect(() => {
    document.title = "Page Not Found (404) | BM TechX";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'The page you requested could not be found. Explore BM TechX services, transparent pricing, or message our team directly.'
      );
    }
  }, []);

  const handleWhatsAppHelp = () => {
    const text = encodeURIComponent('Hi BM TechX team — I landed on a missing page on your website [src:404]');
    window.open(`https://wa.me/${SITE_CONFIG.phones.whatsapp}?text=${text}`, '_blank');
  };

  const destinations = [
    { name: 'Website Development (48h)', path: '/services/website-development', icon: Globe, price: 'from ₹2,999' },
    { name: 'eCommerce Stores', path: '/services/ecommerce', icon: ShoppingBag, price: '₹9,999 flat' },
    { name: 'SEO & Google Maps Rank', path: '/services/seo', icon: Search, price: 'from ₹4,999/mo' },
    { name: 'Meta & Instagram Ads', path: '/services/meta-ads', icon: Megaphone, price: '₹7,499/mo' },
    { name: 'WhatsApp Sales Autopilot', path: '/services/whatsapp-automation', icon: Bot, price: '₹3,999/mo' },
    { name: 'Master Pricing Table', path: '/pricing', icon: CreditCard, price: 'All published' },
    { name: 'About & Company Registration', path: '/about', icon: Building2, price: 'Afra Ventures' },
  ];

  return (
    <div className="py-20 px-4 max-w-3xl mx-auto text-center space-y-10">
      {/* 404 Badge & Heading */}
      <div className="space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-bm-wash-warm text-bm-terracotta border-2 border-bm-wash-warm-line rounded-3xl text-3xl font-black shadow-sm">
          404
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-bm-navy-deep tracking-tight">
          Page Not Found
        </h1>
        <p className="text-bm-ink-muted text-base max-w-lg mx-auto leading-relaxed">
          The link you followed may be outdated, moved, or misspelled. Use the options below to find what you need or message our team immediately.
        </p>
      </div>

      {/* Primary Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button asChild className="bg-bm-navy hover:bg-bm-navy-deep text-white font-bold w-full sm:w-auto px-6 py-2.5">
          <Link to="/" className="flex items-center gap-2">
            <Home className="w-4 h-4" /> Return to Homepage
          </Link>
        </Button>
        <Button
          variant="outline"
          onClick={handleWhatsAppHelp}
          className="w-full sm:w-auto flex items-center gap-2 text-emerald-800 border-emerald-300 hover:bg-emerald-50 font-bold px-6 py-2.5"
        >
          <MessageSquare className="w-4 h-4 text-emerald-700" /> WhatsApp Instant Help
        </Button>
      </div>

      {/* Structured Site Directory Links */}
      <div className="bg-white rounded-2xl border border-bm-line p-6 sm:p-8 text-left space-y-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-bm-line/60 pb-3">
          <h2 className="text-sm font-bold text-bm-navy-deep uppercase tracking-wider">
            Explore All Direct Pages
          </h2>
          <span className="text-xs text-bm-ink-faint">100% Fixed Prices</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {destinations.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="group flex items-center justify-between p-3 rounded-xl border border-bm-line hover:border-bm-navy/40 hover:bg-bm-wash-cool/40 transition-all"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-bm-wash-cool text-bm-navy flex items-center justify-center flex-shrink-0 group-hover:bg-bm-navy group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-bm-navy-deep group-hover:text-bm-navy truncate">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-bm-ink-faint">{item.price}</p>
                  </div>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-bm-ink-faint rotate-180 group-hover:translate-x-0.5 transition-transform flex-shrink-0 ml-2" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
