import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  ShoppingCart,
  Search,
  Target,
  Share2,
  Bot,
  ArrowRight,
  Clock,
  Sparkles,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';

interface ServicesPageProps {
  onOpenQuote?: (service?: string) => void;
}

export function ServicesPage({ onOpenQuote }: ServicesPageProps) {
  // SEO Title & Breadcrumb Schema Injection
  useEffect(() => {

    const schemaId = 'services-hub-schema';
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
          ],
        },
        {
          '@type': 'ItemList',
          name: 'BM TechX Digital Growth Services',
          description: 'Websites, online stores, SEO, Meta ads, social media and WhatsApp automation with published fixed prices.',
          itemListElement: [
            {
              '@type': 'Service',
              position: 1,
              name: 'Website Development',
              url: 'https://bmtechx.in/services/website-development/',
            },
            {
              '@type': 'Service',
              position: 2,
              name: 'Ecommerce Website Development',
              url: 'https://bmtechx.in/services/ecommerce-website/',
            },
            {
              '@type': 'Service',
              position: 3,
              name: 'Search Engine Optimization (SEO)',
              url: 'https://bmtechx.in/services/seo/',
            },
            {
              '@type': 'Service',
              position: 4,
              name: 'Meta Ads Management',
              url: 'https://bmtechx.in/services/meta-ads/',
            },
            {
              '@type': 'Service',
              position: 5,
              name: 'Social Media Marketing',
              url: 'https://bmtechx.in/services/social-media-marketing/',
            },
            {
              '@type': 'Service',
              position: 6,
              name: 'WhatsApp Automation (LeadOS)',
              url: 'https://bmtechx.in/services/whatsapp-automation/',
            },
          ],
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

  const serviceCatalog = [
    {
      id: 'web-dev',
      title: 'Website Development',
      price: 'from ₹2,999',
      billing: 'one-time',
      turnaround: '48h – 7 days',
      path: '/services/website-development',
      icon: Globe,
      color: 'border-bm-brand-soft/60 hover:border-bm-brand',
      tag: '48-Hour Turnaround',
      description:
        'Custom-coded, high-performance static websites built with modern engineering. Live in 48 working hours with domain and server included for year one.',
      bullets: [
        'Single-page (₹2,999) & Multi-page (₹4,999)',
        'Domain and fast server hosting included for year 1',
        'Mobile-first responsive layout, tested on real phones',
        'Direct WhatsApp routing with page source attribution',
        'Zero WordPress bloat, zero plugin crash risk',
      ],
      ctaIntent: 'I want to build a custom website with 48h SLA',
    },
    {
      id: 'ecommerce',
      title: 'Online Store / Ecommerce',
      price: '₹9,999',
      billing: 'one-time',
      turnaround: '7–10 days',
      path: '/services/ecommerce-website',
      icon: ShoppingCart,
      color: 'border-bm-accent-price/40 hover:border-bm-accent-price',
      tag: 'Zero Yearly Renewal Fee',
      description:
        'Your independent direct-to-consumer store with unlimited products, payment gateway, and instant WhatsApp order notifications. No monthly Shopify rent.',
      bullets: [
        'Razorpay, PhonePe & UPI gateway integration',
        'Instant order notifications sent straight to your WhatsApp',
        'Unlimited product catalog with zero transaction commission',
        'Customer invoices, coupons, and discount campaigns',
        'No yearly recurring software subscription fees',
      ],
      ctaIntent: 'I want an independent online store for ₹9,999',
    },
    {
      id: 'seo',
      title: 'Search Engine Optimization (SEO)',
      price: 'from ₹4,999',
      billing: '/month',
      turnaround: 'Monthly Retainer',
      path: '/services/seo',
      icon: Search,
      color: 'border-emerald-300 hover:border-emerald-600',
      tag: 'Countable Deliverables',
      description:
        'Get found on Google Search and Google Maps when customers look for what you sell in Pondicherry and Tamil Nadu. Honest timelines, zero vanity rankings.',
      bullets: [
        'Starter (₹4,999/mo), Growth (₹8,999/mo), Business (₹14,999/mo)',
        'Local citation cleanup & Google Business Profile optimization',
        'AI Overviews and Perplexity search visibility optimization',
        'Clean technical site audit & speed enhancements',
        'Transparent monthly reports tracking leads and calls',
      ],
      ctaIntent: 'I want to check my Google ranking and SEO audit',
    },
    {
      id: 'meta-ads',
      title: 'Meta & Facebook Ads',
      price: 'from ₹8,999',
      billing: '/month',
      turnaround: 'Monthly Retainer',
      path: '/services/meta-ads',
      icon: Target,
      color: 'border-indigo-300 hover:border-indigo-600',
      tag: 'Verified Leads to WhatsApp',
      description:
        'Targeted Facebook and Instagram advertising delivering phone-verified leads straight to your WhatsApp. You pay ad spend directly to Meta with zero markup.',
      bullets: [
        'Standard (₹8,999/mo) & Scale (₹14,999/mo) management tiers',
        'Direct ad spend paid by you to Meta (zero agency markup)',
        'Custom high-converting creatives in Tamil and English',
        'Daily ad budget optimization and audience testing',
        'Proven lead generation for real estate, healthcare, and retail',
      ],
      ctaIntent: 'I want high-converting Meta ads for my business',
    },
    {
      id: 'smm',
      title: 'Social Media Management',
      price: 'from ₹6,999',
      billing: '/month',
      turnaround: 'Monthly Retainer',
      path: '/services/social-media-marketing',
      icon: Share2,
      color: 'border-amber-300 hover:border-amber-600',
      tag: 'Enquiry-Focused',
      description:
        'Consistent, authentic social presence for your brand. Real photography, localized video content, and proactive DM response management that drives footfall.',
      bullets: [
        'Starter (₹6,999/mo) & Active (₹12,999/mo) retainers',
        'Original photo/video shoots on location in Puducherry',
        '12 to 24 high-engagement posts and reels per month',
        'DM and comment response management within business hours',
        'Monthly reporting focused on customer messages, not vanity reach',
      ],
      ctaIntent: 'I need social media management for my brand',
    },
    {
      id: 'whatsapp-automation',
      title: 'WhatsApp Automation (LeadOS)',
      price: 'Quoted per scope',
      billing: 'custom setup',
      turnaround: '10–14 days',
      path: '/services/whatsapp-automation',
      icon: Bot,
      color: 'border-emerald-400 hover:border-emerald-700',
      tag: 'Autopilot Lead Capture',
      description:
        'An automated WhatsApp assistant that answers customer inquiries in minutes, qualifies buyer budget, and schedules appointments while your team is busy.',
      bullets: [
        'Official Meta WhatsApp Cloud API integration',
        'Zero-drop response: 24/7 instant replies in Tamil and English',
        'Automatic routing to human when high-value leads are detected',
        'CRM & Google Sheets synchronization via n8n automation',
        'Follow-up sequences that revive cold inquiries automatically',
      ],
      ctaIntent: 'I want to automate customer inquiries on WhatsApp',
    },
  ];

  const stageMatrix = [
    {
      stage: 'New Business / Startup',
      situation: 'Need to get online quickly with credibility and search visibility',
      recommendation: 'Single-Page Website (₹2,999) or Multi-Page (₹4,999)',
      path: '/services/website-development',
    },
    {
      stage: 'Retailer / Manufacturer',
      situation: 'Selling physical products and looking to bypass marketplace commissions',
      recommendation: 'Online Store / Ecommerce (₹9,999 fixed, zero renewal)',
      path: '/services/ecommerce-website',
    },
    {
      stage: 'Clinic, Legal, or Local Service',
      situation: 'Customers search Google when they need you right now',
      recommendation: 'Local SEO Sprints (from ₹4,999/mo) + Multi-Page Site',
      path: '/services/seo',
    },
    {
      stage: 'Real Estate / High-Ticket',
      situation: 'Need verified customer phone numbers and high volume of site visits',
      recommendation: 'Meta Lead Ads (₹8,999/mo) + WhatsApp LeadOS',
      path: '/services/meta-ads',
    },
    {
      stage: 'Restaurant, Cafe, or Boutique',
      situation: 'Need consistent foot traffic and daily visual discovery',
      recommendation: 'Social Media Management (from ₹6,999/mo)',
      path: '/services/social-media-marketing',
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
            <span className="font-semibold text-bm-navy-deep">Services</span>
          </li>
        </ol>
      </nav>

      {/* ========================================================= */}
      {/* BLOCK 1 — H1 + ANSWER FIRST                              */}
      {/* ========================================================= */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 bg-bm-wash-cool border border-bm-brand-soft px-3.5 py-1.5 rounded-full text-xs font-bold text-bm-navy">
          <span>Digital Growth Services · Puducherry & Tamil Nadu</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-bm-navy-deep font-display tracking-tight">
          What we do — and what each one costs
        </h1>

        <p className="text-base sm:text-xl text-bm-ink font-medium leading-relaxed max-w-3xl mx-auto bg-white border border-bm-line p-6 sm:p-8 rounded-3xl shadow-sm">
          Six services, every price published. One-time builds start at ₹2,999 and monthly plans at ₹4,999, all excluding 18% GST. Pick the one that matches what you need, or{' '}
          <Link to="/pricing/" className="text-bm-accent-price font-bold hover:underline inline-flex items-center gap-1">
            see every price on one page →
          </Link>
        </p>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 2 — 6 SERVICE CARDS GRID                            */}
      {/* ========================================================= */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-bm-navy-deep font-display">
              Core Service Catalog
            </h2>
            <p className="text-xs sm:text-sm text-bm-ink-muted mt-1">
              Select a vertical to review full deliverable checklists, case studies, and exact SLAs.
            </p>
          </div>
          <Link
            to="/pricing/"
            className="text-xs font-bold text-bm-navy hover:text-bm-orange flex items-center gap-1.5 bg-white border border-bm-line px-4 py-2 rounded-xl shadow-sm hover:border-bm-brand-soft transition-colors self-start sm:self-auto"
          >
            <span>View Full Rate Card Table</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {serviceCatalog.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`bg-white rounded-3xl border ${service.color} p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group`}
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-bm-wash-cool text-bm-navy flex items-center justify-center border border-bm-brand-soft/40 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-bm-navy bg-bm-wash-cool border border-bm-brand-soft/40 px-2.5 py-1 rounded-full">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title & Price */}
                  <div>
                    <h3 className="text-xl font-extrabold text-bm-navy-deep font-display group-hover:text-bm-orange transition-colors">
                      {service.title}
                    </h3>
                    <div className="mt-1.5 flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-bm-accent-price font-display">
                        {service.price}
                      </span>
                      <span className="text-xs font-semibold text-bm-ink-muted">
                        {service.billing}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-bm-ink-faint mt-1 font-mono">
                      <Clock className="w-3 h-3 text-bm-brand" />
                      <span>SLA: {service.turnaround}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-bm-ink leading-relaxed">
                    {service.description}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2 text-xs text-bm-ink-muted pt-2 border-t border-bm-line-soft">
                    {service.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Actions */}
                <div className="pt-6 mt-6 border-t border-bm-line-soft space-y-2.5">
                  <Link
                    to={service.path}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-bm-navy bg-bm-wash-cool hover:bg-bm-navy hover:text-white transition-colors border border-bm-brand-soft/40"
                  >
                    <span>Read Full Service Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <WhatsAppCTA
                    src={`services-hub-${service.id}`}
                    intent={service.ctaIntent}
                    label={`Inquire on WhatsApp`}
                    className="w-full text-xs py-2 px-3 justify-center"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 3 — "NOT SURE WHICH?" ADVISORY MATRIX               */}
      {/* ========================================================= */}
      <section className="bg-white rounded-3xl border border-bm-line p-8 sm:p-12 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-bm-wash-warm border border-bm-wash-warm-line px-3 py-1 rounded-full text-xs font-bold text-bm-accent-price-text">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Advisory Guide</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            Not sure which service is right for you?
          </h2>

          <p className="text-sm sm:text-base text-bm-ink leading-relaxed">
            Message us with two simple details: <strong>what you sell</strong>, and <strong>what you want to happen in the next 90 days</strong>. We will tell you honestly which of these services is the right spend — including when the correct answer is <em>“none of them yet”</em>.
          </p>
        </div>

        {/* Stage Comparison Matrix Table */}
        <div className="overflow-x-auto rounded-2xl border border-bm-line-soft">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-bm-wash-cool text-bm-navy-deep font-bold border-b border-bm-line-soft">
              <tr>
                <th className="py-3 px-4 font-display">Your Business Stage</th>
                <th className="py-3 px-4">Current Situation</th>
                <th className="py-3 px-4 font-display">Recommended Spend</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bm-line-soft">
              {stageMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-bm-wash-cool/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-bm-navy-deep">{row.stage}</td>
                  <td className="py-3.5 px-4 text-bm-ink-muted">{row.situation}</td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-800">{row.recommendation}</td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to={row.path}
                      className="inline-flex items-center gap-1 text-xs font-bold text-bm-navy hover:text-bm-orange"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Closing WhatsApp Advisory Card */}
        <div className="bg-bm-wash-cool p-6 sm:p-8 rounded-2xl border border-bm-brand-soft/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-bm-navy-deep">
              Ask for an Honest 90-Day Recommendation
            </h3>
            <p className="text-xs text-bm-ink-muted">
              We review your current website, Google profile, or store and tell you what will produce measurable inquiries.
            </p>
          </div>

          <div className="shrink-0">
            <WhatsAppCTA
              src="services-hub-advisory"
              intent="I'm not sure which service I need. Here is what I sell and what I want to achieve in the next 90 days: "
              label="Ask Us on WhatsApp"
              variant="primary"
              className="text-xs sm:text-sm py-3 px-5 shadow-md"
            />
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 4 — RATE CARD BANNER                                */}
      {/* ========================================================= */}
      <section className="bg-bm-navy-deep text-white p-8 sm:p-10 rounded-3xl space-y-4 border border-bm-brand-soft/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Transparency</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
            Want to see every price side by side?
          </h3>
          <p className="text-xs text-bm-brand-soft max-w-xl">
            Review all one-time packages, monthly SEO, Meta ads, social media tiers, commercial terms, and GST details in our unified rate card.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            to="/pricing/"
            className="inline-flex items-center justify-center gap-2 bg-white text-bm-navy hover:bg-bm-wash-warm px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-lg"
          >
            <span>Open Master Pricing Page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          {onOpenQuote && (
            <button
              onClick={() => onOpenQuote()}
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/30 hover:bg-white/10 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors"
            >
              <span>Get Quick Quote</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
