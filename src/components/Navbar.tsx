import { useState, useEffect, useRef, type FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Menu, X, ArrowUpRight, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSiteConfig } from '@/data/dataLayer';

interface NavbarProps {
  onOpenQuote: (service?: string) => void;
}

export const Navbar: FC<NavbarProps> = ({ onOpenQuote }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const site = getSiteConfig();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key to close menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello BM TechX team! I'm browsing your website and would like to discuss my project requirements.\n[src:navbar-direct]`
    );
    window.open(`https://wa.me/${site.contact.whatsapp.number_e164}?text=${text}`, '_blank');
  };

  const services = [
    { label: 'All Services Overview', href: '/services' },
    { label: 'Website Development (₹2,999)', href: '/services/website-development' },
    { label: 'eCommerce Store (₹9,999)', href: '/services/ecommerce-website' },
    { label: 'SEO Retainers (From ₹4,999/mo)', href: '/services/seo' },
    { label: 'Meta & Facebook Ads (₹4,999/mo)', href: '/services/meta-ads' },
    { label: 'Social Media Management (₹6,999/mo)', href: '/services/social-media-marketing' },
    { label: 'WhatsApp Automation (LeadOS)', href: '/services/whatsapp-automation' },
    { label: 'Real Estate Marketing', href: '/industries/real-estate' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F7F5F1]/95 backdrop-blur-md shadow-sm border-b border-border py-3'
          : 'bg-[#F7F5F1]/80 backdrop-blur-sm py-4'
      }`}
      role="banner"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group" aria-label="BM TechX Home">
          <div className="w-9 h-9 rounded-xl bg-bm-navy flex items-center justify-center text-white font-display font-extrabold text-lg shadow-sm group-hover:scale-105 transition-transform">
            <span>X</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-display font-extrabold text-xl text-bm-navy tracking-tight">
                {site.brand.name}
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-bm-navy/10 text-bm-navy">
                v2.0
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground font-medium mt-0.5">
              Tamil Nadu & Pondy
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground/80"
          role="navigation"
          aria-label="Main Navigation"
        >
          <Link
            to="/"
            className={`hover:text-bm-navy transition-colors py-1 ${
              location.pathname === '/' ? 'text-bm-navy font-bold border-b-2 border-bm-orange' : ''
            }`}
          >
            Home
          </Link>

          {/* Accessible Services Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <button
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              aria-expanded={servicesDropdownOpen}
              aria-haspopup="true"
              className={`hover:text-bm-navy transition-colors py-1 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-bm-navy/20 rounded-md px-1.5 ${
                location.pathname.startsWith('/services') || location.pathname.startsWith('/industries')
                  ? 'text-bm-navy font-bold'
                  : ''
              }`}
            >
              Services <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {servicesDropdownOpen && (
              <div
                className="absolute top-full left-0 w-64 bg-white border border-bm-line rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                role="menu"
                aria-label="Services Submenu"
              >
                {services.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    role="menuitem"
                    className="block px-4 py-2 text-xs font-medium text-bm-ink hover:bg-bm-wash-cool hover:text-bm-navy transition-colors focus:bg-bm-wash-cool focus:outline-none"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/pricing"
            className={`hover:text-bm-navy transition-colors py-1 ${
              location.pathname === '/pricing' ? 'text-bm-navy font-bold border-b-2 border-bm-orange' : ''
            }`}
          >
            Pricing
          </Link>

          <Link
            to="/work"
            className={`hover:text-bm-navy transition-colors py-1 ${
              location.pathname === '/work' ? 'text-bm-navy font-bold border-b-2 border-bm-orange' : ''
            }`}
          >
            Our Work
          </Link>

          <Link
            to="/about"
            className={`hover:text-bm-navy transition-colors py-1 ${
              location.pathname === '/about' ? 'text-bm-navy font-bold border-b-2 border-bm-orange' : ''
            }`}
          >
            About
          </Link>

          <Link
            to="/blog"
            className={`hover:text-bm-navy transition-colors py-1 ${
              location.pathname === '/blog' ? 'text-bm-navy font-bold border-b-2 border-bm-orange' : ''
            }`}
          >
            Blog
          </Link>

          <Link
            to="/contact"
            className={`hover:text-bm-navy transition-colors py-1 ${
              location.pathname === '/contact' ? 'text-bm-navy font-bold border-b-2 border-bm-orange' : ''
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Quick CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={openWhatsApp}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#1E7A4D] hover:text-[#17603C] px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            aria-label="Contact BM TechX on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{site.contact.whatsapp.display}</span>
          </button>

          <Button
            onClick={() => onOpenQuote()}
            variant="default"
            size="default"
            className="text-xs font-semibold shadow-sm gap-1.5 bg-bm-navy hover:bg-bm-navy-deep text-white"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-300" />
            Get Instant Quote
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </Button>
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-lg hover:bg-bm-ground-alt text-bm-ink focus:outline-none focus:ring-2 focus:ring-bm-navy/30"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden bg-white border-b border-bm-line px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150"
          role="dialog"
          aria-label="Mobile Navigation Menu"
        >
          <Link to="/" className="block py-2 text-sm font-bold text-bm-navy border-b border-bm-line/50">
            Home
          </Link>
          <div className="py-2 border-b border-bm-line/50 space-y-1.5">
            <p className="text-xs font-bold uppercase text-bm-ink-faint">Services</p>
            {services.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block pl-2 py-2 text-xs text-bm-ink hover:text-bm-navy font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link to="/pricing" className="block py-2 text-sm font-bold text-bm-navy border-b border-bm-line/50">
            Pricing Plans (from ₹2,999)
          </Link>
          <Link to="/work" className="block py-2 text-sm font-bold text-bm-navy border-b border-bm-line/50">
            Our Work / Case Studies
          </Link>
          <Link to="/about" className="block py-2 text-sm font-bold text-bm-navy border-b border-bm-line/50">
            About BM TechX
          </Link>
          <Link to="/blog" className="block py-2 text-sm font-bold text-bm-navy border-b border-bm-line/50">
            Blog & Guides
          </Link>
          <Link to="/contact" className="block py-2 text-sm font-bold text-bm-navy border-b border-bm-line/50">
            Contact & WhatsApp
          </Link>

          <Button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuote();
            }}
            className="w-full bg-bm-navy hover:bg-bm-navy-deep text-white font-bold py-3.5 mt-2"
          >
            Get Instant Quote
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
