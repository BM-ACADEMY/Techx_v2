import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, Mail, ShieldCheck } from 'lucide-react';
import { getSiteConfig } from '@/data/dataLayer';

export const TrustFooter: FC = () => {
  const site = getSiteConfig();

  return (
    <footer className="bg-bm-navy-deep text-white pt-16 pb-12 border-t border-bm-navy" role="contentinfo">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Company Identity */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-2 inline-flex" aria-label="BM TechX Home">
              <div className="w-8 h-8 rounded-lg bg-white text-bm-navy flex items-center justify-center font-display font-extrabold text-base">
                X
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                {site.brand.name}
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-bm-navy-soft leading-relaxed max-w-md">
              {site.brand.description_30w}
            </p>
            <div className="pt-2 text-xs text-gray-300 space-y-1">
              <div>
                <strong>Legal Entity:</strong> {site.entity.legal_name}
              </div>
              <div>
                <strong>CIN:</strong> <span className="font-mono text-[11px] text-orange-300">{site.entity.cin}</span>
              </div>
              <div>
                <strong>Incorporated:</strong> {site.entity.incorporated} (MCA Registered)
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-bm-navy-soft">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link to="/services/website-development" className="hover:text-white transition-colors">Website Development</Link></li>
              <li><Link to="/services/ecommerce-website" className="hover:text-white transition-colors">eCommerce Stores</Link></li>
              <li><Link to="/services/seo" className="hover:text-white transition-colors">Local SEO Sprints</Link></li>
              <li><Link to="/services/meta-ads" className="hover:text-white transition-colors">Meta Ads Engine</Link></li>
              <li><Link to="/services/whatsapp-automation" className="hover:text-white transition-colors">WhatsApp Automation</Link></li>
              <li><Link to="/industries/real-estate" className="hover:text-white transition-colors">Real Estate Marketing</Link></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-bm-navy-soft">
              Regions Served
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              {site.service_area.map((area) => (
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
                <span>
                  {site.entity.registered_address.street}, {site.entity.registered_address.locality}{' '}
                  {site.entity.registered_address.postal_code}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${site.contact.whatsapp.number_e164}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {site.contact.whatsapp.display}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-300 shrink-0" />
                <a
                  href={`tel:+${site.contact.calls.number_e164}`}
                  className="hover:text-white transition-colors"
                >
                  Direct: {site.contact.calls.display}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-300 shrink-0" />
                <a
                  href="mailto:contact@bmtechx.in"
                  className="hover:text-white transition-colors"
                >
                  contact@bmtechx.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-bm-navy-soft">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>© 2026 {site.entity.legal_name}. {site.policy.gst_note}</span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-white transition-colors">About Team</Link>
            <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TrustFooter;
