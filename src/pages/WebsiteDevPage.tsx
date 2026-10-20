import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Clock,
  ShieldCheck,
  Check,
  X,
  Gauge,
  Lock,
  Smartphone,
  ChevronRight,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Code2,
} from 'lucide-react';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { PriceCard } from '@/components/PriceCard';
import { ProofBlock } from '@/components/ProofBlock';
import { NotForBlock } from '@/components/NotForBlock';
import { FAQ } from '@/components/FAQ';

interface WebsiteDevPageProps {
  onOpenQuote?: (service?: string) => void;
}

export function WebsiteDevPage({ onOpenQuote }: WebsiteDevPageProps) {
  // SEO Metadata & Schema Injection
  useEffect(() => {
    document.title = 'Website Development in Pondicherry | From Rs 2,999';

    const schemaId = 'web-dev-schema';
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
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://bmtechx.in/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: 'https://bmtechx.in/services/',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Website Development',
              item: 'https://bmtechx.in/services/website-development/',
            },
          ],
        },
        {
          '@type': 'Service',
          name: 'Website Development in Pondicherry',
          serviceType: 'Custom Web Design & Development',
          description:
            'Custom-coded websites from Rs 2,999, live in 48 working hours. Domain and server included for year 1. Zero slow WordPress themes.',
          provider: {
            '@type': 'Organization',
            name: 'BM TechX',
            url: 'https://bmtechx.in',
          },
          areaServed: [
            { '@type': 'City', name: 'Puducherry' },
            { '@type': 'City', name: 'Cuddalore' },
            { '@type': 'City', name: 'Villupuram' },
            { '@type': 'State', name: 'Tamil Nadu' },
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Website Development Plans',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Single-Page Website',
                  description: 'One-page custom-coded website live in 48 working hours with domain and server.',
                },
                price: 2999,
                priceCurrency: 'INR',
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Multi-Page Website',
                  description: 'Multi-page custom-coded business website live in 5–7 working days with Google profile connection.',
                },
                price: 4999,
                priceCurrency: 'INR',
              },
            ],
          },
        },
      ],
    };

    scriptTag.textContent = JSON.stringify(schemaData);

    return () => {
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, []);

  const webDevFaqs = [
    {
      q: 'What is the cheapest website you build?',
      a: '₹2,999 plus GST for a single-page site, including domain and server for the first year. We do not go lower, and we would be cautious of anyone who does — at that point something is being left out, and it is usually the hosting, the domain ownership, or the follow-up support.',
    },
    {
      q: 'Is the domain in my name?',
      a: 'Yes. Registered 100% in your name, with the login handed over to you at launch. If you ever leave us, you take the site with you with zero transfer fees.',
    },
    {
      q: 'What if I want changes after it is live?',
      a: 'Small text and image changes in the first 30 days are included. After that, we quote them — usually a few hundred rupees. We will always tell you before doing it, never after.',
    },
    {
      q: 'Do you build in Tamil?',
      a: 'Yes, English and Tamil, or both on the same site. Tell us at the start because it changes the font hierarchy and responsive layout.',
    },
    {
      q: 'Can I pay in parts?',
      a: 'Yes, under our stated commercial norms — part now, balance on live delivery. Full upfront payment receives a commercial discount. We put whichever you choose in writing before we start.',
    },
    {
      q: 'What happens in year two?',
      a: '₹1,999 plus GST a year covers your domain and fast cloud server. That is it. If you would rather host it yourself, we hand over the complete code files with zero lock-in.',
    },
  ];

  const notForItems = [
    'If your budget is under ₹2,999 — we cannot build something we would put our name on for less.',
    'If you need twenty pages of content written from scratch — that is a separate piece of work and we quote it separately.',
    'If you want a site you can edit yourself every day — custom-coded sites are edited by us. If daily self-editing matters more than speed and security, WordPress genuinely is the better answer for you, and we will tell you so.',
    'If you need it live tomorrow — 48 working hours is our tested floor to ensure quality QA.',
  ];

  const timelineSteps = [
    {
      step: 'Hour 0',
      title: 'Assets Intake & Clock Starts',
      desc: 'You send your logo, text, and photos on WhatsApp. We verify them and confirm the 48-hour build clock has officially started.',
      highlight: true,
    },
    {
      step: 'Hour 0–4',
      title: 'Layout & Structure Approved',
      desc: 'Our design and engineering leads establish the layout structure. You receive a private preview link to verify the direction.',
      highlight: false,
    },
    {
      step: 'Hour 4–36',
      title: 'Custom Engineering & Mobile QA',
      desc: 'We custom-code the frontend in modern Vite/React. Zero plugin bloat, verified PageSpeed score > 95, tested on real 4G devices.',
      highlight: false,
    },
    {
      step: 'Hour 36–44',
      title: 'Client Review & Polish',
      desc: 'You review the live staging build on your own phone. We apply your requested text and image adjustments immediately.',
      highlight: false,
    },
    {
      step: 'Hour 44–48',
      title: 'Live Launch on Your Domain',
      desc: 'SSL certificate activated, DNS pointed, and domain ownership credentials transferred 100% into your name.',
      highlight: true,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* ========================================================= */}
      {/* BREADCRUMB                                                */}
      {/* ========================================================= */}
      <nav aria-label="Breadcrumb" className="text-xs text-bm-ink-muted">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="hover:text-bm-navy transition-colors">
              Home
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <Link to="/services/" className="hover:text-bm-navy transition-colors">
              Services
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            <span className="font-semibold text-bm-navy-deep">Website Development</span>
          </li>
        </ol>
      </nav>

      {/* ========================================================= */}
      {/* BLOCK 1 — H1 + ANSWER FIRST                              */}
      {/* ========================================================= */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 bg-bm-wash-cool border border-bm-brand-soft px-3.5 py-1.5 rounded-full text-xs font-bold text-bm-navy">
          <Zap className="w-3.5 h-3.5 text-bm-orange" />
          <span>Custom Code · Live in 48 Hours · Domain Included</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-bm-navy-deep font-display tracking-tight">
          Website development in Pondicherry
        </h1>

        <p className="text-base sm:text-xl text-bm-ink font-medium leading-relaxed max-w-3xl mx-auto bg-white border border-bm-line p-6 sm:p-8 rounded-3xl shadow-sm">
          A one-page website from BM TechX costs <strong className="text-bm-navy-deep font-extrabold">₹2,999 plus GST and goes live in 48 working hours</strong>, with your domain and server included for the first year. A multi-page website is ₹4,999 plus GST. Both are custom-coded — we don’t buy a template and change the colours — and both renew at ₹1,999 plus GST a year for domain and hosting. That’s the whole price. There isn’t a second conversation where it goes up.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <WhatsAppCTA
            src="web-dev-hero"
            intent="Hi BM TechX — I want to get a custom-coded website for my business."
            label="Message us on WhatsApp"
            variant="primary"
            className="text-sm sm:text-base py-3.5 px-6 shadow-md"
          />
          <Link
            to="/pricing/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-white border border-bm-line hover:border-bm-brand px-5 py-3.5 rounded-xl text-bm-navy transition-colors shadow-sm"
          >
            <span>See full pricing table</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 2 — TWO CORE PRICING CARDS (₹2,999 vs ₹4,999)      */}
      {/* ========================================================= */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            Two Fixed-Price Plans
          </h2>
          <p className="text-xs sm:text-sm text-bm-ink-muted">
            Pre-GST rates. Domain, cloud hosting, and SSL included in both.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          <PriceCard id="web-single" ctaTag="offer-2999" />
          <PriceCard id="web-multi" highlight={true} ctaTag="offer-4999" />
        </div>

        {/* Feature Matrix Table */}
        <div className="bg-white rounded-3xl border border-bm-line p-6 sm:p-8 max-w-4xl mx-auto shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-bm-navy-deep font-display">
            Direct Comparison Matrix
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-bm-wash-cool text-bm-navy-deep font-bold border-b border-bm-line-soft">
                <tr>
                  <th className="py-3 px-4">Deliverable / Norm</th>
                  <th className="py-3 px-4">Single-Page (₹2,999)</th>
                  <th className="py-3 px-4 text-bm-navy font-extrabold">Multi-Page (₹4,999)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bm-line-soft">
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-bm-navy-deep">Turnaround SLA</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-bm-orange">48 working hours</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-bm-navy">5–7 working days</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-bm-navy-deep">Domain + Fast Server (Year 1)</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">Included</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">Included</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-bm-navy-deep">Year 2 Renewal</td>
                  <td className="py-3.5 px-4 font-mono text-bm-ink-muted">₹1,999 + GST/yr</td>
                  <td className="py-3.5 px-4 font-mono text-bm-ink-muted">₹1,999 + GST/yr</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-bm-navy-deep">Mobile 4G Data Tested</td>
                  <td className="py-3.5 px-4 text-emerald-700"><Check className="w-4 h-4 inline" /> Yes</td>
                  <td className="py-3.5 px-4 text-emerald-700"><Check className="w-4 h-4 inline" /> Yes</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-bm-navy-deep">WhatsApp CTA Button with [src:...]</td>
                  <td className="py-3.5 px-4 text-emerald-700"><Check className="w-4 h-4 inline" /> Yes</td>
                  <td className="py-3.5 px-4 text-emerald-700"><Check className="w-4 h-4 inline" /> Yes</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-bm-navy-deep">On-Page Technical SEO Setup</td>
                  <td className="py-3.5 px-4 text-emerald-700"><Check className="w-4 h-4 inline" /> Yes</td>
                  <td className="py-3.5 px-4 text-emerald-700"><Check className="w-4 h-4 inline" /> Yes</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-bm-navy-deep">Google Business Profile Link-Up</td>
                  <td className="py-3.5 px-4 text-bm-ink-faint"><X className="w-4 h-4 inline" /> —</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-bold"><Check className="w-4 h-4 inline" /> Yes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-bm-wash-cool p-4 rounded-2xl text-xs text-bm-ink-muted leading-relaxed">
            <strong className="text-bm-navy-deep">What is NOT included in either:</strong> Content writing beyond what you provide, photography shoots, payment gateway checkout, or customer login portals. If you need to sell products online with razor-fast checkout, see our{' '}
            <Link to="/services/ecommerce-website/" className="text-bm-accent-price font-bold hover:underline">
              Online Store at ₹9,999 →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 3 — THE 48-HOUR CLOCK PROTOCOL EXPLAINED           */}
      {/* ========================================================= */}
      <section className="bg-white rounded-3xl border border-bm-line p-8 sm:p-12 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold text-emerald-800">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Honest Turnaround Protocol</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            The 48-Hour Clock, Explained
          </h2>

          <p className="text-sm sm:text-base text-bm-ink leading-relaxed">
            People ask how 48 hours is possible without cutting corners. Here is the honest truth: the clock starts when we have <strong>three things: your logo, your text, and your photos</strong>. Not before. Most delays in web agencies happen because they wait for client content while letting the calendar slip.
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
          {timelineSteps.map((step, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                step.highlight
                  ? 'bg-bm-wash-cool border-bm-navy/30 shadow-sm'
                  : 'bg-white border-bm-line-soft'
              }`}
            >
              <div className="space-y-2">
                <span className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-bm-navy text-white inline-block">
                  {step.step}
                </span>
                <h3 className="text-sm font-bold text-bm-navy-deep font-display">
                  {step.title}
                </h3>
                <p className="text-xs text-bm-ink-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
          <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>Don’t have your text or photos ready?</strong> Just let us know on WhatsApp. We will provide an exact content questionnaire so you know what to write, or quote separately for copywriting. What we won’t do is start the clock and let it run while waiting on you.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 4 — WHY CUSTOM-CODED (ZERO WORDPRESS BLOAT)         */}
      {/* ========================================================= */}
      <section className="bg-bm-navy-deep text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-bm-brand-soft/20 space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-emerald-400 border border-white/10">
            <Code2 className="w-3.5 h-3.5" />
            <span>Modern Engineering vs Outdated Builders</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Why Custom Code Beats WordPress Every Single Time
          </h2>

          <p className="text-sm sm:text-base text-bm-brand-soft leading-relaxed">
            Most agencies install WordPress, buy a ₹3,000 theme, and hand it over. That works for basic hobbyists, but for a real business on a mobile 4G connection in Puducherry or Cuddalore, custom code creates a competitive advantage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Gauge className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Loads in &lt; 1 Second</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              No bloated 30-plugin stack. Instant first paint on mobile 4G that maximizes Google Core Web Vitals and organic search rank.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Never Breaks on Its Own</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              A WordPress site with twelve plugins breaks when an automatic update causes a PHP conflict. Your custom-coded site has zero moving parts to crash.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Immune to Plugin Hacks</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              95% of small-business site compromises occur through abandoned plugins. With zero plugins and clean static architecture, your site cannot be backdoor injected.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3 backdrop-blur-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">You Are Not Renting</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Zero Elementor or Divi annual subscription traps. You own every single line of code and the domain registration in your company’s name.
            </p>
          </div>
        </div>

        {/* Live Speed Challenge */}
        <div className="bg-white/10 p-6 sm:p-8 rounded-2xl border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Test Us On This Live
            </h3>
            <p className="text-xs text-bm-brand-soft">
              Send us your current website address on WhatsApp. We will run Google PageSpeed live on screen while you watch — then run ours.
            </p>
          </div>

          <div className="shrink-0">
            <WhatsAppCTA
              src="web-dev-speed-challenge"
              intent="Test my website speed live: My current website URL is: "
              label="Run Speed Test on WhatsApp"
              className="text-xs py-2.5 px-4"
            />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 5 — WHAT YOU ACTUALLY GET (STANDARD DELIVERABLES)   */}
      {/* ========================================================= */}
      <section className="bg-white rounded-3xl border border-bm-line p-8 sm:p-12 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            What You Actually Get
          </h2>
          <p className="text-xs sm:text-sm text-bm-ink-muted">
            Every website we deliver includes these seven non-negotiable fundamentals without asking:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-bm-wash-cool border border-bm-line-soft flex items-start gap-3">
            <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-bm-navy-deep">Mobile-First Real Device Testing</p>
              <p className="text-xs text-bm-ink-muted mt-0.5">We test on mid-range Android smartphones over mobile data, not on office WiFi laptops.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-bm-wash-cool border border-bm-line-soft flex items-start gap-3">
            <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-bm-navy-deep">Attributed WhatsApp CTA Button</p>
              <p className="text-xs text-bm-ink-muted mt-0.5">Opens a conversation with pre-written context so you know exactly which page produced the lead.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-bm-wash-cool border border-bm-line-soft flex items-start gap-3">
            <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-bm-navy-deep">Direct-to-Phone Lead Form</p>
              <p className="text-xs text-bm-ink-muted mt-0.5">Inquiries reach your mobile within seconds with zero spam bot submissions.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-bm-wash-cool border border-bm-line-soft flex items-start gap-3">
            <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-bm-navy-deep">Google Business Profile NAP Link</p>
              <p className="text-xs text-bm-ink-muted mt-0.5">Exact character-for-character consistency with your local Google Map pin for local SEO power.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-bm-wash-cool border border-bm-line-soft flex items-start gap-3">
            <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-bm-navy-deep">Search-Intent Titles & Meta Tags</p>
              <p className="text-xs text-bm-ink-muted mt-0.5">Configured for what real customers actually type into Google Search, not internal jargon.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-bm-wash-cool border border-bm-line-soft flex items-start gap-3">
            <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-bm-navy-deep">Lifetime SSL Security Certificate</p>
              <p className="text-xs text-bm-ink-muted mt-0.5">HTTPS encrypted so visitors never encounter terrifying "Not Secure" browser warnings.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-bm-wash-warm border border-bm-wash-warm-line flex items-start gap-3 md:col-span-2">
            <Check className="w-5 h-5 text-bm-accent-price shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-bm-navy-deep">100% Domain Ownership in YOUR Name</p>
              <p className="text-xs text-bm-ink-muted mt-0.5">
                The domain is registered strictly in your name and login credentials are handed over at launch. You are never held hostage. Ask whoever built your last site whose name the domain is in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 6 — PROOF SYSTEM (SLOTS FROM PROOF.JSON)            */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-bm-navy bg-bm-wash-cool border border-bm-brand-soft/40 px-3 py-1 rounded-full uppercase tracking-wider">
            Verifiable Proof
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            Sites We Have Actually Built
          </h2>
          <p className="text-xs sm:text-sm text-bm-ink-muted">
            Deliberately verifiable — real businesses, real delivery timelines, and real PageSpeed benchmarks.
          </p>
        </div>

        {/* Proof Slots from proof.json */}
        <div className="space-y-4">
          <ProofBlock id="web-strip" />
          <ProofBlock id="web-credential-speed" />
          <ProofBlock id="web-samples" />
          <ProofBlock id="web-case-1" />
          <ProofBlock id="web-testimonial-1" />
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 7 — WHO THIS IS NOT FOR (DISQUALIFIERS)             */}
      {/* ========================================================= */}
      <section>
        <NotForBlock items={notForItems} />
      </section>

      {/* ========================================================= */}
      {/* BLOCK 8 — FAQ ACCORDION (WITH FAQPAGE SCHEMA)             */}
      {/* ========================================================= */}
      <section>
        <FAQ
          items={webDevFaqs}
          title="Website Development FAQ"
          subtitle="Honest, direct answers to common questions about our ₹2,999 and ₹4,999 custom builds."
        />
      </section>

      {/* ========================================================= */}
      {/* BLOCK 9 — CLOSING CTA                                     */}
      {/* ========================================================= */}
      <section className="bg-bm-navy-deep text-white p-8 sm:p-12 rounded-3xl space-y-6 border border-bm-brand-soft/20 text-center max-w-4xl mx-auto shadow-xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Send us your business name on WhatsApp
          </h2>
          <p className="text-sm text-bm-brand-soft leading-relaxed">
            We will review your requirements, confirm the 48-hour slot availability, and send back a firm price and delivery date before you pay a single rupee.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <WhatsAppCTA
            src="web-dev-footer"
            intent="Hi BM TechX — My business name is: . I would like a price and delivery date for a custom website."
            label="Message us on WhatsApp"
            variant="primary"
            className="w-full sm:w-auto text-base py-4 px-8 justify-center shadow-lg"
          />
          {onOpenQuote && (
            <button
              onClick={() => onOpenQuote('Multi-Page Website (₹4,999)')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/30 hover:bg-white/10 px-6 py-4 rounded-xl text-sm font-semibold transition-colors"
            >
              <span>Request Written Scope</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default WebsiteDevPage;
