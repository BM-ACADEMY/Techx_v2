import type { FC } from 'react'
import { MapPin, Phone, MessageSquare, Mail, Clock, ShieldCheck } from 'lucide-react'
import { SITE_CONFIG } from '@/data/siteData'

export const Footer: FC = () => {
  return (
    <footer className="bg-bm-navy-deep text-white pt-16 pb-12 border-t border-bm-navy">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Company Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white text-bm-navy flex items-center justify-center font-display font-extrabold text-base">
                X
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                BM Tech<span className="text-bm-orange">X</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-bm-navy-soft leading-relaxed max-w-md">
              {SITE_CONFIG.description}
            </p>
            <div className="pt-2 text-xs text-gray-300 space-y-1">
              <div>
                <strong>Entity:</strong> {SITE_CONFIG.legalName}
              </div>
              <div>
                <strong>CIN:</strong> <span className="font-mono text-[11px]">{SITE_CONFIG.cin}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-bm-navy-soft">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="#services" className="hover:text-white transition-colors">Website Development</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">eCommerce Stores</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Local SEO Sprints</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Meta Ads Engine</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">WhatsApp Automation</a></li>
              <li><a href="/blog/" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-bm-navy-soft">
              Regions Served
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              {SITE_CONFIG.serviceAreas.map((area) => (
                <li key={area} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-bm-orange/80" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Contact & NAP */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-bm-navy-soft">
              Registered Office
            </h4>
            <div className="space-y-2 text-xs text-gray-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-bm-orange shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${SITE_CONFIG.phones.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {SITE_CONFIG.phones.whatsappDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-300 shrink-0" />
                <a
                  href={`tel:+${SITE_CONFIG.phones.calls}`}
                  className="hover:text-white transition-colors"
                >
                  Direct: {SITE_CONFIG.phones.callsDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-300 shrink-0" />
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-[11px] pt-1">
                <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{SITE_CONFIG.operatingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-bm-navy-soft gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              © {new Date().getFullYear()} BM TechX · A unit of Afra Ventures Private Limited. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span>Built with React + Vite + Tailwind + shadcn/ui</span>
            <span>·</span>
            <span>99+ PageSpeed Engineered</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
