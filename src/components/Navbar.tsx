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
  const path = location.pathname.replace(/\/+$/, '') || '/';
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
    { label: 'All Services Overview', href: '/services/' },
    { label: 'Website Development (₹2,999)', href: '/services/website-development/' },
    { label: 'eCommerce Store (₹9,999)', href: '/services/ecommerce-website/' },
    { label: 'Google Maps SEO (From ₹2,999/mo)', href: '/services/seo/' },
    { label: 'Meta & Facebook Ads (₹4,999/mo)', href: '/services/meta-ads/' },
    { label: 'Instagram Management (From ₹7,999/mo)', href: '/services/social-media-marketing/' },
    { label: 'WhatsApp Automation (LeadOS)', href: '/services/whatsapp-automation/' },
    { label: 'Digital Invitations (From ₹999)', href: '/services/digital-invitations/' },
    { label: 'Verified Leads (From ₹12,000)', href: '/services/lead-generation/' },
    { label: 'Personal Branding (From ₹9,999/mo)', href: '/services/personal-branding/' },
    { label: 'Catering & Food Branding (From ₹6,999/mo)', href: '/services/catering-branding/' },
    { label: 'Quick-Start Add-Ons (From ₹999)', href: '/services/quick-start-add-ons/' },
    { label: 'Real Estate Marketing', href: '/industries/real-estate/' },
    { label: 'Clinic Websites', href: '/industries/clinics/' },
    { label: 'Doctor & Dentist Branding', href: '/industries/doctors-dentists/' },
    { label: 'Professional Branding', href: '/industries/professionals/' },
    { label: 'Coach & Educator Branding', href: '/industries/coaches-educators/' },
    { label: 'School Websites', href: '/industries/schools/' },
    { label: 'Restaurant & Shop Websites', href: '/industries/restaurants/' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 px-2 sm:px-4 pt-2 sm:pt-3 pointer-events-none"
      role="banner"
    >
      <div className={`nav-bar pointer-events-auto max-w-7xl mx-auto flex items-stretch gap-1.5 transition-all duration-300 ${scrolled ? 'nav-bar-scrolled' : ''}`}>
        {/* Brand logo tab */}
        <Link to="/" className="nav-logo group" aria-label="BM TechX Home">
          <img
            src="/logo.webp"
            width={364}
            height={108}
            alt="BM TechX Official Logo"
            className="h-6 sm:h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav
          className="nav-panel hidden md:flex flex-1 items-center justify-around gap-2 px-8 text-[13.5px] font-medium text-slate-800"
          role="navigation"
          aria-label="Main Navigation"
        >
          <Link
            to="/"
            className={`hover:text-black transition-colors py-1 ${
              path === '/' ? 'text-black font-extrabold border-b-2 border-[#FFE600]' : ''
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
            to="/pricing/"
            className={`hover:text-black transition-colors py-1 ${
              path === '/pricing' ? 'text-black font-extrabold border-b-2 border-[#FFE600]' : ''
            }`}
          >
            Pricing
          </Link>

          <Link
            to="/work/"
            className={`hover:text-black transition-colors py-1 ${
              path === '/work' ? 'text-black font-extrabold border-b-2 border-[#FFE600]' : ''
            }`}
          >
            Our Work
          </Link>

          <Link
            to="/about/"
            className={`hover:text-black transition-colors py-1 ${
              path === '/about' ? 'text-black font-extrabold border-b-2 border-[#FFE600]' : ''
            }`}
          >
            About
          </Link>

          <Link
            to="/blog/"
            className={`hover:text-black transition-colors py-1 ${
              path === '/blog' ? 'text-black font-extrabold border-b-2 border-[#FFE600]' : ''
            }`}
          >
            Blog
          </Link>

          <Link
            to="/contact/"
            className={`hover:text-black transition-colors py-1 ${
              path === '/contact' ? 'text-black font-extrabold border-b-2 border-[#FFE600]' : ''
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Quick CTA Actions */}
        <div className="hidden lg:flex items-stretch gap-2 pl-1">
          <button
            onClick={openWhatsApp}
            className="hidden 2xl:flex items-center gap-1.5 text-xs font-semibold text-[#10B981] hover:text-[#059669] px-3 py-2 rounded-xl hover:bg-emerald-50 transition-colors focus:ring-2 focus:ring-[#10B981]/30 focus:outline-none"
            aria-label="Contact BM TechX on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{site.contact.whatsapp.display}</span>
          </button>

          <button type="button" onClick={() => onOpenQuote()} className="slant-cta" aria-label="Get an instant quote">
            <span className="slant-cta-main"><Sparkles className="w-3.5 h-3.5" /> Get Instant Quote</span>
            <span className="slant-cta-arrow"><ArrowUpRight className="w-4 h-4" /></span>
          </button>
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="flex items-center gap-2 md:hidden ml-auto pr-1">
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
          className="md:hidden pointer-events-auto mt-2 bg-white border border-[#E2E8F0] px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-150"
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
          <Link to="/pricing/" className="block py-2 text-sm font-bold text-black border-b border-[#F1F5F9]">
            Pricing Plans (from ₹2,999)
          </Link>
          <Link to="/work/" className="block py-2 text-sm font-bold text-black border-b border-[#F1F5F9]">
            Our Work / Case Studies
          </Link>
          <Link to="/about/" className="block py-2 text-sm font-bold text-black border-b border-[#F1F5F9]">
            About BM TechX
          </Link>
          <Link to="/blog/" className="block py-2 text-sm font-bold text-black border-b border-[#F1F5F9]">
            Blog & Guides
          </Link>
          <Link to="/contact/" className="block py-2 text-sm font-bold text-black border-b border-[#F1F5F9]">
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
