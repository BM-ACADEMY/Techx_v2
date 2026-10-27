import { useState, useEffect, type FC } from 'react'
import { MessageSquare, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/data/siteData'

interface NavbarProps {
  onOpenQuote: (service?: string) => void
}

export const Navbar: FC<NavbarProps> = ({ onOpenQuote }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Pricing Plans', href: '#pricing' },
    { label: 'Speed Proof', href: '#proof' },
    { label: 'Cost Calculator', href: '#calculator' },
    { label: 'Why Custom Code', href: '#comparison' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Blog', href: '/blog/' },
  ]

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello BM TechX team! I'm browsing your website and would like to discuss my project requirements.\n[src:navbar-direct]`
    )
    window.open(`https://wa.me/${SITE_CONFIG.phones.whatsapp}?text=${text}`, '_blank')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F7F5F1]/90 backdrop-blur-md shadow-sm border-b border-border py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-bm-navy flex items-center justify-center text-white font-display font-extrabold text-lg shadow-sm group-hover:scale-105 transition-transform">
            <span>X</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-display font-extrabold text-xl text-bm-navy tracking-tight">
                BM Tech<span className="text-bm-orange">X</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-bm-navy/10 text-bm-navy">
                v2.0
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground font-medium mt-0.5">
              Tamil Nadu & Pondy
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-foreground/80">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-bm-navy transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-bm-orange hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Quick CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={openWhatsApp}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#1E7A4D] hover:text-[#17603C] px-3 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>+91 94038 92971</span>
          </button>

          <Button
            onClick={() => onOpenQuote()}
            variant="default"
            size="default"
            className="text-xs font-semibold shadow-sm gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-300" />
            Get Instant Quote
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            onClick={() => onOpenQuote()}
            size="sm"
            variant="action"
            className="text-xs px-2.5 h-8 font-semibold"
          >
            Quote
          </Button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-foreground hover:bg-muted"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-border shadow-xl px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2 text-base font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-secondary text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-border flex flex-col gap-2.5">
            <Button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenQuote()
              }}
              className="w-full justify-center"
            >
              Get Instant Quote
            </Button>
            <Button
              onClick={() => {
                setMobileMenuOpen(false)
                openWhatsApp()
              }}
              variant="action"
              className="w-full justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp Us: +91 94038 92971
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
