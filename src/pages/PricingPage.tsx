import { SlotsBanner } from '@/components/SlotsBanner';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Bot, Code, Check } from 'lucide-react';
import { PriceCard } from '@/components/PriceCard';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { FAQ } from '@/components/FAQ';

interface PricingPageProps {
  onOpenQuote?: (service?: string) => void;
}

export function PricingPage({ onOpenQuote }: PricingPageProps) {
  const pricingFaqItems = [
    {
      q: 'Are these your real final prices?',
      a: 'Yes, plus 18% GST. The exclusions are listed clearly on each service page so the number does not move or increase later.',
    },
    {
      q: 'Why do you publish prices when nobody else does?',
      a: 'Because the first question every business owner has is "how much", and making you sit through a call to find out wastes your time and ours. It also means we cannot quote you differently based on how your shop looks.',
    },
    {
      q: 'Can I pay in instalments?',
      a: 'Yes, under our stated norms. Full upfront payment receives a commercial discount.',
    },
    {
      q: 'Do prices change?',
      a: 'Occasionally. When they do, this page changes first — and anything already agreed with you in writing is honored at the agreed price.',
    },
    {
      q: 'What if I need something not listed?',
      a: 'Message us on WhatsApp. If we cannot do it, we will say so honestly, and where we can we will point you to someone who can.',
    },
  ];

  const terms = [
    { label: '18% GST', detail: 'Every price above excludes 18% GST. We show the pre-GST figure because that is how official tax invoices are billed.' },
    { label: 'Billing', detail: 'Monthly plans are billed monthly. Pay 3 months upfront on SEO and Instagram plans to save and get free setup.' },
    { label: 'Upfront Discount', detail: 'Paying 3 months in full receives a commercial discount. Part-payment schedules are available under stated norms before work begins.' },
    { label: 'Ad Spend Separation', detail: 'Ad spend is always paid by you directly to Meta or Google. We never take your ad budget into our bank account or add a percentage markup.' },
    { label: 'Shoot Policies', detail: 'Mobile video shoots and professional camera shoots are priced differently. Shoots outside Puducherry are quoted on travel requirement.' },
    { label: 'Year 2 Renewals', detail: '₹2,999 and ₹4,999 websites renew at ₹1,999 + GST a year for domain and server. The ₹9,999 store has no yearly software renewal fee.' },
    { label: 'Domain Ownership', detail: 'Your domain is registered 100% in your business name. If you ever leave, you take full ownership with zero transfer penalties.' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* ========================================================= */}
      {/* BLOCK 1 — H1 + ANSWER FIRST                              */}
      {/* ========================================================= */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 bg-bm-wash-cool border border-bm-brand-soft px-3.5 py-1.5 rounded-full text-xs font-bold text-bm-navy">
          <span>Single Source of Truth · Fixed Rate Card</span>
        </div>

        <div className="flex justify-center"><SlotsBanner /></div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-bm-navy-deep font-display tracking-tight">
          Website and digital marketing prices in Pondicherry. Every price, on this page.
        </h1>

        <p className="text-base sm:text-xl text-bm-ink font-medium leading-relaxed max-w-3xl mx-auto bg-white border border-bm-line p-6 sm:p-8 rounded-3xl shadow-sm">
          There's no "contact us for a quote" row below. Websites start at ₹2,999, online stores are ₹9,999 with no yearly renewal, and monthly plans start at ₹2,999. All prices exclude 18% GST. The only things we don't price here are WhatsApp automation and custom software builds, because they genuinely depend on what you need — and we say so rather than making you find out on a call.
        </p>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 2 — ONE-TIME BUILDS                                */}
      {/* ========================================================= */}
      <section className="space-y-8" aria-label="One-Time Website Builds">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-bm-terracotta bg-bm-wash-warm px-3 py-1 rounded-full border border-bm-wash-warm-line">
            One-Time Investments
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            Custom-coded websites and online stores
          </h2>
          <p className="text-sm text-bm-ink-muted">
            All builds include domain and cloud server for Year 1, SSL, responsive layout, and direct WhatsApp CTA.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PriceCard id="web-single" onSelect={() => onOpenQuote && onOpenQuote('Single-Page Website (₹2,999)')} />
          <PriceCard id="web-multi" highlight={true} onSelect={() => onOpenQuote && onOpenQuote('Multi-Page Website (₹4,999)')} />
          <PriceCard id="store" onSelect={() => onOpenQuote && onOpenQuote('Online Store (₹9,999)')} />
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 3 — MONTHLY PLANS                                  */}
      {/* ========================================================= */}
      <section className="space-y-12" aria-label="Monthly Retainer Plans">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-bm-navy bg-bm-wash-cool px-3 py-1 rounded-full border border-bm-brand-soft">
            Monthly Retainers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            SEO, Meta Ads & Social Media Management
          </h2>
          <p className="text-sm text-bm-ink-muted">
            Pay 3 months upfront on SEO and Instagram plans to save and get free setup.
          </p>
        </div>

        {/* SEO Tiers */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-bm-line/60 pb-3">
            <h3 className="text-xl font-bold text-bm-navy-deep">Google Maps SEO</h3>
            <Link to="/services/seo" className="text-xs font-bold text-bm-navy hover:text-bm-terracotta flex items-center gap-1">
              Explore SEO Deliverables <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PriceCard id="seo-starter" onSelect={() => onOpenQuote && onOpenQuote('Google Maps SEO Starter (₹2,999/mo)')} />
            <PriceCard id="seo-growth" highlight={true} onSelect={() => onOpenQuote && onOpenQuote('Google Maps SEO Growth (₹4,999/mo)')} />
            <PriceCard id="seo-business" onSelect={() => onOpenQuote && onOpenQuote('Google Maps SEO Business (₹8,999/mo)')} />
          </div>
        </div>

        {/* Meta Ads & SMM & Combos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <PriceCard id="meta-ads" onSelect={() => onOpenQuote && onOpenQuote('Meta Ads (₹4,999/mo)')} />
          <PriceCard id="smm-starter" onSelect={() => onOpenQuote && onOpenQuote('Instagram Starter (₹7,999/mo)')} />
          
          {/* Combo Packages Card */}
          <div className="bg-bm-wash-cool border-2 border-bm-navy rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-bm-navy">Custom Bundles</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-black text-bm-navy-deep font-display">From ₹9,999</span>
                <span className="text-xs text-bm-ink-faint font-semibold">/month</span>
              </div>
              <p className="text-sm text-bm-ink-muted leading-relaxed">
                Combo packages: Website + Ads, or SEO + Social Media. Tailored to your specific growth stage.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-bm-ink pt-2 border-t border-bm-line/60">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Integrated campaign strategy</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Single dedicated point of contact</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Unified monthly ROI report</li>
              </ul>
            </div>
            <div className="pt-6 mt-6 border-t border-bm-line/60">
              <WhatsAppCTA
                src="pricing-combo"
                intent="I am interested in a customized combo package"
                label="Discuss Combo on WhatsApp"
                variant="secondary"
                className="w-full py-4 text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 4 — TERMS, STATED PLAINLY                          */}
      {/* ========================================================= */}
      <section className="bg-white border-2 border-bm-line rounded-3xl p-6 sm:p-10 shadow-sm space-y-6" aria-label="Commercial Terms">
        <div className="space-y-2 border-b border-bm-line/60 pb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-bm-navy">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Commercial Transparency</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-bm-navy-deep font-display">
            Terms, stated plainly before you pay
          </h2>
          <p className="text-xs text-bm-ink-faint">
            Publishing our terms upfront beats surprising you during invoice delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {terms.map((term) => (
            <div key={term.label} className="p-4 rounded-xl bg-bm-wash-cool border border-bm-line/60 space-y-1">
              <p className="text-xs font-bold text-bm-navy-deep uppercase tracking-wider">{term.label}</p>
              <p className="text-xs sm:text-sm text-bm-ink-muted leading-relaxed">{term.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 5 — NOT PRICED HERE, AND WHY                       */}
      {/* ========================================================= */}
      <section className="space-y-6" aria-label="Custom Scoped Services">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-bm-ink-faint">
            Discovery Required
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-bm-navy-deep font-display">
            What is not priced here — and why
          </h2>
          <p className="text-xs text-bm-ink-muted">
            We would rather be honest than put "starting from ₹999" against a product nobody ends up paying.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-bm-line space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <Bot className="w-5 h-5" />
              <h3 className="text-lg font-bold text-bm-navy-deep">WhatsApp Automation (LeadOS)</h3>
            </div>
            <p className="text-xs sm:text-sm text-bm-ink-muted leading-relaxed">
              Depends on conversation volume and how much business logic the bot needs to handle (menu branching, CRM syncing, order handling). Quoted accurately after a 20-minute discovery call.
            </p>
            <Link to="/services/whatsapp-automation" className="text-xs font-bold text-bm-navy hover:text-bm-terracotta inline-flex items-center gap-1 pt-2">
              Learn about WhatsApp Automation <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-bm-line space-y-3">
            <div className="flex items-center gap-2 text-bm-navy font-bold">
              <Code className="w-5 h-5" />
              <h3 className="text-lg font-bold text-bm-navy-deep">Custom Software Builds</h3>
            </div>
            <p className="text-xs sm:text-sm text-bm-ink-muted leading-relaxed">
              Booking systems, client portals, internal ERP tools, and custom database integrations. Every business workflow is unique, so we quote strictly based on verified milestones.
            </p>
            <Link to="/work" className="text-xs font-bold text-bm-navy hover:text-bm-terracotta inline-flex items-center gap-1 pt-2">
              View Custom Code Case Studies <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 6 — PRICING FAQ                                    */}
      {/* ========================================================= */}
      <FAQ
        items={pricingFaqItems}
        title="Pricing & Billing FAQ"
        subtitle="Common questions regarding invoices, renewals, and payment schedules."
      />

      {/* ========================================================= */}
      {/* BLOCK 7 — CLOSING CTA                                    */}
      {/* ========================================================= */}
      <section className="text-center max-w-4xl mx-auto pt-4" aria-label="Closing Pricing CTA">
        <div className="bg-bm-wash-warm border-2 border-bm-wash-warm-line rounded-3xl p-8 sm:p-12 space-y-4">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            Know what you want? Message us and we'll start.
          </h2>
          <p className="text-sm text-bm-ink-muted max-w-xl mx-auto">
            No sales pitch. No 40-minute Zoom meetings. Tell us the plan you want and our operations team will reply with your onboarding agreement.
          </p>
          <div className="pt-2">
            <WhatsAppCTA
              src="pricing-footer"
              intent="I've seen your prices — I'd like to start"
              label="Message on WhatsApp to Start"
              size="lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default PricingPage;
