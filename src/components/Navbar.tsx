import { useState, useEffect, useRef, type FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Menu, X, ArrowUpRight, Sparkles, ChevronDown, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSiteConfig } from '@/data/dataLayer';

interface NavbarProps {
  onOpenQuote: (service?: string) => void;
  onOpenClientPortal?: () => void;
}

export const Navbar: FC<NavbarProps> = ({ onOpenQuote, onOpenClientPortal }) => {
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
          ? 'bg-[#08090D]/95 backdrop-blur-md shadow-2xl border-b border-[#232636] py-3'
          : 'bg-[#08090D]/80 backdrop-blur-sm border-b border-[#232636]/40 py-4'
      }`}
      role="banner"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Official Logo */}
        <Link to="/" className="flex items-center gap-3 group" aria-label="BM TechX Home">
          <img
            src="/logo.png"
            alt="BM TechX Official Logo"
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <div className="hidden sm:flex flex-col">
            <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider bg-[#FFE600]/10 text-[#FFE600] border border-[#FFE600]/30 w-fit">
              v2.0 · Tamil Nadu
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#CBD5E1]"
          role="navigation"
          aria-label="Main Navigation"
        >
          <Link
            to="/"
            className={`hover:text-[#FFE600] transition-colors py-1 ${
              location.pathname === '/' ? 'text-[#FFE600] font-bold border-b-2 border-[#FFE600]' : ''
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
              className={`hover:text-[#FFE600] transition-colors py-1 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#FFE600]/30 rounded-md px-1.5 ${
                location.pathname.startsWith('/services') || location.pathname.startsWith('/industries')
                  ? 'text-[#FFE600] font-bold'
                  : ''
              }`}
            >
              Services <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {servicesDropdownOpen && (
              <div
                className="absolute top-full left-0 w-64 bg-[#12141D] border border-[#232636] rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                role="menu"
                aria-label="Services Submenu"
              >
                {services.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    role="menuitem"
                    className="block px-4 py-2 text-xs font-medium text-[#CBD5E1] hover:bg-[#1A1D2B] hover:text-[#FFE600] transition-colors focus:bg-[#1A1D2B] focus:outline-none"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/pricing"
            className={`hover:text-[#FFE600] transition-colors py-1 ${
              location.pathname === '/pricing' ? 'text-[#FFE600] font-bold border-b-2 border-[#FFE600]' : ''
            }`}
          >
            Pricing
          </Link>

          <Link
            to="/work"
            className={`hover:text-[#FFE600] transition-colors py-1 ${
              location.pathname === '/work' ? 'text-[#FFE600] font-bold border-b-2 border-[#FFE600]' : ''
            }`}
          >
            Our Work
          </Link>

          <Link
            to="/about"
            className={`hover:text-[#FFE600] transition-colors py-1 ${
              location.pathname === '/about' ? 'text-[#FFE600] font-bold border-b-2 border-[#FFE600]' : ''
            }`}
          >
            About
          </Link>

          <Link
            to="/blog"
            className={`hover:text-[#FFE600] transition-colors py-1 ${
              location.pathname === '/blog' ? 'text-[#FFE600] font-bold border-b-2 border-[#FFE600]' : ''
            }`}
          >
            Blog
          </Link>

          <Link
            to="/contact"
            className={`hover:text-[#FFE600] transition-colors py-1 ${
              location.pathname === '/contact' ? 'text-[#FFE600] font-bold border-b-2 border-[#FFE600]' : ''
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Quick CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Client Portal Button */}
          {onOpenClientPortal && (
            <button
              onClick={onOpenClientPortal}
              className="flex items-center gap-1.5 text-xs font-bold text-[#CBD5E1] hover:text-[#FFE600] px-3 py-2 rounded-xl border border-[#232636] hover:border-[#FFE600]/40 bg-[#12141D] transition-all focus:outline-none focus:ring-2 focus:ring-[#FFE600]/30"
              aria-label="Open Client Portal"
            >
              <Lock className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>Client Login</span>
            </button>
          )}

          <button
            onClick={openWhatsApp}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#10B981] hover:text-[#059669] px-3 py-2 rounded-xl hover:bg-[#10B981]/10 transition-colors focus:ring-2 focus:ring-[#10B981]/30 focus:outline-none"
            aria-label="Contact BM TechX on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{site.contact.whatsapp.display}</span>
          </button>

          <Button
            onClick={() => onOpenQuote()}
            variant="default"
            size="default"
            className="text-xs font-extrabold shadow-lg gap-1.5 bg-[#FFE600] hover:bg-[#FFD000] text-black shadow-[0_0_20px_rgba(255,230,0,0.25)] rounded-xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            Get Instant Quote
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </Button>
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          {onOpenClientPortal && (
            <button
              onClick={onOpenClientPortal}
              className="p-2 rounded-xl border border-[#232636] bg-[#12141D] text-[#FFE600] text-xs font-bold flex items-center gap-1"
              aria-label="Client Login"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Portal</span>
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border border-[#232636] bg-[#12141D] hover:bg-[#1A1D2B] text-white focus:outline-none focus:ring-2 focus:ring-[#FFE600]/30"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#FFE600]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden bg-[#08090D] border-b border-[#232636] px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-150"
          role="dialog"
          aria-label="Mobile Navigation Menu"
        >
          <Link to="/" className="block py-2 text-sm font-bold text-white border-b border-[#232636]">
            Home
          </Link>
          <div className="py-2 border-b border-[#232636] space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#FFE600]">Services</p>
            {services.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block pl-2 py-2 text-xs text-[#CBD5E1] hover:text-[#FFE600] font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link to="/pricing" className="block py-2 text-sm font-bold text-white border-b border-[#232636]">
            Pricing Plans (from ₹2,999)
          </Link>
          <Link to="/work" className="block py-2 text-sm font-bold text-white border-b border-[#232636]">
            Our Work / Case Studies
          </Link>
          <Link to="/about" className="block py-2 text-sm font-bold text-white border-b border-[#232636]">
            About BM TechX
          </Link>
          <Link to="/blog" className="block py-2 text-sm font-bold text-white border-b border-[#232636]">
            Blog & Guides
          </Link>
          <Link to="/contact" className="block py-2 text-sm font-bold text-white border-b border-[#232636]">
            Contact & WhatsApp
          </Link>

          <Button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuote();
            }}
            className="w-full bg-[#FFE600] hover:bg-[#FFD000] text-black font-extrabold py-3.5 mt-2 rounded-xl shadow-[0_0_20px_rgba(255,230,0,0.25)]"
          >
            Get Instant Quote
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
