import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Check,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { WhatsAppCTA } from '@/components/WhatsAppCTA';
import { SlotsBanner } from '@/components/SlotsBanner';
import { PriceCard } from '@/components/PriceCard';
import { ProofBlock } from '@/components/ProofBlock';
import { NotForBlock } from '@/components/NotForBlock';
import { FAQ } from '@/components/FAQ';

interface SeoPageProps {
  onOpenQuote?: (service?: string) => void;
}

export function SeoPage({ onOpenQuote }: SeoPageProps) {
  // SEO Metadata & Schema Injection
  useEffect(() => {

    const schemaId = 'seo-service-schema';
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
              name: 'SEO Services',
              item: 'https://bmtechx.in/services/seo/',
            },
          ],
        },
        {
          '@type': 'Service',
          name: 'SEO Services in Pondicherry',
          serviceType: 'Search Engine Optimization',
          description:
            'Google Maps SEO from Rs 2,999 a month for Pondicherry, Cuddalore and Villupuram businesses. Countable deliverables, honest timelines, no ranking guarantees.',
          provider: {
            '@type': 'Organization',
            name: 'BM TechX',
            url: 'https://bmtechx.in',
          },
          areaServed: [
            { '@type': 'City', name: 'Puducherry' },
            { '@type': 'City', name: 'Cuddalore' },
            { '@type': 'City', name: 'Villupuram' },
            { '@type': 'City', name: 'Chennai' },
            { '@type': 'City', name: 'Madurai' },
            { '@type': 'State', name: 'Tamil Nadu' },
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Google Maps SEO Plans',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Google Maps SEO Starter',
                  description: 'Profile optimization, services and description setup, 4 Google posts a month, basic keyword optimization, trust signals.',
                },
                price: 2999,
                priceCurrency: 'INR',
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Google Maps SEO Growth',
                  description: 'Everything in Starter plus 8 Google posts a month, review growth strategy, competitor analysis, Q&A and local keyword optimization.',
                },
                price: 4999,
                priceCurrency: 'INR',
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Google Maps SEO Business',
                  description: 'Everything in Growth plus citation building, advanced local SEO and weekly optimization.',
                },
                price: 8999,
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

  const seoFaqs = [
    {
      q: 'How long does SEO take to show results in India?',
      a: 'Three to six months for meaningful movement; longer on highly competitive keywords. Local Google Map results can sometimes move sooner than national organic results, but no one can promise a timeline.',
    },
    {
      q: 'Can you guarantee first position on Google?',
      a: 'No, and neither can anyone else. Rankings depend on local competition, your reviews, searcher location and Google’s updates, which no agency controls. What we commit to is the work in your plan: the profile setup, the posts, the review strategy, the competitor check and the optimisation listed on this page.',
    },
    {
      q: 'What is the difference between SEO and Google Ads?',
      a: 'Google Ads put you at the top immediately and stop the minute you stop funding your daily ad budget. SEO builds slowly over months and continues generating organic inquiries even when you aren’t paying for every single click. For budgets under ₹50,000/month, we recommend mastering one channel properly rather than splitting budget poorly across both.',
    },
    {
      q: 'Do I need a website for SEO to work?',
      a: 'For organic Google search, yes — Google needs high-speed pages to rank. For local map pack results, a properly claimed and active Google Business Profile does substantial work on its own, which is why local GBP optimization is included in every single plan, including Starter.',
    },
    {
      q: 'Is there a minimum commitment?',
      a: 'Plans are billed monthly. If you pay three months upfront, you save and setup is free. Local results build over weeks and months, so we recommend giving any plan at least three months before judging it.',
    },
    {
      q: 'Do you work with businesses outside Pondicherry?',
      a: 'Yes — we actively optimize businesses in Cuddalore, Villupuram, Chennai, Madurai, Trichy, and Namakkal. The work is handled entirely remotely with a monthly report.',
    },
    {
      q: 'Will you work with my direct competitor?',
      a: 'Not in the same city for the same primary service. We maintain strict geographical exclusivity per category so our interests are 100% aligned with yours. Tell us your top competitors at onboarding and we will confirm in writing.',
    },
  ];

  const notForItems = [
    'If you need inquiries this month — SEO is a 3–6 month compounding investment. If you need immediate sales in the next 30 days, Meta Ads is the honest answer, and we will advise you accordingly.',
    'If you demand a guaranteed #1 ranking on Google — nobody can guarantee an algorithm they do not own. Anyone who makes that promise is either misinformed or hoping you are.',
    'If you are unwilling to grant us access to your Google Search Console, Analytics, and Business Profile — we cannot optimize blind, and you should never want an agency to work without baseline access.',
    'If your product, pricing, or service has fundamental quality flaws — SEO simply brings more people to discover that flaw faster. Fix operational quality first.',
    'If your current website is critically broken — we will state that during the initial audit. In some cases, the right first investment is a clean ₹2,999 custom-coded website before monthly SEO retainers.',
  ];

  const planComparisonRows = [
    { deliverable: 'Profile optimization', starter: 'Included', growth: 'Included', business: 'Included' },
    { deliverable: 'Services and description setup', starter: 'Included', growth: 'Included', business: 'Included' },
    { deliverable: 'Google posts / month', starter: '4', growth: '8', business: '8' },
    { deliverable: 'Keyword optimization', starter: 'Basic', growth: 'Q&A and local keywords', business: 'Advanced local SEO' },
    { deliverable: 'Trust signals: photos, hours, attributes', starter: 'Included', growth: 'Included', business: 'Included' },
    { deliverable: 'Review growth strategy', starter: '—', growth: 'Included', business: 'Included' },
    { deliverable: 'Competitor analysis', starter: '—', growth: 'Included', business: 'Included' },
    { deliverable: 'Citation building', starter: '—', growth: '—', business: 'Included' },
    { deliverable: 'Weekly optimization', starter: '—', growth: '—', business: 'Included' },
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
            <span className="font-semibold text-bm-navy-deep">SEO Services</span>
          </li>
        </ol>
      </nav>

      {/* ========================================================= */}
      {/* BLOCK 1 — H1 + ANSWER FIRST                              */}
      {/* ========================================================= */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 bg-bm-wash-cool border border-bm-brand-soft px-3.5 py-1.5 rounded-full text-xs font-bold text-bm-navy">
          <Search className="w-3.5 h-3.5 text-bm-orange" />
          <span>Local & Organic Search Growth · Puducherry & Tamil Nadu</span>
        </div>

        <div className="flex justify-center"><SlotsBanner /></div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-bm-navy-deep font-display tracking-tight">
          SEO services in Pondicherry
        </h1>

        <p className="text-base sm:text-xl text-bm-ink font-medium leading-relaxed max-w-3xl mx-auto bg-white border border-bm-line p-6 sm:p-8 rounded-3xl shadow-sm">
          Google Maps SEO at BM TechX starts at <strong className="text-bm-navy-deep font-extrabold">₹2,999 a month plus GST</strong>, with Growth at ₹4,999 and Business at ₹8,999. It covers your Google Business Profile, posts, review growth and local optimisation, so people nearby find you and call. Pay three months upfront and you save and setup is free. We work with businesses in Puducherry, Cuddalore, Villupuram and across Tamil Nadu, and we do not guarantee first position, because no honest agency can.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <WhatsAppCTA
            src="seo-hero"
            intent="Hi BM TechX — I'd like to consult regarding SEO for my business."
            label="Inquire on WhatsApp"
            variant="primary"
            className="text-sm sm:text-base py-3.5 px-6 shadow-md"
          />
          <Link
            to="/pricing/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-white border border-bm-line hover:border-bm-brand px-5 py-3.5 rounded-xl text-bm-navy transition-colors shadow-sm"
          >
            <span>Compare Plans</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 2 — THE HIGH-INTENT COMPETITOR AUDIT BLOCK          */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-br from-bm-navy-deep via-bm-brand to-[#08182b] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-bm-brand-soft/30 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-bm-accent-price text-white px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
            <AlertCircle className="w-4 h-4" />
            <span>High-Intent Competitor Audit</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Search your business type on Google right now.
            </h2>
            <p className="text-sm sm:text-base text-bm-brand-soft leading-relaxed max-w-2xl">
              If your competitor ranks above you in the Google Map 3-pack or local search results, there is a specific technical reason — usually one of five, and almost always fixable.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-2xl border border-white/15 space-y-4 backdrop-blur-sm">
            <p className="text-xs sm:text-sm text-gray-200">
              Send us your business name and main service on WhatsApp. We will look at your profile and tell you in <strong>one direct message</strong> why they rank above you. No pushy sales calls, no long forms, and zero obligation.
            </p>

            <WhatsAppCTA
              src="seo-audit"
              intent="Why does my competitor rank above me on Google? My business name is: "
              label="Find out why they rank above me"
              variant="primary"
              className="w-full sm:w-auto text-sm sm:text-base py-4 px-8 justify-center shadow-lg"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-bm-brand-soft">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> Free 1-message audit
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> Based on your public Google profile
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> No follow-up spam
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 3 — 3-TIER RETAINER PLANS                           */}
      {/* ========================================================= */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-bm-navy bg-bm-wash-cool border border-bm-brand-soft/40 px-3 py-1 rounded-full uppercase tracking-wider">
            Clear Deliverables
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            Three Google Maps SEO Plans
          </h2>
          <p className="text-xs sm:text-sm text-bm-ink-muted">
            All plans exclude 18% GST. Pay 3 months upfront to save and get free setup.
          </p>
        </div>

        {/* 3 Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <PriceCard id="seo-starter" ctaTag="plan-seo-starter" />
          <PriceCard id="seo-growth" highlight={true} ctaTag="plan-seo-growth" />
          <PriceCard id="seo-business" ctaTag="plan-seo-business" />
        </div>

        {/* Comprehensive Deliverables Comparison Table */}
        <div className="bg-white rounded-3xl border border-bm-line p-6 sm:p-8 max-w-5xl mx-auto shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-bm-navy-deep font-display">
            Full Deliverables Breakdown
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-bm-wash-cool text-bm-navy-deep font-bold border-b border-bm-line-soft">
                <tr>
                  <th className="py-3 px-4 font-display">Work Delivered</th>
                  <th className="py-3 px-4">Starter (₹2,999)</th>
                  <th className="py-3 px-4 text-bm-navy font-extrabold">Growth (₹4,999)</th>
                  <th className="py-3 px-4">Business (₹8,999)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bm-line-soft">
                {planComparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-bm-wash-cool/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-bm-navy-deep">{row.deliverable}</td>
                    <td className="py-3.5 px-4 text-bm-ink-muted">{row.starter}</td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-800">{row.growth}</td>
                    <td className="py-3.5 px-4 font-semibold text-bm-navy">{row.business}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-bm-ink-faint text-center">
            Pay three months upfront to save and get free setup. We do not guarantee any ranking position.
          </p>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 5 — HOW WE WORK, MONTH BY MONTH                     */}
      {/* ========================================================= */}
      <section className="bg-bm-wash-cool rounded-3xl border border-bm-brand-soft/40 p-8 sm:p-12 space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-bold text-bm-navy bg-white border border-bm-brand-soft/40 px-3 py-1 rounded-full uppercase tracking-wider">
            Operational Schedule
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            How We Work, Month by Month
          </h2>
          <p className="text-xs sm:text-sm text-bm-ink-muted">
            SEO is an operational system, not guesswork. Here is the exact timeline of deliverables:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-bm-line shadow-sm space-y-3">
            <div className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-bm-navy text-white inline-block">
              Days 1–14
            </div>
            <h3 className="text-base font-bold text-bm-navy-deep">Baseline & Audit</h3>
            <p className="text-xs text-bm-ink-muted leading-relaxed">
              We review your Google Business Profile and record where you stand today (calls, direction requests, website clicks) so there is never an argument about what moved.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-bm-line shadow-sm space-y-3">
            <div className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-bm-navy text-white inline-block">
              Month 1
            </div>
            <h3 className="text-base font-bold text-bm-navy-deep">Foundations & NAP</h3>
            <p className="text-xs text-bm-ink-muted leading-relaxed">
              Profile optimised with the right categories, services, hours and photos. Name, address and phone made consistent across listings.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-bm-line shadow-sm space-y-3">
            <div className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-bm-navy text-white inline-block">
              Months 2–3
            </div>
            <h3 className="text-base font-bold text-bm-navy-deep">Content & Movement</h3>
            <p className="text-xs text-bm-ink-muted leading-relaxed">
              Regular Google posts and local keyword work. Review growth strategy starts. Early movement can show on less competitive local searches.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-bm-line shadow-sm space-y-3">
            <div className="font-mono text-xs font-black px-2.5 py-1 rounded-md bg-emerald-700 text-white inline-block">
              Month 4+
            </div>
            <h3 className="text-base font-bold text-bm-navy-deep">Compounding Leads</h3>
            <p className="text-xs text-bm-ink-muted leading-relaxed">
              Continued optimisation based on your monthly numbers. On the Business plan, citation building and weekly optimisation keep improving your local visibility.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 6 — WHAT WE REPORT: LEADS, NOT LIKES                 */}
      {/* ========================================================= */}
      <section className="bg-white rounded-3xl border border-bm-line p-8 sm:p-12 shadow-sm space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold text-emerald-800">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Honest Reporting</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            Every Report Opens With One Number: Inquiries From Organic Search
          </h2>

          <p className="text-sm sm:text-base text-bm-ink leading-relaxed">
            Not impressions. Not vanity search reach. We report actual phone calls, WhatsApp messages, and form submissions produced by Google searchers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-bm-wash-cool border border-bm-line-soft space-y-2">
            <span className="font-mono text-xs font-bold text-bm-navy uppercase tracking-wider">Page 1 Priority</span>
            <h3 className="text-base font-bold text-bm-navy-deep">Countable Deliverables</h3>
            <p className="text-xs text-bm-ink-muted leading-relaxed">
              Every report lists exactly what was completed: posts published, profile changes made and review actions taken.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-bm-wash-cool border border-bm-line-soft space-y-2">
            <span className="font-mono text-xs font-bold text-bm-navy uppercase tracking-wider">Blockers Highlighted</span>
            <h3 className="text-base font-bold text-bm-navy-deep">Honest Obstacles</h3>
            <p className="text-xs text-bm-ink-muted leading-relaxed">
              If something is blocking progress — such as waiting on website approvals or pending photo assets — it is stated openly so nothing stalls.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-bm-wash-cool border border-bm-line-soft space-y-2">
            <span className="font-mono text-xs font-bold text-bm-navy uppercase tracking-wider">Page 2 Placement</span>
            <h3 className="text-base font-bold text-bm-navy-deep">Keyword Rankings</h3>
            <p className="text-xs text-bm-ink-muted leading-relaxed">
              Rankings are included in the report, but they sit on page two — because ranking #1 for a term nobody buys from is meaningless.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* BLOCK 6b — PROOF SYSTEM (SLOTS FROM PROOF.JSON)          */}
      {/* ========================================================= */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-bm-navy bg-bm-wash-cool border border-bm-brand-soft/40 px-3 py-1 rounded-full uppercase tracking-wider">
            Verified SEO Proof
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-bm-navy-deep font-display">
            What We Have Moved, and for Whom
          </h2>
          <p className="text-xs sm:text-sm text-bm-ink-muted">
            Search Console graphs and anonymized monthly client reports. Verifiable data, not generic testimonials.
          </p>
        </div>

        <div className="space-y-4">
          <ProofBlock id="seo-before-after" />
          <ProofBlock id="seo-case-balified" />
          <ProofBlock id="seo-strip" />
          <ProofBlock id="seo-sample-report" />
          <ProofBlock id="seo-testimonial-1" />
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
          items={seoFaqs}
          title="SEO Services FAQ"
          subtitle="Honest answers regarding timelines, ranking guarantees, Google Ads differences, and territory exclusivity."
        />
      </section>

      {/* ========================================================= */}
      {/* BLOCK 9 — CLOSING CTA                                     */}
      {/* ========================================================= */}
      <section className="bg-bm-navy-deep text-white p-8 sm:p-12 rounded-3xl space-y-6 border border-bm-brand-soft/20 text-center max-w-4xl mx-auto shadow-xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            Send your business name. We will tell you why your competitor ranks above you.
          </h2>
          <p className="text-sm text-bm-brand-soft leading-relaxed">
            Message us on WhatsApp. We will perform a quick competitive check on Google and send you an honest answer in one message.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <WhatsAppCTA
            src="seo-footer"
            intent="Hi BM TechX — Why does my competitor rank above me on Google? My business name is: "
            label="Check My Competitor on WhatsApp"
            variant="primary"
            className="w-full sm:w-auto text-base py-4 px-8 justify-center shadow-lg"
          />
          {onOpenQuote && (
            <button
              onClick={() => onOpenQuote('Google Maps SEO Growth (₹4,999/mo)')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent text-white border border-white/30 hover:bg-white/10 px-6 py-4 rounded-xl text-sm font-semibold transition-colors"
            >
              <span>Request Custom SEO Proposal</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default SeoPage;
