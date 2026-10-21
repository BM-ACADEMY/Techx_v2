import { useState, useEffect, useRef, type FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Menu, X, ArrowUpRight, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSiteConfig } from '@/data/dataLayer';
import { openWhatsApp as openWhatsAppChat } from '@/lib/whatsapp';

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
    openWhatsAppChat(
      `Hello BM TechX team! I'm browsing your website and would like to discuss my project requirements.\n[src:navbar-direct]`
    );
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
    { label: 'Clinic Websites', href: '/industries/clinics' },
    { label: 'School Websites', href: '/industries/schools' },
    { label: 'Restaurant & Shop Websites', href: '/industries/restaurants' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E2E8F0] py-3'
          : 'bg-[#F8F9FA]/85 backdrop-blur-sm border-b border-[#E2E8F0]/70 py-4'
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
            <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider bg-black text-[#FFE600] border border-black w-fit">
              v2.0 · Tamil Nadu
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700"
          role="navigation"
          aria-label="Main Navigation"
        >
          <Link
            to="/"
            className={`hover:text-black transition-colors py-1 ${
              location.pathname === '/' ? 'text-black font-extrabold border-b-2 border-[#FFE600]' : ''
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
              className={`hover:text-black transition-colors py-1 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#FFE600]/30 rounded-md px-1.5 ${
                location.pathname.startsWith('/services') || location.pathname.startsWith('/industries')
                  ? 'text-black font-extrabold'
                  : ''
              }`}
            >
              Services <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {servicesDropdownOpen && (
              <div
                className="absolute top-full left-0 w-64 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                role="menu"
                aria-label="Services Submenu"
              >
                {services.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    role="menuitem"
                    className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-[#F8F9FA] hover:text-black transition-colors focus:bg-[#F8F9FA] focus:outline-none"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/pricing"
            className={`hover:text-black transition-colors py-1 ${
              location.pathname === '/pricing' ? 'text-black font-extrabold border-b-2 border-[#FFE600]' : ''
            }`}
          >
            Pricing
          </Link>

          <Link
            to="/work"
            className={`hover:text-black transition-colors py-1 ${
              location.pathname === '/work' ? 'text-black font-extrabold border-b-2 border-[#FFE600]' : ''
            }`}
          >
            Our Work
          </Link>

          <Link
            to="/about"
            className={`hover:text-black transition-colors py-1 ${
              location.pathname === '/about' ? 'text-black font-extrabold border-b-2 border-[#FFE600]' : ''
            }`}
          >
            About
          </Link>

          <Link
            to="/blog"
            className={`hover:text-black transition-colors py-1 ${
              location.pathname === '/blog' ? 'text-black font-extrabold border-b-2 border-[#FFE600]' : ''
            }`}
          >
            Blog
          </Link>

          <Link
            to="/contact"
            className={`hover:text-black transition-colors py-1 ${
              location.pathname === '/contact' ? 'text-black font-extrabold border-b-2 border-[#FFE600]' : ''
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Quick CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={openWhatsApp}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#10B981] hover:text-[#059669] px-3 py-2 rounded-xl hover:bg-emerald-50 transition-colors focus:ring-2 focus:ring-[#10B981]/30 focus:outline-none"
            aria-label="Contact BM TechX on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{site.contact.whatsapp.display}</span>
          </button>

          <Button
            onClick={() => onOpenQuote()}
            variant="default"
            size="default"
            className="text-xs font-extrabold shadow-md gap-1.5 bg-[#FFE600] hover:bg-[#FFD000] text-black rounded-xl border border-black/10"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            Get Instant Quote
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </Button>
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8F9FA] text-black focus:outline-none focus:ring-2 focus:ring-[#FFE600]/30 shadow-sm"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-black" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden bg-white border-b border-[#E2E8F0] px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-150"
          role="dialog"
          aria-label="Mobile Navigation Menu"
        >
          <Link to="/" className="block py-2 text-sm font-bold text-black border-b border-[#F1F5F9]">
            Home
          </Link>
          <div className="py-2 border-b border-[#F1F5F9] space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-black bg-[#FFE600]/30 px-2 py-0.5 rounded w-fit">Services</p>
            {services.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block pl-2 py-2 text-xs text-slate-700 hover:text-black font-semibold"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link to="/pricing" className="block py-2 text-sm font-bold text-black border-b border-[#F1F5F9]">
            Pricing Plans (from ₹2,999)
          </Link>
          <Link to="/work" className="block py-2 text-sm font-bold text-black border-b border-[#F1F5F9]">
            Our Work / Case Studies
          </Link>
          <Link to="/about" className="block py-2 text-sm font-bold text-black border-b border-[#F1F5F9]">
            About BM TechX
          </Link>
          <Link to="/blog" className="block py-2 text-sm font-bold text-black border-b border-[#F1F5F9]">
            Blog & Guides
          </Link>
          <Link to="/contact" className="block py-2 text-sm font-bold text-black border-b border-[#F1F5F9]">
            Contact & WhatsApp
          </Link>

          <Button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuote();
            }}
            className="w-full bg-[#FFE600] hover:bg-[#FFD000] text-black font-extrabold py-3.5 mt-2 rounded-xl shadow-md border border-black/10"
          >
            Get Instant Quote
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
