import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ShieldCheck,
  ExternalLink,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { getSiteConfig } from '@/data/dataLayer';
import { buildWhatsAppUrl, isValidIndianMobile, openWhatsApp, sendLead } from '@/lib/whatsapp';

export function ContactPage() {
  const site = getSiteConfig();

  // Form State
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    business_name: '',
    service_interested: 'web-multi',
    notes: '',
  });

  // Anti-spam Honeypot and Time-to-Submit tracking
  const [honeypot, setHoneypot] = useState('');
  const mountTimeRef = useRef<number>(Date.now());

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  // SEO Title & Schema Injection
  useEffect(() => {

    // Inject ContactPage & LocalBusiness Schema
    const schemaId = 'contact-page-schema';
    let scriptTag = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ContactPage',
          '@id': 'https://bmtechx.in/contact/#webpage',
          url: 'https://bmtechx.in/contact/',
          name: 'Contact BM TechX | Pondicherry Digital Agency',
          description:
            'Message us on WhatsApp and get a written scope and price before you pay anything. Based in Puducherry, working across Tamil Nadu.',
        },
        {
          '@type': 'ProfessionalService',
          '@id': 'https://bmtechx.in/#localbusiness',
          name: 'BM TechX',
          url: 'https://bmtechx.in',
          telephone: site.contact.calls.display,
          priceRange: '₹₹',
          address: {
            '@type': 'PostalAddress',
            streetAddress: site.entity.registered_address.street,
            addressLocality: site.entity.registered_address.locality,
            addressRegion: site.entity.registered_address.region,
            postalCode: site.entity.registered_address.postal_code,
            addressCountry: site.entity.registered_address.country,
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '10:00',
              closes: '19:00',
            },
          ],
          areaServed: [
            { '@type': 'City', name: 'Puducherry' },
            { '@type': 'City', name: 'Cuddalore' },
            { '@type': 'City', name: 'Villupuram' },
            { '@type': 'City', name: 'Chennai' },
            { '@type': 'City', name: 'Madurai' },
          ],
          knowsLanguage: ['en', 'ta'],
        },
      ],
    };

    scriptTag.textContent = JSON.stringify(schemaData);

    return () => {
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [site]);

  // Handle Form Submission with Honeypot & Timing Check
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // 1. Bot check: Honeypot field filled
    if (honeypot.trim().length > 0) {
      console.warn('Bot rejection: honeypot triggered');
      setIsSubmitted(true);
      return;
    }

    // 2. Bot check: Time to submit < 2 seconds
    const elapsedSeconds = (Date.now() - mountTimeRef.current) / 1000;
    if (elapsedSeconds < 2) {
      console.warn('Bot rejection: submission too fast (<2s)');
      setIsSubmitted(true);
      return;
    }

    // 3. Normalize phone number (standardize to 10 digits or E.164 without plus)
    const rawPhone = formState.phone.replace(/[^0-9]/g, '');
    let normalizedPhone = rawPhone;
    if (rawPhone.length === 10) {
      normalizedPhone = `91${rawPhone}`;
    }

    if (!formState.name.trim() || !isValidIndianMobile(formState.phone)) {
      setSubmitError('Please enter your name and a valid 10-digit Indian mobile number.');
      return;
    }

    setIsSubmitting(true);

    const serviceLabel =
      serviceOptions.find((o) => o.value === formState.service_interested)?.label ||
      formState.service_interested;

    const message =
      `Hello BM TechX Team!\n\nI sent an enquiry from your Contact page:\n` +
      `\u2022 Name: ${formState.name.trim()}\n` +
      `\u2022 Business: ${formState.business_name.trim() || 'Not specified'}\n` +
      `\u2022 Phone: ${normalizedPhone}\n` +
      `\u2022 Service: ${serviceLabel}\n` +
      (formState.notes.trim() ? `\u2022 Notes: ${formState.notes.trim()}\n` : '') +
      `\n[src:contact-page-form]`;

    // 1. Store the lead in the Leads sheet (no-op if VITE_LEAD_ENDPOINT is not set).
    sendLead({
      name: formState.name.trim(),
      phone: normalizedPhone,
      business: formState.business_name.trim(),
      service: serviceLabel,
      notes: formState.notes.trim(),
      source: 'contact-page-form',
    });

    // 2. Open WhatsApp from inside the submit handler so popup blockers allow it.
    //    WhatsApp is the real delivery channel, so the visitor never sees a fake "sent".
    openWhatsApp(message);
    setWhatsappUrl(buildWhatsAppUrl(message));
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleResetForm = () => {
    setFormState({
      name: '',
      phone: '',
      email: '',
      business_name: '',
      service_interested: 'web-multi',
      notes: '',
    });
    setHoneypot('');
    setWhatsappUrl('');
    mountTimeRef.current = Date.now();
    setIsSubmitted(false);
  };

  const serviceOptions = [
    { value: 'web-single', label: 'Single-Page Website — ₹2,999 (48h SLA)' },
    { value: 'web-multi', label: 'Multi-Page Website — ₹4,999 (5–7 Days)' },
    { value: 'store-basic', label: 'Online Store / Ecommerce — ₹9,999 (No renewal fee)' },
    { value: 'seo-starter', label: 'Google Maps SEO — From ₹2,999/month' },
    { value: 'ads-standard', label: 'Meta / Facebook Ads — From ₹8,999/month' },
    { value: 'smm-starter', label: 'Instagram Management — From ₹7,999/month' },
    { value: 'digital-invitation', label: 'Digital Invitation — From ₹999' },
    { value: 'lead-package', label: 'Verified Leads Package — ₹12,000 / ₹20,000' },
    { value: 'personal-branding', label: 'Personal Branding — From ₹9,999/month' },
    { value: 'catering-branding', label: 'Catering Branding — From ₹6,999/month' },
    { value: 'quick-start', label: 'Quick-Start Add-On — From ₹999' },
    { value: 'quote-whatsapp', label: 'WhatsApp Automation / LeadOS' },
    { value: 'custom-scope', label: 'Not sure — need advice / custom scope' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* ========================================================= */}
      {/* BLOCK 1 — H1 + ANSWER FIRST + PRIMARY WHATSAPP HERO       */}
      {/* ========================================================= */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-800">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>WhatsApp-Native Agency · Reply in &lt; 15 Mins During Work Hours</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-bm-navy-deep font-display tracking-tight">
          Talk to us on WhatsApp
        </h1>

        <p className="text-base sm:text-xl text-bm-ink font-medium leading-relaxed max-w-3xl mx-auto bg-white border border-bm-line p-6 sm:p-8 rounded-3xl shadow-sm">
          The fastest way to reach us is WhatsApp — message any hour and you will get a first reply within minutes. Tell us what you sell and what you need, and we will send back a written scope and a price before you pay anything.
        </p>

        {/* Primary Hero WhatsApp Action Card */}
        <div className="bg-gradient-to-br from-bm-navy-deep via-bm-brand to-[#08182b] text-white p-6 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden border border-bm-brand-soft/30 max-w-3xl mx-auto text-left">
          <div className="relative z-10 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-300 border border-white/15">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Engineering & Delivery Leads Online
              </div>
              <span className="text-xs text-bm-brand-soft font-mono">Puducherry HQ</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Instant WhatsApp Consultation
              </h2>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                Skip lengthy email exchanges and sales calls. You connect directly with the strategists and developers building your project.
              </p>
            </div>

            <div className="pt-2">
              <WhatsAppCTA
                src="contact-page"
                intent="Hi BM TechX — I'd like to get a scope and price for my business."
                label="Message us on WhatsApp"
                variant="primary"
                className="w-full sm:w-auto text-base sm:text-lg py-4 px-8 justify-center shadow-emerald-950/40 shadow-xl"
              />
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-bm-brand-soft pt-1 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Average reply: 5–15 mins
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Written quote before payment
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Zero pushy follow-ups
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 2 — THE OTHER DIRECT CHANNELS (GRID)                */}
      {/* ========================================================= */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-bm-navy-deep font-display">
            Direct Contact Channels
          </h2>
          <p className="text-sm text-bm-ink-muted">
            All official phone lines, operating hours and registered entity details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Direct Calling Line */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-bm-line shadow-sm space-y-4 hover:border-bm-brand-soft transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-bm-wash-cool text-bm-navy flex items-center justify-center border border-bm-brand-soft/40">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-bm-navy-deep">Direct Calling Line</h3>
              <p className="text-xs text-bm-ink-muted leading-relaxed">
                Speak directly with our strategy desk for new projects, scope inquiries, or current campaign check-ins.
              </p>
            </div>

            <div className="pt-3 border-t border-bm-line-soft">
              <a
                href={`tel:${site.contact.calls.display.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 text-base font-extrabold text-bm-navy hover:text-bm-orange transition-colors"
              >
                <span>{site.contact.calls.display}</span>
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>
              <p className="text-[11px] text-bm-ink-faint mt-1">Direct voice line · Mon–Sat</p>
            </div>
          </div>

          {/* Card 2: Business Operating Hours */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-bm-line shadow-sm space-y-4 hover:border-bm-brand-soft transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-bm-wash-cool text-bm-navy flex items-center justify-center border border-bm-brand-soft/40">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-bm-navy-deep">Working Hours</h3>
              <p className="text-xs text-bm-ink-muted leading-relaxed">
                Engineers and strategists active in Puducherry. WhatsApp inquiries received outside these hours are queued for first-thing morning response.
              </p>
            </div>

            <div className="pt-3 border-t border-bm-line-soft space-y-1 text-xs">
              <div className="flex justify-between items-center text-bm-ink font-semibold">
                <span>Monday – Friday</span>
                <span className="font-mono text-bm-navy">{site.contact.hours.mon_fri}</span>
              </div>
              <div className="flex justify-between items-center text-bm-ink font-semibold">
                <span>Saturday</span>
                <span className="font-mono text-bm-navy">{site.contact.hours.sat}</span>
              </div>
              <div className="flex justify-between items-center text-bm-ink-faint">
                <span>Sunday</span>
                <span className="text-bm-accent-price font-bold uppercase text-[10px]">Closed</span>
              </div>
            </div>
          </div>

          {/* Card 3: Registered Office & Entity */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-bm-line shadow-sm space-y-4 hover:border-bm-brand-soft transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-bm-wash-cool text-bm-navy flex items-center justify-center border border-bm-brand-soft/40">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-bm-navy-deep">Registered Office</h3>
              <p className="text-xs text-bm-ink leading-relaxed">
                {site.entity.registered_address.street}, {site.entity.registered_address.locality}, {site.entity.registered_address.region} {site.entity.registered_address.postal_code}.
              </p>
            </div>

            <div className="pt-3 border-t border-bm-line-soft text-[11px] text-bm-ink-muted space-y-1">
              <p className="font-bold text-bm-navy-deep">{site.entity.legal_name}</p>
              <p className="font-mono text-[10px] text-bm-ink-faint">CIN: {site.entity.cin}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 3 — EMBEDDED MAP & OFFICE LOCATION                  */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-bm-navy-deep font-display">
              Visit Our Puducherry Office
            </h2>
            <p className="text-xs sm:text-sm text-bm-ink-muted mt-1">
              Located in Kosapalayam, Puducherry. Serving clients locally and across Tamil Nadu.
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=78+Lenin+Street+Kosapalayam+Puducherry+605013"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold bg-white border border-bm-line px-4 py-2.5 rounded-xl text-bm-navy hover:border-bm-brand transition-colors shadow-sm self-start sm:self-auto"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-bm-navy" />
          </a>
        </div>

        {/* Responsive lazy-loaded Google Maps iframe */}
        <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-bm-line shadow-sm bg-bm-wash-cool relative">
          <iframe
            title="BM TechX Puducherry Office Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.626779836365!2d79.8130!3d11.9350!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a536173a1e2f5b5%3A0x6b44a30e206b12a8!2sLenin%20St%2C%20Kosapalayam%2C%20Puducherry%2C%20605013!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 4 — THE STREAMLINED 4-FIELD FORM (SECONDARY TO WA)  */}
      {/* ========================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
        {/* Left Column: Form Guidance & SLA Expectations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-bm-orange bg-bm-wash-warm px-3 py-1 rounded-full border border-bm-wash-warm-line">
              Prefer Written Proposals?
            </span>
            <h2 className="text-3xl font-extrabold text-bm-navy-deep font-display">
              If you’d rather write it out
            </h2>
            <p className="text-sm text-bm-ink leading-relaxed">
              If you are drafting requirements or need an official proposal for your management team, fill out this 4-field inquiry form. It routes directly to our project delivery system.
            </p>
          </div>

          <div className="bg-bm-wash-cool p-6 rounded-3xl border border-bm-brand-soft/40 space-y-4">
            <h3 className="text-sm font-bold text-bm-navy-deep flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              What to expect after submitting:
            </h3>
            <ul className="space-y-2.5 text-xs text-bm-ink">
              <li className="flex items-start gap-2">
                <span className="font-bold text-bm-navy mt-0.5">•</span>
                <span><strong>30-Minute SLA:</strong> First review response within 30 minutes during standard business hours.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-bm-navy mt-0.5">•</span>
                <span><strong>Zero spam calls:</strong> We never share or sell your phone number to telecallers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-bm-navy mt-0.5">•</span>
                <span><strong>Firm price in writing:</strong> You receive an itemized quote before agreeing to anything.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Interactive Webhook Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-bm-line shadow-sm">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-bm-navy-deep font-display">
                  Message Received!
                </h3>
                <p className="text-sm text-bm-ink-muted max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formState.name || 'there'}</strong>. Our team in Puducherry will review your requirements and reach out via WhatsApp/Call within 30 minutes during working hours.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  onClick={handleResetForm}
                  variant="outline"
                  className="rounded-xl border-bm-line text-xs font-semibold text-bm-navy"
                >
                  Send another inquiry
                </Button>
                {whatsappUrl ? (
                  <Button asChild className="rounded-xl bg-[#1E7A4D] hover:bg-[#17603C] text-white text-xs py-2.5 px-4 font-bold">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      Open WhatsApp again
                    </a>
                  </Button>
                ) : (
                  <WhatsAppCTA
                    src="contact-form-success"
                    intent="Hi BM TechX — I just submitted your website contact form and wanted to connect immediately."
                    label="Connect immediately on WhatsApp"
                    className="text-xs py-2.5 px-4"
                  />
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex items-center justify-between border-b border-bm-line-soft pb-4">
                <div>
                  <h3 className="text-xl font-bold text-bm-navy-deep font-display">
                    Project Scoping Form
                  </h3>
                  <p className="text-xs text-bm-ink-muted mt-0.5">
                    No CAPTCHAs. Direct delivery to technical intake.
                  </p>
                </div>
                <Send className="w-5 h-5 text-bm-orange" />
              </div>

              {/* Honeypot field (hidden from real users, caught by bots) */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="website_url_check">Leave this field blank</label>
                <input
                  id="website_url_check"
                  type="text"
                  name="website_url_check"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Field 1: Name */}
              <div>
                <label className="block text-xs font-bold text-bm-navy-deep uppercase tracking-wider mb-1.5">
                  Your Name <span className="text-bm-accent-price">*</span>
                </label>
                <Input
                  required
                  autoComplete="name"
                  placeholder="e.g. Ramesh Kumar"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="rounded-xl bg-bm-wash-cool/50 border-bm-line focus:bg-white text-sm"
                />
              </div>

              {/* Field 2 & 3: WhatsApp Number & Business Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-bm-navy-deep uppercase tracking-wider mb-1.5">
                    WhatsApp Number <span className="text-bm-accent-price">*</span>
                  </label>
                  <Input
                    required
                    type="tel"
                    autoComplete="tel"
                    placeholder="e.g. 98765 43210"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="rounded-xl bg-bm-wash-cool/50 border-bm-line focus:bg-white text-sm"
                  />
                  <span className="text-[10px] text-bm-ink-faint mt-1 block">
                    We will send your written scope here.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-bm-navy-deep uppercase tracking-wider mb-1.5">
                    Email Address (Optional)
                  </label>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="e.g. ramesh@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="rounded-xl bg-bm-wash-cool/50 border-bm-line focus:bg-white text-sm"
                  />
                </div>
              </div>

              {/* Field 4: Business Name */}
              <div>
                <label className="block text-xs font-bold text-bm-navy-deep uppercase tracking-wider mb-1.5">
                  What You Sell / Business Name
                </label>
                <Input
                  autoComplete="organization"
                  placeholder="e.g. Dental Clinic, Real Estate, Retail"
                  value={formState.business_name}
                  onChange={(e) => setFormState({ ...formState, business_name: e.target.value })}
                  className="rounded-xl bg-bm-wash-cool/50 border-bm-line focus:bg-white text-sm"
                />
              </div>

              {/* Field 4: Service Interested */}
              <div>
                <label className="block text-xs font-bold text-bm-navy-deep uppercase tracking-wider mb-1.5">
                  What You Need <span className="text-bm-accent-price">*</span>
                </label>
                <select
                  value={formState.service_interested}
                  onChange={(e) => setFormState({ ...formState, service_interested: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-bm-wash-cool/50 border border-bm-line text-sm text-bm-ink focus:outline-none focus:ring-2 focus:ring-bm-navy focus:bg-white font-body"
                >
                  {serviceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Field 5: Notes / Requirements */}
              <div>
                <label className="block text-xs font-bold text-bm-navy-deep uppercase tracking-wider mb-1.5">
                  Tell us a bit about your goal (Optional)
                </label>
                <Textarea
                  rows={3}
                  placeholder="e.g. Need a clean 5-page site for my boutique hotel in White Town, Pondicherry. Looking to launch within 10 days."
                  value={formState.notes}
                  onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                  className="rounded-xl bg-bm-wash-cool/50 border-bm-line focus:bg-white text-sm"
                />
              </div>

              {submitError && (
                <p className="text-xs text-bm-accent-price font-semibold">
                  {submitError}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-bm-navy hover:bg-bm-navy-deep text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all"
              >
                {isSubmitting ? (
                  <span>Sending inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-bm-orange" />
                    <span>Send Inquiry for Written Scope</span>
                  </>
                )}
              </Button>

              <p className="text-center text-[11px] text-bm-ink-faint">
                Protected by client confidentiality. No marketing spam.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 5 — WHAT HAPPENS NEXT (4-STEP COMMITMENT)           */}
      {/* ========================================================= */}
      <section className="bg-white p-8 sm:p-12 rounded-3xl border border-bm-line shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-bm-navy bg-bm-wash-cool border border-bm-brand-soft/40 px-3 py-1 rounded-full uppercase tracking-wider">
            Clear Expectations
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-bm-navy-deep font-display">
            What Happens Next
          </h2>
          <p className="text-sm text-bm-ink-muted">
            Here is our exact 4-step onboarding protocol so there are never surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-bm-wash-cool border border-bm-line-soft space-y-3">
            <div className="w-8 h-8 rounded-full bg-bm-navy text-white text-xs font-bold flex items-center justify-center font-mono">
              01
            </div>
            <h3 className="text-base font-bold text-bm-navy-deep">First Reply in Minutes</h3>
            <p className="text-xs text-bm-ink-muted leading-relaxed">
              You get a direct reply within minutes on WhatsApp, or within one working hour if you submitted via the inquiry form.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-bm-wash-cool border border-bm-line-soft space-y-3">
            <div className="w-8 h-8 rounded-full bg-bm-navy text-white text-xs font-bold flex items-center justify-center font-mono">
              02
            </div>
            <h3 className="text-base font-bold text-bm-navy-deep">2–3 Scoping Questions</h3>
            <p className="text-xs text-bm-ink-muted leading-relaxed">
              We ask quick, practical questions: what you sell, your target city/market, and roughly what budget or timeline you have in mind.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-bm-wash-cool border border-bm-line-soft space-y-3">
            <div className="w-8 h-8 rounded-full bg-bm-navy text-white text-xs font-bold flex items-center justify-center font-mono">
              03
            </div>
            <h3 className="text-base font-bold text-bm-navy-deep">Written Scope & Price</h3>
            <p className="text-xs text-bm-ink-muted leading-relaxed">
              You receive an itemized written scope, deliverable list, and exact price. Always delivered before you pay a single rupee.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-bm-wash-cool border border-bm-line-soft space-y-3">
            <div className="w-8 h-8 rounded-full bg-bm-navy text-white text-xs font-bold flex items-center justify-center font-mono">
              04
            </div>
            <h3 className="text-base font-bold text-bm-navy-deep">Honest Fit Check</h3>
            <p className="text-xs text-bm-ink-muted leading-relaxed">
              If we are not the right technical or commercial fit for what you need, we will say so honestly and tell you why.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 6 — TRUST FOOTER BANNER                             */}
      {/* ========================================================= */}
      <section className="bg-bm-navy-deep text-white p-8 sm:p-10 rounded-3xl space-y-4 border border-bm-brand-soft/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Building2 className="w-4 h-4" />
              <span>Incorporated Private Limited Entity</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
              BM TechX is a brand of {site.entity.legal_name}
            </h3>
            <p className="text-xs text-bm-brand-soft">
              CIN: <span className="font-mono text-white font-semibold">{site.entity.cin}</span> · Registered under Ministry of Corporate Affairs, Government of India.
            </p>
          </div>

          <div className="shrink-0">
            <WhatsAppCTA
              src="contact-trust-footer"
              intent="Hello BM TechX team — I'd like to consult on a project."
              label="Chat with Our Team"
              className="text-xs sm:text-sm py-3 px-5 shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
