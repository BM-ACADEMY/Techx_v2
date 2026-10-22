import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, Mail, ShieldCheck } from 'lucide-react';
import { getSiteConfig } from '@/data/dataLayer';

interface TrustFooterProps {
  onOpenPrivacy?: () => void;
}

export const TrustFooter: FC<TrustFooterProps> = ({ onOpenPrivacy }) => {
  const site = getSiteConfig();

  return (
    <footer className="bg-[#050608] text-[#F8FAFC] pt-16 pb-12 border-t border-[#232636]" role="contentinfo">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#232636]">
          {/* Company Identity */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-2 inline-flex group" aria-label="BM TechX Home">
              <img
                src="/logo.png"
                alt="BM TechX Official Logo"
                className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-md">
              {site.brand.description_30w}
            </p>
            <div className="pt-2 text-xs text-[#CBD5E1] space-y-1.5 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-[#94A3B8]">Legal Entity:</span>
                <span className="text-white font-bold">{site.entity.legal_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#94A3B8]">Corporate CIN:</span>
                <span className="text-[#FFE600] font-bold">{site.entity.cin}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#94A3B8]">GSTIN:</span>
                <span className="text-white font-bold">{site.entity.gstin}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#94A3B8]">MCA Status:</span>
                <span className="text-emerald-400 font-semibold">Incorporated {site.entity.incorporated}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFE600]">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs text-[#CBD5E1]">
              <li><Link to="/services/website-development" className="hover:text-[#FFE600] transition-colors">Website Development</Link></li>
              <li><Link to="/services/ecommerce-website" className="hover:text-[#FFE600] transition-colors">eCommerce Stores</Link></li>
              <li><Link to="/services/seo" className="hover:text-[#FFE600] transition-colors">Local SEO Sprints</Link></li>
              <li><Link to="/services/meta-ads" className="hover:text-[#FFE600] transition-colors">Meta Ads Engine</Link></li>
              <li><Link to="/services/whatsapp-automation" className="hover:text-[#FFE600] transition-colors">WhatsApp Automation</Link></li>
              <li><Link to="/services/digital-invitations" className="hover:text-[#FFE600] transition-colors">Digital Invitations</Link></li>
              <li><Link to="/services/lead-generation" className="hover:text-[#FFE600] transition-colors">Verified Leads</Link></li>
              <li><Link to="/services/personal-branding" className="hover:text-[#FFE600] transition-colors">Personal Branding</Link></li>
              <li><Link to="/services/catering-branding" className="hover:text-[#FFE600] transition-colors">Catering Branding</Link></li>
              <li><Link to="/industries/real-estate" className="hover:text-[#FFE600] transition-colors">Real Estate Marketing</Link></li>
              <li><Link to="/industries/doctors-dentists" className="hover:text-[#FFE600] transition-colors">Doctor & Dentist Branding</Link></li>
              <li><Link to="/industries/professionals" className="hover:text-[#FFE600] transition-colors">Professional Branding</Link></li>
              <li><Link to="/industries/coaches-educators" className="hover:text-[#FFE600] transition-colors">Coach & Educator Branding</Link></li>
              <li><Link to="/industries/clinics" className="hover:text-[#FFE600] transition-colors">Clinic Websites</Link></li>
              <li><Link to="/industries/schools" className="hover:text-[#FFE600] transition-colors">School Websites</Link></li>
              <li><Link to="/industries/restaurants" className="hover:text-[#FFE600] transition-colors">Restaurant & Shop Websites</Link></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFE600]">
              Regions Served
            </h4>
            <ul className="space-y-1.5 text-xs text-[#CBD5E1]">
              {site.service_area.map((area) => (
                <li key={area} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600]" />
                  {['puducherry','cuddalore','villupuram','chennai','madurai','tiruchirappalli','namakkal'].includes(area.toLowerCase()) ? (
                    <Link to={`/locations/${area.toLowerCase()}`} className="hover:text-[#FFE600] transition-colors">{area}</Link>
                  ) : (
                    <span>{area}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Official Contact & NAP */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFE600]">
              Registered Office
            </h4>
            <div className="space-y-2 text-xs text-[#CBD5E1]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFE600] shrink-0 mt-0.5" />
                <span className="text-[#94A3B8]">
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
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp: {site.contact.whatsapp.display}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FFE600] shrink-0" />
                <a
                  href={`tel:+${site.contact.calls.number_e164}`}
                  className="hover:text-[#FFE600] transition-colors"
                >
                  Direct: {site.contact.calls.display}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a
                  href="mailto:admin@bmtechx.in"
                  className="hover:text-cyan-400 transition-colors"
                >
                  admin@bmtechx.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>© 2026 {site.entity.legal_name}. {site.policy.gst_note}</span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-[#FFE600] transition-colors">About Team</Link>
            <Link to="/pricing" className="hover:text-[#FFE600] transition-colors">Pricing</Link>
            <Link to="/contact" className="hover:text-[#FFE600] transition-colors">Contact</Link>
            <Link to="/blog" className="hover:text-[#FFE600] transition-colors">Blog</Link>
            {onOpenPrivacy && (
              <button type="button" onClick={onOpenPrivacy} className="hover:text-[#FFE600] transition-colors underline underline-offset-2">
                Privacy Policy
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TrustFooter;
